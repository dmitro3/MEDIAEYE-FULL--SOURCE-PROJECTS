import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import RoadmapArrow from '../Icons/RoadMap';
import './Roadmap.scss';
import RoadmapTop from '../../assets/img/about_us/roadmap_top.png';

const Roadmap = (props) => {
  const darkTheme = useSelector((state) => state.app.darkTheme);
  const [openColumn, setOpenColumn] = useState([
    false,
    false,
    false,
    false,
    false,
    false
  ]);
  const [showQuater, setShowQuater] = useState('Q1');

  const toggleOpenColumn = (number) => {
    const arr = openColumn.slice();
    arr[number] = !arr[number];
    setOpenColumn(arr);
  };

  const toggleQuater = (quater) => {
    if (quater == 'Q1') {
      setShowQuater('Q1');
    } else if (quater == 'Q2') {
      setShowQuater('Q2');
    } else if (quater == 'Q3') {
      setShowQuater('Q3');
    } else {
      setShowQuater();
    }
  };

  return (
    <section className="mediaeye-layout-section withspace roadmap">
      <img src={RoadmapTop} className="roadmap-top_img" alt="roadmap" />
      <div className="mediaeye-layout-container fullwidth">
        <h1
          className={'roadmap-title animate__animated animate__zoomIn wow'}
          data-wow-duration="1s"
          data-wow-delay="0.5s"
        >
          Roadmap
        </h1>
      </div>
      <div className="roadmap-wrapper">
        <div className="roadmap-wrapper-quater">
          <div onClick={() => toggleQuater('Q1')}>
            <h2 className={showQuater === 'Q1' ? 'selected' : null}>
              <span>Q1</span>2022
            </h2>
          </div>
          <div onClick={() => toggleQuater('Q2')}>
            <h2 className={showQuater === 'Q2' ? 'selected mh2t' : 'mh2t'}>
              <span>Q2</span>2022
            </h2>
          </div>
          <div onClick={() => toggleQuater('Q3')}>
            <h2 className={showQuater === 'Q3' ? 'selected mh2t' : 'mh2t'}>
              <span>Q3</span>2022
            </h2>
          </div>
        </div>
        <div className="roadmap-wrapper-content">
          <div
            className={
              showQuater === 'Q1' ? 'selected1 roadmap_row' : 'roadmap_row'
            }
          >
            <div className="roadmap_col">
              <h5 onClick={() => toggleOpenColumn(0)}>
                Jan - Feb <RoadmapArrow />
              </h5>
              <div className="roadmap_col_inside">
                <ul>
                  <li>
                    Complete UI/UX Development and Testing for Beta Launch
                  </li>
                  <li>
                    Testing Backend and Completion of Contract Event Sensing
                    Integration
                  </li>
                  <li>Price Feeds Integration</li>
                  <li>Airdrops with Bounties, APIs Integration</li>
                  <li>Charity Place APIs Integration</li>
                  <li>Fantom Blockchain Integration</li>
                  <li>Media Discord Community is Updated</li>
                  <li>Add Generative Collections Functionality</li>
                  <li>Fantom Blockchain Integration Completed</li>
                  <li>Payment providers chosen and APIs integrated</li>
                </ul>
              </div>
            </div>
            <div className="roadmap_col">
              <h5 onClick={() => toggleOpenColumn(1)}>
                March - April <RoadmapArrow />
              </h5>
              <div className="roadmap_col_inside">
                <ul>
                  <li>
                    Start of API integration for Socials, Streaming, Events,
                    etc...
                  </li>
                  <li>Charity Place Integration Completed</li>
                  <li>Chainlink Price Feeds Integration Completed</li>
                  <li>Backend - Continued Testing of Event Sensing</li>
                  <li>Design and Development of Metavatars Continued</li>
                  <li>Complete Backend Updates for Events</li>
                  <li>Complete Backend Updates for Airdrops</li>
                  <li>Completed Backend Updates for SPOTLIGHT</li>
                  <li>UI/UX Front End Updates to Design and Functionality </li>
                </ul>
              </div>
            </div>
            <div className="roadmap_col">
              <h5 onClick={() => toggleOpenColumn(2)}>
                April - May <RoadmapArrow />
              </h5>
              <div className="roadmap_col_inside">
                <ul>
                  <li>Update Branding and Design for the Platform</li>
                  <li>Testing of Price Feeds Integration</li>
                  <li>
                    API Integration for Socials, Streaming, Events... Continued
                  </li>
                  <li>Cross Chain Subscriptions Contracts Updates</li>
                  <li>
                    Complete Contract and Front End Updates for Jumbo Minting
                  </li>
                  <li>
                    Complete Front End Updates for NFT Collections and
                    Marketplace
                  </li>
                  <li>Complete Updates for HUB NFT Stats</li>
                  <li>Complete Updates for Marketplace Auctions and Offers</li>
                  <li>Initiate Design and Development for Metavatars</li>
                </ul>
              </div>
            </div>
          </div>
          <div
            className={
              showQuater === 'Q2' ? 'selected2 roadmap_row' : 'roadmap_row'
            }
          >
            <div className="roadmap_col">
              <h5 onClick={() => toggleOpenColumn(3)}>
                April - May <RoadmapArrow />
              </h5>
              <div className="roadmap_col_inside">
                <ul>
                  <li>Metavatars Development Continues</li>
                  <li>Front End UI/UX Modifications and Code Updates</li>
                  <li>Front End Security Testing</li>
                  <li>User Profile Update Functionality</li>
                  <li>Complete Integration of Charity Place</li>
                  <li>
                    Complete APIs Integration for Socials, Streaming, Events and
                    Airdrops
                  </li>
                  <li>Complete SPOTLIGHT Updates for Featuring Content</li>
                  <li>Update Minting Services for Generative Collections</li>
                  <li>Build Generative Collections Generator</li>
                  <li>Initiate Restricted Beta Testing</li>
                  <li>
                    Begin to Prepare Marketing Content for Global Roll Out
                  </li>
                  <li>Update MEDIA EYE Signature NFT Collections Utility</li>
                  <li>Continue Restricted Beta Testing - Bugs Fixes</li>
                </ul>
              </div>
            </div>
            <div className="roadmap_col">
              <h5 onClick={() => toggleOpenColumn(4)}>
                May - June <RoadmapArrow />
              </h5>
              <div className="roadmap_col_inside">
                <ul>
                  <li>Build Metavatar Backend and Complete Front End Design</li>
                  <li>User Rewards Pools Functionality Updated</li>
                  <li>UI/UX Design Updates Continued</li>
                  <li>Update Discord and Open Price Chat on TG</li>
                  <li>Backend Data Base for Platform Updates Continued</li>
                  <li>Update Socials with New Branding</li>
                  <li>Server Upgrade and Updated Completed for Backend</li>
                  <li>MEDIA EYE User Guide Development</li>
                  <li>Integration of EYE Multi-Chain Token Swap Completed</li>
                  <li>Payment Provider Services Testing</li>
                  <li>
                    Form New Partnership with KOLs, Entertainers and Protocols
                  </li>
                  <li>Content Creation for Global Roll Out Continued</li>
                </ul>
              </div>
            </div>
            <div className="roadmap_col">
              <h5 onClick={() => toggleOpenColumn(5)}>
                June - July <RoadmapArrow />
              </h5>
              <div className="roadmap_col_inside">
                <ul>
                  <li>Complete Front End UI/UX for Generative Collections</li>
                  <li>Updates to MEDIA EYE Gitbook</li>
                  <li>Marketing Plan Development and Partnerships Continued</li>
                  <li>
                    Rewards for LP Token Holders and Rewards for Tasks and
                    Referrals Programs Design Completed
                  </li>
                  <li>
                    Restricted Beta Testing Continues (over 150 Bugs Identified
                    and Fixed)
                  </li>
                  <li>
                    Generative Collections Generator Completed - Integration to
                    Front End
                  </li>
                  <li>MEDIA EYE Signature NFT Collections Minting</li>
                  <li>Metavatars Libraries Creation and Integration</li>
                  <li>Metavatars Pages Design and Build Completion</li>
                  <li>
                    Initiate Marketing Campaign with YouTube 4 Part Series and
                    AMA within Partner's Community
                  </li>
                  <li>Announce Partnerships</li>
                </ul>
              </div>
            </div>
          </div>
          <div
            className={
              showQuater === 'Q3' ? 'selected3 roadmap_row' : 'roadmap_row'
            }
          >
            <div className="roadmap_col">
              <h5 onClick={() => toggleOpenColumn(6)}>
                July-August <RoadmapArrow />
              </h5>
              <div className="roadmap_col_inside">
                <ul>
                  <li>Release MEDIA EYE Platform in Public Beta</li>
                  <li>Release Metavatars</li>
                  <li>Launch Syndicated TV Interviews</li>
                  <li>Release LP Token and Tasks & Referrals Programs</li>
                  <li>On-Board NFT Collections </li>
                  <li>Release Platinum Creator Incentives Program</li>
                  <li>
                    Start Release of NFT Campaigns with KOLs, Entertainers and
                    Partner Protocols
                  </li>
                  <li>
                    Initiate EYE Token Burn on ETH and BSC to Release EYE on FTM
                  </li>
                  <li>Setup and Integrate EYE Token Cohort Farm on FTM</li>
                </ul>
              </div>
            </div>
            <div className="roadmap_col">
              <h5 onClick={() => toggleOpenColumn(7)}>
                August-September <RoadmapArrow />
              </h5>
              <div className="roadmap_col_inside">
                <ul>
                  <li>Announce Partnerships</li>
                  <li>Complete Public Beta, MEDIA EYE COMMERCIAL RELEASE!</li>
                  <li>
                    Assist our Partners, Creators, KOLs, Entertainers, Brands to
                    Release Global Campaigns
                  </li>
                  <li>
                    Metavatars Libraries Pay as U - Go Services Available to the
                    Public
                  </li>
                  <li>
                    Initiate Integration for MEDIA EYE Platform and Services to
                    Solana and Avalanche Networks
                  </li>
                  <li>TV Syndicated Interviews Continue</li>
                  <li>
                    Livestream Event with Partners, Creators, KOLs and
                    Entertainers
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
