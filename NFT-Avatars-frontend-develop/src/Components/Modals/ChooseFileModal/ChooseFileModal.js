import React from "react";
import "./ChooseFileModal.scss";
import Cross from "../../icons/CrossIcon";
import { uploadService } from "../../../services/api.service";

const ChooseFile = (props) => {
  const { toggleChooseFile, chooseFile, handleMusics, musics } = props;

  const uploadMusic = async(e) => {
    const formdata = new FormData();
    formdata.append('file', e.target.files[0]);
    const res = await uploadService.upload(formdata);
    let temp = [...musics];
    if(chooseFile === -1) {
      temp.push(res);
    } else {
      await uploadService.remove(temp[chooseFile - 1].filename);
      temp[chooseFile - 1] = res;
    }    
    handleMusics(temp);
    toggleChooseFile();
  }

  return (
    <>
      {chooseFile ? (
        <div className="choose-file-modal">
          <div className="choose-file-modal-ct">
            <button
              className="choose-file-modal-close"
              onClick={() => {
                toggleChooseFile();
              }}
            >
              {" "}
              <Cross />{" "}
            </button>
            <div className="choose-file-modal-ct-mid">
              <h2 className="choose-file-modal-ct-heading">
                Select an audio recording on your computer
              </h2>
              <span className="choose-file-modal-ct-max-file">
                Maximum file size for uploads is 200 MB
              </span>
              <span className="choose-file-modal-ct-text">
                Please upload only your content in order to avoid the threat of
                a copyright dispute or being infringed upon
              </span>
              <div className="choose-file-modal-ct-btn">
                <label
                  className="choose-file-modal-ct-btn-label"
                  htmlFor="choose_file"
                >
                  Choose file
                </label>
              </div>
              <input
                className="choose-file-modal-ct-file-input"
                id="choose_file"
                type="file"
                accept="audio/*"
                onChange={uploadMusic}
              />
            </div>
            {/* <div className='choose-file-modal-ct-mid'>
          <div className='mediaeyeAvatar-Circleloader'>
            <div className='mediaeyeAvatar-Circleloader-button'>
            </div>
          </div>
          <span className='choose-file-modal-ct-file-status'>uploading</span>
        </div>
        <div className='choose-file-modal-ct-mid'>
          <div className="choose-file-modal-ct-mid-right">
            <RightSuccessful/>
          </div>
          <span className='choose-file-modal-ct-file-status'>Succesfull Upload</span>
        </div> */}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ChooseFile;
