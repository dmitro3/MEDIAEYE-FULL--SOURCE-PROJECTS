import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import './EditEventMain.scss';
import Switch from 'react-switch';
import { useSelector, useDispatch } from 'react-redux';
import SelectSearch from 'react-select-search';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { Pagination } from 'swiper';
import { useMoralis } from 'react-moralis';
import { Close, InfoCircle, EditAvatar, Plus, Heart } from '../../Icons/';
import { GetDefaultImages } from '../../../blockchain/functions/Utils';
import { ChainHexString } from '../../../blockchain/functions/ChangeChain/ChainHexStrings';
import { queryCollectionsByChain } from '../../../blockchain/functions/Collection';
import ConnectSocial from '../../CreateProduct/Addons/ConnectSocial/ConnectSocial';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import FeaturedAirdop from '../../Airdrop/FeaturedAirdop/FeaturedAirdop';
import FeatureYourNFT from '../../PutOn/PutOnReusables/FeatureYourNFT';
import FEATURETYPE from '../../../utils/featureConstants';
import CollectionCard from '../../ContentMarketplace/CollectionCard/CollectionCard';
import TopLiveBids from '../../ContentMarketplace/Top/TopLiveBids';
import { ChainName } from '../../../blockchain/functions/ChangeChain/ChainNames';

