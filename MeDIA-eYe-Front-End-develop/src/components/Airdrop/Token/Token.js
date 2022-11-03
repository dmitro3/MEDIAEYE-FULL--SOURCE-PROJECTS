import React, { useState, useEffect } from 'react';
import './Token.scss';
import { TwitterShareButton, FacebookShareButton } from 'react-share';
import { ethers } from 'ethers';
import { Helmet } from 'react-helmet';
import { useSelector, useDispatch } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { Pagination } from 'swiper';
import { ChainHexString } from '../../../blockchain/functions/ChangeChain/ChainHexStrings';
import { queryListings } from '../../../blockchain/functions/Marketplace/QueryListings';
import { useMoralis } from 'react-moralis';
// media and images
import AirdropRegisterPopup from '../../Modals/AirdropRegisterPopup/AirdropRegisterPopup';
import AirdropWinnersPopup from '../../Modals/AirdropWinnersPopup/AirdropWinnersPopup';
import AirdropAccessPopup from '../../Modals/AirdropAccessPopup/AirdropAccessPopup';
import Popup from '../../Modals/CampaignStatsPopup/Popup';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { toggleGeneralPopup } from '../../../store/app/appSlice';

import { Link, useParams } from 'react-router-dom';
import {
  Share,
  Report,
  Horizontal,
  Copy,
  Twitter,
  Facebook,
  Code,
  Globe,
  Telegram,
  Discord,
  Heart,
  User,
  Token,
  ImagePlug,
  Clock,
  Play
} from '../../Icons/';
import { Instagram } from '../../../components/Icons/';
import { roundString } from '../../../blockchain/functions/Utils';
import { useMoralisWeb3Api } from 'react-moralis';
import NextPhaseTimer from './NextPhaseTimer';
import Timer from 'react-compound-timer';
import ExploreBlock from '../../ContentMarketplace/ExploreBlock/ExploreBlock';
import Airdrops from '../../../pages/Airdrops';
import AirdropTaskAction from '../AirdropTasks/AirdropTaskAction';
import AirdropTasks from '../AirdropTasks/AirdropTasks';
import AirdropProvider from '../../../context/AirdropContext';
import { formatListingNFT } from '../../../utils/FormatListingNFT';

const dateOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric'
};

const PHASES = [
  'Scheduled',
  'Whitelisting',
  'Bounties Claiming',
  'Claim Leftover',
  'Ended'
];

