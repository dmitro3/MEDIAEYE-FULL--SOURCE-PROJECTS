import React, { useEffect, useState, useRef } from 'react';
import './FeatureListing.scss';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RightArrow } from '../../Icons';
import LeftSign from '../../Icons/ExploreBlockIcons/LeftSign';
import { useMoralis } from 'react-moralis';
import PopupFeatureHistory from '../FeatureNft/FeatureHistory/PopupFeatureHistory';
import FeatureListingContent from './FeatureListingContent';
import Slider from 'react-slick';
import feature_nft from '../../../assets/img/spotlight/spotlight_nft.png';
import feature_listing from '../../../assets/img/spotlight/spotlight_listing.png';
import featureEventPoster1 from '../../../assets/img/spotlight/spotlight_event.png';
import collection_spotlight from '../../../assets/img/spotlight/spotlight_collection.png';
import featureAirPoster1 from '../../../assets/img/spotlight/spotlight_airdrop.png';
import FeatureEventContent from '../FeatureEvent/FeatureEventContent';
import FeatureCollectionContent from '../FeatureCollection/FeatureCollectionContent';
import FeatureAirdropContent from '../FeatureAirdrop/FeatureAirdropContent';
import FeatureNftContent from '../FeatureNft/FeatureNftContent';



const nftsliders = [
  {
    img: feature_listing,
    left: 'FEATURE NFT',
    right: 'FEATURE EVENT'
  },
  {
    img: featureEventPoster1,
    left: 'FEATURE LISTING',
    right: 'FEATURE AIRDROP'
  },
  {
    img: featureAirPoster1,
    left: 'FEATURE EVENT',
    right: 'FEATURE COLLECTION'
  },
  {
    img: collection_spotlight,
    left: 'FEATURE AIRDROP',
    right: 'FEATURE NFT'
  },
  {
    img: feature_nft,
    left: 'FEATURE COLLECTION',
    right: 'FEATURE LISTING'
  }
];

export default function FeatureListing(props) {
  useEffect(() => {
    getOwner();
  });

  const location = useLocation();
  const [product, setPrdouct] = useState([]);
  const dispatch = useDispatch();
  const showFeaturePopup = useSelector((state) => state.app.showFeaturePopup);
  const showExtendPopup = useSelector((state) => state.app.showExtendPopup);
  let history = useHistory();
  const [showPopup, setShowPopup] = useState(false);
  const [openFeatureHistory, setOpenFeatureHistory] = useState(false);
  const [owner, setOwner] = useState(null);
  const { closeNftCollapse } = props;
  const [currentListing, setCurrentListing] = useState(null);
  const { Moralis, user, isInitialized } = useMoralis();
  const [listedNftCardSelect, setListedNftCardSelect] = useState([]);
  const [featuredNftCardSelect, setFeaturedNftCardSelect] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(1);
  const sliderRef = useRef();

  const getProduct = (prop) => {
    setPrdouct(prop);
  };

  useEffect(() => { }, []);

  const getOwner = async () => {
    const ownerAddress = currentListing?.attributes?.seller;
    try {
      const ownerParams = { address: ownerAddress };
      const owner = await Moralis.Cloud.run('queryUser', ownerParams);
      setOwner(owner);
    } catch (e) {
      console.log(e);
    }
  };
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const toggleFeatureHistory = () => {
    setOpenFeatureHistory(!openFeatureHistory);
  };

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rows: 1,
    slidesPerRow: 1,
    arrows: false,
    fade: true,
    autoplay: false,
    pauseOnHover: true,
    beforeChange: (current, next) => setCurrentSlide(next + 1)
  };

  return (
    <div
      className=" mediaeye-layout-content feature-listing-page"
      onClick={closeNftCollapse}
    >
      {openFeatureHistory ? (
        <PopupFeatureHistory
          openFeatureHistory={openFeatureHistory}
          togglePopup={toggleFeatureHistory}
        />
      ) : null}
      <div className="feature-listing-page-inner">
        <div className="feature-listing-page-inner-slider">
          <div className="feature-listing-page-inner-slider-faturelist">
            <div
              className="feature-airdrop-page-header-arrowleft"
              onClick={() => sliderRef?.current?.slickPrev()}
            >
              <LeftSign />
            </div>
            <Slider
              {...settings}
              ref={sliderRef}
              className="nftmarketplace-header-poster-fullscreen"
            >
              {nftsliders.map((image, i) => {
                return <img src={image.img} alt="NFTImg" />;
              })}
            </Slider>
            <div
              className="feature-airdrop-page-header-arrowright"
              onClick={() => sliderRef?.current?.slickNext()}
            >
              <RightArrow />
            </div>
          </div>
        </div>
        <div className="mediaeye-layout-middle">
          <div className="mediaeye-layout-container feature-listing-page-inner-searchFilter">
            <div className="handle-button">
              <button
                type="button"
                className="btn btn-outline-info btn-outline"
                onClick={toggleFeatureHistory}
              >
                Featured History
              </button>
            </div>
            <div className="mediaeye-searchbar">
              <input placeholder="Search" type="text" />
            </div>
          </div>
        </div>
        {currentSlide === 2 ? (
          <FeatureEventContent />
        ) : currentSlide === 3 ? (
          <FeatureAirdropContent />
        ) : currentSlide === 4 ? (
          <FeatureCollectionContent />
        ) : currentSlide === 5 ? (
          <FeatureNftContent product={product} />
        ) : (
          <FeatureListingContent product={product} />
        )}
      </div>
    </div>
  );
}
