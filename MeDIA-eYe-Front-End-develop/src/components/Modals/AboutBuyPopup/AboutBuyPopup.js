import React, { useState } from 'react';
import uniswaplogo from '../../../assets/img/uniswaplogo.png';
import pancakeswaplogo from '../../../assets/img/pancakeswaplogo.png';
import { closeAboutBuyPopup } from '../../../store/app/appSlice';
import { useSelector, useDispatch } from 'react-redux';
import './AboutBuyPopup.scss';
import { CloseIcon } from '../../Icons';
// import { EyeSwapPopup } from '../EyeSwapPopup/EyeSwapPopup';
// import EyeSwapPopup from '../EyeSwapPopup/EyeSwapPopup';

export default function AboutBuyPopup(props) {
  const showAboutBuyPopup = useSelector((state) => state.app.showAboutBuyPopup);
  const dispatch = useDispatch();

  const handleChange = (prop) => {
    if (prop === 'uni') {
      window.open(
        'https://app.uniswap.org/#/swap?outputCurrency=0x9a257c90fa239fba07771ef7da2d554d148c2e89&chain=mainnet',
        '_blank'
      );
    } else {
      window.open(
        'https://pancakeswap.finance/swap?outputCurrency=0x9A257C90Fa239fBA07771ef7da2d554D148c2E89',
        '_blank'
      );
    }
  };

  return (
    <>
      {showAboutBuyPopup ? (
        <div
          className={
            showAboutBuyPopup ? 'mediaeye-popup active' : 'mediaeye-popup'
          }
        >
          <div
            className="mediaeye-popup-wrapper"
            onClick={() => dispatch(closeAboutBuyPopup())}
          >
            <div
              className="mediaeye-popup-content about-buy-popup"
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              <div className="mediaeye-popup-content-inner">
                <div
                  className="mediaeye-popup-close"
                  onClick={() => dispatch(closeAboutBuyPopup())}
                >
                  <CloseIcon />
                </div>
                {/* <EyeSwapPopup /> */}
                <div className="about-buy-popup-title">
                  <span>Buy eYe Token</span>
                </div>
                <div className="about-buy-popup-card">
                  <sapn className="about-buy-popup-card-head">
                    Current eYe price (USD)
                  </sapn>
                  <span className="about-buy-popup-card-price">
                    $0.00326756
                  </span>
                  <div className="about-buy-popup-card-timings">
                    <span className="txt-green">+0.5%</span>
                    <span>(Last 24 hours)</span>
                  </div>
                </div>
                <div className="about-buy-popup-bottom">
                  <div onClick={() => handleChange('uni')}>
                    <img src={uniswaplogo} alt="uniswaplogo" />
                  </div>
                  <div
                    className="pancakeswap"
                    onClick={() => handleChange('pan')}
                  >
                    <img src={pancakeswaplogo} alt="pancakeswaplogo" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
