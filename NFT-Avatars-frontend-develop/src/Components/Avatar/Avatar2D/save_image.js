import React from "react";
import { Canvg } from "canvg";
const SaveImage = (props) => {
  const downloadImage = (imageURL) => {
    // Creating an invisible anchor element and executing the 'click'
    // method seems to be the standard way of starting a download
    const downloadLink = document.createElement("a");
    downloadLink.href = imageURL;
    downloadLink.download = "avatar.png";
    document.body.appendChild(downloadLink);
    downloadLink.dispatchEvent(
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      })
    );

    // Remove link as final cleanup step
    document.body.removeChild(downloadLink);
  };

  const saveImages = () => {
    // We need to have a single svg element which is passed to canvg
    //let combinedSvg = '<svg width="360px" height="360px" viewBox="0 0 360 360" style={{"position": "absolute";"width": "100"%;"height": "100%";}}>';
    let combinedSvg =
      '<div id="avatar" style="position:relative;width:100%;height:100%;"><svg width="360px" height="360px" viewBox="0 0 360 360" style="position: absolute;width: 100%;height: 100%;">';
    // Helper method to add only those group elements which actually exist
    // to the combined SVG string
    const addIfAvailable = (element) => {
      if (element !== undefined && element !== null) {
        combinedSvg = combinedSvg + element.outerHTML;
      }
    };

    const avatarDiv = document.querySelector("#avatar");
    addIfAvailable(
      avatarDiv.querySelector("#skinColor").querySelector(".show")
    );
    addIfAvailable(avatarDiv.querySelector("#tattoos").querySelector(".show"));
    addIfAvailable(
      avatarDiv.querySelector("#accesories").querySelector(".show")
    );
    addIfAvailable(avatarDiv.querySelector("#clothes").querySelector(".show"));
    addIfAvailable(avatarDiv.querySelector("#eyebrows").querySelector(".show"));
    addIfAvailable(avatarDiv.querySelector("#eyes").querySelector(".show"));
    addIfAvailable(avatarDiv.querySelector("#mouths").querySelector(".show"));
    addIfAvailable(avatarDiv.querySelector("#hair").querySelector(".show"));
    addIfAvailable(
      avatarDiv.querySelector("#facialhair2").querySelector(".show")
    );
    addIfAvailable(avatarDiv.querySelector("#glasses").querySelector(".show"));

    combinedSvg = combinedSvg + "</svg></div>";

    // Create an invisible canvas and render the combined SVG onto the canvas.
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 1200;
    const ctx = canvas.getContext("2d");
    const drawn = Canvg.fromString(ctx, combinedSvg);

    drawn.render();

    downloadImage(canvas.toDataURL("image/png"));
  };

  return (
    <div>
      <img
        className="random download-img"
        onClick={() => saveImages()}
        src={
          require("../../../assets/images/Avatar2d/img/download.svg").default
        } alt=""
      />
    </div>
  );
};
export default SaveImage;
