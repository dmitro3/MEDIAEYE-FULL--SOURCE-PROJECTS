import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import './Jumbomint.scss';
import { useDispatch, useSelector } from 'react-redux';
import CreateProductMintBlock from '../CreateProductMintBlock/CreateProductMintBlock';
import Switch from 'react-switch';
import { useMoralis } from 'react-moralis';
import ChangeChainRequest from '../../../blockchain/functions/ChangeChain/ChangeChainRequest';
import { ChainHexString } from '../../../blockchain/functions/ChangeChain/ChainHexStrings';
import { toggleGeneralPopup } from '../../../store/app/appSlice';
import {
  Close,
  Edit,
  EditAvatar,
  InfoCircle,
  Upload,
  UploadIcon,
  SearchIcon
} from '../../Icons';
import SelectSearch from 'react-select-search';
import MintAddon from '../Addons/MintAddon';
import EditPopup from '../MintEditPopup/Popup';
import { queryCollectionsByChain } from '../../../blockchain/functions/Collection';
import Popup from '../../ProductCard/ProductPopup/Popup';
import {
  GetTokenIcon,
  GetNetworkIcon,
  GetDefaultImages,
  fileUploaderLayout
} from '../../../blockchain/functions/Utils';
import {
  roundString,
  allowOnlyNumber
} from '../../../blockchain/functions/Utils';
import { FileUploader } from 'react-drag-drop-files';
import { queryCharities } from '../../../blockchain/functions/Marketplace';
import charityIcon from '../../../assets/img/charity.png';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ReactTooltip from 'react-tooltip';
var validate = require('validate.js');

