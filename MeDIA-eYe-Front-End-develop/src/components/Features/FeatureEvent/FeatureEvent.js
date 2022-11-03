import React, { useState, useRef } from 'react';
import './FeatureEvent.scss';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  closeExtendPopup,
  toggleExtendPopup,
  toggleFeaturePopup
} from '../../../store/app/appSlice';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { closeFeaturePopup } from '../../../store/app/appSlice';
import PopupFeatureHistory from '../FeatureNft/FeatureHistory/PopupFeatureHistory';
import { Angle } from '../../Icons';
import FeatureEventContent from './FeatureEventContent';
import Slider from 'react-slick';
import feature_nft from '../../../assets/img/spotlight/spotlight_nft.png';
import feature_listing from '../../../assets/img/spotlight/spotlight_listing.png';
import featureEventPoster1 from '../../../assets/img/spotlight/spotlight_event.png';
import collection_spotlight from '../../../assets/img/spotlight/spotlight_collection.png';
import featureAirPoster1 from '../../../assets/img/spotlight/spotlight_airdrop.png';
import FeatureCollectionContent from '../FeatureCollection/FeatureCollectionContent';
import FeatureAirdropContent from '../FeatureAirdrop/FeatureAirdropContent';
import FeatureNftContent from '../FeatureNft/FeatureNftContent';
import FeatureListingContent from '../FeatureListing/FeatureListingContent';

const nftsliders = [
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
  },
  {
    img: feature_listing,
    left: 'FEATURE NFT',
    right: 'FEATURE EVENT'
  }
];

export default function FeatureEvent(props) {
  const dispatch = useDispatch();
  let history = useHistory();
  const [product, setPrdouct] = useState([]);
  const showFeaturePopup = useSelector((state) => state.app.showFeaturePopup);
  const showExtendPopup = useSelector((state) => state.app.showExtendPopup);
  const [openFeatureHistory, setOpenFeatureHistory] = useState(false);
  const [activeTab, setActiveTab] = useState('yourEvent');
  const { closeNftCollapse } = props;
  const [currentSlide, setCurrentSlide] = useState(1);
  const sliderRef = useRef();

  const focusActiveTab = (e) => {
    setActiveTab(e.currentTarget.id);
  };

  const toggleFeatureHistory = () => {
    setOpenFeatureHistory(!openFeatureHistory);
  };

  const switchExtendPopup = (prop) => {
    if (showExtendPopup) {
      dispatch(closeExtendPopup());
    } else {
      dispatch(
        toggleExtendPopup({
          type: 'Extend My Event',
          content: {
            attributes: {
              id: product.id
            }
          }
        })
      );
    }
  };

  const switchFeaturePopup = (prop) => {
    console.log(prop, 'checking data');
    if (showFeaturePopup) {
      dispatch(closeFeaturePopup());
    } else {
      dispatch(
        toggleFeaturePopup({
          type: 'Spotlight My Event',
          content: {
            attributes: {
              name: 'feature NFT',
              id: prop
              // image: product[0].fullImage,
              // specific: activeSingle ? 'Fixed Price' : 'Auction'
            }
          }
        })
      );
    }
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
      className="mediaeye-layout-content feature-event-page"
      onClick={closeNftCollapse}
    >
      {openFeatureHistory ? (
        <PopupFeatureHistory
          openFeatureHistory={openFeatureHistory}
          togglePopup={toggleFeatureHistory}
        />
      ) : null}

      <div className="feature-event-page-header">
        <div
          className="feature-airdrop-page-header-arrowleft"
          onClick={() => sliderRef?.current?.slickPrev()}
        >
          <Angle side={'left'} />
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
          <Angle />
        </div>
      </div>
      <div className="mediaeye-layout-middle">
        <div className="feature-event-page-inner mediaeye-layout-container">
          <div className="feature-event-page-inner-bar">
            <div onClick={toggleFeatureHistory}>
              <button className="btn btn-outline-info btn-outline">
                Featured History
              </button>
            </div>
            <div className="mediaeye-searchbar">
              <input placeholder="Search" type="text" />
            </div>
          </div>
        </div>
        {currentSlide === 2 ? (
          <FeatureAirdropContent />
        ) : currentSlide === 3 ? (
          <FeatureCollectionContent />
        ) : currentSlide === 4 ? (
          <FeatureNftContent product={product} />
        ) : currentSlide === 5 ? (
          <FeatureListingContent product={product} />
        ) : (
          <FeatureEventContent />
        )}
      </div>
    </div>
  );
}
