import React from 'react';
import Top_group from '../../assets/img/about_us/Top_group.png';

const MainHead = (props) => {
  return (
    <>
      <section className="mediaeye-layout-section">
        <div className="MainAbout-page-banner">
          <div className="mediaeye-layout-container">
            <div className="MainAbout-page-toprow">
              <div className="MainAbout-page-toprow-left">
                <h1>
                  MEDIA EYE
                  <br /> NFT PORTAL
                </h1>
                <h5>NFTs Unbound</h5>
              </div>
              <img
                src={Top_group}
                alt="Top_group"
                className="MainAbout-page-toprow-right"
              />
            </div>
            <div className="MainAbout-page-secondrow">
              <div className="MainAbout-page-secondrow-inner">
                <h2 className="bluehead">ABOUT MEDIA EYE</h2>
                <h5 className="semi-text">
                  Expanding the possibilities with NFTs, supporting the broadest
                  range of NFT use cases for art, gaming, crypto, business,
                  advertising, media, sports, charity and more.
                </h5>

                <h5 className="semi-text">
                  MEDIA EYE offers a comprehensive suite of programmatic
                  services designed to drive rapid adoption and enable all users
                  to create, highlight, deploy and cost-effectively distribute
                  their digital content through a single platform.
                </h5>
              </div>
              <div className="MainAbout-page-secondrow-inner">
                <h2 className="bluehead">Web 3.0 </h2>
                <h3 className="boldhead">
                  Blockchain-as-a-Service Platform for NFT-Driven Services
                </h3>
                <h5 className="semi-text">
                  Opening the METAGATE to the Metaverse!
                </h5>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MainHead;
