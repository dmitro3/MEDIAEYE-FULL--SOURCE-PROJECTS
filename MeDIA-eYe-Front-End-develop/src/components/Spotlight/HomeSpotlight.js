import React, { useEffect, useRef, useState } from 'react';
import './PublicSpotlight.scss';
import { Link, useHistory } from 'react-router-dom';
import SpotlightNft from './SpotlightNft';
import SpotlightCollection from '../Collections/SpotlightCollection';
import SpotlightCampaign from '../Campaigns/SpotlightCampaign';
import SpotlightAirdrop from '../Airdrop/SpotlightAirdrop';
import Tabs from '../Common/AnimatedTab/Tabs';

const HomeSpotlight = () => {
  const history = useHistory();
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ['NFTs', 'Collections', 'Campaigns', 'Airdrops'];
  const onTabChange = (index) => {
    if (activeTab !== index) {
      setActiveTab(index);
    }
  };

  return (
    <>
      <div className="mediaeye-layout-container">
        <div className="mediaeye-tabss public-spotlight-tabs">
          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={onTabChange}
          />
        </div>
      </div>

      <section className="mediaeye-layout-section withspacetop">
        <div className="mediaeye-layout-container">
          <div className="mediaeye-layout-section-header withfilter">
            <div className="mediaeye-layout-section-header-left">
              <h2 className="mediaeye-layout-section-header-heading">
                {activeTab === 0 ? (
                  <>SPOTLIGHT NFTs</>
                ) : activeTab === 1 ? (
                  <>SPOTLIGHT Collections</>
                ) : activeTab === 2 ? (
                  <>SPOTLIGHT Campaigns</>
                ) : activeTab === 3 ? (
                  <>SPOTLIGHT Airdrops</>
                ) : null}
              </h2>
            </div>
          </div>

          {activeTab === 0 ? (
            <SpotlightNft />
          ) : activeTab === 1 ? (
            <SpotlightCollection />
          ) : activeTab === 2 ? (
            <SpotlightCampaign />
          ) : activeTab === 3 ? (
            <SpotlightAirdrop />
          ) : null}
        </div>
      </section>
    </>
  );
};
export default HomeSpotlight;
