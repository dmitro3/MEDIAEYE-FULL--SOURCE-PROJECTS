import React, { useState, useEffect } from 'react';
import './Popup.scss';
import CloseIcon from '../../Icons/CloseIcon';
import Switch from 'react-switch';
import { useSelector } from 'react-redux';
import { Edit } from '../../Icons/Edit';
import { Model3d } from '../../3d/Model3d';
import MintAddon from '../Addons/MintAddon';
import { Info, InfoCircle, Unlock } from '../../Icons';
import ReactTooltip from 'react-tooltip';
const Popup = (props) => {
  const { activeToken, editContent, changeContent, editContentActiveNumber } =
    props;
  const [file, setFile] = useState(editContent?.file ? editContent.file : null);
  const [filesType, setFilesType] = useState(editContent?.filesType ? editContent.filesType : null);
  const [name, setName] = useState(editContent?.name ? editContent.name : '');
  const [description, setDescription] = useState(
    editContent?.description ? editContent.description : ''
  );
  const [supply, setSupply] = useState(
    editContent?.amount ? editContent.amount : ''
  );

  const [nameValid, setNameValid] = useState(true);
  const [descriptionValid, setDescriptionValid] = useState(true);
  const [supplyValid, setSupplyValid] = useState(true);

  const [properties, setProperties] = useState([]);
  const [levels, setLevels] = useState([]);
  const [stats, setStats] = useState([]);
  const [toggleUnlocable, setToggleUnlocable] = useState(false);
  const [unlockableContent, setUnlockableContent] = useState('');

  useEffect(() => {
    setFile(editContent?.file ? editContent.file : null);
    setName(editContent?.name ? editContent.name : '');
    setFilesType(editContent?.filesType ? editContent.filesType : null);
    setDescription(editContent?.description ? editContent.description : '');
    setSupply(editContent?.amount ? editContent.amount : 1);
    setProperties(editContent?.properties ? editContent.properties : []);
    setLevels(editContent?.levels ? editContent.levels : []);
    setStats(editContent?.stats ? editContent.stats : []);
    setToggleUnlocable(editContent?.toggleUnlocable ? editContent.toggleUnlocable : false);
    setUnlockableContent(editContent?.unlockableContent ? editContent.unlockableContent : '');
  }, [editContent]);

  const [selected, setSelected] = useState(-1);
  const [collectionSelectable, setSelectable] = useState(true);

  const changeDescription = (e) => {
    if (e.target.value === '') {
      setDescriptionValid(false);
    } else {
      setDescriptionValid(true);
    }
    setDescription(e.target.value);
  };

  const changeName = (e) => {
    if (e.target.value === '') {
      setNameValid(false);
    } else {
      setNameValid(true);
    }
    setName(e.target.value);
  };

  const switchUnlocable = () => {
    if (toggleUnlocable) {
      setToggleUnlocable(false);
      setUnlockableContent('');
      setSelected(-1);
      setSelectable(true);
    } else {
      setToggleUnlocable(true);
    }
  };

  const changeUnlockableContent = (e) => {
    setUnlockableContent(e.target.value);
  };

  const changeSupply = (e) => {
    if (e.target.value === '') {
      setSupplyValid(false);
    } else {
      setSupplyValid(true);
    }
    setSupply(e.target.value);
  };
  const changeAddons = (content) => {
    setProperties(content?.properties ? content.properties : []);
    setLevels(content?.levels ? content.levels : []);
    setStats(content?.stats ? content.stats : []);
  };
  return (
    <React.Fragment>
      {props.showPopup ? (
        <div
          className={
            props.showPopup
              ? 'mediaeye-popup active mediaeye-popup-md'
              : 'mediaeye-popup'
          }
        >
          <div
            className="mediaeye-popup-wrapper mediaeye-popup-mintnft scrolled"
            onClick={props.togglePopup}
          >
            <div
              className="mediaeye-popup-content"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mediaeye-popup-content-inner">
                <div className="mediaeye-popup-content-inner-header">
                  <div className="mediaeye-popup-content-inner-header-title text-center">
                    Change Info
                  </div>
                </div>
                <div
                  className="mediaeye-popup-close"
                  onClick={props.togglePopup}
                >
                  <CloseIcon />
                </div>
                <div className="mediaeye-popup-mintnft-content">
                  <div className="mediaeye-popup-mintnft-content-inner">
                    <div className="mediaeye-popup-mintnft-content-inner-left">
                      <div className="mediaeye-popup-mintnft-content-inner-left-uploadbox">
                        {file?.url ? (
                          file?.name.split('.').pop() === 'gltf' ||
                            file?.name.split('.').pop() === 'glb' ? (
                            <Model3d model={file.url} />
                          ) : file.type === 'video/mp4' ? (
                            <video
                              style={{
                                aspectRatio: '1/1',
                                objectFit: 'contain'
                              }}
                              className="mediaeye-popup-mintnft-content-inner-left-uploadbox-image"
                              id="uploadImage"
                              src={file.url}
                              alt=""
                              loop
                              controls
                              playsInline
                              controlsList="nodownload"
                            />
                          ) : (
                            <img
                              style={{
                                aspectRatio: '1/1',
                                objectFit: 'contain'
                              }}
                              className={
                                file?.url
                                  ? 'mediaeye-popup-mintnft-content-inner-left-uploadbox-image no_bg'
                                  : 'mediaeye-popup-mintnft-content-inner-left-uploadbox-image'
                              }
                              id="uploadImage"
                              src={file.url}
                              alt={file.name}
                            />
                          )
                        ) : (
                          <div
                            className="mediaeye-popup-mintnft-content-inner-left-uploadbox-image"
                            style={{
                              position: 'relative',
                              left: 0,
                              top: 0
                            }}
                          >
                            <span>Drag & Drop an image here</span>
                            <span>Maximum upload file size: 10 MB.</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mediaeye-popup-mintnft-content-inner-right">
                      <div className="mediaeyeform-group">
                        <label className="mediaeyeform-label">Name </label>
                        <div className="mediaeyeform-group-input">
                          <input
                            className={
                              !nameValid ? 'error' : 'mediaeyeform-input'
                            }
                            type="text"
                            value={name}
                            onChange={(e) => changeName(e)}
                          />
                        </div>
                      </div>

                      {activeToken === 'ERC1155' ? (
                        <div className="mediaeye-popup-mintnft-content-inner-right">
                          <div className="mediaeyeform-group">
                            <label className="mediaeyeform-label">
                              Supply{' '}
                            </label>
                            <div className="mediaeyeform-group-input">
                              <input
                                value={supply}
                                type="number"
                                onChange={(e) => changeSupply(e)}
                                className={
                                  !supplyValid ? 'error' : 'mediaeyeform-input'
                                }
                              />
                            </div>
                          </div>
                        </div>
                      ) : null}
                      <div className="mediaeye-popup-mintnft-content-inner-right-description">
                        <label>Description</label>
                        <div className="mediaeyetextarea">
                          <textarea
                            value={description}
                            className="mediaeyetextarea-input"
                            rows="5"
                            onChange={(e) => changeDescription(e)}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mediaeye-popup-mintnft-content-bottom">
                    <MintAddon
                      addonsdata={{
                        properties: properties,
                        levels: levels,
                        stats: stats
                      }}
                      changeAddons={changeAddons}
                    />
                  </div>

                  <div className={toggleUnlocable ? 'cheked_block' : ''}>
                    <div className="mediaeye-popup-mintnft-content-unlocable mediaeyeswitch">
                      <Switch
                        checkedIcon={false}
                        uncheckedIcon={false}
                        onChange={() => {
                          switchUnlocable();
                        }}
                        checked={toggleUnlocable}
                        height={21}
                        width={50}
                        className={`mediaeyeswitch-btn mediaeyeswitch-left ${toggleUnlocable ? 'active' : ''}`}
                      />
                      <div className="mediaeye-popup-mintnft-content-unlocable-head">
                        <Unlock />
                        <span>Unlockable Content</span>
                      </div>
                      <div
                        className="mediaeyeinfo"
                        data-html={true}
                        data-class="mediaeyetooltip"
                        data-tip="Include unlockable content that can only be revealed by the owner of the item."
                      >
                        <InfoCircle type="outline-white" />
                      </div>
                      <ReactTooltip />
                    </div>
                  </div>
                  {toggleUnlocable ? (
                    <div className="mediaeyeform-group">
                      <div className="mediaeyetextarea">
                        <textarea
                          value={unlockableContent}
                          className="mediaeyetextarea-input"
                          rows="5"
                          placeholder="Enter Content"
                          onChange={(e) => changeUnlockableContent(e)}
                        ></textarea>
                      </div>
                    </div>
                  ) : null}

                  <div className="mediaeye-popup-mintnft-content-savebtn">
                    <button
                      disabled={name.length < 1 || supply < 1 ? true : false}
                      className="btn btn-info"
                      onClick={() => {
                        changeContent(editContentActiveNumber, {
                          amount: supply,
                          name: name,
                          description: description,
                          file: editContent.file,
                          properties: properties,
                          levels: levels,
                          stats: stats,
                          toggleUnlocable: toggleUnlocable,
                          unlockableContent: unlockableContent,
                          filesType: filesType

                        });
                      }}
                    >
                      <span>Save</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default Popup;
