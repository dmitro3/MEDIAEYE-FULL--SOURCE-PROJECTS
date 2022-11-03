import React, { useEffect } from 'react';
import Slider from 'react-slick';
import { NavLink } from 'react-router-dom';
import './OpeningOpp.scss';

// Images & Media
import splanet4 from '../../assets/img/about_us/Planet4.png';
import splanet3 from '../../assets/img/about_us/3.png';
import splanet5 from '../../assets/img/about_us/pngwing4.png';
import plusimg from '../../../src/assets/img/landingimg/plus-add.png';
import linegrpimg from '../../../src/assets/img/landingimg/Chart_Line.png';
import IntegratedServices from '../ContentMarketplace/IntegratedServices/IntegratedServices';
import heximg from '../../../src/assets/img/landingimg/Settings_Future.png';

const OpeningOpp = () => {
  const settings = {
    slidesToShow: 3,
    arrows: false,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          dots: true
        }
      },
      {
        breakpoint: 545,
        settings: {
          slidesToShow: 1,
          dots: true
        }
      }
    ]
  };

  return (
    <section className="mediaeye-layout-section OpeningOpp">
      <img src={splanet5} alt="planet" className="splanet5" />
      <img src={splanet4} alt="planet" className="splanet4" />
      <img src={splanet3} alt="planet" className="splanet3" />
      <div className="mediaeye-layout-container mid_cont">
        <h1 className="mediaeye-layout-container-heading">
          Meta-Gate: OPENING <br /> Opportunities
        </h1>
        <div className="mediaeye-layout-container-box">
          <div className="mediaeye-layout-container-box-gateway">
            <span>
              <img
                className="mediaeye-layout-container-box-gateway-meta-gate-icon"
                src={plusimg}
                alt="plusimg"
              />
            </span>
            <div className="mediaeye-layout-container-box-gateway-meta-detail">
              <p className="mediaeye-layout-container-box-gateway-meta-detail-head">
                NFT & Collections Creations
              </p>
              <ul className="mediaeye-layout-container-box-gateway-meta-list-box">
                <li className="mediaeye-layout-container-box-gateway-meta-list">
                  Multi-Chain NFT Minting
                </li>
                <li className="mediaeye-layout-container-box-gateway-meta-list">
                  Jumbo Minting (Gasless Minting, Unlimited)
                </li>
                <li className="mediaeye-layout-container-box-gateway-meta-list">
                  Create Group Collections, Store Fronts
                </li>
                <li className="mediaeye-layout-container-box-gateway-meta-list">
                  Rapid & Global Digital Content Deployment
                </li>
              </ul>
            </div>
          </div>
          <div className="gatwboxway">
            <div className="mediaeye-layout-container-box-gateway box1">
              <span className="plus_svg">
                <svg
                  width="53"
                  height="40"
                  viewBox="0 0 53 54"
                  fill="none"
                  xmlns="https://www.w3.org/2000/svg"
                >
                  <g opacity="0.5">
                    <path
                      d="M35.3598 26.7764H17.8372"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M26.5985 18.015L26.5985 35.5378"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>
              </span>
              <div className="mediaeye-layout-container-box-gateway-meta-detail">
                <p className="mediaeye-layout-container-box-gateway-meta-detail-head-one">
                  CAMPAIGNS
                </p>
                <ul className="mediaeye-layout-container-box-gateway-meta-list-box">
                  <p className="">
                    Create campaigns across a broad range of digital segments
                    (e-commerce, crypto, media, gaming and entertainment
                    businesses)
                  </p>
                </ul>
              </div>
            </div>
            <div className="mediaeye-layout-container-box-gateway box1">
              <span className="plus_svg">
                <svg
                  width="53"
                  height="40"
                  viewBox="0 0 53 54"
                  fill="none"
                  xmlns="https://www.w3.org/2000/svg"
                >
                  <g opacity="0.5">
                    <path
                      d="M35.3598 26.7764H17.8372"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M26.5985 18.015L26.5985 35.5378"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>
              </span>
              <div className="mediaeye-layout-container-box-gateway-meta-detail">
                <p className="mediaeye-layout-container-box-gateway-meta-detail-head-one">
                  AIRDROPS
                </p>
                <ul className="mediaeye-layout-container-box-gateway-meta-list-box">
                  <p className="">
                    Multi-chain token and NFT distribution with customizable
                    bounties, whitelistings and integrated services
                  </p>
                </ul>
              </div>
            </div>
            <div className="mediaeye-layout-container-box-gateway box1">
              <span className="plus_svg">
                <svg
                  width="53"
                  height="40"
                  viewBox="0 0 53 54"
                  fill="none"
                  xmlns="https://www.w3.org/2000/svg"
                >
                  <g opacity="0.5">
                    <path
                      d="M35.3598 26.7764H17.8372"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M26.5985 18.015L26.5985 35.5378"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>
              </span>
              <div className="mediaeye-layout-container-box-gateway-meta-detail">
                <p className="mediaeye-layout-container-box-gateway-meta-detail-head-one">
                  EVENTS
                </p>
                <ul className="mediaeye-layout-container-box-gateway-meta-list-box">
                  <p className="">
                    Create and customize events with dedicated galleries,
                    offeringss and created awareness globally with full suite of
                    aivalable integrated services
                  </p>
                </ul>
              </div>
            </div>
            <div className="mediaeye-layout-container-box-gateway box1">
              <span className="plus_svg">
                <svg
                  width="53"
                  height="40"
                  viewBox="0 0 53 54"
                  fill="none"
                  xmlns="https://www.w3.org/2000/svg"
                >
                  <g opacity="0.5">
                    <path
                      d="M35.3598 26.7764H17.8372"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M26.5985 18.015L26.5985 35.5378"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>
              </span>
              <div className="mediaeye-layout-container-box-gateway-meta-detail">
                <p className="mediaeye-layout-container-box-gateway-meta-detail-head-one">
                  CHARITY
                </p>
                <ul className="mediaeye-layout-container-box-gateway-meta-list-box">
                  <p className="">
                    Charitable organization onboarding and donations - follow
                    and support charities globally
                  </p>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mediaeye-layout-container mid_cont">
        <div className="mediaeye-layout-container-box">
          <div className="mediaeye-layout-container-box-gateway">
            <span>
              <img
                className="mediaeye-layout-container-box-gateway-meta-gate-icon"
                src={linegrpimg}
                alt="linegrpimg"
              />
            </span>
            <div className="mediaeye-layout-container-box-gateway-meta-detail">
              <p className="mediaeye-layout-container-box-gateway-meta-detail-head1">
                DIGITAL MARKETING SUPPORTED
              </p>
              <ul className="mediaeye-layout-container-box-gateway-meta-list-box1">
                <li className="mediaeye-layout-container-box-gateway-meta-list">
                  Growth Marketing
                </li>
                <li className="mediaeye-layout-container-box-gateway-meta-list">
                  Growth Hacking
                </li>
                <li className="mediaeye-layout-container-box-gateway-meta-list">
                  Guerilla Marketing
                </li>
                <li className="mediaeye-layout-container-box-gateway-meta-list">
                  Influencer Marketing
                </li>
                <li className="mediaeye-layout-container-box-gateway-meta-list">
                  Social Media Marketing
                </li>
                <li className="mediaeye-layout-container-box-gateway-meta-list">
                  Gaming Marketing
                </li>
                <li className="mediaeye-layout-container-box-gateway-meta-list">
                  Social Gaming Marketing
                </li>
                <li className="mediaeye-layout-container-box-gateway-meta-list">
                  Social Commerce Marketing
                </li>
                <li className="mediaeye-layout-container-box-gateway-meta-list">
                  Rewards-Based Marketing
                </li>
                <li className="mediaeye-layout-container-box-gateway-meta-list">
                  Event Based Marketing
                </li>
                <li className="mediaeye-layout-container-box-gateway-meta-list">
                  Bounty Driven Marketing
                </li>
                <li className="mediaeye-layout-container-box-gateway-meta-list">
                  Participatory Marketing
                </li>
                <li className="mediaeye-layout-container-box-gateway-meta-list">
                  Grass Rooots Marketing
                </li>
                <li className="mediaeye-layout-container-box-gateway-meta-list">
                  Brand Awareness Marketing
                </li>
                <li className="mediaeye-layout-container-box-gateway-meta-list">
                  Direct Marketing
                </li>
                <li className="mediaeye-layout-container-box-gateway-meta-list">
                  Impact Marketing
                </li>
                <li className="mediaeye-layout-container-box-gateway-meta-list">
                  Blogger Marketing
                </li>
                <li className="mediaeye-layout-container-box-gateway-meta-list">
                  Active and Pasassive Content Marketing
                </li>
                <li className="mediaeye-layout-container-box-gateway-meta-list">
                  Performance Marketing
                </li>
                <li className="mediaeye-layout-container-box-gateway-meta-list">
                  Events Based Direct and Mass Marketing Tools
                </li>
                <li className="mediaeye-layout-container-box-gateway-meta-list">
                  Outbond and Inbound Marketing
                </li>
              </ul>
            </div>
          </div>

          <div className="mediaeye-layout-container-box-gateway">
            <span>
              <img className="meta-gate-icon" src={heximg} alt="heximg" />
            </span>
            <div className="mediaeye-layout-container-box-gateway-meta-detail">
              <p className="mediaeye-layout-container-box-gateway-meta-detail-head2">
                INTEGRATED SERVICES
              </p>

              <div className="social-link-box">
                <div className="mediaeye-layout-container">
                  <IntegratedServices />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OpeningOpp;
