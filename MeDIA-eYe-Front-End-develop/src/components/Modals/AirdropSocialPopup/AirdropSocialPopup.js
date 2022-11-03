import React, { useState, useEffect, useScript } from 'react';
import './AirdropSocialPopup.scss';
import { useDispatch, useSelector } from 'react-redux';
import { closeSocialPopup } from '../../../store/app/appSlice';
import { CloseIcon } from '../../Icons';
import FilePaperClip from '../../Icons/FilePaperClip';
import FileUpload from '../../Icons/FileUpload';
import TASKS from '../../Airdrop/AirdropTasks/Tasks';
import { submitTaskProof } from '../../../blockchain/functions/Airdrops/SubmitTaskProof';

export default function AirdropSocialPopup(props) {
  const {
    airdrop,
    showPopup,
    switchSocialPopup,
    task,
    title,
    link,
    txt,
    media,
    Moralis,
    refreshTasks
  } = props;
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileState, setfileState] = useState(0);
  const handleUpload = (event) => {
    setfileState(1);
    setFile(event.target.files[0]);
  };

  const deletehandleUpload = (i) => {
    setfileState(0);
    setFile(null);
  };

  const removeFile = () => {
    setfileState(0);
    setFile(null);
  };

  const submitPressed = async () => {
    if (fileState == 1) {
      setLoading(true);
      const currUser = Moralis.User.current();
      await submitTaskProof(Moralis, {
        airdrop: airdrop,
        task: task,
        media: media,
        file: file,
        user: currUser?.attributes?.ethAddress,
      });
      // check completed tasks
      refreshTasks();
      // reset file
      removeFile();
      setLoading(false);
      switchSocialPopup();
    } else {
      setLoading(true);
      setLoading(false);
      switchSocialPopup();
    }

  };

  return (
    <>
      {showPopup ? (
        <div className={showPopup ? 'mediaeye-popup active' : 'mediaeye-popup'}>
          <div
            className="mediaeye-popup-wrapper"
            onClick={() => switchSocialPopup()}
          >
            <div
              className="mediaeye-popup-content airdrop-social-popup"
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              <div className="mediaeye-popup-content-inner">
                <div
                  className="mediaeye-popup-close"
                  onClick={() => switchSocialPopup()}
                >
                  <CloseIcon />
                </div>
                <div className="airdrop-social-popup-main-content">
                  <h4 className="airdrop-social-popup-main-content-head">
                    {media && task ? TASKS[media][task]?.title : null}
                  </h4>
                  <div className="airdrop-social-popup-main-content-iframe">
                    {props.title === 'Like Video on Youtube' ? (
                      <iframe
                        className="airdrop-social-popup-main-content-iframe-content"
                        src="https://www.youtube.com/embed/YrHCD7nx29o?controls=0"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    ) : props.title === 'Spotify-Like a Song' ? (
                      <iframe
                        className="airdrop-social-popup-main-content-iframe-content-spotify"
                        src={props.link}
                        frameBorder="0"
                        allowFullScreen="true"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      ></iframe>
                    ) : props.title === 'Like a Vimeo Video' ? (
                      <iframe
                        className="airdrop-social-popup-main-content-iframe-content"
                        src="https://player.vimeo.com/video/239566739?h=b63754ec0a&color=ffffff&title=0&byline=0&portrait=0"
                        frameBorder="0"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    ) : props.title ===
                      'Twitch - Watch a Featured Videolist' ? (
                      <iframe
                        className="airdrop-social-popup-main-content-iframe-content"
                        src="https://clips.twitch.tv/embed?clip=UgliestSnappyRadicchioImGlitch-oYfpQs4qYT7lh1Qz&parent=localhost"
                        frameBorder="0"
                        allowFullScreen="true"
                        scrolling="no"
                      ></iframe>
                    ) : props.title === 'Telegram Post' ? (
                      <iframe
                        className="airdrop-social-popup-main-content-iframe-content"
                        src="https://clips.twitch.tv/embed?clip=UgliestSnappyRadicchioImGlitch-oYfpQs4qYT7lh1Qz&parent=localhost"
                        frameBorder="0"
                        allowFullScreen="true"
                        scrolling="no"
                      ></iframe>
                    ) : props.title === 'Follow Snapchat' ? (
                      <div className="modal-airdrop-token-follow-snapchat">
                        <h4 className="modal-airdrop-token-follow-snapchat-head">
                          Attachments
                        </h4>
                        <input
                          type="file"
                          accept="image/png, image/jpg, image/jpeg"
                          id="snapchat-screenshot-modal-token"
                          style={{ display: 'none' }}
                          onChange={handleUpload}
                        />
                        <label
                          className="modal-airdrop-token-follow-snapchat-drop-label"
                          htmlFor="snapchat-screenshot-modal-token"
                        >
                          <FileUpload /> Add screenshot proof of competion task
                        </label>
                        {file?.map((file, i) => (
                          <div className="modal-airdrop-token-follow-snapchat-flex">
                            <FilePaperClip />
                            <label htmlFor="snapchat-screenshot-modal-token">
                              {file.name}
                            </label>
                            <CloseIcon onClick={() => deletehandleUpload(i)} />
                          </div>
                        ))}
                      </div>
                    ) : props.title === 'CoinMarketCap' ? (
                      <div className="modal-airdrop-token-follow-snapchat">
                        <h4 className="modal-airdrop-token-follow-snapchat-head">
                          Attachments
                        </h4>
                        <input
                          type="file"
                          accept="image/png, image/jpg, image/jpeg"
                          id="snapchat-screenshot-modal-token"
                          style={{ display: 'none' }}
                          onChange={handleUpload}
                        />
                        <label
                          className="modal-airdrop-token-follow-snapchat-drop-label"
                          htmlFor="snapchat-screenshot-modal-token"
                        >
                          <FileUpload /> Add screenshot proof of competion task
                        </label>
                        {file.map((file, i) => (
                          <div className="modal-airdrop-token-follow-snapchat-flex">
                            <FilePaperClip />
                            <label htmlFor="snapchat-screenshot-modal-token">
                              {file.name}
                            </label>
                            <CloseIcon onClick={() => deletehandleUpload(i)} />
                          </div>
                        ))}
                      </div>
                    ) : props.title === 'CoinGecko' ? (
                      <div className="modal-airdrop-token-follow-snapchat">
                        <h4 className="modal-airdrop-token-follow-snapchat-head">
                          Attachments
                        </h4>
                        <input
                          type="file"
                          accept="image/png, image/jpg, image/jpeg"
                          id="snapchat-screenshot-modal-token"
                          style={{ display: 'none' }}
                          onChange={handleUpload}
                        />
                        <label
                          className="modal-airdrop-token-follow-snapchat-drop-label"
                          htmlFor="snapchat-screenshot-modal-token"
                        >
                          <FileUpload /> Add screenshot proof of competion task
                        </label>
                        {file.map((file, i) => (
                          <div className="modal-airdrop-token-follow-snapchat-flex">
                            <FilePaperClip />
                            <label htmlFor="snapchat-screenshot-modal-token">
                              {file.name}
                            </label>
                            <CloseIcon onClick={() => deletehandleUpload(i)} />
                          </div>
                        ))}
                      </div>
                    ) : (
                      // If not a special case, show generic upload proof
                      <div className="modal-airdrop-token-follow-snapchat">
                        <h4 className="modal-airdrop-token-follow-snapchat-head">
                          Attachments
                        </h4>
                        <input
                          type="file"
                          accept="image/png, image/jpg, image/jpeg"
                          id="snapchat-screenshot-modal-token"
                          style={{ display: 'none' }}
                          onChange={handleUpload}
                        />
                        <label
                          className="modal-airdrop-token-follow-snapchat-drop-label"
                          htmlFor="snapchat-screenshot-modal-token"
                        >
                          <FileUpload /> Add screenshot proof of competion task
                        </label>
                        {file ? (
                          <div className="modal-airdrop-token-follow-snapchat-flex">
                            <FilePaperClip />
                            <label htmlFor="snapchat-screenshot-modal-token">
                              {file?.name}
                            </label>
                            <CloseIcon onClick={() => removeFile()} />
                          </div>
                        ) : null}
                      </div>
                    )}
                  </div>
                  <button
                    className="btn btn-info"
                    onClick={() => submitPressed()}
                  >
                    {loading ? 'Submitting...' : props.txt ? props.txt : "Submit"}

                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
