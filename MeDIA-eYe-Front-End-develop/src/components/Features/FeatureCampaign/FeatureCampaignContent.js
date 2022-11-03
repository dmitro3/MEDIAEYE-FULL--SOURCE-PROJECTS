import React, { useState } from 'react';
import FeaturedAirdop from '../../Airdrop/FeaturedAirdop/FeaturedAirdop';
import CampaignBlock from '../../Campaigns/CampaignBlock/CampaignBlock';
import CampaignSection from '../../Campaigns/CampaignSection';
import PopupFeatureHistory from '../FeatureNft/FeatureHistory/PopupFeatureHistory';
export default function FeatureCampaignContent() {
  const [openFeatureHistory, setOpenFeatureHistory] = useState(false);
  const toggleFeatureHistory = () => {
    setOpenFeatureHistory(!openFeatureHistory);
  };

  return (
    <>
      <div className="mediaeye-layout-middle">
        <div className="mediaeye-layout-container">
          <div className="feature-campaign-page-inner-content">
            {openFeatureHistory ? (
              <PopupFeatureHistory
                openFeatureHistory={openFeatureHistory}
                togglePopup={toggleFeatureHistory}
              />
            ) : null}
            <section className="mediaeye-layout-section">
              <div className="mediaeye-layout-container">
                <div className="feature-campaign-page-headbar">
                  <span>SPOTLIGHT Campaigns </span>
                  <div className="feature-campaign-page-headbar-inner">
                    <button type="button" onClick={toggleFeatureHistory}>
                      Spotlight History
                    </button>
                    <div className="mediaeye-searchbar">
                      <input placeholder="Search" type="text" />
                    </div>
                  </div>
                </div>
                <CampaignSection />
              </div>
            </section>

            <section className="mediaeye-layout-section withspace">
              <div className="mediaeye-layout-container">
                <div className="mediaeye-layout-section-header">
                  <h2 className="mediaeye-layout-section-header-heading">
                    Campaign
                  </h2>
                </div>
                <div className="mediaeye-layout-container">
                  <CampaignSection />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
