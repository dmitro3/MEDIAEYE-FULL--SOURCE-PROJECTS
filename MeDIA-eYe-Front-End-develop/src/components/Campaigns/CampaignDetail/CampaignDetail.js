import React, { useState, useEffect, useRef } from 'react';
import './CampaignDetail.scss';
import Timer from 'react-compound-timer';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Pagination } from 'swiper';
import { givingBlockOrganizationlist } from '../../../blockchain/functions/Charity/charitycollection';
import CharityCard from '../../Charity/CharityCard/CharityCard';
import Popup from '../../Modals/CampaignStatsPopup/Popup';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import {
  User,
  Users,
  Share,
  Verticale,
  Copy,
  Report,
  Twitter,
  Facebook,
  Code,
  Globe,
  Instagram,
  Telegram,
  Discord,
  Angle,
  Charity,
  YouTube,
  Play,
  ImagePlug,
  Private,
  Heart,
  CheckList,
  Gift,
  Horizontal
} from '../../Icons/';
import { TwitterShareButton, FacebookShareButton } from 'react-share';
import ExploreBlock from '../../ContentMarketplace/ExploreBlock/ExploreBlock';
import { useMoralis } from 'react-moralis';
import { queryListings } from '../../../blockchain/functions/Marketplace/QueryListings';
import { formatListingNFT } from '../../../utils/FormatListingNFT';
import { ChainHexString } from '../../../blockchain/functions/ChangeChain/ChainHexStrings';
import AirdropBlock from '../../Airdrop/AirdropBlock/AirdropBlock';
import { AirdropJson } from '../../../utils/JsonData';
import { toggleGeneralPopup } from '../../../store/app/appSlice';
import { useDispatch } from 'react-redux';

//media & images
import Eminem_NFT from '../../../assets/img/CreateCampaign/Eminem_NFT.png';
import JoinCampaignPopup from '../JoinCampaignPopup';

const collectionsetting = {
  slidesPerView: 3,
  grabCursor: true,
  modules: [Pagination],
  pagination: {
    el: '.mediaeye-CreateCampaign-pagination',
    enable: true,
    clickable: true
  },
  breakpoints: {
    889: {
      slidesPerView: 3
    },
    1181: {
      slidesPerView: 3
    },
    1280: {
      slidesPerView: 4
    }
  }
};

