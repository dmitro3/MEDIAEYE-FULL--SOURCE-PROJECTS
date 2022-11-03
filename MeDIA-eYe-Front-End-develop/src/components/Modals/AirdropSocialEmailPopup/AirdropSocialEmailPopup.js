import React, { useState, useEffect, useScript } from 'react';
import './AirdropSocialEmailPopup.scss';
import { useDispatch, useSelector } from 'react-redux';
import { closeSocialPopup } from '../../../store/app/appSlice';
import { CloseIcon } from '../../Icons';

export default function AirdropSocialEmailPopup(props) {
  const { showEmailPopup, switchSocialEmailPopup, txt, title } = props;

  const [email, setemail] = useState('');

  const handlemail = (event) => {
    setemail(event.target.value);
  };

  const showSocialEmailPopup = useSelector(
    (state) => state.app.showSocialEmailPopup
  );
  const dispatch = useDispatch();

  return (
    <>
      {props.showEmailPopup ? (
        <div
          className={
            props.showEmailPopup ? 'mediaeye-popup active' : 'mediaeye-popup'
          }
        >
          <div
            className="mediaeye-popup-wrapper"
            onClick={() => props.switchSocialEmailPopup()}
          >
            <div
              className="mediaeye-popup-content airdrop-social-email-popup"
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              <div className="mediaeye-popup-content-inner">
                <div
                  className="mediaeye-popup-close"
                  onClick={() => props.switchSocialEmailPopup()}
                >
                  <CloseIcon />
                </div>
                <form
                  className="airdrop-social-email-popup-main-content"
                  onSubmit={(e) => {
                    e.preventDefault();
                    props.switchSocialEmailPopup(props.title, email);
                  }}
                >
                  <h4 className="airdrop-social-email-popup-main-content-head">
                    {' '}
                    {props.title}{' '}
                  </h4>
                  <div className="airdrop-social-email-popup-main-content-input">
                    {props.title === 'Mailchimp Email Subscription' ? (
                      <input
                        type="email"
                        placeholder="Enter your Email ID"
                        onChange={handlemail}
                        className="airdrop-social-email-popup-main-content-input-email"
                      />
                    ) : props.title === 'Sendgrid - Email Subscription' ? (
                      <input
                        type="email"
                        placeholder="Enter your Email ID"
                        onChange={handlemail}
                        className="airdrop-social-email-popup-main-content-input-email"
                      />
                    ) : props.title === 'Hubspot - Email Subscription' ? (
                      <input
                        type="email"
                        placeholder="Enter your Email ID"
                        onChange={handlemail}
                        className="airdrop-social-email-popup-main-content-input-email"
                      />
                    ) : null}
                  </div>
                  <button className="btn btn-info" type="submit">
                    {' '}
                    {props.txt}{' '}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
