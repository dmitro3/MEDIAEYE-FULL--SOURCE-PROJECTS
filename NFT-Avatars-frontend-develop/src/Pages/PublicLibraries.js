import React from "react";
// import ShowProfile from "../Components/ShowProfile/ShowProfile";
import PublicLibrary from "../Components/Library/PublicLibrary";

const PublicLibraries = () => {
  return (
    <React.Fragment>
      <div className="mediaProfilepage-wrap">
        <div className="mediaeyeAvatar-layout-middle">
          <div className="mediaeyeAvatar-layout-container">
            <PublicLibrary />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default PublicLibraries;
