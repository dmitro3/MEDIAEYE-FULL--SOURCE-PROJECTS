import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MainHome.scss";
// import ReadyPopup from "../../Modals/AreYouReadyModal/AreYouReadyModal";
import ReadyPopup from "../Modals/AreYouReadyModal/AreYouReadyModal";

//media
import UserAvatar from "../../assets/images/Home/UserAvatar.png";

const MainHome = () => {
  const [readyPopup, setReady] = useState(false);

  const toggleReadyPopup = () => {
    setReady(!readyPopup);
  };

  const navigate = useNavigate();
  const navigateToAvatar = () => {
    navigate("/create-avatar");
  };

  return (
    <React.Fragment>
      <ReadyPopup readyPopup={readyPopup} toggleReadyPopup={toggleReadyPopup} />

      <div className="mediaeyeAvatar-layout-container">
        <div className="mediaeyeAvatar-home-flexBox">
          <div className="mediaeyeAvatar-home-flexBox-left">
            <h1>YOUR</h1>
            <h3>
              Universal <br />
              User Avatar
            </h3>
            <button className="btn btn-main pab" onClick={navigateToAvatar}>
              Create
            </button>
          </div>
          <img
            src={UserAvatar}
            className="mediaeyeAvatar-home-flexBox-right"
            alt="No img"
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default MainHome;
