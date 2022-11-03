import React from 'react';
import { Logout } from '../Icons';
import AppStore from '../../assets/img/appstore.png';
import GooglePlay from '../../assets/img/googleplay.png';
import SignInCharacter from '../../assets/img/NewConnect_wallet/sign_in.png';

const DownloadEyewalletApp = () => {
  return (
    <div className="connect-wallet-page-right-bottom">
      <div className="connect-wallet-page-right-bottom-app">
        <div className="connect-wallet-page-right-bottom-app-eyewallet">
          <h2>Download eYeWallet App</h2>
          <div className="connect-wallet-page-right-bottom-app-eyewallet-button">
            <a className="connect-wallet-page-right-bottom-app-eyewallet-button-inner">
              <img src={AppStore} alt="appstore" />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=app.eYeWallet"
              target="_blank"
              className="connect-wallet-page-right-bottom-app-eyewallet-button-inner"
            >
              <img src={GooglePlay} alt="googleplay" />
            </a>
          </div>
        </div>
        <div className="connect-wallet-page-right-bottom-app-img">
          <img src={SignInCharacter} alt="SignInCharacter" />
        </div>
        <div className="connect-wallet-page-right-bottom-app-right">
          <Logout />
          <span>Import your Metamask to eYeWallet for best experience</span>
        </div>
      </div>
    </div>
  );
};

export default DownloadEyewalletApp;
