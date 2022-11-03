import React from "react";
import UserCircle from "../Components/icons/UserCircle";
import SideProfile from "../Components/SideProfile/SideProfile";
import CollectionForm from "../Components/CollectionForm/CollectionForm";

const Collection = () => {
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
                <CollectionForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Collection;
