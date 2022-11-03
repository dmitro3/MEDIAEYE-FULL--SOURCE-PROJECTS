import React, { useContext, useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useMoralis } from 'react-moralis';
import { UserContext } from '../../context/UserContext';
import { toggleGeneralPopup } from '../../store/app/appSlice';
import { ChainName } from '../../blockchain/functions/ChangeChain/ChainNames';
import { changeNetwork } from '../../store/app/appSlice';
import ReactTooltip from 'react-tooltip';
import MetaMaskOnboarding from '@metamask/onboarding';

const ONBOARD_TEXT = 'INSTALL METAMASK';
const CONNECT_TEXT = 'CONNECT YOUR WALLET';
const CONNECTED_TEXT = 'Your Wallet is Connected';

const ConnectWalletMetamaskOnboard = (props) => {
  const darkTheme = useSelector((state) => state.app.darkTheme);
  const [buttonText, setButtonText] = useState(ONBOARD_TEXT);
  const [accounts, setAccounts] = useState([]);
  const dispatch = useDispatch();
  const { Moralis, isInitialized } = useMoralis();
  const { setUser } = useContext(UserContext);
  const selectedChain = useSelector((state) => state.app.activeNetwork);
  const onboarding = useRef();
  let history = useHistory();

  Moralis.onChainChanged((chain) => {
    getNetwork();
  });

  const toggleNetwork = (value) => {
    dispatch(changeNetwork(value));
  };

  const getNetwork = async () => {
    // convert hexidecimal result to decimal
    const web3 = await Moralis.enableWeb3();
    toggleNetwork(ChainName(await Moralis.chainId));
  };

  useEffect(() => {
    if (isInitialized) {
      getNetwork();
    }
  }, [isInitialized]);

  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);

  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (accounts.length > 0) {
        setButtonText(CONNECTED_TEXT);
        onboarding.current.stopOnboarding();
      } else {
        setButtonText(CONNECT_TEXT);
      }
    }
  }, [accounts]);

  useEffect(() => {
    function handleNewAccounts(newAccounts) {
      setAccounts(newAccounts);
    }
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(handleNewAccounts);
      window.ethereum.on('accountChanged', handleNewAccounts);
      return () => {
        window.ethereum.removeListener('accountChanged', handleNewAccounts);
      };
    }
  }, []);

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
            textButton: 'Subscribe'
          })
        );
      }
      if (mediaEyeUser) {
        // refresh page for login
        window.location.href = '/';
      }
    } catch (e) {
      console.log(e);
    }
  };

  const initMediaEyeUser = async (mediaEyeUser, account = {}) => {
    // TODO: handle initialization in a cloud function
    // set default fields to new user
    mediaEyeUser.set('defaultUsername', true);
    mediaEyeUser.set('subscriptionLevel', 0);
    mediaEyeUser.set('subscriptionStart', 0);
    mediaEyeUser.set('subscriptionEnd', 0);
    mediaEyeUser.set('fullName', history.location.state.name);
    mediaEyeUser.set('email', history.location.state.email);
    await mediaEyeUser.save();
  };

  const onClickMetamask = async () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      await onConnectMetaMask();
    } else {
      onboarding.current.startOnboarding();
    }
  };

  return (
    <div className="connect_wallet">
      <ReactTooltip className="mediaeyetooltip" />
      <div className="connect_wallet_left"></div>
      <div className="connect_wallet_right">
        <div className="connect_wallet_main" style={{ height: 'auto' }}>
          <h2>{buttonText}</h2>
          <div className="connect_wallet_walletss">
            <button
              id="MetaMask"
              onClick={async () => {
                onClickMetamask();
              }}
            ></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectWalletMetamaskOnboard;
