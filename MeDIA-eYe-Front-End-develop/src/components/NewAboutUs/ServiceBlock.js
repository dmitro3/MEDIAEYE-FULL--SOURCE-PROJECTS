import React from 'react';
import { useSelector } from 'react-redux';

// Images & Media
import WhySlide1 from '../../assets/img/NewAbout_us/WhySlide1.png';
import marketplaceSlide from '../../assets/img/NewAbout_us/marketplaceSlide.png';
import slide3 from '../../assets/img/about_us/service_slide3.png';
import spotlightSlides from '../../assets/img/NewAbout_us/spotlightSlides.png';
import rightPlanet from '../../assets/img/NewAbout_us/rightPlanet.png';
import whyGrad from '../../assets/img/NewAbout_us/whyGrad.png';

const ServiceBlock = () => {
  const theme = useSelector((state) => state.app.darkTheme);

  return (
    <section className="mediaeye-layout-section withspace PurpleGrad">
      <div className="mediaeye-layout-container">
        <div className="nft_serviceNew">
          <div className="mediaeye-layout-container-header">
            <div class="mediaeye-layout-container-header-heading center">
              <h2>core NFT Services</h2>
            </div>
          </div>
          <div className="nft_serviceNew-strip_container">
            <div className="nft_serviceNew-strip_container-firstrow">
              <div className="imgContainer">
                <div className="blackGrad c1"></div>
                <img src={WhySlide1} className="slide1" alt="slide" />
              </div>
              <div className="nft_serviceNew-strip_container-firstrow-right">
                <h4>Minting NFts & NFT Collections</h4>
                <h6>
                  The common process of creating generative art is by running a
                  machine algorithm, no matter if it is created as an NFT or
                  not. Minting a generative collection on MEDIA EYE platform now
                  adds a new level of uniqueness that could not have been
                  achieved before on a single platform.
                </h6>
              </div>
            </div>
            <div className="nft_serviceNew-strip_container-firstrow">
              <div className="nft_serviceNew-strip_container-firstrow-left">
                <h4>JUMBOMINT</h4>
                <h6>
                  MEDIA EYE Introduces Jumbo mint, unlimited gasless minting
                  which can be uploaded as an active archive for your collection
                  or 1 of 1 creation, making it easy and cost effective to offer
                  your NFTs.
                </h6>
              </div>
              <div className="imgContainer">
                <img src={slide3} className="slide3" alt="slide" />
              </div>
            </div>
            <div className="nft_serviceNew-strip_container-firstrow">
              <div className="imgContainer">
                <div className="blackGrad c1"></div>
                <img src={marketplaceSlide} className="slide1" alt="slide" />
              </div>
              <div className="nft_serviceNew-strip_container-firstrow-right">
                <h4>NFT Marketplace</h4>
                <h6>
                  MeDIA eYe NFT Portal puts the power of blockchain to work for
                  your NFT collections, collectibles, marketing campaigns,
                  promotions, rewards programs and events .
                </h6>
              </div>
              <img src={rightPlanet} className="rightPlanet" alt="slide" />
            </div>
          </div>
        </div>
      </div>
      <div className="nft_serviceNew">
        <img src={spotlightSlides} className="spotlightSlides" alt="slide" />
      </div>
      <div className="mediaeye-purpleGrad"></div>
    </section>
  );
};

export default ServiceBlock;
