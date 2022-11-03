import React, { useState } from "react";
import ReadyPopupEnter from "../../../Components/Modals/AreYouReadyModal/AreYouReadyEnter";
import "./AreYouReadyModal.scss";
import Cross from "../../icons/CrossIcon";

import modal_object from "../../../assets/images/modal-object.png";
import { otpService } from "../../../services/api.service";
const AreYouReady = (props) => {
  const { toggleReadyPopup, readyPopup } = props;
  const [EnterPopUp, setEnterReady] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [otp, setOtp] = useState("");
  const loginOtp = async () => {
    if (!userEmail || !otp) return;
    await otpService.loginOtp({
      email: userEmail,
      otp: otp,
    });
    setEnterReady(false);
  };

  const useAnotherEmail = () => {
    toggleReadyPopup(true);
    setEnterReady(false);
  };

  const hadaCode = () => {
    if (!userEmail) return;
    toggleReadyPopup(false);
    setEnterReady(true);
  };

  const sendActivationCode = async () => {
    if (!userEmail) return;
    // const res = await otpService.requestOtp({ email: userEmail });
    toggleReadyEnter();
    toggleReadyPopup();
  };

  const toggleReadyEnter = () => {
    setEnterReady(!EnterPopUp);
  };

  return (
    <>
      <ReadyPopupEnter
        EnterPopUp={EnterPopUp}
        toggleReadyEnter={toggleReadyEnter}
        useAnotherEmail={useAnotherEmail}
        loginOtp={loginOtp}
        otp={otp}
        setOtp={setOtp}
      />
      {readyPopup ? (
        <div className="com-modal">
          <div className="com-modal-ct are-you-ready-modal">
            <div className="are-you-ready-modal-backdrop"></div>
            <button
              className="com-modal-close"
              onClick={() => {
                toggleReadyPopup();
              }}
            >
              {" "}
              <Cross />{" "}
            </button>
            <div className="are-you-ready-modal-ct">
              <h1 className="are-you-ready-modal-ct-heading">Are You Ready?</h1>
              <p className="are-you-ready-modal-ct-para">
                Please enter your email address to receive a unique verification
                code that will allow you to sign in without needing a password.
              </p>
              <p className="are-you-ready-modal-ct-para">
                This applies to first time users and users that have already
                joined.
              </p>
              <input
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="are-you-ready-modal-ct-input"
                type="email"
                placeholder="Enter your email"
                required
              />
              <div className="are-you-ready-modal-ct-action">
                <button
                  className="btn btn-main are-you-ready-modal-ct-action-btn"
                  onClick={sendActivationCode}
                >
                  Send activation code
                </button>
                <div
                  onClick={hadaCode}
                  style={{ cursor: "pointer" }}
                  className="are-you-ready-modal-ct-action-a"
                >
                  Already have a code?
                </div>
              </div>
            </div>
            <img
              className="are-you-ready-modal-img"
              src={modal_object}
              alt="No img"
            />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default AreYouReady;
