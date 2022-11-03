import React, { useState, useRef } from 'react';
import './FeatureCampaign.scss';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import banner from '../../../assets/img/spotlight/banner.png';
import FeatureCollectionContent from '../FeatureCollection/FeatureCollectionContent';
import FeatureNftContent from '../FeatureNft/FeatureNftContent';
import FeatureCampaignContent from './FeatureCampaignContent';
import FeatureAirdropContent from '../FeatureAirdrop/FeatureAirdropContent';

export default function FeatureCampaign(props) {
  const dispatch = useDispatch();
  const [product, setPrdouct] = useState([]);
  const [activeTab, setActiveTab] = useState('Campaigns');
  const { closeNftCollapse } = props;
  let history = useHistory();
  const [currentSlide, setCurrentSlide] = useState(1);
  const sliderRef = useRef();

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
      className="mediaeye-layout-content feature-campaign-page"
      onClick={closeNftCollapse}
    >
      <div className="mediaeye-layout-container">
        <div className="mediaeye-layout-container"> </div>
      </div>
      <div className="feature-campaign-page-header">
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
      ) : activeTab === 'Airdrops' ? (
        <FeatureAirdropContent />
      ) : (
        <FeatureCampaignContent />
      )}
    </div>
  );
}
