import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleGeneralPopup } from '../../store/app/appSlice';
import AgreeBlock from '../Common/AgreeBlock';

export default function JoinCampaignPopup(props) {
  const { toggleJoinCampaignPopup, registerPopup } = props;
  const { inputValue, setInputValue } = useState('');
  const [termsAgree, setTermsAgree] = useState(false);
  const dispatch = useDispatch();
  const toggleTermsAgree = () => {
    setTermsAgree(!termsAgree);
  };

  const regPressed = () => {
    if (inputValue) {
      dispatch(
        toggleGeneralPopup({
          status: 'success',
          message: `Registration Successful`,
          textButton: 'OK',
          size: 'sm'
        })
      );
    }
    else {
      dispatch(
        toggleGeneralPopup({
          status: 'info',
          message: `Campaign gallery is available 
          only for whitelisted users. Please contact Campaign Creator to be whitelisted!`,
          textButton: 'OK',
          size: 'sm'
        })
      );
    }
    toggleJoinCampaignPopup();
  };
  return (
    <>
      {registerPopup ? (
        <div
          className={
            props.registerPopup
              ? 'mediaeye-popup active mediaeye-popup-sm'
              : 'mediaeye-popup'
          }
        >
          <div
            className="mediaeye-popup-wrapper"
            onClick={() => toggleJoinCampaignPopup()}
          >
            <div
              className="mediaeye-popup-content airdrop-register-popup"
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              <div className="mediaeye-popup-content-inner">
                <div className="mediaeye-popup-content-inner-header">
                  <div className="mediaeye-popup-content-inner-header-title text-center">
                    Join Campaign Gallery
                  </div>
                </div>
                <div className="mediaeyeform-group">
                  <label className="mediaeyeform-label">
                    Access Code (Optional)
                  </label>
                  <div className="mediaeyeform-group-input">
                    <input
                      type="text"
                      className="mediaeyeform-input"
                      value={inputValue}
                    />
                  </div>
                </div>
                <AgreeBlock agree={termsAgree} toggleAgree={toggleTermsAgree} />
                <div className="text-center">
                  <button
                    type="button"
                    className={
                      termsAgree
                        ? 'btn btn-lg btn-info m-t-30'
                        : 'btn btn-lg btn-disable m-t-30'
                    }
                    disabled={!termsAgree}
                    onClick={() => regPressed()}
                  >
                    Join
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
