import React from "react";

import "./AreYouReadyModal.scss";
import Cross from "../../icons/CrossIcon";

import modal_object1 from "../../../assets/images/modal-object1.png";
const AreYouReadyEnter = (props) => {
  const { EnterPopUp, useAnotherEmail, loginOtp, otp, setOtp} = props;
  return (
    <>
      {EnterPopUp ? (
        <div className="com-modal">
          <div className="com-modal-ct are-you-ready-modal">
            <div className="are-you-ready-modal-backdrop"></div>
            <button
              className="com-modal-close"
              onClick={loginOtp}
            >
              {" "}
              <Cross />{" "}
            </button>
            <div className="are-you-ready-modal-ct">
              <h1 className="are-you-ready-modal-ct-heading">
                Enter METAVATAR
              </h1>
              <div>
                <p className="are-you-ready-modal-ct-para">
                  Check your email and enter the confirmation code
                </p>
                <input
                  value={otp}
                  onChange={e=>setOtp(e.target.value)}
                  className="are-you-ready-modal-ct-input"
                  type="text"
                  placeholder="Enter confirmation code"
                />
                <div className="are-you-ready-modal-ct-action">
                  <button onClick={loginOtp} className="btn btn-main are-you-ready-modal-ct-action-btn">
                    Log in
                  </button>
                  <div onClick={useAnotherEmail} className="are-you-ready-modal-ct-action-a" style={{cursor: 'pointer'}}>
                    Use another email
                  </div>
                </div>
              </div>
            </div>
            <img
              className="are-you-ready-modal-img ism"
              src={modal_object1}
              alt="No img"
            />
            {/* <div className='are-you-ready-modal-process'>
            <h1 className='are-you-ready-modal-ct-heading'>Signing In</h1>
            <div class="mediaeyeAvatar-Circleloader">
              <div class="mediaeyeAvatar-Circleloader-button"></div>
            </div>
          </div> */}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default AreYouReadyEnter;
