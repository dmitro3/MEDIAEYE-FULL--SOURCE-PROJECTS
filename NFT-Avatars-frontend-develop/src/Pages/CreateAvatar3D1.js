import React from "react";

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
                <iframe
                  src="https://mediaeyenft.readyplayer.me/avatar"
                  style={{
                    height: "86vh",
                    width: "100%",
                    "border-radius": "24.5221px",
                  }}
                  title="Create 3D Avatar"
                ></iframe>
              </div>
              
            </div>
            
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CreateAvatar;