const TokenAirdrop = (props) => {
  const Web3Api = useMoralisWeb3Api();
  const { airdrop, Moralis } = props;
  const { isInitialized } = useMoralis();
  const { chain, airdropId } = useParams();
  const url = window.location.href;
  const [registerPopup, setRegister] = useState(false);
  const [windersPopup, setWindersPopup] = useState(false);
  const [accessPopup, setAccessPopup] = useState(false);
  const [ethAddress, setEthAddress] = useState();
  const [currPhase, setCurrPhase] = useState(null);
  const [nftMetadata, setNftMetadata] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [accessPass, setAccessPass] = useState();
  const [whiteList, setWhiteList] = useState();
  const [nftPass, setNftPass] = useState();
  const activeNetwork = useSelector((state) => state.app.activeNetwork);
  const [filters, setMarketFilters] = useState([]);
  const [page, setPage] = useState(0);
  const [allLoaded, setAllLoaded] = useState(false);
  const [promoopen, setPromoopen] = React.useState(false);
  const handlePromo = () => setPromoopen(true);
  const handleClose = () => setPromoopen(false);
  const dispatch = useDispatch();
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

  const collectionsetting = {
    slidesPerView: 3,
    grabCursor: true,
    modules: [Pagination],
    pagination: {
      el: '.mediaeye-airdropdetail-pagination',
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

  useEffect(() => {
    if (Moralis && airdrop) {
      getPhaseTime();
      if (airdrop?.attributes?.airdropType !== 'ERC20') {
        getNFTMetadata();
      }
    }
  }, [airdrop, Moralis]);

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

  /*const getTokenMetadata = async () => {
    //Get metadata for one token
    const options = {
      chain: airdrop?.attributes?.chainId,
      addresses: airdrop?.attributes?.token?.tokenAddress
    };
    const tokenMetadata = await Web3Api.token.getTokenMetadata(options);
    setTokenMetadata(tokenMetadata[0]);
  };*/

  const getNFTMetadata = async () => {
    //Get metadata for one token
    const options = {
      chain: airdrop?.attributes?.chainId,
      address: airdrop?.attributes?.token?.tokenAddress,
      token_id: airdrop?.attributes?.tokenIds[0]
    };
    try {
      const tokenIdMetadata = await Web3Api.token.getTokenIdMetadata(options);
      setNftMetadata(tokenIdMetadata);
    } catch (e) {
      console.log(e);
    }
  };

  const getPhaseTime = async () => {
    const currTime = Number(Date.now());
    if (currTime < airdrop?.attributes?.phaseTimes?.whitelisting)
      setCurrPhase(PHASES[0]);
    else if (
      currTime >= airdrop?.attributes?.phaseTimes?.whitelisting &&
      currTime <= airdrop?.attributes?.phaseTimes?.claiming
    )
      setCurrPhase(PHASES[1]);
    else if (
      currTime >= airdrop?.attributes?.phaseTimes?.claiming &&
      currTime <= airdrop?.attributes?.phaseTimes?.leftovers
    )
      setCurrPhase(PHASES[2]);
    else if (
      currTime >= airdrop?.attributes?.phaseTimes?.leftovers &&
      currTime <= airdrop?.attributes?.phaseTimes?.ended
    )
      setCurrPhase(PHASES[3]);
    else if (currTime >= airdrop?.attributes?.phaseTimes?.ended)
      setCurrPhase(PHASES[4]);
  };
  const handleInput = (e, item) => {
    if (item === '1') {
      setAccessPass(e.target.value);
    }
    if (item === '2') {
      setWhiteList(e.target.value);
    }
    if (item === '3') {
      setNftPass(e.target.value);
    }
  }

  const handleCheck = (type) => {
    if (type === '1') {
      if (accessPass) {
        dispatch(
          toggleGeneralPopup({
            status: 'success',
            message: 'You have Access Pass!',
            textButton: 'OK',
            size: 'sm'
          })
        );
      }
      else {
        dispatch(
          toggleGeneralPopup({
            status: 'error',
            message: 'You have no Access Pass!',
            textButton: 'OK',
            size: 'sm'
          })
        );
      }
    }
    if (type === '2') {
      if (whiteList) {
        dispatch(
          toggleGeneralPopup({
            status: 'success',
            message: 'You are Whitelisted!',
            textButton: 'OK',
            size: 'sm'
          })
        );
      }
      else {
        dispatch(
          toggleGeneralPopup({
            status: 'error',
            message: 'You are not Whitelisted!',
            textButton: 'OK',
            size: 'sm'
          })
        );
      }
    }
    if (type === '3') {
      if (nftPass) {
        dispatch(
          toggleGeneralPopup({
            status: 'success',
            message: 'You have NFT Pass!',
            textButton: 'OK',
            size: 'sm'
          })
        );
      }
      else {
        dispatch(
          toggleGeneralPopup({
            status: 'error',
            message: 'You have no NFT Pass!',
            textButton: 'OK',
            size: 'sm'
          })
        );
      }
    }
  };

  const getNextPhase = () => {
    let nextPhaseTime = 0;
    let nextPhaseMsg = 'Ended';
    const currTime = Number(Date.now());

    if (currPhase === PHASES[0]) {
      nextPhaseMsg = 'Whitelisting Starts';
      nextPhaseTime = airdrop?.attributes?.phaseTimes?.whitelisting - currTime;
    } else if (currPhase === PHASES[1]) {
      nextPhaseMsg = 'Claiming Starts';
      nextPhaseTime = airdrop?.attributes?.phaseTimes?.claiming - currTime;
    } else if (currPhase === PHASES[2]) {
      nextPhaseMsg = 'Leftover Claiming Starts';
      nextPhaseTime = airdrop?.attributes?.phaseTimes?.leftovers - currTime;
    } else if (currPhase === PHASES[3]) {
      nextPhaseMsg = 'Leftover Claiming Ends';
      nextPhaseTime = airdrop?.attributes?.phaseTimes?.ended - currTime;
    }
    return (
      <h6 className="mediaeye-layout-container-flexout-rightprofile-secondrow-claimtime">
        {nextPhaseMsg}
        {currPhase !== PHASES[4] && nextPhaseTime > 0 ? (
          <NextPhaseTimer millisLeft={nextPhaseTime} />
        ) : null}
      </h6>
    );
  };

  const renderNft = () => {
    const metadata = JSON.parse(nftMetadata?.metadata);
    return (
      <>
        <h4>NFT Rewards</h4>
        <img
          style={{ height: '200px', width: '200px' }}
          src={metadata?.image}
          alt={metadata?.name}
        ></img>
        <div>{metadata?.name}</div>
      </>
    );
  };

  const [showMediaeyeActionsSocial, setShowMediaeyeActionsSocial] =
    useState('');
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

  const toggleAirdropRegisterPopup = () => {
    setRegister(!registerPopup);
  };

  const toggleAirdropWinersPopup = () => {
    setWindersPopup(!windersPopup);
  };

  const toggleAirdropAccessPopup = () => {
    setAccessPopup(!accessPopup);
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
  return (
    <AirdropProvider>
      <div className="mediaeye-layout-content">
        <AirdropRegisterPopup
          Moralis={Moralis}
          airdrop={airdrop}
          registerPopup={registerPopup}
          toggleAirdropRegisterPopup={toggleAirdropRegisterPopup}
        />
        <AirdropWinnersPopup
          windersPopup={windersPopup}
          toggleAirdropWinersPopup={toggleAirdropWinersPopup}
        />
        <AirdropAccessPopup
          accessPopup={accessPopup}
          toggleAirdropAccessPopup={toggleAirdropAccessPopup}
        />
        <div className="mediaeye-layout-middle fullwidth">
          <div className="airdropBanner">
            {airdrop?.attributes?.banner ? (
              <img
                src={airdrop?.attributes?.banner}
                className="airdropBanner-img"
                alt="airdrop-banner"
              />
            ) : (
              <ImagePlug />
            )}
          </div>
        </div>

        <div className="mediaeye-layout-container fullwidth">
          <section className="mediaeye-layout-container-flexout">
            <div className="airdropprofileAvatar">
              {airdrop?.attributes?.logo ? (
                <img
                  src={airdrop?.attributes?.logo}
                  alt={airdrop?.attributes?.name}
                  className="airdropprofileAvatar-img"
                />
              ) : (
                <ImagePlug />
              )}
            </div>
            <div className="mediaeye-layout-container-flexout-actions">
              <div
                className={`mediaeye-actions mediaeye-actions-right ${showMediaeyeActionsSocial ? 'open' : ''
                  } `}
                onClick={() => manageSocialMediaDropdown('')}
              >
                <div className="mediaeye-actions-header">
                  <div
                    className={`mediaeye-actions-header-btn  ${showMediaeyeActionsSocial === 'share' ? 'active' : ''
                      }`}
                    onClick={(event) => {
                      event.stopPropagation();
                      manageSocialMediaDropdown('share');
                    }}
                  >
                    <Share />
                    {showMediaeyeActionsSocial === 'share' ? dorpDownActionsList(showMediaeyeActionsSocial) : null}
                  </div>
                  <div
                    className={`mediaeye-actions-header-btn  ${showMediaeyeActionsSocial === 'actions' ? 'active' : ''
                      }`}
                    onClick={(event) => {
                      event.stopPropagation();
                      manageSocialMediaDropdown('actions');
                    }}
                  >
                    <Horizontal />
                    {showMediaeyeActionsSocial === 'actions' ? dorpDownActionsList(showMediaeyeActionsSocial) : null}
                  </div>
                </div>

              </div>
            </div>
            <div className="mediaeye-layout-container-flexout-bottomprofile m-t-30">
              <div className="mediaeye-layout-container-flexout-bottomprofile-row ">
                <h2 className="mediaeye-layout-container-flexout-bottomprofile-row-name">
                  {airdrop?.attributes?.name}
                  <img
                    src="/img/token/BNB.png"
                    className="mediaeye-layout-container-flexout-bottomprofile-row-name-image"
                    alt="BNB"
                  />
                </h2>
                <div className="mediaeye-layout-container-flexout-bottomprofile-row-social mediaeyeinfo">
                  <a className="mediaeye-layout-container-flexout-bottomprofile-row-social-btn m-r-10">
                    <Globe />
                  </a>
                  <a className="mediaeye-layout-container-flexout-bottomprofile-row-social-btn m-r-10">
                    <Instagram />
                  </a>
                  <a className="mediaeye-layout-container-flexout-bottomprofile-row-social-btn m-r-10">
                    <Telegram />
                  </a>
                  <a className="mediaeye-layout-container-flexout-bottomprofile-row-social-btn m-r-10">
                    <Twitter />
                  </a>
                  <a className="mediaeye-layout-container-flexout-bottomprofile-row-social-btn m-r-10">
                    <Discord />
                  </a>
                </div>
              </div>
            </div>
            <div className="mediaeye-layout-container-flexout-bottomprofile-row m-t-30">
              <div className="mediaeye-layout-container-flexout-bottomprofile-row-inner">
                <h4 class="mediaeye-layout-container-flexout-bottomprofile-row-inner-name cursor-pointer">
                  Locked ERC 20 Airdrop
                </h4>
                <h4 class="mediaeye-layout-container-flexout-bottomprofile-row-inner-name cursor-pointer">
                  Presale
                </h4>
                <h4 class="mediaeye-layout-container-flexout-bottomprofile-row-inner-name cursor-pointer">
                  Token allocation per participant: 10 000
                </h4>
                <h4 className="mediaeye-layout-container-flexout-bottomprofile-row-inner-name cursor-pointer">
                  <User type="small" /> Participants: 100/555
                </h4>
                <button
                  className="btn btn-transperant mediaeye-layout-container-flexout-bottomprofile-row-inner-btn"
                  onClick={() => toggleAirdropAccessPopup()}
                >
                  Access Passes
                </button>
              </div>
            </div>
            <div className="mediaeye-layout-container-flexout-bottomprofile-row m-t-30">
              <div className="mediaeye-layout-container-flexout-bottomprofile-row-phase">
                <div className="mediaeye-layout-container-flexout-bottomprofile-row-phase-whitelist">
                  <span className="mediaeye-layout-container-flexout-bottomprofile-row-phase-name">
                    Whitelisting Phase
                  </span>
                  <span className="mediaeye-layout-container-flexout-bottomprofile-row-phase-whitelist-time">
                    {new Date(
                      Number(airdrop?.attributes?.startTime) -
                      Number(airdrop?.attributes?.duration) *
                      24 *
                      60 *
                      60 *
                      1000
                    ).toLocaleDateString('en-US', dateOptions)}{' '}
                    -{' '}
                    {new Date(
                      Number(airdrop?.attributes?.startTime)
                    ).toLocaleDateString('en-US', dateOptions)}
                  </span>
                </div>
                <div className="mediaeye-layout-container-flexout-bottomprofile-row-phase-bount m-t-20">
                  <span className="mediaeye-layout-container-flexout-bottomprofile-row-phase-name">
                    Bounties Claiming Phase
                  </span>
                  <span className="mediaeye-layout-container-flexout-bottomprofile-row-phase-bount-time">
                    {/* className="mediaeye-layout-container-flexout-bottomprofile-row-phase-bount-time active" to change color to yellow */}
                    {new Date(
                      Number(airdrop?.attributes?.startTime)
                    ).toLocaleDateString('en-US', dateOptions)}{' '}
                    -{' '}
                    {new Date(
                      Number(airdrop?.attributes?.startTime) +
                      Number(airdrop?.attributes?.duration) *
                      24 *
                      60 *
                      60 *
                      1000
                    ).toLocaleDateString('en-US', dateOptions)}
                  </span>
                  <span class="mediaeye-layout-container-flexout-bottomprofile-row-phase-bount-claim">
                    <Clock /> 23:07:35
                    <span>left for claiming phase</span>
                  </span>
                </div>
                <div className="mediaeye-layout-container-flexout-bottomprofile-row-phase-leftover m-t-20">
                  <span className="mediaeye-layout-container-flexout-bottomprofile-row-phase-name">
                    Claiming Leftovers Phase
                  </span>
                  <span className="mediaeye-layout-container-flexout-bottomprofile-row-phase-leftover-time">
                    {new Date(
                      Number(airdrop?.attributes?.startTime) -
                      Number(airdrop?.attributes?.duration) *
                      24 *
                      60 *
                      60 *
                      1000
                    ).toLocaleDateString('en-US', dateOptions)}{' '}
                    -{' '}
                    {new Date(
                      Number(airdrop?.attributes?.startTime)
                    ).toLocaleDateString('en-US', dateOptions)}
                  </span>
                </div>
                <div className="m-t-20">
                  <button type="submit" className="btn btn-gaming">
                    Claim Back
                  </button>
                </div>
              </div>
            </div>
            <div className="mediaeye-layout-container-flexout-bottomprofile-row">
              <div className="mediaeye-layout-container-flexout-bottomprofile-row-description">
                {airdrop?.attributes?.description}
              </div>
            </div>
            <div className="mediaeye-layout-container-flexout-bottomprofile-row">
              <button
                className="btn btn-transperant mediaeye-layout-container-flexout-bottomprofile-row-video"
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
            </div>
            <div className="mediaeye-layout-container-flexout-bottomprofile-row m-t-30">
              <div className="mediaeye-layout-container-flexout-bottomprofile-row-rewards">
                <div className="mediaeye-layout-container-flexout-bottomprofile-row-rewards-header">
                  <label class="mediaeyeform-label">Token Awards</label>
                </div>
                <div className="mediaeye-layout-container-flexout-bottomprofile-row-rewards-body">
                  <div class="mediaeye-layout-container-flexout-bottomprofile-row-rewards-body-data">
                    <img src="/img/token/EYE.png" alt="EYE" />
                    <span>10.0023 eYe</span>
                  </div>
                  <div class="mediaeye-layout-container-flexout-bottomprofile-row-rewards-body-data">
                    <img src="/img/token/EYE.png" alt="EYE" />
                    <span>10.0023 eYe</span>
                  </div>
                  <div class="mediaeye-layout-container-flexout-bottomprofile-row-rewards-body-data">
                    <img src="/img/token/EYE.png" alt="EYE" />
                    <span>10.0023 eYe</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mediaeye-layout-container-flexout-bottomprofile-row m-t-30">
              <div className="mediaeye-layout-container-flexout-bottomprofile-row-nft">
                <div className="mediaeye-layout-container-flexout-bottomprofile-row-nft-header">
                  <label class="mediaeyeform-label">NFT Awards</label>
                </div>
                {/* <div className="mediaeye-layout-container-flexout-bottomprofile-row-nft-body"> */}
                <div className="m-b-30">
                  <Swiper
                    {...collectionsetting}
                    className="mediaeye-airdrop-slide"
                  >
                    {products.map((product, i) => (
                      <SwiperSlide key={i}>
                        <ExploreBlock product={product} key={i} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <div className="m-t-10 mediaeye-swiper-pagination mediaeye-swiper-pagination-center withscroll mediaeye-airdropdetail-pagination"></div>
                </div>
                {/* </div> */}
              </div>
            </div>
            <div className="mediaeye-layout-container-flexout-bottomprofile-row">
              <div className="mediaeye-layout-container-flexout-bottomprofile-row-address">
                <div className="mediaeye-layout-container-flexout-bottomprofile-row-address-data">
                  <div className="mediaeyeform-group">
                    <label className="mediaeyeform-label">
                      I have Access Pass
                    </label>
                    <div className="mediaeyeform-group-input">
                      <input
                        type="text"
                        className="mediaeyeform-input"
                        placeholder="Check your wallet address"
                        value={accessPass}
                        onChange={(e) => handleInput(e, "1")}
                      />
                    </div>
                  </div>
                  <button className="btn btn-square btn-transperant"
                    onClick={() => handleCheck('1')}
                  >
                    Check
                  </button>
                </div>
                <div className="mediaeye-layout-container-flexout-bottomprofile-row-address-data">
                  <div className="mediaeyeform-group">
                    <label className="mediaeyeform-label">
                      I am Whitelisted
                    </label>
                    <div className="mediaeyeform-group-input">
                      <input
                        type="text"
                        className="mediaeyeform-input"
                        placeholder="Check your wallet address"
                        value={whiteList}
                        onChange={(e) => handleInput(e, "2")}
                      />
                    </div>
                  </div>
                  <button className="btn btn-square btn-transperant"
                    onClick={() => handleCheck('2')}
                  >
                    Check
                  </button>
                </div>
                <div className="mediaeye-layout-container-flexout-bottomprofile-row-address-data">
                  <div className="mediaeyeform-group">
                    <label className="mediaeyeform-label">
                      I have NFT Pass
                    </label>
                    <div className="mediaeyeform-group-input">
                      <input
                        type="text"
                        className="mediaeyeform-input"
                        placeholder="Check your wallet address"
                        value={nftPass}
                        onChange={(e) => handleInput(e, "3")}
                      />
                    </div>
                  </div>
                  <button className="btn btn-square btn-transperant"
                    onClick={() => handleCheck('3')}
                  >
                    Check
                  </button>
                </div>
              </div>
            </div>
          </section>
          {/* <section className="mediaeye-layout-section Airdrop-token-productSection withspace">
            {airdrop?.attributes?.airdropType === 'ERC1155' && nftMetadata
              ? renderNft()
              : null}
          </section>
          <section className="mediaeye-layout-section">
            <div className="mediaeye-desc">
              <h4>Description:</h4>
              <h6>{airdrop?.attributes?.description}</h6>
              <h4 className="martop">Video Review</h4>
              <iframe
                className="mediaeye-desc-video"
                src={airdrop?.attributes?.embedMedia}
                title=""
                frameborder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </section> */}
          {<AirdropTasks airdrop={airdrop} Moralis={Moralis} />}
          <div className="mediaeye-layout-container-flexout-bottomprofile-row">
            <div className="mediaeyeform-group mediaeye-layout-container-flexout-bottomprofile-row-description">
              <label className="mediaeyeform-label">
                Additional information
              </label>
              <div className="mediaeyetextarea">
                <textarea
                  className="mediaeyetextarea-input"
                  rows="5"
                  placeholder="My NFT Description, pattern of narrative development that aims to make vivid a place, object, character, or group. "
                ></textarea>
              </div>
            </div>
          </div>
          <div className="mediaeye-centerbtn">
            <button
              type="button"
              onClick={() => toggleAirdropRegisterPopup()}
              className="btn btn-creative center"
            >
              Register
            </button>
            <button
              type="button"
              onClick={() => toggleAirdropWinersPopup()}
              className="btn btn-gaming center m-l-20"
            >
              Winners
            </button>
            {/* <button type='button' onClick={() => toggleAirdropWinersPopup()} className='btn btn-creative center'>Winners</button>  */}
          </div>
        </div>
      </div>
    </AirdropProvider>
  );
};

export default TokenAirdrop;
