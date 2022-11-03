import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
// import "../../CreateProduct/Collection/Collection.scss";
import './Launch.scss';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useMoralis } from 'react-moralis';
import { ChangeChainRequest } from '../../../blockchain/functions/ChangeChain';
import search from '../../../assets/img/newSearchIcon.png';
import Switch from 'react-switch';
import SelectSearch from 'react-select-search';
import { useSelector, useDispatch } from 'react-redux';
import { toggleGeneralPopup } from '../../../store/app/appSlice';
import {
  Close,
  BackArrow,
  InfoCircle,
  Instagram,
  Telegram,
  Twitter,
  Linkedin,
  YouTube,
  Twitch,
  Spotify,
  Flickr,
  Edit,
  Globe,
  Discord,
  EditAvatar,
  Reddit,
  Tumbler,
  Vimeo,
  Hubspot,
  Sendgrid,
  Eventbrite,
  Mailchimp,
  Snapchat,
  Tiktok,
  Medium
} from '../../Icons/';
import {
  getInstagramUser,
  getTwitterAPiUrl,
  getTwitterAuthVerify,
  getDiscordAPiUrl,
  getDiscordAuthVerify,
  getFlickrAPiUrl,
  getFlickrAuthVerify,
  getLinkedinAPiUrl,
  getLinkedinAuthVerify,
  getSpotifyAPiUrl,
  getSpotifyAuthVerify,
  getTelegramApiUrl,
  getTelegramAuthVerify,
  getTwitchAPiUrl,
  getTwitchAuthVerify
} from '../../../blockchain/functions/Profile/socialconnection';

// import fileUpload from './fileUpload';
import FeatureYourNFT from '../../PutOn/PutOnReusables/FeatureYourNFT';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import SelectTokenAddress from './SelectTokenAddress';
import { BuyAirdrop } from '../../../blockchain/functions/Airdrops/BuyAirdrop';

// NFT Array
const NFTArray = [
  {
    id: 1,
    address: 'eye',
    img: '../img/creators_mobile_header.png',
    nftId: '1c2e11...6f13d',
    nftAmount: '1 000 000'
  },
  {
    id: 2,
    address: 'eye',
    img: '../img/creators_mobile_header.png',
    nftId: '1c2e11...6f13d',
    nftAmount: '1 000 000'
  },
  {
    id: 3,
    address: 'eye',
    img: '../img/creators_mobile_header.png',
    nftId: '1c2e11...6f13d',
    nftAmount: '1 000 000'
  },
  {
    id: 4,
    address: 'eye',
    img: '../img/creators_mobile_header.png',
    nftId: '1c2e11...6f13d',
    nftAmount: '1 000 000'
  },
  {
    id: 5,
    address: 'eye',
    img: '../img/creators_mobile_header.png',
    nftId: '1c2e11...6f13d',
    nftAmount: '1 000 000'
  },
  {
    id: 6,
    address: 'eye',
    img: '../img/creators_mobile_header.png',
    nftId: '1c2e11...6f13d',
    nftAmount: '1 000 000'
  },
  {
    id: 7,
    address: 'eye',
    img: '../img/creators_mobile_header.png',
    nftId: '1c2e11...6f13d',
    nftAmount: '1 000 000'
  },
  {
    id: 8,
    address: 'eye',
    img: '../img/creators_mobile_header.png',
    nftId: '1c2e11...6f13d',
    nftAmount: '1 000 000'
  },
  {
    id: 9,
    address: 'eye',
    img: '../img/creators_mobile_header.png',
    nftId: '1c2e11...6f13d',
    nftAmount: '1 000 000'
  },
  {
    id: 10,
    address: 'eye',
    img: '../img/creators_mobile_header.png',
    nftId: '1c2e11...6f13d',
    nftAmount: '1 000 000'
  }
];

// Token Array
const TokenArray = [
  {
    id: 1,
    address: 'eye',
    img: '../img/creators_mobile_header.png',
    nftId: '1c2e11...6f13d',
    nftAmount: '1 000 000'
  },
  {
    id: 2,
    address: 'eye',
    img: '../img/creators_mobile_header.png',
    nftId: '1c2e11...6f13d',
    nftAmount: '1 000 000'
  },
  {
    id: 3,
    address: 'eye',
    img: '../img/creators_mobile_header.png',
    nftId: '1c2e11...6f13d',
    nftAmount: '1 000 000'
  },
  {
    id: 4,
    address: 'eye',
    img: '../img/creators_mobile_header.png',
    nftId: '1c2e11...6f13d',
    nftAmount: '1 000 000'
  },
  {
    id: 5,
    address: 'eye',
    img: '../img/creators_mobile_header.png',
    nftId: '1c2e11...6f13d',
    nftAmount: '1 000 000'
  },
  {
    id: 6,
    address: 'eye',
    img: '../img/creators_mobile_header.png',
    nftId: '1c2e11...6f13d',
    nftAmount: '1 000 000'
  },
  {
    id: 7,
    address: 'eye',
    img: '../img/creators_mobile_header.png',
    nftId: '1c2e11...6f13d',
    nftAmount: '1 000 000'
  },
  {
    id: 8,
    address: 'eye',
    img: '../img/creators_mobile_header.png',
    nftId: '1c2e11...6f13d',
    nftAmount: '1 000 000'
  },
  {
    id: 9,
    address: 'eye',
    img: '../img/creators_mobile_header.png',
    nftId: '1c2e11...6f13d',
    nftAmount: '1 000 000'
  },
  {
    id: 10,
    address: 'eye',
    img: '../img/creators_mobile_header.png',
    nftId: '1c2e11...6f13d',
    nftAmount: '1 000 000'
  }
];

