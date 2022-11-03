import React, { useEffect, useState, useRef } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
// import "../../CreateProduct/Collection/Collection.scss";
import './CreateEvent.scss';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import avatar from '../../../assets/img/avatar_collection.png';
import { ChainHexString } from '../../../blockchain/functions/ChangeChain/ChainHexStrings';
import { useMoralis } from 'react-moralis';
import CollectionCard from '../../ContentMarketplace/CollectionCard/CollectionCard';
import { ChainName } from '../../../blockchain/functions/ChangeChain/ChainNames';
import { queryCollectionsByChain } from '../../../blockchain/functions/Collection';
import Switch from 'react-switch';
import SelectSearch from 'react-select-search';
import { useSelector, useDispatch } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { Pagination } from 'swiper';
import { toggleGeneralPopup } from '../../../store/app/appSlice';
import { Close, InfoCircle, EditAvatar, Plus, Heart } from '../../Icons/';
import { GetDefaultImages } from '../../../blockchain/functions/Utils';
// import fileUpload from './fileUpload';
import FeatureYourNFT from '../../PutOn/PutOnReusables/FeatureYourNFT';
import FEATURETYPE from '../../../utils/featureConstants';
import FeaturedAirdop from '../../Airdrop/FeaturedAirdop/FeaturedAirdop';
import TopLiveBids from '../../ContentMarketplace/Top/TopLiveBids';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ConnectSocial from '../../CreateProduct/Addons/ConnectSocial/ConnectSocial';
import ChooseCollectionPopup from '../ChooseCollectionPopup/ChooseCollectionPopup';
import CategoriesCard from '../../PutOn/PutOnReusables/CategoriesCard';
var validate = require('validate.js');

