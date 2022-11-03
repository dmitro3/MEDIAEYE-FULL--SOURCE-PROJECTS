import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CloseIcon, Angle, EyeSwap } from '../../Icons/';
import './Popup.scss';
import { Model3d } from '../../3d/Model3d';
import SelectSearch from 'react-select-search';
import AgreeBlock from '../../Common/AgreeBlock';
import { useHistory } from 'react-router-dom';
import { useMoralis } from 'react-moralis';
import { ethers } from 'ethers';
import EyeSwapPopup from '../../Modals/EyeSwapPopup/EyeSwapPopup';
import SwapPopup from '../../Modals/SwapPopup.js/SwapPopup';
import {
  toggleGeneralPopup,
  closeGeneralPopup
} from '../../../store/app/appSlice';
import { ChainHexString } from '../../../blockchain/functions/ChangeChain/ChainHexStrings';
import { fromRpcSig } from 'ethereumjs-util';
import ChangeChainRequest from '../../../blockchain/functions/ChangeChain/ChangeChainRequest';
import {
  checkAllowance,
  requestTokenApproval
} from '../../../blockchain/functions/ApproveToken';
import {
  ContractAddress,
  TokenAddress,
  TokenName,
  ZERO_ADDRESS
} from '../../../blockchain/functions/Addresses';
import detectEthereumProvider from '@metamask/detect-provider';
import { ChainScanerLink } from '../../../blockchain/functions/ChangeChain/ChainNames';
import { convertPrice, roundString, allowOnlyNumber } from '../../../blockchain/functions/Utils';
import { twitterPostAuto } from '../../../blockchain/functions/Bot';
import formatAdddress from '../../../utils/formatAdddress';
import ExploreNormalCard from '../../ContentMarketplace/ExploreBlock/ExploreNormalCard';
import EyeSwapPro from '../../Modals/EyeSwap-Open/EyeSwapPro';

