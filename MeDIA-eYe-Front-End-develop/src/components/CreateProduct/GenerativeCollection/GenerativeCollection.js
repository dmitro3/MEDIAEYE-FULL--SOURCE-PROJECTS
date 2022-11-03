import React, { useEffect, useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import ChangeChainRequest from '../../../blockchain/functions/ChangeChain/ChangeChainRequest';
import Switch from 'react-switch';
import { useMoralis } from 'react-moralis';
import { useSelector, useDispatch } from 'react-redux';
import SelectSearch from 'react-select-search';
import CloseIcon from '../../Icons/CloseIcon';
import { toggleGeneralPopup, closeGeneralPopup } from '../../../store/app/appSlice';
import {
  Close,
  InfoCircle,
  Edit,
  EditAvatar,
  Upload,
  PlusSquare2,
  SearchIcon,
  Charity
} from '../../Icons/';

import {
  uploadService,
  baseUrl,
  collectionService,
  ipfsService,
  NFTService
} from '../../../services/api.service';

import {
  roundString,
  allowOnlyNumber,
  GetTokenIcon,
  GetNetworkIcon,
  GetDefaultImages
} from '../../../blockchain/functions/Utils';

import ConnectSocial from '../Addons/ConnectSocial/ConnectSocial';

import './GenerativeCollection.scss';
import CollectionImagePreviewPopup from '../CollectionImagePreviewPopup/CollectionImagePreviewPopup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import GenerativeProperties from '../Addons/GenerativeProperties';
import CreateProductMintBlock from '../CreateProductMintBlock/CreateProductMintBlock';
import { Link, useHistory } from 'react-router-dom';
import { queryCharities } from '../../../blockchain/functions/Marketplace';
import charityIcon from '../../../assets/img/charity.png';
import { useWeb3ExecuteFunction, useChain } from 'react-moralis';
import Factory from '../../../contracts/MediaEyeGeneratorFactory.sol/MediaEyeGeneratorFactory.json';
import { constants } from 'ethers';
import { parseEther } from '@ethersproject/units';
import io from 'socket.io-client';
const socket = io(baseUrl)

var validate = require('validate.js');

const GenerativeCollection = () => {
  const dispatch = useDispatch();
  const [tokenType, setTokenType] = useState('ERC721');
  const activeNetwork = useSelector((state) => state.app.activeNetwork);
  const { Moralis, user, isInitialized, web3 } = useMoralis();
  const [logo, setLogo] = useState('');
  const [showPopup, setShowPopup] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [banner, setBanner] = React.useState('');
  const [display, setDisplay] = useState();
  const [activeImages, setActiveImages] = useState([]);
  const [paymentTokensList, setPaymentTokensList] = useState([]);
  const [approvedList, setApprovedList] = useState([]);
  const [contentList, setContentList] = useState([]);
  const [activeToken, setActiveToken] = useState(null);

  const [activePaymentToken, setActivePaymentToken] = useState(0)
  const [activeTokens, setActiveTokens] = useState([]);
  const [primaryToken, setPrimaryToken] = useState(null);
  const [prices, setPrices] = useState([]);
  const [prices1, setPrices1] = useState([0, 0]);
  const [editContent, setEditContent] = useState(null);
  const [editContentActiveNumber, setEditContentActiveNumber] = useState(null);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [nftList, setNftList] = useState([]);
  const [toggleIncreasePrice, setToggleIncreasePrice] = useState(false);
  const [toggleFor1of1, setToggleFor1of1] = useState(false);
  const [toggleUploadNft, setToggleUploadNft] = useState(false);
  const [excelFile, setExcelFile] = useState();
  const [zipFile, setZipFile] = useState();
  const [imageFile, setImageFile] = useState();
  const [collection, setCollection] = useState();

  const [collectionName, setCollectionName] = useState('');
  const [collectionSymbol, setCollectionSymbol] = useState('');

  const [royalties, setRoyalties] = useState(0);
  const min = 0;
  const max = 15;
  const handleRoyaltiesChange = (event) => {
    const value = Math.max(min, Math.min(max, Number(event.target.value)));
    setRoyalties(value);
  };
  const ROYALTY_MAX = 25;
  const ROYALTY_MIN = 0;
  const [description, setDescription] = useState('');
  const [totalNfts, setTotalNfts] = useState(0);
  const [limit, setLimit] = useState(0);
  const generativeAddNFT = useRef();
  const SALES_MAX = 100;
  const [totalSales, setTotalSales] = useState(0);
  const RATE_MAX = 100;
  const [totalRate, setTotalRate] = useState(0);

  //validation flag

  const [tokenName, setTokenName] = useState();
  const [previewImages, setPreviewImages] = useState();

  // for 1 of 1 NFT
  const [traits, setTraits] = useState({});
  const [nftName, setNftName] = useState('');
  const [editionCount, setEditionCount] = useState(0);
  const [downloadable, setDownloadable] = useState(false);
  const [generatedCount, setGeneratedCount] = useState(0);
  const [metadata, setMetadata] = useState([]);

  const handleTraits = (e) => {
    setTraits(e);
  };

  const handleGeneratedImage = (data) => {
    setGeneratedCount(data.edition);
    setMetadata([...metadata, data.metaData]);
    if (Number(data.edition) == 10) {
      dispatch(closeGeneralPopup());
      let avatars = [];
      for (let i = 0; i < 10; i++) {
        avatars.push({
          img: `${baseUrl}upload/collection/${data.userId}/${data.collectionName}/${i}.png`,
        });
      }

      setPreviewImages(avatars);
      openImagePreviewPopup(true);
      // close loading
    }
  }

  useEffect(() => {
    socket.on('finish-generating', () => {
      console.log("downloadable now")
      setDownloadable(true);
    });
    socket.on('image-generated', handleGeneratedImage);

    return () => {
      socket.disconnect()
    }
  }, []);

  const showImagePreviewPopup = useSelector(
    (state) => state.app.showImagePreviewPopup
  );
  const [activePricing, setActivePricing] = useState('Flat-Rate Increases');
  const inputRef = React.createRef();
  const zipRef = React.createRef();
  const imageRef = React.createRef();
  const [revealOption, setRevealOption] = useState(true);
  const generativeCollectionForm = useRef();
  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

  // navigate
  const history = useHistory();

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
  const revealOptionsArray = [
    {
      name: 'Available (NFTs images are visible to users)',
      value: true
    },
    {
      name: 'Hidden (NFTs images are revealed one by one)',
      value: false
    }
  ];

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

  const [dropDate, setDropDate] = useState(new Date());

  const CHARITY_MAX = 10;
  const [showCharity, setShowCharity] = useState(false);
  const [charitySearchCursor, setCharitySearchCursor] = useState(true);
  const [charities, setCharities] = useState([]);
  const [selectedCharityIndex, setSelectedCharityIndex] = useState(0);
  const [charityPercent, setCharityPercent] = useState(0);
  const [charityLable, setCharityLable] = useState('Charity by GivingBlock');
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
      setCharityLable('Charity by GivingBlock');
    }
    setCharities(result);
  };
  useEffect(() => {
    if (user && Moralis.isWeb3Enabled()) {
      getCharities();
    }
  }, [user, web3]);

  const addImage = (e, amount) => {
    let id = e.target.value;
    let activeImage;
    let arr = activeImages.slice();
    let newContentList = [...approvedList];

    if (activeTokens === 'ERC721') {
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
    let newContentList = [...nftList];
    newContentList.splice(i, 1);
    setContentList(newContentList);
    setNftList(newContentList);

    // let newUnlockableContentList = [...unlockableContentList];
    // newUnlockableContentList.splice(i, 1);
    // setUnlockableContentList(newUnlockableContentList);
  };

  const addMoreContent = () => {
    generativeAddNFT.current.scrollIntoView({ behavior: 'smooth' });
  };

  const addContent = () => {
    let newContentList = [...nftList];
    newContentList.push({
      // name: 'NFT ' + (newContentList.length + 1)
      name: ''
    });
    setNftList(newContentList);
  };

  const toggleEditPopup = (i) => {
    setEditContent(contentList[i]);
    setEditContentActiveNumber(i);
    setShowEditPopup(true);
  };

  let constraints = {
    'Collection-name': {
      presence: true
    },
    'Collection-Symbol': {
      presence: true
    },
    Description: {
      presence: true
    },
    'logo-image': {
      presence: true
    },
    'banner-image': {
      presence: true
    },
    'display-image': {
      presence: true
    },
    'excel file': {
      presence: true
    },
    'zip file': {
      presence: true
    }
  };

  const contractProcessor = useWeb3ExecuteFunction();

  const createNFT = async () => {
    if (!collection) return;
    dispatch(
      toggleGeneralPopup({
        status: 'loading',
        message: 'Processing...',
        size: 'xs',
        autoClose: 'false'
      })
    );
    const res = await ipfsService.upload(collection);
    dispatch(closeGeneralPopup());
    const baseUri = res.baseUri;
    const rareId = res.counts;
    const index = activeTokens.findIndex((token) => token.active);
    const price = prices1[index];
    let token = '';
    if (collection.price.token == 'BNB') {
      token = constants.AddressZero;
    } else {
      token = '0x5Dc16aEEf04514B3176786ecf26EC584139327B0';
    }

    if (!!imageFile) {
    }
    let options = {
      abi: Factory.abi,
      contractAddress: '0x549d0Ba4D5143e9D4511b4C5eFbf9471d0773Cf8',
      functionName: 'deployAvatar',
      params: {
        _id: collection.id,
        _name: collection.name,
        _symbol: collection.symbol,
        _customUri: baseUri,
        _token: token,
        _price: parseEther(String(collection.price.price)),
        _rareTokenId: rareId,
        _rarePrice: parseEther(String(price))
      }
    };
    await contractProcessor.fetch({
      params: options,
      onSuccess: async () => {
        dispatch(closeGeneralPopup());
        history.push(`/account/${user.attributes.ethAddress}`);
      },
      onError: (error) => {
        console.log('error', error);
      }
    });
  };

  // generate button function
  const generate = async () => {
    if (!collectionName) {
      setGenerativeCollectionError({
        ...generativeCollectionError,
        'Collection-name': 'Collection name is required.'
      });
      return;
    }
    if (!collectionSymbol) {
      setGenerativeCollectionError({
        ...generativeCollectionError,
        'Collection-Symbol': 'Collection symbol is required.'
      });
      return;
    }
    setGeneratedCount(0);
    setDownloadable(false);
    dispatch(
      toggleGeneralPopup({
        status: 'loading',
        message: 'Processing...',
        size: 'xs',
        autoClose: 'false'
      })
    );

    let imageFileName = '';

    if (!!imageFile) {
      const formdata = new FormData();
      formdata.append('file', imageFile);
      try {
        const res = await uploadService.uploadImage(formdata);
        imageFileName = res.data.filename;
      } catch (error) {
        return;
      }
    }

    // logo upload
    let logoPathname = '';
    let displayPathname = '';
    let bannerPathname = '';
    if (!!logo) {
      const formData = new FormData();
      formData.append('file', logo);
      try {
        const res = await uploadService.uploadImage(formData);
        logoPathname = `${baseUrl}upload/${res.data.filename}`;
      } catch (error) {
        return;
      }
    }
    if (!!display) {
      const formData = new FormData();
      formData.append('file', display);
      try {
        const res = await uploadService.uploadImage(formData);
        displayPathname = `${baseUrl}upload/${res.data.filename}`;
      } catch (error) {
        return;
      }
    }
    if (!!banner) {
      const formData = new FormData();
      formData.append('file', banner);
      try {
        const res = await uploadService.uploadImage(formData);
        bannerPathname = `${baseUrl}upload/${res.data.filename}`;
      } catch (error) {
        return;
      }
    }

    let excelPathname;
    let formData = new FormData();
    formData.append('excel', excelFile);
    try {
      const res = await uploadService.uploadExcelFile(formData);
      excelPathname = res.data.filename;
    } catch (error) {
      setGenerativeCollectionError({
        ...generativeCollectionError,
        'excel file': error.response.data.message
      });
      return;
    }

    let zipPathname;
    formData = new FormData();
    formData.append('zip', zipFile);
    const res = await uploadService.uploadZipFile(formData);
    zipPathname = res.data.filename;

    const index = activeTokens.findIndex((token) => token.active);
    const token = activeTokens[index].token;
    const price = prices[index];

    const collectionData = {
      name: collectionName,
      symbol: collectionSymbol,
      royalties: royalties,
      description: description,
      logo: logoPathname,
      displayImg: displayPathname,
      totalNfts: Number(totalNfts),
      limit: Number(limit),
      revealOpt: revealOption,
      tokenName: tokenName,
      dropDate: dropDate,
      price: {
        token: token,
        price: price
      },
      zip: zipPathname,
      excel: excelPathname,
      image4one: imageFileName,
      traits4one: traits.properties
    };
    console.log(collectionData)
    try {
      const response = await collectionService.generate(collectionData);
      setCollection(response);
      socket.emit('generate_collection', response.id);
    } catch (error) {
      return;
    }
  };

  const [generativeCollectionError, setGenerativeCollectionError] = useState(
    []
  );

  const openImagePreviewPopup = () => {
    scrollToRef(generativeCollectionForm);
    var form = document.querySelector('#mediaeye-generative-collection-form');
    var errors = validate(form, constraints);
    setGenerativeCollectionError(errors);
    if (errors == undefined) {
      setShowPopup(!showPopup);
    }
  };
  const [toggleGifPrev, setToggleGifPrev] = useState(true);
  const [toggleCharity, setToggleCharity] = useState(true);
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
          className={`mediaeyetokentype-box  ${tokenType === 'ERC721' ? 'active' : ''
            }`}
        >
          <div
            className="mediaeyetokentype-box-inner"
            onClick={() => setTokenType('ERC721')}
          >
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

        <div
          className={`mediaeyetokentype-box  ${tokenType === 'ERC1155' ? 'active' : ''
            }`}
        >
          <div
            className="mediaeyetokentype-box-inner"
            onClick={() => setTokenType('ERC1155')}
          >
            <div className="mediaeyetokentype-box-circle"></div>
            <div className="mediaeyetokentype-box-content">
              <div className="mediaeyetokentype-box-content-name mediaeyeinfo">ERC-1155 <span className="mediaeyeinfo-sign" data-class="mediaeyetooltip" data-tip="ERC-1155 is a token standard specifically designed and developed by the Enjin network. ERC-1155 can be used to create both fungible (currencies) and non-fungible (digital cards, pets and in-game skins) assets exclusively on the Ethereum Blockchain Network Architecture along with Transaction bundling which reduces the cost of token development."><InfoCircle type="outline" /></span></div>
            </div>
          </div>
        </div>

      </>
    );
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
          title: 'File must be smaller than 500mb',
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
          title:
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
          title: 'File must be smaller than 500mb',
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
          title:
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
          title: 'File must be smaller than 500mb',
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

  useEffect(() => {
    if (activeNetwork === 'BSC') {
      setActiveToken('BNB');
      let array = [
        {
          name: 'BNB',
          img: '/img/token/34/BNB.png',
          des: 'Binance',
          price: '$ 120',
          convert: '0.25'
        },
        {
          name: 'BUSD',
          img: '/img/token/34/BUSD.png',
          des: 'BUSD',
          price: '$ 150',
          convert: '125'
        },
        {
          name: 'eYe',
          img: '/img/token/34/EYE.png',
          des: 'MEDIA EYE',
          price: '$ 106.25',
          offer: '15%',
          convert: '14414.66'
        }
      ];
      setPaymentTokensList(array);
    } else if (activeNetwork === 'FTM') {
      let array = [
        {
          name: 'FTM',
          img: '/img/token/34/FTM.png',
          des: 'Fantom',
          price: '$ 106.25',
          convert: '125'
        },
        {
          name: 'USDC',
          img: '/img/token/34/USDC.png',
          des: 'USD Coin',
          price: '$ 106.25',
          convert: '125'
        },
        {
          name: 'eYe',
          img: '/img/token/34/EYE.png',
          des: 'MEDIA EYE',
          price: '$ 106.25',
          convert: '14414.66'
        }
      ];
      setPaymentTokensList(array);
      setActiveToken('FTM');
    } else if (activeNetwork === 'ETH') {
      let array = [
        {
          name: 'ETH',
          img: '/img/token/34/ETH.png',
          des: 'Ethereum',
          price: '$ 106.25',
          convert: '0.25'
        },
        {
          name: 'USDT',
          img: '/img/token/34/USDT.png',
          des: 'Tether',
          price: '$ 120,25',
          convert: '125'
        },
        {
          name: 'eYe',
          img: '/img/token/34/EYE.png',
          des: 'MEDIA EYE',
          price: '$ 106.25',
          convert: '14414.66'
        }
      ];
      setPaymentTokensList(array);
      setActiveToken('ETH');
    }
  }, [activeNetwork]);



  const handlePrices = async (value, index) => {
    // handle user input to reflect price of primary token (only primary token is editable )
    let newPrices = [...prices];
    newPrices[index] = value;
    setPrices(newPrices);
  };

  const handlePrices1 = async (value, index) => {
    // handle user input to reflect price of primary token (only primary token is editable )
    let newPrices = [...prices1];
    newPrices[index] = value;
    setPrices1(newPrices);
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



  const changeSocialLinks = (link, value) => {
    setLinks({ ...links, [link]: value });
  };
  return (
    <div
      className="create-generative-collection-page-inner mediaeye-layout-middle"
      id="mediaeye-generative-collection-form"
    >
      <Helmet>
        <meta
          property="og:url"
          content={window.location.origin + '/create/generative/collection'}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="NFT Generative Collections Creator Services. No coding skills requered | MEDIA EYE"
        />
        <meta
          property="og:description"
          content="Create your own unique generative NFT collections with properties and rarity score."
        />
        <meta
          property="og:image"
          content={
            window.location.origin +
            '/img/meta_tag/CREATE_GENERATIVE_COLLECTIONS.png'
          }
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:domain"
          content="mediaeyenft.com/create/generative/collection"
        />
        <meta
          property="twitter:url"
          content={window.location.origin + '/create/generative/collection'}
        />
        <meta
          name="twitter:title"
          content="NFT Generative Collections Creator Services. No coding skills requered | MEDIA EYE"
        />
        <meta
          name="twitter:description"
          content="Create your own unique generative NFT collections with properties and rarity score."
        />
        <meta
          name="twitter:image"
          content={
            window.location.origin +
            '/img/meta_tag/CREATE_GENERATIVE_COLLECTIONS.png'
          }
        />
        <title>
          NFT Generative Collections Creator Services. No coding skills requered
          | MEDIA EYE
        </title>
        <meta
          name="description"
          content="Create your own unique generative NFT collections with properties and rarity score."
        />
      </Helmet>
      {showPopup ? (
        <CollectionImagePreviewPopup
          showPopup={showPopup}
          togglePopup={openImagePreviewPopup}
          images={previewImages}
          createNFT={createNFT}
          downloadable={downloadable}
          collection={collection}
          generatedCount={Number(generatedCount)}
          totalNfts={Number(totalNfts)}
        />
      ) : null}
      <div className="mediaeye-layout-container">
        <div className="mediaeye-layout-container-header">
          <div className="mediaeye-layout-container-header-heading">
            <h2>Mint Generative Collection</h2>
            <a
              className="mediaeye-layout-container-header-heading-link"
              href="/"
              target="_blank"
            >
              &#9654; Tutorial
            </a>
          </div>
        </div>

        <div className="create-generative-collection-page-content">
          <div className="create-generative-collection-page-content-row create-generative-collection-page-content-row-networks">
            <div className="create-generative-collection-page-content-row-card">
              <div className="create-generative-collection-page-content-row-card-header">
                <div className="create-generative-collection-page-content-row-card-header-heading">
                  Blockchain Network And Token Type
                </div>
              </div>
              <div
                className="create-generative-collection-page-content-row-card-body"
                style={{ maxWidth: '550px' }}
              >
                <div className="mediaeyetoken" size={3}>
                  {mediaeyenetworks()}
                </div>

                <div
                  className="mediaeyetokentype create-generative-collection-page-content-row-token"
                  size={3}
                >
                  {mediaeyetokens()}
                </div>
              </div>
            </div>
          </div>

          <div
            className="create-generative-collection-page-content-row create-generative-collection-page-content-row-metadata"
            ref={generativeCollectionForm}
          >
            <div className="create-generative-collection-page-content-row-card">
              <div className="create-generative-collection-page-content-row-card-header">
                <div className="create-generative-collection-page-content-row-card-header-heading">
                  Collection Metadata
                </div>
              </div>
              <div className="create-generative-collection-page-content-row-card-body mediaeyeform">
                <div className="create-generative-collection-page-content-row-card-body-colleft">
                  <div className="mediaeyeform-group">
                    <label className="mediaeyeform-label" htmlFor="collectionName">
                      Collection Name*
                    </label>
                    <div className="mediaeyeform-group-input">
                      <input
                        id="collectionName"
                        className={
                          generativeCollectionError?.[`Collection-name`]
                            ? 'mediaeyeform-input mediaeyeform-group-input-error-border'
                            : 'mediaeyeform-input'
                        }
                        placeholder="Collection Name"
                        type="text"
                        name="Collection-name"
                        value={collectionName}
                        onChange={(e) => setCollectionName(e.target.value)}
                      />
                    </div>
                    {generativeCollectionError?.[`Collection-name`] ? (
                      <div className="mediaeyeform-group-input-error-message">
                        {generativeCollectionError?.[`Collection-name`]}
                      </div>
                    ) : null}
                  </div>
                  <div className="create-generative-collection-page-content-row-card-body-colleft-row2">
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
                      <div className="mediaeyeform-group-input">
                        <input
                          id="collectionSymbol"
                          className={
                            generativeCollectionError?.[`Collection-Symbol`]
                              ? 'mediaeyeform-input mediaeyeform-group-input-error-border'
                              : 'mediaeyeform-input'
                          }
                          type="text"
                          name="Collection-Symbol"
                          value={collectionSymbol}
                          onChange={(e) => setCollectionSymbol(e.target.value)}
                        />
                      </div>
                      {generativeCollectionError?.[`Collection-Symbol`] ? (
                        <div className="mediaeyeform-group-input-error-message">
                          {generativeCollectionError?.[`Collection-Symbol`]}
                        </div>
                      ) : null}
                    </div>
                    <div className="mediaeyeform-group">
                      <label className="mediaeyeform-label mediaeyeinfo" htmlFor="royalties">
                        Creator Royalties{' '}
                        <span
                          className="mediaeyeinfo-sign"
                          data-class="mediaeyetooltip"
                          data-tip="
                          Royalties to be sent to Creator’s wallet address. 
                          MEDIA EYE Supports the EIP-2981 Standard.
                          Standard allows blockchain contracts to signal a royalty amount to be paid to the NFT creator every time the NFT is re-sold even if it was listed on 3rd party marketplace (not MEDIA EYE Marketplace).                          
                          "
                        >
                          <InfoCircle type="outline-white" />
                        </span>{' '}
                      </label>
                      <div className="mediaeyeform-group-input">
                        <input
                          id="royalties"
                          value={royalties}
                          // onChange={(e) => setRoyalties(e.target.value)}
                          // onChange={handleRoyaltiesChange}
                          className="mediaeyeform-input"
                          type="text"
                          placeholder="0.00"
                          min={ROYALTY_MIN}
                          max={ROYALTY_MAX}
                          onChange={(e) => {
                            const re = /^[0-9\b]+$/;
                            let value = e.target.value;
                            if (value === '' || re.test(value)) {
                              if (e.target.value > ROYALTY_MAX)
                                value = ROYALTY_MAX;
                              else value = e.target.value;
                              setRoyalties(value);
                            }
                          }}
                        />
                        <span
                          className="mediaeyeform-group-input-max"
                          onClick={() => setRoyalties(ROYALTY_MAX)}
                        >
                          MAX
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mediaeyeform-group mediaeyeCharitySearch">
                    <label className="mediaeyeform-label mediaeyeinfo" htmlFor="charityLabel">
                      {charityLable}{' '}
                      <img src={charityIcon} alt="charity" className="m-l-5" />
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
                          id="charityLabel"
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
                          id="charityLabel"
                          className="mediaeyeform-input"
                          type="text"
                          placeholder="0"
                          pattern="[0-9]*"
                          step={1}
                          min="1"
                          value={charityPercent}
                          onChange={(e) => {
                            const re = /^[0-9\b]+$/;
                            let value = e.target.value;
                            if (value === '' || re.test(value)) {
                              value = value > CHARITY_MAX ? CHARITY_MAX : value;
                              e.target.value = value;
                              setCharityPercent(value);
                            }
                          }}
                        />
                        <span
                          onClick={() => setCharityPercent(CHARITY_MAX)}
                          className="mediaeyeform-group-input-max"
                        >
                          MAX %
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
                </div>

                <div className="create-generative-collection-page-content-row-card-body-colright">
                  {/* <div className="mediaeyeform-group">
                    <label className="mediaeyeform-label">Customized URL</label>
                    <div className="mediaeyeform-group-input">
                      <input
                        value={customUrl}
                        onChange={(e) => setCustomUrl(e.target.value)}
                        className="mediaeyeform-input"
                        placeholder="https://mediaeyenft.com/collection/untitled-collection-12345"
                        type="text"
                      />
                    </div>
                  </div> */}
                  <div className="mediaeyeform-group">
                    <label className="mediaeyeform-label" htmlFor="descriptionCollection">Description*</label>
                    <div className="mediaeyetextarea">
                      <textarea
                        id="descriptionCollection"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className={
                          generativeCollectionError?.Description
                            ? 'mediaeyetextarea-input mediaeyeform-group-input-error-border'
                            : 'mediaeyetextarea-input'
                        }
                        rows="5"
                        placeholder="My NFT Description, pattern of narrative development that aims to make vivid a place, object, character, or group."
                        name="Description"
                      ></textarea>
                    </div>
                    {generativeCollectionError?.Description ? (
                      <div className="mediaeyeform-group-input-error-message">
                        {generativeCollectionError?.Description}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="create-generative-collection-page-content-row create-generative-collection-page-content-row-appearance">
            <div className="create-generative-collection-page-content-row-card">
              <div className="create-generative-collection-page-content-row-card-header">
                <div className="create-generative-collection-page-content-row-card-header-heading">
                  Appearance
                </div>
              </div>
              <div className="create-generative-collection-page-content-row-card-body">
                <div className="create-generative-collection-page-content-row-card-body-colleft create-generative-collection-page-content-row-uploadBox">
                  <div className="mediaeyeform-group text-center">
                    <label className="mediaeyeform-label">Logo Image*</label>
                  </div>

                  <div className="create-generative-collection-page-content-row-uploadBox-content">
                    <label className="create-generative-collection-page-content-row-uploadBox-logo">
                      <div className="create-generative-collection-page-content-row-uploadBox-logo-inner">
                        <img
                          src={logo?.url ? logo.url : GetDefaultImages('logo')}
                          alt="Logo"
                        />
                        <input
                          type="file"
                          className="create-generative-collection-page-content-row-uploadBox-content-inputfile"
                          name="logo-image"
                          accept="image/png, image/gif, image/jpeg"
                          onChange={(e) => handleLogoUpload(e)}
                        />
                      </div>
                      <div className="create-generative-collection-page-content-row-uploadBox-content-action create-generative-collection-page-content-row-uploadBox-logo-action">
                        <EditAvatar />
                      </div>
                    </label>
                  </div>
                  {generativeCollectionError?.['logo-image'] ? (
                    <div className="mediaeyeform-group-input-error-message">
                      {generativeCollectionError?.['logo-image']}
                    </div>
                  ) : null}
                  <div className="create-generative-collection-page-content-row-uploadBox-bottom">
                    140 x 140 JPEG, PNG
                    <br /> recommended.
                  </div>
                </div>
                <div className="create-generative-collection-page-content-row-card-body-colmiddle create-generative-collection-page-content-row-uploadBox">
                  <div className="mediaeyeform-group text-center">
                    <label className="mediaeyeform-label">
                      Displayed Image*
                    </label>
                  </div>

                  <div className="create-generative-collection-page-content-row-uploadBox-content">
                    <label className="create-generative-collection-page-content-row-uploadBox-display">
                      <div className="create-generative-collection-page-content-row-uploadBox-display-inner">
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
                          className="create-generative-collection-page-content-row-uploadBox-content-inputfile"
                          name="display-image"
                          accept="image/png, image/gif, image/jpeg"
                          onChange={(e) => handleDisplaySelect(e)}
                        />
                      </div>
                      <div className="create-generative-collection-page-content-row-uploadBox-content-action">
                        <EditAvatar />
                      </div>
                    </label>
                  </div>
                  {generativeCollectionError?.['display-image'] ? (
                    <div className="mediaeyeform-group-input-error-message">
                      {generativeCollectionError?.['display-image']}
                    </div>
                  ) : null}
                  <div className="create-generative-collection-page-content-row-uploadBox-bottom">
                    280 x 170 JPEG, PNG <br />
                    recommended.
                  </div>
                </div>

                <div className="create-generative-collection-page-content-row-card-body-colright create-generative-collection-page-content-row-uploadBox">
                  <div className="mediaeyeform-group text-center">
                    <label className="mediaeyeform-label">Banner image*</label>
                  </div>
                  <div className="create-generative-collection-page-content-row-uploadBox-content">
                    <label className="create-generative-collection-page-content-row-uploadBox-banner">
                      <div className="create-generative-collection-page-content-row-uploadBox-banner-inner">
                        <img
                          src={
                            banner?.url
                              ? banner.url
                              : GetDefaultImages('banner')
                          }
                          alt="Banner"
                        />
                        <input
                          className="create-generative-collection-page-content-row-uploadBox-content-inputfile"
                          type="file"
                          name="banner-image"
                          accept="image/png, image/gif, image/jpeg"
                          onChange={(e) => handleBannerSelect(e)}
                        />
                      </div>
                      <div className="create-generative-collection-page-content-row-uploadBox-content-action">
                        <EditAvatar />
                      </div>
                    </label>
                  </div>
                  {generativeCollectionError?.['banner-image'] ? (
                    <div className="mediaeyeform-group-input-error-message">
                      {generativeCollectionError?.['banner-image']}
                    </div>
                  ) : null}
                  <div className="create-generative-collection-page-content-row-uploadBox-bottom">
                    1500 x 240 JPEG, PNG <br />
                    Minimum image size
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="create-generative-collection-page-content-row create-generative-collection-page-content-row-social">
            <div className="create-generative-collection-page-content-row-card">
              <div className="create-generative-collection-page-content-row-card-header">
                <div className="create-generative-collection-page-content-row-card-header-heading">
                  Connect Social Media Accounts
                </div>
              </div>
              <div className="create-generative-collection-page-content-row-card-body">
                <ConnectSocial
                  socialLinks={links}
                  changeSocialLinks={changeSocialLinks}
                />
              </div>
            </div>
          </div>

          <div className="create-generative-collection-page-content-row create-generative-collection-page-content-row-options">
            <div className="create-generative-collection-page-content-row-card">
              <div className="create-generative-collection-page-content-row-card-body medieyeform">
                <div className="create-generative-collection-page-content-row-card-body-colleft">
                  <div className="mediaeyeform-group">
                    <label className="mediaeyeform-label" htmlFor="TotalNfts">
                      Total Number of NFTs
                    </label>
                    <div className="mediaeyeform-group-input">
                      <input
                        id="TotalNfts"
                        className="mediaeyeform-input"
                        placeholder="10000"
                        type="text"
                        value={totalNfts}
                        onChange={(e) => {
                          const re = /^[0-9\b]+$/;
                          let value = allowOnlyNumber(e.target.value, false);
                          if (value === '' || re.test(value)) {
                            value <= 10000 ? setTotalNfts(value) : setTotalNfts(10000);
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="create-generative-collection-page-content-row-card-body-colright">
                  <div className="mediaeyeform-group">
                    <label className="mediaeyeform-label" htmlFor="mintingWallet">
                      Minting Limit per Wallet
                    </label>
                    <div className="mediaeyeform-group-input">
                      <input
                        id="mintingWallet"
                        className="mediaeyeform-input"
                        placeholder="1000"
                        type="text"
                        value={limit}
                        onChange={(e) => {
                          const re = /^[0-9\b]+$/;
                          let value = e.target.value;
                          if (value === '' || re.test(value)) {
                            value = setLimit(value);
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="create-generative-collection-page-content-row-card-body-colFull">
                  <div className="mediaeyeform-group">
                    <label className="mediaeyeform-label mediaeyeinfo" htmlFor="revealOption">
                      NFT Reveal Option
                      <span
                        className="mediaeyeinfo-sign"
                        data-class="mediaeyetooltip"
                        data-tip="NFT buyers go to a minting page and mint NFTs from a set. You can allow them to see actual images or make the process random."
                      >
                        <InfoCircle type="outline-white" />
                      </span>
                    </label>
                    <div className="mediaeyeform-group-input">
                      <SelectSearch
                        id="revealOption"
                        className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style"
                        size="lg"
                        options={revealOptionsArray}
                        value={revealOption}
                        onChange={(opt) => setRevealOption(opt)}
                      />
                    </div>
                  </div>

                  <div className="mediaeyeform-group">
                    <label className="mediaeyeform-label mediaeyeinfo" htmlFor="nftName">
                      NFT Name
                      <span
                        className="mediaeyeinfo-sign"
                        data-class="mediaeyetooltip"
                        data-tip="The pattern is used in NFT name generation. Example: Collection name is “Ape”, so that the NFTs will have names: “Ape #1”, “Ape #2”, “Ape #3”.  If you want another NFT Name pattern specify it using {collection} and {id} parameters."
                      >
                        <InfoCircle type="outline-white" />
                      </span>
                    </label>
                    <div className="mediaeyeform-group-input mediaeyeform-group-input-auto">
                      <input
                        id="nftName"
                        value={nftName}
                        onChange={(e) => setNftName(e.target.value)}
                        className="mediaeyeform-input"
                        type="text"
                        placeholder="{{collection}} #{{id}}"
                      />
                    </div>
                  </div>

                  <div className="mediaeyeform-group">
                    <label className="mediaeyeform-label mediaeyeinfo" htmlFor="DropDate">
                      Drop Date
                    </label>
                    <div className="mediaeyeform-group-input mediaeyeform-group-input-auto">
                      <div className="mediaeyeform-group-input">
                        <div className="mediaeye-datepicker">
                          <DatePicker
                            id="DropDate"
                            minDate={new Date()}
                            className="mediaeyeform-input"
                            withPortal
                            selected={dropDate}
                            onChange={(date) => setDropDate(date)}
                            dateFormat="yyyy-MM-dd"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mediaeyeform-group">
                    <label className="mediaeyeform-label mediaeyeswitch">
                      GIF Preview on Collection Page
                      <Switch
                        className={`mediaeyeswitch-btn mediaeyeswitch-left mediaeyeswitch-right ${toggleGifPrev ? 'active' : ''}`}
                        checkedIcon={false}
                        uncheckedIcon={false}
                        onChange={() => {
                          setToggleGifPrev(!toggleGifPrev);
                        }}
                        checked={toggleGifPrev}
                        height={21}
                        width={50}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="create-generative-collection-page-content-row-card-container">
              <div className="create-generative-collection-page-content-row-card">
                <div className="create-generative-collection-page-content-row-card-body medieyeform">
                  <div className="create-generative-collection-page-content-row-pricing">
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
                              onChange={() =>
                                setExcelFile(inputRef.current.files[0])
                              }
                              name="excel file"
                            />
                            <Upload upload={'folder'} />{' '}
                            {excelFile ? excelFile.name : 'Upload Excel file'}{' '}
                            {generativeCollectionError?.[`excel file`] ? (
                              <div className="mediaeyeform-group-input-error-message">
                                {generativeCollectionError?.[`excel file`]}
                              </div>
                            ) : null}
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
                              onChange={() =>
                                setZipFile(zipRef.current.files[0])
                              }
                              accept=".zip, .zipx"
                              name="zip file"
                            />
                            <Upload upload={'folder'} />{' '}
                            {zipFile
                              ? zipFile.name
                              : 'Upload ZIP Folder per layer'}{' '}
                            {generativeCollectionError?.[`zip file`] ? (
                              <div className="mediaeyeform-group-input-error-message">
                                {generativeCollectionError?.[`zip file`]}
                              </div>
                            ) : null}
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
                    <div className="create-generative-collection-page-content-row-card-header">
                      <div className="create-generative-collection-page-content-row-card-header-heading">
                        Pricing Options
                      </div>
                    </div>
                    <div className="create-generative-collection-page-content-row-card-body">
                      <div className="create-generative-collection-page-content-row-card-body-inner">
                        <label className="mediaeyeform-label">
                          Starting Price and Acceptable Payment Methods
                        </label>
                        <div className="create-generative-collection-page-content-row-pricing-paymentmethod">
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

                      <div className="">
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
                                max={SALES_MAX}
                                value={totalSales}
                                onChange={(e) => {
                                  const re = /^[0-9\b]+$/;
                                  let value = e.target.value;
                                  if (value === '' || re.test(value)) {
                                    value =
                                      value > SALES_MAX ? SALES_MAX : value;
                                    e.target.value = value;
                                    setTotalSales(value);
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
                                  max={RATE_MAX}
                                  value={totalRate}
                                  onChange={(e) => {
                                    const re = /^[0-9\b]+$/;
                                    let value = e.target.value;
                                    if (value === '' || re.test(value)) {
                                      value =
                                        value > RATE_MAX ? RATE_MAX : value;
                                      e.target.value = value;
                                      setTotalRate(value);
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
              </div>
            </div>
          </div>
          {/* <div className="create-generative-collection-page-content-row create-generative-collection-page-content-row-charity">
            <div className="create-generative-collection-page-content-row-card">
              <div className="create-generative-collection-page-content-row-card-header">
                <div className="create-generative-collection-page-content-row-card-header-heading">
                  Charity Options
                  <Switch
                    className="mediaeyeswitch-btn mediaeyeswitch-right"
                    checkedIcon={false}
                    uncheckedIcon={false}
                    onChange={() => {
                      setToggleCharity(!toggleCharity);
                    }}
                    checked={toggleCharity}
                    height={20}
                    width={50}
                  />
                </div>
              </div>
              {toggleCharity ? (
                <div className="create-generative-collection-page-content-row-charity-inner">
                  <div className="create-generative-collection-page-content-row-charity-inner-left">
                    <span>Charity</span>
                    <img src={charityIcon} alt="charity" className="m-l-5" />
                    <InfoCircle type="outline" />
                  </div>
                  <div className="create-generative-collection-page-content-row-charity-inner-right">
                    <div className="mediaeye-searchbar">
                      <input placeholder="Select Charity" type="text" />
                    </div>
                    <div className="mediaeyeform-group-input">
                      <input className="mediaeyeform-input" placeholder="%" />
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div> */}
          {tokenType == 'ERC721' ? (
            <div
              className="create-generative-collection-page-content-row create-generative-collection-page-content-row-uploadcontent"
              ref={generativeAddNFT}
            >
              <div className="create-generative-collection-page-content-row-card">
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
                          {imageFile
                            ? imageFile.name
                            : 'Upload 1 of 1 NFT Image'}
                        </label>
                      </div>
                      <div className="create-generative-collection-page-content-row-uploadcontent-row-properties">
                        <GenerativeProperties
                          limit={nftList?.length ? nftList?.length : 0}
                        />
                      </div>
                      {nftList?.length >= 0 ? (
                        <button
                          type="button"
                          alt="btn"
                          className="btn btn-gaming"
                          onClick={addContent}
                        >
                          SAVE CHANGES
                        </button>
                      ) : null}
                      <div className="create-mint-page-main-collection-bottom">
                        {nftList.map((content, i) => {
                          return (
                            <CreateProductMintBlock
                              activeToken={tokenType}
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

                        <div className="mediaeye-collection-card">
                          <Link
                            className="mediaeye-collection-card-inner mediaeye-collection-card-inner-add"
                            onClick={addMoreContent}
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
                              ? ''
                              : 'You have reached the creation limit'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}
          <div className="create-generative-collection-page-content-row">
            <div className="create-generative-collection-page-content-row-card">
              <div className="create-generative-collection-page-content-row-card-header">
                <div className="create-generative-collection-page-content-row-card-header-heading">
                  Checkout
                </div>
              </div>
              <div
                className="create-generative-collection-page-content-row-checkoutsection-row mediaeyetokenpayment"
                size={paymentTokensList?.length}
              >
                {paymentTokensList.map((key, i) => (
                  <div
                    className={
                      activeToken === key.name
                        ? 'active mediaeyetokenpayment-box'
                        : 'mediaeyetokenpayment-box'
                    }
                  >
                    <div
                      className="mediaeyetokenpayment-box-inner"
                      data-offer={key.offer ? true : false}
                      onClick={() => {
                        setActiveToken(key.name);
                      }}
                    >
                      <div className="mediaeyetokenpayment-box-icon">
                        <img src={key.img} alt={key.name} />
                      </div>
                      <div className="mediaeyetokenpayment-box-content">
                        <div className="mediaeyetokenpayment-box-content-name small-14">
                          {key.convert} {key.name}
                        </div>
                        <div className="mediaeyetokenpayment-box-content-des text-white">
                          {key.price}
                        </div>
                        {key.offer ? (
                          <div className="mediaeyetokenpayment-box-content-offer">
                            {key.offer} OFF
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mediaeyeFeatureNft-detail-checkout-row">
                <button type="button" className="btn btn-gaming btn-sm">
                  PAY
                </button>
              </div>
            </div>
          </div>
          <div className="text-center">
            <button
              onClick={generate}
              type="button"
              className="btn btn-creative"
            >
              GENERATE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default GenerativeCollection;
