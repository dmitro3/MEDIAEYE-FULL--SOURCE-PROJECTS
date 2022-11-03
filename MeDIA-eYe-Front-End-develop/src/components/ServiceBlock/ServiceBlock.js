import React from 'react';
import key from '../../assets/img/about_us/backWithPlanet.png';
import UserCircle from '../../assets/img/about_us/ServiceIcon/UserCircle.png';
import Credit_Card_02 from '../../assets/img/about_us/ServiceIcon/Credit_Card_02.png';
import List_Add from '../../assets/img/about_us/ServiceIcon/List_Add.png';
import Main_Component from '../../assets/img/about_us/ServiceIcon/Main_Component.png';
import Select_Multiple from '../../assets/img/about_us/ServiceIcon/Select_Multiple.png';
import Shopping_Bag_01 from '../../assets/img/about_us/ServiceIcon/Shopping_Bag_01.png';
import Sort_Descending from '../../assets/img/about_us/ServiceIcon/Sort_Descending.png';
import Suitcase from '../../assets/img/about_us/ServiceIcon/Suitcase.png';
import User_Square from '../../assets/img/about_us/ServiceIcon/User_Square.png';
import Users_Group from '../../assets/img/about_us/ServiceIcon/Users_Group.png';
import Chromecast from '../../assets/img/about_us/ServiceIcon/Chromecast.png';
import metahub from '../../assets/img/about_us/ServiceIcon/metahub.png';
import eyewallet from '../../assets/img/about_us/ServiceIcon/eyewallet.png';
import generation from '../../assets/img/about_us/ServiceIcon/content_generation.png';
import libraries from '../../assets/img/about_us/ServiceIcon/content_libraries.png';
import spotlight from '../../assets/img/about_us/ServiceIcon/spotlight.png';
import profileManager from '../../assets/img/about_us/ServiceIcon/Profile_manager.png';
import Settings_Future from '../../assets/img/about_us/ServiceIcon/Settings_Future.png';
import blogging from '../../assets/img/about_us/ServiceIcon/blogging.png';
import lock from '../../assets/img/about_us/ServiceIcon/Lock.png';
import users from '../../assets/img/about_us/ServiceIcon/Users.png';
import reload from '../../assets/img/about_us/ServiceIcon/Arrow_Reload.png';
import PaymentS from '../../assets/img/about_us/ServiceIcon/payment_services.png';

import {
  Gift,
  Heart,
  Token,
  Star,
  Transfer,
  Share,
  Layer,
  Check,
  DoubleCheck
} from '../Icons/';

