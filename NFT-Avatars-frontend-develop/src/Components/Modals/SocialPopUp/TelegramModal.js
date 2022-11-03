import React from "react";
import ReactPhoneInput from "react-phone-input-2";
import Cross from "../../icons/CrossIcon";
import "./socialStyle.scss";

const TelegramModal = (props) => {
  const { toggletelegramModal, telegramModal1 } = props;

  

  return (
    <>
      {telegramModal1 ? (
        <div className="choose-file-modal">
          <div className="choose-file-modal-ct">
            <button
              className="choose-file-modal-close"
              onClick={() => {
                toggletelegramModal();
              }}
            >
              {" "}
              <Cross />{" "}
            </button>
            <div className="content">
              <h2 className="choose-file-modal-ct-heading">
                Enter Your Phone Number And Country code
              </h2>
              <form className="form">
                <ReactPhoneInput
                  defaultCountry="us"
                  disableDropdown
                  inputExtraProps={{
                    required: true,
                    autoFocus: true,
                  }}
                />
                <span className="button-box">
                  <button className="btn" type="submit" name="submit">
                    Send OTP
                  </button>
                </span>
              </form>
            </div>

            {/* FOR OTP CONFIRMATION */}
            {/* DO NOT DELETE */}

            {/* <div className="content">
                        <h2 className="choose-file-modal-ct-heading">Enter OTP</h2>
                        <form className="form">
                            <input type="tel"  placeholder="OTP"  name="OTP" required />
                            <span className="button-box">
                            <button className="btn" type="submit" name="submit">Submit</button>
                            </span>
                        </form>
                    </div> */}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default TelegramModal;
