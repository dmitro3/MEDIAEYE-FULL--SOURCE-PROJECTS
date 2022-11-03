import React, { useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useMoralis } from 'react-moralis';
import { UserContext } from '../../context/UserContext';
import { toggleGeneralPopup } from '../../store/app/appSlice';
import ChangeChainRequest from '../../blockchain/functions/ChangeChain/ChangeChainRequest';
import eth from '../../assets/img/connect-wallet/ETH.png';
import bsc from '../../assets/img/connect-wallet/BSC.png';
import ftm from '../../assets/img/connect-wallet/ftm.png';
import metamask from '../../assets/img/connect-wallet/metamask.png';
import loginCharacter from '../../assets/img/NewConnect_wallet/beardo_men.png';
import walletConnect from '../../assets/img/connect-wallet/Wallet-connect.png';
import DownloadEyewalletApp from './DownloadEyewalletApp';
import { Unstoppable, WalletConnect, Logout } from '../../components/Icons/';
import { TermsPopup } from '../TermsAndConditions/TermsAndConditions';
import UAuth from '@uauth/js';
import ReactTooltip from 'react-tooltip';
import './NewConnectWallet.scss';

const NewConnectWallet = (props) => {
  let location = window.location;
  let url = new URL(location.href);
  let origin = url.origin;
  const uauth = new UAuth({
    clientID: 'd496a1c7-87d0-4c78-aa27-36b46484984c',
    redirectUri: origin,
    scope: 'openid wallet email profile social'
  });
  const dispatch = useDispatch();
  const { Moralis } = useMoralis();
  const { setUser } = useContext(UserContext);
  const selectedChain = useSelector((state) => state.app.activeNetwork);
  let history = useHistory();

  const onConnectMetaMask = async () => {
    if (selectedChain === null) {
      return alert('Please select ETH, BSC, or FTM network');
    }
    try {
      // access MediaEyeUser from Moralis db
      const mediaEyeUser = await Moralis.authenticate();
      // initialize MediaEyeUser with subscription fields if associate addresses user does not exist
      if (mediaEyeUser.attributes.defaultUsername === undefined) {
        await initMediaEyeUser(mediaEyeUser);
      }
      // add user to context
      await setUser(mediaEyeUser);
      // refresh page for login
      if (mediaEyeUser?.attributes.subscriptionLevel === 0) {
        dispatch(
          toggleGeneralPopup({
            status: 'info',
            message:
              'Would you like to become a subscriber for MEDIA EYE platform?',
            textButton: 'Subscribe',
            linkButton: '/profile/subscription'
          })
        );
        if (mediaEyeUser) {
          window.location.href = '/create';
        }
      } else {
        if (mediaEyeUser) {
          window.location.href = '/create';
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onConnectWalletConnect = async () => {
    try {
      // access MediaEyeUser from Moralis db
      const mediaEyeUser = await Moralis.authenticate({
        provider: 'walletconnect'
      });
      // initialize MediaEyeUser with subscription fields if associate addresses user does not exist
      if (mediaEyeUser.attributes.defaultUsername === undefined) {
        await initMediaEyeUser(mediaEyeUser);
      }
      // add user to context
      await setUser(mediaEyeUser);
      // refresh page for login
      if (mediaEyeUser?.attributes.subscriptionLevel === 0) {
        dispatch(
          toggleGeneralPopup({
            status: 'info',
            message:
              'Would you like to become a subscriber for MEDIA EYE platform?',
            textButton: 'Subscribe'
          })
        );
      }
      if (mediaEyeUser) {
        // refresh page for login
        window.location.href = '/create';
      }
    } catch (e) {
      console.log(e);
    }
  };

  const initMediaEyeUser = async (mediaEyeUser) => {
    // TODO: handle initialization in a cloud function
    // set default fields to new user
    mediaEyeUser.set('defaultUsername', true);
    mediaEyeUser.set('subscriptionLevel', 0);
    mediaEyeUser.set('subscriptionStart', 0);
    mediaEyeUser.set('subscriptionEnd', 0);

    // handle current promotion for Nov 1st 2022
    if (Date.now() / 1000 < 1667260800) {
      // get a subscription end time
      let endDate = new Date();
      endDate.setDate(endDate.getDate() + 30);
      mediaEyeUser.set('subscriptionLevel', 1);
      mediaEyeUser.set('subscriptionStart', Math.floor(Date.now() / 1000));
      mediaEyeUser.set('subscriptionEnd', Math.floor(endDate.getTime() / 1000));
      mediaEyeUser.set('subscriptionChain', 'PROMO');
    }
    await mediaEyeUser.save();
  };

  const onConnectTrust = () => { };

  const onConnectBinance = () => { };

  async function handleChainChange(chain) {
    ChangeChainRequest(chain);
  }
  const [termsPopupActive, setTermsPopupActive] = useState(false);

  const toggleTermsPopup = () => {
    setTermsPopupActive(!termsPopupActive);
    console.log(termsPopupActive, 'termsPopupActive');
  };

  const unstoppableDomain = async () => {
    try {
      const authorization = await uauth.loginWithPopup();
      console.log(authorization, 'authorization');
      if (authorization.idToken.wallet_type_hint == 'web3') {
        const email = authorization?.idToken?.email;
        const location = authorization?.idToken?.location;
        const Name = authorization?.idToken?.name;
        const picture = authorization?.idToken?.picture;
        const wallet_address = authorization?.idToken?.wallet_address;
        const wallet_type_hint = authorization?.idToken?.wallet_type_hint;
        if (authorization?.idToken?.discord?.verified == 'true') {
          const discord = authorization?.idToken?.discord?.location;
        }
        if (authorization?.idToken?.reddit?.verified == 'true') {
          const reddit = authorization?.idToken?.reddit?.location;
        }
        if (authorization?.idToken?.telegram?.verified == 'true') {
          const telegram = authorization?.idToken?.telegram?.location;
        }
        if (authorization?.idToken?.twitter?.verified == 'true') {
          const twitter = authorization?.idToken?.twitter?.location;
        }
        if (authorization?.idToken?.youtube?.verified == 'true') {
          const youtube = authorization?.idToken?.youtube?.location;
        }

        dispatch(
          toggleGeneralPopup({
            status: 'success',
            message: `Welcome ${Name}, Login Successful`,
            // textButton: 'OK',
            size: 'sm'
          })
        );
      } else {
        if (selectedChain === null) {
          return alert('Please select ETH, BSC, or FTM network');
        }
        // access MediaEyeUser from Moralis db
        const mediaEyeUser = await Moralis.authenticate();
        // initialize MediaEyeUser with subscription fields if associate addresses user does not exist
        if (mediaEyeUser.attributes.defaultUsername === undefined) {
          await initMediaEyeUser(mediaEyeUser);
        }
        // add user to context
        await setUser(mediaEyeUser);
        // refresh page for login
        if (mediaEyeUser?.attributes.subscriptionLevel === 0) {
          dispatch(
            toggleGeneralPopup({
              status: 'info',
              message:
                'Would you like to become a subscriber for MEDIA EYE platform?',
              textButton: 'Subscribe',
              linkButton: '/profile/subscription'
            })
          );
          if (mediaEyeUser) {
            window.location.href = '/create';
          }
        } else {
          if (mediaEyeUser) {
            window.location.href = '/create';
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <TermsPopup
        togglePopup={toggleTermsPopup}
        termsPopupActive={termsPopupActive}
      />
      <div className="connect-wallet-page">
        <div className="connect-wallet-page-left">
          <img src={loginCharacter} alt="loginCharacter" />
        </div>
        <div className="connect-wallet-page-right">
          <div className="connect-wallet-page-right-top">
            <div className="connect-wallet-page-right-top-login">
              <div className="connect-wallet-page-right-top-login-header">
                <h2>LOGIN</h2>
              </div>
              <div className="connect-wallet-page-right-top-login-btn">
                <div className="connect-wallet-page-right-top-login-btn-inner">
                  <button
                    className="connect-wallet-page-right-top-login-btn-inner-name btn-square btn-transperant"
                    onClick={() => unstoppableDomain()}
                  >
                    <span>
                      <Unstoppable />
                    </span>
                    Unstoppable
                  </button>
                </div>
              </div>
              <div
                className="connect-wallet-page-right-top-login-terms"
                onClick={() => toggleTermsPopup()}
              >
                Terms & Conditions
              </div>
            </div>
            <div className="connect-wallet-page-right-top-wallet">
              <div className="connect-wallet-page-right-top-wallet-network">
                <div className="connect-wallet-page-right-top-wallet-network-header">
                  <h2>CONNECT YOUR WALLET</h2>
                </div>
                <div className="connect-wallet-page-right-top-wallet-network-subheading">
                  Select Network
                </div>
                <div className="connect-wallet-page-right-top-wallet-network-btn">
                  <div className="connect-wallet-page-switcher">
                    <div
                      className={
                        selectedChain === 'ETH'
                          ? 'connect-wallet-page-circle ETH'
                          : selectedChain ===
                            process.env.REACT_APP_BSC_CHAIN_NAME
                            ? 'connect-wallet-page-circle  BSC center'
                            : 'connect-wallet-page-circle FTM right'
                      }
                    ></div>
                    <span
                      onClick={() => handleChainChange('ETH')}
                      className={selectedChain === 'ETH' ? 'active ETH' : 'ETH'}
                    >
                      ETH
                    </span>
                    <span
                      className={
                        selectedChain === process.env.REACT_APP_BSC_CHAIN_NAME
                          ? 'active BSC'
                          : process.env.REACT_APP_BSC_CHAIN_NAME
                      }
                      onClick={() =>
                        handleChainChange(process.env.REACT_APP_BSC_CHAIN_NAME)
                      }
                    >
                      BSC
                    </span>
                    <span
                      className={selectedChain === 'FTM' ? 'active FTM' : 'FTM'}
                      onClick={() => handleChainChange('FTM')}
                    >
                      FTM
                    </span>
                  </div>
                </div>
                <div className="connect-wallet-page-right-top-wallet-network-metamask">
                  <button
                    className="connect-wallet-page-right-top-wallet-network-metamask-btn btn-square btn-transperant"
                    onClick={onConnectMetaMask}
                  >
                    <span>
                      <img src={metamask} alt="MetaMask" />
                    </span>
                    Metamask
                  </button>
                </div>
                <div className="connect-wallet-page-right-top-wallet-network-suggest">
                  Mobile users should use Metamask app browser to sign in!
                </div>
                <div className="connect-wallet-page-right-top-wallet-network-wallet">
                  <button
                    className="connect-wallet-page-right-top-wallet-network-wallet-btn btn-square btn-transperant"
                    onClick={onConnectWalletConnect}
                  >
                    <span>
                      <WalletConnect />
                    </span>{' '}
                    Wallet Connect
                  </button>
                </div>
              </div>
            </div>
          </div>
          <DownloadEyewalletApp />
        </div>
      </div>
    </>
  );
};

export default NewConnectWallet;
