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
import walletConnect from '../../assets/img/connect-wallet/Wallet-connect.png';
import {
  BackArrow,
  Google,
  FB,
  InfoCircle,
  Unstoppable
} from '../../components/Icons/';
import { TermsPopup } from '../TermsAndConditions/TermsAndConditions';
import UAuth from '@uauth/js';
import ReactTooltip from 'react-tooltip';
import './ConnectWallet.scss';

const ConnectWallet = (props) => {
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
      <div className="connect_wallet">
        <ReactTooltip className="mediaeyetooltip" />
        <div className="connect_wallet_left"></div>
        <div className="connect_wallet_right">
          <div className="connect_wallet_right_content">
            <div className="connect_wallet_right_content_header">
              <button
                className="mediaeyepage-goback"
                onClick={() => history.push('/')}
              >
                <BackArrow /> Go Back
              </button>
            </div>
            <div className="connect_wallet_right_content_inner">
              <div className="connect_wallet_right_content_colbox signincol">
                <h2>
                  Sign In <span>Register</span>
                </h2>
                <div className="connect_wallet_social">
                  <div>
                    <button
                      className="google_connect_btn connect_wallet_social_btn"
                      data-class="mediaeyetooltip"
                      onClick={() => unstoppableDomain()}
                      // onClick={async () => {
                      //   const res = await googleSignIn();
                      //   history.push('/connect-wallet-metamask-onboard', {
                      //     name: res.displayName,
                      //     email: res.email
                      //   });
                      //    window.location.href = '/connect-wallet-metamask-onboard';
                      // }}
                      // data-tip="Coming soon!"
                      data-position="bottom"
                    >
                      <span>
                        <Unstoppable />{' '}
                      </span>
                      Continue with Unstoppable
                    </button>
                  </div>
                  <div>
                    <button
                      className="google_connect_btn connect_wallet_social_btn"
                      data-class="mediaeyetooltip"
                      // onClick={async () => {
                      //   const res = await googleSignIn();
                      //   history.push('/connect-wallet-metamask-onboard', {
                      //     name: res.displayName,
                      //     email: res.email
                      //   });
                      //    window.location.href = '/connect-wallet-metamask-onboard';
                      // }}
                      data-tip="Coming soon!"
                      data-position="bottom"
                    >
                      <span>
                        <Google />{' '}
                      </span>
                      Continue with Google
                    </button>
                  </div>
                  <div>
                    <button
                      className="facebook_connect_btn connect_wallet_social_btn"
                      data-class="mediaeyetooltip"
                      data-tip="Coming soon!"
                      data-position="bottom"
                    >
                      <span>
                        <FB />
                      </span>
                      Continue with Facebook
                    </button>
                  </div>
                </div>

                <div className="connect_wallet_terms">
                  <a
                    onClick={() => toggleTermsPopup()}
                    className="connect_wallet_terms_link"
                  >
                    Terms & Conditions
                  </a>
                </div>
              </div>

              <div className="connect_wallet_right_content_colbox">
                <h2>CONNECT YOUR WALLET</h2>
                <div className="connect_wallet_label">Change network</div>
                <div className="connect_wallet_networks">
                  <button
                    id="eth"
                    network="ETH"
                    className={
                      selectedChain === 'ETH'
                        ? 'active connect_wallet_networks_btn'
                        : 'connect_wallet_networks_btn'
                    }
                    onClick={() => handleChainChange('ETH')}
                  >
                    <span>
                      <img src={eth} alt="ETH" />{' '}
                    </span>{' '}
                    ETH{' '}
                  </button>
                  <button
                    id="bsc"
                    network="BSC"
                    className={
                      selectedChain === process.env.REACT_APP_BSC_CHAIN_NAME
                        ? 'active connect_wallet_networks_btn'
                        : 'bsc connect_wallet_networks_btn'
                    }
                    onClick={() =>
                      handleChainChange(process.env.REACT_APP_BSC_CHAIN_NAME)
                    }
                  >
                    <span>
                      <img src={bsc} alt="BSC" />{' '}
                    </span>
                    BSC
                  </button>
                  <button
                    id="ftm"
                    network="FTM"
                    className={
                      selectedChain === 'FTM'
                        ? 'active connect_wallet_networks_btn'
                        : 'ftm connect_wallet_networks_btn'
                    }
                    onClick={() => handleChainChange('FTM')}
                  >
                    <span>
                      <img src={ftm} alt="FTM" />
                    </span>
                    FTM
                  </button>
                </div>
                <div className="connect_wallet_walletss">
                  <button
                    type="button"
                    className="connect_wallet_walletss_btn metamaskbtn"
                    onClick={onConnectMetaMask}
                  >
                    <span>
                      <img src={metamask} alt="MetaMask" />
                    </span>
                    Metamask
                  </button>

                  <div className="connect_wallet_info">
                    <span className="connect_wallet_info_icon">
                      <InfoCircle />
                    </span>
                    <div className="connect_wallet_info_text">
                      Mobile users should use Metamask app browser to sign in!
                    </div>
                  </div>

                  <button
                    type="button"
                    className="connect_wallet_walletss_btn"

                    onClick={onConnectWalletConnect}
                  >
                    <span>
                      <img src={walletConnect} alt="Wallet" />
                    </span>{' '}
                    Wallet Connect
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {termsPopupActive ? <TermsPopup togglePopup={toggleTermsPopup} /> : null}
    </>
  );
};

export default ConnectWallet;
