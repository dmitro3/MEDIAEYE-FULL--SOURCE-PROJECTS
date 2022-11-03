import React, { useState, useRef } from 'react';
import './FeatureAirdrop.scss';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import banner from '../../../assets/img/spotlight/banner.png';
import PopupFeatureHistory from '../FeatureNft/FeatureHistory/PopupFeatureHistory';
import { Angle } from '../../Icons';
import FeatureAirdropContent from './FeatureAirdropContent';
import Slider from 'react-slick';
import feature_nft from '../../../assets/img/spotlight/spotlight_nft.png';
import feature_listing from '../../../assets/img/spotlight/spotlight_listing.png';
import featureEventPoster1 from '../../../assets/img/spotlight/spotlight_event.png';
import collection_spotlight from '../../../assets/img/spotlight/spotlight_collection.png';
import featureAirPoster1 from '../../../assets/img/spotlight/spotlight_airdrop.png';
import FeatureEventContent from '../FeatureEvent/FeatureEventContent';
import FeatureCollectionContent from '../FeatureCollection/FeatureCollectionContent';
import FeatureNftContent from '../FeatureNft/FeatureNftContent';
import FeatureListingContent from '../FeatureListing/FeatureListingContent';
import FeatureCampaignContent from '../FeatureCampaign/FeatureCampaignContent';

const airdrops = Array.from({ length: 6 });

const nftsliders = [
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
  },
  {
    img: featureEventPoster1,
    left: 'FEATURE LISTING',
    right: 'FEATURE AIRDROP'
  }
];

export default function FeatureAirdrop(props) {
  const dispatch = useDispatch();
  const [product, setPrdouct] = useState([]);
  const [openFeatureHistory, setOpenFeatureHistory] = useState(false);
  const [activeTab, setActiveTab] = useState('Airdrops');
  const { closeNftCollapse } = props;
  let history = useHistory();
  const [currentSlide, setCurrentSlide] = useState(1);
  const sliderRef = useRef();

  const focusActiveTab = (e) => {
    setActiveTab(e.currentTarget.id);
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
      className="mediaeye-layout-content feature-airdrop-page"
      onClick={closeNftCollapse}
    >
      <div className="mediaeye-layout-container">
        <div className="mediaeye-layout-container"> </div>
      </div>
      <div className="feature-airdrop-page-header">
        <img src={banner} alt="banner" />
      </div>
      <div className="mediaeye-layout-container m-t-20 m-b-20">
        <div className="mediaeye-tabss">
          <div className="mediaeye-tabss-lists">
            <button
              className={activeTab === 'NFTs' ? 'active-tab' : ''}
              onClick={() => setActiveTab('NFTs')}
            >
              NFTs
              <div className="tab-lists-line"></div>
            </button>
            <button
              className={activeTab === 'Collections' ? 'active-tab' : ''}
              onClick={() => setActiveTab('Collections')}
            >
              Collections
              <div className="tab-lists-line"></div>
            </button>
            <button
              className={activeTab === 'Campaigns' ? 'active-tab' : ''}
              onClick={() => setActiveTab('Campaigns')}
            >
              Campaigns
              <div className="tab-lists-line"></div>
            </button>
            <button
              className={activeTab === 'Airdrops' ? 'active-tab' : ''}
              onClick={() => setActiveTab('Airdrops')}
            >
              Airdrops
              <div className="tab-lists-line"></div>
            </button>
          </div>
        </div>
      </div>
      {activeTab === 'Collections' ? (
        <FeatureCollectionContent />
      ) : activeTab === 'NFTs' ? (
        <FeatureNftContent product={product} />
      ) : activeTab === 'Campaigns' ? (
        <FeatureCampaignContent />
      ) : (
        <FeatureAirdropContent />
      )}
    </div>
  );
}
