import React, { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { RampInstantSDK } from '@ramp-network/ramp-instant-sdk';
import { injectedConnector } from '../../../connectors';
import './ProfileWallet.scss';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import WidgetContainer from '../OnRamperPopup/Popup';
import { useMoralis } from 'react-moralis';
import { TokenAddress } from '../../../blockchain/functions/Addresses/';

const ProfileWallet = (props) => {
  const { chainId, account, activate, deactivate } = useWeb3React();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { Moralis, user } = useMoralis();
  const zero = 0;
  const [eyeEth, setEyeEth] = useState(zero.toFixed(4));
  const [eth, setEth] = useState(zero.toFixed(4));
  const [usdt, setUsdt] = useState(zero.toFixed(4));
  const [eyeBsc, setEyeBsc] = useState(zero.toFixed(4));
  const [bnb, setBnb] = useState(zero.toFixed(4));
  const [busd, setBusd] = useState(zero.toFixed(4));

  useEffect(() => {
    getBalances();
  }, [user]);

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const getBalances = async () => {
    //const web3 = await Moralis.enableWeb3();
    const ethBalances = await Moralis.Web3API.account.getTokenBalances({
      chain: '0x1'
    });
    await sleep(800); // offset web3api calls until rate limit is increased
    const eth = await Moralis.Web3API.account.getNativeBalance({
      chain: '0x1'
    });
    eth
      ? setEth(Moralis.Units.FromWei(eth.balance).toFixed(4))
      : setEth(zero.toFixed(4));

    const eyeEth = ethBalances.find(
      (token) => token.token_address === TokenAddress('EYE', '0x1')
    );

    eyeEth
      ? setEyeEth(Moralis.Units.FromWei(eyeEth.balance).toFixed(4))
      : setEyeEth(zero.toFixed(4));

    const usdt = ethBalances.find(
      (token) => token.token_address === TokenAddress('USDT', '0x1')
    );
    usdt
      ? setUsdt(Moralis.Units.FromWei(usdt.balance).toFixed(4))
      : setUsdt(zero.toFixed(4));

    await sleep(800); // offset web3api calls until rate limit is increased
    const bscBalances = await Moralis.Web3API.account.getTokenBalances({
      chain: process.env.REACT_APP_BSC_CHAIN_ID
    });
    await sleep(800); // offset web3api calls until rate limit is increased
    const bnb = await Moralis.Web3API.account.getNativeBalance({
      chain: process.env.REACT_APP_BSC_CHAIN_ID
    });
    bnb
      ? setBnb(Moralis.Units.FromWei(bnb.balance).toFixed(4))
      : setBnb(zero.toFixed(4));

    const eyeBsc = bscBalances.find(
      (token) =>
        token.token_address ===
        TokenAddress('EYE', process.env.REACT_APP_BSC_CHAIN_ID)
    );

    eyeBsc
      ? setEyeBsc(Moralis.Units.FromWei(eyeBsc.balance).toFixed(4))
      : setEyeBsc(zero.toFixed(4));

    const busd = bscBalances.find(
      (token) =>
        token.token_address ===
        TokenAddress('BUSD', process.env.REACT_APP_BSC_CHAIN_ID)
    );

    busd
      ? setBusd(Moralis.Units.FromWei(busd.balance).toFixed(4))
      : setBusd(zero.toFixed(4));
  };
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  };

  const onConnectMetaMask = () => {
    activate(injectedConnector);
  };

  const onConnectRamp = () => {
    new RampInstantSDK({
      hostAppName: 'MeDIA EYE',
      hostApiKey: process.env.REACT_APP_RAMP_PRIVATE_KEY,
      hostLogoUrl: 'https://media-eye.web.app/img/logo.png'
    }).show();
  };

  return (
    <div className="profile_wallet_page">
      <div className="profile_wallet_page_header">
        <h2>Wallet</h2>
        <button>{account && account}</button>
      </div>
      <h6>Account balance</h6>
      <div className="profile_wallet_page_main">
        <div className="profile_wallet_block">
          <span className="profile_wallet_block_title">eYe (ERC20)</span>
          <span className="profile_wallet_block_result">{eyeEth} eYe</span>
        </div>
        <div className="profile_wallet_block">
          <span className="profile_wallet_block_title">ETH</span>
          <span className="profile_wallet_block_result">{eth} ETH</span>
        </div>
        <div className="profile_wallet_block">
          <span className="profile_wallet_block_title">USDT</span>
          <span className="profile_wallet_block_result">{usdt} USDT</span>
        </div>
        <div className="profile_wallet_block">
          <span className="profile_wallet_block_title">eYe (BEP20)</span>
          <span className="profile_wallet_block_result">{eyeBsc} eYe</span>
        </div>
        <div className="profile_wallet_block">
          <span className="profile_wallet_block_title">BNB</span>
          <span className="profile_wallet_block_result">{bnb} BNB</span>
        </div>

        <div className="profile_wallet_block">
          <span className="profile_wallet_block_title">BUSD</span>
          <span className="profile_wallet_block_result">{busd} BUSD</span>
        </div>
        <div className="profile_wallet_block">
          <span className="profile_wallet_block_title">NFTs</span>
          <span className="profile_wallet_block_result">0 NFTs</span>
        </div>
      </div>
      <button
        type="button"
        className="btn btn-info"
        style={{ margin: '30px auto 0' }}
        Create
        Account
        Wallet
      ></button>

      <div className="profile_wallet_connect_wallet">
        <h6>Connect your Wallet</h6>
        <div>
          <button
            className="create_wallet_metamask wallet_btn"
            onClick={onConnectMetaMask}
          >
            MetaMask
          </button>
          <button className="create_wallet_trust wallet_btn">
            Trust Wallet
          </button>
        </div>
        <h6>Fund your account wallet with Credit Card or Crypto</h6>
        <div>
          <button
            className="create_wallet_onramper wallet_btn"
            onClick={handleOpen}
          >
            OnRamper
          </button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <WidgetContainer></WidgetContainer>
            </Box>
          </Modal>
          <button
            className="create_wallet_ramp wallet_btn"
            onClick={onConnectRamp}
          >
            Ramp
          </button>
          <button className="create_wallet_moonpay wallet_btn">Paypal</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileWallet;
