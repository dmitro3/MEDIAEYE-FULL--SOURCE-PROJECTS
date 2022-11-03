import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './EventJoinPopup.scss';
import { toggleGeneralPopup } from '../../../store/app/appSlice';
import AgreeBlock from '../../Common/AgreeBlock';

export default function EventJoinPopup(props) {
  const { ethAddress, toggleEventJoinPopup, eventjoinPopup } = props;
  const [termsAgree, setTermsAgree] = useState(false);
  const dispatch = useDispatch();
  const toggleTermsAgree = () => {
    setTermsAgree(!termsAgree);
  };

  return (
    <>
      {eventjoinPopup ? (
        <div
          className={
            eventjoinPopup
              ? 'mediaeye-popup mediaeye-popup-sm active'
              : 'mediaeye-popup'
          }
        >
          <div
            className="mediaeye-popup-wrapper"
            onClick={() => props.toggleEventJoinPopup()}
          >
            <div
              className="mediaeye-popup-content event-join-popup"
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              <div className="mediaeye-popup-content-inner">
                <div className="mediaeye-popup-content-inner-header">
                  <div className="mediaeye-popup-content-inner-header-title text-center">
                    Join Event
                  </div>
                </div>
                <div className="mediaeyeform-group">
                  <label className="mediaeyeform-label">Email</label>
                  <div className="mediaeyeform-group-input">
                    <input
                      type="text"
                      className="mediaeyeform-input"
                      placeholder="test_test@gmail.com"
                    />
                  </div>
                </div>
                <div className="mediaeyeform-group">
                  <label className="mediaeyeform-label">Wallet Address</label>
                  <div className="mediaeyeform-group-input">
                    <input
                      type="text"
                      className="mediaeyeform-input"
                      value={ethAddress}
                    />
                  </div>
                </div>
                <div className="airdrop-register-popup-terms">
                  <AgreeBlock
                    agree={termsAgree}
                    toggleAgree={toggleTermsAgree}
                  />
                </div>
                <div className="airdrop-register-popup-bottom">
                  {termsAgree ? (
                    <button
                      type="button"
                      className="btn btn-lg btn-info"
                      onClick={() => {
                        dispatch(
                          toggleGeneralPopup({
                            status: 'success',
                            message: `Registration Successful`,
                            textButton: 'OK',
                            size: 'sm'
                          })
                        );
                        toggleEventJoinPopup();
                      }}
                    >
                      JOIN
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-lg btn-disable"
                      onClick={() => {
                        toggleEventJoinPopup();
                      }}
                    >
                      {' '}
                      JOIN
                    </button>
                  )}
                </div>
                {/* <div className="text-center">
                 <button type='button' className="btn btn-lg btn-main" onClick={() => {toggleEventJoinPopup();}}>OK</button> 
            </div> */}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
