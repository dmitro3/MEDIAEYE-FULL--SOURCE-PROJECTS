import React from 'react';
import EyeSwapPro from '../EyeSwap-Open/EyeSwapPro';
import EyeSwapPopup from '../EyeSwapPopup/EyeSwapPopup';
import './SwapPopup.scss';

export default function SwapPopup(props) {
  return (
    <>
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
            onClick={props.handleEyeswap}
          >
            <div className="mediaeye-popup-content">
              <div
                className="mediaeye-popup-content-inner"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="swap-popup">
                  <div className="eyeswap-withBox">
                    <EyeSwapPro from={'offer'} />
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
