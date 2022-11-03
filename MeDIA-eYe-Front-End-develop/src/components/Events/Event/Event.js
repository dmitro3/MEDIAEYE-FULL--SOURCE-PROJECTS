import React, { useState } from 'react';
import './Event.scss';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import FeaturedEvent from '../FeaturedEvent';
import EventList from '../EventList';

const airdrops = Array.from({ length: 6 });

export default function FeatureAirdrop() {
  const dispatch = useDispatch();
  const showFeaturePopup = useSelector((state) => state.app.showFeaturePopup);
  let history = useHistory();
  const [activeTab, setActiveTab] = useState('All_Airdrop');
  const focusActiveTab = (e) => {
    console.log(setActiveTab, 'show deta');
    setActiveTab(e.currentTarget.id);
  };

  return (
    <>
      <Helmet>
        <meta property="og:url" content={window.location.origin + '/event'} />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="NFT Driven Events and Private Marketplace | MEDIA EYE"
        />
        <meta
          property="og:description"
          content="Create public or private NFT Driven events for your promotions and digital art sale."
        />
        <meta
          property="og:image"
          content={window.location.origin + '/img/meta_tag/EVENT.png'}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="mediaeyenft.com/event" />
        <meta
          property="twitter:url"
          content={window.location.origin + '/event'}
        />
        <meta
          name="twitter:title"
          content="NFT Driven Events and Private Marketplace | MEDIA EYE"
        />
        <meta
          name="twitter:description"
          content="Create public or private NFT Driven events for your promotions and digital art sale."
        />
        <meta
          name="twitter:image"
          content={window.location.origin + '/img/meta_tag/EVENT.png'}
        />
        <title>NFT Driven Events and Private Marketplace | MEDIA EYE </title>
        <meta
          name="description"
          content="Create public or private NFT Driven events for your promotions and digital art sale."
        />
      </Helmet>
      <div className="event_create-header">
        <div className="event_create-header-banner">
          <img
            className="event_create-header-banner-bgbck"
            src="/img/events-banner.png"
            alt="event banner"
          />
          <div className="event_create-header-banner-heading">
            <p className="event_create-header-banner-heading-title">EVENTS</p>
            <h4 className="event_create-header-banner-heading-description">
              CREATE & PARTICIPATE
            </h4>
          </div>
        </div>
        <div className="event_create-header-airdropbtn">
          <Link to="/event/launch" className="btn btn-creative">
            CREATE EVENT
          </Link>
        </div>
      </div>
      <div className="mediaeye-layout-container">
        <div className="event_create_tabpart">
          <div className="tabs_menu_wrapper">
            <div className="contents_of_tab">
              <button
                className={activeTab === 'All_Airdrop' ? 'active_tab' : ''}
                id="All_Airdrop"
                onClick={focusActiveTab}
              >
                <span>All </span>
                <div className="line"></div>
              </button>
              <button
                className={activeTab === 'event_create' ? 'active_tab' : ''}
                id="event_create"
                onClick={focusActiveTab}
              >
                <span>Featured </span>
                <div className="line"></div>
              </button>
              <button
                className={activeTab === 'Live_Airdrop' ? 'active_tab' : ''}
                id="Live_Airdrop"
                onClick={focusActiveTab}
              >
                <span>Live </span>
                <div className="line"></div>
              </button>
              <button
                className={
                  activeTab === 'Scheduled_Airdrop' ? 'active_tab' : ''
                }
                id="Scheduled_Airdrop"
                onClick={focusActiveTab}
              >
                <span>Scheduled</span>
                <div className="line"></div>
              </button>
            </div>
          </div>

          {activeTab === 'All_Airdrop' ? (
            <>
              <section className="mediaeye-layout-section withspace">
                <div className="mediaeye-layout-container">
                  <div className="mediaeye-layout-section-header">
                    <h2 className="mediaeye-layout-section-header-heading">
                      Featured Events
                    </h2>
                  </div>
                  <div className="mediaeye-layout-container">
                    <FeaturedEvent />
                  </div>
                </div>
              </section>

              <section className="mediaeye-layout-section withspace">
                <div className="mediaeye-layout-container">
                  <div className="mediaeye-layout-section-header">
                    <h2 className="mediaeye-layout-section-header-heading">
                      Live Events
                    </h2>
                  </div>
                  <div className="mediaeye-layout-container">
                    <EventList />
                  </div>
                </div>
              </section>
            </>
          ) : activeTab === 'event_create' ? (
            <section className="mediaeye-layout-section withspace">
              <div className="mediaeye-layout-container">
                <div className="mediaeye-layout-section-header">
                  <h2 className="mediaeye-layout-section-header-heading">
                    Featured Events
                  </h2>
                </div>
                <div className="mediaeye-layout-container">
                  <FeaturedEvent />
                </div>
              </div>
            </section>
          ) : activeTab === 'Live_Airdrop' ? (
            <section className="mediaeye-layout-section withspace">
              <div className="mediaeye-layout-container">
                <div className="mediaeye-layout-section-header">
                  <h2 className="mediaeye-layout-section-header-heading">
                    Live Events
                  </h2>
                </div>
                <div className="mediaeye-layout-container">
                  <EventList />
                </div>
              </div>
            </section>
          ) : null}

          {activeTab === 'Scheduled_Airdrop' ? (
            <section className="mediaeye-layout-section withspace">
              <div className="mediaeye-layout-container">
                <div className="mediaeye-layout-section-header">
                  <h2 className="mediaeye-layout-section-header-heading">
                    Scheduled Events
                  </h2>
                </div>
                <div className="mediaeye-layout-container">
                  <EventList />
                </div>
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </>
  );
}
