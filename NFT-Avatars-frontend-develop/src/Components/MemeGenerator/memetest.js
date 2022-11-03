import React, { useState, useEffect } from "react";
import "./memeG.css";
import "./local_memegenerator.scss";
function Memetest() {
  const Img_genrate = (e) => {
    const base_image = new Image();
    base_image.src =
      "https://devverify.renttry.com/metavatarimages/1656480622836_avatar.png";
    base_image.crossOrigin = "anonymous";
    // base_image.rak = "deepak";
    console.log("image ", base_image);

    console.log("image.width ", base_image.width);
    var canvassss = convertImageToCanvas(base_image);
    if (canvassss) {
      document
        .getElementById("pngHolder")
        .appendChild(convertCanvasToImage(canvassss));
    }
  };

  function convertImageToCanvas(image) {
    console.log("base_image ", image);
    var canvas = document.createElement("canvas");
    console.log("canvas_1_test ", canvas);

    canvas.width = image.width;
    canvas.height = image.height;
    console.log("canvas_2_test ", canvas);
    document.getElementById("canvasHolder").appendChild(canvas);
    canvas.getContext("2d").drawImage(image, 0, 0);

    return canvas;
  }

  // Converts canvas to an image
  function convertCanvasToImage(canvas) {
    var dataURL = canvas.toDataURL("image/png");
    return dataURL;
  }
  //    Img_genrate();
  useEffect(() => {
    const timer = setTimeout(() => Img_genrate(), 5000);
  }, null);

  return (
    <React.Fragment>
      <div className="mediaProfilepage-wrap">
        <div className="mediaeyeAvatar-layout-middle">
          <div className="mediaeyeAvatar-layout-container">
            <div className="mediaeyeAvatar-createfirst">
              <div className="mediaeyeAvatar-createfirst-header">
                <h1>Create Meme Generator</h1>
                <div id="canvasHolder"> </div>
              </div>
              <div className="mediaeyeAvatar-createfirst-content MemeGeneter-bootstrap">
                <div id="GISpreview"> </div>

                <div id="pngHolder"> </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Memetest;
