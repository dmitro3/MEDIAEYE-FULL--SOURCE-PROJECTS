import React from 'react';

// Images & Media
import whyGrad from '../../assets/img/NewAbout_us/whyGrad.png';
import GradGreen from '../../assets/img/NewAbout_us/GradGreen.png';
import OppSatellite from '../../assets/img/NewAbout_us/OppSatellite.png';

const OpeningOpp = () => {
  return (
    <section className="mediaeye-layout-section mediaeye-OppBlock PurpleGrad">
      <img src={GradGreen} className="GreenGrad" alt="GradGreen" />
      <img src={OppSatellite} className="OppSatellite" alt="OppSatellite" />
      <div className="mediaeye-layout-container">
        <div className="nft_serviceNew head">
          <div className="mediaeye-layout-container-header">
            <div
              class="mediaeye-layout-container-header-heading center animate__fadeIn wow"
              data-wow-duration="1s"
              data-wow-delay="0.5s"
            >
              <h2>Opportunities</h2>
            </div>
          </div>
        </div>
        <div className="mediaeye-OppBlock-content">
          <div className="mediaeye-OppBlock-content-detail">
            <p className="mediaeye-OppBlock-content-detail-head">
              NFT & Collections Creations
            </p>
            <ul className="mediaeye-OppBlock-content-list-box">
              <li className="mediaeye-OppBlock-content-list">
                Multi-Chain NFT Minting
              </li>
              <li className="mediaeye-OppBlock-content-list">
                Jumbo Minting (Gasless Minting, Unlimited)
              </li>
              <li className="mediaeye-OppBlock-content-list">
                Create Group Collections, Store Fronts
              </li>
              <li className="mediaeye-OppBlock-content-list">
                Rapid & Global Digital Content Deployment
              </li>
            </ul>
          </div>
          <div className="mediaeye-OppBlock-content sec">
            <div className="mediaeye-OppBlock-content-detail">
              <p className="mediaeye-OppBlock-content-detail-head-one">
                CAMPAIGNS
              </p>
              <p className="mediaeye-OppBlock-content-detail-content">
                Create Campaigns across Broad Range of Digital Segments
                (e-commerce, crypto, media, gaming and entertainment businesses)
              </p>
            </div>
            <div className="mediaeye-OppBlock-content-detail">
              <p className="mediaeye-OppBlock-content-detail-head-one">
                AIRDROPS
              </p>
              <p className="mediaeye-OppBlock-content-detail-content">
                Multi-chain token and NFT distribution with customizable
                bounties, whitelistings and integrated services
              </p>
            </div>
            <div className="mediaeye-OppBlock-content-detail">
              <p className="mediaeye-OppBlock-content-detail-head-one">
                EVENTS
              </p>
              <p className="mediaeye-OppBlock-content-detail-content">
                Create and customize events with dedicated galleries, offeringss
                and created awareness globally with full suite of aivalable
                integrated services
              </p>
            </div>
            <div className="mediaeye-OppBlock-content-detail">
              <p className="mediaeye-OppBlock-content-detail-head-one">
                CHARITY
              </p>
              <p className="mediaeye-OppBlock-content-detail-content">
                Charitable organization onboarding and donations - follow and
                support charities globally
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OpeningOpp;
