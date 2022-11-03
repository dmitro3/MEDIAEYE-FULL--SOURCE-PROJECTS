import React from "react";
import MainProfile from "../Components/Profile/MainProfile";

const Profile = () => {
  return (
    <React.Fragment>
      <div className="mediaProfilepage-wrap">
        <div className="mediaeyeAvatar-layout-middle">
          <div className="mediaeyeAvatar-layout-container">
            <MainProfile />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Profile;
