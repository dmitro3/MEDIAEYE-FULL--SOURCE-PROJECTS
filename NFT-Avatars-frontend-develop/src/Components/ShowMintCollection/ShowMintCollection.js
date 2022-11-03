import React from "react";
import UserCircle from "../../Components/icons/UserCircle";
import "./ShowMintCollection.scss";
import SideProfile from "../SideProfile/SideProfile";
import SideMint from "./SideMint";

const ShowMintCollection = () => {
  return (
    <React.Fragment>
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
          <SideMint />
        </div>
      </div>
    </React.Fragment>
  );
};

export default ShowMintCollection;
