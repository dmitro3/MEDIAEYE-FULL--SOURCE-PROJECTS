import React, { useContext, useState, useEffect } from 'react';
import { Angle, CloseIcon, EyeSwap } from '../../Icons';
import { useSelector, useDispatch } from 'react-redux';
import { useMoralis } from 'react-moralis';
import {
  paySubscription,
  getSubscriptionAmount
} from '../../../blockchain/functions/Subscription';
import { SubscriptionPopupContext } from '../../../context/SubscriptionPopupContext';
import {
  checkAllowance,
  requestTokenApproval
} from '../../../blockchain/functions/ApproveToken';
import { UserContext } from '../../../context/UserContext';
import {
  ContractAddress,
  TokenAddress
} from '../../../blockchain/functions/Addresses';
import './Popup.scss';
import { ethers } from 'ethers';
import {
  roundString,
  numberRoundConverter
} from '../../../blockchain/functions/Utils';
import {
  toggleGeneralPopup,
  closeGeneralPopup
} from '../../../store/app/appSlice';
import {
  ChainName,
  ChainScanerLink
} from '../../../blockchain/functions/ChangeChain/ChainNames';
import { ChainHexString } from '../../../blockchain/functions/ChangeChain';
import { checkERC20Balance } from '../../../blockchain/functions/ApproveToken/CheckERC20Balance';
import {
  TokenDecimalFormat,
  TokenDecimal
} from '../../../blockchain/functions/Addresses/TokenDecimals';
import EyeSwapPro from '../../Modals/EyeSwap-Open/EyeSwapPro';

