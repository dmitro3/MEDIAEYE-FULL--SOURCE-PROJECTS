import React from 'react';
import { Helmet } from 'react-helmet';
import EyeSwapPro from '../Modals/EyeSwap-Open/EyeSwapPro';
import './EyeSwapHome.scss';
import EyeSwapScanner from '../../assets/img/scanner_code.png';
import AppStore from '../../assets/img/appstore.png';
import GooglePlay from '../../assets/img/googleplay.png';

export default function EyeSwapHome() {
  return (
    <>
      <Helmet>
        <meta
          property="og:url"
          content={window.location.origin + '/eyeswap-home'}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="EYE Swap is Multi-Chain Token Swap | MEDIA EYE"
        />
        <meta
          property="og:description"
          content="EYE Swap allows MEDIA EYE users to swap over 15000 + different crypto assets, making it easy and simple for users to swap their digital assets in minutes across 15 blockchains."
        />
        <meta
          property="og:image"
          content={window.location.origin + '/img/eyeSwap/eyeswap_banner.png'}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:domain"
          content="mediaeyenft.com/eyeswap-home"
        />
        <meta
          property="twitter:url"
          content={window.location.origin + '/eyeswap-home'}
        />
        <meta
          name="twitter:title"
          content="EYE Swap is Multi-Chain Token Swap | MEDIA EYE"
        />
        <meta
          name="twitter:description"
          content="EYE Swap allows MEDIA EYE users to swap over 15000 + different crypto assets, making it easy and simple for users to swap their digital assets in minutes across 15 blockchains."
        />
        <meta
          name="twitter:image"
          content={window.location.origin + '/img/eyeSwap/eyeswap_banner.png'}
        />
        <title>EYE Swap is Multi-Chain Token Swap | MEDIA EYE</title>
        <meta
          name="description"
          content="EYE Swap allows MEDIA EYE users to swap over 15000 + different crypto assets, making it easy and simple for users to swap their digital assets in minutes across 15 blockchains."
        />
      </Helmet>
      <div className="mediaeye-layout-content">
        <div className="eyeswap-home">
          <div className="eyeswap-home-banner">
            <img
              className="eyeswap-home-banner-img"
              src="/img/eyeSwap/eyeswap_banner.png"
              alt="eyeswap banner"
            />
          </div>
          <div className="eyeswap-home-content">
            <EyeSwapPro />
          </div>
          <div className="eyeswap-home-footer">
            <img
              className="eyeswap-home-footer-img"
              src="/img/eyeSwap/eyeswap_footer.png"
              alt="eyeswap banner"
            />
            <img
              className="eyeswap-home-footer-appstore"
              src={AppStore}
              alt="appstore-icon"
            />
            <a
              href="https://play.google.com/store/apps/details?id=app.eYeWallet"
              target="_blank"
            >
              <img
                className="eyeswap-home-footer-googleplay"
                src={GooglePlay}
                alt="googleplay-icon"
              />
            </a>
            <img
              className="eyeswap-home-footer-scanner"
              src={EyeSwapScanner}
              alt="Scanner"
            />
          </div>
        </div>
      </div>
    </>
  );
}
