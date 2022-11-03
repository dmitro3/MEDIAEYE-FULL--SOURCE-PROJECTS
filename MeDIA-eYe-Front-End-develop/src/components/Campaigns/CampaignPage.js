import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Campaign.scss';
import CampaignSection from './CampaignSection';
import FeaturedCampaignSection from './FeaturedCampaignSection';
import LiveCampaign from './LiveCampaign';
import Tabs from '../Common/AnimatedTab/Tabs';
import { Helmet } from 'react-helmet';

const CampaignPage = () => {
  const history = useHistory();
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ['All', 'Spotlight', 'Live', 'Scheduled'];

  const onTabChange = (index) => {
    if (activeTab !== index) {
      setActiveTab(index);
    }
  };

  return (
    <>
      <Helmet>
        <title>Campaigns Drive your growth with NFTs | MEDIA EYE </title>
        <meta
          name="description"
          content="MEDIA EYE token holders can farm up to 50% of the fees earned by the platform, everybody gets a chance to particpate, find out more.."
        />
      </Helmet>
      <div className="campaign-page">
        <div className="campaign-page-banner">
          <img
            className="campaign-page-banner-img"
            src="/img/campaign/campaign_banner.png"
            alt="campaign banner"
          />
        </div>
        <div className="mediaeye-layout-container campaign-page-inner">
          <div className="campaign-page-inner-tab">
            <div className="mediaeye-tabss">
              <Tabs
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={onTabChange}
              />
            </div>
          </div>
          <div className="campaign-page-inner-bar">
            <button
              className="btn btn-featured"
              onClick={() => history.push('/create-campaign')}
            >
              Create Campaign
            </button>
            <form className="mediaeye-searchbar" id="search">
              <input
                placeholder="Search"
                type="text"
                aria-labelledby="search"
              />
            </form>
          </div>
          {activeTab === 0 ? (
            <>
              <div className="campaign-page-inner-content">
                <span className="campaign-page-inner-content-header">
                  Spotlight Campaigns
                </span>
                <div className="campaign-page-inner-content-cards">
                  <FeaturedCampaignSection />
                </div>
              </div>
              <div className="campaign-page-inner-content">
                <span className="campaign-page-inner-content-header">
                  Live Campaigns
                </span>
                <div className="campaign-page-inner-content-cards">
                  <LiveCampaign />
                </div>
              </div>
              <div className="campaign-page-inner-content">
                <span className="campaign-page-inner-content-header">
                  Scheduled Campaigns
                </span>
                <div className="campaign-page-inner-content-cards">
                  <CampaignSection />
                </div>
              </div>
            </>
          ) : activeTab === 1 ? (
            <div className="campaign-page-inner-content">
              <span className="campaign-page-inner-content-header">
                Spotlight Campaigns
              </span>
              <div className="campaign-page-inner-content-cards">
                <FeaturedCampaignSection />
              </div>
            </div>
          ) : activeTab === 2 ? (
            <div className="campaign-page-inner-content">
              <span className="campaign-page-inner-content-header">
                Live Campaigns
              </span>
              <div className="campaign-page-inner-content-cards">
                <LiveCampaign />
              </div>
            </div>
          ) : (
            <div className="campaign-page-inner-content">
              <span className="campaign-page-inner-content-header">
                Scheduled Campaigns
              </span>
              <div className="campaign-page-inner-content-cards">
                <CampaignSection />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CampaignPage;
