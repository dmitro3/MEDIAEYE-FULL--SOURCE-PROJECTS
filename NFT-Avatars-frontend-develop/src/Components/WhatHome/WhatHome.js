import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./WhatHome.scss";
import ReadyPopup from "../Modals/AreYouReadyModal/AreYouReadyModal";

//media
import whatAvatar from "../../assets/images/Home/whatAvatar.png";
import whatAvatarMT from "../../assets/images/Home/whatAvatarMT.png";
import OwnAvatar1 from "../../assets/images/Home/OwnAvatar1.png";
import OwnAvatar2 from "../../assets/images/Home/OwnAvatar2.png";
import backgard3MT from "../../assets/images/Home/backgard3MT.png";

const WhatHome = () => {
  const navigate = useNavigate();
  const navigateToAvatar = () => {
    navigate("/create-avatar");
  };
  useEffect(() => {
    let el = document.getElementById("tilt");
    const height = el.clientHeight;
    const width = el.clientWidth;
    el.addEventListener("mousemove", handleMove);
    function handleMove(e) {
      const xVal = e.layerX;
      const yVal = e.layerY;
      const yRotation = 5 * ((xVal - width / 2) / width);
      const xRotation = -5 * ((yVal - height / 2) / height);
      const string =
        "perspective(800px) scale(1.01) rotateX(" +
        xRotation +
        "deg) rotateY(" +
        yRotation +
        "deg)";
      el.style.transform = string;
    }
    el.addEventListener("mouseout", function () {
      el.style.transform = "perspective(800px) scale(1) rotateX(0) rotateY(0)";
    });
    el.addEventListener("mousedown", function () {
      el.style.transform =
        "perspective(800px) scale(0.9) rotateX(0) rotateY(0)";
    });
    el.addEventListener("mouseup", function () {
      el.style.transform =
        "perspective(800px) scale(1.01) rotateX(0) rotateY(0)";
    });
  });

  const [readyPopup, setReady] = useState(false);
  const toggleReadyPopup = () => {
    setReady(!readyPopup);
  };

  return (
    <React.Fragment>
      <ReadyPopup readyPopup={readyPopup} toggleReadyPopup={toggleReadyPopup} />

      <div className="mediaeyeAvatar-layout-container">
        <div className="mediaeyeAvatar-home-whatBox">
          <div className="mediaeyeAvatar-home-mainbackg left noShow"></div>
          <img
            src={whatAvatar}
            className="mediaeyeAvatar-home-whatBox-left"
            alt="No img"
          />
          <img
            src={whatAvatarMT}
            className="mediaeyeAvatar-home-whatBox-left show"
            alt="No img"
          />
          <div className="mediaeyeAvatar-home-whatBox-right">
            <h3>
              WHAT IS <br /> METAVATAR?
            </h3>
            <ul className="check_list">
              <li> Assign and Connect your Avatar to your Wallet Address </li>
              <li>
                Change your Avatar and Transfer you Avatar to a new Wallet
                Address{" "}
              </li>
              <li>Connect your Avatar to your social media</li>
              <li>Own Your Identity on Web 3.0</li>
            </ul>
            <Link className="mediaeyeAvatar-home-whatBox-right-drop" to="#">
              And more!
            </Link>
          </div>
        </div>
      </div>
      <div style={{ position: "relative" }}>
        <img
          src={backgard3MT}
          className="mediaeyeAvatar-home-BlueBox-greengrad"
          alt="No img"
        />
        <div
          className="mediaeyeAvatar-home-BlueBox"
          id="tilt"
          onClick={navigateToAvatar}
        >
          <div className="mediaeyeAvatar-home-BlueBox-content">
            <h1>
              Own Your Identity <br />
              on Web 3.0{" "}
            </h1>
            <button className="btn btn-main" onClick={() => toggleReadyPopup()}>
              Create
            </button>
          </div>
          <img
            src={OwnAvatar2}
            className="mediaeyeAvatar-home-BlueBox-av2"
            alt="No img"
          />
          <img
            src={OwnAvatar1}
            className="mediaeyeAvatar-home-BlueBox-av1"
            alt="No img"
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default WhatHome;
