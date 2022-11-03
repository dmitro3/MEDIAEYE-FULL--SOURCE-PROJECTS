import React, { useState, useEffect } from 'react';
import { CloseIcon, Angle, EyeSwap, Heart } from '../../Icons/';
import { useSelector, useDispatch } from 'react-redux';
import { useMoralis } from 'react-moralis';
import {
  checkAllowance,
  requestTokenApproval
} from '../../../blockchain/functions/ApproveToken';
import {
  ContractAddress,
  TokenName
} from '../../../blockchain/functions/Addresses';
import { buyListing } from '../../../blockchain/functions/Marketplace/BuyListing';
import { ethers } from 'ethers';
import {
  convertPrice,
  queryFileType,
  roundString,
  allowOnlyNumber,
  GetNetworkIcon
} from '../../../blockchain/functions/Utils';
import { zeroAddress } from 'ethereumjs-util';
import './Popup.scss';
import { Model3d } from '../../3d/Model3d';
import AgreeBlock from '../../Common/AgreeBlock';
import {
  toggleGeneralPopup,
  closeGeneralPopup
} from '../../../store/app/appSlice';
import {
  ChainName,
  ChainScanerLink
} from '../../../blockchain/functions/ChangeChain/ChainNames';
import { twitterPostAuto } from '../../../blockchain/functions/Bot';
import formatAdddress from '../../../utils/formatAdddress';
import { TokenAddressDecimal } from '../../../blockchain/functions/Addresses/TokenDecimals';
import SwapPopup from '../../Modals/SwapPopup.js/SwapPopup';
import ExploreNormalCard from '../../ContentMarketplace/ExploreBlock/ExploreNormalCard';

