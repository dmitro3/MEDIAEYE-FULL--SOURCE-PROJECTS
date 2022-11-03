import React from "react";
import UserCircle from "../Components/icons/UserCircle";
import SideProfile from "../Components/SideProfile/SideProfile";
import MyNewCollection_Component from "../Components/MyNewCollection_Component/MyNewCollection_Component";

const MyNewCollection = () => {
  return (
    <React.Fragment>
      <div className="mediaProfilepage-wrap">
        <div className="mediaeyeAvatar-layout-middle">
          <div className="mediaeyeAvatar-layout-container">
            <div className="mediaProfilepage">
              <div className="mediaProfilepage-header">
                <div className="mediaProfilepage-header-inside">
                  <UserCircle />
                  <h5 className="mediaProfilepage-header-inside-title">
                    Your METAVATAR Profile
                  </h5>
                </div>
              </div>
              <div className="mediaProfilepage-datacontent">
                <SideProfile />
                <MyNewCollection_Component />
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MyNewCollection;
