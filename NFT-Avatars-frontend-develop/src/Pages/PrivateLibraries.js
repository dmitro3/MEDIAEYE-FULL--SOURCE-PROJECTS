import React from "react";
// import ShowProfile from "../Components/ShowProfile/ShowProfile";
import PrivateLibrary from "../Components/Library/PrivateLibrary";

const PrivateLibraries = () => {
  return (
    <React.Fragment>
      <div className="mediaProfilepage-wrap">
        <div className="mediaeyeAvatar-layout-middle">
          <div className="mediaeyeAvatar-layout-container">
            <PrivateLibrary />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default PrivateLibraries;