export const PopupCheckout = (props) => {
  const { paymentRequest, nft, currListing, mimetype } = props;
  const [selectedToken, setSelectedToken] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const { Moralis, user } = useMoralis();
  const [amount, setAmount] = useState(1);
  const [approved, setApproved] = useState(false);
  const [slippage, setSlippage] = useState(5);
  const chainlink = currListing?.attributes?.chainlinkPayment;
  const [convertedPrice, setConvertedPrice] = useState(null);
  const [termsAgree, setTermsAgree] = useState(false);
  const dispatch = useDispatch();
  const url = window.location.href;
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const getConvertedPrice = async () => {
      // if chainlink is true, convert a price to display
      if (chainlink && chainlink[0]) {
        let payments = currListing?.attributes?.listingPayments;
        let chainlink = currListing?.attributes?.chainlinkPayment;
        // using chainlink estimation, handle new approximated price based on the primary tokens price
        const newPrice = await convertPrice(Moralis, {
          baseToken: TokenName(payments[0][0], nft?.chainId),
          chainId: nft?.chainId,
          price: payments[0][1],
          native: chainlink[1] === zeroAddress() ? true : false,
          token: TokenName(chainlink[1], nft?.chainId)
        });
        setConvertedPrice(newPrice);
      } else {
        const payments = currListing?.attributes?.listingPayments;
        if (payments[0][0] === zeroAddress()) {
          const newPrice = await convertPrice(Moralis, {
            chainId: nft?.chainId,
            price: payments[0][1],
            native: false,
            token: TokenName(payments[0][0], nft?.chainId)
          });
          setConvertedPrice(newPrice);
        } else setConvertedPrice(payments[0][1]);
      }
    };
    getConvertedPrice();
  }, [currListing]);

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
            />
            <span>
              {TokenName(method.toLowerCase(), paymentRequest.chainId)}
            </span>
          </div>
        </>
      );
    });
  };

  const handlePaymentSelect = (index) => {
    setSelectedToken(index);
  };

  const handleBuy = async (e) => {
    dispatch(
      toggleGeneralPopup({
        status: 'loading',
        message: 'Processing...',
        size: 'xs'
      })
    );
    if (approved) {
      // take price * amount of nfts to buy with ethers BigNumber for safe multiplication
      // if secondary token, add slippage to calculation
      const bigWei =
        paymentRequest?.paymentMethods[selectedToken]?.toLowerCase() ===
          chainlink[1].toLowerCase() && chainlink[0]
          ? ethers.BigNumber.from(convertedPrice)
              .mul(Number(slippage) > 0 ? 100 + Number(slippage) : 100)
              .div(100)
          : ethers.BigNumber.from(paymentRequest?.prices[selectedToken]);

      const price = bigWei.mul(amount);
      const buyReq = {
        _amount: amount,
        _listingId: paymentRequest?.listingId,
        _paymentMethod: [paymentRequest?.paymentMethods[selectedToken], price]
      };

      const result = await buyListing(Moralis, buyReq);
      dispatch(closeGeneralPopup());
      if (result?.status) {
        props.togglePopup();
        dispatch(
          toggleGeneralPopup({
            status: 'success',
            title: 'Your purchase is successful',
            message: 'For more details view:',
            size: 'sm',
            copyText: result?.transactionHash,
            copyTextLink:
              ChainScanerLink(paymentRequest?.chainId) +
              '/tx/' +
              result?.transactionHash,
            textButton: 'OK',
            autoClose: 'false'
          })
        );
        ProductAutoPost();
      } else {
        if (result?.code === -32603 && result?.data?.code === -32000) {
          dispatch(
            toggleGeneralPopup({
              status: 'error',
              message: 'Metamask Insufficient Balance for Purchase',
              size: 'sm',
              textButton: 'OK'
            })
          );
        } else {
          dispatch(
            toggleGeneralPopup({
              status: 'error',
              message: result?.data?.message
                ? result.data.message
                : result.message
                ? result.message
                : 'Something went wrong. Try again',
              size: 'sm',
              textButton: 'OK'
            })
          );
        }
      }
    } else {
      const isApproved = await requestTokenApproval(
        Moralis,
        TokenName(
          paymentRequest?.paymentMethods[selectedToken].toLowerCase(),
          paymentRequest?.chainId
        ),
        ContractAddress('LISTING', paymentRequest?.chainId)
      );
      dispatch(closeGeneralPopup());
      if (isApproved?.status) {
        setApproved(true);
        props.togglePopup();
        dispatch(
          toggleGeneralPopup({
            status: 'success',
            title: 'Your purchase is successful',
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
    }
  };
  const ProductAutoPost = async () => {
    let msgpost = '' + nft?.title + ' bought ';
    let buyPrice = chainlink
      ? paymentRequest?.paymentMethods[selectedToken]?.toLowerCase() ===
          chainlink[1].toLowerCase() && chainlink[0]
        ? `${roundString(Moralis.Units.FromWei(convertedPrice), 5)}`
        : roundString(
            Moralis.Units.FromWei(paymentRequest?.prices[selectedToken]),
            5
          )
      : '';
    if (buyPrice) {
      msgpost +=
        ' for ' +
        buyPrice +
        ' ' +
        TokenName(
          paymentRequest?.paymentMethods[selectedToken].toLowerCase(),
          paymentRequest?.chainId
        );
    }
    msgpost +=
      ' by ' +
      formatAdddress(user?.attributes?.ethAddress) +
      ' from ' +
      formatAdddress(currListing?.attributes?.seller) +
      '.  ' +
      url +
      ' #MEDIAEYE  #nftplatform';
    await twitterPostAuto(msgpost, nft?.img);
  };

  const checkApproved = async () => {
    if (convertedPrice > 0) {
      // check if the amount for token is approved
      const bigWei = chainlink
        ? paymentRequest?.paymentMethods[selectedToken]?.toLowerCase() ===
            chainlink[1].toLowerCase() && chainlink[0]
          ? ethers.BigNumber.from(convertedPrice)
          : ethers.BigNumber.from(paymentRequest?.prices[selectedToken])
        : 0;
      const price = bigWei.mul(amount);
      let isApproved = await checkAllowance(
        Moralis,
        TokenName(
          paymentRequest?.paymentMethods[selectedToken]?.toLowerCase(),
          paymentRequest?.chainId
        ),
        user?.attributes?.ethAddress,
        price,
        ContractAddress('LISTING', paymentRequest?.chainId)
      );

      setApproved(isApproved);
    }
  };

  useEffect(() => {
    if (user && paymentRequest?.paymentMethods) {
      checkApproved();
    }
  }, [user, selectedToken, paymentRequest, convertedPrice]);

  const toggleTermsAgree = () => {
    setTermsAgree(!termsAgree);
  };
  const handleEyeswap = () => {
    setShowPopup(!showPopup);
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
            onClick={props.togglePopup}
          >
            <div className="mediaeye-popup-content">
              <div
                className="mediaeye-popup-content-inner"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="mediaeye-popup-content-inner-header">
                  <div className="mediaeye-popup-content-inner-header-title text-center">
                    Complete Checkout
                  </div>
                </div>
                <div
                  className="mediaeye-popup-close"
                  onClick={props.togglePopup}
                >
                  <CloseIcon />
                </div>
                <SwapPopup
                  showPopup={showPopup}
                  handleEyeswap={handleEyeswap}
                />
                <div className="mediaeye-popup-product-page-row">
                  <ExploreNormalCard product={nft} />
                </div>

                <div className="mediaeye-popup-product-page-row">
                  {nft?.collectionType === 'ERC1155' ? (
                    <div className="mediaeye-popup-product-page-checkoutbox">
                      <div className="mediaeye-popup-product-page-checkoutbox-row">
                        <div className="mediaeye-popup-product-page-checkoutbox-col">
                          <div className="mediaeye-popup-product-page-checkoutbox-col-title">
                            Price
                          </div>
                          <div className="mediaeye-popup-product-page-checkoutbox-col-price">
                            <img
                              src={GetNetworkIcon(
                                TokenName(
                                  paymentRequest?.paymentMethods[
                                    selectedToken
                                  ].toLowerCase(),
                                  paymentRequest?.chainId
                                )
                              )}
                            />
                            {chainlink
                              ? paymentRequest?.paymentMethods[
                                  selectedToken
                                ]?.toLowerCase() ===
                                  chainlink[1].toLowerCase() && chainlink[0]
                                ? `${roundString(
                                    convertedPrice /
                                      Math.pow(
                                        10,
                                        TokenAddressDecimal(
                                          paymentRequest?.paymentMethods[
                                            selectedToken
                                          ],
                                          paymentRequest?.chainId
                                        )
                                      ),
                                    5
                                  )}`
                                : `${roundString(
                                    paymentRequest?.prices[selectedToken] /
                                      Math.pow(
                                        10,
                                        TokenAddressDecimal(
                                          paymentRequest?.paymentMethods[
                                            selectedToken
                                          ],
                                          paymentRequest?.chainId
                                        )
                                      ),
                                    5
                                  )}`
                              : 'none'}{' '}
                            {TokenName(
                              paymentRequest?.paymentMethods[
                                selectedToken
                              ].toLowerCase(),
                              paymentRequest?.chainId
                            )}
                            <span className="mediaeye-popup-product-page-checkoutbox-col-price-convert">
                              $
                              {roundString(
                                convertedPrice /
                                  Math.pow(
                                    10,
                                    TokenAddressDecimal(
                                      paymentRequest?.paymentMethods[
                                        selectedToken
                                      ],
                                      paymentRequest?.chainId
                                    )
                                  ),
                                2
                              )}
                            </span>
                          </div>
                        </div>

                        <div className="mediaeye-popup-product-page-checkoutbox-col mediaeye-popup-product-page-checkoutbox-col-qty">
                          <div className="mediaeye-popup-product-page-checkoutbox-col-title">
                            Quantity
                          </div>
                          <div className="mediaeye-popup-product-page-tokenlistwithprice-price">
                            <input
                              className="mediaeye-popup-product-page-tokenlistwithprice-price-input"
                              type="text"
                              min={1}
                              pattern="[0-9]*"
                              value={amount}
                              placeholder="Qty"
                              max={paymentRequest.maxAmount}
                              onChange={(e) => {
                                let value = allowOnlyNumber(
                                  e.target.value,
                                  false
                                );
                                value =
                                  value > paymentRequest.maxAmount
                                    ? paymentRequest.maxAmount
                                    : value;
                                setAmount(value);
                              }}
                              onBlur={(e) => {
                                if (
                                  !amount ||
                                  (amount && parseInt(amount) === 0)
                                ) {
                                  setAmount(1);
                                }
                              }}
                            />
                            <div
                              className="mediaeye-popup-product-page-tokenlistwithprice-price-max"
                              onClick={() =>
                                setAmount(Number(paymentRequest.maxAmount))
                              }
                            >
                              MAX
                            </div>
                          </div>

                          <button
                            type="button"
                            className="eyeswap-button"
                            onClick={() => {
                              handleEyeswap();
                            }}
                          >
                            <EyeSwap />
                            <span>eYeSwap</span>
                          </button>
                        </div>

                        <div className="mediaeye-popup-product-page-checkoutbox-col">
                          <div className="mediaeye-popup-product-page-checkoutbox-col-title">
                            Total
                          </div>
                          <div className="mediaeye-popup-product-page-checkoutbox-col-price">
                            <img
                              src={GetNetworkIcon(
                                TokenName(
                                  paymentRequest?.paymentMethods[
                                    selectedToken
                                  ].toLowerCase(),
                                  paymentRequest?.chainId
                                )
                              )}
                            />
                            {chainlink
                              ? paymentRequest?.paymentMethods[
                                  selectedToken
                                ]?.toLowerCase() ===
                                  chainlink[1].toLowerCase() && chainlink[0]
                                ? `${roundString(
                                    convertedPrice /
                                      Math.pow(
                                        10,
                                        TokenAddressDecimal(
                                          paymentRequest?.paymentMethods[
                                            selectedToken
                                          ],
                                          paymentRequest?.chainId
                                        )
                                      ),
                                    5
                                  )}`
                                : `${roundString(
                                    paymentRequest?.prices[selectedToken] /
                                      Math.pow(
                                        10,
                                        TokenAddressDecimal(
                                          paymentRequest?.paymentMethods[
                                            selectedToken
                                          ],
                                          paymentRequest?.chainId
                                        )
                                      ),
                                    5
                                  )}`
                              : 'none'}{' '}
                            {TokenName(
                              paymentRequest?.paymentMethods[
                                selectedToken
                              ].toLowerCase(),
                              paymentRequest?.chainId
                            )}
                            <span className="mediaeye-popup-product-page-checkoutbox-col-price-convert">
                              $
                              {roundString(
                                convertedPrice /
                                  Math.pow(
                                    10,
                                    TokenAddressDecimal(
                                      paymentRequest?.paymentMethods[
                                        selectedToken
                                      ],
                                      paymentRequest?.chainId
                                    )
                                  ),
                                2
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="mediaeye-popup-product-page-checkoutbox mediaeye-popup-product-page-checkoutbox text-center">
                      <div className="mediaeye-popup-product-page-checkoutbox-row">
                        <div className="mediaeye-popup-product-page-checkoutbox-col">
                          <div className="mediaeye-popup-product-page-checkoutbox-col-title">
                            Total
                          </div>
                          <div className="mediaeye-popup-product-page-checkoutbox-col-price">
                            <img
                              src={GetNetworkIcon(
                                TokenName(
                                  paymentRequest?.paymentMethods[
                                    selectedToken
                                  ].toLowerCase(),
                                  paymentRequest?.chainId
                                )
                              )}
                            />
                            {chainlink
                              ? paymentRequest?.paymentMethods[
                                  selectedToken
                                ]?.toLowerCase() ===
                                  chainlink[1].toLowerCase() && chainlink[0]
                                ? `${roundString(
                                    convertedPrice /
                                      Math.pow(
                                        10,
                                        TokenAddressDecimal(
                                          paymentRequest?.paymentMethods[
                                            selectedToken
                                          ],
                                          paymentRequest?.chainId
                                        )
                                      ),
                                    5
                                  )}`
                                : `${roundString(
                                    paymentRequest?.prices[selectedToken] /
                                      Math.pow(
                                        10,
                                        TokenAddressDecimal(
                                          paymentRequest?.paymentMethods[
                                            selectedToken
                                          ],
                                          paymentRequest?.chainId
                                        )
                                      ),
                                    5
                                  )}`
                              : 'none'}{' '}
                            {TokenName(
                              paymentRequest?.paymentMethods[
                                selectedToken
                              ].toLowerCase(),
                              paymentRequest?.chainId
                            )}
                            <span className="mediaeye-popup-product-page-checkoutbox-col-price-convert">
                              $
                              {roundString(
                                convertedPrice /
                                  Math.pow(
                                    10,
                                    TokenAddressDecimal(
                                      paymentRequest?.paymentMethods[
                                        selectedToken
                                      ],
                                      paymentRequest?.chainId
                                    )
                                  ),
                                2
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="mediaeye-popup-product-page-checkoutbox-row">
                        <button
                          type="button"
                          className="eyeswap-button"
                          onClick={() => {
                            handleEyeswap();
                          }}
                        >
                          <EyeSwap />
                          <span>eYeSwap</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {chainlink ? (
                  <>
                    {paymentRequest?.paymentMethods[
                      selectedToken
                    ]?.toLowerCase() === chainlink[1].toLowerCase() &&
                    chainlink[0] ? (
                      <>
                        <div className="mediaeye-popup-product-page-row">
                          <div className="mediaeye-popup-product-page-label">
                            Set Slippage %
                          </div>
                          <div className="mediaeyeform-group-input">
                            <input
                              type="number"
                              onChange={(e) =>
                                e.target.value >= 0
                                  ? setSlippage(e.target.value)
                                  : 0
                              }
                              placeholder="Enter slippage"
                              value={slippage}
                              min={0}
                              className="mediaeyeform-input"
                            />
                          </div>
                        </div>
                      </>
                    ) : null}
                  </>
                ) : null}
                <div className="checkout-popup">
                  <div className="mediaeye-popup-product-page-row">
                    <AgreeBlock
                      agree={termsAgree}
                      toggleAgree={toggleTermsAgree}
                    />
                  </div>
                </div>
                <div className="mediaeye-popup-product-page-bottom">
                  {termsAgree ? (
                    <button
                      type="button"
                      className="btn btn-info btn-lg"
                      onClick={handleBuy}
                    >
                      {approved ? 'CHECKOUT' : 'APPROVE'}
                    </button>
                  ) : (
                    <button type="button" className="btn btn-disable btn-lg">
                      {approved ? 'CHECKOUT' : 'APPROVE'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default PopupCheckout;
