import React from "react";
import "./CustomHome.scss";

//media
import bbAvatar from "../../assets/images/Home/bbAvatar.png";
import AvAvatar from "../../assets/images/Home/AvAvatar.png";

const CustomHome = () => {
  return (
    <React.Fragment>
      <div className="mediaeyeAvatar-home-custBox">
        <div className="mediaeyeAvatar-home-mainback rotate"></div>
        <div className="mediaeyeAvatar-home-mainbackg bottomMT"></div>
        <div className="mediaeyeAvatar-layout-container mediaeyeAvatar-home-custBox">
          <div className="mediaeyeAvatar-home-custBox-left">
            <h1>Customization</h1>
            <h4>without restrictions</h4>
            <div className="mediaeyeAvatar-home-custBox-left-wrapBox ">
              <h6>BIO</h6>
              <h6>Preferences</h6>
              <h6>Socials</h6>
              <h6>Symbols</h6>
              <h6>Logos</h6>
              <h6>Branding</h6>
            </div>
            <div className="mediaeyeAvatar-home-custBox-left-wrapBox ">
              <h6>Followers</h6>
              <h6>NFT Assets</h6>
              <h6>Status</h6>
              <h6>Avatar Builder</h6>
            </div>
            <div className="mediaeyeAvatar-home-custBox-left-wrapBox wb3">
              <h6>Credentials </h6>
              <h6>Follows</h6>
              <h6>Referrals</h6>
              <h6>Communities</h6>
            </div>
            <div className="mediaeyeAvatar-home-custBox-left-wrapBox ">
              <h6>Preferred Brands </h6>
              <h6>Preferred Services</h6>
              <h6>URLs</h6>
            </div>
            <div className="mediaeyeAvatar-home-custBox-left-wrapBox wrapbox">
              <h6>BIO</h6>
              <h6>Preferences</h6>
              <h6>Socials</h6>
              <h6>Symbols</h6>
              <h6>Logos</h6>
              <h6>Branding</h6>
              <h6>Followers</h6>
              <h6>NFT Assets</h6>
              <h6>Status</h6>
              <h6>Avatar Builder</h6>
              <h6>Credentials </h6>
              <h6>Follows</h6>
              <h6>Referrals</h6>
              <h6>Communities</h6>
              <h6>Preferred Brands </h6>
              <h6>Preferred Services</h6>
              <h6>URLs</h6>
            </div>
          </div>
          <div className="mediaeyeAvatar-home-custBox-right">
            <img
              src={bbAvatar}
              className="mediaeyeAvatar-home-custBox-right-imgbb"
              alt="No img"
            />
            <img
              src={AvAvatar}
              className="mediaeyeAvatar-home-custBox-right-imgav"
              alt="No img"
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CustomHome;
