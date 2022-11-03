import React from "react";
import Cross from "../../icons/CrossIcon";

const ShowVideo = (props) => {
  const { toggleReadyPopup, readyPopup } = props;

  return (
    <>
      {readyPopup ? (
        <div className="com-modal">
          <button
            className="com-modal-close"
            onClick={() => {
              toggleReadyPopup();
            }}
          >
            {" "}
            <Cross />{" "}
          </button>
          <div className="creative-modal-ct">
            <iframe
              className="creative-modal-ct-frame"
              src="https://www.youtube.com/embed/6stlCkUDG_s"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture: fullscreen"
              allowfullscreen="allowfullscreen"
            ></iframe>
            {/* <iframe className='creative-modal-ct-frame' src="https://www.youtube.com/embed/K4TOrB7at0Y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ShowVideo;
