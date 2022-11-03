import React from "react";
import "./SuccessfulModal.scss";
import Cross from "../../icons/CrossIcon";
import RightSuccessful from "../../icons/RightSuccessful";

const SuccessfulModal = (props) => {
  const { toggleSuccessful, successful } = props;

  return (
    <>
      {successful ? (
        <div className="com-modal successful-modal">
          <div className="com-modal-ct">
            <button
              className="com-modal-close"
              onClick={() => {
                toggleSuccessful();
              }}
            >
              {" "}
              <Cross />{" "}
            </button>
            <div className="successful-modal-mid">
              <RightSuccessful />
              <span className="successful-modal-mid-status">Successful</span>
              <button
                className="btn btn-main"
                onClick={() => {
                  toggleSuccessful();
                }}
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default SuccessfulModal;
