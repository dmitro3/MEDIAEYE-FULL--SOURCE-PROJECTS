import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useMoralis } from 'react-moralis';
import SelectSearch from 'react-select-search';
import Switch from 'react-switch';
import { useLocation } from 'react-router-dom';
import AirdropBlock from '../Airdrop/AirdropBlock/AirdropBlock';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { ChainHexString } from '../../blockchain/functions/ChangeChain/ChainHexStrings';
import { queryCollectionsByChain } from '../../blockchain/functions/Collection';
import { Pagination } from 'swiper';
import { EventsJson } from '../../utils/JsonData';
import { AirdropJson } from '../../utils/JsonData';
import CollectionCard from '../ContentMarketplace/CollectionCard/CollectionCard';
import { Close, InfoCircle, EditAvatar, Plus, Heart, EyeSwap } from '../Icons/';
import { ChainName } from '../../blockchain/functions/ChangeChain/ChainNames';
import UserguidPopUp from './UserguidPopUp/UserguidPopUp';
import 'react-datepicker/dist/react-datepicker.css';
import CampaignMetaData from './CampaignMetaData';
import ConnectSocial from '../CreateProduct/Addons/ConnectSocial/ConnectSocial';
import { GetDefaultImages } from '../../blockchain/functions/Utils';
import { toggleGeneralPopup } from '../../store/app/appSlice';
import CategoriesCard from '../PutOn/PutOnReusables/CategoriesCard';
import FeatureSpotlight from '../Spotlight/FeatureSpotlight/FeatureSpotlight';

// Images & Media
import search from '../../assets/img/newSearchIcon.png';
import AddSocialEvents from './AddSocialEvents';
import EyeSwapPro from '../Modals/EyeSwap-Open/EyeSwapPro';
import PaymentService from '../PaymentService/PaymentService';
import NftListedCampaign from './NftListedCampaign';
import ExploreNormalCard from '../ContentMarketplace/ExploreBlock/ExploreNormalCard';
import NftListedCampaignDetails from './NftListedCampaignDetails';
import CollectionListedCampaign from './CollectionListedCampaign';

var validate = require('validate.js');

const settings = {
  slidesPerView: 1,
  grabCursor: true,
  modules: [Pagination],
  pagination: {
    el: '.mediaeye-CreateCampaign-pagination',
    enable: true,
    clickable: true
  },
  breakpoints: {
    889: {
      slidesPerView: 2
    },
    1181: {
      slidesPerView: 2
    },
    1280: {
      slidesPerView: 3
    }
  }
};