const SubscriptionPopup = (props) => {
  const dispatch = useDispatch();
  const { isAuthenticated, isInitialized, user, Moralis, refetchUserData } =
    useMoralis();
  const [activeToken, setActiveToken] = useState(null);
  const [activeDay, setActiveDay] = useState(30);
  const [activeListId, setActiveListId] = useState(1);
  const { level, startRefreshingUser } = useContext(SubscriptionPopupContext);
  const { setUser } = useContext(UserContext);
  const activeNetwork = useSelector((state) => state.app.activeNetwork);
  const [isApproved, setApproved] = useState(true);
  const [paymentTokensList, setPaymentTokensList] = useState([]);
  const [displayAmount, setDisplayAmount] = useState();
  const [openEyeswap, setOpenEyeswap] = useState(false);
  const [chainWarning, setChainWarning] = useState(false);

  // reset activeToken on network change
  useEffect(() => {
    if (activeNetwork === process.env.REACT_APP_BSC_CHAIN_NAME) {
      setActiveToken('BNB');
      let array = [
        {
          id: 1,
          token: [
            {
              name: 'BNB',
              img: '/img/token/34/BNB.png',
              des: 'Binance'
            },
            {
              name: 'BUSD',
              img: '/img/token/34/BUSD.png',
              des: 'BUSD'
            }
          ],
          payment: [
            {
              time: 30,
              price: selectedSubscriptionPrice(30),
              offer: ''
            },
            {
              time: 90,
              price: selectedSubscriptionPrice(90, 10),
              offer: '10'
            }
          ]
        },
        {
          id: 2,
          offer: '15',
          token: [
            {
              name: 'eYe',
              img: '/img/token/34/EYE.png',
              des: 'MEDIA EYE'
            }
          ],
          payment: [
            {
              time: 30,
              price: selectedSubscriptionPrice(30, 15),
              offer: ''
            },
            {
              time: 90,
              price:
                selectedSubscriptionPrice(90, 15) -
                (selectedSubscriptionPrice(90, 15) / 100) * 10,
              offer: '10'
            }
          ]
        }
      ];
      setPaymentTokensList(array);
    } else if (activeNetwork === 'FTM') {
      let array = [
        {
          id: 1,
          token: [
            {
              name: 'FTM',
              img: '/img/token/34/FTM.png',
              des: 'Fantom'
            },
            {
              name: 'USDC',
              img: '/img/token/34/USDC.png',
              des: 'USD Coin'
            }
          ],
          payment: [
            {
              time: 30,
              price: selectedSubscriptionPrice(30),
              offer: ''
            },
            {
              time: 90,
              price: selectedSubscriptionPrice(90, 10),
              offer: '10'
            }
          ]
        }
      ];
      setPaymentTokensList(array);
      setActiveToken('FTM');
    } else if (activeNetwork === 'ETH') {
      let array = [
        {
          id: 1,
          token: [
            {
              name: 'ETH',
              img: '/img/token/34/ETH.png',
              des: 'Ethereum'
            },
            {
              name: 'USDT',
              img: '/img/token/34/USDT.png',
              des: 'Tether'
            }
          ],
          payment: [
            {
              time: 30,
              price: selectedSubscriptionPrice(30),
              offer: ''
            },
            {
              time: 90,
              price: selectedSubscriptionPrice(90, 10),
              offer: '10'
            }
          ]
        },
        {
          id: 2,
          offer: '15',
          token: [
            {
              name: 'eYe',
              img: '/img/token/34/EYE.png',
              des: 'MEDIA EYE'
            }
          ],
          payment: [
            {
              time: 30,
              price: selectedSubscriptionPrice(15),
              offer: ''
            },
            {
              time: 90,
              price:
                selectedSubscriptionPrice(90, 15) -
                (selectedSubscriptionPrice(90, 15) / 100) * 10,
              offer: '10'
            }
          ]
        }
      ];
      setPaymentTokensList(array);
      setActiveToken('ETH');
    }
  }, [activeNetwork, level]);

  useEffect(() => {
    // check if contract is approved if token is non-native
    if (activeToken && isInitialized) {
      initialApprove(activeToken);
    }
  }, [activeNetwork, activeToken, isInitialized]);

  useEffect(() => {
    if (activeDay && activeNetwork && activeToken && isInitialized && level) {
      getDisplayAmount();
    }
  }, [activeDay, activeNetwork, activeToken, isInitialized, level]);

  const getDisplayAmount = async () => {
    let tokenAmount = await getSubscriptionAmount(
      Moralis,
      activeToken.toUpperCase(),
      level,
      activeDay
    );
    setDisplayAmount(
      roundString(TokenDecimalFormat(tokenAmount, TokenDecimal(activeToken)), 4)
    );
  };
  const initialApprove = async (activeToken) => {
    if (user && activeNetwork) {
      // check if an amount larger than 0 is already approved, we check again when button is pressed
      let isApproved = await checkAllowance(
        Moralis,
        activeToken.toUpperCase(),
        user.attributes.ethAddress,
        1,
        ContractAddress('FEE', activeNetwork)
      );
      setApproved(isApproved);
    }
  };

  const onSubscribePressed = async () => {
    // currently disallow subscribing on a chain if subscription already exists on a different chain
    if (
      user?.attributes?.subscriptionChain &&
      activeNetwork !== ChainName(user?.attributes?.subscriptionChain) &&
      user?.attributes?.subscriptionEnd >= Date.now() / 1000 &&
      user?.attributes.subscriptionChain !== 'PROMO'
    ) {
      dispatch(
        toggleGeneralPopup({
          status: 'error',
          title: `Subscription already exists on ${ChainName(
            user.attributes.subscriptionChain
          )}`,
          message: `Subscription already exists on ${ChainName(
            user.attributes.subscriptionChain
          )}. You will your current subscription and start again from your last recording subscription on  ${ChainName(
            user.attributes.subscriptionChain
          )} if you proceed.`,
          size: 'sm',
          textButton: 'OK',
          autoClose: 'false'
        })
      );
      if (!chainWarning) {
        setChainWarning(true);
        return;
      }
    }
    if (activeDay && activeToken) {
      try {
        // get token amount from subscription contract

        let tokenAmount = await getSubscriptionAmount(
          Moralis,
          activeToken.toUpperCase(),
          level,
          activeDay
        );

        // check balance
        if (!(await checkTokenBalance(tokenAmount))) {
          dispatch(
            toggleGeneralPopup({
              status: 'error',
              title: 'Transaction Failed',
              message: 'Metamask Insufficient Balance for Purchase',
              size: 'sm',
              textButton: 'OK'
            })
          );
          return;
        }

        // check if the amount for token is approved
        let isApproved = await checkAllowance(
          Moralis,
          activeToken.toUpperCase(),
          user.attributes.ethAddress,
          tokenAmount,
          ContractAddress('FEE', activeNetwork)
        );
        // if amount is not approved request amount
        if (!isApproved) {
          dispatch(
            toggleGeneralPopup({
              status: 'loading',
              message: 'Processing...',
              size: 'xs',
              autoClose: 'false'
            })
          );
          let requestApproved = await requestTokenApproval(
            Moralis,
            activeToken.toUpperCase(),
            ContractAddress('FEE', activeNetwork)
          );

          if (requestApproved?.status) {
            isApproved = true;
            setApproved(isApproved);
            dispatch(
              toggleGeneralPopup({
                status: 'success',
                title: 'Token Approve Successful',
                message: 'For more details view:',
                size: 'sm',
                copyText: requestApproved?.transactionHash,
                copyTextLink:
                  ChainScanerLink(activeNetwork) +
                  '/tx/' +
                  requestApproved?.transactionHash,
                textButton: 'OK',
                autoClose: 'false'
              })
            );
          } else {
            isApproved = false;
            dispatch(
              toggleGeneralPopup({
                status: 'error',
                title: 'Token Approve Failed',
                message: requestApproved?.data?.message
                  ? requestApproved.data.message
                  : requestApproved.message
                  ? requestApproved.message
                  : 'Something went wrong. Try again',
                size: 'sm',
                textButton: 'OK'
              })
            );
          }
          return;
        } else {
          dispatch(
            toggleGeneralPopup({
              status: 'loading',
              message: 'Processing...',
              size: 'xs',
              autoClose: 'false'
            })
          );
          // if duration is 30 set to 0 if duration is 90 set to 1
          const duration = activeDay === 30 ? '0' : '1';
          const res = await paySubscription(
            Moralis,
            duration,
            activeToken.toUpperCase(),
            tokenAmount,
            level,
            setUser
          );
          dispatch(closeGeneralPopup());
          if (res?.status) {
            startRefreshingUser(user.attributes.subscriptionEnd);
            dispatch(
              toggleGeneralPopup({
                status: 'success',
                title: 'Subscription Successful',
                message:
                  'Please allow blockchain transaction to be included in the next block to take effect on your subscription. Refresh the page in a few minutes.',
                submessage: 'For more details view:',
                size: 'sm',
                copyText: res?.transactionHash,
                copyTextLink:
                  ChainScanerLink(activeNetwork) +
                  '/tx/' +
                  res?.transactionHash,
                textButton: 'OK',
                autoClose: 'false'
              })
            );
          } else {
            dispatch(
              toggleGeneralPopup({
                status: 'error',
                title: 'Transaction Failed',
                message: res?.data?.message
                  ? res.data.message
                  : res.message
                  ? res.message
                  : 'Something went wrong. Try again',
                size: 'sm',
                textButton: 'OK'
              })
            );
          }
        }
      } catch (e) {
        dispatch(closeGeneralPopup());
        if (e.code === -32603) {
          if (e.data.code === -32000 || e.data.code === 3) {
            dispatch(
              toggleGeneralPopup({
                status: 'error',
                message: 'Metamask Insufficient Balance for Purchase',
                size: 'sm',
                textButton: 'OK'
              })
            );
          }
        } else if (e.code === -32002) {
          dispatch(
            toggleGeneralPopup({
              status: 'error',
              message: e?.data?.message
                ? e.data.message
                : e.message
                ? e.message
                : 'Something Went Wrong!',
              size: 'sm',
              textButton: 'OK'
            })
          );
        } else {
          dispatch(
            toggleGeneralPopup({
              status: 'error',
              message: e?.data?.message
                ? e.data.message
                : e.message
                ? e.message
                : 'Something went wrong. Try again',
              size: 'sm',
              textButton: 'OK'
            })
          );
        }
      }
    }
  };

  const checkTokenBalance = async (tokenAmount) => {
    const tokenAddress = TokenAddress(activeToken.toUpperCase(), activeNetwork);
    let amount = 0;
    let isNative = false;
    if (
      activeNetwork === activeToken.toUpperCase() ||
      activeToken.toUpperCase() === 'BNB'
    )
      isNative = true;

    amount = await checkERC20Balance(Moralis, tokenAddress, isNative);
    if (tokenAmount?.lte(amount)) {
      return true;
    }
    return false;
  };

  const selectPaymentToken = function (token, id) {
    setActiveToken(token);
    setActiveListId(id);
  };

  const selectedSubscriptionPrice = (days, offer = 0) => {
    if (level === 1) {
      return days === 30 ? 30 - (30 / 100) * offer : 90 - (90 / 100) * offer;
    } else {
      return days === 30 ? 50 - (50 / 100) * offer : 150 - (150 / 100) * offer;
    }
  };

  const displayNetworkButtons = () => {
    return (
      <div
        className="mediaeye-popup-subscription-tokens"
        onClick={() => setOpenEyeswap(false)}
      >
        {paymentTokensList.map((key, i) => (
          <div className="mediaeye-popup-subscription-tokens-col">
            <div className="mediaeye-popup-subscription-tokens-col-label">
              Payment tokens
            </div>
            <div className="mediaeye-popup-subscription-tokens-col-inner">
              {key.offer ? (
                <div className="mediaeyepayment-offer">{key.offer}% OFF</div>
              ) : null}
              <div className="mediaeyetoken">
                {key.token.map((token, t) => (
                  <div
                    className={
                      activeToken === token.name
                        ? 'active mediaeyetoken-box'
                        : 'mediaeyetoken-box'
                    }
                  >
                    <div
                      className="mediaeyetoken-box-inner"
                      onClick={() => {
                        selectPaymentToken(token.name, key.id);
                      }}
                    >
                      <div className="mediaeyetoken-box-icon">
                        <img src={token.img} alt={token.name} />
                      </div>
                      <div className="mediaeyetoken-box-content">
                        <div className="mediaeyetoken-box-content-name">
                          {token.name}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mediaeye-popup-subscription-tokens-col-label">
                Subscription term
              </div>
              <div className="mediaeyepayment">
                {key.payment.map((payment, p) => (
                  <div
                    className={
                      activeDay === payment.time && activeListId === key.id
                        ? 'mediaeyepayment-box active'
                        : 'mediaeyepayment-box'
                    }
                  >
                    <div
                      className="mediaeyepayment-box-inner"
                      onClick={() => {
                        setActiveDay(payment.time);
                      }}
                    >
                      <div className="mediaeyepayment-box-time">
                        {payment.time} Days
                      </div>
                      <div className="mediaeyepayment-box-offer">
                        {payment.offer ? (
                          <div className="mediaeyepayment-box-offer-label">
                            {payment.offer}% OFF
                          </div>
                        ) : null}
                      </div>
                      <div className="mediaeyepayment-box-price">
                        ${numberRoundConverter(payment.price, 2, 2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* end mediaeyepayment */}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <React.Fragment>
      {props.showPopup ? (
        <div
          className={
            props.showPopup ? 'mediaeye-popup active' : 'mediaeye-popup'
          }
        >
          <div
            className="mediaeye-popup-wrapper mediaeye-popup-subscription scrolled"
            onClick={props.togglePopup}
            level={level}
          >
            <div className="mediaeye-popup-content">
              <div
                className="mediaeye-popup-content-inner"
                level={level}
                onClick={(event) => {
                  event.stopPropagation();
                }}
              >
                <div className="mediaeye-popup-content-inner-header">
                  <div className="mediaeye-popup-content-inner-header-title mediaeye-popup-subscription-headers">
                    <span onClick={() => setOpenEyeswap(false)}>
                      {' '}
                      Selected Subscription
                    </span>
                    <div
                      className={
                        openEyeswap
                          ? 'mediaeye-popup-subscription-headers-eyes oepnn'
                          : 'mediaeye-popup-subscription-headers-eyes'
                      }
                      onClick={() => setOpenEyeswap(!openEyeswap)}
                    >
                      <div className="mediaeye-popup-subscription-headers-eyes-left">
                        <EyeSwap type={'green'} />
                        eYeSwap
                      </div>
                      <Angle side={openEyeswap ? 'up' : 'down'} />
                    </div>
                  </div>
                  <div className="subscription-level" level={level}>
                    {level > 0 ? 'LVL ' + level : 'Free'}
                  </div>
                </div>
                <div className="mediaeye-popup-subscription-eyedropdown">
                  {openEyeswap ? <EyeSwapPro /> : null}
                </div>

                <div
                  className="mediaeye-popup-close"
                  onClick={props.togglePopup}
                >
                  <CloseIcon />
                </div>
                {displayNetworkButtons()}

                <div
                  className="mediaeye-popup-subscription-bottom"
                  onClick={() => setOpenEyeswap(false)}
                >
                  <div className="mediaeye-popup-subscription-bottom-col"></div>
                  <div className="mediaeye-popup-subscription-bottom-col">
                    <button
                      type="button"
                      className="btn btn-main"
                      onClick={onSubscribePressed}
                    >
                      <span>{isApproved ? 'Subscribe' : 'Approve'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default SubscriptionPopup;
