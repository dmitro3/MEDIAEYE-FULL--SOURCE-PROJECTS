import React, { useState } from 'react';
import MintAddon from '../../CreateProduct/Addons/MintAddon';
import {
  Close,
  Edit,
  EditAvatar,
  InfoCircle,
  Upload,
  UploadIcon,
  SearchIcon,
  PlusSquare2
} from '../../Icons';
import CloseIcon from '../../Icons/CloseIcon';
import {
  GetTokenIcon,
  GetNetworkIcon,
  GetDefaultImages,
  fileUploaderLayout
} from '../../../blockchain/functions/Utils';
import { useMoralis } from 'react-moralis';
import { FileUploader } from 'react-drag-drop-files';
import SelectSearch from 'react-select-search';
import { useDispatch, useSelector } from 'react-redux';
import { toggleGeneralPopup } from '../../../store/app/appSlice';
import LaunchAirdropNew from './LaunchAirdropNew';
import './LaunchNew.scss';
import Switch from 'react-switch';
import { Link } from 'react-router-dom';
import CreateProductMintBlock from '../../CreateProduct/CreateProductMintBlock/CreateProductMintBlock';
import GenerativeProperties from '../../CreateProduct/Addons/GenerativeProperties';

const FreeMint = (props) => {
  const { activeAirdropERC721Filter, airdropType } = props;
  const dispatch = useDispatch();
  const [file, setFile] = React.useState('');
  const { Moralis, user, isInitialized, web3 } = useMoralis();
  const allowFileTypes = [
    'JPEG',
    'JPG',
    'PNG',
    'SVG',
    'MP4',
    'GLB',
    'GLTF',
    'OBJ'
  ];
  const inputRef = React.createRef();
  const zipRef = React.createRef();
  const imageRef = React.createRef();
  const [editContent, setEditContent] = useState(null);
  const [editContentActiveNumber, setEditContentActiveNumber] = useState(null);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [excelFile, setExcelFile] = useState();
  const [zipFile, setZipFile] = useState();
  const [imageFile, setImageFile] = useState();
  const [toggleUploadNft, setToggleUploadNft] = useState(false);
  const [allowMaxSize, setAllowMaxSize] = useState(0);
  const [nftList, setNftList] = useState([]);
  const [properties, setProperties] = useState([]);
  const [levels, setLevels] = useState([]);
  const [stats, setStats] = useState([]);
  const [activeToken, setActiveToken] = useState('ERC721');
  const [contentList, setContentList] = useState([]);
  const [logo, setLogo] = React.useState('');
  const [banner, setBanner] = React.useState('');
  const [display, setDisplay] = React.useState('');
  const [activeImages, setActiveImages] = useState([]);
  const [approvedList, setApprovedList] = useState([]);
  const [name, setName] = useState('');
  const [token, setToken] = useState('');
  const [description, setDescription] = useState('');
  const [nameValid, setNameValid] = useState(true);
  const [tokenValid, setTokenValid] = useState('');
  const [supply, setSupply] = useState('');
  const changeAddons = (content) => {
    setProperties(content?.properties ? content.properties : []);
    setLevels(content?.levels ? content.levels : []);
    setStats(content?.stats ? content.stats : []);
  };

  const removeContentproperty = (i) => {
    let newContentList = [...nftList];
    newContentList.splice(i, 1);
    setContentList(newContentList);
    setNftList(newContentList);
  };

  const addContent = () => {
    let newContentList = [...nftList];
    newContentList.push({
      name: 'NFT ' + (newContentList.length + 1)
    });
    setNftList(newContentList);
  };

  const toggleEditPopup = (i) => {
    setEditContent(contentList[i]);
    setEditContentActiveNumber(i);
    setShowEditPopup(true);
  };

  const csvOptions = [
    {
      name: 'CSV and Image Folder Archive',
      value: 'CSV and Image Folder Archive'
    },
    {
      name: 'One By One NFT Manual Creation',
      value: 'One By One NFT Manual Creation'
    }
  ];

  const [activeCsvType, setActiveCsvType] = useState(
    'CSV and Image Folder Archive'
  );

  const toggleDropdown = (props) => {
    setActiveCsvType(props);
  };

  const NFTUpload = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileSelected = (file) => {
    setFile(null);
    if (!file || file?.length === 0) {
      return;
    }
    let files = file;
    // exit if file is not of specified image type:
    if (
      !(
        files[0]?.type === 'image/png' ||
        files[0]?.type === 'image/jpeg' ||
        files[0]?.type === 'image/jpg' ||
        files[0]?.type === 'image/gif' ||
        files[0]?.type === 'image/svg+xml' ||
        files[0]?.type === 'video/mp4' ||
        files[0]?.type === 'model/obj' ||
        files[0]?.name.split('.').pop() === 'gltf' ||
        files[0]?.name.split('.').pop() === 'glb' ||
        files[0]?.name.split('.').pop() === 'obj'
      )
    ) {
      dispatch(
        toggleGeneralPopup({
          status: 'error',
          message: `Must be of type .png, .jpg, .jpeg, .gif, .svg, .mp4, .gltf, .glb, .obj`,
          textButton: 'OK'
        })
      );
      return;
    }
    if (
      user.attributes.subscriptionLevel === 2 &&
      user.attributes.subscriptionEnd > Date.now() / 1000
    ) {
      if (files[0].size > 250000000) {
        dispatch(
          toggleGeneralPopup({
            status: 'error',
            message: `File must be smaller than 250mb for Level 2 subscription`,
            textButton: 'OK'
          })
        );
        return;
      }
    } else if (
      user.attributes.subscriptionLevel === 1 &&
      user.attributes.subscriptionEnd > Date.now() / 1000
    ) {
      if (files[0].size > 10000000) {
        dispatch(
          toggleGeneralPopup({
            status: 'error',
            message: `File must be smaller than 100mb for Level 1 subscription`,
            textButton: 'OK'
          })
        );
        return;
      }
    }
    if (user.attributes.subscriptionLevel === 0) {
      if (files[0].size > 5000000) {
        dispatch(
          toggleGeneralPopup({
            status: 'error',
            message: `File must be smaller than 50 MB for free subscription`,
            textButton: 'OK'
          })
        );
        return;
      }
    }
    if (user.attributes.subscriptionEnd <= Date.now() / 1000) {
      if (files[0].size > 5000000) {
        dispatch(
          toggleGeneralPopup({
            status: 'error',
            message: `Your subscription has expired. File must be smaller than 50 MB for free subscription`,
            textButton: 'OK'
          })
        );
        return;
      }
    }
    // create url to load image
    const url = URL.createObjectURL(files[0]);
    files[0].url = url;
    // set current file
    setFile(files[0]);
  };

  const handleFileTypeError = (error) => {
    setFile(null);
    dispatch(
      toggleGeneralPopup({
        status: 'error',
        message: `Must be of type .png, .jpg, .jpeg, .gif, .svg, .mp4, .gltf, .glb, .obj`,
        textButton: 'OK'
      })
    );
  };
  const handleFileSizeError = (error) => {
    setFile(null);
    dispatch(
      toggleGeneralPopup({
        status: 'error',
        message: 'Please check the file size and try again',
        textButton: 'OK'
      })
    );
  };

  const handleProfileImage = (file) => {
    if (!(file?.type === 'application/x-zip-compressed')) {
      alert('Must be image of type .png, .jpg, .jpeg');
      return;
    }
    // only take files smaller than 2.5mb for profile image
    if (file.size < 2500000) {
      alert('File must be smaller than 2.5mb');
      return;
    }

    /*   dispatch(openImagePopupCropp({ file, aspect: [1, 1] }));
    if (imagePopupCroppCoordinate) { */
    // here we get the dimensions of the offset in x and y and also the dimensions in percent
    // const moralisFile = new Moralis.File(file.name, file);
    // setUserData({ profileImage: moralisFile });
    /* } */
  };

  const handleLogoUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (
      !(
        files[0]?.type === 'image/png' ||
        files[0]?.type === 'image/jpeg' ||
        files[0]?.type === 'image/jpg' ||
        files[0]?.type === 'image/gif' ||
        files[0]?.type === 'image/svg+xml' ||
        files[0]?.type === 'video/mp4' ||
        files[0]?.type === 'model/obj' ||
        files[0]?.name.split('.').pop() === 'gltf' ||
        files[0]?.name.split('.').pop() === 'glb' ||
        files[0]?.name.split('.').pop() === 'obj'
      )
    ) {
      dispatch(
        toggleGeneralPopup({
          status: 'error',
          message:
            'Must be of type .png, .jpg, .jpeg, .gif, .svg, .mp4, .gltf, .glb, .obj',
          textButton: 'OK',
          size: 'sm'
        })
      );
      return;
    }
    // if file size is larger than 500mb return error
    if (files[0].size > 500000000) {
      dispatch(
        toggleGeneralPopup({
          status: 'error',
          message: 'File must be smaller than 500mb',
          textButton: 'OK',
          size: 'sm'
        })
      );
      return;
    }

    // create url to load image
    const url = URL.createObjectURL(files[0]);
    files[0].url = url;
    // set current file
    setLogo(files[0]);
  };

  const handleBannerSelect = async (e) => {
    const files = Array.from(e.target.files);
    if (
      !(
        files[0]?.type === 'image/png' ||
        files[0]?.type === 'image/jpeg' ||
        files[0]?.type === 'image/jpg' ||
        files[0]?.type === 'image/gif' ||
        files[0]?.type === 'image/svg+xml' ||
        files[0]?.type === 'video/mp4' ||
        files[0]?.type === 'model/obj' ||
        files[0]?.name.split('.').pop() === 'gltf' ||
        files[0]?.name.split('.').pop() === 'glb' ||
        files[0]?.name.split('.').pop() === 'obj'
      )
    ) {
      dispatch(
        toggleGeneralPopup({
          status: 'error',
          message:
            'Must be of type .png, .jpg, .jpeg, .gif, .svg, .mp4, .gltf, .glb, .obj',
          textButton: 'OK',
          size: 'sm'
        })
      );
      return;
    }
    // if file size is larger than 500mb return error
    if (files[0].size > 500000000) {
      dispatch(
        toggleGeneralPopup({
          status: 'error',
          message: 'File must be smaller than 500mb',
          textButton: 'OK',
          size: 'sm'
        })
      );
      return;
    }

    // create url to load image
    const url = URL.createObjectURL(files[0]);
    files[0].url = url;
    // set current file
    setBanner(files[0]);
  };

  const handleDisplaySelect = async (e) => {
    const files = Array.from(e.target.files);
    if (
      !(
        files[0]?.type === 'image/png' ||
        files[0]?.type === 'image/jpeg' ||
        files[0]?.type === 'image/jpg' ||
        files[0]?.type === 'image/gif' ||
        files[0]?.type === 'image/svg+xml' ||
        files[0]?.type === 'video/mp4' ||
        files[0]?.type === 'model/obj' ||
        files[0]?.name.split('.').pop() === 'gltf' ||
        files[0]?.name.split('.').pop() === 'glb' ||
        files[0]?.name.split('.').pop() === 'obj'
      )
    ) {
      dispatch(
        toggleGeneralPopup({
          status: 'error',
          message:
            'Must be of type .png, .jpg, .jpeg, .gif, .svg, .mp4, .gltf, .glb, .obj',
          textButton: 'OK',
          size: 'sm'
        })
      );
      return;
    }
    // if file size is larger than 500mb return error
    if (files[0].size > 500000000) {
      dispatch(
        toggleGeneralPopup({
          status: 'error',
          message: 'File must be smaller than 500mb',
          textButton: 'OK',
          size: 'sm'
        })
      );
      return;
    }

    // create url to load image
    const url = URL.createObjectURL(files[0]);
    files[0].url = url;
    // set current file
    setDisplay(files[0]);
  };

  const handleUpload = async () => {
    if (token === '') {
      setTokenValid(false);
    }
    if (name === '') {
      setNameValid(false);
    }
    if (!file) {
      dispatch(
        toggleGeneralPopup({
          status: 'error',
          message: 'Required fields name or file missing',
          textButton: 'OK',
          size: 'sm'
        })
      );
    }
    if (name === '' || !file || (token === '' && activeToken === 'ERC1155')) {
      return;
    } else {
      let newContentList = [...contentList];

      // TODO: parse properties for null values and prune before minting
      const newContent = {
        amount: activeToken === 'ERC1155' ? token : 1,
        description,
        file,
        name,
        properties: properties.concat(levels, stats),
        levels,
        stats
      };

      newContentList.push(newContent);
      setContentList(newContentList);
      setDescription('');
      setFile(null);
      setToken('');
      setName('');
      setSupply(1);
      setProperties([]);
      setLevels([]);
      setStats([]);
      document.getElementById('file').value = '';
    }
  };

  const addImage = (e, amount) => {
    let id = e.target.value;
    let activeImage;
    let arr = activeImages.slice();
    let newContentList = [...approvedList];

    if (activeToken === 'ERC721') {
      if (e.target.checked) {
        activeImage = approvedList.find((val) => val.id === id);
        // set all content to unselected since only a single one can be selected
        newContentList.map((content) => {
          if (content.id === activeImage.id) {
            content.isSelected = true;
          } else {
            content.isSelected = false;
          }
        });

        setActiveImages([activeImage]);
      } else {
        activeImage = approvedList.find((val) => val.id === id);
        // deselect the selected content
        newContentList.map((content) => {
          if (content.id === activeImage.id) {
            content.isSelected = false;
          }
        });
        setActiveImages([]);
      }
    } else {
      if (e.target.checked) {
        activeImage = approvedList.find((val) => val.id === id);
        activeImage.amount = amount;
        newContentList.map((content) => {
          if (content.id === activeImage.id) {
            content.isSelected = true;
          }
        });
        arr.push(activeImage);
        setActiveImages(arr);
      } else {
        activeImage = approvedList.find((val) => val.id === id);
        // deselect the selected content
        newContentList.map((content) => {
          if (content.id === activeImage.id) {
            content.isSelected = false;
          }
        });
        let filterArr = arr.filter((val) => val.id != id);
        setActiveImages(filterArr);
      }
    }
  };

  const removeContent = (i) => {
    let newContentList = [...contentList];
    newContentList.splice(i, 1);
    setContentList(newContentList);
  };
  return (
    <>
      <div className="new-launch-airdrop-page-inner-content-row new-launch-airdrop-page-inner-content-row-metadata">
        <div className="new-launch-airdrop-page-inner-content-row-card">
          <div className="new-launch-airdrop-page-inner-content-row-card-header">
            <div className="new-launch-airdrop-page-inner-content-row-card-header-heading">
              Free Mint Metadata
            </div>
          </div>
          <div className="new-launch-airdrop-page-inner-content-row-card-body mediaeyeform">
            <div className="mediaeyeform-group">
              <label className="mediaeyeform-label">Collection Name</label>
              <div className="mediaeyeform-group-input airdropname">
                <input type="text" className="mediaeyeform-input" />
              </div>
            </div>
            <div className="mediaeyeform-group">
              <label className="mediaeyeform-label">Description</label>
              <div className="mediaeyetextarea">
                <textarea
                  className="mediaeyetextarea-input"
                  rows="5"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="create-jumbo-mint-page-content-row create-jumbo-mint-page-content-row-appearance">
        <div className="create-jumbo-mint-page-content-row-card">
          <div className="create-jumbo-mint-page-content-row-card-header">
            <div className="create-jumbo-mint-page-content-row-card-header-heading">
              Free Mint Appearance
            </div>
          </div>
          <div className="create-jumbo-mint-page-content-row-card-body">
            <div className="create-jumbo-mint-page-content-row-card-body-colleft create-jumbo-mint-page-content-row-uploadBox">
              <div className="mediaeyeform-group text-center">
                <label className="mediaeyeform-label">Logo Image</label>
              </div>

              <div className="create-jumbo-mint-page-content-row-uploadBox-content">
                <label className="create-jumbo-mint-page-content-row-uploadBox-logo">
                  <div className="create-jumbo-mint-page-content-row-uploadBox-logo-inner">
                    <img
                      src={logo?.url ? logo.url : GetDefaultImages('user')}
                      alt="Logo"
                    />
                    <input
                      type="file"
                      className="create-jumbo-mint-page-content-row-uploadBox-content-inputfile"
                      name="logo"
                      accept="image/png, image/gif, image/jpeg"
                      onChange={(e) => handleLogoUpload(e)}
                    />
                  </div>
                  <div className="create-jumbo-mint-page-content-row-uploadBox-content-action create-jumbo-mint-page-content-row-uploadBox-logo-action">
                    <EditAvatar />
                  </div>
                </label>
              </div>
              <div className="create-jumbo-mint-page-content-row-uploadBox-bottom">
                140 x 140 JPEG, PNG
                <br /> recommended.
              </div>
            </div>
            <div className="create-jumbo-mint-page-content-row-card-body-colmiddle create-jumbo-mint-page-content-row-uploadBox">
              <div className="mediaeyeform-group text-center">
                <label className="mediaeyeform-label">Displayed Image</label>
              </div>

              <div className="create-jumbo-mint-page-content-row-uploadBox-content">
                <label className="create-jumbo-mint-page-content-row-uploadBox-display">
                  <div className="create-jumbo-mint-page-content-row-uploadBox-display-inner">
                    <img
                      src={
                        display?.url ? display.url : GetDefaultImages('display')
                      }
                      alt="Person"
                    />
                    <input
                      type="file"
                      className="create-jumbo-mint-page-content-row-uploadBox-content-inputfile"
                      name="display"
                      accept="image/png, image/gif, image/jpeg"
                      onChange={(e) => handleDisplaySelect(e)}
                    />
                  </div>
                  <div className="create-jumbo-mint-page-content-row-uploadBox-content-action">
                    <EditAvatar />
                  </div>
                </label>
              </div>
              <div className="create-jumbo-mint-page-content-row-uploadBox-bottom">
                280 x 170 JPEG, PNG <br />
                recommended.
              </div>
            </div>

            <div className="create-jumbo-mint-page-content-row-card-body-colright create-jumbo-mint-page-content-row-uploadBox">
              <div className="mediaeyeform-group text-center">
                <label className="mediaeyeform-label">Banner image</label>
              </div>
              <div className="create-jumbo-mint-page-content-row-uploadBox-content">
                <label className="create-jumbo-mint-page-content-row-uploadBox-banner">
                  <div className="create-jumbo-mint-page-content-row-uploadBox-banner-inner">
                    <img
                      src={
                        banner?.url ? banner.url : GetDefaultImages('banner')
                      }
                      alt="Banner"
                    />
                    <input
                      className="create-jumbo-mint-page-content-row-uploadBox-content-inputfile"
                      type="file"
                      name="banner"
                      accept="image/png, image/gif, image/jpeg"
                      onChange={(e) => handleBannerSelect(e)}
                    />
                  </div>
                  <div className="create-jumbo-mint-page-content-row-uploadBox-content-action">
                    <EditAvatar />
                  </div>
                </label>
              </div>
              <div className="create-jumbo-mint-page-content-row-uploadBox-bottom">
                1500 x 240 JPEG, PNG <br />
                Minimum image size
              </div>
            </div>
          </div>
        </div>
      </div>
      {activeAirdropERC721Filter == 'Free Mint (Generative Collection)' ? (
        <div className="new-launch-airdrop-page-inner-mint-generative">
          <div className="create-jumbo-mint-page-content-row-card new-launch-airdrop-page-inner-mint-generative-upload">
            <div className="create-generative-collection-page-content-row-card-header">
              <div className="create-generative-collection-page-content-row-card-header-heading">
                Upload Content
              </div>
            </div>
            <div className="create-generative-collection-page-content-row-card-body">
              <div className="create-generative-collection-page-content-row-uploadcontent-row">
                <div className="create-generative-collection-page-content-row-uploadcontent-innerpart">
                  <label className="create-generative-collection-page-content-row-uploadcontent-innerpart-btn">
                    <input
                      type="file"
                      className="create-generative-collection-page-content-row-uploadcontent-innerpart-btn-input"
                      accept=".xlsx, .dif, .csv, .txt, .prn, .xlw, .xlsx"
                      ref={inputRef}
                      onChange={() => setExcelFile(inputRef.current.files[0])}
                    />
                    <Upload upload={'folder'} />{' '}
                    {excelFile ? excelFile.name : 'Upload Excel file'}
                  </label>
                  {excelFile ? (
                    <div
                      className="create-generative-collection-page-content-row-uploadcontent-innerpart-close"
                      onClick={() => setExcelFile()}
                    >
                      <CloseIcon />
                    </div>
                  ) : null}
                </div>
                <div className="create-generative-collection-page-content-row-uploadcontent-download">
                  Download Excel Sample
                </div>
              </div>

              <div className="create-generative-collection-page-content-row-uploadcontent-row">
                <div className="create-generative-collection-page-content-row-uploadcontent-innerpart">
                  <label className="create-generative-collection-page-content-row-uploadcontent-innerpart-btn">
                    <input
                      type="file"
                      className="create-generative-collection-page-content-row-uploadcontent-innerpart-btn-input"
                      ref={zipRef}
                      onChange={() => setZipFile(zipRef.current.files[0])}
                      accept=".zip, .zipx"
                    />
                    <Upload upload={'folder'} />{' '}
                    {zipFile ? zipFile.name : 'Upload ZIP Folder per layer'}
                  </label>
                  {zipFile ? (
                    <div
                      className="create-generative-collection-page-content-row-uploadcontent-innerpart-close"
                      onClick={() => setZipFile()}
                    >
                      <CloseIcon />
                    </div>
                  ) : null}
                </div>
                <div className="create-generative-collection-page-content-row-uploadcontent-download">
                  View Generative Collection Guide
                </div>
              </div>
            </div>
          </div>
          {airdropType == 'ERC 721' ? (
            <div className="create-jumbo-mint-page-content-row-card  new-launch-airdrop-page-inner-mint-generative-properties">
              <div className="create-generative-collection-page-content-row-card-header">
                <div className="create-generative-collection-page-content-row-card-header-heading">
                  <div className="mediaeyeform-group">
                    <label className="mediaeyeform-label mediaeyeswitch">
                      Upload 1 of 1 NFT
                      <Switch
                        className={`mediaeyeswitch-btn mediaeyeswitch-left mediaeyeswitch-right ${toggleUploadNft ? 'active' : ''}`}
                        checkedIcon={false}
                        uncheckedIcon={false}
                        onChange={() => {
                          setToggleUploadNft(!toggleUploadNft);
                        }}
                        checked={toggleUploadNft}
                        height={21}
                        width={50}
                      />
                    </label>
                  </div>
                </div>
              </div>
              {toggleUploadNft ? (
                <div className="create-generative-collection-page-content-row-card-body">
                  <div className="create-generative-collection-page-content-row-uploadcontent-row">
                    <div className="create-generative-collection-page-content-row-uploadcontent-innerpart">
                      <label className="create-generative-collection-page-content-row-uploadcontent-innerpart-btn">
                        <input
                          type="file"
                          className="create-generative-collection-page-content-row-uploadcontent-innerpart-btn-input"
                          accept="image/png, image/gif, image/jpeg"
                          ref={imageRef}
                          onChange={() =>
                            setImageFile(imageRef.current.files[0])
                          }
                        />
                        <Upload upload={'folder'} />
                        {imageFile ? imageFile.name : 'Upload 1 of 1 NFT Image'}
                      </label>
                    </div>
                    <div className="create-generative-collection-page-content-row-uploadcontent-row-properties">
                      <GenerativeProperties
                        limit={nftList?.length ? nftList?.length : 0}
                      />
                    </div>
                    <button type="button" alt="btn" className="btn btn-gaming">
                      SAVE CHANGES
                    </button>
                    <div className="create-mint-page-main-collection-bottom">
                      {nftList.map((content, i) => {
                        return (
                          <CreateProductMintBlock
                            activeToken={airdropType}
                            content={content}
                            key={i}
                            index={i}
                            addImage={addImage}
                            /* addAmount={addAmount} */
                            removeContent={removeContentproperty}
                            onClickEdit={() => toggleEditPopup(i)}
                          />
                        );
                      })}

                      <div className="mediaeye-collection-card">
                        <Link
                          className="mediaeye-collection-card-inner mediaeye-collection-card-inner-add"
                          onClick={addContent}
                        >
                          <div className="mediaeye-collection-card-inner-add-content">
                            <div className="mediaeye-collection-card-inner-add-content-icon">
                              {nftList.length < 20 ? (
                                <PlusSquare2 />
                              ) : (
                                <div className="info-icon">
                                  <InfoCircle type="outline-white" />
                                </div>
                              )}
                            </div>
                          </div>
                        </Link>
                        <div className="mediaeye-collection-card-description">
                          {nftList.length < 20
                            ? 'Mint New NFT'
                            : 'You have reached the creation limit'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      ) : (
        <div className="create-jumbo-mint-page-content-row-card new-launch-airdrop-page-inner-mint">
          <div className="create-jumbo-mint-page-content-row-card-header">
            <div className="create-jumbo-mint-page-content-row-card-header-heading">
              Upload Content
            </div>
          </div>

          <div className="create-jumbo-mint-page-content-row-card-body mediaeyeform new-launch-airdrop-page-inner-mint-upload">
            <div className="mediaeyeform-group ">
              <SelectSearch
                className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style"
                size="lg"
                options={csvOptions}
                value={activeCsvType}
                onChange={(opt) => toggleDropdown(opt)}
              />
            </div>

            {activeCsvType === 'CSV and Image Folder Archive' ? (
              <>
                <div className="mediaeyeform-group create-jumbo-mint-page-uploadcontent-uploadInput">
                  <label className="mediaeyeform-label" htmlFor="input-file">
                    {file.name ? file.name : 'CSV File'}
                  </label>
                  <label className="mediaeyeform-group-input">
                    <div className="mediaeyeform-input"></div>
                    <input
                      type="file"
                      onChange={NFTUpload}
                      className="mediaeyeform-group-input-hide"
                      id="input-file"
                      accept=".csv"
                    />
                    <button
                      type="button"
                      className="btn btn-info mediaeyeform-group-input-btn"
                    >
                      Upload
                    </button>
                  </label>
                </div>
                <div className="create-jumbo-mint-page-uploadcontent-download">
                  {' '}
                  <u>Download Sample CSV File</u>
                </div>
                <div className="create-jumbo-mint-page-uploadcontent-bottom">
                  <span className="create-jumbo-mint-page-uploadcontent-title">
                    Upload Image Folder Archive
                  </span>
                  <label className="profile-page-content-main-innerpart-content-left-bottom-upload">
                    <input
                      type="file"
                      onChange={(e) => handleProfileImage(e.target.files[0])}
                      placeholder="CSV File"
                      accept=".zip,.rar,.7zip"
                    />
                    <Upload upload={'folder'} />
                    <label style={{ marginRight: '12px' }}>
                      Upload ZIP file
                    </label>
                    <div
                      className="mediaeyeinfo"
                      data-html={true}
                      data-class="mediaeyetooltip"
                      data-tip="Max image size is 50 mb per image"
                    >
                      <InfoCircle type="outline-white" />
                    </div>
                  </label>
                </div>
              </>
            ) : (
              <>
                <div
                  className="create-jumbo-mint-page-uploadcontent-uploadsection"
                  id="mediaeye-create-jumbo-mint-upload-form"
                >
                  <div className="create-jumbo-mint-page-uploadcontent-uploadsection-info">
                    <span>Image, Video, Audio, or 3D Model </span>
                  </div>
                  <div className="create-jumbo-mint-page-uploadcontent-uploadsection-content">
                    <FileUploader
                      multiple={true}
                      onSizeError={handleFileSizeError}
                      onTypeError={handleFileTypeError}
                      handleChange={handleFileSelected}
                      classes="mediaeyefileUploader"
                      children={fileUploaderLayout({
                        allowType: allowFileTypes,
                        maxSize: allowMaxSize,
                        file: file
                      })}
                      name="file"
                      types={allowFileTypes}
                    />

                    <div className="create-jumbo-mint-page-uploadcontent-uploadsection-content-right">
                      <div className="mediaeyeform-group">
                        <label className="mediaeyeform-label">Name*</label>
                        <div className="mediaeyeform-group-input">
                          <input
                            type="text"
                            className="mediaeyeform-input"
                            placeholder="My First NFT "
                          />
                        </div>
                      </div>

                      <div className="mediaeyeform-group">
                        <label className="mediaeyeform-label">Token ID*</label>
                        <div className="mediaeyeform-group-input">
                          <input
                            type="text"
                            placeholder="1940978XT"
                            className="mediaeyeform-input"
                            name="Token ID"
                          />
                        </div>
                      </div>

                      <div className="mediaeyeform-group">
                        <label className="mediaeyeform-label">
                          Description
                        </label>
                        <div className="mediaeyeform-group-input">
                          <div className="mediaeyetextarea">
                            <textarea
                              placeholder="My NFT Description, pattern of narrative development that aims to make vivid a place, object, character, or group. "
                              className="mediaeyetextarea-input"
                              rows="5"
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="create-mint-page-main-collection-content-data-mint">
                    <MintAddon
                      addonsdata={{
                        properties: properties,
                        levels: levels,
                        stats: stats
                      }}
                      changeAddons={changeAddons}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      {activeCsvType !== 'CSV and Image Folder Archive' ? (
        <div className="create-jumbo-mint-page-savebutton">
          <button
            // disabled={!file ? true : false}
            className="btn btn-info"
            onClick={handleUpload}
          >
            Save Changes
          </button>
          <div
            className="mediaeyeinfo"
            data-html={true}
            data-class="mediaeyetooltip"
            data-tip="Save your content in order to  edit and create a new one."
          >
            <InfoCircle type="outline-white" />
          </div>
        </div>
      ) : null}
      <div className="create_mint_product_blocks">
        <div className="create_mint_product_main_blocks">
          {contentList.map((content, i) => {
            return (
              <CreateProductMintBlock
                activeToken={activeToken}
                content={content}
                key={i}
                index={i}
                addImage={addImage}
                /* addAmount={addAmount} */
                removeContent={removeContent}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default FreeMint;
