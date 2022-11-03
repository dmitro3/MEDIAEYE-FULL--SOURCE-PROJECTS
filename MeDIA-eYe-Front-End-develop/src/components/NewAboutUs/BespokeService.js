import React from 'react';
import { useSelector } from 'react-redux';

// Images & Media
import AirdropsSlide from '../../assets/img/NewAbout_us/AirdropsSlide.png';
import CharitiesSlide from '../../assets/img/NewAbout_us/CharitiesSlide.png';
import EventsGallerySlide from '../../assets/img/NewAbout_us/EventsGallerySlide.png';
import MeDIAeYeHUBSlide from '../../assets/img/NewAbout_us/MeDIAeYeHUBSlide.png';
import Planet3 from '../../assets/img/NewAbout_us/Planet3.png';

const BespokeService = () => {
  return (
    <section
      className="mediaeye-layout-section withspace PurpleGrad"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      <div className="mediaeye-layout-container">
        <div className="nft_serviceNew">
          <div className="mediaeye-layout-container-header">
            <div class="mediaeye-layout-container-header-heading center">
              <h2>BESPOKE SERVICES</h2>
            </div>
          </div>
          <div className="nft_serviceNew-strip_container">
            <div className="nft_serviceNew-strip_container-firstrow SB">
              <div className="imgContainer">
                <div className="blackGrad"></div>
                <img src={AirdropsSlide} className="slide" alt="slide" />
              </div>
              <div className="nft_serviceNew-strip_container-firstrow-right">
                <h4>Airdrops with Bounties</h4>
                <h6>
                  Creators are able to create airdrop events which can provide
                  either NFTs
                </h6>
              </div>
            </div>
            <div className="nft_serviceNew-strip_container-firstrow SB">
              <div className="nft_serviceNew-strip_container-firstrow-left">
                <h4>MeDIA eYe HUB</h4>
                <h6>
                  NFT Hub allows users to research popular artists, content on
                  multiple marketplaces across a diverse range of blockchain
                  networks.
                </h6>
              </div>
              <div className="imgContainer">
                <div className="blackGrad"></div>
                <img src={MeDIAeYeHUBSlide} className="slide" alt="slide" />
              </div>
            </div>
            <div className="nft_serviceNew-strip_container-firstrow SB">
              <div className="imgContainer">
                <div className="blackGrad"></div>
                <img src={EventsGallerySlide} className="slide" alt="slide" />
              </div>
              <div className="nft_serviceNew-strip_container-firstrow-right">
                <h4>Events Gallery</h4>
                <h6>
                  NFT Events is a service where creators and businesses can
                  showcase their NFT content, services and brands.
                </h6>
              </div>
            </div>
            <div className="nft_serviceNew-strip_container-firstrow SB">
              <div className="nft_serviceNew-strip_container-firstrow-left">
                <h4>Charities place</h4>
                <h6>
                  Charity Place allows creators to donate to various legally
                  registered charitable organizations which is made possible
                  through MEDIA EYE's partnership with The Giving Block
                </h6>
              </div>
              <div className="imgContainer">
                <div className="blackGrad"></div>
                <img src={CharitiesSlide} className="slide" alt="slide" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <img src={Planet3} className="topPlanet" alt="planet" />
      <img src={Planet3} className="bottomPlanet" alt="planet" />
    </section>
  );
};

export default BespokeService;
