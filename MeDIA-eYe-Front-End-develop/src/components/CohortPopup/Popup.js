import React, { useState } from 'react';
import './Popup.scss';
import CohortLoading from '../Icons/CohortLoading';
import bnc from '../../assets/img/bnc.png';
import {
  CloseIcon,
  Connect,
  Error,
  Info,
  Loading,
  Success,
  Copy
} from '../Icons/';
const Popup = (props) => {
  const {
    activeNetwork,
    eyeAPR,
    isApproved,
    depositLoading,
    depositAmount,
    handleDeposit,
    rewardSpeeds
  } = props;
  return (
    <React.Fragment>
      <div
        className={
          props.showPopup
            ? 'mediaeye-popup active mediaeye-popup-sm'
            : 'mediaeye-popup'
        }
      >
        <div
          className="mediaeye-popup-wrapper mediaeye-popup-cohort scrolled"
          onClick={props.togglePopup}
        >
          <div className="mediaeye-popup-content">
            <div
              className="mediaeye-popup-content-inner"
              onClick={(event) => event.stopPropagation()}
            >
              <div
                className="mediaeye-popup-close"
                onClick={() => props.togglePopup()}
              >
                <CloseIcon />
              </div>

              {props.status === 'deposit' ? (
                <div className="approve-eye-popup">
                  <div className="approve-eye-popup-header">
                    The current expected APR for eYe
                  </div>
                  <div className="cohort-page-inner-main-content-section-part-first-bottom-box">
                    <div className="cohort-page-inner-main-content-section-part-first-bottom-box-row">
                      <div className="cohort-page-inner-main-content-section-part-first-bottom-box-row-rate">
                        <img src="/img/token/34/EYE.png" alt="EYE" />
                        <span>eYe</span>{' '}
                        <span className="text-link">{eyeAPR}%</span>
                        <span>APR</span>
                      </div>
                    </div>
                  </div>

                  {activeNetwork === 'ETH' ? (
                    <>
                      <div className="approve-eye-popup-header">
                        The current expected APR for WBNB/BUSD
                      </div>
                      <div className="cohort_farm_popup_row">
                        <div className="cohort_farm_row">
                          <label>
                            <strong>
                              <img src="/img/token/34/USDT.png" alt="USDT" />
                              USDT
                            </strong>
                            <div>{rewardSpeeds[0]}</div>
                          </label>
                        </div>
                        <div className="cohort_farm_row">
                          <label>
                            <strong>
                              <img src="/img/token/34/WETH.png" alt="WETH" />
                              WETH
                            </strong>
                            <div>{rewardSpeeds[1]}</div>
                          </label>
                        </div>
                      </div>
                      <div className="cohort_popup_description">
                        <p>
                          The rate is dependent on the number of rewards
                          allocated to the pool, and dependent on your share of
                          tokens in the staking pool.
                        </p>
                        <p>
                          As users deposit/withdraw staked tokens, the rates for
                          USDT/WETH would fluctuate accordingly.
                        </p>
                        <p>
                          *your actual rate of return may be less than or
                          greater than the estimated rate at this time.
                        </p>
                        <p>
                          {isApproved
                            ? 'Please confirm your deposit amount below'
                            : 'Please first approve eYe to be used by the platform'}
                        </p>
                        <p>{isApproved ? `${depositAmount} eYe` : ''}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="approve-eye-popup-header">
                        The current expected APR for WBNB/BUSD
                      </div>
                      <div className="approve-eye-popup-crds">
                        <div className="cohort-page-inner-main-content-section-part-first-bottom-box">
                          <div className="cohort-page-inner-main-content-section-part-first-bottom-box-row">
                            <div className="cohort-page-inner-main-content-section-part-first-bottom-box-row-rate">
                              <img
                                className="cohort-page-inner-main-content-section-part-first-bottom-box-row-rate-img"
                                src="/img/token/34/BUSD.png"
                                alt="BUSD"
                              />
                              <span>BUSD</span>{' '}
                              <span className="text-link">
                                {rewardSpeeds[0]}%
                              </span>
                              <span>APR</span>
                            </div>
                          </div>
                        </div>
                        <div className="cohort-page-inner-main-content-section-part-first-bottom-box">
                          <div className="cohort-page-inner-main-content-section-part-first-bottom-box-row">
                            <div className="cohort-page-inner-main-content-section-part-first-bottom-box-row-rate">
                              <img
                                className="cohort-page-inner-main-content-section-part-first-bottom-box-row-rate-img"
                                src={bnc}
                                alt="BNC"
                              />
                              <span> WBNB</span>{' '}
                              <span className="text-link">
                                {rewardSpeeds[1]}%
                              </span>
                              <span>APR</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="approve-eye-popup-header">
                        <p>
                          The rate is dependent on the number of rewards
                          allocated to the pool, and dependent on your share of
                          tokens in the staking pool.
                        </p>
                        <p>
                          As users deposit/withdraw staked tokens, the rates for
                          BUSD/WBNB would fluctuate accordingly.
                        </p>
                        <p>
                          *your actual rate of return may be less than or
                          greater than the estimated rate at this time.
                        </p>
                      </div>
                    </>
                  )}
                  <div className="mediaeye-popup-cohort-bottom">
                    <button
                      type="button"
                      className="btn btn-info"
                      onClick={handleDeposit}
                    >
                      {isApproved ? 'Deposit' : 'Approve'}
                      {depositLoading ? <CohortLoading /> : null}
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Popup;
