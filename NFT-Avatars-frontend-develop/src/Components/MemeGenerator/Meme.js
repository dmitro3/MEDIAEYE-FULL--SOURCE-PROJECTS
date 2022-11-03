import React, { useState } from "react";
import Main from "./components/MainPage/MainPage";
import UploadButton from "./components/UploadButton/UploadButton";
//import local_memegenerator from "bootstrap/dist/css/bootstrap.min.css";
import "./memeG.css";
import "./local_memegenerator.scss";
function Meme() {
  const [imageSrc, setImageSrc] = useState();
  const [isOpen, setIsOpen] = useState(true);
  function updateImageSrc(filepath) {
    setImageSrc(filepath);
  }

  function openHome() {
    setIsOpen(false);
  }

  if (isOpen) {
    return (
      <React.Fragment>
        <div className="mediaProfilepage-wrap bootstrap-scope">
          <div className="mediaeyeAvatar-layout-middle">
            <div className="mediaeyeAvatar-layout-container">
              <div className="mediaeyeAvatar-createfirst">
                <div className="mediaeyeAvatar-createfirst-header">
                  <h1>Create Meme Generator</h1>
                </div>
                <div className="mediaeyeAvatar-createfirst-content MemeGeneter-bootstrap">
                  <UploadButton
                    updateImageSrc={updateImageSrc}
                    openMain={openHome}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  } else {
    if (!imageSrc) return "loading...";
  }
  return (
    <React.Fragment>
      <div className="mediaProfilepage-wrap">
        <div className="mediaeyeAvatar-layout-middle">
          <div className="mediaeyeAvatar-layout-container">
            <div className="mediaeyeAvatar-createfirst">
              <div className="mediaeyeAvatar-createfirst-header">
                <h1>Create Meme Generator</h1>
                <div id="GISpreview"> </div>
                <div id="pngHolder"> </div>
              </div>
              <div className="mediaeyeAvatar-createfirst-content MemeGeneter-bootstrap">
                <div>
                  <Main imageSrc={imageSrc} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Meme;
