import React from "react";
import CreateMETAVATAR from "../Components/CreateMETAVATAR/CreateMETAVATAR";

const CreateAvatar = () => {
  return (
    <React.Fragment>
      <div className="mediaProfilepage-wrap">
        <div className="mediaeyeAvatar-layout-middle">
          <div className="mediaeyeAvatar-layout-container">
            <div className="mediaeyeAvatar-createfirst">
              <div className="mediaeyeAvatar-createfirst-header">
                <h1>Create METAVATAR</h1>
              </div>
              <div className="mediaeyeAvatar-createfirst-content">
                <CreateMETAVATAR />
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CreateAvatar;