const ServiceBlock = (props) => {
  return (
    <>
      <section className="mediaeye-layout-section withspacebottom">
        <div className="mediaeye-layout-container">
          <div className="MainAbout-page-gradrow">
            <div className="MainAbout-page-gradrow-inner">
              <h2 className="bluehead">EXTENSIVE RANGE OF SERVICES </h2>
              <ul>
                <li>Broad range of Multi-Chain Creator and User Services</li>
                <li>
                  Programmatic Services for Campaigns, Collections, Stores,
                  Displays, Content Creation, Avatars, Promotions and Charities
                </li>
                <li>
                  Automated delivery and distribution of digital content with
                  NFTs around the world
                </li>
                <li>No Coding Required</li>
              </ul>
            </div>
            <div className="MainAbout-page-gradrow-innerright">
              <img src={key} alt="key" className="key4" />
            </div>
          </div>
          <div className="MainAbout-page-colrow m-t-30">
            <div className="MainAbout-page-colrow-col">
              <h3 className="boldhead">MULTI-CHAIN NFT DRIVEN ECOSYSTEM</h3>
              <h5 className="semi-text flexbox color">
                <Check type={'small'} />
                Subscriptions
              </h5>
              <h5 className="semi-text flexbox color">
                <DoubleCheck />
                Membership
              </h5>
              <h5 className="semi-text flexbox">
                <img src={Suitcase} alt="Pay-As-You Go Services" /> Pay-As-You-Go
              </h5>
              <h5 className="semi-text flexbox margn">
                <img src={profileManager} alt="Profile Manager" />
                Profile Manager
              </h5>
              <h5 className="semi-text flexbox">
                <img
                  src={Main_Component}
                  alt="Farms"
                  style={{ marginTop: '-0.5px' }}
                />
                Farms
              </h5>
              <h5 className="semi-text flexbox">
                <img src={User_Square} alt="Avatar Marketplace" />
                Avatar Marketplace
              </h5>
              <h5 className="semi-text flexbox">
                <Star type={'outline'} /> Rewards Pools
              </h5>
              <h5 className="semi-text flexbox">
                <img src={Shopping_Bag_01} alt="NFT Marketplace" />
                NFT Marketplace
              </h5>
              <h5 className="semi-text flexbox">
                <img src={metahub} alt="metahub" />
                Metahub
              </h5>
              <h5 className="semi-text flexbox opcty margn">
                <Transfer /> eYeSwap
              </h5>
              <h5 className="semi-text image-opacity flexbox">
                <img src={eyewallet} alt="eYeWallet" />
                eYeWallet
              </h5>
              {/* <h5 className="semi-text flexbox margn">
                <Gift />
                Free Services
              </h5> */}


            </div>
            {/* <div className="MainAbout-page-colrow-col">
              <h3 className="boldhead">Users</h3>
            
             
              <h5 className="semi-text flexbox">
                <img src={Credit_Card_02} alt="Payment Services" />
                Payment Services
              </h5>
             
             
              
              <h5 className="semi-text flexbox margn">
                <Heart /> Donate to Charities
              </h5>
            </div> */}
            <div className="MainAbout-page-colrow-col">
              <h3 className="boldhead">Creator Services</h3>
              <h5 className="semi-text flexbox">
                <img src={Settings_Future} alt="Content Creation" />
                Content Creation
              </h5>
              <h5 className="semi-text flexbox">
                <img src={generation} alt="Content Generation" />
                Content Generation
              </h5>
              <h5 className="semi-text flexbox">
                <img src={libraries} alt="Content libraries" />
                Content Libraries
              </h5>
              <h5 className="semi-text flexbox">
                <Layer /> NFT Minting
              </h5>
              <h5 className="semi-text flexbox">
                <img src={List_Add} alt="Collections Minting" />
                Collections Minting
              </h5>
              <h5 className="semi-text flexbox">
                <img src={UserCircle} alt="Avatars & Identity" />
                Avatars & Identity
              </h5>
              <h5 className="semi-text flexbox">
                <img src={Select_Multiple} alt="Airdrop and Bounties" />
                Airdrop and Bounties
              </h5>
              <h5 className="semi-text flexbox">
                <img src={Sort_Descending} alt="Campaign Creator" />
                Campaigns
              </h5>
              <h5 className="semi-text flexbox">
                <img src={spotlight} alt="Spotlight" />
                Spotlight
              </h5>
              {/* <h5 className="semi-text flexbox margn">
                <Token /> Content "SPOTLIGHT" Service
              </h5>
              <h5 className="semi-text flexbox margn">
                <Heart /> Adding Charities to NFTs
              </h5> */}
            </div>
            <div className="MainAbout-page-colrow-col">
              <h3 className="boldhead">Integrated Services</h3>
              <h5 className="semi-text flexbox">
                <img src={users} alt="Megaverse" />
                Megaverse
              </h5>
              <h5 className="semi-text flexbox">
                <Heart />
                Charities
              </h5>
              <h5 className="semi-text flexbox">
                <img src={Users_Group} alt="Social Media" />
                Social Media
              </h5>
              <h5 className="semi-text flexbox">
                <img src={Chromecast} alt="Streaming" />
                Streaming
              </h5>
              <h5 className="semi-text flexbox">
                <Share />
                Mass Marketing
              </h5>
              <h5 className="semi-text flexbox">
                <img src={blogging} alt="Blogging" />
                Blogging
              </h5>
              <h5 className="semi-text flexbox">
                <img src={PaymentS} alt="Payment Services" />
                Payment Services
              </h5>
              <h5 className="semi-text flexbox">
                <img src={reload} alt="Fait on ramps" />
                Fiat on-ramps
              </h5>

              <h5 className="semi-text flexbox margn">
                <img src={lock} alt="KYC" />
                KYC
              </h5>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceBlock;