const Jumbomint = (props) => {
  const dispatch = useDispatch();
  const darkTheme = useSelector((state) => state.app.darkTheme);
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem('isLogin') ? localStorage.getItem('isLogin') : 'false'
  );
  let history = useHistory();
  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);
  const createJumboMintForm = useRef();
  const jumboMintUploadForm = useRef();
  const [toggleIncreasePrice, setToggleIncreasePrice] = useState(false);
  const [toggleGifPreview, setToggleGifPreview] = useState(false);
  const [logoURL, setLogoURL] = useState(null);
  // show optional content
  const [showTokenIds, setShowTokenIds] = useState(false);
  const [showAddContent, setShowAddContent] = useState(false);
  // chosen blocks arrays
  const [activeImagesContent, setActiveImagesContent] = useState([]);
  const [activeImagesContentIds, setActiveImagesContentIds] = useState([]);
  // buttons
  const activeNetwork = useSelector((state) => state.app.activeNetwork);
  const [priceIncreaseButton, setPriceIncreaseButton] = useState('flat rate');
  // inputs value
  const [name, setName] = useState('');
  const [contentList, setContentList] = useState([]);
  const [description, setDescription] = useState('');
  const [token, setToken] = useState('');
  const [tokenValid, setTokenValid] = useState('');
  const [activePricing, setActivePricing] = useState('Flat-Rate Increases');
  const [activeCsvType, setActiveCsvType] = useState(
    'CSV and Image Folder Archive'
  );
  const { Moralis, user, isInitialized, web3 } = useMoralis();
  const [properties, setProperties] = useState([]);
  const [levels, setLevels] = useState([]);
  const [stats, setStats] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [activeToken, setActiveToken] = useState('ERC721');
  const [collection, setCollection] = useState('none');

  const [dropDate, setDropDate] = useState(new Date().getTime());

  const [file, setFile] = React.useState('');
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
  const [allowMaxSize, setAllowMaxSize] = useState(0);

  const [logo, setLogo] = React.useState('');
  const [banner, setBanner] = React.useState('');
  const [display, setDisplay] = React.useState('');
  const [supply, setSupply] = useState('');
  const [selected, setSelected] = useState(-1);
  const [activeImages, setActiveImages] = useState([]);
  const [approvedList, setApprovedList] = useState([]);
  const [collections, setCollections] = useState([]);
  const [collectionSelectable, setSelectable] = useState(true);
  const [selectedChain, setSelectedChain] = useState(null);
  const [editContent, setEditContent] = useState(null);
  const [editContentActiveNumber, setEditContentActiveNumber] = useState(null);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [supplyValid, setSupplyValid] = useState(true);
  const [featured, setFeatured] = useState({});
  const [nameValid, setNameValid] = useState(true);
  const [featuredURL, setFeaturedURL] = useState(null);
  const [descriptionValid, setDescriptionValid] = useState(true);
  const [valueBNB, setValueBNB] = useState('');
  const [valueBUSD, setValueBUSD] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [activePaymentToken, setActivePaymentToken] = useState(0)
  const [activeTokens, setActiveTokens] = useState([]);
  const [primaryToken, setPrimaryToken] = useState(null);
  const [prices, setPrices] = useState([]);

  const [royaltyPercent, setRoyaltyPercent] = useState('');
  const ROYALTY_MAX = 25;
  const CHARITY_MAX = 10;
  const [showCharity, setShowCharity] = useState(false);
  const [charitySearchCursor, setCharitySearchCursor] = useState(true);
  const [charities, setCharities] = useState([]);
  const [selectedCharityIndex, setSelectedCharityIndex] = useState(0);
  const [charityPercent, setCharityPercent] = useState('');
  const [totalNFT, setTotalNFT] = useState('');
  const [rateIncrease, setRateIncrease] = useState('');
  const [rateSales, setRateSales] = useState('');
  const [charityLable, setCharityLable] = useState('Charity');

  const getPaymentList = () => {
    if (activeNetwork === process.env.REACT_APP_BSC_CHAIN_NAME) {
      return [
        { name: 'BNB', token: ['BNB'], value: '0', primary: 'BNB' },
        { name: 'BUSD', token: ['BUSD'], value: '1', primary: 'BUSD' },
        { name: 'BNB Primary & BUSD', token: ['BNB', 'BUSD'], primary: 'BNB', value: '2' },
        { name: 'BUSD Primary & BNB', token: ['BNB', 'BUSD'], primary: 'BUSD', value: '3' }
      ];
    } else if (activeNetwork === 'ETH') {
      return [
        { name: 'ETH', token: ['ETH'], value: '0', primary: 'ETH' },
        { name: 'USDT', token: ['USDT'], value: '1', primary: 'USDT', },
        { name: 'ETH Primary & USDT', token: ['ETH', 'USDT'], primary: 'ETH', value: '2' },
        { name: 'USDT Primary & ETH', token: ['ETH', 'USDT'], primary: 'USDT', value: '3' }
      ];
    } else if (activeNetwork === 'FTM') {
      return [
        { name: 'FTM', token: ['FTM'], value: '0', primary: 'FTM' },
        { name: 'USDC', token: ['USDC'], value: '1', primary: 'USDC', },
        { name: 'FTM Primary & USDC', token: ['FTM', 'USDC'], primary: 'FTM', value: '2' },
        { name: 'USDC Primary & FTM', token: ['FTM', 'USDC'], primary: 'USDC', value: '3' }
      ];
    } else {
      return []
    }
  }
  const [paymentTokensSelectList, setPaymentTokensSelectList] = useState(() => { return getPaymentList() });

  useEffect(() => {
    setPaymentTokensSelectList(getPaymentList())
  }, [activeNetwork])

  useEffect(() => {
    let tokenRow = paymentTokensSelectList[activePaymentToken];
    let tokens = [];
    for (let i = 0; i < tokenRow?.['token']?.length; i++) {
      tokens.push({ token: tokenRow?.['token'][i], active: true })
    }
    setPrimaryToken(tokenRow?.primary);
    setActiveTokens(tokens);
  }, [activePaymentToken, paymentTokensSelectList])

  const getCharities = async () => {
    const result = [];
    if (
      activeNetwork === process.env.REACT_APP_BSC_CHAIN_NAME ||
      activeNetwork === 'FTM'
    ) {
      const arr = await queryCharities(Moralis);
      arr.map((item) => {
        result.push({
          name: item.attributes.name,
          value: item.attributes.order,
          address: item.attributes.address
        });
      });
      setCharityLable('Charity');
    } else if (activeNetwork === 'ETH') {
      result.push(
        {
          name: 'Cato Institute',
          value: 'Cato Institute',
          address: ''
        },
        {
          name: 'CARE Ceska republika',
          value: 'CARE Ceska republika',
          address: ''
        },
        {
          name: 'Crypto Kids Camp',
          value: 'Crypto Kids Camp',
          address: ''
        },
        {
          name: 'Cambridge Muslim College',
          value: 'Cambridge Muslim College',
          address: ''
        }
      );
      setCharityLable('Charity');
    }
    setCharities(result);
  };
  useEffect(() => {
    if (user && Moralis.isWeb3Enabled()) {
      getCharities();
    }
  }, [user, web3]);

  const handlePrices = async (value, index) => {
    // handle user input to reflect price of primary token (only primary token is editable )
    let newPrices = [...prices];
    newPrices[index] = value;
    setPrices(newPrices);
  };

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

  const changeToken = (e) => {
    if (e.target.value === '') {
      setTokenValid(false);
    } else {
      setTokenValid(true);
    }
    setToken(e.target.value);
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

  var constraints = {
    'Collection-name': {
      presence: true
    },
    'Collection-symbol': {
      presence: true
    },
    'Total-number-of-NFT': {
      presence: true
    }
  };

  const [createJumboMintFormError, setCreateJumboMintFormError] = useState([]);

  const togglePopup = () => {
    scrollToRef(createJumboMintForm);
    var form = document.querySelector('#mediaeye-create-jumbo-mint-form');
    var errors = validate(form, constraints);
    setCreateJumboMintFormError(errors);
    if (errors == undefined) {
      // check if chain is correct and ask to switch if chain is wrong
      if (activeNetwork === selectedChain) {
        setShowPopup(!showPopup);
      } else {
        ChangeChainRequest(selectedChain);
      }
    }
  };

  const removeContent = (i) => {
    let newContentList = [...contentList];
    newContentList.splice(i, 1);
    setContentList(newContentList);
  };

  const toggleEditPopup = (i) => {
    setShowEditPopup(true);
    setEditContent(contentList[i]);
    setEditContentActiveNumber(i);
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
            onClick={async () => { if (activeNetwork != process.env.REACT_APP_BSC_CHAIN_NAME) { await ChangeChainRequest(process.env.REACT_APP_BSC_CHAIN_NAME); } }}>
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
          className={`mediaeyetoken-box ${activeNetwork === 'ETH' ? 'active' : ''}`}>
          <div className="mediaeyetoken-box-inner" onClick={async () => { if (activeNetwork != 'ETH') { await ChangeChainRequest('ETH'); } }}>
            <div className="mediaeyetoken-box-circle"></div>
            <div className="mediaeyetoken-box-icon">
              <img src={GetNetworkIcon('ETH')} alt="ETH" />
            </div>
            <div className="mediaeyetoken-box-content">
              <div className="mediaeyetoken-box-content-name">ETH</div>
            </div>
          </div>
        </div>

        <div className={`mediaeyetoken-box ${activeNetwork === 'FTM' ? 'active' : ''}`}>
          <div className="mediaeyetoken-box-inner" onClick={async () => { if (activeNetwork != 'FTM') { await ChangeChainRequest('FTM'); } }}>
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

  const mediaeyetokens = () => {
    return (
      <>
        <div
          className={`mediaeyetokentype-box  ${activeToken === 'ERC721' ? 'active' : ''}`}>
          <div className="mediaeyetokentype-box-inner" onClick={() => setActiveToken('ERC721')}>
            <div className="mediaeyetokentype-box-circle"></div>
            <div className="mediaeyetokentype-box-content">
              <div className="mediaeyetokentype-box-content-name mediaeyeinfo">ERC-721
                <span
                  className="mediaeyeinfo-sign"
                  data-class="mediaeyetooltip"
                  data-tip="ERC-721 is a global Token standard exhibiting functionalities of developing the Non-Fungible Tokens over the Ethereum blockchain. The ERC-721 contributes to the rarity and uniqueness to the assets designed and developed. The NFTs are developed with unique uint256 token ID attributes that are available globally."
                > <InfoCircle type="outline" />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className={`mediaeyetokentype-box  ${activeToken === 'ERC1155' ? 'active' : ''}`}>
          <div className="mediaeyetokentype-box-inner" onClick={() => setActiveToken('ERC1155')}>
            <div className="mediaeyetokentype-box-circle"></div>
            <div className="mediaeyetokentype-box-content"><div className="mediaeyetokentype-box-content-name mediaeyeinfo">ERC-1155 <span className="mediaeyeinfo-sign" data-class="mediaeyetooltip" data-tip="ERC-1155 is a token standard specifically designed and developed by the Enjin network. ERC-1155 can be used to create both fungible (currencies) and non-fungible (digital cards, pets and in-game skins) assets exclusively on the Ethereum Blockchain Network Architecture along with Transaction bundling which reduces the cost of token development."><InfoCircle type="outline" /></span></div></div>
          </div>
        </div>
      </>
    );
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

  const priceIncreseOption = [
    {
      name: 'Percentage Increases',
      value: 'Percentage Increases'
    },
    {
      name: 'Flat-Rate Increases',
      value: 'Flat-Rate Increases'
    }
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

  const NFTUpload = (event) => {
    setFile(event.target.files[0]);
  };

  const changeAddons = (content) => {
    setProperties(content?.properties ? content.properties : []);
    setLevels(content?.levels ? content.levels : []);
    setStats(content?.stats ? content.stats : []);
  };

  const toggleDropdown = (props) => {
    setActiveCsvType(props);
  };

  var constraints1 = {
    file: {
      presence: true
    },
    name: {
      presence: true
    },
    'Token ID': {
      presence: true
    }
  };

  const [uploadFormErrors, setUploadFormErrors] = useState([]);

  const handleUpload = async () => {
    scrollToRef(jumboMintUploadForm);
    var form = document.querySelector(
      '#mediaeye-create-jumbo-mint-upload-form'
    );
    var uploadFormErrors = validate(form, constraints1);
    setUploadFormErrors(uploadFormErrors);
    if (uploadFormErrors == undefined) {
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
    }
  };

  useEffect(() => {
    setIsLogin(localStorage.getItem('isLogin'));
  }, [user]);

  useEffect(() => {
    if (isLogin === 'false') {
      history.replace('/connect-wallet');
    }
  }, []);

  useEffect(() => {
    if (collectionSelectable) {
      setSelectedChain(activeNetwork);
    }
    if (user) {
      // show user's collections from query
      queryCollectionList();
    }
  }, [activeNetwork, user]);

  const handleActiveToken = async (type) => {
    // deselect all when changing tokens
    let newContentList = [...approvedList];
    newContentList.map((content) => {
      content.isSelected = false;
    });

    setActiveImages([]);
    setContentList([]);
    setActiveToken(type);
  };

  const queryCollectionList = async () => {
    if (user) {
      const params = {
        chain: ChainHexString(activeNetwork),
        userAddress: user.attributes.ethAddress
      };
      const result = await queryCollectionsByChain(Moralis, params);
      setCollections(result);
      if (result.length > 0) {
        // set initial collection
        const initIndex = -1;
        if (initIndex > -1) {
          handleActiveToken(result[initIndex].attributes.collectionType);
          setSelected(initIndex);
          setSelectable(false);
          setCollection(result[initIndex].attributes.collectionAddress);
        }
      }
    }
  };

  const changeContent = (i, content) => {
    let arr = contentList.slice();
    arr[i] = content;
    setContentList(arr);
    setShowEditPopup(false);
  };

  const paymentMethodList = () => {
    if (activeTokens?.length > 0) {
      return (
        <div
          className="mediaeye-paymentmethod"
          size={activeTokens?.length}
        >
          <div className="mediaeye-paymentmethod-inner">
            {
              activeTokens.map((tokenRow, i) => (
                <>
                  {i > 0 ? <div className="mediaeye-paymentmethod-inner-middle"><span>and</span></div> : null}
                  <div className={`mediaeye-paymentmethod-box active  ${primaryToken === tokenRow.token && activeTokens?.length > 1 ? 'makeprimary' : ''}`}>
                    <div className="mediaeye-paymentmethod-box-inner">

                      <div className="mediaeye-paymentmethod-box-btn">
                        <div className="mediaeye-paymentmethod-box-icon">
                          <img src={GetNetworkIcon(tokenRow.token)} alt={tokenRow.token} />
                        </div>
                        <div className="mediaeye-paymentmethod-box-content">
                          <div className="mediaeye-paymentmethod-box-content-name">
                            {tokenRow.token}
                          </div>
                        </div>
                      </div>

                      <label className="mediaeye-paymentmethod-box-price">
                        <input className={'mediaeye-paymentmethod-box-price-input'}
                          disabled={primaryToken === tokenRow.token ? false : true}
                          type="text"
                          placeholder={'Enter price'}
                          value={prices[i]}
                          onChange={(e) => {
                            handlePrices(
                              roundString(
                                allowOnlyNumber(e.target.value),
                                5
                              ),
                              i
                            );
                          }}
                        />
                      </label>
                    </div>
                  </div>
                </>
              ))
            }

          </div>
        </div >
      )
    } else {
      return <></>
    }
  }

  if (
    user?.attributes?.subscriptionLevel < 2 &&
    user?.attributes?.subscriptionEnd < Date.now() / 1000
  ) {
    dispatch(
      toggleGeneralPopup({
        status: 'info',
        message:
          'Level 2 Subscription is required for Jumbo Minting. Jumbo Mint offers unlimited gasless collection minting',
        textButton: 'OK',
        size: 'sm'
      })
    );
    history.push('/create');
    return null;
  } else
    return (
      <>
        <Helmet>
          <meta
            property="og:url"
            content={window.location.origin + '/create/jumbomint'}
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:title"
            content="Jumbo Mint - Unlimited NFT Creator Tool at your Fingertips | MEDIA EYE"
          />
          <meta
            property="og:description"
            content="Create unlimited size NFT collections and save on gas fees. Great solution for mass-marketing, events & ecommerce."
          />
          <meta
            property="og:image"
            content={
              window.location.origin + '/img/meta_tag/CREATE_JUMBOMINT.png'
            }
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            property="twitter:domain"
            content="mediaeyenft.com/create/jumbomint"
          />
          <meta
            property="twitter:url"
            content={window.location.origin + '/create/jumbomint'}
          />
          <meta
            name="twitter:title"
            content="Jumbo Mint - Unlimited NFT Creator Tool at your Fingertips | MEDIA EYE"
          />
          <meta
            name="twitter:description"
            content="Create unlimited size NFT collections and save on gas fees. Great solution for mass-marketing, events & ecommerce."
          />
          <meta
            name="twitter:image"
            content={
              window.location.origin + '/img/meta_tag/CREATE_JUMBOMINT.png'
            }
          />
          <title>
            Jumbo Mint - Unlimited NFT Creator Tool at your Fingertips | MEDIA
            EYE
          </title>
          <meta
            name="description"
            content="Create unlimited size NFT collections and save on gas fees. Great solution for mass-marketing, events & ecommerce."
          />
        </Helmet>
        <div
          className="create-jumbo-mint-page-inner mediaeye-layout-middle"
          id="mediaeye-create-jumbo-mint-form"
        >
          <Popup
            showPopup={showPopup}
            togglePopup={togglePopup}
            activeToken={activeToken}
            activeBlockchain={selectedChain}
            contentList={contentList}
            Moralis={Moralis}
            isLoading={isLoading}
          />
          <EditPopup
            showPopup={showEditPopup}
            editContent={editContent}
            activeToken={activeToken}
            changeContent={changeContent}
            editContentActiveNumber={editContentActiveNumber}
            togglePopup={() => setShowEditPopup(!showEditPopup)}
          />
          <div className="mediaeye-layout-container">
            <div className="mediaeye-layout-container-header">
              <div className="mediaeye-layout-container-header-heading">
                <h2>Jumbo Mint Collection</h2>
                <a
                  className="mediaeye-layout-container-header-heading-link"
                  href="/"
                  target="_blank"
                >
                  &#9654; Tutorial
                </a>
              </div>
            </div>

            <div className="create-jumbo-mint-page-content-row create-jumbo-mint-page-content-row-networks">
              <div className="create-jumbo-mint-page-content-row-card">
                <div className="create-jumbo-mint-page-content-row-card-header">
                  <div className="create-jumbo-mint-page-content-row-card-header-heading">
                    Blockchain Network And Token Type
                  </div>
                </div>
                <div className="create-jumbo-mint-page-content-row-card-body">
                  <div className="mediaeyetoken" size={3}>
                    {mediaeyenetworks()}
                  </div>

                  <div
                    className="mediaeyetokentype create-jumbo-mint-page-content-row-token"
                    size={3}
                  >
                    {mediaeyetokens()}
                  </div>
                </div>
              </div>
            </div>

            <div
              className="create-jumbo-mint-page-content-row create-jumbo-mint-page-content-row-metadata"
              ref={createJumboMintForm}
            >
              <div className="create-jumbo-mint-page-content-row-card">
                <div className="create-jumbo-mint-page-content-row-card-header">
                  <div className="create-jumbo-mint-page-content-row-card-header-heading">
                    Collection Metadata
                  </div>
                </div>
                <div className="create-jumbo-mint-page-content-row-card-body mediaeyeform">
                  <div className="create-jumbo-mint-page-content-row-card-body-colleft">
                    <div className="mediaeyeform-group">
                      <label className="mediaeyeform-label" htmlFor="collectionName">
                        Collection Name*
                      </label>
                      <div className="mediaeyeform-group-input">
                        <input
                          id="collectionName"
                          className={
                            createJumboMintFormError?.['Collection-name']
                              ? 'mediaeyeform-input mediaeyeform-group-input-error-border'
                              : 'mediaeyeform-input'
                          }
                          placeholder="Collection Name"
                          type="text"
                          name="Collection-name"
                        />
                      </div>
                      {createJumboMintFormError?.['Collection-name'] ? (
                        <div className="mediaeyeform-group-input-error-message">
                          {createJumboMintFormError?.['Collection-name']}
                        </div>
                      ) : null}
                    </div>

                    <div className="create-jumbo-mint-page-content-row-metadata-row">
                      {/* <div className="create-jumbo-mint-page-content-row-metadata-row-col"> */}
                      <div className="mediaeyeform-group">
                        <label className="mediaeyeform-label mediaeyeinfo" htmlFor="collectionSymbol">
                          Collection Symbol*{' '}
                          <span
                            className="mediaeyeinfo-sign"
                            data-class="mediaeyetooltip"
                            data-tip="Short meta name for a Collection (max 64 characters)"
                          >
                            <InfoCircle type="outline-white" />
                          </span>{' '}
                        </label>
                        <div className="mediaeyeform-group-input mediaeyeform-group-input-auto">
                          <input
                            id="collectionSymbol"
                            className={
                              createJumboMintFormError?.['Collection-symbol']
                                ? 'mediaeyeform-input mediaeyeform-group-input-error-border'
                                : 'mediaeyeform-input'
                            }
                            name="Collection-symbol"
                            type="text"
                          />
                        </div>
                        {createJumboMintFormError?.['Collection-symbol'] ? (
                          <div className="mediaeyeform-group-input-error-message">
                            {createJumboMintFormError?.['Collection-symbol']}
                          </div>
                        ) : null}
                      </div>

                      <div className="mediaeyeform-group">
                        <label className="mediaeyeform-label mediaeyeinfo" htmlFor="creatorRoyalties">
                          Creator Royalties
                          <span
                            className="mediaeyeinfo-sign"
                            data-class="mediaeyetooltip"
                            data-tip="Royaties payout to be sent to the current wallet address"
                          >
                            <InfoCircle type="outline-white" />
                          </span>{' '}
                        </label>
                        <div className="mediaeyeform-group-input">
                          <input
                            id="creatorRoyalties"
                            type="text"
                            className="mediaeyeform-input"
                            placeholder="5"
                            max={ROYALTY_MAX}
                            value={royaltyPercent}
                            onChange={(e) => {
                              const re = /^[0-9\b]+$/;
                              let value = e.target.value;
                              if (value === '' || re.test(value)) {
                                if (e.target.value > ROYALTY_MAX)
                                  value = ROYALTY_MAX;
                                else value = e.target.value;
                                setRoyaltyPercent(value);
                              }
                            }}
                          />
                          <span
                            onClick={() => setRoyaltyPercent(ROYALTY_MAX)}
                            className="mediaeyeform-group-input-max"
                          >
                            MAX
                          </span>
                        </div>
                      </div>
                      {/* </div> */}
                    </div>
                    <div className="mediaeyeform-group mediaeyeCharitySearch create-jumbo-mint-page-content-row-card-body-colleft-charity">
                      <label className="mediaeyeform-label mediaeyeinfo" htmlFor="charities">
                        {charityLable}{' '}
                        <img
                          src={charityIcon}
                          alt="charity"
                          className="m-l-5"
                        />
                        <span
                          className="mediaeyeinfo-sign"
                          data-class="mediaeyetooltip"
                          data-tip="Charity is coming soon! Donate to approved charities  on-chain and receive a receipt"
                        >
                          <InfoCircle type="outline-white" />
                        </span>{' '}
                      </label>
                      <div className="mediaeyeform-group-input">
                        <div className="mediaeyeform-group-input-addon">
                          <input
                            id="charities"
                            className="mediaeyeform-input"
                            type="text"
                            placeholder="Select Charity"
                            onFocus={() => {
                              setShowCharity(true);
                            }}
                            onBlur={() => {
                              if (!charitySearchCursor) {
                                setShowCharity(false);
                              }
                            }}
                            value={charities[selectedCharityIndex]?.name}
                          />
                          <div className="mediaeyeform-group-input-icon">
                            <SearchIcon type="white" />
                          </div>
                        </div>
                        <div className="mediaeyeform-group-input-addon mediaeyeform-group-input-addon-small">
                          <input
                            className="mediaeyeform-input"
                            type="text"
                            placeholder="0"
                            step={1}
                            min="1"
                            value={charityPercent}
                            onChange={(e) => {
                              const re = /^[0-9\b]+$/;
                              let value = e.target.value;
                              if (value === '' || re.test(value)) {
                                value =
                                  value > CHARITY_MAX ? CHARITY_MAX : value;
                                e.target.value = value;
                                setCharityPercent(value);
                              }
                            }}
                          />
                          <span
                            onClick={() => setCharityPercent(CHARITY_MAX)}
                            className="mediaeyeform-group-input-max"
                          >
                            %
                          </span>
                        </div>
                      </div>
                      {showCharity ? (
                        <div
                          className="mediaeyeCharitySearch-dropdown"
                          onMouseEnter={() => setCharitySearchCursor(true)}
                          onMouseLeave={() => setCharitySearchCursor(false)}
                        >
                          <div className="mediaeyeCharitySearch-dropdown-body">
                            {charities?.length > 0 ? (
                              <>
                                {charities.map((charity, i) => (
                                  <div
                                    onClick={() => {
                                      setSelectedCharityIndex(i);
                                      setShowCharity(false);
                                    }}
                                    className={`mediaeyeCharitySearch-dropdown-list ${selectedCharityIndex === i ? 'active' : ''
                                      }`}
                                  >
                                    {charity?.name}
                                  </div>
                                ))}
                              </>
                            ) : (
                              <div
                                onClick={() => {
                                  setShowCharity(false);
                                }}
                                className="mediaeyeCharitySearch-dropdown-list"
                              >
                                No Charity
                              </div>
                            )}
                          </div>
                        </div>
                      ) : null}
                    </div>
                    <div className="create-jumbo-mint-page-content-row-metadata-row-col create-jumbo-mint-page-content-row-card-body-colleft-nfts">
                      <div className="mediaeyeform-group">
                        <label className="mediaeyeform-label" htmlFor="totalNfts">
                          Total Number of NFT*
                        </label>
                        <div className="mediaeyeform-group-input">
                          <input
                            id="totalNfts"
                            className={
                              createJumboMintFormError?.['Total-number-of-NFT']
                                ? 'mediaeyeform-input mediaeyeform-group-input-error-border'
                                : 'mediaeyeform-input'
                            }
                            placeholder="1000"
                            type="text"
                            name="Total-number-of-NFT"
                            value={totalNFT}
                            onChange={(e) => {
                              const re = /^[0-9\b]+$/;
                              let value = allowOnlyNumber(e.target.value, false);
                              if (value === '' || re.test(value)) {
                                value <= 10000 ? setTotalNFT(value) : setTotalNFT(10000);
                              }
                            }}
                          />
                        </div>
                        {createJumboMintFormError?.['Total-number-of-NFT'] ? (
                          <div className="mediaeyeform-group-input-error-message">
                            Total number of NFT can't be blank
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="create-jumbo-mint-page-content-row-metadata-row-col create-jumbo-mint-page-content-row-card-body-colleft-datepicker">
                      <div className="mediaeyeform-group">
                        <label className="mediaeyeform-label mediaeyeinfo" htmlFor="dropDate">
                          Drop Date
                        </label>
                        <div className="mediaeyeform-group-input mediaeyeform-group-input-auto">
                          <div className="mediaeye-datepicker">
                            <DatePicker
                              id="dropDate"
                              minDate={new Date()}
                              className="mediaeye-datepicker-input mediaeye-datepicker-input-white"
                              withPortal
                              selected={dropDate}
                              onChange={(date) => setDropDate(date)}
                              dateFormat="yyyy-MM-dd"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="create-jumbo-mint-page-content-row-metadata-row-col">
                      <div className="mediaeyeform-group">
                        <label className="mediaeyeform-label mediaeyeswitch">
                          GIF Preview on Collection Page
                          <Switch
                            className={`mediaeyeswitch-btn mediaeyeswitch-left mediaeyeswitch-right ${toggleGifPreview ? 'active' : ''}`}
                            checkedIcon={false}
                            uncheckedIcon={false}
                            onChange={() => {
                              setToggleGifPreview(!toggleGifPreview);
                            }}
                            checked={toggleGifPreview}
                            height={21}
                            width={50}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="create-jumbo-mint-page-content-row-card-body-colright">
                    {/* <div className="mediaeyeform-group">
                      <label className="mediaeyeform-label">
                        Customized URL
                      </label>
                      <div className="mediaeyeform-group-input">
                        <input
                          className="mediaeyeform-input"
                          placeholder="https://mediaeyenft.com/collection/untitled-collection-12345"
                          type="text"
                        />
                      </div>
                    </div> */}

                    <div className="mediaeyeform-group">
                      <label className="mediaeyeform-label" htmlFor="description">Description</label>
                      <div className="mediaeyetextarea">
                        <textarea
                          id="description"
                          className="mediaeyetextarea-input"
                          rows="5"
                          placeholder="My NFT Description, pattern of narrative development that aims to make vivid a place, object, character, or group."
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="create-jumbo-mint-page-content-row create-jumbo-mint-page-content-row-appearance">
              <div className="create-jumbo-mint-page-content-row-card">
                <div className="create-jumbo-mint-page-content-row-card-header">
                  <div className="create-jumbo-mint-page-content-row-card-header-heading">
                    Appearance
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
                            src={
                              logo?.url ? logo.url : GetDefaultImages('logo')
                            }
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
                      <label className="mediaeyeform-label">
                        Displayed Image
                      </label>
                    </div>

                    <div className="create-jumbo-mint-page-content-row-uploadBox-content">
                      <label className="create-jumbo-mint-page-content-row-uploadBox-display">
                        <div className="create-jumbo-mint-page-content-row-uploadBox-display-inner">
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
            <div className="create-jumbo-mint-page-content-row-editContent">
              <div className="create-jumbo-mint-page-content-row create-jumbo-mint-page-content-row-editContent-pricing">
                <div className="create-jumbo-mint-page-content-row-card">
                  <div className="create-jumbo-mint-page-content-row-card-header">
                    <div className="create-jumbo-mint-page-content-row-card-header-heading">
                      Pricing Options
                    </div>
                  </div>
                  <div className="create-jumbo-mint-page-content-row-card-body">
                    <div className="mediaeyeform-group">
                      <label className="mediaeyeform-label">
                        Starting Price and Acceptable Payment Methods
                      </label>
                      <div className="create-jumbo-mint-page-content-row-editContent-pricing-paymentmethod">
                        <SelectSearch
                          placeholder="Select Payment Tokens"
                          className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style create-jumbo-mint-page-content-row-editContent-pricing-paymentmethod-select"
                          options={paymentTokensSelectList}
                          value={activePaymentToken}
                          onChange={(opt) => {
                            setActivePaymentToken(opt)
                          }}
                        />
                        {paymentMethodList()}
                      </div>

                    </div>

                    <div className="mediaeyeform-group">
                      <label className="mediaeyeform-label mediaeyeswitch">
                        Increase Price After Number of Sales
                        <Switch
                          className={`mediaeyeswitch-btn mediaeyeswitch-left mediaeyeswitch-right ${toggleIncreasePrice ? 'active' : ''}`}
                          checkedIcon={false}
                          uncheckedIcon={false}
                          onChange={() => {
                            setToggleIncreasePrice(!toggleIncreasePrice);
                          }}
                          checked={toggleIncreasePrice}
                          height={21}
                          width={50}
                        />
                      </label>
                    </div>

                    {toggleIncreasePrice ? (
                      <>
                        <div className="mediaeyeform-group">
                          <label className="mediaeyeform-label mediaeyeinfo">
                            Sales
                          </label>
                          <div className="mediaeyeform-group-input mediaeyeform-group-input-auto">
                            <input
                              className="mediaeyeform-input"
                              placeholder="100"
                              type="text"
                              value={rateSales}
                              onChange={(e) => {
                                const re = /^[0-9\b]+$/;
                                let value = e.target.value;
                                if (value === '' || re.test(value)) {
                                  value = setRateSales(value);
                                }
                              }}
                            />
                          </div>
                        </div>

                        <div className="mediaeyeform-group">
                          <label className="mediaeyeform-label mediaeyeinfo">
                            Rate Increases
                          </label>
                          <div className="mediaeyeform-group-input mediaeyeform-group-input-auto">
                            <SelectSearch
                              className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style"
                              size="lg"
                              options={priceIncreseOption}
                              value={activePricing}
                              onChange={(opt) => setActivePricing(opt)}
                            />
                            <div className="mediaeyeform-group-input-addon">
                              <input
                                className="mediaeyeform-input"
                                type="text"
                                placeholder="100"
                                value={rateIncrease}
                                onChange={(e) => {
                                  const re = /^[0-9\b]+$/;
                                  let value = e.target.value;
                                  if (value === '' || re.test(value)) {
                                    value = setRateIncrease(value);
                                  }
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>

              <div
                className={`create-jumbo-mint-page-content-row create-jumbo-mint-page-content-row-editContent-uploadcontent ${activeCsvType === 'CSV and Image Folder Archive'
                  ? ''
                  : 'create-jumbo-mint-page-content-row-uploadcontent-fullwidth'
                  }`}
              >
                <div
                  className="create-jumbo-mint-page-content-row-card"
                  ref={jumboMintUploadForm}
                >
                  <div className="create-jumbo-mint-page-content-row-card-header">
                    <div className="create-jumbo-mint-page-content-row-card-header-heading">
                      Upload Content
                    </div>
                  </div>
                  <div className="create-jumbo-mint-page-content-row-card-body mediaeyeform">
                    <div className="mediaeyeform-group">
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
                          <label
                            className="mediaeyeform-label"
                            htmlFor="input-file"
                          >
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
                            {uploadFormErrors?.file ? (
                              <div className="mediaeyeform-group-input-error-message">
                                File must be require
                              </div>
                            ) : null}


                            <div className="create-jumbo-mint-page-uploadcontent-uploadsection-content-right">
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
                          <div className="create-jumbo-mint-page-uploadcontent-uploadsection-properties-section">
                            <div className='create-jumbo-mint-page-uploadcontent-uploadsection-properties-section-header'><span>How To Setup NFT properties</span>
                              <div
                                className="mediaeyeinfo"
                                data-html={true}
                                data-class="mediaeyetooltip"
                                data-tip="<strong>Properties</strong><br/>Text features used sequentially to describe elements or parts of the object or character in the NFTs image (background, head, body, clothing, eyes, etc.).<br/><br/><strong>Levels</strong><br/>Numerical traits used in NFT collections usually represent the strength or impact of a certain trait which can be expressed as a range of values displayed as progress bars (stamina, power, energy, and so on).<br/><br/><strong>Stats</strong><br/>Numerical traits used in NFT collections usually represent the strength, impact, or rank of a given trait which would be rank personage displayed as a numeric value (the number of versions, strength, rank, and so on)."
                              ><InfoCircle type="outline-white" /></div> </div>
                            <ReactTooltip />
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
              </div>
            </div>
            <div
              className={
                activeCsvType === 'CSV and Image Folder Archive'
                  ? 'create-jumbo-mint-page-uploadcontent'
                  : 'create-jumbo-mint-page-uploadcontent fullwidth'
              }
            ></div>
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
                      onClickEdit={() => toggleEditPopup(i)}
                    />
                  );
                })}
              </div>
            </div>
            <div className="create-jumbo-mint-page-mintbtn">
              <button
                type="button"
                className="btn btn-creative"
                onClick={() => togglePopup()}
              >
                Jumbo Mint
              </button>
            </div>
          </div>
        </div>
      </>
    );
};

export default Jumbomint;
