import React, { useState, useEffect, useRef } from 'react';
import { CloseIcon, Angle } from '../../Icons/';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Collapse } from 'react-collapse';
import Slider from 'react-slick';
import { useMoralis } from 'react-moralis';
import { ethers } from 'ethers';
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
import { fromRpcSig } from 'ethereumjs-util';
import ChangeChainRequest from '../../../blockchain/functions/ChangeChain/ChangeChainRequest';
import { Model3d } from '../../3d/Model3d';
import {
  convertPrice,
  queryFileType,
  roundString,
  allowOnlyNumber
} from '../../../blockchain/functions/Utils';
import AgreeBlock from '../../Common/AgreeBlock';
import {
  toggleGeneralPopup,
  closeGeneralPopup
} from '../../../store/app/appSlice';
import {
  ChainName,
  ChainScanerLink
} from '../../../blockchain/functions/ChangeChain/ChainNames';
import { ChainHexString } from '../../../blockchain/functions/ChangeChain/ChainHexStrings';
import { twitterPostAuto } from '../../../blockchain/functions/Bot';
import formatAdddress from '../../../utils/formatAdddress';

export const PopupBid = (props) => {
  const sliderRef = useRef();
  const { paymentRequest, nft, currListing, topBid, mimetype } = props;
  const [currentSlide, setCurrentSlide] = useState(1);
  const [showDropdown, setShowDropdown] = useState(false);
  const { isInitialized, Moralis, user } = useMoralis();
  const [selectedToken, setSelectedToken] = useState(0);
  const [approved, setApproved] = useState(false);
  const [bid, setBid] = useState('0');
  const [bidUSD, setBidUSD] = useState('0');
  const [activeId, setActiveId] = useState(0);
  const [availableBalance, setAvailableBalance] = useState(0);
  const activeNetwork = useSelector((state) => state.app.activeNetwork);
  const [termsAgree, setTermsAgree] = useState(false);
  const history = useHistory();
  const url = window.location.href;
  const [MinimumBidAllow, setMinimumBidAllow] = useState(0);
  const dispatch = useDispatch();

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

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rows: 1,
    slidesPerRow: 1,
    arrows: false,
    fade: true,
    autoplay: false,
    pauseOnHover: true,
    beforeChange: (current, next) => setCurrentSlide(next + 1)
  };

  useEffect(() => {
    if (isInitialized) {
      getBalances(
        paymentRequest?.paymentMethods[selectedToken],
        ChainHexString(paymentRequest?.chainId)
      );
    }
  }, [isInitialized, paymentRequest]);

  const hasMultiplePaymentMethods = () => {
    return paymentRequest?.paymentMethods.length > 1;
  };
  const showPaymentMethods = () => {
    // handle chainlink payment as well as primary token payment
    return paymentRequest?.paymentMethods?.map((method, i) => {
      return (
        <>
          <div
            className="mediaeye-popup-product-page-tokenlistwithprice-token-body-row"
            key={i}
            onClick={() => {
              handlePaymentSelect(i);
              setShowDropdown(!showDropdown);
            }}
          >
            <img
              src={
                '/img/token/34/' +
                TokenName(method.toLowerCase(), paymentRequest.chainId) +
                '.png'
              }
              alt="token"
            />
            <span>
              {TokenName(method.toLowerCase(), paymentRequest.chainId)}
            </span>
          </div>
        </>
      );
    });
  };

  const handleNext = (increament) => {
    const nextItemIndex = activeId + increament;
    if (nft.fullImage[activeId + increament]) {
      // setActiveProductImage(nft.fullImage[activeId + increament]);
      setActiveId(activeId + increament);
    } else {
      if (increament === -1) {
        // setActiveProductImage(product.fullImage[product.fullImage.length - 1]);
        setActiveId(nft.fullImage.length - 1);
        debugger;
      } else {
        // setActiveProductImage(product.fullImage[0]);
        setActiveId(0);
      }
    }
  };

  const handlePaymentSelect = (index) => {
    setSelectedToken(index);
    getBalances(paymentRequest?.paymentMethods[index], paymentRequest?.chainId);
  };

  const isBidValid = () => {
    if (MinimumBidAllow > bid) {
      dispatch(
        toggleGeneralPopup({
          status: 'error',
          message: `Your bid needs to be at least ` + MinimumBidAllow,
          size: 'sm',
          textButton: 'OK'
        })
      );
    }
    return MinimumBidAllow <= bid;
  };

  const handleSetBid = async (value) => {
    // set converted usd amount
    const isValidNum = value !== '' && value.indexOf('.') !== value.length - 1;
    if (isValidNum) {
      const params = {
        chainId: ChainHexString(activeNetwork),
        price: Moralis.Units.ETH(value),
        token: TokenName(
          paymentRequest?.paymentMethods[selectedToken].toLowerCase(),
          paymentRequest?.chainId
        ),
        native: false
      };
      const usd = await convertPrice(Moralis, params);
      setBidUSD(String(usd));
    } else {
      String(String(0));
    }
  };

  const ProductAutoPost = async () => {
    let msgpost = '' + nft?.title + ' has a new bid';
    let buyPrice = bid;
    if (buyPrice) {
      msgpost +=
        ' of ' +
        buyPrice +
        ' ' +
        TokenName(
          paymentRequest?.paymentMethods[selectedToken].toLowerCase(),
          paymentRequest?.chainId
        );
    }
    msgpost +=
      ' placed by ' +
      formatAdddress(user?.attributes?.ethAddress) +
      ' ' +
      url +
      ' #MEDIAEYE #nftplatform #nftbids';
    await twitterPostAuto(msgpost, nft?.img);
  };

  const handleBid = async () => {
    // request switch chain if not on correct
    if (ChainHexString(activeNetwork) !== paymentRequest?.chainId) {
      ChangeChainRequest(paymentRequest?.chainId);
      return;
    }

    if (approved) {
      if (!isBidValid()) {
        return;
      }

      // create hash for the bid
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
          AuctionSignature: [
            { name: 'auctionId', type: 'uint256' },
            { name: 'price', type: 'uint256' },
            { name: 'bidder', type: 'address' },
            { name: 'paymentMethod', type: 'address' }
          ]
        };

        const domain = {
          name: 'MediaEyeMarketplace',
          version: '1',
          chainId: paymentRequest?.chainId,
          verifyingContract: ContractAddress('AUCTION', paymentRequest?.chainId)
        };

        const msgParams = {
          types: types,
          primaryType: 'AuctionSignature',
          domain: domain,
          message: {
            auctionId: paymentRequest.listingId,
            price: ethers.utils.parseEther(bid).toString(),
            bidder: user.attributes.ethAddress,
            paymentMethod: paymentRequest?.paymentMethods[selectedToken]
          }
        };

        try {
          // wait for user to sign
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
            bidder: user.attributes.ethAddress,
            v: v,
            r: r.toString('hex'),
            s: s.toString('hex'),
            listingId: paymentRequest.listingId,
            price: ethers.utils.parseEther(bid).toString(),
            chainHex: ChainHexString(paymentRequest.chainId),
            paymentMethod: paymentRequest?.paymentMethods[selectedToken]
          };
          const createBid = await Moralis.Cloud.run('createBid', request);

          dispatch(closeGeneralPopup());
          props.togglePopupBid();
          dispatch(
            toggleGeneralPopup({
              status: 'success',
              title: 'Transaction Successful',
              message: 'For more details view:',
              size: 'sm',
              copyText: request?.paymentMethod,
              copyTextLink:
                ChainScanerLink(paymentRequest?.chainId) +
                '/address/' +
                request?.paymentMethod,
              textButton: 'OK',
              autoClose: 'false'
            })
          );
          ProductAutoPost();
          history.push('/refresh');
        } catch (error) {
          dispatch(
            toggleGeneralPopup({
              status: 'error',
              message: error?.data?.message
                ? error.data.message
                : error.message
                ? error.message
                : 'Something Went Wrong!',
              size: 'sm',
              textButton: 'OK'
            })
          );
        }
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
          TokenName(
            paymentRequest?.paymentMethods[selectedToken].toLowerCase(),
            paymentRequest?.chainId
          ),
          ContractAddress('AUCTION', paymentRequest?.chainId)
        );
        dispatch(closeGeneralPopup());
        if (isApproved?.status) {
          setApproved(true);
          props.togglePopupBid();
          dispatch(
            toggleGeneralPopup({
              status: 'success',
              title: 'Transaction Successful',
              message: 'For more details view:',
              size: 'sm',
              copyText: isApproved?.transactionHash,
              copyTextLink:
                ChainScanerLink(paymentRequest?.chainId) +
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
            message: error?.data?.message
              ? error.data.message
              : error.message
              ? error.message
              : 'Something Went Wrong!',
            size: 'sm',
            textButton: 'OK'
          })
        );
      }
    }
  };

  const checkApproved = async () => {
    // check if the amount for token is approved
    const bigWei = ethers.BigNumber.from(paymentRequest?.prices[selectedToken]);
    let isApproved = await checkAllowance(
      Moralis,
      TokenName(
        paymentRequest?.paymentMethods[selectedToken]?.toLowerCase(),
        paymentRequest?.chainId
      ),
      user?.attributes?.ethAddress,
      bigWei,
      ContractAddress('AUCTION', paymentRequest?.chainId)
    );
    setApproved(isApproved);
  };

  useEffect(() => {
    if (user && paymentRequest?.paymentMethods) {
      checkApproved();
    }
  }, [user, selectedToken, paymentRequest]);

  const toggleTermsAgree = () => {
    setTermsAgree(!termsAgree);
  };
  useEffect(() => {
    setMinimumBidAllow((Math.ceil(topBid * 1.1 * 100000) / 100000).toString());
    setBid((Math.ceil(topBid * 1.1 * 100000) / 100000).toString());
  }, [topBid]);

  useEffect(() => {
    handleSetBid(bid);
  }, [bid]);

  const handleBidPrice = (value) => {
    if (value > availableBalance) {
      dispatch(
        toggleGeneralPopup({
          status: 'error',
          message:
            'Bid amount should not be greater than available banance ' +
            availableBalance +
            ' ' +
            TokenName(
              paymentRequest?.paymentMethods[selectedToken].toLowerCase(),
              paymentRequest?.chainId
            ),
          size: 'sm',
          textButton: 'OK'
        })
      );
      setBid(availableBalance);
      return;
    }
    setBid(value);
  };
  return (
    <React.Fragment>
      {props.showPopup ? (
        <div
          className={
            props.showPopup
              ? 'mediaeye-popup active mediaeye-popup-sm'
              : 'mediaeye-popup'
          }
        >
          <div
            className="mediaeye-popup-wrapper mediaeye-popup-product-page scrolled"
            onClick={props.togglePopupBid}
          >
            <div className="mediaeye-popup-content">
              <div
                className="mediaeye-popup-content-inner"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="mediaeye-popup-content-inner-header">
                  <div className="mediaeye-popup-content-inner-header-title text-center">
                    Place a Bid
                  </div>
                </div>
                <div
                  className="mediaeye-popup-close"
                  onClick={props.togglePopupBid}
                >
                  <CloseIcon />
                </div>

                <div className="mediaeye-popup-product-page-imgbox">
                  <div className="mediaeye-popup-product-page-imgbox-slide">
                    {nft?.img && mimetype ? (
                      mimetype === 'video/mp4' ? (
                        <video
                          preload="metadata"
                          src={nft?.img}
                          loop
                          controls
                          playsInline
                          controlsList="nodownload"
                        >
                          Your browser does not support the video tag.
                        </video>
                      ) : mimetype === 'model/gltf+json' ||
                        mimetype === 'model/gltf-binary' ? (
                        <Model3d model={nft?.img} type={mimetype} />
                      ) : (
                        <img src={nft?.img} alt="NFTImg" />
                      )
                    ) : nft?.img.length > 1 ? (
                      <div className="mediaeye-popup-product-page-imgbox-slide-fordundle">
                        <button
                          className="mediaeye-popup-product-page-imgbox-slide-fordundle-arrows"
                          onClick={() => handleNext(-1)}
                        >
                          <Angle side={'left'} />
                        </button>
                        <img
                          src={nft?.img[activeId]}
                          alt={nft?.title ? nft.title : 'Title NFT'}
                        />
                        <button
                          className="mediaeye-popup-product-page-imgbox-slide-fordundle-arrows rightone"
                          onClick={() => handleNext(1)}
                        >
                          <Angle />
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="mediaeye-popup-product-page-title">
                  {nft?.title}
                </div>
                <div className="mediaeye-popup-product-page-row">
                  <div className="mediaeye-popup-product-page-label">Price</div>
                  <div className="mediaeye-popup-product-page-tokenlistwithprice">
                    <div className="mediaeye-popup-product-page-tokenlistwithprice-token">
                      <div
                        className={`mediaeye-popup-product-page-tokenlistwithprice-token-header ${
                          showDropdown
                            ? 'mediaeye-popup-product-page-tokenlistwithprice-token-header-active'
                            : ''
                        }`}
                        onClick={
                          hasMultiplePaymentMethods()
                            ? () => setShowDropdown(!showDropdown)
                            : null
                        }
                      >
                        <img
                          src={
                            '/img/token/34/' +
                            TokenName(
                              paymentRequest?.paymentMethods[
                                selectedToken
                              ].toLowerCase(),
                              paymentRequest?.chainId
                            ) +
                            '.png'
                          }
                          alt="token"
                        />
                        <span>
                          {TokenName(
                            paymentRequest?.paymentMethods[
                              selectedToken
                            ].toLowerCase(),
                            paymentRequest?.chainId
                          )}
                        </span>
                        {hasMultiplePaymentMethods() ? (
                          <Angle side="down" />
                        ) : null}
                      </div>
                      {showDropdown ? (
                        <div className="mediaeye-popup-product-page-tokenlistwithprice-token-body">
                          {showPaymentMethods()}
                        </div>
                      ) : null}
                    </div>
                    <div className="mediaeye-popup-product-page-tokenlistwithprice-price">
                      <input
                        className="mediaeye-popup-product-page-tokenlistwithprice-price-input"
                        type="text"
                        value={bid}
                        onChange={(e) =>
                          handleBidPrice(allowOnlyNumber(e.target.value))
                        }
                        placeholder="Enter bid"
                      />
                      <div className="mediaeye-popup-product-page-tokenlistwithprice-price-addon">
                        ${roundString(ethers.utils.formatEther(bidUSD), 2)}
                      </div>
                    </div>
                  </div>
                  <div className="mediaeye-popup-product-page-helper text-right">
                    Available: {availableBalance ?? 0}{' '}
                    {TokenName(
                      paymentRequest?.paymentMethods[
                        selectedToken
                      ].toLowerCase(),
                      paymentRequest?.chainId
                    )}
                  </div>
                </div>
                <div className="checkout-popup">
                  <div className="mediaeye-popup-product-page-row">
                    <AgreeBlock
                      agree={termsAgree}
                      toggleAgree={toggleTermsAgree}
                    />
                  </div>
                </div>

                <div className="mediaeye-popup-product-page-bottom">
                  <button
                    type="button"
                    disabled={!termsAgree}
                    className={
                      termsAgree
                        ? 'btn btn-info btn-lg'
                        : 'btn btn-disable btn-lg'
                    }
                    onClick={handleBid}
                  >
                    {approved ? 'PLACE BID' : `APPROVE BID`}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default PopupBid;
