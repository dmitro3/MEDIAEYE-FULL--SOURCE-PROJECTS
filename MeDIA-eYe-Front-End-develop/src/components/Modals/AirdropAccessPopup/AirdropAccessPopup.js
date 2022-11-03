import React, { useState } from 'react';
import './AirdropAccessPopup.scss';

export default function AirdropRegisterPopup(props) {
  const { accessPopup, toggleAirdropAccessPopup } = props;
  return (
    <>
      {accessPopup ? (
        <div
          className={
            props.accessPopup
              ? 'mediaeye-popup active mediaeye-popup-sm'
              : 'mediaeye-popup'
          }
        >
          <div
            className="mediaeye-popup-wrapper"
            onClick={() => toggleAirdropAccessPopup()}
          >
            <div
              className="mediaeye-popup-content airdrop-access-popup"
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              <div className="mediaeye-popup-content-inner">
                <div className="mediaeye-popup-content-inner-header">
                  <div className="mediaeye-popup-content-inner-header-title text-center">
                    Generated Access Passes
                  </div>
                </div>
                <div className="mediaeyefancyScroll">
                  <div className="airdrop-access-popup-body">
                    <span>23-XY-PM-00</span>
                    <span>23-XY-PM-00</span>
                    <span>23-XY-PM-00</span>
                    <span>23-XY-PM-00</span>
                    <span>23-XY-PM-00</span>
                    <span>23-XY-PM-00</span>
                    <span>23-XY-PM-00</span>
                    <span>23-XY-PM-00</span>
                    <span>23-XY-PM-00</span>
                    <span>23-XY-PM-00</span>
                    <span>23-XY-PM-00</span>
                    <span>23-XY-PM-00</span>
                    <span>23-XY-PM-00</span>
                    <span>23-XY-PM-00</span>
                    <span>23-XY-PM-00</span>
                    <span>23-XY-PM-00</span>
                    <span>23-XY-PM-00</span>
                    <span>23-XY-PM-00</span>
                    <span>23-XY-PM-00</span>
                    <span>23-XY-PM-00</span>
                    <span>23-XY-PM-00</span>
                    <span>23-XY-PM-00</span>
                    <span>23-XY-PM-00</span>
                    <span>23-XY-PM-00</span>
                    <span>23-XY-PM-00</span>
                    <span>23-XY-PM-00</span>
                    <span>23-XY-PM-00</span>
                    <span>23-XY-PM-00</span>
                    <span>23-XY-PM-00</span>
                    <span>23-XY-PM-00</span>
                    <span>23-XY-PM-00</span>
                    <span>23-XY-PM-00</span>
                    <span>23-XY-PM-00</span>
                    <span>23-XY-PM-00</span>
                    <span>23-XY-PM-00</span>
                    <span>23-XY-PM-00</span>
                    <span>23-XY-PM-00</span>
                    <span>23-XY-PM-00</span>
                  </div>
                </div>
                <div className="text-center airdrop-access-popup-submit">
                  <button className="btn btn-transperant" onClick={() => toggleAirdropAccessPopup()}>OK</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
