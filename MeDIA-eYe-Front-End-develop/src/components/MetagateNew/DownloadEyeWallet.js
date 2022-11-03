import React from 'react'
import { Logout } from '../Icons'
import AppStore from '../../assets/img/appstore.png';
import GooglePlay from '../../assets/img/googleplay.png';
import SignInCharacter from '../../assets/img/NewConnect_wallet/sign_in300.png';

export const DownloadEyeWallet = () => {
    return (
        <div className="new-metagate-bottom">
            <div className="new-metagate-bottom-app">
                <div className="new-metagate-bottom-app-eyewallet">
                    <h2>Download eYeWallet App</h2>
                    <div className="new-metagate-bottom-app-eyewallet-button">
                        <a className="new-metagate-bottom-app-eyewallet-button-inner">
                            <img src={AppStore} alt="appstore" />
                        </a>
                        <a
                            href="https://play.google.com/store/apps/details?id=app.eYeWallet"
                            target="_blank"
                            className="new-metagate-bottom-app-eyewallet-button-inner"
                        >
                            <img src={GooglePlay} alt="googleplay" />
                        </a>
                    </div>
                </div>
                <div className="new-metagate-bottom-app-img">
                    <img src={SignInCharacter} alt="SignInCharacter" />
                </div>
                <div className="new-metagate-bottom-app-right">
                    <Logout />
                    <span>Import your Metamask to eYeWallet for best experience</span>
                </div>
            </div>
        </div>
    )
}

