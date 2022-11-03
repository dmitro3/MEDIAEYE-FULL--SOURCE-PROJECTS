import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Link } from "react-router-dom";
import "./CollectionForm.scss";
import CloudUpload from "../icons/CloudUpload";
import Blockchain from "../BlockchainToken/Blockchain";
import Token from "../BlockchainToken/Token";
import Successful from "../Modals/SuccessfulModal/SuccessfulModal";
import Exclamation from "../icons/Exclamation";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import { styled } from "@mui/material/styles";
import { collectionService, uploadService } from "../../services/api.service";
import { session } from "../../utils/session.util";
import Demo  from "../../assets/images/mickey_pig.png";
import Search from "../../assets/images/search.png";
import Close from "../../assets/images/close_icon.png";
// import ToggleButton from 'react-toggle-button';
import { useNavigate } from "react-router-dom";

const CollectionForm = (props) => {
  const MetaTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#141233b0",
      color: "#fff",
      maxWidth: 500,
      fontSize: theme.typography.pxToRem(15),
      padding: "8px 21px",
      border: "none",
    },
  }));

  function ToggleButton() {
    const [on, setOnState] = React.useState(false);
    const toggle = () => setOnState(o => !o);
    return (
      <button className={on ? 'on' : 'off'} on={on} onClick={toggle}>
        <span className="pin" />
      </button>
    );
  }

  const navigate = useNavigate();

  const [successful, setSuccessful] = useState(false);
  const toggleSuccessful = () => {
    setSuccessful(!successful); 
    navigate('/my-profile?tab=2');
  };

  // form values
  const [files, setFiles] = useState([]);
  // const [file, setFile] = useState();
  const [chain, setChain] = useState('4');
  const [type, setType] = useState('ERC721');
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [royalties, setRoyalties] = useState(0);
  const [desc, setDesc] = useState('');

  const createCollection = async () => {
    if(!files) return;
    const formdata = new FormData();
    formdata.append('file', files[0]);
    const res = await uploadService.upload(formdata);
    const user = session.get('eye-user');
    await collectionService.create(
      {
        name: name,
        type: type,
        symbol: symbol,
        royalties: Number(royalties),
        chain: chain,
        desc: desc,
        image: res.filename,
        userId: user.id
      }
    );
    toggleSuccessful();
  }

  const handleRoyalties = (e) => {
    if(e.target.value < 0) {
      setRoyalties(0);
    } else if(e.target.value > 10) {
      setRoyalties(10);
    } else {
      setRoyalties(e.target.value);
    }
  }

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  return (
    <React.Fragment>
      <div className="mediaProfilepage-datacontent-profiledetail collection">
        <Successful
          successful={successful}
          toggleSuccessful={toggleSuccessful}
        />

        <div className="mediaProfilepage-datacontent-collection">
          <h1 className="mediaProfilepage-datacontent-collection-heading">
            collection
          </h1>
          {!files[0] ? (
            <>
              <div
                {...getRootProps()}
                className="mediaProfilepage-datacontent-collection-upload-box"
              >
                <input
                  {...getInputProps()}
                  className="mediaProfilepage-datacontent-collection-upload-box-input"
                />

                <label
                  className="mediaProfilepage-datacontent-collection-upload-box-label"
                  htmlFor="upload_img"
                >
                  <CloudUpload />
                  upload
                </label>

                <label className="mediaProfilepage-datacontent-collection-upload-box-format">
                  or drop here.
                </label>
                <label className="mediaProfilepage-datacontent-collection-upload-box-format">
                  JPEG, PNG <br /> recommended.
                </label>
              </div>
            </>
          ) : (
            <div
              {...getRootProps()}
              className="mediaProfilepage-datacontent-collection-upload-box drag-img"
            >
              <input
                {...getInputProps()}
                className="mediaProfilepage-datacontent-collection-upload-box-input"
              />
              {files.map((file) => (
                <div key={file.name} className="drag-img-wrap">
                  <img src={file.preview} alt="no img" />
                </div>
              ))}
            </div>
          )}

          {!files[0] ? (
            <span className="mediaProfilepage-datacontent-collection-upload-box-span">
              or{" "}
              <Link
                to="/create-avatar"
                className="mediaProfilepage-datacontent-collection-upload-box-span-a"
              >
                choose
              </Link>{" "}
              your avatar
            </span>
          ) : null}

          <div className="mediaProfilepage-datacontent-blockchain">
            <h1 className="mediaProfilepage-datacontent-collection-heading">
              Blockchain Network And Token Type
            </h1>
            <Blockchain chain={chain} setChain={setChain} />
            <Token type={type} setType={setType} />
          </div>

          <div className="mediaProfilepage-datacontent-collection-metadata">
            <h1 className="mediaProfilepage-datacontent-collection-heading">
              collection metadata
            </h1>
            <div className="mediaProfilepage-datacontent-collection-metadata-form">
              <div className="mediaProfilepage-datacontent-collection-metadata-form-grp-row">
                <div className="mediaProfilepage-datacontent-collection-metadata-form-grp collection-name-grp">
                  <label className="mediaProfilepage-datacontent-collection-metadata-form-grp-label">
                    Collection Name*
                  </label>
                  <input
                    type="text"
                    className="mediaProfilepage-datacontent-collection-metadata-form-grp-input collection-name"
                    placeholder="Collection Name"
                    value={name}
                    onChange={e=>setName(e.target.value)}
                  />
                </div>

                <div className="mediaProfilepage-datacontent-collection-metadata-form-grp">
                  <label className="mediaProfilepage-datacontent-collection-metadata-form-grp-label">
                    Collection Symbol*{" "}
                    <MetaTooltip
                      title="ERC-721 is a global Token standard for developing Non-Fungible Tokens over the Ethereum blockchain. The ERC-721 contributes to the rarity and uniqueness to the assets designed and developed. The NFTs are developed with unique uint256 token ID attributes that are available globally."
                      placement="top"
                      TransitionComponent={Fade}
                      followCursor
                    >
                      <div className="icon">
                        <Exclamation />
                      </div>
                    </MetaTooltip>
                  </label>
                  <input
                    type="text"
                    className="mediaProfilepage-datacontent-collection-metadata-form-grp-input symbol"
                    placeholder="Collection Symbol"
                    value={symbol}
                    onChange={e=>setSymbol(e.target.value)}
                  />
                </div>
              </div>
              <div className="mediaProfilepage-datacontent-collection-metadata-form-grp">
                <label className="mediaProfilepage-datacontent-collection-metadata-form-grp-label">
                  Creator Royalties{" "}
                  <MetaTooltip
                    title="ERC-721 is a global Token standard for developing Non-Fungible Tokens over the Ethereum blockchain. The ERC-721 contributes to the rarity and uniqueness to the assets designed and developed. The NFTs are developed with unique uint256 token ID attributes that are available globally."
                    placement="top"
                    TransitionComponent={Fade}
                    followCursor
                  >
                    <div className="icon">
                      <Exclamation />
                    </div>
                  </MetaTooltip>
                </label>
                <div className="mediaProfilepage-datacontent-collection-metadata-form-grp-max">
                  <input
                    type="number"
                    className="mediaProfilepage-datacontent-collection-metadata-form-grp-input royalities"
                    placeholder="5.00"
                    value={royalties}
                    onChange={handleRoyalties}
                  />
                  <button onClick={() => setRoyalties(10)}  className="mediaProfilepage-datacontent-collection-metadata-form-grp-max-btn">
                    max
                  </button>
                </div>
              </div>
              <div className="mediaProfilepage-datacontent-collection-metadata-form-grp">
                <label className="mediaProfilepage-datacontent-collection-metadata-form-grp-label">
                  Description
                </label>
                <textarea
                  className="mediaProfilepage-datacontent-collection-metadata-form-grp-input description-textarea"
                  placeholder="Write here..."
                  value={desc}
                  onChange={e=>setDesc(e.target.value)}
                ></textarea>
              </div>
              <div className="mediaMinters">
                <div className="mediaMinters-inner">
                  <div className="mediaMinters-inner-head">
                  <ToggleButton />
                      <h4 className="title">Add Minters</h4>
                  </div>
                  <div className="mediaMinters-inner-filter">
                    <div className="addMint">
                      <div className="self">
                          <img src={Demo} className="user-img" alt="us-img"/>
                          <p className="user-name">You</p>
                      </div>
                      <button className="btn-mint">Add Minter</button>
                    </div>
                    <div className="search">
                      <input type="text" className="search-input" placeholder="@user_name or wallet address"/>
                      <button className="btn-search"><img src={Search} className="search-img" alt="search"/></button>
                    </div>
                  </div>
                  <div className="mediaMinters-inner-data">
                    <div className="mintUser">
                      <div className="card">
                        <button className="card-close"><img src={Close} className="closeImg" alt="close"/></button>
                        <img src={Demo} className="card-userImg" alt=""/>
                        <h4 className="card-userName">@user123</h4>
                      </div>
                      <div className="card">
                        <button className="card-close"><img src={Close} className="closeImg" alt="close"/></button>
                        <img src={Demo} className="card-userImg" alt=""/>
                        <h4 className="card-userName">@user123</h4>
                      </div>
                      <div className="card">
                        <button className="card-close"><img src={Close} className="closeImg" alt="close"/></button>
                        <img src={Demo} className="card-userImg" alt=""/>
                        <h4 className="card-userName">@user123</h4>
                      </div>
                      <div className="card">
                        <button className="card-close"><img src={Close} className="closeImg" alt="close"/></button>
                        <img src={Demo} className="card-userImg" alt=""/>
                        <h4 className="card-userName">@user123</h4>
                      </div>
                      <div className="card">
                        <button className="card-close"><img src={Close} className="closeImg" alt="close"/></button>
                        <img src={Demo} className="card-userImg" alt=""/>
                        <h4 className="card-userName">@user123</h4>
                      </div>
                      <div className="card">
                        <button className="card-close"><img src={Close} className="closeImg" alt="close"/></button>
                        <img src={Demo} className="card-userImg" alt=""/>
                        <h4 className="card-userName">@user123</h4>
                      </div>
                      <div className="card">
                        <button className="card-close"><img src={Close} className="closeImg" alt="close"/></button>
                        <img src={Demo} className="card-userImg" alt=""/>
                        <h4 className="card-userName">@user123</h4>
                      </div>
                      <div className="card">
                        <button className="card-close"><img src={Close} className="closeImg" alt="close"/></button>
                        <img src={Demo} className="card-userImg" alt=""/>
                        <h4 className="card-userName">@user123</h4>
                      </div>
                      <div className="card">
                        <button className="card-close"><img src={Close} className="closeImg" alt="close"/></button>
                        <img src={Demo} className="card-userImg" alt=""/>
                        <h4 className="card-userName">@user123</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="center">
                <button
                  className="btn btn-info"
                  onClick={createCollection}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CollectionForm;