export const PopupOffer = (props) => {
  const { nft, mimetype } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const { isInitialized, Moralis, user, web3 } = useMoralis();
  const activeNetwork = useSelector((state) => state.app.activeNetwork);
  const [termsAgree, setTermsAgree] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showEyeswap, setShowEyeswap] = useState(false);

  const [selectedExpiration, setSelectedExpiration] = useState(1);
  const [maxQTY, setmaxQTY] = useState(1);
  const [productQTY, setProductQTY] = useState(1);
  const [amountPrice, setAmountPrice] = useState(0);
  const [amountUSD, setAmountUSD] = useState(0);
  const [availableBalance, setAvailableBalance] = useState(0);
  const DAY_LENGTH = 86400000;
  const dateDisplay = { dateStyle: 'medium', timeStyle: 'short' };
  const oneDayAhead = new Date(Date.now() + DAY_LENGTH);
  const [expirationDate, setExpirationDate] = useState(
    oneDayAhead.toLocaleString('en', dateDisplay)
  );
  const url = window.location.href;
  const [approved, setApproved] = useState(false);
  const [selectedToken, setSelectedToken] = useState(0);
  const [paymentTokensList, setPaymentTokensList] = useState([]);
  const [activeToken, setActiveToken] = useState({});
  const [togglePaymentList, setTogglePaymentList] = useState(false);
  const expirationOptions = [
    {
      name: '1 day',
      value: 1
    },
    {
      name: '3 days',
      value: 3
    },
    {
      name: '7 days',
      value: 7
    },
    {
      name: '14 days',
      value: 14
    },
    {
      name: '24 days',
      value: 31
    }
  ];

  const toggleTermsAgree = () => {
    setTermsAgree(!termsAgree);
  };
  const handleEyeswap = () => {
    setShowPopup(!showPopup);
  };

  const handleSetAmountPrice = async (value) => {
    if (parseFloat(value) > parseFloat(availableBalance)) {
      dispatch(
        toggleGeneralPopup({
          status: 'error',
          message: 'Offer amount should not be greater than available balance ' + availableBalance + ' ' + activeToken.name,
          size: 'sm',
          textButton: 'OK'
        })
      );
      setAmountPrice(availableBalance);
      return
    }
    setAmountPrice(value);
    // set converted usd amount
    const isValidNum = value !== '' && value.indexOf('.') !== value.length - 1;
    if (isValidNum) {
      const params = {
        chainId: ChainHexString(activeNetwork),
        price: Moralis.Units.ETH(value),
        token: activeToken.name,
        native: false
      };
      const usd = await convertPrice(Moralis, params);
      setAmountUSD(String(usd));
    }
  };

  const handleOffer = async (e) => {
    // request switch chain if not on correct
    if (ChainHexString(activeNetwork) !== nft.chainId) {
      ChangeChainRequest(nft.chainId);
    } //else return;
    if (amountPrice <= 0) {
      dispatch(
        toggleGeneralPopup({
          status: 'error',
          message: 'Offer amount should be greater than 0 ' + activeToken.name,
          size: 'xs'
        })
      );
      return;
    }
    if (approved) {
      // create hash for the offer
      const provider = await detectEthereumProvider();

      if (provider && user) {
        // create data to sign
        const types = {
          EIP712Domain: [
            { name: 'name', type: 'string' },
            { name: 'version', type: 'string' },
            { name: 'chainId', type: 'uint256' },
            { name: 'verifyingContract', type: 'address' }
          ],
          OfferSignature: [
            { name: 'nftAddress', type: 'address' },
            { name: 'tokenId', type: 'uint256' },
            { name: 'supply', type: 'uint256' },
            { name: 'price', type: 'uint256' },
            { name: 'offerer', type: 'address' },
            { name: 'paymentMethod', type: 'address' },
            { name: 'expiry', type: 'uint256' }
          ]
        };

        const domain = {
          name: 'MediaEyeMarketplace',
          version: '1',
          chainId: nft.chainId,
          verifyingContract: ContractAddress('OFFER', nft.chainId)
        };

        const expiry = (Date.now() + DAY_LENGTH * selectedExpiration)
          .toString()
          .slice(undefined, -3);

        const msgParams = {
          types: types,
          primaryType: 'OfferSignature',
          domain: domain,
          message: {
            nftAddress: nft.collectionAddress,
            tokenId: nft.tokenId,
            supply: '1',
            price: ethers.utils.parseEther(amountPrice.toString()).toString(),
            offerer: user.attributes.ethAddress,
            paymentMethod: TokenAddress(activeToken.name, nft.chainId),
            expiry: expiry
          }
        };

        // // wait for user to sign
        dispatch(
          toggleGeneralPopup({
            status: 'loading',
            message: 'Processing...',
            size: 'xs'
          })
        );
        const userSig = await provider.request({
          method: 'eth_signTypedData_v4',
          params: [user.attributes.ethAddress, JSON.stringify(msgParams)]
        });

        const { v, r, s } = fromRpcSig(userSig);

        const request = {
          offerer: user.attributes.ethAddress,
          v: v,
          r: r.toString('hex'),
          s: s.toString('hex'),
          nftId: nft.id,
          supply: '1',
          price: ethers.utils.parseEther(amountPrice).toString(),
          expiry: expiry,
          paymentMethod: TokenAddress(activeToken.name, nft.chainId)
        };
        await Moralis.Cloud.run('createOffer', request);
        dispatch(closeGeneralPopup());
        props.togglePopup();
        dispatch(
          toggleGeneralPopup({
            status: 'success',
            title: 'Transaction Successful',
            message: 'For more details view:',
            size: 'sm',
            copyText: request?.paymentMethod,
            copyTextLink:
              ChainScanerLink(nft.chainId) +
              '/address/' +
              request?.paymentMethod,
            textButton: 'OK',
            autoClose: 'false'
          })
        );
        ProductAutoPost();
        history.push('/refresh');
      } else {
        dispatch(
          toggleGeneralPopup({
            status: 'error',
            message: 'Please connect to Wallet',
            size: 'sm',
            textButton: 'OK'
          })
        );
        return;
      }
    } else {
      dispatch(
        toggleGeneralPopup({
          status: 'loading',
          message: 'Processing...',
          size: 'xs',
          autoClose: 'false'
        })
      );
      try {
        const isApproved = await requestTokenApproval(
          Moralis,
          activeToken.name,
          ContractAddress('OFFER', nft.chainId)
        );
        dispatch(closeGeneralPopup());
        if (isApproved?.status) {
          setApproved(true);
          props.togglePopup();
          dispatch(
            toggleGeneralPopup({
              status: 'success',
              title: 'Transaction Successful',
              message: 'For more details view:',
              size: 'sm',
              copyText: isApproved?.transactionHash,
              copyTextLink:
                ChainScanerLink(nft.chainId) +
                '/tx/' +
                isApproved?.transactionHash,
              textButton: 'OK',
              autoClose: 'false'
            })
          );
          ProductAutoPost();
          history.push('/refresh');
        } else {
          setApproved(false);
          dispatch(
            toggleGeneralPopup({
              status: 'error',
              title: 'Token Approve Failed',
              message: isApproved?.data?.message
                ? isApproved.data.message
                : isApproved.message
                  ? isApproved.message
                  : 'Something went wrong. Try again',
              size: 'sm',
              textButton: 'OK'
            })
          );
        }
      } catch (error) {
        dispatch(closeGeneralPopup());
        dispatch(
          toggleGeneralPopup({
            status: 'error',
            message: error?.data?.message ? error.data.message : error.message,
            size: 'sm',
            textButton: 'OK'
          })
        );
      }
    }
  };

  const ProductAutoPost = async () => {
    let msgpost = '' + nft?.title + ' has a new offer';
    let buyPrice = amountPrice;
    if (buyPrice) {
      msgpost += ' of ' + buyPrice + ' ' + activeToken.name;
    }
    msgpost +=
      ' placed by ' +
      formatAdddress(user?.attributes?.ethAddress) +
      ' ' +
      url +
      ' #MEDIAEYE #nftplatform #nftoffer';
    await twitterPostAuto(msgpost, nft?.img);
  };

  const checkApproved = async () => {
    // check if the amount for token is approved
    const bigWei = ethers.BigNumber.from(
      ethers.utils.parseEther(amountPrice.toString())
    );
    let isApproved = await checkAllowance(
      Moralis,
      activeToken.name,
      user?.attributes?.ethAddress,
      bigWei,
      ContractAddress('OFFER', nft.chainId)
    );
    setApproved(isApproved);
  };

  const getBalances = async (tokenAddress, chainId) => {
    if (!tokenAddress || !chainId) return;
    const zero = 0;

    if (tokenAddress === ZERO_ADDRESS) {
      // if native token
      const native = await Moralis.Web3API.account.getNativeBalance({
        chain: chainId
      });
      native
        ? setAvailableBalance(
          roundString(Moralis.Units.FromWei(native.balance), 4)
        )
        : setAvailableBalance(zero.toFixed(4));
    } else {
      // if not native
      const balances = await Moralis.Web3API.account.getTokenBalances({
        chain: chainId
      });
      const nonnative = balances.find(
        (token) => token.token_address === tokenAddress.toLowerCase()
      );
      nonnative
        ? setAvailableBalance(
          roundString(Moralis.Units.FromWei(nonnative.balance), 4)
        )
        : setAvailableBalance(zero.toFixed(4));
    }

  };

  useEffect(() => {
    if (isInitialized && activeToken?.name) {
      getBalances(
        TokenAddress(activeToken.name, ChainHexString(activeNetwork)),
        ChainHexString(activeNetwork)
      );
    }
  }, [isInitialized, activeToken, activeNetwork]);

  useEffect(() => {
    setmaxQTY(nft?.totalTokens);
  }, [nft?.totalTokens])

  useEffect(() => {
    if (Moralis.provider && user && amountPrice && nft && activeToken.name) {
      checkApproved();
    }
  }, [web3, user, activeToken, amountPrice, nft]);

  useEffect(() => {
    if (activeNetwork === process.env.REACT_APP_BSC_CHAIN_NAME) {
      let array = [
        {
          name: 'WBNB',
          img: '/img/token/34/BNB.png'
        },
        {
          name: 'BUSD',
          img: '/img/token/34/BUSD.png'
        }
      ];
      setActiveToken(array[0]);
      setPaymentTokensList(array);
    } else if (activeNetwork === 'FTM') {
      let array = [
        {
          name: 'WFTM',
          img: '/img/token/34/WFTM.png'
        },
        {
          name: 'USDC',
          img: '/img/token/34/USDC.png'
        }
      ];
      setActiveToken(array[0]);
      setPaymentTokensList(array);
    } else if (activeNetwork === 'ETH') {
      let array = [
        {
          name: 'WETH',
          img: '/img/token/34/ETH.png',
          des: 'Ethereum'
        },
        {
          name: 'USDT',
          img: '/img/token/34/USDT.png',
          des: 'Tether'
        }
      ];
      setPaymentTokensList(array);
      setActiveToken(array[0]);
    }
  }, [activeNetwork]);
  const renderOptions = paymentTokensList.map((option) => {
    if (activeToken.name !== option.name) {
      return (
        <div
          className="mediaeye-popup-product-page-tokenlistwithprice-token-body-row"
          onClick={() => {
            setActiveToken(option);
            setTogglePaymentList(false);
            getBalances(
              TokenAddress(option.name, ChainHexString(activeNetwork)),
              ChainHexString(activeNetwork)
            );
            setAmountPrice(0);
          }}
        >
          <img src={option.img} alt={option.name} />
          <span>{option.name}</span>
        </div>
      );
    }
  });

  // const handlePaymentSelect = (e) => {
  //   setSelectedToken(e.target.id);
  // };
  // const showPaymentMethods = () => {
  //   // handle chainlink payment as well as primary token payment
  //   return paymentRequest?.paymentMethods?.map((method, i) => {
  //     return (
  //       <>
  //         <div
  //           className="mediaeye-popup-product-page-tokenlistwithprice-token-body-row"
  //           key={i}
  //           onClick={() => {
  //             handlePaymentSelect(i);
  //             setTogglePaymentList(!togglePaymentList);
  //           }}
  //         >
  //           <img
  //             src={
  //               '/img/token/34/' +
  //               TokenName(method.toLowerCase(), paymentRequest.chainId) +
  //               '.png'
  //             }
  //             alt={TokenName(method.toLowerCase(), paymentRequest.chainId)}
  //           />
  //           <span>
  //             {TokenName(method.toLowerCase(), paymentRequest.chainId)}
  //           </span>
  //         </div>
  //       </>
  //     );
  //   });
  // };
  return (
    <>
      {props.showPopup ? (
        <div
          className={
            props.showPopup
              ? 'mediaeye-popup active'
              : 'mediaeye-popup'
          }
        >
          <div
            className="mediaeye-popup-wrapper mediaeye-popup-product-page scrolled"
            onClick={props.togglePopup}
          >
            <div className="mediaeye-popup-content">
              <div
                className="mediaeye-popup-content-inner"
                onClick={(event) => event.stopPropagation()}
              >

                <div
                  className="mediaeye-popup-close"
                  onClick={props.togglePopup}
                >
                  <CloseIcon />
                </div>
                {/* <SwapPopup
                  showPopup={showPopup}
                  handleEyeswap={handleEyeswap}
                /> */}
                <div className='make-offer-page'>
                  <div className='make-offer-page-left'>
                    <div className="mediaeye-popup-product-page-imgbox">
                      <ExploreNormalCard product={nft} />
                    </div>
                  </div>
                  <div className='make-offer-page-right'>
                    <div className="mediaeye-popup-content-inner-header">
                      <div className="mediaeye-popup-content-inner-header-title">
                        Make an offer
                      </div>
                    </div>
                    <div className="mediaeye-popup-product-page-row">

                      <div className="mediaeye-popup-product-page-checkoutbox">
                        {
                          nft?.collectionType === 'ERC1155' ? (
                            <>
                              <div className="mediaeye-popup-product-page-checkoutbox-row">
                                <div className="mediaeye-popup-product-page-checkoutbox-col mediaeye-popup-product-page-checkoutbox-col-token">
                                  <div className='mediaeye-popup-product-page-checkoutbox-col-title'></div>
                                  <div className="mediaeye-popup-product-page-tokenlistwithprice-token">
                                    <div
                                      className={`mediaeye-popup-product-page-tokenlistwithprice-token-header ${togglePaymentList
                                        ? 'mediaeye-popup-product-page-tokenlistwithprice-token-header-active'
                                        : ''
                                        }`}
                                      onClick={() => setTogglePaymentList(!togglePaymentList)}
                                    >
                                      <img
                                        src={'/img/token/34/' + activeToken.name + '.png'}
                                        alt={activeToken.name}
                                      />
                                      <span>{activeToken.name}</span>
                                      <Angle side="down" />
                                    </div>
                                    {togglePaymentList ? (
                                      <div className="mediaeye-popup-product-page-tokenlistwithprice-token-body">
                                        {renderOptions}
                                      </div>
                                    ) : null}
                                  </div>
                                </div>

                                <div className="mediaeye-popup-product-page-checkoutbox-col mediaeye-popup-product-page-checkoutbox-col-qty">
                                  <div className='mediaeye-popup-product-page-checkoutbox-col-title'>Quantity</div>
                                  <div className="mediaeye-popup-product-page-tokenlistwithprice-price">
                                    <input
                                      className="mediaeye-popup-product-page-tokenlistwithprice-price-input"
                                      type="text"
                                      value={productQTY}
                                      placeholder="Qty"
                                      onChange={(e) => {
                                        let value = allowOnlyNumber(e.target.value, false);
                                        value = value > maxQTY ? maxQTY : value;
                                        setProductQTY(value);
                                      }}
                                      onBlur={(e) => { if (!productQTY || (productQTY && parseInt(productQTY) === 0)) { setProductQTY(1) } }}
                                    />
                                    <div className="mediaeye-popup-product-page-tokenlistwithprice-price-max" onClick={() => setProductQTY(Number(maxQTY))}>MAX</div>
                                  </div>
                                </div>

                                <div className="mediaeye-popup-product-page-checkoutbox-col">
                                  <div className='mediaeye-popup-product-page-checkoutbox-col-title'>Amount</div>
                                  <div className="mediaeye-popup-product-page-tokenlistwithprice-price">
                                    <input
                                      type="text"
                                      className="mediaeye-popup-product-page-tokenlistwithprice-price-input"
                                      value={amountPrice}
                                      onChange={(e) => {
                                        handleSetAmountPrice(allowOnlyNumber(e.target.value));
                                      }}
                                    />
                                    <div className="mediaeye-popup-product-page-tokenlistwithprice-price-addon">
                                      {activeToken.name}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="mediaeye-popup-product-page-checkoutbox-row">
                                <div className="mediaeye-popup-product-page-helper text-right">
                                  Total offer amount: {amountPrice ?? 0} {activeToken.name} (${roundString(ethers.utils.formatEther(amountUSD), 2)})
                                  {/* {availableBalance ?? 0} {activeToken.name}  */}
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="mediaeye-popup-product-page-checkoutbox-row">
                                <div className="mediaeye-popup-product-page-checkoutbox-col mediaeye-popup-product-page-checkoutbox-col-token">
                                  <div className='mediaeye-popup-product-page-checkoutbox-col-title'></div>
                                  <div className="mediaeye-popup-product-page-tokenlistwithprice-token">
                                    <div
                                      className={`mediaeye-popup-product-page-tokenlistwithprice-token-header ${togglePaymentList
                                        ? 'mediaeye-popup-product-page-tokenlistwithprice-token-header-active'
                                        : ''
                                        }`}
                                      onClick={() => setTogglePaymentList(!togglePaymentList)}
                                    >
                                      <img
                                        src={'/img/token/34/' + activeToken.name + '.png'}
                                        alt={activeToken.name}
                                      />
                                      <span>{activeToken.name}</span>
                                      <Angle side="down" />
                                    </div>
                                    {togglePaymentList ? (
                                      <div className="mediaeye-popup-product-page-tokenlistwithprice-token-body">
                                        {renderOptions}
                                      </div>
                                    ) : null}
                                  </div>
                                </div>

                                <div className="mediaeye-popup-product-page-checkoutbox-col mediaeye-popup-product-page-checkoutbox-col-full">
                                  <div className='mediaeye-popup-product-page-checkoutbox-col-title'>Amount</div>
                                  <div className="mediaeye-popup-product-page-tokenlistwithprice-price">
                                    <input
                                      type="text"
                                      className="mediaeye-popup-product-page-tokenlistwithprice-price-input"
                                      value={amountPrice}
                                      onChange={(e) => {
                                        handleSetAmountPrice(allowOnlyNumber(e.target.value));
                                      }}
                                    />
                                    <div className="mediaeye-popup-product-page-tokenlistwithprice-price-addon">
                                      {activeToken.name}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="mediaeye-popup-product-page-checkoutbox-row">
                                <div className="mediaeye-popup-product-page-helper text-right">
                                  Total offer amount: {amountPrice ?? 0} {activeToken.name} (${roundString(ethers.utils.formatEther(amountUSD), 2)})
                                  {/* {availableBalance ?? 0} {activeToken.name}  */}
                                </div>
                              </div>
                            </>
                          )
                        }
                        <div className="mediaeye-popup-product-page-row m-t-50">
                          <div className="mediaeye-popup-product-page-label">
                            Offer Expiration
                          </div>
                          <div className="mediaeye-popup-product-page-expiration">
                            <div className="mediaeye-popup-product-page-expiration-days">
                              {/* <select className='mediaeye-popup-product-page-expiration-days-select'>

                                            </select> */}
                              <SelectSearch
                                className="mediaeye-selectsearch mediaeye-selectsearch-lg mediaeye-selectsearch-white-arrow dark-style"
                                size="lg"
                                options={expirationOptions}
                                value={selectedExpiration}
                                onChange={(opt) => {
                                  const newDate = new Date(
                                    Date.now() + DAY_LENGTH * opt
                                  );
                                  setExpirationDate(
                                    newDate.toLocaleString('en', dateDisplay)
                                  );
                                  setSelectedExpiration(opt);
                                }}
                              />
                            </div>
                            <div className="mediaeye-popup-product-page-expiration-date">
                              {expirationDate}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="checkout-popup">
                      <div className="mediaeye-popup-product-page-row">
                        <AgreeBlock
                          agree={termsAgree}
                          toggleAgree={toggleTermsAgree}
                        />
                      </div>
                      <div className="mediaeye-popup-product-page-bottom">
                        {termsAgree ? (
                          <button
                            type="button"
                            className="btn btn-square btn-gaming"
                            onClick={handleOffer}
                          >
                            {approved ? 'MAKE OFFER' : 'APPROVE OFFER'}
                          </button>
                        ) : (
                          <button type="button" className="btn btn-square btn-gaming">
                            {approved ? 'MAKE OFFER' : 'APPROVE OFFER'}
                          </button>
                        )}
                      </div>
                    </div>

                  </div>
                </div>
                <div className="mediaeye-popup-product-page-checkoutbox-row text-center">
                  <div className='eyeswap-dropdown' onClick={() => handleEyeswap()}>
                    <div className='eyeswap-dropdown-left'>
                      <EyeSwap type={'green'} /><span>eYeSwap</span>
                    </div>
                    <div className='eyeswap-dropdown-right'>
                      <Angle side={'down'} />
                    </div>
                  </div>

                  {/* <button type="button" className="eyeswap-button" onClick={() => { handleEyeswap(); }}></button> */}
                </div>
                {
                  showPopup ?
                    <div className='text-center'>
                      <EyeSwapPro />
                    </div>
                    : null
                }

              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default PopupOffer;