const MainCreateCampaign = (props) => {
  const { user, Moralis } = useMoralis();
  const dispatch = useDispatch();
  const [toggleAddAirdrop, setToggleAddAirdrop] = useState(true);
  const [toggleAddNFTs, setToggleAddNFTs] = useState(true);
  const [toggleAddCollection, setToggleAddCollection] = useState(true);
  const [activeTC, setActiveTc] = useState(7);
  const [selected, setSelected] = useState(-1);
  const [collectionSelectable, setSelectable] = useState(true);
  const eventData = EventsJson();
  const [productToShow, setproductToShow] = useState([]);
  const [collections, setCollections] = useState([]);
  const [selectedChain, setSelectedChain] = useState(null);
  const activeNetwork = useSelector((state) => state.app.activeNetwork);
  const [collection, setCollection] = useState('none');
  const [activeImages, setActiveImages] = useState([]);
  const [approvedList, setApprovedList] = useState([]);
  const [contentList, setContentList] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [activeToken, setActiveToken] = useState(null);
  const [activeContent, setActiveContent] = useState('NFT Listed to Campaign');
  const featured = AirdropJson();
  const [toggleFeatureYourEvent, setToggleFeatureYourEvent] = useState(true);
  const [toggleFeatureYourNFT, setToggleFeatureYourNFT] = useState(false);
  const [isFeatured, setIsFeatured] = useState();
  const [featureInformation, setFeatureInformation] = useState({});
  const [userguidPopup, setUserguid] = useState(false);
  const [toggleCollections, setToggleCollections] = useState(true);
  const [airdropSelected, setAirdropSelected] = useState(true);
  const [eventSelected, setEventSelected] = useState(true);
  const [collectionCardSelected, setCollectionCardSelected] = useState(true);
  const [topLiveBids, setTopLiveBids] = useState([]);
  const [toggleRelatedEvent, setToggleRelatedEvent] = useState(true);
  const [toggleSocial, setToggleSocial] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [logo, setLogo] = useState('');
  const [display, setDisplay] = useState();
  const [banner, setBanner] = React.useState('');
  const [categories, setCategories] = useState([]);
  const [file, setFile] = React.useState('');
  const [Accessibility, setAccessibility] = useState('Public');
  const [hideUploadparticipants, setHideUploadparticipants] = useState(false);
  const [toggleInviteAvatar, setToggleInviteAvatar] = useState(false);
  const [hidePromoCodes, setHidePromoCodes] = useState(false);
  const [hideParticipants, setHideParticipants] = useState(true);
  const createCampaignForm = useRef();
  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);
  const [hideAddManually, setHideAddManually] = useState(true);
  const [hideNFTPass, setHideNFTPass] = useState(false);
  const [listedNftCardSelect, setListedNftCardSelect] = useState({});
  const [featuredNftCardSelect, setFeaturedNftCardSelect] = useState({});
  const [featuredCollection, setFeaturedCollection] = useState([]);
  const [openFeatureHistory, setOpenFeatureHistory] = useState(false);
  const [yourCollectionCardSelect, setYourCollectionCardSelect] = useState({});
  const [featuredCollectionCardSelect, setFeaturedCollectionCardSelect] =
    useState({});
  const location = useLocation();
  const products = location?.state?.activeImages;
  const [activeAirdropParticipantFilter, setActiveAirdropParticipantFilter] =
    useState('Upload CSV');
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem('isLogin') ? localStorage.getItem('isLogin') : 'false'
  );

  const airdropParticipantFilter = [
    {
      name: 'Add manually ERC20 compatible wallets',
      value: 'Add manually ERC20 compatible wallets'
    },
    {
      name: 'Upload CSV',
      value: 'Upload CSV'
    }
  ];

  const WalletAddress = [
    {
      id: 1,
      address: '0xc7122B6496C0ACA1b5A7abc6CC6DAA37f9f51ec6'
    },
    {
      id: 2,
      address: '0xc7122B6496C0ACA1b5A7abc6CC6DAA37f9f51ec6'
    },
    {
      id: 3,
      address: '0xc7122B6496C0ACA1b5A7abc6CC6DAA37f9f51ec6'
    },
    {
      id: 4,
      address: '0xc7122B6496C0ACA1b5A7abc6CC6DAA37f9f51ec6'
    },
    {
      id: 5,
      address: '0xc7122B6496C0ACA1b5A7abc6CC6DAA37f9f51ec6'
    },
    {
      id: 6,
      address: '0xc7122B6496C0ACA1b5A7abc6CC6DAA37f9f51ec6'
    },
    {
      id: 7,
      address: '0xc7122B6496C0ACA1b5A7abc6CC6DAA37f9f51ec6'
    },
    {
      id: 8,
      address: '0xc7122B6496C0ACA1b5A7abc6CC6DAA37f9f51ec6'
    },
    {
      id: 9,
      address: '0xc7122B6496C0ACA1b5A7abc6CC6DAA37f9f51ec6'
    },
    {
      id: 10,
      address: '0xc7122B6496C0ACA1b5A7abc6CC6DAA37f9f51ec6'
    }
  ];

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

  let [userAddress, setUserAddress] = useState(WalletAddress);

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

  const removeWalletAddress = (id) => {
    const temp = [...userAddress];
    const index = temp.findIndex((item) => item.id === id);
    if (index !== -1) {
      temp.splice(index, 1);
      setUserAddress(temp);
    }
  };

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

  const isChecked = () => {
    setIsFeatured(!isFeatured);
  };

  const toggleChooseCollection = () => {
    setOpenPopup(!openPopup);
  };

  const toggleUserGuidPopup = () => {
    setUserguid(!userguidPopup);
  };

  const handleUpload = (event) => {
    setFile(event.target.files[0]);
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

  const switchAddNFTs = () => {
    if (toggleAddNFTs) {
      setToggleAddNFTs(false);
      setSelected(-1);
      setSelectable(true);
    } else {
      setToggleAddNFTs(true);
    }
  };

  const switchAddCollection = () => {
    if (toggleAddCollection) {
      setToggleAddCollection(false);
      setSelected(-1);
      setSelectable(true);
    } else {
      setToggleAddCollection(true);
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

  useEffect(() => {
    setIsLogin(localStorage.getItem('isLogin'));
    queryCollectionList();
  }, [user]);

  const switchSocial = () => {
    if (toggleSocial) {
      setToggleSocial(false);
      setSelected(-1);
      setSelectable(true);
    } else {
      setToggleSocial(true);
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
  const airdropAccessibility = (type) => {
    setAccessibility(type);
  };

  var constraints = {
    'Campaign-Name': {
      presence: true
    },
    Description: {
      presence: true
    },
    logo: {
      presence: true
    },
    display: {
      presence: true
    },
    banner: {
      presence: true
    }
  };

  const [selectCategory, setSelectCategory] = useState('false');

  const [errorCampaign, setErrorCampaign] = useState([]);

  const handlesubmitCampaign = () => {
    if (selectCategory == 'false') {
      setSelectCategory('true');
    }
    scrollToRef(createCampaignForm);
    var form = document.querySelector('#mediaeye-create-campaign-form');
    var errors = validate(form, constraints);
    setErrorCampaign(errors);
    if (errors == undefined && selectCategory == false) {
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

  const selectListedNftCard = (status, product) => {
    if (status && product?.id) {
      setListedNftCardSelect(product);
      setFeaturedNftCardSelect({});
    } else {
      setListedNftCardSelect({});
    }
  };

  const selectYourCollectionCard = (status, collection) => {
    if (status && collection?.attributes?.collectionAddress) {
      setYourCollectionCardSelect(collection);
      setFeaturedCollectionCardSelect({});
    } else {
      setYourCollectionCardSelect({});
    }
  };

  const totalOwnedArr = useState([
    products?.map((product) => {
      return product.totalOwned;
    })
  ]);

  const accessType = () => {
    return (
      <>
        {activeContent === 'NFT Listed to Campaign' ? (
          <div
            className={`mediaeyetokentype-box  ${Accessibility === 'Private' ? 'active' : null
              }`}
          >
            <div
              className="mediaeyetokentype-box-inner"
              onClick={() => airdropAccessibility('Private')}
            >
              <div className="mediaeyetokentype-box-icon">
                <span></span>
              </div>
              <div className="mediaeyetokentype-box-content">
                <div className="mediaeyetokentype-box-content-name">
                  Private
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mediaeyetokentype-box">
            <div className="mediaeyetokentype-box-inner">
              <div className="mediaeyetokentype-box-icon">
                <span></span>
              </div>
              <div className="mediaeyetokentype-box-content">
                <div className="mediaeyetokentype-box-content-name">
                  Private
                </div>
              </div>
            </div>
          </div>
        )}

        <div
          className={`mediaeyetokentype-box  ${Accessibility === 'Public' ? 'active' : null
            }`}
        >
          <div
            className="mediaeyetokentype-box-inner"
            onClick={() => airdropAccessibility('Public')}
          >
            <div className="mediaeyetokentype-box-icon">
              <span></span>
            </div>
            <div className="mediaeyetokentype-box-content">
              <div className="mediaeyetokentype-box-content-name">Public</div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <section className="mediaeye-layout-section withspace">
      <UserguidPopUp
        userguidPopup={userguidPopup}
        toggleUserGuidPopup={toggleUserGuidPopup}
      />
      <div
        className="mediaeye-layout-container"
        id="mediaeye-create-campaign-form"
      >
        <div className="mediaeye-CreateCampaign">
          <div className="mediaeye-CreateCampaign-content">
            <div className="mediaeye-CreateCampaign-content-left">
              <h2>CREATE CAMPAIGN</h2>
              <p>
                Create unique NFT-driven automated Campaigns with integrated
                socials, streaming and mass market services
              </p>
              <ul>
                <li>Feature your NFTs, Collections, and Airdrops</li>
                <li>Make your Campaign public or private</li>
              </ul>
            </div>
            <div
              className="campgnTutorial"
              onClick={() => toggleUserGuidPopup()}
            >
              Tutorial
            </div>
            {/* <img
              src={TopGroup}
              className="mediaeye-CreateCampaign-content-right"
              alt="TopGroup"
            /> */}
          </div>
          <div className="mediaeye-CreateCampaign-wrapper">
            <div className="mediaeye-CreateCampaign-wrapper-card">
              <div className="mediaeye-CreateCampaign-wrapper-card-select">
                <Switch
                  id="campaignGallery"
                  className={`mediaeyeswitch-btn mediaeyeswitch-right ${toggleAddNFTs ? 'active' : ''
                    } `}
                  checkedIcon={false}
                  uncheckedIcon={false}
                  onChange={() => {
                    switchAddNFTs();
                  }}
                  checked={toggleAddNFTs}
                  height={21}
                  width={50}
                />
                <label htmlFor="campaignGallery">Select NFTs to List on Campaign Gallery</label>
              </div>

              {toggleAddNFTs ? (
                <div className="mediaeye-CreateCampaign-wrapper-card-inner">
                  <div className="m-t-30">
                    {listedNftCardSelect?.id ? (
                      <>
                        <div className="mediaeye-CreateCampaign-wrapper-card-details">
                          <ExploreNormalCard product={listedNftCardSelect} />
                          <NftListedCampaignDetails
                            product={listedNftCardSelect}
                            totalOwned={totalOwnedArr}
                          />
                        </div>
                        <div className="text-center">
                          <button className="btn btn-gaming btn-lg">
                            Approve
                          </button>
                        </div>
                      </>
                    ) : (
                      <NftListedCampaign
                        selectListedNftCard={selectListedNftCard}
                        selectedCard={listedNftCardSelect}
                        checkOwner={true}
                      />
                    )}
                  </div>
                </div>
              ) : null}
            </div>
            <div className="mediaeye-CreateCampaign-wrapper-card">
              <div className="mediaeye-CreateCampaign-wrapper-card-select">
                <Switch
                  id="jumboCollection"
                  className={`mediaeyeswitch-btn mediaeyeswitch-right ${toggleAddCollection ? 'active' : ''
                    } `}
                  checkedIcon={false}
                  uncheckedIcon={false}
                  onChange={() => {
                    switchAddCollection();
                  }}
                  checked={toggleAddCollection}
                  height={21}
                  width={50}
                />

                <label htmlFor="jumboCollection">Select Jumbo and/or Generative Collections</label>
              </div>

              {toggleAddCollection ? (
                <div className="mediaeye-CreateCampaign-wrapper-card-inner">
                  <div className="m-t-30">
                    {yourCollectionCardSelect?.id ? (
                      <>
                        <div className="mediaeye-CreateCampaign-wrapper-card-details">
                          <CollectionCard
                            collection={yourCollectionCardSelect}
                          />
                          <NftListedCampaignDetails
                            product={yourCollectionCardSelect}
                            totalOwned={totalOwnedArr}
                          />
                        </div>
                        <div className="text-center">
                          <button className="btn btn-gaming btn-lg">
                            Approve
                          </button>
                        </div>
                      </>
                    ) : (
                      <CollectionListedCampaign
                        selectYourCollectionCard={selectYourCollectionCard}
                        selectedCard={yourCollectionCardSelect}
                      // toggleCollection={toggleChooseCollection}
                      />
                    )}
                  </div>
                </div>
              ) : null}
            </div>
            <div className="mediaeye-CreateCampaign-wrapper-card">
              <div className="mediaeye-CreateCampaign-wrapper-card-select">
                <Switch
                  id="airdropDropdown"
                  className={`mediaeyeswitch-btn mediaeyeswitch-right ${toggleAddAirdrop ? 'active' : ''
                    } `}
                  checkedIcon={false}
                  uncheckedIcon={false}
                  onChange={() => {
                    switchAddAirdrop();
                  }}
                  checked={toggleAddAirdrop}
                  height={21}
                  width={50}
                />
                <label htmlFor="airdropDropdown">Select Airdrops</label>
              </div>

              {toggleAddAirdrop ? (
                <div className="mediaeye-CreateCampaign-wrapper-card-inner">
                  <Swiper {...settings} className="mediaeye-airdrop-slide">
                    {featured.map((airdrop, i) => (
                      <SwiperSlide key={airdrop.id}>
                        <AirdropBlock
                          airdrop={airdrop}
                          isFeatured={true}
                          key={i}
                          selectedCampaignCard={airdropSelected}
                        />
                      </SwiperSlide>
                    ))}
                    <SwiperSlide>
                      <div className="mediaeye-collection-card">
                        <Link
                          to="/airdrop/launch"
                          className="mediaeye-collection-card-inner mediaeye-collection-card-inner-add"
                        >
                          <div className="mediaeye-collection-card-inner-add-content">
                            <div className="mediaeye-collection-card-inner-add-content-icon">
                              <Plus />
                            </div>
                            <div className="mediaeye-collection-card-inner-add-content-text">
                              New Airdrop
                            </div>
                          </div>
                        </Link>
                      </div>
                    </SwiperSlide>
                  </Swiper>
                  <div className="m-t-10 mediaeye-swiper-pagination mediaeye-swiper-pagination-center withscroll mediaeye-CreateCampaign-pagination"></div>
                </div>
              ) : null}
            </div>
            <div
              className="mediaeye-CreateCampaign-wrapper-card"
              ref={createCampaignForm}
            >
              <h3>Campaign Metadata</h3>

              <div className="mediaeye-CreateCampaign-wrapper-card-inner">
                <div className="mediaeyeform-group">
                  <label className="mediaeyeform-label" htmlFor="campaignName">Campaign Name*</label>
                  <div className="mediaeyeform-group-input">
                    <input
                      id="campaignName"
                      type="text"
                      className={
                        errorCampaign?.['Campaign-Name']
                          ? 'mediaeyeform-input mediaeyeform-group-input-error-border'
                          : 'mediaeyeform-input'
                      }
                      placeholder="My First Event Name"
                      name="Campaign-Name"
                    />
                  </div>
                  {errorCampaign?.['Campaign-Name'] ? (
                    <div className="mediaeyeform-group-input-error-message">
                      {errorCampaign?.['Campaign-Name']}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="mediaeyeform-group">
                <label className="mediaeyeform-label" htmlFor="campDescription">Description*</label>
                <div className="mediaeyetextarea">
                  <textarea
                    id="campDescription"
                    className={
                      errorCampaign?.Description
                        ? 'mediaeyetextarea-input mediaeyeform-group-input-error-border'
                        : 'mediaeyetextarea-input'
                    }
                    rows="5"
                    placeholder="My NFT Description, pattern of narrative development that aims to make vivid a place, object, character, or group. My NFT Description, pattern of narrative development that aims to make vivid a place, object, character, or group. My NFT Description, pattern of narrative development that aims to make vivid a place, object, character, or group."
                    name="Description"
                  ></textarea>
                </div>
                {errorCampaign?.Description ? (
                  <div className="mediaeyeform-group-input-error-message">
                    {errorCampaign?.Description}
                  </div>
                ) : null}
              </div>
              <div className="mediaeyeform-group m-0">
                <label className="mediaeyeform-label mediaeyeinfo" htmlFor="videoLink">
                  Add Video Promo Link
                  {/* <span
                    className="mediaeyeinfo-sign"
                    data-className="mediaeyetooltip"
                    data-tip="Share from Vimeo, YouTube, GIPHY, SoundCloud, Spotify and more"
                  >
                    <InfoCircle type="outline-white" />
                  </span> */}
                </label>
                <div className="mediaeyeform-group-input">
                  <textarea
                    id="videoLink"
                    className="mediaeyetextarea-input"
                    rows="5"
                    placeholder="Embed video code from streaming platform"
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="mediaeye-CreateCampaign-wrapper-card appearance">
              <h3>Appearance</h3>
              <div className="mediaeye-CreateCampaign-wrapper-card-body">
                <div className="mediaeye-CreateCampaign-wrapper-card-body-colleft mediaeye-CreateCampaign-wrapper-card-uploadBox">
                  <div className="mediaeyeform-group text-center">
                    <label className="mediaeyeform-label">Logo Image*</label>
                  </div>

                  <div className="mediaeye-CreateCampaign-wrapper-card-uploadBox-content">
                    <label className="mediaeye-CreateCampaign-wrapper-card-uploadBox-logo">
                      <div className="mediaeye-CreateCampaign-wrapper-card-uploadBox-logo-inner">
                        <img
                          src={logo?.url ? logo.url : GetDefaultImages('logo')}
                          alt="Logo"
                        />
                        <input
                          type="file"
                          className="mediaeye-CreateCampaign-wrapper-card-uploadBox-content-inputfile"
                          name="logo"
                          accept="image/png, image/gif, image/jpeg"
                          onChange={(e) => handleLogoUpload(e)}
                        />
                      </div>
                      <div className="mediaeye-CreateCampaign-wrapper-card-uploadBox-content-action mediaeye-CreateCampaign-wrapper-card-uploadBox-logo-action">
                        <EditAvatar />
                      </div>
                    </label>
                  </div>
                  <div className="mediaeye-CreateCampaign-wrapper-card-uploadBox-bottom">
                    140 x 140 JPEG, PNG
                    <br /> recommended.
                  </div>
                  {errorCampaign?.logo ? (
                    <div className="mediaeyeform-group-input-error-message">
                      Logo image is required
                    </div>
                  ) : null}
                </div>
                <div className="mediaeye-CreateCampaign-wrapper-card-body-colmiddle mediaeye-CreateCampaign-wrapper-card-uploadBox">
                  <div className="mediaeyeform-group text-center">
                    <label className="mediaeyeform-label">
                      Displayed Image*
                    </label>
                  </div>

                  <div className="mediaeye-CreateCampaign-wrapper-card-uploadBox-content">
                    <label className="mediaeye-CreateCampaign-wrapper-card-uploadBox-display" htmlFor="displayInput">
                      <div className="mediaeye-CreateCampaign-wrapper-card-uploadBox-display-inner">
                        <img
                          src={
                            display?.url
                              ? display.url
                              : GetDefaultImages('display')
                          }
                          alt="Person"
                        />
                        <input
                          id="displayInput"
                          type="file"
                          className="mediaeye-CreateCampaign-wrapper-card-uploadBox-content-inputfile"
                          name="display"
                          accept="image/png, image/gif, image/jpeg"
                          onChange={(e) => handleDisplaySelect(e)}
                        />
                      </div>
                      <div className="mediaeye-CreateCampaign-wrapper-card-uploadBox-content-action">
                        <EditAvatar />
                      </div>
                    </label>
                  </div>
                  <div className="mediaeye-CreateCampaign-wrapper-card-uploadBox-bottom">
                    280 x 170 JPEG, PNG <br />
                    recommended.
                  </div>
                  {errorCampaign?.display ? (
                    <div className="mediaeyeform-group-input-error-message">
                      Display image is required
                    </div>
                  ) : null}
                </div>

                <div className="mediaeye-CreateCampaign-wrapper-card-body-colright mediaeye-CreateCampaign-wrapper-card-uploadBox">
                  <div className="mediaeyeform-group text-center">
                    <label className="mediaeyeform-label">Banner image*</label>
                  </div>
                  <div className="mediaeye-CreateCampaign-wrapper-card-uploadBox-content">
                    <label className="mediaeye-CreateCampaign-wrapper-card-uploadBox-banner">
                      <div className="mediaeye-CreateCampaign-wrapper-card-uploadBox-banner-inner">
                        <img
                          src={
                            banner?.url
                              ? banner.url
                              : GetDefaultImages('banner')
                          }
                          alt="Banner"
                        />
                        <input
                          className="mediaeye-CreateCampaign-wrapper-card-uploadBox-content-inputfile"
                          type="file"
                          name="banner"
                          accept="image/png, image/gif, image/jpeg"
                          onChange={(e) => handleBannerSelect(e)}
                        />
                      </div>
                      <div className="mediaeye-CreateCampaign-wrapper-card-uploadBox-content-action">
                        <EditAvatar />
                      </div>
                    </label>
                  </div>
                  <div className="mediaeye-CreateCampaign-wrapper-card-uploadBox-bottom">
                    1500 x 240 JPEG, PNG <br />
                    recommended.
                  </div>
                  {errorCampaign?.banner ? (
                    <div className="mediaeyeform-group-input-error-message">
                      Banner image is required
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="mediaeye-CreateCampaign-wrapper-card">
              <div className="mediaeye-CreateCampaign-wrapper-card-switch mediaeyeinfo mediaeyeswitch m-b-30">
                <Switch
                  id="connectSocialMedia"
                  className={`mediaeyeswitch-btn  mediaeyeswitch-right m-r-15 ${toggleSocial ? 'active' : ''
                    }`}
                  checkedIcon={false}
                  uncheckedIcon={false}
                  onChange={() => {
                    switchSocial();
                  }}
                  checked={toggleSocial}
                  height={21}
                  width={50}
                />
                <label htmlFor="connectSocialMedia" className="TextWhite">Connect Social Media Accounts</label>
              </div>
              <div className="mediaeye-CreateCampaign-wrapper-card-inner-body">
                {toggleSocial ? (
                  <>
                    <ConnectSocial
                      socialLinks={links}
                      changeSocialLinks={changeSocialLinks}
                    />
                  </>
                ) : null}
              </div>
            </div>
            <AddSocialEvents />
            <div className="mediaeye-CreateCampaign-wrapper-box">
              <div className="mediaeye-CreateCampaign-wrapper-card">
                <h3>Campaign Accessibility</h3>
                <div className="mediaeye-CreateCampaign-wrapper-card-body radioStyle">
                  <div className="mediaeyetokentype m-b-20" size={3}>
                    {accessType()}
                  </div>

                  {Accessibility === 'Public' ? (
                    <>
                      <div className="mediaeyeform-group">
                        <label className="mediaeyeform-label mediaeyeinfo mediaeyeswitch" htmlFor="participants">
                          <Switch
                            id="participants"
                            className={`mediaeyeswitch-btn mediaeyeswitch-right m-r-15 ${hideParticipants ? 'active' : ''
                              }`}
                            checkedIcon={false}
                            uncheckedIcon={false}
                            onChange={() => {
                              setHideParticipants(!hideParticipants);
                            }}
                            checked={hideParticipants}
                            height={21}
                            width={50}
                          />
                          Participants Limitation
                        </label>
                        {hideParticipants ? (
                          <div className="mediaeyeform-group-input mediaeyeform-group-input-auto">
                            <input
                              className="mediaeyeform-input"
                              placeholder="0"
                              min="0"
                              type="number"
                            />
                          </div>
                        ) : null}
                      </div>
                    </>
                  ) : Accessibility === 'Private' &&
                    activeContent === 'NFT Listed to Campaign' ? (
                    <div className="mediaeye-CreateCampaign-wrapper-card-body-private">
                      <div className="mediaeye-CreateCampaign-wrapper-card-body-private-access">
                        <div className="mediaeyeform-group">
                          <label className="mediaeyeform-label mediaeyeswitch" htmlFor="accessPass">
                            Create your access pass
                            <Switch
                              id="accessPass"
                              className={`mediaeyeswitch-btn mediaeyeswitch-left ${hidePromoCodes ? 'active' : ''
                                }`}
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
                            <label className="mediaeyeform-label mediaeyeinfo" htmlFor="numberOfCodes">
                              Number of codes
                            </label>
                            <div className="mediaeyeform-group-input mediaeyeform-group-input-auto codesrow">
                              <input
                                id="numberOfCodes"
                                className="mediaeyeform-input"
                                type="number"
                                placeholder="100"
                                min="0"
                              />
                              <div className="mediaeyeform-group-input-addon codesrow">
                                <button
                                  type="button"
                                  className="btn btn-gaming"
                                >
                                  Generate
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : null}
                      </div>
                      <div className="mediaeye-CreateCampaign-wrapper-card-body-private-nftpass">
                        <div className="mediaeyeform-group">
                          <div className="mediaeyeform-label mediaeyeswitch">
                            <Switch
                              id="createNftPass"
                              className={`mediaeyeswitch-btn mediaeyeswitch-left ${hideNFTPass ? 'active' : ''
                                }`}
                              checkedIcon={false}
                              uncheckedIcon={false}
                              onChange={() => {
                                setHideNFTPass(!hideNFTPass);
                              }}
                              checked={hideNFTPass}
                              height={21}
                              width={50}
                            />
                            <label htmlFor="createNftPass"> Create NFT pass</label>
                          </div>
                        </div>
                        {hideNFTPass ? (
                          <>
                            <div className="mediaeyeform-group">
                              <label className="mediaeyeform-label mediaeyeinfo" htmlFor="contractAddress">
                                Contract Address
                              </label>
                              <div className="mediaeyeform-group-input mediaeyeform-group-input-auto codesrow">
                                <input
                                  id="contractAddress"
                                  className="mediaeyeform-input"
                                  type="text"
                                  placeholder="1c2e11...6f13d"
                                />
                              </div>
                            </div>
                            <div className="mediaeyeform-group">
                              <label className="mediaeyeform-label mediaeyeinfo" htmlFor="NftId">
                                NFT ID (optional)
                              </label>
                              <div className="mediaeyeform-group-input mediaeyeform-group-input-auto codesrow">
                                <input
                                  id="NftId"
                                  className="mediaeyeform-input"
                                  type="number"
                                  placeholder="9070"
                                />
                              </div>
                            </div>
                          </>
                        ) : null}
                      </div>
                      <div className="mediaeye-CreateCampaign-wrapper-card-body-private-whitelist">
                        <div className="mediaeyeform-label mediaeyeswitch">
                          Whitelisting Participants
                          <Switch

                            className={`mediaeyeswitch-btn mediaeyeswitch-left ${hideAddManually ? 'active' : ''
                              }`}
                            checkedIcon={false}
                            uncheckedIcon={false}
                            onChange={() => {
                              setHideAddManually(!hideAddManually);
                            }}
                            checked={hideAddManually}
                            height={21}
                            width={50}
                          />
                        </div>
                        {hideAddManually ? (
                          <>
                            <div className="launch-airdrop-page-inner-content-row-card-body-selectparticipant w80">
                              <div className="mediaeyeform-group-input">
                                <SelectSearch
                                  className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style"
                                  size="lg"
                                  options={airdropParticipantFilter}
                                  value={activeAirdropParticipantFilter}
                                  placeholder={activeAirdropParticipantFilter}
                                  onChange={(opt) =>
                                    setActiveAirdropParticipantFilter(opt)
                                  }
                                />
                              </div>
                            </div>

                            {activeAirdropParticipantFilter ===
                              'Add manually ERC20 compatible wallets' ? (
                              <div className="launch-airdrop-page-inner-content-row-whitelist-address">
                                <div className="launch-airdrop-page-inner-content-box-1-inside-bountbox-token-list">
                                  <span className="launch-airdrop-page-inner-content-box-1-inside-bountbox-token-list-searchbox">
                                    <input
                                      type="text"
                                      placeholder="Select contract address"
                                      className="launch-airdrop-page-inner-content-box-1-inside-bountbox-token-list-searchbox-field"
                                    />
                                    <img
                                      src={search}
                                      className="launch-airdrop-page-inner-content-box-1-inside-bountbox-token-list-searchbox-searchicon"
                                      alt="search icon"
                                    />
                                  </span>
                                  <button className="btn-square btn-gaming add-btn">
                                    Add
                                  </button>
                                </div>
                                <table>
                                  <thead>
                                    <tr>
                                      <th style={{ borderLeft: 'none' }}>
                                        Wallet Address
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody className="">
                                    <div className="mediaeyefancyScroll-box">
                                      {userAddress.map((address, i) => (
                                        <div
                                          className="launch-airdrop-page-inner-content-row-whitelist-address-row"
                                          key={i}
                                        >
                                          <div className="launch-airdrop-page-inner-content-row-whitelist-address-row-value">
                                            <label>{address.address}</label>
                                          </div>
                                          <button
                                            onClick={() =>
                                              removeWalletAddress(address.id)
                                            }
                                          >
                                            <Close />
                                          </button>
                                        </div>
                                      ))}
                                    </div>
                                  </tbody>
                                </table>
                              </div>
                            ) : activeAirdropParticipantFilter ===
                              'Upload CSV' ? (
                              <>
                                <div className="mediaeyeform-group m-t-30">
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
                                      Upload
                                    </label>
                                  </label>
                                </div>

                                <div className="mediaeye-CreateCampaign-wrapper-card-download">
                                  Download Sample CSV File
                                </div>
                              </>
                            ) : null}
                          </>
                        ) : null}
                      </div>

                      {/* {hideUploadparticipants ? (
                        
                      ) : null} */}
                    </div>
                  ) : null}
                </div>
              </div>

              <div
                className="mediaeye-CreateCampaign-wrapper-card"
                style={{ width: '70%' }}
              >
                <h3>Campaign Category*</h3>
                <div className="mediaeye-CreateCampaign-wrapper-card-body">
                  <CategoriesCard
                    categories={categories}
                    addCategory={addCategory}
                    removeCategory={removeCategory}
                    setSelectCategory={setSelectCategory}

                  />
                  {selectCategory == 'true' ? (
                    <div className="mediaeyeform-group-input-error-message">
                      Campaign Category can't be blank
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="mediaeye-CreateCampaign-privacy">
              <div className="mediaeye-CreateCampaign-wrapper-box bottom">
                <CampaignMetaData
                  setFeatureInformation={setFeatureInformation}
                  featureInformation={featureInformation}
                />
                <FeatureSpotlight
                  setFeatureInformation={setFeatureInformation}
                  featureInformation={featureInformation}
                  type={'Spotlight My Campaign'}
                  name={'Campaign'}
                />
              </div>
              <div className="mediaeye-CreateCampaign-privacy-service">
                <div className="mediaeye-CreateCampaign-privacy-service-eyeswap">
                  <div className="mediaeye-CreateCampaign-privacy-service-eyeswap-header">
                    <EyeSwap type={'green'} />
                    <span>eYeSwap</span>
                  </div>
                  <div className="mediaeye-CreateCampaign-privacy-service-eyeswap-body">
                    <EyeSwapPro />
                  </div>
                </div>
                <div className="mediaeye-CreateCampaign-privacy-service-payment">
                  <PaymentService />
                </div>
              </div>
            </div>
          </div>
          <div className="mediaeye-CreateCampaign-button">
            <button
              type="button"
              className="btn btn-creative center"
              onClick={handlesubmitCampaign}
            >
              Create campaign
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainCreateCampaign;