const CreateEvent = (props) => {
  const { user, Moralis, isUserUpdating } = useMoralis();
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem('isLogin') ? localStorage.getItem('isLogin') : 'false'
  );
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  let history = useHistory();
  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);
  const createEventForm = useRef();

  const [activeMinters, setActiveMinters] = useState([]);
  const [activeToken, setActiveToken] = useState(null);
  const activeNetwork = useSelector((state) => state.app.activeNetwork);

  const [valueSelect] = useState(null);
  const [hideCollection, setHideCollection] = useState(false);
  const [hidePromoCodes, setHidePromoCodes] = useState(false);
  const [hideUploadparticipants, setHideUploadparticipants] = useState(false);

  const [featureInformation, setFeatureInformation] = useState({});

  const [approvedList, setApprovedList] = useState([]);
  const [readyIds, setReadyIds] = useState({});
  // variable used to decide whether user has access to minters based on sub level
  const [isLevel, setLevel] = useState('true');

  const [logo, setLogo] = useState({});
  const [logoURL, setLogoURL] = useState(null);
  const [featured, setFeatured] = useState({});

  const [arrow, setArrow] = useState(false);
  const [openList, setOpenList] = useState(false);
  const [getTitle, setGetTitle] = useState();

  const [featuredURL, setFeaturedURL] = useState(null);
  const [banner, setBanner] = useState({});
  const [bannerURL, setBannerURL] = useState(null);
  const animatedComponents = makeAnimated();
  const [toggleFeatureYourNFT, setToggleFeatureYourNFT] = useState(true);

  const [Accessibility, setAccessibility] = useState('Public');
  const [AirdropType, setAirdropType] = useState('');
  const [SocialMediaDropdown, setSocialMediaDropdown] = useState('');
  const [OpenSocialMediaDropdownBox, SetOpenSocialMediaDropdownBox] =
    useState('');
  const [file, setFile] = React.useState('');
  const [toggleCollections, setToggleCollections] = useState(true);
  const [toggleRelatedEvent, setToggleRelatedEvent] = useState(true);
  const [toggleInviteAvatar, setToggleInviteAvatar] = useState(false);
  const [toggleAddAirdrop, setToggleAddAirdrop] = useState(true);
  const [collectionSelectable, setSelectable] = useState(true);
  const [collection, setCollection] = useState('none');
  const [openPopup, setOpenPopup] = useState(false);
  const [selected, setSelected] = useState(-1);
  const [collections, setCollections] = useState([]);
  const [topLiveBids, setTopLiveBids] = useState([]);
  const [selectedChain, setSelectedChain] = useState(null);
  const [activeImages, setActiveImages] = useState([]);
  const [contentList, setContentList] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [categories, setCategories] = useState([]);
  const [paymentTokensList, setPaymentTokensList] = useState([]);

  const toggleChooseCollection = () => {
    setOpenPopup(!openPopup);
  };

  const addCategory = (category) => {
    const newCategories = [...categories];
    newCategories.push(category);
    setCategories(newCategories);
  };

  const removeCategory = (category) => {
    const newCategories = [...categories];
    newCategories.splice(newCategories.indexOf(category), 1);
    setCategories(newCategories);
  };

  useEffect(() => {
    if (activeNetwork === process.env.REACT_APP_BSC_CHAIN_NAME) {
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

  useEffect(() => {
    setIsLogin(localStorage.getItem('isLogin'));
    queryCollectionList();
  }, [user]);

  const changeSocialLinks = (link, value) => {
    setLinks({ ...links, [link]: value });
  };
  const queryCollectionList = async () => {
    const params = {
      chain: ChainHexString(activeNetwork),
      userAddress: user?.attributes?.ethAddress
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
  };

  const accessType = () => {
    return (
      <>
        <div
          className={`mediaeyetokentype-box  ${Accessibility === 'Private' ? 'active' : null
            }`}
        >
          <div
            className="mediaeyetokentype-box-inner"
            onClick={() => airdropAccessibility('Private')}
          >
            <div className="mediaeyetokentype-box-icon">
              <img src={GetDefaultImages('private')} alt="private" />
            </div>
            <div className="mediaeyetokentype-box-content">
              <div className="mediaeyetokentype-box-content-name">Private</div>
            </div>
          </div>
        </div>

        <div
          className={`mediaeyetokentype-box  ${Accessibility === 'Public' ? 'active' : null
            }`}
        >
          <div
            className="mediaeyetokentype-box-inner"
            onClick={() => airdropAccessibility('Public')}
          >
            <div className="mediaeyetokentype-box-icon">
              <img src={GetDefaultImages('public')} alt="public" />
            </div>
            <div className="mediaeyetokentype-box-content">
              <div className="mediaeyetokentype-box-content-name">Public</div>
            </div>
          </div>
        </div>
      </>
    );
  };

  let [eventNumber, setEventNumber] = useState(0);

  const addEventList = (type) => {
    if (type === 'addRelatedEvent') {
      setEventNumber(eventNumber + 1);
    } else if (type === 'removeRelatedEvent') {
      setEventNumber(eventNumber - 1);
    }
  };

  const test = () => {
    return [...Array(eventNumber)].map((e, i) => (
      <div className="launch-event-page-inner-content-row launch-event-page-inner-content-row-addEvent">
        <div className="launch-event-page-inner-content-row-card">
          <div className="launch-event-page-inner-content-row-card-body-mainleft">
            <div className="launch-event-page-inner-content-row-card-body-closeIcon">
              <span onClick={() => addEventList('removeRelatedEvent')}>
                <Close />
              </span>
            </div>
            <div className="launch-event-page-inner-content-row-card-body-colleft">
              <div className="mediaeyeform-group">
                <label className="mediaeyeform-label">Event Name</label>
                <div className="mediaeyeform-group-input">
                  <input
                    type="text"
                    className="mediaeyeform-input"
                    placeholder="My First Event Name"
                  />
                </div>
              </div>
            </div>
            <div className="launch-event-page-inner-content-row-card-body-colright">
              <div className="mediaeyeform-group">
                <label className="mediaeyeform-label">Start Date</label>
                <div className="mediaeyeform-group-input">
                  <div className="mediaeye-datepicker">
                    <DatePicker
                      minDate={new Date()}
                      className="mediaeyeform-input"
                      withPortal
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      dateFormat="yyyy-MM-dd"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="launch-event-page-inner-content-row-card-body-colfull">
              <div className="mediaeyeform-group">
                <label className="mediaeyeform-label">Description</label>
                <div className="mediaeyeform-group-input">
                  <div className="mediaeyetextarea">
                    <textarea
                      className="mediaeyetextarea-input"
                      rows="5"
                      placeholder="My NFT Description, pattern of narrative development that aims to make vivid a place, object, character, or group."
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="mediaeyeform-group m-0">
                <label className="mediaeyeform-label">Link</label>
                <div className="mediaeyeform-group-input">
                  <input
                    type="text"
                    className="mediaeyeform-input"
                    placeholder="https://discord.com/"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  const switchCollection = () => {
    if (toggleCollections) {
      setToggleCollections(false);
      setSelected(-1);
      setSelectable(true);
    } else {
      setToggleCollections(true);
    }
  };

  const switchRelatedEvent = () => {
    if (toggleRelatedEvent) {
      setToggleRelatedEvent(false);
      setSelected(-1);
      setSelectable(true);
    } else {
      setToggleRelatedEvent(true);
    }
  };

  const switchAddAvatar = () => {
    if (toggleInviteAvatar) {
      setToggleInviteAvatar(false);
      setSelected(-1);
      setSelectable(true);
    } else {
      setToggleInviteAvatar(true);
    }
  };

  const switchAddAirdrop = () => {
    if (toggleAddAirdrop) {
      setToggleAddAirdrop(false);
      setSelected(-1);
      setSelectable(true);
    } else {
      setToggleAddAirdrop(true);
    }
  };

  const settings = {
    slidesPerView: 1,
    grabCursor: true,
    modules: [Pagination],
    pagination: {
      el: '.mediaeye-mint-add-collection-pagination',
      enable: true,
      clickable: true
    },
    breakpoints: {
      889: {
        slidesPerView: 1
      },
      1181: {
        slidesPerView: 2
      },
      1280: {
        slidesPerView: 3
      }
    }
  };

  const collectionSelected = (index) => {
    if (index === -1) {
      // if -1 then none/main collection is selected, allow ability to switch activeToken
      setSelected(-1);
      setSelectable(true);
      setSelectedChain(activeNetwork);
    } else {
      const selectedCollection = collections[index];
      setSelected(index);
      setSelectable(false);
      handleActiveToken(selectedCollection.attributes.collectionType);
      setCollection(selectedCollection.attributes.collectionAddress);
      setSelectedChain(ChainName(selectedCollection.attributes.chainId));
    }
  };

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

  // Search List
  const [searchedMinters, setSearchedMinters] = useState([]);

  const airdropAccessibility = (type) => {
    setAccessibility(type);
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

  const selectContent = [
    {
      name: 'Collections',
      value: 'Collections'
    },
    {
      name: 'NFT',
      value: 'NFT'
    }
  ];

  const selectEventCategory = [
    {
      name: 'Art',
      value: 'art'
    },
    {
      name: 'Crypto',
      value: 'crypto'
    },
    {
      name: 'Gaming',
      value: 'Gaming'
    },
    {
      name: 'Business',
      value: 'Business'
    },
    {
      name: 'Media',
      value: 'Media'
    },
    {
      name: 'Sports',
      value: 'Sports'
    },
    {
      name: 'Charity',
      value: 'Charity'
    }
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
          title: 'Must be of type .png, .jpg, .jpeg, .gif',
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

  var constraints = {
    'Event-Name': {
      presence: true
    },
    Description: {
      presence: true
    },
    logo: {
      presence: true
    }
  };

  const [createEventFormError, setCreateEventFormError] = useState([]);

  const onCreatePressed = async () => {
    scrollToRef(createEventForm);
    var form = document.querySelector('#mediaeye-create-event-form');
    var errors = validate(form, constraints);
    setCreateEventFormError(errors);
    if (errors == undefined) {
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

  const handleUpload = (event) => {
    setFile(event.target.files[0]);
  };

  let [product, setProduct] = useState(optionsUsers);
  let [SelectNFT, setSelectNFT] = useState(NFTArray);

  const [activeDays, setActiveDays] = useState(21);
  const [activeTC, setActiveTc] = useState(7);

  const [activeContent, setActiveContent] = useState('Collections');
  const [activeEventCategory, setActiveEventCategory] =
    useState('Select Category');

  if (
    user?.attributes?.subscriptionLevel < 0 &&
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
    history.goBack();
    return <div className="newlaunch-airdrop-page-inner"></div>;
  } else
    return (
      <>
        <Helmet>
          <meta
            property="og:url"
            content={window.location.origin + '/event/launch'}
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:title"
            content="Create and Schedule Unique Events Programmatically | MEDIA EYE"
          />
          <meta
            property="og:description"
            content="Creating Events on MEDIA EYE is easy! share your event across all major socials, add video and audio streaming, distribute announcements and invites with leading integrated mass marketing services. All done from one platform in minutes."
          />
          <meta
            property="og:image"
            content={window.location.origin + '/img/meta_tag/events.png'}
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            property="twitter:domain"
            content="mediaeyenft.com/event/launch"
          />
          <meta
            property="twitter:url"
            content={window.location.origin + '/event/launch'}
          />
          <meta
            name="twitter:title"
            content="Create and Schedule Unique Events Programmatically | MEDIA EYE"
          />
          <meta
            name="twitter:description"
            content="Creating Events on MEDIA EYE is easy! share your event across all major socials, add video and audio streaming, distribute announcements and invites with leading integrated mass marketing services. All done from one platform in minutes."
          />
          <meta
            name="twitter:image"
            content={window.location.origin + '/img/meta_tag/events.png'}
          />
          <title>
            Create and Schedule Unique Events Programmatically | MEDIA EYE{' '}
          </title>
          <meta
            name="description"
            content="Creating Events on MEDIA EYE is easy! share your event across all major socials, add video and audio streaming, distribute announcements and invites with leading integrated mass marketing services. All done from one platform in minutes."
          />
        </Helmet>
        <div
          className="launch-event-page-inner mediaeye-layout-middle"
          id="mediaeye-create-event-form"
          ref={createEventForm}
        >
          <div className="mediaeye-layout-container">
            <div className="mediaeye-layout-container-header">
              <div className="mediaeye-layout-container-header-heading">
                <h2>Create Event</h2>
                <a
                  className="mediaeye-layout-container-header-heading-link"
                  href="/"
                  target="_blank"
                >
                  &#9654; Tutorial
                </a>
              </div>
            </div>
            {openPopup ? (
              <ChooseCollectionPopup
                openPopup={openPopup}
                togglePopup={toggleChooseCollection}
              />
            ) : null}
            <div className="launch-event-page-inner-content">
              <div className="launch-event-page-inner-content-row launch-event-page-inner-content-row-metadata">
                <div className="launch-event-page-inner-content-row-card">
                  <div className="launch-event-page-inner-content-row-card-header">
                    <div className="launch-event-page-inner-content-row-card-header-heading">
                      Event Metadata
                    </div>
                  </div>
                  <div className="launch-event-page-inner-content-row-card-body mediaeyeform">
                    <div className="launch-event-page-inner-content-row-card-body-colleft">
                      <div className="mediaeyeform-group">
                        <label className="mediaeyeform-label">
                          Event Name*
                        </label>
                        <div className="mediaeyeform-group-input">
                          <input
                            type="text"
                            className={
                              createEventFormError?.['Event-Name']
                                ? 'mediaeyeform-input mediaeyeform-group-input-error-border'
                                : 'mediaeyeform-input'
                            }
                            placeholder="My First Event Name"
                            name="Event-Name"
                          />
                        </div>
                        {createEventFormError?.['Event-Name'] ? (
                          <div className="mediaeyeform-group-input-error-message">
                            {createEventFormError?.['Event-Name']}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="launch-event-page-inner-content-row-card-body-colright">
                      <div className="mediaeyeform-group">
                        <label className="mediaeyeform-label">Link</label>
                        <div className="mediaeyeform-group-input">
                          <input
                            className="mediaeyeform-input"
                            placeholder="https://discord.com/"
                            type="text"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="launch-event-page-inner-content-row-card-body-colfull">
                      <div className="mediaeyeform-group">
                        <label className="mediaeyeform-label">
                          Description*
                        </label>
                        <div className="mediaeyetextarea">
                          <textarea
                            className={
                              createEventFormError?.Description
                                ? 'mediaeyetextarea-input mediaeyeform-group-input-error-border'
                                : 'mediaeyetextarea-input'
                            }
                            rows="5"
                            placeholder="My NFT Description, pattern of narrative development that aims to make vivid a place, object, character, or group."
                            name="Description"
                          ></textarea>
                        </div>
                        {createEventFormError?.Description ? (
                          <div className="mediaeyeform-group-input-error-message">
                            {createEventFormError?.Description}
                          </div>
                        ) : null}
                      </div>

                      <div className="mediaeyeform-group m-0">
                        <label className="mediaeyeform-label mediaeyeinfo">
                          Embed Media{' '}
                          <span
                            className="mediaeyeinfo-sign"
                            data-class="mediaeyetooltip"
                            data-tip="Share from Vimeo, YouTube, GIPHY, SoundCloud, Spotify and more"
                          >
                            <InfoCircle type="outline-white" />
                          </span>
                        </label>
                        <div className="mediaeyeform-group-input">
                          <textarea
                            className="mediaeyetextarea-input"
                            rows="5"
                            placeholder="Paste Embed Code"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="launch-event-page-inner-content-row launch-event-page-inner-content-row-appearance">
                <div className="launch-event-page-inner-content-row-card">
                  <div className="launch-event-page-inner-content-row-card-header">
                    <div className="launch-event-page-inner-content-row-card-header-heading">
                      Appearance
                    </div>
                  </div>
                  <div className="launch-event-page-inner-content-row-card-body mediaeyeform">
                    <div className="launch-event-page-inner-content-row-card-body-colleft launch-event-page-inner-content-row-uploadBox">
                      <div className="mediaeyeform-group text-center">
                        <label className="mediaeyeform-label">Logo Image</label>
                      </div>

                      <div className="launch-event-page-inner-content-row-uploadBox-content">
                        <label className="launch-event-page-inner-content-row-uploadBox-logo">
                          <div
                            className="launch-event-page-inner-content-row-uploadBox-logo-inner"
                            onClick={(event) => {
                              setLogoURL(null);
                              setLogo(null);
                            }}
                          >
                            <img
                              src={logoURL ? logoURL : GetDefaultImages('user')}
                              alt="UserLogo"
                            />
                            <input
                              type="file"
                              className="launch-event-page-inner-content-row-uploadBox-content-inputfile"
                              name="logo"
                              id="logo"
                              accept="image/png, image/gif, image/jpeg"
                              onChange={(e) => handleFileSelected(e)}
                            />
                          </div>
                          <div className="launch-event-page-inner-content-row-uploadBox-content-action launch-event-page-inner-content-row-uploadBox-logo-action">
                            <EditAvatar />
                          </div>
                        </label>
                      </div>
                      {createEventFormError?.logo ? (
                        <div className="mediaeyeform-group-input-error-message">
                          Logo must be require
                        </div>
                      ) : null}
                      <div className="launch-event-page-inner-content-row-uploadBox-bottom">
                        140 x 140 JPEG, PNG
                        <br /> recommended.
                      </div>
                    </div>

                    <div className="launch-event-page-inner-content-row-card-body-colright launch-event-page-inner-content-row-uploadBox">
                      <div className="mediaeyeform-group text-center">
                        <label className="mediaeyeform-label">
                          Banner image
                        </label>
                      </div>
                      <div className="launch-event-page-inner-content-row-uploadBox-content">
                        <label className="launch-event-page-inner-content-row-uploadBox-banner">
                          <div className="launch-event-page-inner-content-row-uploadBox-banner-inner">
                            <img
                              src={
                                bannerURL
                                  ? bannerURL
                                  : GetDefaultImages('banner')
                              }
                              alt="Banner"
                            />
                            <input
                              className="launch-event-page-inner-content-row-uploadBox-content-inputfile"
                              type="file"
                              id="banner"
                              accept="image/png, image/gif, image/jpeg"
                              onChange={(e) => handleFileSelected(e)}
                            />
                          </div>
                          <div className="launch-event-page-inner-content-row-uploadBox-content-action">
                            <EditAvatar />
                          </div>
                        </label>
                      </div>
                      <div className="launch-event-page-inner-content-row-uploadBox-bottom">
                        1280 x 240 JPEG, PNG <br />
                        recommended.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="launch-event-page-inner-content-row launch-event-page-inner-content-row-social">
                <div className="launch-event-page-inner-content-row-card">
                  <div className="launch-event-page-inner-content-row-card-header">
                    <div className="launch-event-page-inner-content-row-card-header-heading">
                      Connect Social Media Accounts
                    </div>
                  </div>
                  <div className="launch-event-page-inner-content-row-card-body">
                    <ConnectSocial
                      socialLinks={links}
                      changeSocialLinks={changeSocialLinks}
                    />
                  </div>
                </div>
              </div>

              <div className="launch-event-page-inner-content-row launch-event-page-inner-content-row-selectcontent">
                <div className="launch-event-page-inner-content-row-card">
                  <div className="launch-event-page-inner-content-row-card-body">
                    <div className="launch-event-page-inner-content-box-8-data">
                      <span>Select Content</span>
                      <div className="">
                        <SelectSearch
                          className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style"
                          size="lg"
                          options={selectContent}
                          value={activeContent}
                          onChange={(opt) => setActiveContent(opt)}
                        />
                      </div>

                      <div
                        className="mediaeyeinfo"
                        data-html={true}
                        data-class="mediaeyetooltip"
                        data-tip="Choose NFT or Collection you want to attach to this event."
                      >
                        <InfoCircle type="outline-white" />
                      </div>
                      <Switch
                        className={`mediaeyeswitch-btn mediaeyeswitch-left ${toggleCollections ? 'active' : ''}`}
                        checkedIcon={false}
                        uncheckedIcon={false}
                        onChange={() => {
                          switchCollection();
                        }}
                        checked={toggleCollections}
                        height={21}
                        width={50}
                      />
                    </div>
                    {toggleCollections ? (
                      <>
                        {activeContent === 'Collections' ? (
                          <>
                            <Swiper
                              {...settings}
                              className="mediaeye-collection-slide m-t-30"
                            >
                              {collections.map((collection, i) => (
                                <SwiperSlide key={collection.i}>
                                  <CollectionCard
                                    key={i}
                                    collection={collection}
                                    onClickAction={(e) => {
                                      e.preventDefault();
                                      collectionSelected(i);
                                    }}
                                    active={i === selected ? true : false}
                                  />
                                </SwiperSlide>
                              ))}
                              <SwiperSlide>
                                <div className="mediaeye-collection-card">
                                  <Link
                                    onClick={toggleChooseCollection}
                                    className="mediaeye-collection-card-inner mediaeye-collection-card-inner-add"
                                  >
                                    <div className="mediaeye-collection-card-inner-add-content">
                                      <div className="mediaeye-collection-card-inner-add-content-icon">
                                        <Plus />
                                      </div>
                                      <div className="mediaeye-collection-card-inner-add-content-text">
                                        New Collection
                                      </div>
                                    </div>
                                  </Link>
                                </div>
                              </SwiperSlide>
                            </Swiper>

                            <div className="mediaeye-swiper-pagination mediaeye-mint-add-collection-pagination text-link"></div>
                          </>
                        ) : (
                          <div className="m-t-30">
                            <Swiper
                              {...settings}
                              className="mediaeye-collection-slide m-t-30"
                            >
                              {topLiveBids.map((collection, i) => (
                                <SwiperSlide key={i}>
                                  <TopLiveBids />
                                </SwiperSlide>
                              ))}
                              <SwiperSlide>
                                <div className="mediaeye-collection-card">
                                  <Link
                                    to="/create/mint"
                                    className="mediaeye-collection-card-inner mediaeye-collection-card-inner-add"
                                  >
                                    <div className="mediaeye-collection-card-inner-add-content">
                                      <div className="mediaeye-collection-card-inner-add-content-icon">
                                        <Plus />
                                      </div>
                                      <div className="mediaeye-collection-card-inner-add-content-text">
                                        New NFT
                                      </div>
                                    </div>
                                  </Link>
                                </div>
                              </SwiperSlide>
                            </Swiper>
                          </div>
                        )}
                      </>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="launch-event-page-inner-content-row launch-event-page-inner-content-row-accessibility">
                <div className="launch-event-page-inner-content-row-card">
                  <div className="launch-event-page-inner-content-row-card-header">
                    <div className="launch-event-page-inner-content-row-card-header-heading">
                      Event Accessibility
                    </div>
                  </div>
                  <div className="launch-event-page-inner-content-row-card-body">
                    <div
                      className="mediaeyetokentype create-collection-page-inner-content-row-token m-b-20"
                      size={3}
                    >
                      {accessType()}
                    </div>

                    {Accessibility === 'Public' ? (
                      <>
                        <div className="mediaeyeform-group">
                          <label className="mediaeyeform-label">
                            Participants
                          </label>
                          <div className="mediaeyeform-group-input mediaeyeform-group-input-auto">
                            <input
                              className="mediaeyeform-input"
                              placeholder="0"
                              min="0"
                              type="number"
                            />
                          </div>
                        </div>
                        <div className="mediaeyeinfo mediaeyeswitch">
                          Create your event invite avatars
                          <Switch
                            className={`mediaeyeswitch-btn mediaeyeswitch-left mediaeyeswitch-right ${toggleInviteAvatar ? 'active' : ''}`}
                            checkedIcon={false}
                            uncheckedIcon={false}
                            onChange={() => {
                              switchAddAvatar();
                            }}
                            checked={toggleInviteAvatar}
                            height={21}
                            width={50}
                          />
                        </div>
                        <div className="m-t-20">
                          <button type="button" className="btn btn-avatar">
                            Go to Metavatar
                          </button>
                        </div>
                      </>
                    ) : Accessibility === 'Private' ? (
                      <div className="launch-event-page-inner-content-box-6-private">
                        <div className="mediaeyeform-group">
                          <label className="mediaeyeform-label">
                            Mint your event invite avatars
                            <Switch
                              className={`mediaeyeswitch-btn mediaeyeswitch-left mediaeyeFeatureNft-switch ${hidePromoCodes ? 'active' : ''}`}
                              checkedIcon={false}
                              uncheckedIcon={false}
                              onChange={() => {
                                setHidePromoCodes(!hidePromoCodes);
                              }}
                              checked={hidePromoCodes}
                              height={21}
                              width={50}
                            />
                          </label>
                        </div>

                        {hidePromoCodes ? (
                          <div className="mediaeyeform-group">
                            <label className="mediaeyeform-label mediaeyeinfo">
                              Number of avatars
                            </label>
                            <div className="mediaeyeform-group-input mediaeyeform-group-input-auto">
                              <input
                                className="mediaeyeform-input"
                                type="number"
                                placeholder="100"
                                min="0"
                              />
                              <div className="mediaeyeform-group-input-addon">
                                <button type="button" className="btn btn-info">
                                  Generate
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : null}

                        <div className="mediaeyeform-group">
                          <div className="mediaeyeform-label">
                            <label>
                              Upload participants{' '}
                              {activeNetwork ===
                                process.env.REACT_APP_BSC_CHAIN_NAME ? (
                                <>BEP</>
                              ) : activeNetwork === 'ETH' ? (
                                <>ERC</>
                              ) : activeNetwork === 'FTM' ? (
                                <>FTM</>
                              ) : null}
                              -20 compatible wallets
                            </label>
                            <Switch
                              checkedIcon={false}
                              uncheckedIcon={false}
                              className={`mediaeyeswitch-btn mediaeyeswitch-right ${hideUploadparticipants ? 'active' : ''}`}
                              onChange={() => {
                                setHideUploadparticipants(
                                  !hideUploadparticipants
                                );
                              }}
                              checked={hideUploadparticipants}
                              height={21}
                              width={50}
                            />
                          </div>
                        </div>

                        {hideUploadparticipants ? (
                          <>
                            <div className="mediaeyeform-group">
                              <label className="mediaeyeform-group-input">
                                <div
                                  className="mediaeyeform-input"
                                  htmlFor="upload-private-file"
                                >
                                  {file?.name
                                    ? file?.name
                                    : 'No Chosen File...'}
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
                                  Upload CSV File
                                </label>
                              </label>
                            </div>

                            <div className="launch-event-page-inner-content-row-download">
                              Download Sample CSV File
                            </div>
                          </>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="launch-event-page-inner-content-row launch-event-page-inner-content-row-eventCategory">
                <div className="launch-event-page-inner-content-row-card">
                  <div className="launch-event-page-inner-content-row-card-header">
                    <div className="launch-event-page-inner-content-row-card-header-heading">
                      Event Category
                    </div>
                  </div>
                  <div className="launch-event-page-inner-content-row-card-body">
                    <CategoriesCard
                      categories={categories}
                      addCategory={addCategory}
                      removeCategory={removeCategory}
                    />
                    {/* <div className="mediaeye-form-group">
                      <div className="launch-event-page-inner-content-eventCategory-select">
                        <SelectSearch
                          className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style"
                          size="lg"
                          options={selectEventCategory}
                          value={activeEventCategory}
                          placeholder={activeEventCategory}
                          onChange={(opt) => setActiveEventCategory(opt)}
                        />
                      </div>

                      <div className="launch-event-page-inner-content-eventCategory-span">
                        <span>
                          Select 1-3 categories that best fit your event.
                        </span>
                      </div>
                      <div className="launch-event-page-inner-content-eventCategory-button">
                        <div className="launch-event-page-inner-content-eventCategory-button-crypto">
                          <button>Crypto</button>
                          <span>
                            <Close />
                          </span>
                        </div>
                        <div className="launch-event-page-inner-content-eventCategory-button-media">
                          <button>Media</button>
                          <span>
                            <Close />
                          </span>
                        </div>
                        <div className="launch-event-page-inner-content-eventCategory-button-sports">
                          <button>Sports</button>
                          <span>
                            <Close />
                          </span>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>

              <div className="launch-event-page-inner-content-row launch-event-page-inner-content-row-addEvent">
                <div className="launch-event-page-inner-content-row-card">
                  <div className="launch-event-page-inner-content-row-card-header">
                    <div className="launch-event-page-inner-content-row-card-header-heading mediaeyeinfo mediaeyeswitch">
                      Add Related Events
                      <Switch
                        className={`mediaeyeswitch-btn mediaeyeswitch-left mediaeyeswitch-right ${toggleRelatedEvent ? 'active' : ''}`}
                        checkedIcon={false}
                        uncheckedIcon={false}
                        onChange={() => {
                          switchRelatedEvent();
                        }}
                        checked={toggleRelatedEvent}
                        height={21}
                        width={50}
                      />
                    </div>
                  </div>
                  <div className="launch-event-page-inner-content-row-card-body">
                    {toggleRelatedEvent ? (
                      <>
                        <div className="launch-event-page-inner-content-row-card-body-mainleft">
                          <div className="launch-event-page-inner-content-row-card-body-colleft">
                            <div className="mediaeyeform-group">
                              <label className="mediaeyeform-label">
                                Event Name
                              </label>
                              <div className="mediaeyeform-group-input">
                                <input
                                  type="text"
                                  className="mediaeyeform-input"
                                  placeholder="My First Event Name"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="launch-event-page-inner-content-row-card-body-colright">
                            <div className="mediaeyeform-group">
                              <label className="mediaeyeform-label">
                                Start Date
                              </label>
                              <div className="mediaeyeform-group-input">
                                <div className="mediaeye-datepicker">
                                  <DatePicker
                                    minDate={new Date()}
                                    className="mediaeyeform-input"
                                    withPortal
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    dateFormat="yyyy-MM-dd"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="launch-event-page-inner-content-row-card-body-colfull">
                            <div className="mediaeyeform-group">
                              <label className="mediaeyeform-label">
                                Description
                              </label>
                              <div className="mediaeyeform-group-input">
                                <div className="mediaeyetextarea">
                                  <textarea
                                    className="mediaeyetextarea-input"
                                    rows="5"
                                    placeholder="My NFT Description, pattern of narrative development that aims to make vivid a place, object, character, or group."
                                  ></textarea>
                                </div>
                              </div>
                            </div>

                            <div className="mediaeyeform-group m-0">
                              <label className="mediaeyeform-label">Link</label>
                              <div className="mediaeyeform-group-input">
                                <input
                                  type="text"
                                  className="mediaeyeform-input"
                                  placeholder="https://discord.com/"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="launch-event-page-inner-content-row-card-body-mainright">
                          <div
                            className="mediaeye-event-card mediaeye-event-card-full"
                            onClick={() => addEventList('addRelatedEvent')}
                          >
                            <div className="mediaeye-event-card-inner mediaeye-event-card-inner-add">
                              <div className="mediaeye-event-card-inner-add-content">
                                <div className="mediaeye-event-card-inner-add-content-icon">
                                  <Plus />
                                </div>
                                <div className="mediaeye-event-card-inner-add-content-text">
                                  Add Event
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
              {test()}

              <div className="launch-event-page-inner-content-row launch-event-page-inner-content-row-addAirdrop">
                <div className="launch-event-page-inner-content-row-card">
                  <div className="launch-event-page-inner-content-row-card-header">
                    <div className="launch-event-page-inner-content-row-card-header-heading mediaeyeinfo mediaeyeswitch">
                      Add Airdrops
                      <Switch
                        className={`mediaeyeswitch-btn mediaeyeswitch-left mediaeyeswitch-right ${toggleAddAirdrop ? 'active' : ''}`}
                        checkedIcon={false}
                        uncheckedIcon={false}
                        onChange={() => {
                          switchAddAirdrop();
                        }}
                        checked={toggleAddAirdrop}
                        height={21}
                        width={50}
                      />
                    </div>
                  </div>
                  <div className="launch-event-page-inner-content-row-card-body">
                    {toggleAddAirdrop ? (
                      <div className="">
                        <FeaturedAirdop />
                        <div className="mediaeye-swiper-pagination mediaeye-mint-add-collection-pagination text-link"></div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="mediaeyeFeatureNft launch-event-page-inner-terms-box">
                <div className="launch-event-page-inner-terms-box-title">
                  Event Terms and Conditions
                </div>
                <div className="mediaeyeFeatureNft-detail">
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
                          onChange={(date) => setStartDate(date)}
                          dateFormat="yyyy-MM-dd"
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

                  <div className="mediaeyeFeatureNft-detail-endDate">
                    <span>End Date</span>
                    <input type="text" placeholder="May 10, 2022 10:38 AM" />
                  </div>
                </div>
                <div className="mediaeyeFeatureNft-detail-checkout">
                  <div className="mediaeyeFeatureNft-token">
                    <div className="mediaeyeFeatureNft-token-heading">
                      Checkout
                    </div>
                    <div
                      className="mediaeyeFeatureNft-detail-checkout-row mediaeyetoken"
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
                    <div className="mediaeyeFeatureNft-detail-checkout-row text-center">
                      <button type="button" className="btn btn-info btn-sm">
                        PAY
                      </button>
                    </div>
                  </div>
                </div>

                {/* {toggleFeatureYourNFT ? <FeatureYourNFT /> : null} */}
              </div>

              <div className="mediaeyeFeatureNft launch-event-page-inner-feature-box">
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
                      <InfoCircle type="outline-white" />
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

                {toggleFeatureYourNFT ? (
                  <FeatureYourNFT
                    setFeatureInformation={setFeatureInformation}
                    featureInformation={featureInformation}
                    featureType={FEATURETYPE.Event}
                    isFeatured={false}
                  />
                ) : null}
              </div>
              <div className="launch-event-page-inner-btn">
                <button
                  className="btn btn-creative"
                  onClick={onCreatePressed}
                  disabled={isLoading}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
};

export default CreateEvent;
