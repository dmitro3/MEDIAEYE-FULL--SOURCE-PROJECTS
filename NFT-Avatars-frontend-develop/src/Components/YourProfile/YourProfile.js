import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./YourProfile.scss";
import Setting from "../icons/Setting.js";
import Exit from "../icons/Exit.js";
import profile_img from "../../assets/images/profile-img.png";
import { session } from "../../utils/session.util";
import { baseUrl } from "../../services/api.service";
// import { upload } from "@testing-library/user-event/dist/upload";

const YourProfile = (props) => {
  const { readyUserProfile, toggleUserProfile, connectWallet } = props;
  const [profile, setProfile] = useState();

  useEffect(() => {
    const user = session.get('eye-user');
    if(!!user) {
      setProfile(user);
    }
  }, [readyUserProfile]);



  const handleConnectWallet = () => {
    toggleUserProfile();
    connectWallet();
  }

  const navigate = useNavigate();

  const logout = () => {
    toggleUserProfile();
    session.clear();
    navigate('/');
  }

  return (
    <React.Fragment>
      {readyUserProfile ? (
        <div className="your-profile-wrap" id="your-profile-div">
          <div className="your-profile-wrap-head">
            <Link
              to="/profile"
              className="your-profile-wrap-head-a"
              onClick={() => {
                toggleUserProfile();
              }}
            >
              <Setting />
            </Link>
          </div>
          <div className="your-profile-wrap-body">
            <div className="your-profile-wrap-body-profile">
              <div className="your-profile-wrap-body-profile-img">
                <img src={(!!profile && !!profile.avatar) ? `${baseUrl}/upload/${profile.avatar}`: profile_img} alt="No img" />
              </div>
              <div className="your-profile-wrap-body-profile-name">
                <h3 className="your-profile-wrap-body-profile-name-h3">
                  { !!profile && profile.username }
                </h3>
                <div className="your-profile-wrap-body-profile-name-status">
                  <span className="your-profile-wrap-body-profile-name-status-online"></span>{" "}
                  online
                </div>
              </div>
            </div>
            <ul className="your-profile-wrap-body-ul">
              <li className="your-profile-wrap-body-ul-li">
                <Link
                  to="/my-profile"
                  onClick={() => {
                    toggleUserProfile();
                  }}
                >
                  <span>METAVATAR</span> Profile
                </Link>
              </li>
              <li className="your-profile-wrap-body-ul-li">
                <Link
                  to="#"
                  onClick={() => {
                    toggleUserProfile();
                  }}
                >
                  Refer a Friend
                </Link>
              </li>
              <li className="your-profile-wrap-body-ul-li">
                <Link
                  to="/profile"
                  onClick={() => {
                    toggleUserProfile();
                  }}
                >
                  Settings
                </Link>
              </li>
              <li className="your-profile-wrap-body-ul-li">
                <Link
                  to="#"
                  onClick={() => {
                    toggleUserProfile();
                  }}
                >
                  Help
                </Link>
              </li>
            </ul>
            <button onClick={handleConnectWallet} className="btn btn-main your-profile-wrap-body-btn">
              Connect Your Wallet
            </button>
          </div>
          <div className="your-profile-wrap-footer">
            <button onClick={logout} className="your-profile-wrap-footer-btn">
              <Exit /> sign out
            </button>
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default YourProfile;