const LaunchAirdrop = (props) => {
  const { user, Moralis, isUserUpdating } = useMoralis();
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem('isLogin') ? localStorage.getItem('isLogin') : 'false'
  );
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  let history = useHistory();

  const [activeMinters, setActiveMinters] = useState([]);
  const { darkTheme } = props;
  const [activeToken, setActiveToken] = useState(null);
  const activeNetwork = useSelector((state) => state.app.activeNetwork);
  const [isListening, setListening] = useState(false);

  const [showAddContent, setShowAddContent] = useState(true);
  const [valueSelect] = useState(null);
  const [hideCollection, setHideCollection] = useState(false);
  const [hidePromoCodes, setHidePromoCodes] = useState(false);
  const [hideUploadparticipants, setHideUploadparticipants] = useState(false);

  const [approvedList, setApprovedList] = useState([]);
  const [readyIds, setReadyIds] = useState({});
  // variable used to decide whether user has access to minters based on sub level
  const [isLevel, setLevel] = useState('true');
  // Collection Fields

  const [openSeaURL, setOpenSeaURL] = useState('');
  // Collection Fields Validate
  const [nameValid, setNameValid] = useState(true);
  const [descriptionValid, setDescriptionValid] = useState(true);
  const [openSeaURLValid, setOpenSeaURLValid] = useState(true);
  // Collection Images
  const [featured, setFeatured] = useState({});

  const [arrow, setArrow] = useState(false);
  const [openList, setOpenList] = useState(false);
  const [getTitle, setGetTitle] = useState();

  const [featuredURL, setFeaturedURL] = useState(null);

  const animatedComponents = makeAnimated();
  const [toggleFeatureYourNFT, setToggleFeatureYourNFT] = useState(true);

  const [userInstaInput, setUserInstaInput] = useState('');
  const [instaUser, setInstaUser] = useState('');
  const [instaPassword, setInstaPassword] = useState('');
  const [telegramcodehash, setTelegramcodehash] = useState(null);
  const [telegramnumber, settelegramnumber] = useState(null);
  const [openInput, setOpenInput] = useState(false);
  const [countryCode, setCountryCode] = useState('+');
  const [phoneNo, setPhoneNo] = useState('');
  const [otpInput, setOtpInput] = useState(false);
  const [otp, setOtp] = useState('');

  const [SocialMediaDropdown, setSocialMediaDropdown] = useState('');
  const [OpenSocialMediaDropdownBox, SetOpenSocialMediaDropdownBox] =
    useState('');
  const [file, setFile] = React.useState('');

  const [TwitterUsername, setTwitterUsername] = useState('');
  const [ReweetUsername, setReweetUsername] = useState('');
  const [EditSocialMediaBox, SetEditSocialMediaBox] = useState('');

  const [paymentTokensList, setPaymentTokensList] = useState([]);
  // Create Airdrop State
  const [accessibility, setAccessibility] = useState('Public');
  const [activeDays, setActiveDays] = useState(21);
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [airdropType, setAirdropType] = useState('Token');
  const [banner, setBanner] = useState(null);
  const [bannerURL, setBannerURL] = useState(null);
  const [description, setDescription] = useState('');
  const [embedMedia, setEmbedMedia] = useState('');
  const [logo, setLogo] = useState(null);
  const [logoURL, setLogoURL] = useState(null);
  const [name, setName] = useState('');
  const [participantAllocation, setParticipantAllocation] = useState(1);
  const [SelectNFT, setSelectNFT] = useState(NFTArray);
  const [selectedToken, setSelectedToken] = useState(null);
  const [startDate, setStartDate] = useState(new Date().getTime());
  const [totalAllocation, setTotalAllocation] = useState(0);

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

  const TwitterUsernameValue = (OpenSocialMediaDropdownBox) => {
    SetOpenSocialMediaDropdownBox('');
    SetEditSocialMediaBox(OpenSocialMediaDropdownBox);
  };

  const editSocialMediaBox = (EditSocialMediaBox) => {
    SetEditSocialMediaBox('');
    SetOpenSocialMediaDropdownBox(EditSocialMediaBox);
  };

  const removebox = (EditSocialMediaBox) => {
    SetEditSocialMediaBox('');
  };

  // Collection Links
  const [links, setLinks] = useState({
    website: '',
    discord: '',
    twitter: '',
    instagram: '',
    medium: '',
    telegram: ''
  });

  const reactSelectStylesForSingle = {
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        alignItems: 'center',
        backgroundColor: isFocused ? 'rgba(255, 255, 255, 0.05)' : null,
        color: isSelected ? '#FF1B6D' : null
      };
    }
  };

  const handleChange = (selected) => {
    console.log(selected, 'selected is here');
  };

  const Options = (props) => {
    const { data, innerRef, innerProps } = props;
    return (
      <div className="holdingDropdown drophold" ref={innerRef} {...innerProps}>
        <div>
          <label>{props.label}</label>
        </div>
      </div>
    );
  };

  // Search List
  const [searchedMinters, setSearchedMinters] = useState([]);

  const payAirdropPressed = async () => {
    /*let request = {
      accessibility: accessibility,
      activeDays: activeDays,
      activeToken: activeToken,
      additionalInfo: additionalInfo,
      airdropType: airdropType,
      banner: banner,
      description: description,
      embedMedia: embedMedia,
      links: links,
      logo: logo,
      name: name,
      participantAllocation: participantAllocation,
      startDate: startDate,
      totalAllocation: totalAllocation
    };

    console.log('airdrop data', request);
    // check if airdrop contract is approved for selected token before proceeding
    await BuyAirdrop(Moralis, request);*/
  };

  const changeName = (e) => {
    if (e.target.value === '') {
      setNameValid(false);
    } else {
      setNameValid(true);
    }
    setName(e.target.value);
  };

  const changeOpenSeaURL = (e) => {
    if (e.target.value === '') {
      setOpenSeaURLValid(false);
    } else {
      setOpenSeaURLValid(true);
    }
    setOpenSeaURL(e.target.value);
  };

  const changeDescription = (e) => {
    if (e.target.value === '') {
      setDescriptionValid(false);
    } else {
      setDescriptionValid(true);
    }
    setDescription(e.target.value);
  };

  const connecttwitter = async () => {
    try {
      let apidata = await getTwitterAPiUrl();
      if (apidata.key == 1) {
        window.open(apidata.url);
        localStorage.setItem('twittersecretkey', apidata.requestSecret);
      } else {
        dispatch(
          toggleGeneralPopup({
            status: 'error',
            message: 'Something Went Wrong!',
            textButton: 'OK',
            size: 'sm'
          })
        );
      }
    } catch (e) {
      dispatch(
        toggleGeneralPopup({
          status: 'error',
          message: 'Something Went Wrong!',
          textButton: 'OK',
          size: 'sm'
        })
      );
    }
  };

  const connectdiscord = async () => {
    try {
      let apidata = await getDiscordAPiUrl();
      if (apidata.key == 1) {
        window.open(apidata.url);
      } else {
        dispatch(
          toggleGeneralPopup({
            status: 'error',
            message: 'Something Went Wrong!',
            textButton: 'OK',
            size: 'sm'
          })
        );
      }
    } catch (e) {
      dispatch(
        toggleGeneralPopup({
          status: 'error',
          message: 'Something Went Wrong!',
          textButton: 'OK',
          size: 'sm'
        })
      );
    }
  };

  const connectlinkedin = async () => {
    try {
      let apidata = await getLinkedinAPiUrl();
      if (apidata.key == 1) {
        window.open(apidata.url);
      } else {
        dispatch(
          toggleGeneralPopup({
            status: 'error',
            message: 'Something Went Wrong!',
            textButton: 'OK',
            size: 'sm'
          })
        );
      }
    } catch (e) {
      dispatch(
        toggleGeneralPopup({
          status: 'error',
          message: 'Something Went Wrong!',
          textButton: 'OK',
          size: 'sm'
        })
      );
    }
  };

  const connectspotify = async () => {
    try {
      let apidata = await getSpotifyAPiUrl();
      if (apidata.key == 1) {
        window.open(apidata.url);
      } else {
        dispatch(
          toggleGeneralPopup({
            status: 'error',
            message: 'Something Went Wrong!',
            textButton: 'OK',
            size: 'sm'
          })
        );
      }
    } catch (e) {
      dispatch(
        toggleGeneralPopup({
          status: 'error',
          message: 'Something Went Wrong!',
          textButton: 'OK',
          size: 'sm'
        })
      );
    }
  };

  const connectflickr = async () => {
    try {
      let apidata = await getFlickrAPiUrl();
      if (apidata.key == 1) {
        window.open(apidata.url);
        localStorage.setItem('flickrsecretkey', apidata.requestSecret);
      } else {
        dispatch(
          toggleGeneralPopup({
            status: 'error',
            message: 'Something Went Wrong!',
            textButton: 'OK',
            size: 'sm'
          })
        );
      }
    } catch (e) {
      dispatch(
        toggleGeneralPopup({
          status: 'error',
          message: 'Something Went Wrong!',
          textButton: 'OK',
          size: 'sm'
        })
      );
    }
  };

  const connecttwitch = async () => {
    try {
      let apidata = await getTwitchAPiUrl();
      if (apidata.key == 1) {
        window.open(apidata.url);
      } else {
        dispatch(
          toggleGeneralPopup({
            status: 'error',
            message: 'Something Went Wrong!',
            textButton: 'OK',
            size: 'sm'
          })
        );
      }
    } catch (e) {
      dispatch(
        toggleGeneralPopup({
          status: 'error',
          message: 'Something Went Wrong!',
          textButton: 'OK',
          size: 'sm'
        })
      );
    }
  };

  const openInstaDetails = () => {
    setUserInstaInput(!userInstaInput);
  };

  const openMobileInput = () => {
    setOpenInput(!openInput);
  };
  const getCountryCode = (e) => {
    setCountryCode(e.target.value);
  };
  const getPhoneNumber = (e) => {
    setPhoneNo(e.target.value);
  };
  const setYourOtp = () => {
    setOtpInput(!otpInput);
  };
  const getYourOtp = (e) => {
    setOtp(e.target.value);
  };

  const handleMobileNumber = async () => {
    if (
      countryCode === '+' ||
      phoneNo === undefined ||
      countryCode === '' ||
      countryCode.length > 3
    ) {
      openMobileInput();
    } else {
      let yourNumber = countryCode.concat(phoneNo);
      setCountryCode('+');
      setPhoneNo('');
      let apidata = await getTelegramApiUrl(yourNumber);
      if (apidata.key == 1) {
        setTelegramcodehash(apidata.url);
        settelegramnumber(yourNumber);
      } else {
        dispatch(
          toggleGeneralPopup({
            status: 'error',
            message: 'Something Went Wrong!',
            textButton: 'OK',
            size: 'sm'
          })
        );
      }
      openMobileInput();
      setYourOtp();
    }
  };

  const handleYourOtp = async () => {
    if (otp.length !== 5) {
      setOtp('');
    } else {
      let yourOtp = otp;
      let phonecodehash = telegramcodehash;
      let phoneNumber = telegramnumber;
      let apidata = await getTelegramAuthVerify(
        phoneNumber,
        yourOtp,
        phonecodehash
      );
      if (apidata.key == 1) {
        let telegram_username = apidata.display_name;

        /////////////You can call Webservice to store TELEGRAM username here and get TELEGRAM Username from Variable telegram_username/////////

        dispatch(
          toggleGeneralPopup({
            status: 'success',
            message: `Great! you connected with @${telegram_username}`,
            textButton: 'OK',
            size: 'sm'
          })
        );
      } else {
        dispatch(
          toggleGeneralPopup({
            status: 'error',
            message: 'Something Went Wrong!',
            textButton: 'OK',
            size: 'sm'
          })
        );
      }
      setOtp('');
      setYourOtp();
    }
  };

  const connectinstagram = async () => {
    try {
      let apidata = await getInstagramUser(instaUser, instaPassword);
      if (apidata.key == 1) {
        let instagram_username = apidata.display_name;

        /////////////You can call Webservice to store INSTAGRAM username here and get INSTAGRAM Username from Variable instagram_username/////////

        dispatch(
          toggleGeneralPopup({
            status: 'success',
            message: `Great! you connected with @${instagram_username}`,
            textButton: 'OK',
            size: 'sm'
          })
        );
      } else {
        dispatch(
          toggleGeneralPopup({
            status: 'error',
            message: 'Something Went Wrong!',
            textButton: 'OK',
            size: 'sm'
          })
        );
      }
    } catch (e) {
      dispatch(
        toggleGeneralPopup({
          status: 'error',
          message: 'Something Went Wrong!',
          textButton: 'OK',
          size: 'sm'
        })
      );
    }
  };

  const allowMinters = (e) => {
    if (
      user.attributes.subscriptionLevel > 1 &&
      user.attributes.subscriptionEnd > Date.now() / 1000
    ) {
      handleChangMinters(e);
    } else {
      setLevel(false);
    }
  };
  const handleChangMinters = (e) => {
    if (e[0] === undefined) {
      return;
    }
    let arr = activeMinters.slice();
    arr.push(e[0]);
    setActiveMinters(arr);
    /* searchedMinters.forEach(function (item, i) {
      if (item.id === e[0].id) {
        searchedMinters.splice(i, 1);
      }
    });*/
  };

  const handleSearchMinters = (e) => {
    if (e.length > 0) {
      searchMinters(e);
    } else {
      setSearchedMinters([]);
    }
  };

  const searchMinters = async (searchText) => {
    const searchParams = { searchText: searchText };
    // map each minter to a <Select/> label
    const result = await Moralis.Cloud.run('SearchUsers', searchParams);
    const newSearchedMinters = await result
      .filter((searchedUser) => {
        // filter out own user and any users already in the active minter list
        if (
          searchedUser.attributes.ethAddress === user.attributes.ethAddress ||
          activeMinters.filter(
            (e) => e.address === searchedUser.attributes.ethAddress
          ).length > 0
        ) {
          return false;
        }
        return true;
      })
      .map((searchedUser, i) => {
        return {
          id: i,
          address: searchedUser.attributes.ethAddress,
          value: searchedUser.attributes.defaultUsername
            ? 'Unnamed'
            : searchedUser.attributes.username,
          label: (
            <span>
              <img
                style={{ aspectRatio: '1/1', objectFit: 'cover' }}
                src={
                  searchedUser.attributes.profileImage?._url
                    ? searchedUser.attributes.profileImage?._url
                    : avatar
                }
                alt="avatar"
              />
              &ensp;
              {searchedUser.attributes.defaultUsername
                ? searchedUser.attributes.ethAddress
                : searchedUser.attributes.username}
              <button>Add</button>
            </span>
          ),
          img: searchedUser.attributes.profileImage?._url
            ? searchedUser.attributes.profileImage?._url
            : avatar
        };
      });

    setSearchedMinters(newSearchedMinters);
  };

  const deleteMinters = (id) => {
    let arr = activeMinters.slice();
    arr.forEach(function (item, i) {
      if (item.id === id) {
        arr.splice(i, 1);
        //minters.push(item);
      }
    });
    setActiveMinters(arr);
  };

  const activeMintersList = activeMinters.map((item) => {
    return (
      <div className="active_minters_block">
        <img
          src="../img/close_btn.png"
          className="close_btn"
          onClick={() => deleteMinters(item.id)}
          alt="close"
        />
        <img
          style={{ aspectRatio: '1/1', objectFit: 'cover' }}
          src={item.img}
          alt="avatar"
        />
        <h5>{item.value}</h5>
      </div>
    );
  });

  const [activeListMalichimp, setActiveListMalichimp] = useState('Select...');
  const [activeListSendgrid, setActiveListSendgrid] = useState('Select...');
  const [activeTypeSpotify, setActiveTypeSpotify] = useState('Artist');
  const [activeAirdropFilter, setActiveAirdropFilter] = useState('Select...');

  const daysFilterOption = [
    {
      name: '7 days',
      value: 7
    },
    {
      name: '14 days',
      value: 14
    },
    {
      name: '21 days',
      value: 21
    }
  ];

  const listMalichimp = [
    {
      name: 'List 1',
      value: 1
    },
    {
      name: 'List 2',
      value: 2
    },
    {
      name: 'List 3',
      value: 3
    }
  ];

  const listSendgrid = [
    {
      name: 'List 1',
      value: 1
    },
    {
      name: 'List 2',
      value: 2
    },
    {
      name: 'List 3',
      value: 3
    }
  ];

  const typeSpotify = [
    {
      name: 'Artist',
      value: 'artist'
    },
    {
      name: 'User',
      value: 'user'
    }
  ];

  const airdropCategories = [
    { name: 'PreSale', value: 'PreSale' },
    { name: 'Pre-Mint', value: 'Pre-Mint' }
  ];

  const handleFileSelected = async (e) => {
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

  const handleLinkChange = async (e) => {
    await setLinks({ ...links, [e.target.id]: e.target.value });
  };

  const onCreatePressed = async () => {
    setLoading(true);
    setLoading(false);
  };

  useEffect(() => {
    setIsLogin(localStorage.getItem('isLogin'));
  }, [user]);

  useEffect(() => {
    if (isLogin === 'false') {
      history.replace('/connect-wallet');
    }
  }, []);

  const optionsUsers = [
    {
      id: 1,
      name: '@user123',
      img: '../img/creators_mobile_header.png'
    },
    {
      id: 2,
      name: '@user123',
      img: '../img/creators_mobile_header.png'
    },
    {
      id: 3,
      name: '@user123',
      img: '../img/creators_mobile_header.png'
    },
    {
      id: 4,
      name: '@user123',
      img: '../img/creators_mobile_header.png'
    },
    {
      id: 5,
      name: '@user123',
      img: '../img/creators_mobile_header.png'
    },
    {
      id: 6,
      name: '@user123',
      img: '../img/creators_mobile_header.png'
    },
    {
      id: 7,
      name: '@user123',
      img: '../img/creators_mobile_header.png'
    },
    {
      id: 8,
      name: '@user123',
      img: '../img/creators_mobile_header.png'
    },
    {
      id: 9,
      name: '@user123',
      img: '../img/creators_mobile_header.png'
    },
    {
      id: 10,
      name: '@user123',
      img: '../img/creators_mobile_header.png'
    }
  ];

  const handleOpenListDropdown = (props) => {
    setOpenList(!openList);
    setArrow(!arrow);
    let value = props;
    setGetTitle(value);
    console.log(getTitle, 'find this');
  };

  const removeItem = (id) => {
    const temp = [...product];
    const index = temp.findIndex((item) => item.id === id);
    if (index !== -1) {
      temp.splice(index, 1);
      setProduct(temp);
    }
  };

  const removeUsers = (id) => {
    const nftlist = [...SelectNFT];
    const nftarray = nftlist.findIndex((list) => list.id === id);
    if (nftarray !== -1) {
      nftlist.splice(nftarray, 1);
      setSelectNFT(nftlist);
    }
  };

  let [product, setProduct] = useState(optionsUsers);

  let [properties, setProperties] = useState(0);

  const SocialMediaDropdownManage = (type) => {
    if (SocialMediaDropdown === type) {
      setSocialMediaDropdown('');
    } else {
      setSocialMediaDropdown(type);
    }
  };

  const onClickSocialMediaDropdown = (event) => {
    console.log(event.target.dataset.dropdown);
    if (OpenSocialMediaDropdownBox === event.target.dataset.dropdown) {
      SetOpenSocialMediaDropdownBox('');
    } else {
      SetOpenSocialMediaDropdownBox(event.target.dataset.dropdown);
    }
  };

  const addVideoListTwitch = (type) => {
    if (type == 'addVideolist') {
      setProperties(properties + 1);
    } else if (type == 'removeVideolist') {
      setProperties(properties - 1);
    }
  };

  const test = () => {
    return [...Array(properties)].map((e, i) => (
      <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia singlebox">
        <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft">
          <button className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-button btn twt">
            Twitch
          </button>
          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title">
            <label>Video URL</label>
            <input type="text" placeholder="Watch a Featured Videolist" />
          </div>
        </div>
        <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight">
          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight-plusbtn">
            <button
              onClick={() => addVideoListTwitch('addVideolist')}
              className=""
            >
              +
            </button>
          </div>
          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight-plusbtn">
            <button
              onClick={() => addVideoListTwitch('removeVideolist')}
              className=""
            >
              -
            </button>
          </div>
          <button className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight-button btn btn-info">
            Save
          </button>
        </div>
      </div>
    ));
  };

  const NFTUpload = (event) => {
    setFile(event.target.files[0]);
  };

  const CollectionUserLevelFeatures = () => {
    return (
      <>
        {user?.attributes?.subscriptionLevel > 1 ? (
          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-grid">
            <div className="newlaunch-airdrop-page-inner-content-box-5-setting-grid-flex">
              <div>
                <label>Create Community Collection</label>
                <div className="newlaunch-airdrop-page-inner-content-box-5-setting-grid-box">
                  <div className="newlaunch-airdrop-page-inner-content-box-5-setting-grid-box-inner">
                    <img src="../img/collect-user-1.png" alt="collect-user" />
                    You
                  </div>
                  <div className="newlaunch-airdrop-page-inner-content-box-5-setting-grid-box-bg">
                    Add Collaborator
                  </div>
                </div>
                <div>
                  <div className="newlaunch-airdrop-page-inner-content-box-5-setting-grid-address">
                    <Select
                      className="newlaunch-airdrop-page-inner-content-box-5-setting-grid-address-search_select"
                      components={animatedComponents}
                      options={searchedMinters}
                      filterOption={null}
                      placeholder="@user_name or wallet address"
                      onChange={allowMinters}
                      onInputChange={handleSearchMinters}
                      isMulti
                      value={valueSelect}
                    />
                    <span
                      style={isLevel ? { display: 'none' } : { color: 'red' }}
                    >
                      &nbsp; Required Subscription Level 2 to add minters
                    </span>
                  </div>
                  <div className="newlaunch-airdrop-page-inner-content-box-5-setting-grid-active_minters">
                    {activeMintersList}
                  </div>
                </div>
              </div>
              <button className="btn btn-info">Submit</button>
            </div>
            <div className="newlaunch-airdrop-page-inner-content-box-5-setting-grid-five">
              {product.map((user) => (
                <div className="newlaunch-airdrop-page-inner-content-box-5-setting-grid-five-inner">
                  <img
                    className="newlaunch-airdrop-page-inner-content-box-5-setting-grid-five-inner-image"
                    src={user.img}
                    alt={user.name}
                  />
                  <span onClick={() => removeItem(user.id)}>&times;</span>
                  <p>{user.name}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="newlaunch-airdrop-page-inner-content-box-5-setting-simple">
              <Switch
                checkedIcon={false}
                uncheckedIcon={false}
                onChange={() => {
                  setHideCollection(!hideCollection);
                }}
                checked={hideCollection}
                height={20}
                width={40}
              />
              <label>Create Community Collection</label>
              <span>Available for Business</span>
              <div className="newlaunch-airdrop-page-inner-content-box-5-setting-lvl-2">
                LVL 2
              </div>
            </div>
            <p className="newlaunch-airdrop-page-inner-content-box-5-setting-para">
              Boost your productivity by granting access to mint NFTs to this
              Collection. Please specificy wallet address of trusted
              representatives.
            </p>
            <button className="btn btn-main">Subscribe</button>
          </div>
        )}
      </>
    );
  };

  if (
    user?.attributes?.subscriptionLevel < 1 &&
    user?.attributes?.subscriptionEnd < Date.now() / 1000
  ) {
    dispatch(
      toggleGeneralPopup({
        status: 'info',
        message: 'Subscription Level 1 or higher required to Mint Collection.',
        textButton: 'OK',
        size: 'sm'
      })
    );
    return <div className="newlaunch-airdrop-page-inner"></div>;
  } else
    return (
      <div className="newlaunch-airdrop-page-inner">
        <div className="mediaeye-layout-middle">
          <div className="mediaeye-layout-container">
            <div className="mediaeye-layout-container-header">
              <div className="mediaeye-layout-container-header-heading newlaunch-airdrop-page-inner-head">
                <h2>Create Collection</h2>
                <a
                  className="newlaunch-airdrop-page-inner-head-link tutorial"
                  href="/"
                >
                  &#9654; Tutorial
                </a>
              </div>
            </div>
            <div className="newlaunch-airdrop-page-inner-content">
              <div className="newlaunch-airdrop-page-inner-content-box-2">
                <h5>Airdrop Metadata</h5>
                <div className="newlaunch-airdrop-page-inner-content-box-2-flex">
                  <div className="newlaunch-airdrop-page-inner-content-box-2-flex-inner-1">
                    <div className="newlaunch-airdrop-page-inner-content-box-2-flex-inner-1-name">
                      <label className="newlaunch-airdrop-page-inner-content-box-2-flex-inner-1-name-label" htmlFor="airName">
                        Airdrop Name
                      </label>
                      <input
                        id="airName"
                        type="text"
                        placeholder="My First Event Name"
                        className={!nameValid ? 'error' : null}
                        value={name}
                        onChange={(e) => changeName(e)}
                      />
                    </div>
                  </div>
                  <div className="newlaunch-airdrop-page-inner-content-box-2-flex-inner-2">
                    <div className="">
                      <label className="newlaunch-airdrop-page-inner-content-box-2-flex-inner-2-description" htmlFor="des">
                        Description
                      </label>

                      <div className="mediaeyetextarea">
                        <textarea
                          id="des"
                          value={description}
                          className="mediaeyetextarea-input"
                          rows="5"
                          placeholder="My NFT Description, pattern of narrative development that aims to make vivid a place, object, character, or group."
                          onChange={(e) => changeDescription(e)}
                        ></textarea>
                      </div>
                    </div>
                    <div className="newlaunch-airdrop-page-inner-content-box-2-flex-inner-2-descp-col">
                      <div className="newlaunch-airdrop-page-inner-content-box-2-flex-inner-2-descp-col-embed">
                        <label className="newlaunch-airdrop-page-inner-content-box-2-flex-inner-2-descp-col-embed-label">
                          Embed Media
                        </label>
                        <div
                          className="mediaeyeinfo"
                          data-html={true}
                          data-class="mediaeyetooltip"
                          data-tip="Share from Vimeo, YouTube, GIPHY, SoundCloud, Spotify and more"
                          onChange={(e) => setEmbedMedia(e.target.value)}
                        >
                          <InfoCircle type="outline" />
                        </div>
                      </div>

                      <div className="mediaeyetextarea">
                        <textarea
                          className="mediaeyetextarea-input"
                          rows="5"
                          placeholder="Paste Embed Code"
                        // onChange={(e) => changeDescription(e)}
                        ></textarea>
                      </div>
                      {/* {!descriptionValid ? 'error' : null} */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="image-input newlaunch-airdrop-page-inner-content-box-3">
                <h5>Airdrop Appearance</h5>
                <div className="mediaeye-grid-box newlaunch-airdrop-page-inner-content-box-3-box-third-flex">
                  <div className="mediaeye-grid-box-inner newlaunch-airdrop-page-inner-content-box-3-box-third-flex-inner-1">
                    <label>Logo image</label>
                    <div className="newlaunch-airdrop-page-inner-content-box-3-box-third-flex-inner-1-round">
                      <label
                        className="newlaunch-airdrop-page-inner-content-box-3-box-third-flex-inner-1-round-label"
                        style={
                          logoURL
                            ? {
                              backgroundImage: `url(${logoURL})`,
                              backgroundSize: 'cover'
                            }
                            : {}
                        }
                      >
                        <input
                          type="file"
                          name="logo"
                          id="logo"
                          accept="image/png, image/gif, image/jpeg"
                          onChange={(e) => handleFileSelected(e)}
                        />{' '}
                        <span className="newlaunch-airdrop-page-inner-content-box-3-box-third-flex-inner-1-round-label-pen">
                          <EditAvatar />
                        </span>
                      </label>
                      {logoURL ? (
                        <button
                          className="close_img_btn"
                          onClick={(event) => {
                            event.stopPropagation();
                            setLogoURL(null);
                            setLogo(null);
                          }}
                        >
                          <Close />
                        </button>
                      ) : null}
                    </div>
                    <span>
                      140 x 140 JPEG, PNG <br></br> recommended.
                    </span>
                  </div>

                  <div className="mediaeye-grid-box-inner newlaunch-airdrop-page-inner-content-box-3-box-third-flex-inner-3">
                    <label>Banner image</label>
                    <div className="mediaeye-grid-box-inner newlaunch-airdrop-page-inner-content-box-3-box-third-flex-inner-3-input-image">
                      <label
                        style={
                          bannerURL
                            ? {
                              backgroundImage: `url(${bannerURL})`,
                              backgroundSize: 'cover'
                            }
                            : {}
                        }
                      >
                        <input
                          type="file"
                          id="banner"
                          accept="image/png, image/gif, image/jpeg"
                          onChange={(e) => handleFileSelected(e)}
                        />
                        <span className="newlaunch-airdrop-page-inner-content-pen-edit">
                          <EditAvatar />
                        </span>
                      </label>
                      {bannerURL ? (
                        <button
                          className="close_img_btn"
                          onClick={(event) => {
                            setBanner(null);
                            setBannerURL(null);
                            event.stopPropagation();
                          }}
                        >
                          <Close />
                        </button>
                      ) : null}
                    </div>
                    <span>
                      1500 x 240 JPEG, PNG <br></br> recommended.
                    </span>
                  </div>
                </div>
              </div>
              <div className="social-links newlaunch-airdrop-page-inner-content-box-4">
                <h5>Connect Social Media Accounts</h5>
                <div className="newlaunch-airdrop-page-inner-content-box-4-social-links-gridbox">
                  <div className="newlaunch-airdrop-page-inner-content-box-4-social-links-gridbox-web-link">
                    <div>
                      <Globe />
                    </div>
                    <span>Website</span>
                  </div>
                  <div className="newlaunch-airdrop-page-inner-content-box-4-social-links-gridbox-website-social">
                    <input
                      id="website"
                      onChange={(e) => handleLinkChange(e)}
                      value={links.website}
                    />

                    <button className="btn btn-info newlaunch-airdrop-page-inner-content-box-4-social-links-gridbox-website-social-website-add">
                      ADD
                    </button>
                  </div>
                </div>
                <div class="newlaunch-airdrop-page-inner-content-box-4-social-links-allsocial">
                  <div class="newlaunch-airdrop-page-inner-content-box-4-social-links-allsocial-inner">
                    <label class="newlaunch-airdrop-page-inner-content-box-4-social-links-allsocial-inner-social-label">
                      <div>
                        <Twitter />
                      </div>
                      <span>Twitter</span>
                    </label>
                    <button
                      type="button"
                      onClick={connecttwitter}
                      className="btn btn-info"
                      disabled={isUserUpdating}
                    >
                      CONNECT
                    </button>
                  </div>
                  <div class="newlaunch-airdrop-page-inner-content-box-4-social-links-allsocial-inner">
                    <label class="newlaunch-airdrop-page-inner-content-box-4-social-links-allsocial-inner-social-label">
                      <div>
                        <Discord />
                      </div>
                      <span>Discord</span>
                    </label>
                    <button
                      type="button"
                      onClick={connectdiscord}
                      className="btn btn-info"
                      disabled={isUserUpdating}
                    >
                      CONNECT
                    </button>
                  </div>
                  {openInput ? (
                    <div className="newlaunch-airdrop-page-inner-content-box-4-social-links-allsocial-inner-data">
                      <input
                        className="country-code"
                        value={countryCode}
                        onChange={getCountryCode}
                        placeholder="+1"
                      />
                      <input
                        className="mobileno-input"
                        value={phoneNo}
                        onChange={getPhoneNumber}
                        placeholder="Mobile Nu."
                      />

                      <button
                        type="button"
                        onClick={handleMobileNumber}
                        className="btn btn-info"
                        disabled={isUserUpdating}
                      >
                        <span>send</span>
                      </button>
                    </div>
                  ) : otpInput ? (
                    <div className="newlaunch-airdrop-page-inner-content-box-4-social-links-allsocial-inner-data">
                      <input
                        className="mobileno-input"
                        value={otp}
                        onChange={getYourOtp}
                        placeholder="OTP here"
                      />
                      <button
                        type="button"
                        onClick={handleYourOtp}
                        className="btn btn-info"
                        disabled={isUserUpdating}
                      >
                        <span>Submit</span>
                      </button>
                    </div>
                  ) : (
                    <div class="newlaunch-airdrop-page-inner-content-box-4-social-links-allsocial-inner">
                      <label class="newlaunch-airdrop-page-inner-content-box-4-social-links-allsocial-inner-social-label">
                        <div>
                          <Telegram />
                        </div>
                        <span>Telegram</span>
                      </label>
                      <button
                        type="button"
                        class="btn btn-info"
                        onClick={openMobileInput}
                        disabled={isUserUpdating}
                      >
                        Connect
                      </button>
                    </div>
                  )}

                  {userInstaInput ? (
                    <div className="newlaunch-airdrop-page-inner-content-box-4-social-links-allsocial-inner-data">
                      <input
                        className="insta-input"
                        value={instaUser}
                        onChange={(e) => setInstaUser(e.target.value)}
                        placeholder="Username"
                      />
                      <input
                        type="password"
                        className="insta-input"
                        value={instaPassword}
                        onChange={(e) => setInstaPassword(e.target.value)}
                        placeholder="Password"
                      />

                      <button
                        type="button"
                        className="btn btn-info"
                        disabled={isUserUpdating}
                        onClick={connectinstagram}
                      >
                        <span>Submit</span>
                      </button>
                    </div>
                  ) : (
                    <div class="newlaunch-airdrop-page-inner-content-box-4-social-links-allsocial-inner">
                      <label class="newlaunch-airdrop-page-inner-content-box-4-social-links-allsocial-inner-social-label">
                        <div>
                          <Instagram />
                        </div>
                        <span>Instagram</span>
                      </label>
                      <button
                        type="button"
                        class="btn btn-info"
                        disabled={isUserUpdating}
                        onClick={openInstaDetails}
                      >
                        Connect
                      </button>
                    </div>
                  )}
                  <div class="newlaunch-airdrop-page-inner-content-box-4-social-links-allsocial-inner">
                    <label class="newlaunch-airdrop-page-inner-content-box-4-social-links-allsocial-inner-social-label">
                      <div>
                        <Linkedin />
                      </div>
                      <span>LinkedIn</span>
                    </label>
                    <button
                      className="btn btn-info"
                      onClick={connectlinkedin}
                      disabled={isUserUpdating}
                    >
                      Connect
                    </button>
                  </div>
                  <div class="newlaunch-airdrop-page-inner-content-box-4-social-links-allsocial-inner">
                    <label class="newlaunch-airdrop-page-inner-content-box-4-social-links-allsocial-inner-social-label">
                      <div>
                        <Twitch />
                      </div>
                      <span>Twitch</span>
                    </label>
                    <button
                      type="button"
                      className="btn btn-info"
                      onClick={connecttwitch}
                      disabled={isUserUpdating}
                    >
                      Connect
                    </button>
                  </div>
                  <div class="newlaunch-airdrop-page-inner-content-box-4-social-links-allsocial-inner">
                    <label class="newlaunch-airdrop-page-inner-content-box-4-social-links-allsocial-inner-social-label">
                      <div>
                        <Spotify />
                      </div>
                      <span>Spotify</span>
                    </label>
                    <button
                      className="btn btn-info"
                      onClick={connectspotify}
                      disabled={isUserUpdating}
                    >
                      Connect
                    </button>
                  </div>
                  <div class="newlaunch-airdrop-page-inner-content-box-4-social-links-allsocial-inner">
                    <label class="newlaunch-airdrop-page-inner-content-box-4-social-links-allsocial-inner-social-label">
                      <div>
                        <Flickr />
                      </div>
                      <span>Flickr</span>
                    </label>
                    <button
                      className="btn btn-info"
                      onClick={connectflickr}
                      disabled={isUserUpdating}
                    >
                      Connect
                    </button>
                  </div>
                </div>
              </div>

              <div className="newlaunch-airdrop-page-inner-content-box-6">
                <h5>Airdrop Accessibility </h5>
                <div className="newlaunch-airdrop-page-inner-content-box-6-grid">
                  <button
                    className={accessibility === 'Private' ? 'active' : null}
                    value="Private"
                    onClick={() => setAccessibility('Private')}
                    type="button"
                  >
                    <img src="../img/private.png" alt="private" />
                    <div className="newlaunch-airdrop-page-inner-content-coin">
                      <h6>Private</h6>
                    </div>
                  </button>
                  <button
                    className={accessibility === 'Public' ? 'active' : null}
                    value="Public"
                    onClick={() => setAccessibility('Public')}
                    type="button"
                  >
                    <img src="../img/public.png" alt="public" />
                    <div className="newlaunch-airdrop-page-inner-content-coin">
                      <h6>Public</h6>
                    </div>
                  </button>
                </div>

                {accessibility == 'Private' ? (
                  <div className="newlaunch-airdrop-page-inner-content-box-6-private">
                    <h5>Choose whitelisting option</h5>
                    <div className="newlaunch-airdrop-page-inner-content-box-6-private-setting">
                      <Switch
                        checkedIcon={false}
                        uncheckedIcon={false}
                        onChange={() => {
                          setHidePromoCodes(!hidePromoCodes);
                        }}
                        checked={hidePromoCodes}
                        height={20}
                        width={40}
                      />
                      <label>Promo Codes</label>
                    </div>

                    {hidePromoCodes ? (
                      <div className="newlaunch-airdrop-page-inner-content-box-6-private-setting-number">
                        <span>Number of codes</span>
                        <div className="newlaunch-airdrop-page-inner-content-box-6-private-setting-number-box">
                          <input type="number" placeholder="100" min={0} />
                          <button className="btn btn-info">Generate</button>
                        </div>
                      </div>
                    ) : null}

                    <div className="newlaunch-airdrop-page-inner-content-box-6-private-setting">
                      <Switch
                        checkedIcon={false}
                        uncheckedIcon={false}
                        onChange={() => {
                          setHideUploadparticipants(!hideUploadparticipants);
                        }}
                        checked={hideUploadparticipants}
                        height={20}
                        width={40}
                      />
                      <label>
                        Upload participants{' '}
                        {activeNetwork === 'BSC' ? (
                          <>BEP</>
                        ) : activeNetwork === 'ETH' ? (
                          <>ERC</>
                        ) : activeNetwork === 'FTM' ? (
                          <>FTM</>
                        ) : null}
                        -20 compatible wallets
                      </label>
                    </div>

                    {hideUploadparticipants ? (
                      <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial">
                        <label htmlFor="upload" className="btn btn-info">
                          Upload CSV File
                        </label>{' '}
                        <input style={{ opacity: 0 }} type="file" id="upload" />
                      </div>
                    ) : null}

                    {/* {CollectionUserLevelFeatures()} */}
                  </div>
                ) : null}
              </div>

              <div className="newlaunch-airdrop-page-inner-content-box-1">
                <h5>Airdrop Type and Bounties </h5>
                <div className="newlaunch-airdrop-page-inner-content-box-1-inside">
                  <h6 className="">Blockchain</h6>
                  <div className="newlaunch-airdrop-page-inner-content-box-1-inside-grid">
                    <button
                      className={activeNetwork === 'ETH' ? 'active' : null}
                      onClick={async () => {
                        if (activeNetwork != 'ETH') {
                          await ChangeChainRequest('ETH');
                        }
                      }}
                    >
                      <img src={'/img/token/34/ETH.png'} alt="eth" />
                      <div className="newlaunch-airdrop-page-inner-content-coin">
                        <h6>ETH</h6>
                        <span>Ethereum</span>
                      </div>
                    </button>
                    <button
                      className={activeNetwork === 'BSC' ? 'active' : null}
                      onClick={async () => {
                        if (activeNetwork != 'BSC') {
                          await ChangeChainRequest('BSC');
                        }
                      }}
                    >
                      <img src="../img/bnb.png" alt="BSC" />
                      <div className="newlaunch-airdrop-page-inner-content-coin">
                        <h6>BSC</h6>
                        <span>Binance</span>
                      </div>
                    </button>
                    <button
                      className={activeNetwork === 'FTM' ? 'active' : null}
                      onClick={async () => {
                        if (activeNetwork != 'FTM') {
                          await ChangeChainRequest('FTM');
                        }
                      }}
                    >
                      <img
                        src="../img/ftm_md.png"
                        className="newlaunch-airdrop-page-inner-content-ftm-img"
                        alt="FTM"
                      />
                      <div className="newlaunch-airdrop-page-inner-content-coin">
                        <h6>FTM</h6>
                        <span>Fantom</span>
                      </div>
                    </button>
                  </div>
                </div>
                <div className="newlaunch-airdrop-page-inner-content-box-1-inside">
                  <h6 className="">Airdrop Type</h6>
                  <div className="newlaunch-airdrop-page-inner-content-box-1-inside-grid">
                    <button
                      className={airdropType === 'NFT' ? 'active' : null}
                      value="NFT"
                      onClick={() => setAirdropType('NFT')}
                      type="button"
                    >
                      <img
                        className="airdropimg"
                        src="../img/mount.png"
                        alt="nft mount"
                      />
                      <div className="newlaunch-airdrop-page-inner-content-coin">
                        <h6>NFT</h6>
                      </div>
                    </button>
                    <button
                      className={airdropType === 'Token' ? 'active' : null}
                      value="Token"
                      onClick={() => setAirdropType('Token')}
                      type="button"
                    >
                      <img
                        className="airdropimg"
                        src="../img/tokens.png"
                        alt="token"
                      />
                      <div className="newlaunch-airdrop-page-inner-content-coin">
                        <h6>Token</h6>
                      </div>
                    </button>
                  </div>
                </div>
                <div className="newlaunch-airdrop-page-inner-content-box-1-inside">
                  <h6 className="">Airdrop Category</h6>
                  <div className="newlaunch-airdrop-page-inner-content-box-1-inside-selectAirdrop">
                    <SelectSearch
                      className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style"
                      size="lg"
                      options={airdropCategories}
                      value={
                        airdropType === 'NFT'
                          ? airdropCategories[1]
                          : airdropCategories[0]
                      }
                    />
                  </div>
                </div>
                {airdropType === 'Token' ? (
                  <SelectTokenAddress
                    activeNetwork={activeNetwork}
                    participantAllocation={participantAllocation}
                    selectedToken={selectedToken}
                    totalAllocation={totalAllocation}
                    setSelectedToken={setSelectedToken}
                    setParticipantAllocation={setParticipantAllocation}
                    setTotalAllocation={setTotalAllocation}
                  />
                ) : null}

                {airdropType === 'NFT' ? (
                  <SelectNFTAddress
                    activeNetwork={activeNetwork}
                    participantAllocation={participantAllocation}
                    selectedToken={selectedToken}
                    totalAllocation={totalAllocation}
                    setSelectedToken={setSelectedToken}
                    setParticipantAllocation={setParticipantAllocation}
                    setTotalAllocation={setTotalAllocation}
                  />
                ) : null}
              </div>

              <div className="newlaunch-airdrop-page-inner-content-box-5">
                {/* <h5>Collection Settings</h5> */}
                <div className="newlaunch-airdrop-page-inner-content-box-5-setting">
                  <div className="newlaunch-airdrop-page-inner-content-box-5-setting-simple">
                    <Switch
                      checkedIcon={false}
                      uncheckedIcon={false}
                      onChange={() => {
                        setHideCollection(!hideCollection);
                      }}
                      checked={hideCollection}
                      height={20}
                      width={40}
                    />
                    <label>Airdrop Tasks</label>
                  </div>
                  <p className="newlaunch-airdrop-page-inner-content-box-5-setting-para">
                    Choose social media tasks to be completed by participants to
                    be able to claim the airdrop rewards.
                  </p>
                  {hideCollection ? (
                    <>
                      <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial">
                        <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-box-1">
                          <h4 className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-box-1-title">
                            Social Media Platforms
                          </h4>
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-box-1-inside">
                            <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-box-1-inside-group-platforms">
                              <button
                                value="twitter"
                                type="button"
                                onClick={() =>
                                  SocialMediaDropdownManage('twitter')
                                }
                                className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-box-1-inside-group twitter"
                              >
                                <Twitter />
                                <span className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-box-1-inside-group-name">
                                  TWITTER
                                </span>
                              </button>
                              {SocialMediaDropdown == 'twitter' ? (
                                <div className="social-media-dropdown">
                                  <div
                                    className="social-media-dropdown-value"
                                    data-dropdown="Follow_twitter"
                                    onClick={onClickSocialMediaDropdown}
                                  >
                                    Follow on Twitter
                                  </div>
                                  <div
                                    className="social-media-dropdown-value"
                                    data-dropdown="Retweet"
                                    onClick={onClickSocialMediaDropdown}
                                  >
                                    Retweet
                                  </div>
                                  <div
                                    className="social-media-dropdown-value"
                                    data-dropdown="Retweet_hashtag"
                                    onClick={onClickSocialMediaDropdown}
                                  >
                                    Retweet with a hashtag
                                  </div>
                                </div>
                              ) : null}
                            </div>
                            <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-box-1-inside-group-platforms">
                              <button
                                value="discord"
                                onClick={() =>
                                  SocialMediaDropdownManage('discord')
                                }
                                className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-box-1-inside-group discord"
                              >
                                <Discord />
                                <p className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-box-1-inside-group-name">
                                  DISCORD
                                </p>
                              </button>
                              {SocialMediaDropdown == 'discord' ? (
                                <div className="social-media-dropdown">
                                  <div
                                    className="social-media-dropdown-value"
                                    data-dropdown="join_discord"
                                    onClick={onClickSocialMediaDropdown}
                                  >
                                    Join a Channel
                                  </div>
                                </div>
                              ) : null}
                            </div>
                            <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-box-1-inside-group-platforms">
                              <button
                                value="instagram"
                                onClick={() =>
                                  SocialMediaDropdownManage('instagram')
                                }
                                className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-box-1-inside-group insta"
                              >
                                <Instagram />
                                <p className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-box-1-inside-group-name">
                                  INSTAGRAM
                                </p>
                              </button>
                              {SocialMediaDropdown == 'instagram' ? (
                                <div className="social-media-dropdown">
                                  <div
                                    className="social-media-dropdown-value"
                                    data-dropdown="Follow_instagram"
                                    onClick={onClickSocialMediaDropdown}
                                  >
                                    Follow on Instagram
                                  </div>
                                  <div
                                    className="social-media-dropdown-value"
                                    data-dropdown="like_instagram_post"
                                    onClick={onClickSocialMediaDropdown}
                                  >
                                    Like a post
                                  </div>
                                </div>
                              ) : null}
                            </div>
                            <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-box-1-inside-group-platforms">
                              <button
                                value="telegram"
                                onClick={() =>
                                  SocialMediaDropdownManage('telegram')
                                }
                                className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-box-1-inside-group telegram"
                              >
                                <Telegram />
                                <p className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-box-1-inside-group-name">
                                  TELEGRAM
                                </p>
                              </button>
                              {SocialMediaDropdown == 'telegram' ? (
                                <div className="social-media-dropdown">
                                  <div
                                    className="social-media-dropdown-value"
                                    data-dropdown="Join_telegram"
                                    onClick={onClickSocialMediaDropdown}
                                  >
                                    Join a Channel/Group
                                  </div>
                                  <div
                                    className="social-media-dropdown-value"
                                    data-dropdown="post_telegram"
                                    onClick={onClickSocialMediaDropdown}
                                  >
                                    View a post
                                  </div>
                                </div>
                              ) : null}
                            </div>
                            <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-box-1-inside-group-platforms">
                              <button
                                value="reddit"
                                onClick={() =>
                                  SocialMediaDropdownManage('reddit')
                                }
                                className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-box-1-inside-group reddit"
                              >
                                <Reddit />
                                <p className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-box-1-inside-group-name">
                                  REDDIT
                                </p>
                              </button>
                              {SocialMediaDropdown == 'reddit' ? (
                                <div className="social-media-dropdown">
                                  <div
                                    className="social-media-dropdown-value"
                                    data-dropdown="join_community_reddit"
                                    onClick={onClickSocialMediaDropdown}
                                  >
                                    Join a Community
                                  </div>
                                  <div
                                    className="social-media-dropdown-value"
                                    data-dropdown="save_post_reddit"
                                    onClick={onClickSocialMediaDropdown}
                                  >
                                    Save a post
                                  </div>
                                  <div
                                    className="social-media-dropdown-value"
                                    data-dropdown="comment_post_reddit"
                                    onClick={onClickSocialMediaDropdown}
                                  >
                                    Comment a post
                                  </div>
                                </div>
                              ) : null}
                            </div>
                            <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-box-1-inside-group-platforms">
                              <button
                                value="tumbler"
                                onClick={() =>
                                  SocialMediaDropdownManage('tumbler')
                                }
                                className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-box-1-inside-group tumbler"
                              >
                                <Tumbler />
                                <p className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-box-1-inside-group-name">
                                  TUMBLER
                                </p>
                              </button>
                              {SocialMediaDropdown == 'tumbler' ? (
                                <div className="social-media-dropdown">
                                  <div
                                    className="social-media-dropdown-value"
                                    data-dropdown="Follow_Tumbler"
                                    onClick={onClickSocialMediaDropdown}
                                  >
                                    Follow on Tumbler
                                  </div>
                                  <div
                                    className="social-media-dropdown-value"
                                    data-dropdown="Like_Tumbler"
                                    onClick={onClickSocialMediaDropdown}
                                  >
                                    Like a post
                                  </div>
                                  <div
                                    className="social-media-dropdown-value"
                                    data-dropdown="Comment_Tumbler"
                                    onClick={onClickSocialMediaDropdown}
                                  >
                                    Comment a post
                                  </div>
                                </div>
                              ) : null}
                            </div>
                            <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-box-1-inside-group-platforms">
                              <button
                                value="linkedin"
                                onClick={() =>
                                  SocialMediaDropdownManage('linkedin')
                                }
                                className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-box-1-inside-group linkedin"
                              >
                                <Linkedin />
                                <p className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-box-1-inside-group-name">
                                  LINKEDIN
                                </p>
                              </button>
                              {SocialMediaDropdown == 'linkedin' ? (
                                <div className="social-media-dropdown">
                                  <div
                                    className="social-media-dropdown-value"
                                    data-dropdown="Follow_linkedin"
                                    onClick={onClickSocialMediaDropdown}
                                  >
                                    Follow on LinkedIn
                                  </div>
                                </div>
                              ) : null}
                            </div>
                            <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-box-1-inside-group-platforms">
                              <button
                                value="flicker"
                                onClick={() =>
                                  SocialMediaDropdownManage('flicker')
                                }
                                className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-box-1-inside-group flicker"
                              >
                                <Flickr />
                                <p className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-box-1-inside-group-name">
                                  FLICKER
                                </p>
                              </button>
                              {SocialMediaDropdown == 'flicker' ? (
                                <div className="social-media-dropdown">
                                  <div
                                    className="social-media-dropdown-value"
                                    data-dropdown="join_flicker"
                                    onClick={onClickSocialMediaDropdown}
                                  >
                                    Follow on Flicker
                                  </div>
                                  <div
                                    className="social-media-dropdown-value"
                                    data-dropdown="like_photo_flicker"
                                    onClick={onClickSocialMediaDropdown}
                                  >
                                    Like a photo
                                  </div>
                                  <div
                                    className="social-media-dropdown-value"
                                    data-dropdown="comment_photo_flicker"
                                    onClick={onClickSocialMediaDropdown}
                                  >
                                    Comment a photo
                                  </div>
                                </div>
                              ) : null}
                            </div>

                            <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-box-1-inside-group-platforms">
                              <button
                                value="snapchat"
                                onClick={() =>
                                  SocialMediaDropdownManage('snapchat')
                                }
                                className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-box-1-inside-group snapchat"
                              >
                                <Snapchat />
                                <p className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-box-1-inside-group-name">
                                  SNAPCHAT
                                </p>
                              </button>
                              {SocialMediaDropdown == 'snapchat' ? (
                                <div className="social-media-dropdown">
                                  <div
                                    className="social-media-dropdown-value"
                                    data-dropdown="join_snapchat"
                                    onClick={onClickSocialMediaDropdown}
                                  >
                                    Follow on Snapchat
                                  </div>
                                </div>
                              ) : null}
                            </div>

                            <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-box-1-inside-group-platforms">
                              <button
                                value="tiktok"
                                onClick={() =>
                                  SocialMediaDropdownManage('tiktok')
                                }
                                className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-box-1-inside-group tiktok"
                              >
                                <Tiktok />
                                <p className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-box-1-inside-group-name">
                                  TIKTOK
                                </p>
                              </button>
                              {SocialMediaDropdown == 'tiktok' ? (
                                <div className="social-media-dropdown">
                                  <div
                                    className="social-media-dropdown-value"
                                    data-dropdown="join_tiktok"
                                    onClick={onClickSocialMediaDropdown}
                                  >
                                    Follow on TikTok
                                  </div>
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                        <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-box-2">
                          <h4 className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-box-2-title">
                            Video and live streaming
                          </h4>
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-box-2-inside">
                            <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-box-2-inside-group-platforms">
                              <button
                                value="twitch"
                                onClick={() =>
                                  SocialMediaDropdownManage('twitch')
                                }
                                className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-box-2-inside-group twitch"
                              >
                                <Twitch />
                                <p className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-box-2-inside-group-name">
                                  TWITCH
                                </p>
                              </button>
                              {SocialMediaDropdown == 'twitch' ? (
                                <div className="social-media-dropdown">
                                  <div
                                    className="social-media-dropdown-value"
                                    data-dropdown="Follow_Twitch"
                                    onClick={onClickSocialMediaDropdown}
                                  >
                                    Follow on Twitch
                                  </div>
                                  <div
                                    className="social-media-dropdown-value"
                                    data-dropdown="VideoList_Twitch"
                                    onClick={onClickSocialMediaDropdown}
                                  >
                                    Watch a Featured Videolist
                                  </div>
                                </div>
                              ) : null}
                            </div>
                            <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-box-2-inside-group-platforms">
                              <button
                                value="youtube"
                                onClick={() =>
                                  SocialMediaDropdownManage('youtube')
                                }
                                className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-box-2-inside-group youtube"
                              >
                                <YouTube />
                                <p className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-box-2-inside-group-name">
                                  YOUTUBE
                                </p>
                              </button>
                              {SocialMediaDropdown == 'youtube' ? (
                                <div className="social-media-dropdown">
                                  <div
                                    className="social-media-dropdown-value"
                                    data-dropdown="Subscribe_youtube"
                                    onClick={onClickSocialMediaDropdown}
                                  >
                                    Subscribe on YouTube
                                  </div>
                                  <div
                                    className="social-media-dropdown-value"
                                    data-dropdown="like_youtube_video"
                                    onClick={onClickSocialMediaDropdown}
                                  >
                                    Like a video
                                  </div>
                                  <div
                                    className="social-media-dropdown-value"
                                    data-dropdown="comment_youtube_video"
                                    onClick={onClickSocialMediaDropdown}
                                  >
                                    Comment a video
                                  </div>
                                </div>
                              ) : null}
                            </div>
                            <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-box-2-inside-group-platforms">
                              <button
                                value="vimeo"
                                onClick={() =>
                                  SocialMediaDropdownManage('vimeo')
                                }
                                className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-box-2-inside-group vimeo"
                              >
                                <Vimeo />
                                <p className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-box-2-inside-group-name">
                                  VIMEO
                                </p>
                              </button>
                              {SocialMediaDropdown == 'vimeo' ? (
                                <div className="social-media-dropdown">
                                  <div
                                    className="social-media-dropdown-value"
                                    data-dropdown="Follow_vimeo"
                                    onClick={onClickSocialMediaDropdown}
                                  >
                                    Follow a Channel
                                  </div>
                                  <div
                                    className="social-media-dropdown-value"
                                    data-dropdown="like_vimeo_video"
                                    onClick={onClickSocialMediaDropdown}
                                  >
                                    Like a video
                                  </div>
                                </div>
                              ) : null}
                            </div>
                            <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-box-2-inside-group-platforms">
                              <button
                                value="spotify"
                                onClick={() =>
                                  SocialMediaDropdownManage('spotify')
                                }
                                className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-box-2-inside-group spotify"
                              >
                                <Spotify />
                                <p className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-box-2-inside-group-name">
                                  SPOTIFY
                                </p>
                              </button>
                              {SocialMediaDropdown == 'spotify' ? (
                                <div className="social-media-dropdown">
                                  <div
                                    className="social-media-dropdown-value"
                                    data-dropdown="Follow_spotify"
                                    onClick={onClickSocialMediaDropdown}
                                  >
                                    Follow on Spotify
                                  </div>
                                  <div
                                    className="social-media-dropdown-value"
                                    data-dropdown="like_song_spotify"
                                    onClick={onClickSocialMediaDropdown}
                                  >
                                    Like a song
                                  </div>
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                        <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-box-3">
                          <h4 className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-box-3-title">
                            Event managemenet and Newsletter services
                          </h4>
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-box-3-inside">
                            <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-box-3-inside-group-platforms">
                              <button
                                value="mailchimp"
                                onClick={() =>
                                  SocialMediaDropdownManage('mailchimp')
                                }
                                className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-box-3-inside-group mailchimp"
                              >
                                <Mailchimp />
                                <p className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-box-3-inside-group-name">
                                  MAILCHIMP
                                </p>
                              </button>
                              {SocialMediaDropdown == 'mailchimp' ? (
                                <div className="social-media-dropdown">
                                  <div
                                    className="social-media-dropdown-value"
                                    data-dropdown="Subscribe_Malichimp"
                                    onClick={onClickSocialMediaDropdown}
                                  >
                                    Subscribe on Malichimp
                                  </div>
                                </div>
                              ) : null}
                            </div>
                            <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-box-3-inside-group-platforms">
                              <button
                                value="hubspot"
                                onClick={() =>
                                  SocialMediaDropdownManage('hubspot')
                                }
                                className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-box-3-inside-group hubspot"
                              >
                                <Hubspot />
                                <p className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-box-3-inside-group-name">
                                  HUBSPOT
                                </p>
                              </button>
                              {SocialMediaDropdown == 'hubspot' ? (
                                <div className="social-media-dropdown">
                                  <div
                                    className="social-media-dropdown-value"
                                    data-dropdown="Subscribe_Hubspot"
                                    onClick={onClickSocialMediaDropdown}
                                  >
                                    Subscribe on Hubspot
                                  </div>
                                </div>
                              ) : null}
                            </div>
                            <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-box-3-inside-group-platforms">
                              <button
                                value="sendgrid"
                                onClick={() =>
                                  SocialMediaDropdownManage('sendgrid')
                                }
                                className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-box-3-inside-group sendgrid"
                              >
                                <Sendgrid />
                                <p className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-box-3-inside-group-name">
                                  SENDGRID
                                </p>
                              </button>
                              {SocialMediaDropdown == 'sendgrid' ? (
                                <div className="social-media-dropdown">
                                  <div
                                    className="social-media-dropdown-value"
                                    data-dropdown="Subscribe_Sendgrid"
                                    onClick={onClickSocialMediaDropdown}
                                  >
                                    Subscribe on Sendgrid
                                  </div>
                                </div>
                              ) : null}
                            </div>
                            <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-box-3-inside-group-platforms">
                              <button
                                value="eventbrite"
                                onClick={() =>
                                  SocialMediaDropdownManage('eventbrite')
                                }
                                className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-box-3-inside-group eventbrite"
                              >
                                <Eventbrite />
                                <p className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-box-3-inside-group-name">
                                  EVENTBRITE
                                </p>
                              </button>
                              {SocialMediaDropdown == 'eventbrite' ? (
                                <div className="social-media-dropdown">
                                  <div
                                    className="social-media-dropdown-value"
                                    data-dropdown="Attend_Eventbrite"
                                    onClick={onClickSocialMediaDropdown}
                                  >
                                    Attend an Event
                                  </div>
                                </div>
                              ) : null}
                            </div>
                            <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-box-3-inside-group-platforms">
                              <button
                                value="medium"
                                onClick={() =>
                                  SocialMediaDropdownManage('medium')
                                }
                                className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-box-3-inside-group medium"
                              >
                                <Medium />
                                <p className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-box-3-inside-group-name">
                                  MEDIUM
                                </p>
                              </button>
                              {SocialMediaDropdown == 'medium' ? (
                                <div className="social-media-dropdown">
                                  <div
                                    className="social-media-dropdown-value"
                                    data-dropdown="Follow_medium"
                                    onClick={onClickSocialMediaDropdown}
                                  >
                                    Follow on Medium
                                  </div>
                                  <div
                                    className="social-media-dropdown-value"
                                    data-dropdown="like_post_medium"
                                    onClick={onClickSocialMediaDropdown}
                                  >
                                    Clap/Like a Post
                                  </div>
                                  <div
                                    className="social-media-dropdown-value"
                                    data-dropdown="comment_medium"
                                    onClick={onClickSocialMediaDropdown}
                                  >
                                    Comment a Post
                                  </div>
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>
                      {OpenSocialMediaDropdownBox == 'Follow_twitter' ? (
                        <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia singlebox">
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft">
                            <button className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-button btn ttr">
                              Twitter
                            </button>
                            <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title">
                              <label className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-label">
                                Username
                              </label>
                              <input
                                className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-input"
                                type="text"
                                placeholder="Enter Username"
                                value={TwitterUsername}
                                onChange={(e) => {
                                  setTwitterUsername(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight">
                            <button
                              className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight-button btn btn-info"
                              onClick={() => {
                                TwitterUsernameValue(
                                  OpenSocialMediaDropdownBox
                                );
                              }}
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      ) : null}
                      {OpenSocialMediaDropdownBox == 'Retweet' ? (
                        <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia singlebox">
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft">
                            <button className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-button btn ttr">
                              Twitter
                            </button>
                            <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title">
                              <label className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-label">
                                Tweet Post URL
                              </label>
                              <input
                                className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-input"
                                type="text"
                                placeholder="Enter Post URL"
                                value={ReweetUsername}
                                onChange={(e) => {
                                  setReweetUsername(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight">
                            <button
                              className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight-button btn btn-info"
                              onClick={() => {
                                TwitterUsernameValue(
                                  OpenSocialMediaDropdownBox
                                );
                              }}
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      ) : null}
                      {OpenSocialMediaDropdownBox == 'Retweet_hashtag' ? (
                        <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia">
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft">
                            <button className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-button btn ttr">
                              Twitter
                            </button>
                            <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title">
                              <label className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-label">
                                Tweet Post URL
                              </label>
                              <input
                                className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-input"
                                type="text"
                                placeholder="Enter Post URL"
                              />
                            </div>
                          </div>
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight">
                            <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight-url">
                              <label className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight-url-label">
                                Hashtag URL
                              </label>
                              <input
                                className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight-url-input"
                                type="text"
                                placeholder="Enter URL"
                              />
                            </div>
                            <button className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight-button btn btn-info">
                              Save
                            </button>
                          </div>
                        </div>
                      ) : null}
                      {OpenSocialMediaDropdownBox == 'Follow_instagram' ? (
                        <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia singlebox">
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft">
                            <button className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-button btn inst">
                              Instagram
                            </button>
                            <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title">
                              <label className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-label">
                                User ID
                              </label>
                              <input
                                className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-input"
                                type="text"
                                placeholder="Enter User ID"
                              />
                            </div>
                          </div>
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight">
                            <button className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight-button btn btn-info">
                              Save
                            </button>
                          </div>
                        </div>
                      ) : null}
                      {OpenSocialMediaDropdownBox == 'like_instagram_post' ? (
                        <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia singlebox">
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft">
                            <button className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-button btn inst">
                              Instagram
                            </button>
                            <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title">
                              <label className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-label">
                                Post Link
                              </label>
                              <input
                                className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-input"
                                type="text"
                                placeholder="Enter Post Media ID"
                              />
                            </div>
                          </div>
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight">
                            <button className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight-button btn btn-info">
                              Save
                            </button>
                          </div>
                        </div>
                      ) : null}
                      {OpenSocialMediaDropdownBox == 'Subscribe_youtube' ? (
                        <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia singlebox">
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft">
                            <button className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-button btn yt">
                              YouTube
                            </button>
                            <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title">
                              <label className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-label">
                                Channel ID
                              </label>
                              <input
                                className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-input"
                                type="text"
                                placeholder="Enter Channel ID"
                              />
                            </div>
                          </div>
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight">
                            <button className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight-button btn btn-info">
                              Save
                            </button>
                          </div>
                        </div>
                      ) : null}
                      {OpenSocialMediaDropdownBox == 'like_youtube_video' ? (
                        <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia singlebox">
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft">
                            <button className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-button btn yt">
                              YouTube
                            </button>
                            <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title">
                              <label className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-label">
                                Video ID
                              </label>
                              <input
                                className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-input"
                                type="text"
                                placeholder="Enter Video ID"
                              />
                            </div>
                          </div>
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight">
                            <button className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight-button btn btn-info">
                              Save
                            </button>
                          </div>
                        </div>
                      ) : null}
                      {OpenSocialMediaDropdownBox == 'comment_youtube_video' ? (
                        <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia singlebox">
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft">
                            <button className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-button btn yt">
                              YouTube
                            </button>
                            <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title">
                              <label className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-label">
                                Video ID
                              </label>
                              <input
                                className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-input"
                                type="text"
                                placeholder="Enter Video ID"
                              />
                            </div>
                          </div>
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight">
                            <button className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight-button btn btn-info">
                              Save
                            </button>
                          </div>
                        </div>
                      ) : null}
                      {OpenSocialMediaDropdownBox == 'join_community_reddit' ? (
                        <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia singlebox">
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft">
                            <button className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-button btn rdt">
                              Reddit
                            </button>
                            <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title">
                              <label className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-label">
                                Community Username
                              </label>
                              <input
                                className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-input"
                                type="text"
                                placeholder="Enter Community Username"
                              />
                            </div>
                          </div>
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight">
                            <button className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight-button btn btn-info">
                              Save
                            </button>
                          </div>
                        </div>
                      ) : null}
                      {OpenSocialMediaDropdownBox == 'save_post_reddit' ? (
                        <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia singlebox">
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft">
                            <button className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-button btn rdt">
                              Reddit
                            </button>
                            <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title">
                              <label className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-label">
                                Post ID
                              </label>
                              <input
                                className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-input"
                                type="text"
                                placeholder="Enter Post ID"
                              />
                            </div>
                          </div>
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight">
                            <button className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight-button btn btn-info">
                              Save
                            </button>
                          </div>
                        </div>
                      ) : null}
                      {OpenSocialMediaDropdownBox == 'comment_post_reddit' ? (
                        <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia singlebox">
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft">
                            <button className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-button btn rdt">
                              Reddit
                            </button>
                            <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title">
                              <label className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-label">
                                Post ID
                              </label>
                              <input
                                className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-input"
                                type="text"
                                placeholder="Enter Post ID"
                              />
                            </div>
                          </div>
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight">
                            <button className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight-button btn btn-info">
                              Save
                            </button>
                          </div>
                        </div>
                      ) : null}
                      {OpenSocialMediaDropdownBox == 'join_discord' ? (
                        <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia singlebox">
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft">
                            <button className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-button btn dis">
                              Discord
                            </button>
                            <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title">
                              <label className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-label">
                                Post ID
                              </label>
                              <input
                                className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-input"
                                type="text"
                                placeholder="Enter Post ID"
                              />
                            </div>
                          </div>
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight">
                            <button className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight-button btn btn-info">
                              Save
                            </button>
                          </div>
                        </div>
                      ) : null}
                      {OpenSocialMediaDropdownBox == 'Follow_Twitch' ? (
                        <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia singlebox">
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft">
                            <button className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-button btn twt">
                              Twitch
                            </button>
                            <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title">
                              <label className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-label">
                                Page URL
                              </label>
                              <input
                                className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-input"
                                type="text"
                                placeholder="Enter Page URL"
                              />
                            </div>
                          </div>
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight">
                            <button className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight-button btn btn-info">
                              Save
                            </button>
                          </div>
                        </div>
                      ) : null}
                      {OpenSocialMediaDropdownBox == 'VideoList_Twitch' ? (
                        <>
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia singlebox">
                            <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft">
                              <button className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-button btn twt">
                                Twitch
                              </button>
                              <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title">
                                <label className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-label">
                                  Video URL
                                </label>
                                <input
                                  className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-input"
                                  type="text"
                                  placeholder="Enter Video URL"
                                />
                              </div>
                            </div>
                            <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight">
                              <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight-plusbtn">
                                <button
                                  onClick={() =>
                                    addVideoListTwitch('addVideolist')
                                  }
                                  className=""
                                >
                                  +
                                </button>
                              </div>
                              <button className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight-button btn btn-info">
                                Save
                              </button>
                            </div>
                          </div>
                          {test()}
                        </>
                      ) : null}
                      {OpenSocialMediaDropdownBox == 'Join_telegram' ? (
                        <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia singlebox">
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft">
                            <button className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-button btn tel">
                              Telegram
                            </button>
                            <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title">
                              <label className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-label">
                                Channel URL
                              </label>
                              <input
                                className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-input"
                                type="text"
                                placeholder="Enter Channel URL"
                              />
                            </div>
                          </div>
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight">
                            <button className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight-button btn btn-info">
                              Save
                            </button>
                          </div>
                        </div>
                      ) : null}
                      {OpenSocialMediaDropdownBox == 'post_telegram' ? (
                        <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia singlebox">
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft">
                            <button className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-button btn tel">
                              Telegram
                            </button>
                            <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title">
                              <label className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-label">
                                Post Line
                              </label>
                              <input
                                className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-input"
                                type="text"
                                placeholder="Enter Post Line"
                              />
                            </div>
                          </div>
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight">
                            <button className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight-button btn btn-info">
                              Save
                            </button>
                          </div>
                        </div>
                      ) : null}
                      {OpenSocialMediaDropdownBox == 'Follow_Tumbler' ? (
                        <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia singlebox">
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft">
                            <button className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-button btn tmb">
                              Tumbler
                            </button>
                            <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title">
                              <label className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-label">
                                Page Username
                              </label>
                              <input
                                className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-input"
                                type="text"
                                placeholder="Enter Username"
                              />
                            </div>
                          </div>
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight">
                            <button className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight-button btn btn-info">
                              Save
                            </button>
                          </div>
                        </div>
                      ) : null}
                      {OpenSocialMediaDropdownBox == 'Like_Tumbler' ? (
                        <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia">
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft">
                            <button className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-button btn tmb">
                              Tumbler
                            </button>
                            <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title">
                              <label className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-label">
                                Post ID
                              </label>
                              <input
                                className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-input"
                                type="text"
                                placeholder="Enter Post ID"
                              />
                            </div>
                          </div>
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight">
                            <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight-url">
                              <label className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight-url-label">
                                Reblog Key
                              </label>
                              <input
                                className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight-url-input"
                                type="text"
                                placeholder="Enter Key"
                              />
                            </div>
                            <button className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight-button btn btn-info">
                              Save
                            </button>
                          </div>
                        </div>
                      ) : null}
                      {OpenSocialMediaDropdownBox == 'Comment_Tumbler' ? (
                        <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia">
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft">
                            <button className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-button btn tmb">
                              Tumbler
                            </button>
                            <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title">
                              <label className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-label">
                                Post ID
                              </label>
                              <input
                                className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-input"
                                type="text"
                                placeholder="Enter Post ID"
                              />
                            </div>
                            <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title">
                              <label className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-label">
                                Username
                              </label>
                              <input
                                className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-input"
                                type="text"
                                placeholder="Enter Username"
                              />
                            </div>
                          </div>

                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight">
                            <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight-url">
                              <label className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight-url-label">
                                Reblog Key
                              </label>
                              <input
                                className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight-url-input"
                                type="text"
                                placeholder="Enter Key"
                              />
                            </div>
                            <button className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight-button btn btn-info">
                              Save
                            </button>
                          </div>
                        </div>
                      ) : null}
                      {OpenSocialMediaDropdownBox == 'Follow_vimeo' ? (
                        <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia singlebox">
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft">
                            <button className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-button btn vim">
                              Vimeo
                            </button>
                            <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title">
                              <label className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-label">
                                User ID
                              </label>
                              <input
                                className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-input"
                                type="text"
                                placeholder="Enter User ID"
                              />
                            </div>
                          </div>
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight">
                            <button className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight-button btn btn-info">
                              Save
                            </button>
                          </div>
                        </div>
                      ) : null}
                      {OpenSocialMediaDropdownBox == 'like_vimeo_video' ? (
                        <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia singlebox">
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft">
                            <button className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-button btn vim">
                              Vimeo
                            </button>
                            <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title">
                              <label className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-label">
                                Video ID
                              </label>
                              <input
                                className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-input"
                                type="text"
                                placeholder="Enter Video ID"
                              />
                            </div>
                          </div>
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight">
                            <button className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight-button btn btn-info">
                              Save
                            </button>
                          </div>
                        </div>
                      ) : null}
                      {OpenSocialMediaDropdownBox == 'Follow_linkedin' ? (
                        <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia singlebox">
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft">
                            <button className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-button btn lkd">
                              Linkedin
                            </button>
                            <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title">
                              <label className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-label">
                                Company Page ID
                              </label>
                              <input
                                className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-input"
                                type="text"
                                placeholder="Enter Company Page ID"
                              />
                            </div>
                          </div>
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight">
                            <button className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight-button btn btn-info">
                              Save
                            </button>
                          </div>
                        </div>
                      ) : null}
                      {OpenSocialMediaDropdownBox == 'Follow_spotify' ? (
                        <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia">
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft">
                            <button className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-button btn spt">
                              Spotify
                            </button>
                            <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title">
                              <label className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-label">
                                Username
                              </label>
                              <input
                                className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-input"
                                type="text"
                                placeholder="Enter Username"
                              />
                            </div>
                          </div>
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight">
                            <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight-url">
                              <label className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight-url-label">
                                Type
                              </label>
                              <SelectSearch
                                className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style"
                                size="lg"
                                options={typeSpotify}
                                value={activeTypeSpotify}
                                placeholder={activeTypeSpotify}
                                onChange={(opt) => setActiveTypeSpotify(opt)}
                              />
                            </div>
                            <button className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight-button btn btn-info">
                              Save
                            </button>
                          </div>
                        </div>
                      ) : null}
                      {OpenSocialMediaDropdownBox == 'like_song_spotify' ? (
                        <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia singlebox">
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft">
                            <button className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-button btn spt">
                              Spotify
                            </button>
                            <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title">
                              <label className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-label">
                                Podcast ID
                              </label>
                              <input
                                className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-input"
                                type="text"
                                placeholder="Enter Podcast ID"
                              />
                            </div>
                          </div>
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight">
                            <button className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight-button btn btn-info">
                              Save
                            </button>
                          </div>
                        </div>
                      ) : null}
                      {OpenSocialMediaDropdownBox == 'join_flicker' ? (
                        <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia singlebox">
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft">
                            <button className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-button btn flk">
                              Flicker
                            </button>
                            <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title">
                              <label className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-label">
                                User ID
                              </label>
                              <input
                                className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-input"
                                type="text"
                                placeholder="Enter User ID"
                              />
                            </div>
                          </div>
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight">
                            <button className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight-button btn btn-info">
                              Save
                            </button>
                          </div>
                        </div>
                      ) : null}
                      {OpenSocialMediaDropdownBox == 'like_photo_flicker' ? (
                        <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia singlebox">
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft">
                            <button className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-button btn flk">
                              Flicker
                            </button>
                            <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title">
                              <label className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-label">
                                Photo ID
                              </label>
                              <input
                                className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-input"
                                type="text"
                                placeholder="Enter Photo ID"
                              />
                            </div>
                          </div>
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight">
                            <button className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight-button btn btn-info">
                              Save
                            </button>
                          </div>
                        </div>
                      ) : null}
                      {OpenSocialMediaDropdownBox == 'comment_photo_flicker' ? (
                        <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia singlebox">
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft">
                            <button className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-button btn flk">
                              Flicker
                            </button>
                            <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title">
                              <label className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-label">
                                Photo ID
                              </label>
                              <input
                                className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-input"
                                type="text"
                                placeholder="Enter Photo ID"
                              />
                            </div>
                          </div>
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight">
                            <button className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight-button btn btn-info">
                              Save
                            </button>
                          </div>
                        </div>
                      ) : null}
                      {OpenSocialMediaDropdownBox == 'Subscribe_Hubspot' ? (
                        <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia singlebox">
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft">
                            <button className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-button btn hub">
                              Hubspot
                            </button>
                            <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title">
                              <label className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-label">
                                API Key
                              </label>
                              <input
                                className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-input"
                                type="text"
                                placeholder="Enter API Key"
                              />
                            </div>
                          </div>
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight">
                            <button className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight-button btn btn-info">
                              Save
                            </button>
                          </div>
                        </div>
                      ) : null}
                      {OpenSocialMediaDropdownBox == 'Subscribe_Malichimp' ? (
                        <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia">
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft">
                            <button className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-button btn mcp">
                              Malichimp
                            </button>
                            <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title">
                              <label className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-label">
                                API Key
                              </label>
                              <input
                                className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-input"
                                type="text"
                                placeholder="Enter API Key"
                              />
                            </div>
                          </div>
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight">
                            <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight-url">
                              <label className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight-url-label">
                                Choose List
                              </label>
                              <SelectSearch
                                className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style"
                                size="lg"
                                options={listMalichimp}
                                value={activeListMalichimp}
                                placeholder={activeListMalichimp}
                                onChange={(opt) => setActiveListMalichimp(opt)}
                              />
                            </div>
                            <button className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight-button btn btn-info">
                              Save
                            </button>
                          </div>
                        </div>
                      ) : null}
                      {OpenSocialMediaDropdownBox == 'Subscribe_Sendgrid' ? (
                        <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia">
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft">
                            <button className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-button btn sng">
                              Sendgrid
                            </button>
                            <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title">
                              <label className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-label">
                                API Key
                              </label>
                              <input
                                className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-input"
                                type="text"
                                placeholder="Enter API Key"
                              />
                            </div>
                          </div>
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight">
                            <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight-url">
                              <label className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight-url-label">
                                Choose List
                              </label>
                              <SelectSearch
                                className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style"
                                size="lg"
                                options={listSendgrid}
                                value={activeListSendgrid}
                                placeholder={activeListSendgrid}
                                onChange={(opt) => setActiveListSendgrid(opt)}
                              />
                            </div>
                            <button className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight-button btn btn-info">
                              Save
                            </button>
                          </div>
                        </div>
                      ) : null}
                      {OpenSocialMediaDropdownBox == 'Attend_Eventbrite' ? (
                        <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia singlebox">
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft">
                            <button className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-button btn evt">
                              Eventbrite
                            </button>
                            <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title">
                              <label className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-label">
                                Event ID
                              </label>
                              <input
                                className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-input"
                                type="text"
                                placeholder="Enter Event ID"
                              />
                            </div>
                          </div>
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight">
                            <button className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight-button btn btn-info">
                              Save
                            </button>
                          </div>
                        </div>
                      ) : null}
                      {OpenSocialMediaDropdownBox == 'join_snapchat' ? (
                        <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia singlebox">
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft">
                            <button className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-button btn snap">
                              SNAPCHAT
                            </button>
                            <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title">
                              <label className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-label">
                                User name
                              </label>
                              <input
                                className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-input"
                                type="text"
                                placeholder="Enter User name"
                              />
                            </div>
                          </div>
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight">
                            <button className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight-button btn btn-info">
                              Save
                            </button>
                          </div>
                        </div>
                      ) : null}
                      {OpenSocialMediaDropdownBox == 'join_tiktok' ? (
                        <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia singlebox">
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft">
                            <button className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-button btn tik">
                              TIKTOK
                            </button>
                            <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title">
                              <label className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-label">
                                User name
                              </label>
                              <input
                                className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-input"
                                type="text"
                                placeholder="Enter User name"
                              />
                            </div>
                          </div>
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight">
                            <button className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight-button btn btn-info">
                              Save
                            </button>
                          </div>
                        </div>
                      ) : null}
                      {OpenSocialMediaDropdownBox == 'Follow_medium' ? (
                        <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia singlebox">
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft">
                            <button className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-button btn med">
                              MEDIUM
                            </button>
                            <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title">
                              <label className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-label">
                                User name
                              </label>
                              <input
                                className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-input"
                                type="text"
                                placeholder="Enter User name"
                              />
                            </div>
                          </div>
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight">
                            <button className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight-button btn btn-info">
                              Save
                            </button>
                          </div>
                        </div>
                      ) : null}
                      {OpenSocialMediaDropdownBox == 'like_post_medium' ? (
                        <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia singlebox">
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft">
                            <button className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-button btn med">
                              MEDIUM
                            </button>
                            <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title">
                              <label className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-label">
                                Post Link
                              </label>
                              <input
                                className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-input"
                                type="text"
                                placeholder="Enter Post Link"
                              />
                            </div>
                          </div>
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight">
                            <button className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight-button btn btn-info">
                              Save
                            </button>
                          </div>
                        </div>
                      ) : null}
                      {OpenSocialMediaDropdownBox == 'comment_medium' ? (
                        <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia singlebox">
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft">
                            <button className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-button btn med">
                              MEDIUM
                            </button>
                            <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title">
                              <label className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-label">
                                Post Link
                              </label>
                              <input
                                className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-title-input"
                                type="text"
                                placeholder="Enter Post Link"
                              />
                            </div>
                          </div>
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight">
                            <button className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight-button btn btn-info">
                              Save
                            </button>
                          </div>
                        </div>
                      ) : null}
                      {EditSocialMediaBox == 'Follow_twitter' ? (
                        <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia editBox">
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft">
                            <button className="btn ttr">Twitter</button>
                            <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-edit">
                              <input
                                type="text"
                                placeholder="Attend an Event"
                                value={TwitterUsername}
                              />
                              <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-edit-icon">
                                <button
                                  onClick={() => {
                                    editSocialMediaBox(EditSocialMediaBox);
                                  }}
                                >
                                  <Edit />
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight">
                            <button
                              onClick={() => {
                                removebox(EditSocialMediaBox);
                              }}
                              className=""
                            >
                              X
                            </button>
                          </div>
                        </div>
                      ) : null}
                      {EditSocialMediaBox == 'Retweet' ? (
                        <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia editBox">
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft">
                            <button className="btn ttr">Twitter</button>
                            <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-edit">
                              <input
                                type="text"
                                placeholder="Attend an Event"
                                value={ReweetUsername}
                              />
                              <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxLeft-edit-icon">
                                <button
                                  onClick={() => {
                                    editSocialMediaBox(EditSocialMediaBox);
                                  }}
                                >
                                  <Edit />
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="newlaunch-airdrop-page-inner-content-box-5-setting-airsocial-socialmedia-boxRight">
                            <button
                              onClick={() => {
                                removebox(EditSocialMediaBox);
                              }}
                              className=""
                            >
                              X
                            </button>
                          </div>
                        </div>
                      ) : null}
                    </>
                  ) : null}

                  {/* {CollectionUserLevelFeatures()} */}
                </div>
              </div>

              <div className="newlaunch-airdrop-page-inner-content-box-7">
                <div className="newlaunch-airdrop-page-inner-content-box-7-flex">
                  <div className="">
                    <div className="">
                      <label>Additional Information for subscribers</label>

                      <div className="mediaeyetextarea">
                        <textarea
                          className="mediaeyetextarea-input"
                          rows="5"
                          placeholder="My NFT Description, pattern of narrative development that aims to make vivid a place, object, character, or group."
                          onChange={(e) => setAdditionalInfo(e.target.value)}
                        ></textarea>
                      </div>
                      {/* {!descriptionValid ? 'error' : null} */}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mediaeyeFeatureNft newlaunch-airdrop-page-inner-terms-box">
                <div className="mediaeyeFeatureNft-header">
                  <div className="mediaeyeFeatureNft-header-title">
                    Airdrop Terms and Conditions
                  </div>
                </div>
                <div className="mediaeyeFeatureNft-detail">
                  <p className="mediaeyeFeatureNft-detail-description">
                    The airdrop takes place in two phases - whitelisting and
                    bounties claiming. Сhoose the start date of the airdrop and
                    duration of the phases.
                  </p>
                  <div className="mediaeyeFeatureNft-detail-info">
                    <div className="mediaeyeFeatureNft-detail-info-datepart">
                      <label className="mediaeyeFeatureNft-detail-info-datepart-title">
                        Start Date
                      </label>
                      <div className="mediaeye-datepicker">
                        <DatePicker
                          minDate={new Date()}
                          className="mediaeye-datepicker-input mediaeye-datepicker-input-white"
                          withPortal
                          selected={startDate}
                          onChange={(date) => {
                            console.log(date);
                            console.log(new Date(date).getTime());
                            setStartDate(new Date(date).getTime());
                          }}
                          dateFormat="MMMM d, yyyy h:mm aa"
                        />
                      </div>
                    </div>
                    <div className="mediaeyeFeatureNft-detail-info-dayspart">
                      <label className="mediaeyeFeatureNft-detail-info-dayspart-title">
                        Phase Duration
                      </label>
                      <SelectSearch
                        className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style"
                        size="lg"
                        options={daysFilterOption}
                        value={activeDays}
                        onChange={(opt) => setActiveDays(opt)}
                      />
                    </div>
                  </div>
                  <div className="mediaeyeFeatureNft-detail-phase">
                    <div className="mediaeyeFeatureNft-detail-phase-box">
                      <span className="mediaeyeFeatureNft-detail-phase-box-title">
                        Phase Name
                      </span>
                      <span className="mediaeyeFeatureNft-detail-phase-box-title">
                        Duration
                      </span>
                    </div>
                    <div className="mediaeyeFeatureNft-detail-phase-detail">
                      <span className="mediaeyeFeatureNft-detail-phase-detail-name">
                        Whitelisting
                      </span>
                      <span className="mediaeyeFeatureNft-detail-phase-detail-duration">
                        Apr 26, 2022 10:38 AM - May 3, 2022 10:38 AM
                      </span>
                    </div>
                    <div className="mediaeyeFeatureNft-detail-phase-detail">
                      <span className="mediaeyeFeatureNft-detail-phase-detail-name">
                        Bounties Claiming
                      </span>
                      <span className="mediaeyeFeatureNft-detail-phase-detail-duration">
                        May 3, 2022 10:38 AM - May 10, 2022 10:38 AM
                      </span>
                    </div>
                    <div className="mediaeyeFeatureNft-detail-phase-detail">
                      <span className="mediaeyeFeatureNft-detail-phase-detail-name">
                        Clain Supply Leftover
                      </span>
                      <span className="mediaeyeFeatureNft-detail-phase-detail-duration leftover">
                        May 10, 2022 10:38 AM
                      </span>
                    </div>
                  </div>
                  <div className="mediaeyeFeatureNft-detail-checkout">
                    <div className="mediaeyeFeatureNft-detail-checkout-box">
                      <p className="mediaeyeFeatureNft-detail-checkout-box-title">
                        Checkout
                      </p>
                      <div className="mediaeyeFeatureNft-detail-checkout-box-payment">
                        <div
                          className=" mediaeyetoken"
                          size={paymentTokensList?.length}
                        >
                          {paymentTokensList.map((key, i) => (
                            <div
                              className={
                                activeToken === key.name
                                  ? 'active mediaeyetoken-box'
                                  : 'mediaeyetoken-box'
                              }
                            >
                              <div
                                className="mediaeyetoken-box-inner"
                                data-offer={key.offer ? true : false}
                                onClick={() => {
                                  setActiveToken(key.name);
                                }}
                              >
                                <div className="mediaeyetoken-box-icon">
                                  <img src={key.img} alt={key.name} />
                                </div>
                                <div className="mediaeyetoken-box-content">
                                  <div className="mediaeyetoken-box-content-name small-14">
                                    {key.convert} {key.name}
                                  </div>
                                  <div className="mediaeyetoken-box-content-des text-white">
                                    {key.price}
                                  </div>
                                  {key.offer ? (
                                    <div className="mediaeyetoken-box-content-offer">
                                      {key.offer} OFF
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="mediaeyeFeatureNft-detail-checkout-box-pay">
                        <button
                          className="btn btn-info"
                          onClick={payAirdropPressed}
                        >
                          PAY
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mediaeyeFeatureNft newlaunch-airdrop-page-inner-feature-box">
                <div className="mediaeyeFeatureNft-header">
                  <div className="mediaeyeFeatureNft-header-title">
                    Spotlight My Airdrop
                  </div>
                  <div className="mediaeyeinfo">
                    <span
                      className="mediaeyeinfo-sign"
                      data-class="mediaeyetooltip"
                      data-tip="Feature your content across the platform and increase its awareness."
                    >
                      <InfoCircle type="outline" />
                    </span>
                  </div>
                  <Switch
                    className="mediaeyeFeatureNft-switch"
                    checkedIcon={false}
                    uncheckedIcon={false}
                    onChange={() => {
                      setToggleFeatureYourNFT(!toggleFeatureYourNFT);
                    }}
                    checked={toggleFeatureYourNFT}
                    height={20}
                    width={50}
                  />
                </div>
                {/*toggleFeatureYourNFT ? <FeatureYourNFT /> : null*/}
              </div>
              <div className="newlaunch-airdrop-page-inner-btn">
                <button
                  className="btn btn-creative"
                  onClick={onCreatePressed}
                  disabled={isLoading}
                >
                  LAUNCH
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default LaunchAirdrop;