const airdropsetting = {
  slidesPerView: 3,
  grabCursor: true,
  modules: [Pagination],
  pagination: {
    el: '.mediaeye-airdrop-pagination',
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

const charitysetting = {
  slidesPerView: 3,
  grabCursor: true,
  modules: [Pagination],
  pagination: {
    el: '.mediaeye-charity-pagination',
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

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'fit-content',
  height: 'fit-content',
  bgcolor: 'transparent',
  border: '0',
  p: 4
};

export default function CampaignDetail(props) {
  const url = window.location.href;
  const { closeNftCollapse } = props;
  const [showMediaeyeActionsSocial, setShowMediaeyeActionsSocial] = useState('');
  const [pageNumber, setpageNumber] = useState(1);
  const [products, setProducts] = useState([]);
  const [expanded, setExpanded] = useState(true);
  const [isHiddenDisc, setHiddenDisc] = useState(true);
  const [isHiddenYout, setHiddenYout] = useState(false);
  const airdropData = AirdropJson();
  const activeNetwork = useSelector((state) => state.app.activeNetwork);
  const [charityData, setcharityData] = useState([]);
  const [allLoaded, setAllLoaded] = useState(false);
  const [filters, setMarketFilters] = useState([]);
  const [popup, setPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const { Moralis, isInitialized } = useMoralis();
  const [page, setPage] = useState(0);
  const [promoopen, setPromoopen] = React.useState(false);
  const [a, seta] = useState(0);
  const [banner, setBanner] = useState('');
  const [logo, setLogo] = useState('');
  const [registerPopup, setRegisterPopup] = useState(false);
  // reference to state that can be used in listeners (specifically onScroll)
  const productsRef = useRef(products);
  const moralisListing = products?.currentListing;
  let currentListing = moralisListing ? moralisListing : {};
  if (moralisListing?.id) {
    currentListing = {
      id: moralisListing.id,
      type: moralisListing?.attributes?.type,
      status: moralisListing?.attributes?.status,
      size: moralisListing?.attributes?.size
    };
  }
  const handlePromo = () => setPromoopen(true);
  const handleClose = () => setPromoopen(false);
  const dispatch = useDispatch();
  useEffect(async () => {
    if (a == 0) {
      const givingBlockOrganizationres = await givingBlockOrganizationlist(pageNumber);
      if (givingBlockOrganizationres && givingBlockOrganizationres.length > 0) {
        setcharityData(givingBlockOrganizationres);
        seta(1);
      }
    }
  });

  const togglePopup = () => {
    setPopup(!popup);
  };

  // query once when initialized
  useEffect(() => {
    // run after active network is initialized
    if (!activeNetwork || !isInitialized) return;
    // if products was already empty
    if (!products.length || page === 0) {
      getListings();
    } else {
      // reset products
      setProducts([]);
      setPage(0);
    }
    // setAllLoaded(false);
  }, [filters, activeNetwork, isInitialized]);

  useEffect(() => {
    const onScroll = (e) => {
      if (productsRef.current.length > 0) {
        const bottom =
          document.documentElement.scrollTop ===
          document.documentElement.scrollHeight -
          document.documentElement.clientHeight;
        if (bottom) {
          setPage(page + 1);
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const getListings = async () => {
    if (!ChainHexString(activeNetwork)) return;
    const categories =
      filters?.category?.length > 0
        ? filters?.category?.map((category) => {
          return category.value.toLowerCase();
        })
        : null;

    const result = await queryListings(Moralis, {
      status: 'available',
      page: page,
      limit: 8,
      chainId: ChainHexString(activeNetwork),
      categories: categories
    });

    const listings = result[0];
    const nfts = result[1];
    let currProducts = [];
    // add to current product
    if (page > 0) {
      currProducts = [...products];
    }
    for (let i = 0; i < result[0].length; i++) {
      currProducts.push(formatListingNFT(listings[i], nfts[i]));
    }

    // check if there are no more products to load
    if (!result[0].length) setAllLoaded(true);
    setProducts(currProducts);
    setLoading(false);
  };

  const manageSocialMediaDropdown = (type) => {
    if (showMediaeyeActionsSocial === type) {
      setShowMediaeyeActionsSocial('');
    } else {
      setShowMediaeyeActionsSocial(type);
    }
  };
  const socialMediaCloseOutSide = () => {
    setShowMediaeyeActionsSocial('');
  };
  useEffect(() => {
    if (showMediaeyeActionsSocial) {
      document.addEventListener('click', socialMediaCloseOutSide);
      return () =>
        document.removeEventListener('click', socialMediaCloseOutSide);
    }
  }, [showMediaeyeActionsSocial]);

  const handleSocialEvents = () => {
    setExpanded(!expanded);
  };
  const handleHideDisc = () => {
    setHiddenDisc(!isHiddenDisc);
  };
  const handleHideYout = () => {
    setHiddenYout(!isHiddenYout);
  };

  const handleCheck = (type) => {
    if (type == 'access pass') {
      dispatch(
        toggleGeneralPopup({
          status: 'success',
          message: 'You have Access Pass and can Join Campaign!',
          textButton: 'OK',
          size: 'sm'
        })
      );
    }
    if (type == 'wallet address') {
      dispatch(
        toggleGeneralPopup({
          status: 'success',
          message: 'You are Whitelisted and can Join Campaign!',
          textButton: 'OK',
          size: 'sm'
        })
      );
    }
    if (type == 'nft pass') {
      dispatch(
        toggleGeneralPopup({
          status: 'success',
          message: 'You have NFT Pass and can Join Campaign!',
          textButton: 'OK',
          size: 'sm'
        })
      );
    }
  };

  const toggleJoinCampaignPopup = () => {
    setRegisterPopup(!registerPopup);
  };

  const dorpDownActionsList = (type) => {
    return (
      type === 'share' ? (
        <div className="mediaeye-actions-body">
          <div
            className="mediaeye-actions-body-row cursor-pointer"
            onClick={() => {
              navigator.clipboard.writeText(url);
            }}
          >
            <div className="mediaeye-actions-body-row-icon">
              <Copy type="white" />
            </div>
            Copy Link
          </div>
          <TwitterShareButton
            className="mediaeye-actions-body-row"
            url={url}
          >
            <div className="mediaeye-actions-body-row-icon">
              <Twitter />
            </div>
            Share on Twitter
          </TwitterShareButton>
          <FacebookShareButton
            className="mediaeye-actions-body-row"
            url={url}
          >
            <div className="mediaeye-actions-body-row-icon">
              <Facebook type="circle" />
            </div>
            Share on Facebook
          </FacebookShareButton>

        </div>
      ) : type === 'actions' ? (
        <div className="mediaeye-actions-body">
          <Link className="mediaeye-actions-body-row">
            <div className="mediaeye-actions-body-row-icon">
              <Report />
            </div>
            Report
          </Link>
        </div>
      ) : null
    )
  };

  const cardTimerbox = () => {
    return (
      <div className="mediaeye-CampaignSingle-inner-timer m-r-25 btn-square">
        <Timer initialTime={340000000} direction="backward">
          {() => (
            <React.Fragment>
              <span className="mediaeye-CampaignSingle-inner-timer-col m-r-10">
                <Timer.Hours />
                &nbsp; hr
              </span>
              :
              <span className="mediaeye-CampaignSingle-inner-timer-col m-l-10 m-r-10">
                <Timer.Minutes />
                &nbsp; min
              </span>
              :
              <span className="mediaeye-CampaignSingle-inner-timer-col m-l-10">
                <Timer.Seconds />
                &nbsp; sec
              </span>
            </React.Fragment>
          )}
        </Timer>
      </div>
    );
  };

  return (
    <div
      className="mediaeye-layout-content mediaeye-CampaignSingle"
      onClick={closeNftCollapse}
    >
      <JoinCampaignPopup
        registerPopup={registerPopup}
        toggleJoinCampaignPopup={toggleJoinCampaignPopup}
      />
      <Popup popup={popup} togglePopup={togglePopup} />
      <div className="mediaeye-CampaignSingle-inner">
        <div className="mediaeye-layout-middle ">
          <div className="mediaeye-CampaignSingle-profileBanner">
            {banner ? (
              <img
                src={banner}
                className="mediaeye-CampaignSingle-profileBanner-img"
                alt="banner"
              />
            ) : (
              <ImagePlug />
            )}
            <div className="mediaeye-CampaignSingle-profileBanner-tag">
              CAMPAIGN
            </div>
          </div>
        </div>

        <div className="mediaeye-layout-container ">
          <section className="mediaeye-CampaignSingle-inner-flexout">
            <div className="campaignprofileAvatar">
              {logo ? (
                <img
                  src={logo}
                  className="campaignprofileAvatar-img"
                  alt="campaignprofileAvatar-img"
                />
              ) : (
                <ImagePlug />
              )}
            </div>

            <div className="mediaeye-CampaignSingle-inner-flexout-actions">
              <div
                className={`mediaeye-actions mediaeye-actions-right ${showMediaeyeActionsSocial ? 'open' : ''
                  } `}
                onClick={() => manageSocialMediaDropdown('')}
              >
                <div className="mediaeye-actions-header">
                  <div className={`mediaeye-actions-header-btn  ${showMediaeyeActionsSocial === 'share' ? 'active' : ''
                    }`} onClick={(event) => { event.stopPropagation(); manageSocialMediaDropdown('share'); }}>
                    <Share />
                    {showMediaeyeActionsSocial === 'share' ? dorpDownActionsList(showMediaeyeActionsSocial) : null}
                  </div>
                  <div className={`mediaeye-actions-header-btn   ${showMediaeyeActionsSocial === 'actions' ? 'active' : ''}`} onClick={(event) => { event.stopPropagation(); manageSocialMediaDropdown('actions'); }}>
                    <Horizontal />
                    {showMediaeyeActionsSocial === 'actions' ? dorpDownActionsList(showMediaeyeActionsSocial) : null}
                  </div>
                </div>

              </div>
            </div>
            <div className="mediaeye-CampaignSingle-inner-flexout-bottomprofile">
              <div className="mediaeye-CampaignSingle-inner-flexout-bottomprofile-row m-t-30">
                <h2>EMINEM NFT Campaign</h2>
                <div className="mediaeye-CampaignSingle-inner-flexout-bottomprofile-row-social mediaeyeinfo">
                  <a className="mediaeye-CampaignSingle-inner-flexout-bottomprofile-row-social-btn m-r-10">
                    <Globe />
                  </a>
                  <a className="mediaeye-CampaignSingle-inner-flexout-bottomprofile-row-social-btn m-r-10">
                    <Instagram />
                  </a>
                  <a className="mediaeye-CampaignSingle-inner-flexout-bottomprofile-row-social-btn m-r-10">
                    <Telegram />
                  </a>
                  <a className="mediaeye-CampaignSingle-inner-flexout-bottomprofile-row-social-btn m-r-10">
                    <Twitter />
                  </a>
                  <a className="mediaeye-CampaignSingle-inner-flexout-bottomprofile-row-social-btn">
                    <Discord />
                  </a>
                </div>
              </div>
              <div className="mediaeye-CampaignSingle-inner-flexout-bottomprofile-row m-t-10">
                <div className="mediaeye-CampaignSingle-inner-flexout-bottomprofile-row-inner">
                  <div
                    className="mediaeye-CampaignSingle-inner-flexout-bottomprofile-row-status"
                    type="live"
                  >
                    live
                  </div>
                  <div className="mediaeye-CampaignSingle-inner-flexout-bottomprofile-row-dateRange m-l-15">
                    August 20, 2022 - August 27, 2022
                  </div>
                </div>
                <button
                  className="btn btn-transperant"
                  onClick={() => togglePopup()}
                >
                  campaign stats
                </button>
              </div>
            </div>
            <div className="mediaeye-CampaignSingle-inner-flexout-bottomprofile-row m-t-20">
              <div className="mediaeye-CampaignSingle-inner-flexout-bottomprofile-row-inner">
                <h4 className="b-r  cursor-pointer">
                  <Users /> Public
                  {/* <Private /> Private */}{' '}
                  {/*Do not delete, to be used with condition.*/}
                </h4>
                <h4 className="b-r m-l-30 cursor-pointer">
                  <Heart />
                  Charity participant
                </h4>
                <h4 className="b-r m-l-30 cursor-pointer">
                  <CheckList />
                  Crypto, Media, Sports
                </h4>
                {/* <h4 className="m-l-30 cursor-pointer">
                  <Gift />
                  NFT Avatar
                </h4> */}
              </div>
            </div>
          </section>
          <section className="mediaeye-layout-section">
            <div className="mediaeye-CampaignSingle-inner-desc m-t-25 text-semitransperant">
              NFT Title is by far my most versatile algorithm to date. Although
              the program stays focused on structured curves and blocks, the
              varieties of scale, organization, texture, and color usage it can
              employ create a wide array of generative possibilities.
            </div>
            <div className="mediaeye-layout-container-header">
              <button
                className="btn btn-transperant disFlex"
                onClick={handlePromo}
              >
                <Play /> Watch promo
              </button>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={promoopen}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 300
                }}
              >
                <Fade in={promoopen}>
                  <Box sx={style}>
                    <iframe
                      width="560"
                      height="315"
                      src="https://www.youtube.com/embed/qfCNl1nntv8"
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                    ></iframe>
                  </Box>
                </Fade>
              </Modal>
              <button
                className="btn btn-info m-l-30"
                onClick={() => toggleJoinCampaignPopup()}
              >
                Join
              </button>
            </div>
          </section>
          <section className="mediaeye-layout-section">
            <div className="mediaeye-CampaignSingle-inner-checkSection">
              <div className="mediaeye-CampaignSingle-inner-checkSection-address">
                <div className="mediaeyeform-group">
                  <label className="mediaeyeform-label">
                    I have Access Pass
                  </label>
                  <div className="mediaeyeform-group-input">
                    <input
                      type="text"
                      className="mediaeyeform-input"
                      placeholder="Check your wallet address"
                    />
                  </div>
                </div>
                <button
                  className="btn btn-square btn-transperant"
                  onClick={() => handleCheck('access pass')}
                >
                  Check
                </button>
              </div>
              <div className="mediaeye-CampaignSingle-inner-checkSection-address">
                <div className="mediaeyeform-group">
                  <label className="mediaeyeform-label">I am Whitelisted</label>
                  <div className="mediaeyeform-group-input">
                    <input
                      type="text"
                      className="mediaeyeform-input"
                      placeholder="Check your wallet address"
                    />
                  </div>
                </div>
                <button
                  className="btn btn-square btn-transperant"
                  onClick={() => handleCheck('wallet address')}
                >
                  Check
                </button>
              </div>
              <div className="mediaeye-CampaignSingle-inner-checkSection-address">
                <div className="mediaeyeform-group">
                  <label className="mediaeyeform-label">I have NFT Pass</label>
                  <div className="mediaeyeform-group-input">
                    <input
                      type="text"
                      className="mediaeyeform-input"
                      placeholder="Check your wallet address"
                    />
                  </div>
                </div>
                <button
                  className="btn btn-square btn-transperant"
                  onClick={() => handleCheck('nft pass')}
                >
                  Check
                </button>
              </div>
            </div>
          </section>
          <section className="mediaeye-layout-section">
            <div
              className={`mediaeye-CampaignSingle-section ${expanded ? 'open' : ''
                }`}
            >
              <div
                className={`mediaeye-CampaignSingle-inner-header cursor-pointer  ${expanded ? 'open' : ''
                  }`}
                onClick={() => handleSocialEvents()}
              >
                <div className="mediaeye-CampaignSingle-inner-header-heading m-r-15">
                  Social Media & Streaming Events
                </div>
                <Angle side={'down'} />
              </div>
              <div className="mediaeye-CampaignSingle-inner-card-wrapper">
                <div
                  className={`mediaeye-CampaignSingle-inner-SocialContent ${expanded ? 'open' : ''
                    }`}
                >
                  <div
                    className={`mediaeye-CampaignSingle-inner-card ${isHiddenDisc ? 'open' : ''
                      }`}
                  >
                    <div
                      className="cursor-pointer"
                      onClick={() => handleHideDisc()}
                    >
                      <div className="mediaeye-CampaignSingle-inner-card-head">
                        <h2>Discord Event</h2>
                        <div className="mediaeyeinfo">
                          {cardTimerbox()}{' '}
                          <Angle side={isHiddenDisc ? 'up' : 'down'} />
                        </div>
                      </div>
                      <div className="mediaeye-CampaignSingle-inner-card-subhead m-b-15 m-t-5">
                        April 17, 2022{' '}
                      </div>
                    </div>
                    <div className="mediaeye-CampaignSingle-inner-card-content m-t-5">
                      <div
                        className={`mediaeye-CampaignSingle-inner-card-content-wrapper  ${isHiddenDisc ? 'open' : ''
                          }`}
                      >
                        <div className="mediaeye-CampaignSingle-inner-card-subhead text-semitransperant">
                          Take the red bean to join the garden. View the
                          collection at xxx.com/gallery.
                        </div>
                        <div className="mediaeye-CampaignSingle-inner-card-subhead text-semitransperant m-b-30">
                          XXX starts with a collection of 10,000 avatars that
                          give you membership access to The Garden: a corner of
                          the internet where artists, builders, and web3
                          enthusiasts meet to create a decentralized future. Xxx
                          holders receive access to exclusive drops,
                          experiences, and more. Visit xxx.com for more details.
                        </div>
                        <button className="btn mediaeye-CampaignSingle-socialbtn">
                          <Discord /> Discord
                        </button>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`mediaeye-CampaignSingle-inner-card ${isHiddenYout ? 'open' : ''
                      }`}
                  >
                    <div
                      className="cursor-pointer"
                      onClick={() => handleHideYout()}
                    >
                      <div className="mediaeye-CampaignSingle-inner-card-head">
                        <h2>YouTube Event</h2>
                        <div className="mediaeyeinfo">
                          {cardTimerbox()}{' '}
                          <Angle side={isHiddenYout ? 'up' : 'down'} />
                        </div>
                      </div>
                      <div className="mediaeye-CampaignSingle-inner-card-subhead m-b-15 m-t-5">
                        April 18, 2022
                      </div>
                    </div>
                    <div className="mediaeye-CampaignSingle-inner-card-content m-t-5">
                      <div
                        className={`mediaeye-CampaignSingle-inner-card-content-wrapper  ${isHiddenYout ? 'open' : ''
                          }`}
                      >
                        <div className="mediaeye-CampaignSingle-inner-card-subhead text-semitransperant">
                          Take the red bean to join the garden. View the
                          collection at xxx.com/gallery.
                        </div>
                        <div className="mediaeye-CampaignSingle-inner-card-subhead text-semitransperant m-b-30">
                          XXX starts with a collection of 10,000 avatars that
                          give you membership access to The Garden: a corner of
                          the internet where artists, builders, and web3
                          enthusiasts meet to create a decentralized future. Xxx
                          holders receive access to exclusive drops,
                          experiences, and more. Visit xxx.com for more details.
                        </div>
                        <button className="btn mediaeye-CampaignSingle-socialbtn">
                          <YouTube /> YouTube
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="mediaeye-layout-content bottomnospace m-b-20">
            <div className="mediaeye-CampaignSingle-inner-header-heading m-r-15 m-b-40">
              Campaign Gallery
            </div>
            <div className="m-b-30">
              <Swiper {...collectionsetting} className="mediaeye-airdrop-slide">
                {products.map((product, i) => (
                  <SwiperSlide key={i}>
                    <ExploreBlock product={product} key={i} />
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="m-t-10 mediaeye-swiper-pagination mediaeye-swiper-pagination-center withscroll mediaeye-CreateCampaign-pagination"></div>
            </div>
            <div className="mediaeyeinfo text-justify-center m-t-30">
              <Link to="/campaign/gallery" className="btn btn-info">
                Open gallery
              </Link>
              {/* <button className="btn btn-transperant m-l-30">
                Spotlight Collection
              </button> */}
            </div>
          </section>
          <section className="mediaeye-layout-section m-t-30 m-b-20">
            <div className="mediaeye-CampaignSingle-inner-header-heading m-r-15 m-b-40">
              Airdrops
            </div>
            <div className="m-b-30">
              <Swiper {...airdropsetting} className="mediaeye-airdrop-slide">
                {airdropData.map((airdrop, i) => (
                  <SwiperSlide key={i}>
                    <AirdropBlock airdrop={airdrop} key={i} />
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="m-t-10 mediaeye-swiper-pagination mediaeye-swiper-pagination-center withscroll mediaeye-airdrop-pagination"></div>
            </div>
            {/* <div className="mediaeyeinfo text-justify-center m-t-30">
              <button className="btn btn-transperant m-l-30">
                Spotlight Airdrop
              </button>
            </div> */}
          </section>
          <section className="mediaeye-layout-section m-t-30">
            <div className="mediaeye-CampaignSingle-inner-header-heading m-r-15 m-b-40">
              Charities
            </div>
            <div className="m-b-30">
              <Swiper {...charitysetting} className="mediaeye-airdrop-slide">
                {charityData.map((charity, i) => (
                  <SwiperSlide key={i}>
                    <CharityCard charity={charity} key={i} />
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="m-t-10 mediaeye-swiper-pagination mediaeye-swiper-pagination-center withscroll mediaeye-charity-pagination"></div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
