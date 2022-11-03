import React, { useEffect, useState } from "react";
import "./CreateMETAVATAR.scss";

//media
import Choose2D from "../../assets/images/Choose2D.png";
import profileimg from "../../assets/images/profileimg.png";
import ChooseMeme from "../../assets/images/ChooseMeme.png";
import ChooseRealistic from "../../assets/images/ChooseRealistic.png";
import { useSearchParams } from "react-router-dom";

const CreateMetaAvatar = () => {
  const [editProfile, setEditProfile] = useState();
  // function createRipple(event) {
  //   const button = event.currentTarget;

  //   const circle = document.createElement("span");
  //   const diameter = Math.max(button.clientWidth, button.clientHeight);

  //   circle.style.width = circle.style.height = `${diameter}px`;

  //   circle.classList.add("ripple");

  //   const ripple = button.getElementsByClassName("ripple")[0];

  //   if (ripple) {
  //     ripple.remove();
  //   }

  //   button.appendChild(circle);
  // }

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const param = searchParams.get('profile');
    setEditProfile(param);
  }, []);

  return (
    <React.Fragment>
      <div className="mediaeyeAvatar-createfirst-content-inner">
        <div className="mediaeyeAvatar-createfirst-content-inner-choose">
          <div className="mediaeyeAvatar-createfirst-header">
            <h1>Choose your METAVATAR type</h1>
          </div>
          <div className="mediaeyeAvatar-createfirst-content-inner-choose-first">
            <div className="mediaeyeAvatar-createfirst-content-inner-choose-first-content">
              <div className="mediaeyeAvatar-createfirst-content-inner-choose-first-content-container">
                <a href={`/create-avatar/2d?profile=${editProfile}`}>
                  <img src={Choose2D} alt="2D" />
                </a>
              </div>
              <h3>2D</h3>
            </div>
            <div className="mediaeyeAvatar-createfirst-content-inner-choose-first-content">
              <div className="mediaeyeAvatar-createfirst-content-inner-choose-first-content-container">
                <a href={`/create-avatar/3d?profile=${editProfile}`}>
                  <img src={profileimg} alt="3D" />
                </a>
              </div>
              <h3>3D</h3>
            </div>
            <div className="mediaeyeAvatar-createfirst-content-inner-choose-first-content">
              <div className="mediaeyeAvatar-createfirst-content-inner-choose-first-content-container">
                <a href={`/create-avatar/realstick?profile=${editProfile}`}>
                  <img src={ChooseRealistic} alt="Realistic" />
                </a>
                {/* <div className='mediaeyeAvatar-createfirst-content-inner-choose-first-content-container-commingsoon'>
                                    <h3>COMING SOON</h3>
                                </div> */}
              </div>
              <h3>Realistic</h3>
            </div>
            <div className="mediaeyeAvatar-createfirst-content-inner-choose-first-content">
              <div className="mediaeyeAvatar-createfirst-content-inner-choose-first-content-container">
                <a href={`/create-avatar/meme?profile=${editProfile}`}>
                  <img src={ChooseMeme} alt="Meme" />
                </a>
              </div>
              <h3>Meme</h3>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CreateMetaAvatar;
