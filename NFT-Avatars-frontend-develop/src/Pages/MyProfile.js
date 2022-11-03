import React from "react";
import ShowProfile from "../Components/ShowProfile/ShowProfile";


const MyProfile = () => {
  return (
    <React.Fragment>
      <div className="mediaProfilepage-wrap">
        <div className="mediaeyeAvatar-layout-middle">
          <div className="mediaeyeAvatar-layout-container">
            <ShowProfile />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MyProfile;
