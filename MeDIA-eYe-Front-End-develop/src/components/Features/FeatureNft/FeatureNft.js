import React, { useEffect, useState, useRef } from 'react';
import './FeatureNft.scss';
import { Helmet } from 'react-helmet';
import banner from '../../../assets/img/spotlight/banner.png';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import PopupFeatureHistory from './FeatureHistory/PopupFeatureHistory';
import FeatureNftContent from './FeatureNftContent';
import FeatureCollectionContent from '../FeatureCollection/FeatureCollectionContent';
import FeatureAirdropContent from '../FeatureAirdrop/FeatureAirdropContent';
import FeatureCampaignContent from '../FeatureCampaign/FeatureCampaignContent';

export default function FeatureNft(props) {
  const sliderRef = useRef();

  const location = useLocation();

  let history = useHistory();
  const { closeNftCollapse } = props;
  const [showPopup, setShowPopup] = useState(false);
  const [openFeatureHistory, setOpenFeatureHistory] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [activeTab, setActiveTab] = useState('NFTs');

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

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const toggleFeatureHistory = () => {
    setOpenFeatureHistory(!openFeatureHistory);
  };

  return (
    <>
      <Helmet>
        <meta
          property="og:url"
          content={window.location.origin + '/feature-nft'}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="SPOTLIGHT - Highlight Your NFT Offerings | MEDIA EYE"
        />
        <meta
          property="og:description"
          content="SPOTLIGHT Services allow creators, brands and business to feature their NFTs, events, airdrops, collections, campaigns, avatars and more"
        />
        <meta
          property="og:image"
          content={window.location.origin + '/img/meta_tag/nft spotlight.png'}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="mediaeyenft.com/feature-nft" />
        <meta
          property="twitter:url"
          content={window.location.origin + '/feature-nft'}
        />
        <meta
          name="twitter:title"
          content="SPOTLIGHT - Highlight Your NFT Offerings | MEDIA EYE"
        />
        <meta
          name="twitter:description"
          content="SPOTLIGHT Services allow creators, brands and business to feature their NFTs, events, airdrops, collections, campaigns, avatars and more"
        />
        <meta
          name="twitter:image"
          content={window.location.origin + '/img/meta_tag/nft spotlight.png'}
        />
        <title>SPOTLIGHT - Highlight Your NFT Offerings | MEDIA EYE </title>
        <meta
          name="description"
          content="SPOTLIGHT Services allow creators, brands and business to feature their NFTs, events, airdrops, collections, campaigns, avatars and more"
        />
      </Helmet>
      <div
        className=" mediaeye-layout-content withfulllayout feature-nft-page"
        onClick={closeNftCollapse}
      >
        <div className="feature-nft-page-inner">
          {openFeatureHistory ? (
            <PopupFeatureHistory
              openFeatureHistory={openFeatureHistory}
              togglePopup={toggleFeatureHistory}
            />
          ) : null}
          <div className="mediaeye-layout-container"> </div>
          <div className="feature-nft-page-inner-slider">
            <img src={banner} alt="banner" />
          </div>
          <div className="mediaeye-layout-container feature-nft-page-inner-maintab">
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
          {currentSlide === 2 || activeTab === 'Campaigns' ? (
            <FeatureCampaignContent />
          ) : currentSlide === 3 || activeTab === 'Airdrops' ? (
            <FeatureAirdropContent />
          ) : currentSlide === 4 || activeTab === 'Collections' ? (
            <FeatureCollectionContent />
          ) : (
            <FeatureNftContent />
          )}
        </div>
      </div>
    </>
  );
}