const EditEventMain = (props) => {
  const { user, Moralis, isUserUpdating } = useMoralis();
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem('isLogin') ? localStorage.getItem('isLogin') : 'false'
  );
  const [Accessibility, setAccessibility] = useState('Public');
  const [toggleInviteAvatar, setToggleInviteAvatar] = useState(false);
  const [hidePromoCodes, setHidePromoCodes] = useState(false);
  const [hideUploadparticipants, setHideUploadparticipants] = useState(false);
  const activeNetwork = useSelector((state) => state.app.activeNetwork);
  const [collectionSelectable, setSelectable] = useState(true);
  const [selected, setSelected] = useState(-1);
  const [activeEventCategory, setActiveEventCategory] =
    useState('Select Category');
  const [activeTC, setActiveTc] = useState(7);
  const [toggleRelatedEvent, setToggleRelatedEvent] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [toggleAddAirdrop, setToggleAddAirdrop] = useState(true);
  const [toggleFeatureYourNFT, setToggleFeatureYourNFT] = useState(true);
  const [featureInformation, setFeatureInformation] = useState({});
  const [activeDays, setActiveDays] = useState(30);
  const [paymentTokensList, setPaymentTokensList] = useState([]);
  const [activeToken, setActiveToken] = useState(null);
  const [activeContent, setActiveContent] = useState('Collections');
  const [toggleCollections, setToggleCollections] = useState(true);
  const [openPopup, setOpenPopup] = useState(false);
  const [collection, setCollection] = useState('none');
  const [selectedChain, setSelectedChain] = useState(null);
  const [topLiveBids, setTopLiveBids] = useState([]);
  const [collections, setCollections] = useState([]);
  const [activeImages, setActiveImages] = useState([]);
  const [contentList, setContentList] = useState([]);
  const [approvedList, setApprovedList] = useState([]);

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

  const daysFilterOption = [
    {
      name: '1 day',
      value: 1
    },
    {
      name: '7 days',
      value: 7
    },
    {
      name: '30 days',
      value: 30
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

  const switchAddAvatar = () => {
    if (toggleInviteAvatar) {
      setToggleInviteAvatar(false);
      setSelected(-1);
      setSelectable(true);
    } else {
      setToggleInviteAvatar(true);
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

  const switchAddAirdrop = () => {
    if (toggleAddAirdrop) {
      setToggleAddAirdrop(false);
      setSelected(-1);
      setSelectable(true);
    } else {
      setToggleAddAirdrop(true);
    }
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

  const toggleChooseCollection = () => {
    setOpenPopup(!openPopup);
  };

  useEffect(() => {
    setIsLogin(localStorage.getItem('isLogin'));
    queryCollectionList();
  }, [user]);

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

  const changeSocialLinks = (link, value) => {
    setLinks({ ...links, [link]: value });
  };

  const settings = {
    slidesPerView: 3,
    grabCursor: true,
    modules: [Pagination],
    pagination: {
      el: '.mediaeye-collection-feature-pagination',
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

  const accessType = () => {
    return (
      <>
        <div
          className={`mediaeyetokentype-box  ${Accessibility === 'Private' ? 'active' : null
            }`}
        >
          <div
            className="mediaeyetokentype-box-inner"
          // onClick={() => airdropAccessibility('Private')}
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
          // onClick={() => airdropAccessibility('Public')}
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

  const airdropAccessibility = (type) => {
    setAccessibility(type);
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
      <div className="edit-event-page-inner-content-row edit-event-page-inner-content-row-addEvent">
        <div className="edit-event-page-inner-content-row-card">
          <div className="edit-event-page-inner-content-row-card-body-mainleft">
            <div className="edit-event-page-inner-content-row-card-body-closeIcon">
              <span onClick={() => addEventList('removeRelatedEvent')}>
                <Close />
              </span>
            </div>
            <div className="edit-event-page-inner-content-row-card-body-colleft">
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
            <div className="edit-event-page-inner-content-row-card-body-colright">
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
            <div className="edit-event-page-inner-content-row-card-body-colfull">
              <div className="mediaeyeform-group">
                <label className="mediaeyeform-label">Description</label>
                <div className="mediaeyeform-group-input">
                  <div className="mediaeyetextarea">
                    <textarea
                      className="mediaeyetextarea-input"
                      rows="5"
                      placeholder="Paste Embed Code"
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

  return (
    <div className="edit-event-page-inner mediaeye-layout-middle">
      <div className="mediaeye-layout-container">
        <div className="mediaeye-layout-container-header">
          <div className="mediaeye-layout-container-header-heading">
            <h2>Edit Event</h2>
            <a
              className="mediaeye-layout-container-header-heading-link"
              href="/"
              target="_blank"
            >
              &#9654; Tutorial
            </a>
          </div>
        </div>
        <div className="edit-event-page-inner-content">
          <div className="edit-event-page-inner-content-row edit-event-page-inner-content-row-metadata">
            <div className="edit-event-page-inner-content-row-card">
              <div className="edit-event-page-inner-content-row-card-header">
                <div className="edit-event-page-inner-content-row-card-header-heading">
                  Event Metadata
                </div>
              </div>
              <div className="edit-event-page-inner-content-row-card-body mediaeyeform">
                <div className="edit-event-page-inner-content-row-card-body-colleft">
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
                <div className="edit-event-page-inner-content-row-card-body-colright">
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

                <div className="edit-event-page-inner-content-row-card-body-colfull">
                  <div className="mediaeyeform-group">
                    <label className="mediaeyeform-label">Description</label>
                    <div className="mediaeyetextarea">
                      <textarea
                        className="mediaeyetextarea-input"
                        rows="5"
                        placeholder="My NFT Description, pattern of narrative development that aims to make vivid a place, object, character, or group."
                      ></textarea>
                    </div>
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

          <div className="edit-event-page-inner-content-row edit-event-page-inner-content-row-appearance">
            <div className="edit-event-page-inner-content-row-card">
              <div className="edit-event-page-inner-content-row-card-header">
                <div className="edit-event-page-inner-content-row-card-header-heading">
                  Appearance
                </div>
              </div>
              <div className="edit-event-page-inner-content-row-card-body mediaeyeform">
                <div className="edit-event-page-inner-content-row-card-body-colleft edit-event-page-inner-content-row-uploadBox">
                  <div className="mediaeyeform-group text-center">
                    <label className="mediaeyeform-label">Logo Image</label>
                  </div>

                  <div className="edit-event-page-inner-content-row-uploadBox-content">
                    <label className="edit-event-page-inner-content-row-uploadBox-logo">
                      <div className="edit-event-page-inner-content-row-uploadBox-logo-inner">
                        <img src={GetDefaultImages('user')} alt="UserLogo" />
                        <input
                          type="file"
                          className="edit-event-page-inner-content-row-uploadBox-content-inputfile"
                          name="logo"
                          id="logo"
                          accept="image/png, image/gif, image/jpeg"
                        />
                      </div>
                    </label>
                  </div>
                  <div className="edit-event-page-inner-content-row-uploadBox-bottom">
                    140 x 140 JPEG, PNG
                    <br /> recommended.
                  </div>
                </div>

                <div className="edit-event-page-inner-content-row-card-body-colright edit-event-page-inner-content-row-uploadBox">
                  <div className="mediaeyeform-group text-center">
                    <label className="mediaeyeform-label">Banner image</label>
                  </div>
                  <div className="edit-event-page-inner-content-row-uploadBox-content">
                    <label className="edit-event-page-inner-content-row-uploadBox-banner">
                      <div className="edit-event-page-inner-content-row-uploadBox-banner-inner">
                        <img src={GetDefaultImages('banner')} alt="Banner" />
                        <input
                          className="edit-event-page-inner-content-row-uploadBox-content-inputfile"
                          type="file"
                          id="banner"
                          accept="image/png, image/gif, image/jpeg"
                        />
                      </div>
                    </label>
                  </div>
                  <div className="edit-event-page-inner-content-row-uploadBox-bottom">
                    1500 x 240 JPEG, PNG <br />
                    recommended.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="edit-event-page-inner-content-row edit-event-page-inner-content-row-social">
            <div className="edit-event-page-inner-content-row-card">
              <div className="edit-event-page-inner-content-row-card-header">
                <div className="edit-event-page-inner-content-row-card-header-heading">
                  Connect Social Media Accounts
                </div>
              </div>
              <div className="edit-event-page-inner-content-row-card-body">
                <ConnectSocial
                  socialLinks={links}
                  changeSocialLinks={changeSocialLinks}
                  editSocial={true}
                />
              </div>
            </div>
          </div>

          <div className="edit-event-page-inner-content-row edit-event-page-inner-content-row-selectcontent">
            <div className="edit-event-page-inner-content-row-card">
              <div className="edit-event-page-inner-content-row-card-body">
                <div className="edit-event-page-inner-content-box-8-data">
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
                    className={`mediaeyeswitch-btn mediaeyeswitch-left mediaeyeFeatureNft-switch ${toggleCollections ? 'active' : ''}`}
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
                                to="/create/collection"
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

                        <div className="mediaeye-swiper-pagination mediaeye-collection-feature-pagination"></div>
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

                        <div className="mediaeye-swiper-pagination mediaeye-collection-feature-pagination text-link"></div>
                      </div>
                    )}
                  </>
                ) : null}
              </div>
            </div>
          </div>

          <div className="edit-event-page-inner-content-row edit-event-page-inner-content-row-accessibility">
            <div className="edit-event-page-inner-content-row-card">
              <div className="edit-event-page-inner-content-row-card-header">
                <div className="edit-event-page-inner-content-row-card-header-heading greyLable">
                  Event Accessibility
                </div>
              </div>
              <div className="edit-event-page-inner-content-row-card-body">
                <div
                  className="mediaeyetokentype create-collection-page-inner-content-row-token m-b-20"
                  size={3}
                >
                  {accessType()}
                </div>

                {Accessibility === 'Public' ? (
                  <>
                    <div className="mediaeyeform-group">
                      <label className="mediaeyeform-label greyLable">
                        Participants
                      </label>
                      <div className="mediaeyeform-group-input mediaeyeform-group-input-auto">
                        <input
                          className="mediaeyeform-input"
                          placeholder="0"
                          min="0"
                          type="number"
                          disabled
                        />
                      </div>
                    </div>
                    <div className="mediaeyeform-group">
                      <label className="mediaeyeform-label greyLable">
                        Create your event invite avatars
                        <Switch
                          className={`mediaeyeswitch-btn mediaeyeswitch-left mediaeyeswitch-right ${toggleInviteAvatar ? 'active' : ''} `}
                          checkedIcon={false}
                          uncheckedIcon={false}
                          onChange={() => {
                            switchAddAvatar();
                          }}
                          checked={toggleInviteAvatar}
                          height={21}
                          width={50}
                        />
                      </label>
                    </div>
                    {toggleInviteAvatar ? (
                      <div className="m-t-20">
                        <button
                          disabled
                          type="button"
                          className="btn btn-disable "
                        >
                          Go to Metavatar
                        </button>
                      </div>
                    ) : null}
                  </>
                ) : Accessibility === 'Private' ? (
                  <div className="edit-event-page-inner-content-box-6-private">
                    <div className="mediaeyeform-group">
                      <label className="mediaeyeform-label greyLable">
                        Mint your event invite avatars
                        <Switch
                          className={`mediaeyeswitch-btn mediaeyeswitch-left ${hidePromoCodes ? 'acitve' : ''}`}
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
                        <label className="mediaeyeform-label greyLable mediaeyeinfo">
                          Number of avatars
                        </label>
                        <div className="mediaeyeform-group-input mediaeyeform-group-input-auto">
                          <input
                            className="mediaeyeform-input"
                            type="number"
                            placeholder="100"
                            min="0"
                            disabled
                          />
                          <div className="mediaeyeform-group-input-addon">
                            <button
                              disabled
                              type="button"
                              className="btn btn-disable"
                            >
                              Generate
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : null}

                    <div className="mediaeyeform-group">
                      <label className="mediaeyeform-label greyLable">
                        Upload participants{' '}
                        {activeNetwork === 'BSC' ? (
                          <>BEP</>
                        ) : activeNetwork === 'ETH' ? (
                          <>ERC</>
                        ) : activeNetwork === 'FTM' ? (
                          <>FTM</>
                        ) : null}
                        -20 compatible wallets
                        <Switch
                          checkedIcon={false}
                          uncheckedIcon={false}
                          className={`mediaeyeswitch-btn mediaeyeswitch-left mediaeyeswitch-right ${hideUploadparticipants ? 'active' : ''}`}
                          onChange={() => {
                            setHideUploadparticipants(!hideUploadparticipants);
                          }}
                          checked={hideUploadparticipants}
                          height={21}
                          width={50}
                        />
                      </label>
                    </div>

                    {hideUploadparticipants ? (
                      <>
                        <div className="mediaeyeform-group">
                          <label className="mediaeyeform-group-input">
                            <div className="mediaeyeform-input">
                              No Chosen File...
                            </div>
                            <input
                              disabled
                              type="file"
                              className="mediaeyeform-group-input-hide"
                              id="upload-private-file"
                            />
                            <button
                              type="button"
                              className="btn btn-disable mediaeyeform-group-input-btn"
                            >
                              Upload CSV File
                            </button>
                          </label>
                        </div>

                        <div className="mediaeyeform-group">
                          <label className="mediaeyeform-label greyLable">
                            Download Sample CSV File
                          </label>
                        </div>
                      </>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div className="edit-event-page-inner-content-row edit-event-page-inner-content-row-eventCategory">
            <div className="edit-event-page-inner-content-row-card">
              <div className="edit-event-page-inner-content-row-card-header">
                <div className="edit-event-page-inner-content-row-card-header-heading greyLable">
                  Event Category
                </div>
              </div>
              <div className="edit-event-page-inner-content-row-card-body">
                <div className="mediaeye-form-group">
                  <div className="edit-event-page-inner-content-eventCategory-select">
                    <SelectSearch
                      className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style greyLable"
                      size="lg"
                      options={selectEventCategory}
                      value={activeEventCategory}
                      placeholder={activeEventCategory}
                      onChange={(opt) => setActiveEventCategory(opt)}
                      disabled
                    />
                  </div>

                  <div className="edit-event-page-inner-content-eventCategory-span">
                    <span>Select 1-3 categories that best fit your event.</span>
                  </div>
                  <div className="edit-event-page-inner-content-eventCategory-button">
                    <div className="edit-event-page-inner-content-eventCategory-button-fitevent btn-disable">
                      <button>Crypto</button>
                      <span>
                        <Close />
                      </span>
                    </div>
                    <div className="edit-event-page-inner-content-eventCategory-button-fitevent btn-disable">
                      <button>Media</button>
                      <span>
                        <Close />
                      </span>
                    </div>
                    <div className="edit-event-page-inner-content-eventCategory-button-fitevent btn-disable">
                      <button>Sports</button>
                      <span>
                        <Close />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="edit-event-page-inner-content-row edit-event-page-inner-content-row-addEvent">
            <div className="edit-event-page-inner-content-row-card">
              <div className="edit-event-page-inner-content-row-card-header">
                <div className="edit-event-page-inner-content-row-card-header-heading mediaeyeinfo mediaeyeswitch">
                  <span className="TextWhite">Add Related Events</span>
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
              <div className="edit-event-page-inner-content-row-card-body">
                {toggleRelatedEvent ? (
                  <>
                    <div className="edit-event-page-inner-content-row-card-body-mainleft">
                      <div className="edit-event-page-inner-content-row-card-body-colleft">
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
                      <div className="edit-event-page-inner-content-row-card-body-colright">
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
                      <div className="edit-event-page-inner-content-row-card-body-colfull">
                        <div className="mediaeyeform-group">
                          <label className="mediaeyeform-label">
                            Description
                          </label>
                          <div className="mediaeyeform-group-input">
                            <div className="mediaeyetextarea">
                              <textarea
                                className="mediaeyetextarea-input"
                                rows="5"
                                placeholder="Paste Embed Code"
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
                    <div className="edit-event-page-inner-content-row-card-body-mainright">
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

          <div className="edit-event-page-inner-content-row edit-event-page-inner-content-row-addAirdrop">
            <div className="edit-event-page-inner-content-row-card">
              <div className="edit-event-page-inner-content-row-card-header">
                <div className="edit-event-page-inner-content-row-card-header-heading mediaeyeinfo mediaeyeswitch">
                  <span className="TextWhite">Add Airdrops</span>
                  <Switch
                    className={`mediaeyeswitch-btn mediaeyeswitch-left mediaeyeswitch-right ${toggleRelatedEvent ? 'active' : ''}`}
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
              <div className="edit-event-page-inner-content-row-card-body">
                {toggleAddAirdrop ? (
                  <div className="">
                    <FeaturedAirdop />
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div className="mediaeyeFeatureNft edit-event-page-inner-terms-box">
            <div className="edit-event-page-inner-terms-box-title greyLable">
              Event Terms and Conditions
            </div>
            <div className="mediaeyeFeatureNft-detail">
              <div className="mediaeyeFeatureNft-detail-info">
                <div className="mediaeyeFeatureNft-detail-info-datepart">
                  <label className="mediaeyeFeatureNft-detail-info-datepart-title greyLable">
                    Start Date
                  </label>
                  <div className="mediaeye-datepicker">
                    <DatePicker
                      minDate={new Date()}
                      className="mediaeye-datepicker-input mediaeye-datepicker-input-white greyLable"
                      withPortal
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      dateFormat="yyyy-MM-dd"
                      disabled
                    />
                  </div>
                </div>
                <div className="mediaeyeFeatureNft-detail-info-dayspart">
                  <label className="mediaeyeFeatureNft-detail-info-dayspart-title greyLable">
                    Phase Duration
                  </label>
                  <SelectSearch
                    className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style"
                    size="lg"
                    options={daysFilterOption}
                    value={activeDays}
                    onChange={(opt) => setActiveDays(opt)}
                    disabled
                  />
                </div>
              </div>

              <div className="mediaeyeFeatureNft-detail-endDate">
                <div className="mediaeyeform-group m-0">
                  <label className="mediaeyeform-label greyLable">
                    End Date
                  </label>
                  <div className="mediaeyeform-group-input">
                    <input
                      className="mediaeyeform-input"
                      placeholder="May 10, 2022 10:38 AM"
                      type="search"
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mediaeyeFeatureNft-detail-checkout">
              <div className="mediaeyeFeatureNft-token">
                <div className="mediaeyeFeatureNft-token-heading greyLable">
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
                      // onClick={() => {
                      // setActiveToken(key.name);
                      // }}
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
                            <div className="mediaeyetoken-box-content-offer btn-disable">
                              {key.offer} OFF
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mediaeyeFeatureNft-detail-checkout-row text-center">
                  <button
                    disabled
                    type="button"
                    className="btn btn-disable btn-sm "
                  >
                    PAY
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mediaeyeFeatureNft edit-event-page-inner-feature-box">
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
                className={`mediaeyeswitch-btn mediaeyeswitch-left ${toggleFeatureYourNFT ? 'active' : ''}`}
                checkedIcon={false}
                uncheckedIcon={false}
                onChange={() => {
                  setToggleFeatureYourNFT(!toggleFeatureYourNFT);
                }}
                checked={toggleFeatureYourNFT}
                height={21}
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

          <div className="edit-event-page-inner-btn">
            <button className="btn btn-creative ">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditEventMain;
