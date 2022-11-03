import React from "react";
import Cross from "../../icons/CrossIcon";


const ShowImage = (props) => {
  const { toggleReadyPopup1, readyPopup1 } = props;

  return (
    <>
      {readyPopup1 ? (
        <div className="com-modal">
          <button
            className="com-modal-close"
            onClick={() => {
              toggleReadyPopup1();
            }}
          >
            {" "}
            <Cross />{" "}
          </button>
          <div className="creative-modal-ct">
            <img
              className="enlargeImg creative-modal-ct-frame"
              src={readyPopup1}
              alt="No img"
              onClick={() => toggleReadyPopup1()}
            />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ShowImage;
