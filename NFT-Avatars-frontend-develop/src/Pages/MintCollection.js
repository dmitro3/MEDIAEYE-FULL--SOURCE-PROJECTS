import React from "react";
import ShowMintCollection from "../Components/ShowMintCollection/ShowMintCollection";

const MintCollection = () => {
  return (
    <React.Fragment>
      <div className="mediaProfilepage-wrap">
        <div className="mediaeyeAvatar-layout-middle">
          <div className="mediaeyeAvatar-layout-container">
            <ShowMintCollection />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MintCollection;
