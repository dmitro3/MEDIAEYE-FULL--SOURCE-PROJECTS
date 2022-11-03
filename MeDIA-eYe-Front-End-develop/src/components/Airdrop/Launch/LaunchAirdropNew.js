import React, { useEffect, useState, useRef } from 'react';
import './LaunchNew.scss';
import { Helmet } from 'react-helmet';
import { Link, useHistory } from 'react-router-dom';
import {
  GetTokenIcon,
  GetNetworkIcon,
  GetDefaultImages,
  fileUploaderLayout
} from '../../../blockchain/functions/Utils';
import Switch from 'react-switch';
import { useMoralis } from 'react-moralis';
import {
  Close,
  InfoCircle,
  EditAvatar,
  Copy,
  EyeSwap,
  Upload,
  PlusSquare2
} from '../../Icons';
import SelectSearch from 'react-select-search';
import ReactTooltip from 'react-tooltip';
import LaunchTasks from '../AirdropTasks/LaunchTasks';
import { useSelector, useDispatch } from 'react-redux';
import { toggleGeneralPopup } from '../../../store/app/appSlice';
import { BuyAirdrop } from '../../../blockchain/functions/Airdrops/BuyAirdrop';
import LaunchBuy from './LaunchBuy';
import FeatureYourNFT from '../../PutOn/PutOnReusables/FeatureYourNFT';
import FEATURETYPE from '../../../utils/featureConstants';
import ConnectSocial from '../../CreateProduct/Addons/ConnectSocial/ConnectSocial';
import WhitelistUser from './WhitelistUser';
import SelectNFTAddress from './SelectNFTAddress';
import SelectTokenAddress from './SelectTokenAddress';
import ChangeChainRequest from '../../../blockchain/functions/ChangeChain/ChangeChainRequest';
import mediaeyespotlight from '../../../assets/img/mediaeyespotlight.png';
import FreeMint from './FreeMint';
import SelectERC721NFTAddress from './SelectERC721NFTAddress';
import EyeSwapPro from '../../Modals/EyeSwap-Open/EyeSwapPro';
import PaymentService from '../../PaymentService/PaymentService';
import MintAddon from '../../CreateProduct/Addons/MintAddon';
import { FileUploader } from 'react-drag-drop-files';
import CreateProductMintBlock from '../../CreateProduct/CreateProductMintBlock/CreateProductMintBlock';
import EditPopup from '../../CreateProduct/MintEditPopup/Popup';
var validate = require('validate.js');
const LaunchAirdropNew = (props) => {
  const [hideAirdropTasks, setHideAirdropTasks] = useState(false);
  const { user, Moralis, isUserUpdating } = useMoralis();
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem('isLogin') ? localStorage.getItem('isLogin') : 'false'
  );
  const dispatch = useDispatch();
  let history = useHistory();
  const [featureInformation, setFeatureInformation] = useState({});
  const activeNetwork = useSelector((state) => state.app.activeNetwork);
  const [activeToken, setActiveToken] = useState(
    activeNetwork === 'BSC' ? 'BNB' : activeNetwork
  );
  const [hideAddManually, setHideAddManually] = useState(false);
  const [hideAccessCode, setHideAccessCode] = useState(false);
  const [hidePromoCodes, setHidePromoCodes] = useState(false);
  const [hideUploadparticipants, setHideUploadparticipants] = useState(false);
  // Collection Images
  const [featured, setFeatured] = useState({});
  const [featuredURL, setFeaturedURL] = useState(null);
  const [toggleFeatureYourNFT, setToggleFeatureYourNFT] = useState(true);

  const [paymentTokensList, setPaymentTokensList] = useState([]);
  // Collection Fields Validate
  const [nameValid, setNameValid] = useState(true);
  const [descriptionValid, setDescriptionValid] = useState(true);
  const [openSeaURLValid, setOpenSeaURLValid] = useState(true);
  const [symbolValid, setSymbolValid] = useState(true);
  const [loading, setLoading] = useState(true);
  // Create Airdrop State
  const [accessibility, setAccessibility] = useState('Public');
  const [activeDays, setActiveDays] = useState(21);
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [airdropType, setAirdropType] = useState('Token');
  const [onetomanyType, setOnetomanyType] = useState('One-One');
  const [airdropLocked, setAirdropLocked] = useState('Locked');
  const [banner, setBanner] = useState({});
  const [bannerURL, setBannerURL] = useState(null);
  const [description, setDescription] = useState('');
  const [embedMedia, setEmbedMedia] = useState('');
  const [tasks, setTasks] = useState({});
  const [logo, setLogo] = useState({});
  const [logoURL, setLogoURL] = useState(null);
  const [properties, setProperties] = useState([]);
  const [levels, setLevels] = useState([]);
  const [stats, setStats] = useState([]);
  const [name, setName] = useState('');
  const [display, setDisplay] = useState();
  const [activePricing, setActivePricing] = useState('Flat-Rate Increases');
  const [activeCsvType, setActiveCsvType] = useState(
    'CSV and Image Folder Archive'
  );
  const [activeImages, setActiveImages] = useState([]);
  const [participantAllocation, setParticipantAllocation] = useState(1);
  // const [SelectNFT, setSelectNFT] = useState(NFTArray);
  const [selectedToken, setSelectedToken] = useState(null);
  const [whitelistDate, setWhitelistDate] = useState(new Date().getTime());
  const [claimDate, setClaimDate] = useState(
    new Date(whitelistDate + Number(activeDays) * 24 * 60 * 60 * 1000).getTime()
  );
  const [unlockableContentList, setUnlockableContentList] = useState([]);
  const [totalAllocation, setTotalAllocation] = useState(0);
  const [file, setFile] = React.useState('');
  const createAirdropForm = useRef();
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
  const [token, setToken] = useState('');
  const [tokenValid, setTokenValid] = useState('');
  const [uploadFormErrors, setUploadFormErrors] = useState([]);
  const [allowMaxSize, setAllowMaxSize] = useState(0);
  const [contentList, setContentList] = useState([]);
  const [approvedList, setApprovedList] = useState([]);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [editContent, setEditContent] = useState(null);
  const [editContentActiveNumber, setEditContentActiveNumber] = useState(null);
  const [closeAirdropTaskDropdown, setCloseAirdropTaskDropdown] =
    useState(false);

  const dropdownManage = () => {
    // alert('ok');
    setCloseAirdropTaskDropdown(true);
  };

  useEffect(() => {
    setActiveToken(
      activeNetwork === process.env.REACT_APP_BSC_CHAIN_NAME
        ? 'BNB'
        : activeNetwork
    );
  }, activeNetwork);

  // Collection Links
  const [links, setLinks] = useState({
    website: '',
    discord: '',
    twitter: '',
    instagram: '',
    medium: '',
    telegram: '',
    twitch: '',
    flickr: '',
    linkedin: '',
    spotify: ''
  });
  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

  const scrollTop = useRef(null);

  const scrollToTop = () => {
    scrollToRef(scrollTop);
  };
  const changeSocialLinks = (link, value) => {
    setLinks({ ...links, [link]: value });
  };
  const changeContent = (i, content) => {
    let arr = contentList.slice();
    if (propertiesIsDuplicate(content?.properties)) {
      dispatch(
        toggleGeneralPopup({
          status: 'error',
          message: `Property values should not be equal!`,
          textButton: 'OK'
        })
      );
      return false;
    }
    arr[i] = content;
    setContentList(arr);
    setShowEditPopup(false);
    setEditContent(null);
  };

  const propertiesIsDuplicate = (data) => {
    let duplicates = [];
    data.forEach((el, i) => {
      data.forEach((element, index) => {
        if (i === index) return null;
        if (
          element.trait_type === el.trait_type &&
          element.value === el.value
        ) {
          if (!duplicates.includes(el)) {
            duplicates.push(el);
          }
        }
      });
    });
    return duplicates?.length > 0 ? true : false;
  };


  const changeName = (e) => {
    if (e.target.value === '') {
      setNameValid(false);
    } else {
      setNameValid(true);
    }
    setName(e.target.value);
  };
  const handleProfileImage = (file) => {
    if (!(file?.type === 'application/x-zip-compressed')) {
      alert('Must be image of type .zip');
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
  const toggleEditPopup = (i) => {
    setEditContent(contentList[i]);
    setEditContentActiveNumber(i);
    setShowEditPopup(true);
  };
  const changeToken = (e) => {
    if (e.target.value === '') {
      setTokenValid(false);
    } else {
      setTokenValid(true);
    }
    setToken(e.target.value);
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
  const changeDescription = (e) => {
    if (e.target.value === '') {
      setDescriptionValid(false);
    } else {
      setDescriptionValid(true);
    }
    setDescription(e.target.value);
  };

  const airdropAccessibility = (type) => {
    setAccessibility(type);
  };

  const [activeAirdropTokenFilter, setActiveAirdropTokenFilter] =
    useState('Select...');
  const [activeAirdropNFTFilter, setActiveAirdropNFTFilter] =
    useState('Select...');
  const [activeAirdropERC721Filter, setActiveAirdropERC721Filter] = useState(
    'Free Mint (Jumbo Mint)'
  );
  const [NFTTypeFilter, setNFTTypeFilter] = useState();

  const airdropTokenFilter = [
    { name: 'Presale', value: 'Presale' },
    { name: 'Campaign', value: 'Campaign' },
    { name: 'Promotion', value: 'Promotion' },
    { name: 'Private Sale', value: 'PrivateSale' },
    { name: 'Pre-IDO', value: 'PreIDO' }
  ];

  const airdropNFTFilter = [
    { name: 'Pre-Mint', value: 'Pre-Mint' },
    { name: 'First Mint', value: 'FirstMint' },
    { name: 'Special Mint', value: 'SpecialMint' },
    { name: 'ICO', value: 'ICO' }
  ];
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

  const airdropERC721Filter = [
    { name: 'Free Mint (Jumbo Mint)', value: 'Free Mint (Jumbo Mint)' },
    {
      name: 'Free Mint (Generative Collection)',
      value: 'Free Mint (Generative Collection)'
    }
  ];

  const airdropNFTTypeFilter = [
    { name: 'ERC 721', value: 'ERC 721' },
    { name: 'ERC 1155', value: 'ERC 1155' }
  ];

  const handleFileSelected = async (e) => {
    console.log(e, "showing here")
    const files = Array.from(e.target.files);
    // exit if file is not of specified image type:
    if (
      !(
        files[0]?.type === 'image/png' ||
        files[0]?.type === 'image/jpeg' ||
        files[0]?.type === 'image/jpg' ||
        files[0]?.type === 'image/gif'
      )
    ) {
      dispatch(
        toggleGeneralPopup({
          status: 'error',
          title: 'Logo image',
          message: 'Must be of type .png, .jpg, .jpeg, .gif',
          textButton: 'OK',
          size: 'sm'
        })
      );
      return;
    }
    // create url to load image
    const url = URL.createObjectURL(files[0]);
    if (e.target.id === 'logo') {
      await setLogo(files[0]);
      setLogoURL(url);
    } else if (e.target.id === 'banner') {
      await setBanner(files[0]);
      setBannerURL(url);
    } else if (e.target.id === 'featured') {
      await setFeatured(files[0]);
      setFeaturedURL(url);
    }
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

  useEffect(() => {
    setIsLogin(localStorage.getItem('isLogin'));
  }, [user]);

  useEffect(() => {
    if (isLogin === 'false') {
      history.replace('/connect-wallet');
    }
  }, []);

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
  const removeContent = (i) => {
    let newContentList = [...contentList];
    newContentList.splice(i, 1);
    setContentList(newContentList);

    let newUnlockableContentList = [...unlockableContentList];
    newUnlockableContentList.splice(i, 1);
    setUnlockableContentList(newUnlockableContentList);
  };

  const payAirdropPressed = async () => {
    let request = {
      accessibility: accessibility,
      activeDays: activeDays,
      activeToken: activeToken,
      additionalInfo: additionalInfo,
      airdropType: airdropType,
      banner: banner,
      description: description,
      embedMedia: embedMedia,
      links: links,
      claimDate: claimDate,
      logo: logo,
      name: name,
      participantAllocation: participantAllocation,
      selectedToken: selectedToken,
      startDate: claimDate,
      tasks: tasks,
      totalAllocation: totalAllocation
    };

    // check if airdrop contract is approved for selected token before proceeding
    await BuyAirdrop(Moralis, request);
  };

  var constraints = {
    'Airdrop name': {
      presence: true
    },
    Description: {
      presence: true
    },
    logo: {
      presence: true
    },
    banner: {
      presence: true
    },
    'Total Airdrop Token Allocation': {
      presence: true
    },
    'Token Allocation Per Participant': {
      presence: true
    },
    'Contract Address': {
      presence: true
    },
    'NFT ID': {
      presence: true
    },
    'Total NFT Allocation': {
      presence: true
    },
    'NFT allocation per participant': {
      presence: true
    }
  };

  const [errorCreateAirdrop, setErrorsCreateAirdrop] = useState([]);

  const createAirdrop = () => {
    scrollToRef(createAirdropForm);
    var form = document.querySelector('#mediaeye-create-airdrop-form');
    var errors = validate(form, constraints);
    setErrorsCreateAirdrop(errors);
    if (errorCreateAirdrop == undefined) {
      dispatch(
        toggleGeneralPopup({
          status: 'success',
          message: 'Thanks for registering, we will get back to you soon!',
          size: 'sm',
          textButton: 'OK'
        })
      );
    }
  };

  const mediaeyenetworks = () => {
    return (
      <>
        <div
          className={`mediaeyetoken-box ${activeNetwork === process.env.REACT_APP_BSC_CHAIN_NAME
            ? 'active'
            : ''
            }`}
        >
          <div
            className="mediaeyetoken-box-inner"
            onClick={async () => {
              if (activeNetwork != process.env.REACT_APP_BSC_CHAIN_NAME) {
                await ChangeChainRequest(process.env.REACT_APP_BSC_CHAIN_NAME);
              }
            }}
          >
            <div className="mediaeyetoken-box-circle"></div>
            <div className="mediaeyetoken-box-icon">
              <img src={GetNetworkIcon('BNB')} alt="BNB" />
            </div>
            <div className="mediaeyetoken-box-content">
              <div className="mediaeyetoken-box-content-name">BSC</div>
            </div>
          </div>
        </div>

        <div
          className={`mediaeyetoken-box ${activeNetwork === 'ETH' ? 'active' : ''
            }`}
        >
          <div
            className="mediaeyetoken-box-inner"
            onClick={async () => {
              if (activeNetwork != 'ETH') {
                await ChangeChainRequest('ETH');
              }
            }}
          >
            <div className="mediaeyetoken-box-circle"></div>
            <div className="mediaeyetoken-box-icon">
              <img src={GetNetworkIcon('ETH')} alt="ETH" />
            </div>
            <div className="mediaeyetoken-box-content">
              <div className="mediaeyetoken-box-content-name">ETH</div>
            </div>
          </div>
        </div>

        <div
          className={`mediaeyetoken-box ${activeNetwork === 'FTM' ? 'active' : ''
            }`}
        >
          <div
            className="mediaeyetoken-box-inner"
            onClick={async () => {
              if (activeNetwork != 'FTM') {
                await ChangeChainRequest('FTM');
              }
            }}
          >
            <div className="mediaeyetoken-box-circle"></div>
            <div className="mediaeyetoken-box-icon">
              <img src={GetNetworkIcon('FTM')} alt="FTM" />
            </div>
            <div className="mediaeyetoken-box-content">
              <div className="mediaeyetoken-box-content-name">FTM</div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const mediaeyelocked = () => {
    return (
      <>
        <div
          className={`mediaeyetokentype-box  ${airdropLocked === 'Locked' ? 'active' : ''
            }`}
        >
          <div
            className="mediaeyetokentype-box-inner"
            onClick={() => {
              setSelectedToken(null);
              setAirdropLocked('Locked');
            }}
          >
            <div className="mediaeyetokentype-box-circle"></div>
            <div className="mediaeyetokentype-box-content">
              <div className="mediaeyetokentype-box-content-name">Locked</div>
            </div>
          </div>
        </div>
        <div
          className={`mediaeyetokentype-box  ${airdropLocked === 'Unlocked' ? 'active' : ''
            }`}
        >
          <div
            className="mediaeyetokentype-box-inner"
            onClick={() => {
              // set to null on type switch
              setSelectedToken(null);
              setAirdropLocked('Unlocked');
            }}
          >
            <div className="mediaeyetokentype-box-circle"></div>
            <div className="mediaeyetokentype-box-content">
              <div className="mediaeyetokentype-box-content-name">Unlocked</div>
            </div>
          </div>
        </div>
        <div
          className={`mediaeyetokentype-box  ${airdropLocked === 'Free Mint' ? 'active' : ''
            }`}
        >
          <div
            className="mediaeyetokentype-box-inner"
            onClick={() => {
              // set to null on type switch
              setSelectedToken(null);
              setAirdropLocked('Free Mint');
            }}
          >
            <div className="mediaeyetokentype-box-circle"></div>
            <div className="mediaeyetokentype-box-content">
              <div className="mediaeyetokentype-box-content-name">
                Free Mint
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const mediaeyelockedtokens = () => {
    return (
      <>
        <div
          className={`mediaeyetokentype-box  ${airdropType === 'Token' ? 'active' : ''
            }`}
        >
          <div
            className="mediaeyetokentype-box-inner"
            onClick={() => {
              // set to null on type switch
              setSelectedToken(null);
              setAirdropType('Token');
            }}
          >
            <div className="mediaeyetokentype-box-circle"></div>
            <div className="mediaeyetokentype-box-content">
              <div className="mediaeyetokentype-box-content-name">ERC 20</div>
            </div>
          </div>
        </div>
        <div
          className={`mediaeyetokentype-box  ${airdropType === 'NFT' ? 'active' : ''
            }`}
        >
          <div
            className="mediaeyetokentype-box-inner"
            onClick={() => {
              // set to null on type switch
              setSelectedToken(null);
              setAirdropType('NFT');
            }}
          >
            <div className="mediaeyetokentype-box-circle"></div>
            <div className="mediaeyetokentype-box-content">
              <div className="mediaeyetokentype-box-content-name">ERC 1155</div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const mediaeyeunlockedtokens = () => {
    return (
      <>
        <div
          className={`mediaeyetokentype-box  ${airdropType === 'Token' ? 'active' : ''
            }`}
        >
          <div
            className="mediaeyetokentype-box-inner"
            onClick={() => {
              // set to null on type switch
              setSelectedToken(null);
              setAirdropType('Token');
            }}
          >
            <div className="mediaeyetokentype-box-circle"></div>
            <div className="mediaeyetokentype-box-content">
              <div className="mediaeyetokentype-box-content-name">ERC 20</div>
            </div>
          </div>
        </div>
        <div
          className={`mediaeyetokentype-box  ${airdropType === 'ERC 721' ? 'active' : ''
            }`}
        >
          <div
            className="mediaeyetokentype-box-inner"
            onClick={() => {
              // set to null on type switch
              setSelectedToken(null);
              setAirdropType('ERC 721');
            }}
          >
            <div className="mediaeyetokentype-box-circle"></div>
            <div className="mediaeyetokentype-box-content">
              <div className="mediaeyetokentype-box-content-name">ERC 721</div>
            </div>
          </div>
        </div>
        <div
          className={`mediaeyetokentype-box  ${airdropType === 'NFT' ? 'active' : ''
            }`}
        >
          <div
            className="mediaeyetokentype-box-inner"
            onClick={() => {
              // set to null on type switch
              setSelectedToken(null);
              setAirdropType('NFT');
            }}
          >
            <div className="mediaeyetokentype-box-circle"></div>
            <div className="mediaeyetokentype-box-content">
              <div className="mediaeyetokentype-box-content-name">ERC 1155</div>
            </div>
          </div>
        </div>
      </>
    );
  };
  const toggleDropdown = (props) => {
    setActiveCsvType(props);
  };
  const handleUpload = (event) => {
    setFile(event.target.files[0]);
  };
  const onetomanyunlockedtokens = () => {
    return (
      <>
        <div
          className={`mediaeyetokentype-box  ${onetomanyType === 'One-One' ? 'active' : ''
            }`}
        >
          <div
            className="mediaeyetokentype-box-inner"
            onClick={() => {
              // set to null on type switch
              setSelectedToken(null);
              setOnetomanyType('One-One');
            }}
          >
            <div className="mediaeyetokentype-box-content">
              <div className="mediaeyetokentype-box-content-name">
                Single Token
              </div>
            </div>
          </div>
        </div>
        <div
          className={`mediaeyetokentype-box  ${onetomanyType === 'Many-One' ? 'active' : ''
            }`}
        >
          <div
            className="mediaeyetokentype-box-inner"
            onClick={() => {
              // set to null on type switch
              setSelectedToken(null);
              setOnetomanyType('Many-One');
            }}
          >
            <div className="mediaeyetokentype-box-content">
              <div className="mediaeyetokentype-box-content-name">
                Multi Token
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const mediaeyefreeminttokens = () => {
    return (
      <>
        <div
          className={`mediaeyetokentype-box  ${airdropType === 'ERC 721' ? 'active' : ''
            }`}
        >
          <div
            className="mediaeyetokentype-box-inner"
            onClick={() => {
              // set to null on type switch
              setSelectedToken(null);
              setAirdropType('ERC 721');
            }}
          >
            <div className="mediaeyetokentype-box-circle"></div>
            <div className="mediaeyetokentype-box-content">
              <div className="mediaeyetokentype-box-content-name">ERC 721</div>
            </div>
          </div>
        </div>
        <div
          className={`mediaeyetokentype-box  ${airdropType === 'NFT' ? 'active' : ''
            }`}
        >
          <div
            className="mediaeyetokentype-box-inner"
            onClick={() => {
              // set to null on type switch
              setSelectedToken(null);
              setAirdropType('NFT');
            }}
          >
            <div className="mediaeyetokentype-box-circle"></div>
            <div className="mediaeyetokentype-box-content">
              <div className="mediaeyetokentype-box-content-name">ERC 1155</div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <Helmet>
        <meta
          property="og:url"
          content={window.location.origin + '/airdrop/launch'}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Create Airdrops in Minutes Programmatically | MEDIA EYE"
        />
        <meta
          property="og:description"
          content="Create and Schedule Aidrops for NFTs and Tokens, Integrate with Socials and Mass Marketing Services, Assign Tasks and Offer Bounties"
        />
        <meta
          property="og:image"
          content={window.location.origin + '/img/meta_tag/create_airdrops.png'}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:domain"
          content="mediaeyenft.com/airdrop/launch"
        />
        <meta
          property="twitter:url"
          content={window.location.origin + '/airdrop/launch'}
        />
        <meta
          name="twitter:title"
          content="Create Airdrops in Minutes Programmatically | MEDIA EYE"
        />
        <meta
          name="twitter:description"
          content="Create and Schedule Aidrops for NFTs and Tokens, Integrate with Socials and Mass Marketing Services, Assign Tasks and Offer Bounties"
        />
        <meta
          name="twitter:image"
          content={window.location.origin + '/img/meta_tag/create_airdrops.png'}
        />
        <title>Create Airdrops in Minutes Programmatically | MEDIA EYE </title>
        <meta
          name="description"
          content="Create and Schedule Aidrops for NFTs and Tokens, Integrate with Socials and Mass Marketing Services, Assign Tasks and Offer Bounties"
        />
      </Helmet>
      <div
        className="new-launch-airdrop-page-inner"
        id="mediaeye-create-airdrop-form"
        ref={createAirdropForm}
      >
        <EditPopup
          showPopup={showEditPopup}
          editContent={editContent}
          activeToken={activeToken}
          changeContent={changeContent}
          editContentActiveNumber={editContentActiveNumber}
          togglePopup={() => {
            setShowEditPopup(!showEditPopup);
            setEditContent(null);
          }}
        />
        <div className="mediaeye-layout-middle">
          <div className="mediaeye-layout-container">
            <div className="mediaeye-layout-container-header">
              <div className="mediaeye-layout-container-header-heading">
                <h2>Launch Airdrop</h2>
                <a
                  className="mediaeye-layout-container-header-heading-link"
                  href="/"
                  target="_blank"
                >
                  &#9654; Tutorial
                </a>
              </div>
            </div>
            <div className="new-launch-airdrop-page-inner-content">
              <div className="new-launch-airdrop-page-inner-content-row new-launch-airdrop-page-inner-content-row-metadata">
                <div className="new-launch-airdrop-page-inner-content-row-card">
                  <div className="new-launch-airdrop-page-inner-content-row-card-header">
                    <div className="new-launch-airdrop-page-inner-content-row-card-header-heading">
                      Airdrop Metadata
                    </div>
                  </div>
                  <div className="new-launch-airdrop-page-inner-content-row-card-body mediaeyeform">
                    <div className="mediaeyeform-group">
                      <label className="mediaeyeform-label" htmlFor="airdropName">
                        Airdrop Name*
                      </label>
                      <div className="mediaeyeform-group-input airdropname">
                        <input
                          id="airdropName"
                          type="text"
                          className={
                            errorCreateAirdrop?.['Airdrop name']
                              ? 'mediaeyeform-input mediaeyeform-group-input-error-border'
                              : 'mediaeyeform-input'
                          }
                          value={name}
                          onChange={(e) => changeName(e)}
                          name="Airdrop name"
                        />
                      </div>
                      {errorCreateAirdrop?.['Airdrop name'] ? (
                        <div className="mediaeyeform-group-input-error-message">
                          {errorCreateAirdrop?.['Airdrop name']}
                        </div>
                      ) : null}
                    </div>
                    <div className="mediaeyeform-group">
                      <label className="mediaeyeform-label">Description*</label>
                      <div className="mediaeyetextarea">
                        <textarea
                          className={
                            errorCreateAirdrop?.Description
                              ? 'mediaeyetextarea-input mediaeyeform-group-input-error-border'
                              : 'mediaeyetextarea-input'
                          }
                          rows="5"
                          onChange={(e) => changeDescription(e)}
                          value={description}
                          name="Description"
                        ></textarea>
                      </div>
                      {errorCreateAirdrop?.Description ? (
                        <div className="mediaeyeform-group-input-error-message">
                          {errorCreateAirdrop?.Description}
                        </div>
                      ) : null}
                    </div>
                    <div className="mediaeyeform-group">
                      <label className="mediaeyeform-label mediaeyeinfo">
                        Embed Links{' '}
                        <span
                          className="mediaeyeinfo-sign"
                          data-class="mediaeyetooltip"
                          data-tip="Go to the media file you want to embed. From the list of Share options, click Embed. From the box that appears, copy the HTML code. Paste the code into Embed Media field. Share from Vimeo, YouTube, GIPHY, SoundCloud, Spotify and more."
                        >
                          <InfoCircle type="outline-white" />
                        </span>{' '}
                      </label>
                      <div className="mediaeyetextarea">
                        <textarea
                          className="mediaeyetextarea-input"
                          rows="5"
                          onChange={(e) => setEmbedMedia(e.target.value)}
                          value={embedMedia}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="new-launch-airdrop-page-inner-content-row new-launch-airdrop-page-inner-content-row-appearance">
                <div className="new-launch-airdrop-page-inner-content-row-card">
                  <div className="new-launch-airdrop-page-inner-content-row-card-header">
                    <div className="new-launch-airdrop-page-inner-content-row-card-header-heading">
                      Appearance
                    </div>
                  </div>
                  <div className="new-launch-airdrop-page-inner-content-row-card-body">
                    <div className="new-launch-airdrop-page-inner-content-row-appearance-image">
                      <div className="new-launch-airdrop-page-inner-content-row-card-body-colleft new-launch-airdrop-page-inner-content-row-uploadBox user-logo">
                        <div className="mediaeyeform-group text-center">
                          <label className="mediaeyeform-label">
                            Logo Image*
                          </label>
                        </div>

                        <div className="new-launch-airdrop-page-inner-content-row-uploadBox-content">
                          <label className="new-launch-airdrop-page-inner-content-row-uploadBox-logo">
                            <div
                              className="new-launch-airdrop-page-inner-content-row-uploadBox-logo-inner"
                              onClick={(event) => {
                                setLogoURL(null);
                                setLogo(null);
                              }}
                            >
                              <img
                                src={
                                  logoURL ? logoURL : GetDefaultImages('logo')
                                }
                                alt="UserLogoImage"
                              />
                              <input
                                type="file"
                                className="new-launch-airdrop-page-inner-content-row-uploadBox-content-inputfile"
                                name="logo"
                                id="logo"
                                accept="image/png, image/gif, image/jpeg"
                                onChange={(e) => handleFileSelected(e)}
                              />
                            </div>
                            <div className="new-launch-airdrop-page-inner-content-row-uploadBox-content-action new-launch-airdrop-page-inner-content-row-uploadBox-logo-action">
                              <EditAvatar />
                            </div>
                          </label>
                        </div>
                        {errorCreateAirdrop?.logo ? (
                          <div className="mediaeyeform-group-input-error-message text-center">
                            {errorCreateAirdrop?.logo}
                          </div>
                        ) : null}
                        <div className="new-launch-airdrop-page-inner-content-row-uploadBox-bottom">
                          140 x 140 JPEG, PNG
                          <br /> recommended.
                        </div>
                      </div>

                      <div className="new-launch-airdrop-page-inner-content-row-card-body-colright new-launch-airdrop-page-inner-content-row-uploadBox user-banner">
                        <div className="mediaeyeform-group text-center">
                          <label className="mediaeyeform-label">
                            Banner Image*
                          </label>
                        </div>
                        <div className="new-launch-airdrop-page-inner-content-row-uploadBox-content">
                          <label className="new-launch-airdrop-page-inner-content-row-uploadBox-banner">
                            <div className="new-launch-airdrop-page-inner-content-row-uploadBox-banner-inner">
                              <img
                                src={
                                  bannerURL
                                    ? bannerURL
                                    : GetDefaultImages('banner')
                                }
                                alt="Banner"
                              />
                              <input
                                className="new-launch-airdrop-page-inner-content-row-uploadBox-content-inputfile"
                                type="file"
                                id="banner"
                                accept="image/png, image/gif, image/jpeg"
                                onChange={(e) => handleFileSelected(e)}
                                name="banner"
                              />
                            </div>
                            <div className="new-launch-airdrop-page-inner-content-row-uploadBox-content-action">
                              <EditAvatar />
                            </div>
                          </label>
                        </div>
                        {errorCreateAirdrop?.banner ? (
                          <div className="mediaeyeform-group-input-error-message text-center">
                            {errorCreateAirdrop?.banner}
                          </div>
                        ) : null}
                        <div className="new-launch-airdrop-page-inner-content-row-uploadBox-bottom">
                          1500 x 240 JPEG, PNG <br />
                          Minimum image size
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="new-launch-airdrop-page-inner-content-row new-launch-airdrop-page-inner-content-row-social">
                <div className="new-launch-airdrop-page-inner-content-row-card">
                  <div className="new-launch-airdrop-page-inner-content-row-card-header">
                    <div className="new-launch-airdrop-page-inner-content-row-card-header-heading">
                      Connect Social Media Accounts
                    </div>
                  </div>
                  <div className="new-launch-airdrop-page-inner-content-row-card-body">
                    <ConnectSocial
                      socialLinks={links}
                      changeSocialLinks={changeSocialLinks}
                    />
                  </div>
                </div>
              </div>
              <div className="new-launch-airdrop-page-inner-content-row-tokentype">
                <div
                  className={`new-launch-airdrop-page-inner-content-row new-launch-airdrop-page-inner-content-row-tokentype-bounties ${airdropLocked == 'Unlocked' && airdropType === 'Token'
                    ? 'unlock-wrap'
                    : null
                    } ${airdropLocked == 'Free Mint' ? 'free-mint-wrap' : null}`}
                >
                  <div className="new-launch-airdrop-page-inner-content-row-card">
                    <div className="new-launch-airdrop-page-inner-content-row-card-header">
                      <div className="new-launch-airdrop-page-inner-content-row-card-header-heading">
                        Airdrop Type and Bounties
                      </div>
                    </div>
                    <div className="new-launch-airdrop-page-inner-content-row-card-body new-launch-airdrop-page-inner-content-row-tokentype-bounties-inner">
                      <div
                        className={`${(airdropLocked == 'Unlocked' &&
                          airdropType === 'Token') ||
                          (airdropLocked == 'Unlocked' &&
                            airdropType === 'NFT') ||
                          (airdropLocked == 'Unlocked' &&
                            airdropType === 'ERC 721')
                          ? 'unlock-type'
                          : null
                          }`}
                      >
                        <div className="mediaeyeform-group">
                          <label className="mediaeyeform-label">
                            Blockchain
                          </label>
                        </div>
                        <div className="mediaeyetoken m-b-30" size={3}>
                          {mediaeyenetworks()}
                        </div>
                        <div className="mediaeyeform-group">
                          <label className="mediaeyeform-label">
                            Airdrop Type
                          </label>
                        </div>
                        <div
                          className="mediaeyetokentype m-b-30 airdrop-type"
                          size={3}
                        >
                          {mediaeyelocked()}
                        </div>
                        {airdropLocked == 'Locked' ? (
                          <div
                            className="mediaeyetokentype m-b-30 airdrop-token"
                            size={3}
                          >
                            {mediaeyelockedtokens()}
                          </div>
                        ) : null}
                        {airdropLocked == 'Unlocked' ? (
                          <>
                            <div
                              className="mediaeyetokentype m-b-30 airdrop-token"
                              size={3}
                            >
                              {mediaeyeunlockedtokens()}
                            </div>
                            <div
                              className="mediaeyetokentype m-b-30 airdrop-type"
                              size={3}
                            >
                              {airdropType === 'Token' || airdropType === 'NFT'
                                ? onetomanyunlockedtokens()
                                : null}
                            </div>
                          </>
                        ) : null}
                        {airdropLocked == 'Free Mint' ? (
                          <div
                            className="mediaeyetokentype m-b-30 airdrop-token"
                            size={3}
                          >
                            {mediaeyefreeminttokens()}
                          </div>
                        ) : null}
                      </div>
                      {airdropType === 'Token' ? (
                        <>
                          <div
                            className={`mediaeyeform-group ${airdropLocked == 'Unlocked' ? 'unlock-type' : null
                              }`}
                          >
                            <label className="mediaeyeform-label mediaeyeinfo">
                              Airdrop Category{' '}
                              <span
                                className="mediaeyeinfo-sign"
                                data-html={true}
                                data-class="mediaeyetooltip"
                                data-tip="<strong>Presale</strong> is a sale held or made before an item is made available for purchase.<br/><strong>Campaign</strong> is an organized course of action to achieve a goal.<br/><strong>Promotion</strong> is publicizing a product, organization, or venture to increase sales or public awareness.<br/><strong>Private Sale</strong> is a sale of tokens to a limited number of early investors.<br/><strong>Pre-IDO</strong> is a tokens offerings before the actual initial DEX offering (IDO) takes place.<br/>"
                              >
                                <InfoCircle type="outline-white" />
                              </span>
                              <ReactTooltip />
                            </label>
                            <div className="launch-airdrop-page-inner-content-row-card-body-selectairdrop">
                              <div className="mediaeyeform-group-input">
                                <SelectSearch
                                  className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style"
                                  size="lg"
                                  options={airdropTokenFilter}
                                  value={activeAirdropTokenFilter}
                                  placeholder={activeAirdropTokenFilter}
                                  onChange={(opt) =>
                                    setActiveAirdropTokenFilter(opt)
                                  }
                                />
                              </div>
                            </div>
                          </div>
                          <SelectTokenAddress
                            activeNetwork={activeNetwork}
                            participantAllocation={participantAllocation}
                            selectedToken={selectedToken}
                            totalAllocation={totalAllocation}
                            setSelectedToken={setSelectedToken}
                            setParticipantAllocation={setParticipantAllocation}
                            setTotalAllocation={setTotalAllocation}
                            errorCreateAirdrop={errorCreateAirdrop}
                            airdropLocked={airdropLocked}
                          />
                        </>
                      ) : null}
                      {airdropType === 'ERC 721' ? (
                        airdropLocked == 'Free Mint' ? (
                          <>
                            <div className="mediaeyeform-group">
                              <label className="mediaeyeform-label">
                                Free Mint Type{' '}
                              </label>
                              <div className="launch-airdrop-page-inner-content-row-card-body-selectairdrop">
                                <div className="mediaeyeform-group-input">
                                  <SelectSearch
                                    className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style"
                                    size="lg"
                                    options={airdropERC721Filter}
                                    value={activeAirdropERC721Filter}
                                    placeholder={activeAirdropERC721Filter}
                                    onChange={(opt) =>
                                      setActiveAirdropERC721Filter(opt)
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="mediaeyeform-group">
                              <label className="mediaeyeform-label">
                                Participants get NFT as reward after completing
                                the bounty tasks (minting gas fees are on the
                                participant)
                              </label>
                            </div>
                            <SelectERC721NFTAddress
                              activeNetwork={activeNetwork}
                              participantAllocation={participantAllocation}
                              selectedToken={selectedToken}
                              totalAllocation={totalAllocation}
                              setSelectedToken={setSelectedToken}
                              setParticipantAllocation={
                                setParticipantAllocation
                              }
                              setTotalAllocation={setTotalAllocation}
                              NFTTypeFilter={NFTTypeFilter}
                              errorCreateAirdrop={errorCreateAirdrop}
                              airdropType={airdropType}
                            />
                          </>
                        ) : (
                          <>
                            <div
                              className={`mediaeyeform-group ${airdropLocked == 'Unlocked'
                                ? 'unlock-type'
                                : null
                                }`}
                            >
                              <label className="mediaeyeform-label mediaeyeinfo">
                                Airdrop Category{' '}
                                <span
                                  className="mediaeyeinfo-sign"
                                  data-html={true}
                                  data-class="mediaeyetooltip"
                                  data-tip="<strong>Standard Mint</strong> is a pre-announced mint, whereby the mint address and information are made public ahead of the mint time.<br/><strong>Genesis Mint</strong> can be dropped for a new collection and could be a partial drop for Whitelisters or registered users.<br/><strong>Free Mint.</strong> The only cost to free mints is the transaction fees. <br/><strong>Stealth Mint</strong> approach releases the minting smart contract at the time of or shortly before the NFT mint goes “live” to the public."
                                >
                                  <InfoCircle type="outline-white" />
                                </span>
                                <ReactTooltip />
                              </label>
                              <div className="launch-airdrop-page-inner-content-row-card-body-selectairdrop">
                                <div className="mediaeyeform-group-input">
                                  <SelectSearch
                                    className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style"
                                    size="lg"
                                    options={airdropNFTFilter}
                                    value={activeAirdropNFTFilter}
                                    placeholder={activeAirdropNFTFilter}
                                    onChange={(opt) =>
                                      setActiveAirdropNFTFilter(opt)
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                            <SelectNFTAddress
                              activeNetwork={activeNetwork}
                              participantAllocation={participantAllocation}
                              selectedToken={selectedToken}
                              totalAllocation={totalAllocation}
                              setSelectedToken={setSelectedToken}
                              setParticipantAllocation={
                                setParticipantAllocation
                              }
                              setTotalAllocation={setTotalAllocation}
                              NFTTypeFilter={NFTTypeFilter}
                              errorCreateAirdrop={errorCreateAirdrop}
                              onetomanyType={onetomanyType}
                              airdropLocked={airdropLocked}
                            />
                          </>
                        )
                      ) : null}
                      {airdropType === 'NFT' ? (
                        airdropLocked == 'Free Mint' ? (
                          <>
                            <div className="mediaeyeform-group">
                              <label className="mediaeyeform-label">
                                Free Mint Type{' '}
                              </label>
                              <div className="launch-airdrop-page-inner-content-row-card-body-selectairdrop">
                                <div className="mediaeyeform-group-input">
                                  <SelectSearch
                                    className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style"
                                    size="lg"
                                    options={airdropERC721Filter}
                                    value={activeAirdropERC721Filter}
                                    placeholder={activeAirdropERC721Filter}
                                    onChange={(opt) =>
                                      setActiveAirdropERC721Filter(opt)
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="mediaeyeform-group">
                              <label className="mediaeyeform-label">
                                Participants get NFT as reward after completing
                                the bounty tasks (minting gas fees are on the
                                participant)
                              </label>
                            </div>
                            <SelectERC721NFTAddress
                              activeNetwork={activeNetwork}
                              participantAllocation={participantAllocation}
                              selectedToken={selectedToken}
                              totalAllocation={totalAllocation}
                              setSelectedToken={setSelectedToken}
                              setParticipantAllocation={
                                setParticipantAllocation
                              }
                              setTotalAllocation={setTotalAllocation}
                              NFTTypeFilter={NFTTypeFilter}
                              errorCreateAirdrop={errorCreateAirdrop}
                              airdropType={airdropType}
                            />
                          </>
                        ) : (
                          <>
                            <div
                              className={`mediaeyeform-group ${airdropLocked == 'Unlocked'
                                ? 'unlock-type'
                                : null
                                }`}
                            >
                              <label className="mediaeyeform-label mediaeyeinfo">
                                Airdrop Category{' '}
                                <span
                                  className="mediaeyeinfo-sign"
                                  data-html={true}
                                  data-class="mediaeyetooltip"
                                  data-tip="<strong>Standard Mint</strong> is a pre-announced mint, whereby the mint address and information are made public ahead of the mint time.<br/><strong>Genesis Mint</strong> can be dropped for a new collection and could be a partial drop for Whitelisters or registered users.<br/><strong>Free Mint.</strong> The only cost to free mints is the transaction fees. <br/><strong>Stealth Mint</strong> approach releases the minting smart contract at the time of or shortly before the NFT mint goes “live” to the public."
                                >
                                  <InfoCircle type="outline-white" />
                                </span>
                                <ReactTooltip />
                              </label>
                              <div className="launch-airdrop-page-inner-content-row-card-body-selectairdrop">
                                <div className="mediaeyeform-group-input">
                                  <SelectSearch
                                    className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style"
                                    size="lg"
                                    options={airdropNFTFilter}
                                    value={activeAirdropNFTFilter}
                                    placeholder={activeAirdropNFTFilter}
                                    onChange={(opt) =>
                                      setActiveAirdropNFTFilter(opt)
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                            <SelectNFTAddress
                              activeNetwork={activeNetwork}
                              participantAllocation={participantAllocation}
                              selectedToken={selectedToken}
                              totalAllocation={totalAllocation}
                              setSelectedToken={setSelectedToken}
                              setParticipantAllocation={
                                setParticipantAllocation
                              }
                              setTotalAllocation={setTotalAllocation}
                              NFTTypeFilter={NFTTypeFilter}
                              errorCreateAirdrop={errorCreateAirdrop}
                              onetomanyType={onetomanyType}
                              airdropLocked={airdropLocked}
                            />
                          </>
                        )
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="new-launch-airdrop-page-inner-content-row-tokentype-whitelisting">
                  <WhitelistUser airdropLocked={airdropLocked} />
                </div>
              </div>
              {airdropLocked == 'Free Mint' ? (
                <FreeMint
                  activeAirdropERC721Filter={activeAirdropERC721Filter}
                  airdropType={airdropType}
                />
              ) : null}
              <div className="new-launch-airdrop-page-inner-content-row-mintmetadata">
                <div className="new-launch-airdrop-page-inner-content-row-mintmetadata-title">
                  Free Mint Metadata
                </div>
                <div className="new-launch-airdrop-page-inner-content-row-mintmetadata-inner m-t-30">
                  <div className="mediaeyeform-group collection-name">
                    <label className="mediaeyeform-label">
                      Collection Name
                    </label>
                    <div className="mediaeyeform-group-input airdropname">
                      <input type="text" className={'mediaeyeform-input'} />
                    </div>
                  </div>
                  <div className="mediaeyeform-group">
                    <label className="mediaeyeform-label">Description</label>
                    <div className="mediaeyeform-group-input">
                      <div className="mediaeyetextarea">
                        <textarea
                          className="mediaeyetextarea-input"
                          rows="3"
                          onMouseDown={() => { }}
                          onMouseUp={() => { }}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="new-launch-airdrop-page-inner-content-row-appearance m-t-30">
                <div className="new-launch-airdrop-page-inner-content-row-appearance-header">
                  <div className="new-launch-airdrop-page-inner-content-row-appearance-header-heading">
                    Appearance
                  </div>
                </div>
                <div className="new-launch-airdrop-page-inner-content-row-appearance-body">
                  <div className="new-launch-airdrop-page-inner-content-row-appearance-body-colleft">
                    <div className="mediaeyeform-group text-center">
                      <label className="mediaeyeform-label">Logo Image</label>
                    </div>

                    <div className="new-launch-airdrop-page-inner-content-row-appearance-content">
                      <label className="new-launch-airdrop-page-inner-content-row-appearance-content-logo">
                        <div className="new-launch-airdrop-page-inner-content-row-appearance-content-logo-inner">
                          <img
                            src={
                              logo?.url ? logo.url : GetDefaultImages('logo')
                            }
                            alt="Logo"
                          />
                          <input
                            type="file"
                            name="logo"
                            accept="image/png, image/gif, image/jpeg"
                            onChange={(e) => handleLogoUpload(e)}
                          />
                        </div>
                        <div className="new-launch-airdrop-page-inner-content-row-appearance-content-logo-action">
                          <EditAvatar />
                        </div>
                      </label>
                    </div>
                    <div className="new-launch-airdrop-page-inner-content-row-appearance-bottom">
                      140 x 140 JPEG, PNG
                      <br /> recommended.
                    </div>
                  </div>
                  <div className="new-launch-airdrop-page-inner-content-row-appearance-body-colmiddle">
                    <div className="mediaeyeform-group text-center">
                      <label className="mediaeyeform-label">
                        Displayed Image
                      </label>
                    </div>

                    <div className="new-launch-airdrop-page-inner-content-row-appearance-content">
                      <label className="new-launch-airdrop-page-inner-content-row-appearance-content-display">
                        <div className="new-launch-airdrop-page-inner-content-row-appearance-content-display-inner">
                          <img
                            src={
                              display?.url
                                ? display.url
                                : GetDefaultImages('display')
                            }
                            alt="Person"
                          />
                          <input
                            type="file"
                            name="display"
                            accept="image/png, image/gif, image/jpeg"
                            onChange={(e) => handleDisplaySelect(e)}
                          />
                        </div>
                        <div className="new-launch-airdrop-page-inner-content-row-appearance-content-display-action">
                          <EditAvatar />
                        </div>
                      </label>
                    </div>
                    <div className="new-launch-airdrop-page-inner-content-row-appearance-bottom">
                      280 x 170 JPEG, PNG <br />
                      recommended.
                    </div>
                  </div>
                  <div className="new-launch-airdrop-page-inner-content-row-appearance-body-colright">
                    <div className="mediaeyeform-group text-center">
                      <label className="mediaeyeform-label">Banner image</label>
                    </div>
                    <div className="new-launch-airdrop-page-inner-content-row-appearance-content">
                      <label className="new-launch-airdrop-page-inner-content-row-appearance-content-banner">
                        <div className="new-launch-airdrop-page-inner-content-row-appearance-content-banner-inner">
                          <img
                            src={
                              banner?.url
                                ? banner.url
                                : GetDefaultImages('banner')
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
                        <div className="new-launch-airdrop-page-inner-content-row-appearance-content-banner-action">
                          <EditAvatar />
                        </div>
                      </label>
                    </div>
                    <div className="new-launch-airdrop-page-inner-content-row-appearance-bottom">
                      1500 x 240 JPEG, PNG <br />
                      Minimum image size
                    </div>
                  </div>
                </div>
              </div>

              <div className="new-launch-airdrop-page-inner-content-row-uploader m-t-30">
                <div className="new-launch-airdrop-page-inner-content-row-uploader-section">
                  <div className="new-launch-airdrop-page-inner-content-row-uploader-section-heading">
                    Upload Content
                  </div>
                  <div className="mediaeyeform-group m-t-20">
                    <SelectSearch
                      className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style"
                      size="lg"
                      options={csvOptions}
                      value={activeCsvType}
                      onChange={(opt) => toggleDropdown(opt)}
                    />
                  </div>
                </div>
                {activeCsvType === 'CSV and Image Folder Archive' ? (
                  <div className="new-launch-airdrop-page-inner-content-row-uploader-csvsection">
                    <div className="mediaeyeform-group m-t-30">
                      <label className="mediaeyeform-group-input">
                        <div
                          className="mediaeyeform-input"
                          htmlFor="upload-private-file"
                        >
                          {file?.name ? file?.name : 'No Chosen File...'}
                        </div>
                        <input
                          type="file"
                          className="mediaeyeform-group-input-hide"
                          id="upload-private-file"
                          accept=".xlsx, .xls, .csv"
                          onChange={handleUpload}
                        />
                        <label
                          className="btn btn-info mediaeyeform-group-input-btn"
                          htmlFor="upload-private-file"
                        >
                          Upload
                        </label>
                      </label>
                    </div>

                    <div className="mediaeye-CreateCampaign-wrapper-card-download">
                      Download Sample CSV File
                    </div>
                    <div className="new-launch-airdrop-page-inner-content-row-uploader-csvsection-bottom">
                      <span className="new-launch-airdrop-page-inner-content-row-uploader-csvsection-bottom-heading">
                        Upload Image Folder Archive
                      </span>
                      <label className="new-launch-airdrop-page-inner-content-row-uploader-csvsection-bottom-upload">
                        <input
                          type="file"
                          onChange={(e) =>
                            handleProfileImage(e.target.files[0])
                          }
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
                  </div>
                ) : (
                  <div>
                    <div className="new-launch-airdrop-page-inner-content-row-uploader-propertyholder">
                      <div className="new-launch-airdrop-page-inner-content-row-uploader-propertyholder-heading m-t-30">
                        <span>Image, Video, Audio, or 3D Model </span>
                      </div>
                      <div className="new-launch-airdrop-page-inner-content-row-uploader-propertyholder-uploadItem">
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
                        {uploadFormErrors?.file ? (
                          <div className="mediaeyeform-group-input-error-message">
                            File must be require
                          </div>
                        ) : null}


                        <div className="new-launch-airdrop-page-inner-content-row-uploader-propertyholder-uploadItem-right">
                          <div className='new-launch-airdrop-page-inner-content-row-uploader-propertyholder-uploadItem-right-top'>
                            <div className="mediaeyeform-group">
                              <label className="mediaeyeform-label">
                                Name*
                              </label>
                              <div className="mediaeyeform-group-input">
                                <input
                                  type="text"
                                  className={
                                    uploadFormErrors?.name
                                      ? 'mediaeyeform-input mediaeyeform-group-input-error-border'
                                      : 'mediaeyeform-input'
                                  }
                                  placeholder="My First NFT "
                                  value={name}
                                  onChange={(e) => changeName(e)}
                                  name="name"
                                />
                              </div>
                              {uploadFormErrors?.name ? (
                                <div className="mediaeyeform-group-input-error-message">
                                  {uploadFormErrors?.name}
                                </div>
                              ) : null}
                            </div>
                            <div className="mediaeyeform-group">
                              <label className="mediaeyeform-label">
                                Token ID*
                              </label>
                              <div className="mediaeyeform-group-input">
                                <input
                                  type="text"
                                  value={token}
                                  onChange={(e) => changeToken(e)}
                                  placeholder="1940978XT"
                                  className={
                                    uploadFormErrors?.['Token ID']
                                      ? 'mediaeyeform-input mediaeyeform-group-input-error-border'
                                      : 'mediaeyeform-input'
                                  }
                                  name="Token ID"
                                />
                              </div>
                              {uploadFormErrors?.['Token ID'] ? (
                                <div className="mediaeyeform-group-input-error-message">
                                  Token ID can't be blank
                                </div>
                              ) : null}
                            </div>
                          </div>
                          <div className="mediaeyeform-group">
                            <label className="mediaeyeform-label">
                              Embed your URL link
                            </label>
                            <div className="mediaeyeform-group-input">
                              <input
                                type="text"
                                placeholder="website.io"
                                className={
                                  uploadFormErrors?.['Embed link']
                                    ? 'mediaeyeform-input mediaeyeform-group-input-error-border'
                                    : 'mediaeyeform-input'
                                }
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
                                  value={description}
                                  className={
                                    !descriptionValid
                                      ? 'mediaeyetextarea-input error'
                                      : 'mediaeyetextarea-input'
                                  }
                                  onChange={(e) => changeDescription(e)}
                                  rows="5"
                                ></textarea>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="new-launch-airdrop-page-inner-content-row-uploader-propertyholder-heading m-b-20">
                        <span>How To Setup NFT Properties</span>
                        <div
                          className="mediaeyeinfo"
                          data-html={true}
                          data-class="mediaeyetooltip"
                          data-tip="<strong>Properties</strong><br/>Text features used sequentially to describe elements or parts of the object or character in the NFTs image (background, head, body, clothing, eyes, etc.).<br/><br/><strong>Levels</strong><br/>Numerical traits used in NFT collections usually represent the strength or impact of a certain trait which can be expressed as a range of values displayed as progress bars (stamina, power, energy, and so on).<br/><br/><strong>Stats</strong><br/>Numerical traits used in NFT collections usually represent the strength, impact, or rank of a given trait which would be rank personage displayed as a numeric value (the number of versions, strength, rank, and so on)."
                        >
                          <InfoCircle type="outline-white" />
                        </div>
                        <ReactTooltip />
                      </div>
                      <MintAddon
                        addonsdata={{
                          properties: properties,
                          levels: levels,
                          stats: stats
                        }}
                      // changeAddons={changeAddons}
                      />
                    </div>
                  </div>
                )}
              </div>
              {activeCsvType !== 'CSV and Image Folder Archive' ?
                <div className='new-launch-airdrop-page-inner-content-row-svaebutton m-t-50'>
                  <button className='btn btn-gaming'>Save Changes</button>
                  <div
                    className="mediaeyeinfo"
                    data-html={true}
                    data-class="mediaeyetooltip"
                    data-tip="Save your content in order to  edit and create a new one."
                  >
                    <InfoCircle type={'outline-white'} /></div>
                </div>
                : null}
              {contentList.length > 0 ? (
                <div className="create-mint-page-main-collection-bottomtitle">
                  <span>
                    You can mint up to 20 NFTs per transaction to save on gas
                    fees.
                  </span>
                </div>
              ) : null}
              <div className="create-mint-page-main-collection-bottom">
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
                      onClickEdit={() => toggleEditPopup(i)}
                    />
                  );
                })}

                {contentList.length > 0 ? (
                  <div
                    className="mediaeye-collection-card"
                    onClick={contentList.length < 20 ? scrollToTop : null}
                  >
                    <Link className="mediaeye-collection-card-inner mediaeye-collection-card-inner-add">
                      <div className="mediaeye-collection-card-inner-add-content">
                        <div className="mediaeye-collection-card-inner-add-content-icon">
                          {contentList.length < 20 ? (
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
                      {contentList.length < 20
                        ? 'Mint New NFT'
                        : 'You have reached the creation limit'}
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="new-launch-airdrop-page-inner-content-row new-launch-airdrop-page-inner-content-row-task">
                <div className="new-launch-airdrop-page-inner-content-row-card">
                  <div className="new-launch-airdrop-page-inner-content-row-card-header">
                    <div className="new-launch-airdrop-page-inner-content-row-card-header-heading new-launch-airdrop-page-inner-content-row-task-gap mediaeyeswitch">
                      <Switch
                        className={`mediaeyeswitch-btn mediaeyeswitch-right ${hideAirdropTasks ? 'active' : ''
                          } `}
                        checkedIcon={false}
                        uncheckedIcon={false}
                        onChange={() => {
                          setHideAirdropTasks(!hideAirdropTasks);
                        }}
                        checked={hideAirdropTasks}
                        height={21}
                        width={50}
                      />
                      Airdrop Tasks
                    </div>
                  </div>
                  <div className="mediaeyeform-group">
                    <label className="mediaeyeform-label">
                      Choose social media tasks to be completed by participants
                      to be able to claim the airdrop rewards.
                    </label>
                  </div>
                  <div className="new-launch-airdrop-page-inner-content-row-card-body">
                    {hideAirdropTasks ? (
                      <LaunchTasks tasksDict={tasks} setTasksDict={setTasks} />
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="new-launch-airdrop-page-inner-content-row new-launch-airdrop-page-inner-content-row-subscribers">
                <div className="new-launch-airdrop-page-inner-content-row-card">
                  <div className="new-launch-airdrop-page-inner-content-row-card-header">
                    <div className="new-launch-airdrop-page-inner-content-row-card-header-heading">
                      Additional Information for Subscribers
                    </div>
                  </div>
                  <div className="mediaeyeform-group">
                    <div className="mediaeyetextarea">
                      <textarea
                        className="mediaeyetextarea-input"
                        rows="5"
                        onChange={(e) => setAdditionalInfo(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div className="new-launch-airdrop-page-inner-content-row-policy">
                <div className="new-launch-airdrop-page-inner-content-row-policy-privacy">
                  <LaunchBuy
                    activeNetwork={activeNetwork}
                    activeDays={activeDays}
                    activeToken={activeToken}
                    setActiveToken={setActiveToken}
                    setActiveDays={setActiveDays}
                    claimDate={claimDate}
                    setClaimDate={setClaimDate}
                    setWhiteListDate={setWhitelistDate}
                    whitelistDate={whitelistDate}
                    payAirdropPressed={payAirdropPressed}
                    Moralis={Moralis}
                  />
                </div>
                <div className="new-launch-airdrop-page-inner-content-row-policy-service">
                  <div className="new-launch-airdrop-page-inner-content-row-policy-service-eyeswap">
                    <div className="new-launch-airdrop-page-inner-content-row-policy-service-eyeswap-header">
                      <EyeSwap type={'green'} />
                      <span>eYeSwap</span>
                    </div>
                    <div className="new-launch-airdrop-page-inner-content-row-policy-service-eyeswap-body">
                      <EyeSwapPro />
                    </div>
                  </div>
                  <div className="new-launch-airdrop-page-inner-content-row-policy-service-payment">
                    <PaymentService />
                  </div>
                </div>
              </div>
            </div>
            <div class="new-launch-airdrop-page-inner-btn m-t-20">
              <button class="btn btn-gaming" onClick={() => createAirdrop()}>
                Launch
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LaunchAirdropNew;
