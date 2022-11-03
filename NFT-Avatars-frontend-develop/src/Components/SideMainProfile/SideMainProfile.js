import React, { useState } from "react";
import Setting from "../../Components/icons/Setting";
import profileimg from "../../assets/images/profileimg.png";
import DownArrow from "../icons/DownArrow";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../services/api.service";

const SideMainProfile = ({ profile }) => {
  const [isActive, setActive] = useState("false");
  const ToggleClass = () => {
    setActive(!isActive);
  };

  const navigate = useNavigate();

  return profile && (
    <React.Fragment>
      <div
        className={
          isActive
            ? "mediaProfilepage-datacontent-userprofile edit-left top-padding toggleOpen"
            : " mediaProfilepage-datacontent-userprofile edit-left top-padding"
        }
      >
        <button onClick={ToggleClass} className="profile-toggle">
          {" "}
          <DownArrow /> Your METAVATAR Profile
        </button>
        <div className="profilemain">
          <label className="profilemain-setting" htmlFor="choose_user-img">
            <Setting />
          </label>
          <input
            id="choose_user-img"
            className="profilemain-setting-change-img"
            type="file"
          />
          <div className="profilemain-userimage">
            <img src={(!!profile && !!profile.avatar) ? `${baseUrl}/upload/${profile.avatar}` : profileimg} className="" alt="user profile" />
          </div>
          <div className="profilemain-userdata">
            <button onClick={() => navigate('/create-avatar?profile=edit')} className="btn btn-main">Create Avatar</button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SideMainProfile;
