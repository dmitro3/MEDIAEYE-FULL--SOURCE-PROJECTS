import React, { useState } from 'react';
import AirdropWithBounties from '../../Airdrop/AirdropWithBounties/AirdropWithBounties';
import FeaturedAirdop from '../../Airdrop/FeaturedAirdop/FeaturedAirdop';
import PopupFeatureHistory from '../FeatureNft/FeatureHistory/PopupFeatureHistory';
export default function FeatureAirdropContent() {
  const [openFeatureHistory, setOpenFeatureHistory] = useState(false);
  const toggleFeatureHistory = () => {
    setOpenFeatureHistory(!openFeatureHistory);
  };

  return (
    <>
      <div className="mediaeye-layout-middle">
        <div className="mediaeye-layout-container">
          <div className="feature-airdrop-page-inner-content">
            {openFeatureHistory ? (
              <PopupFeatureHistory
                openFeatureHistory={openFeatureHistory}
                togglePopup={toggleFeatureHistory}
              />
            ) : null}
            <section className="mediaeye-layout-section">
              <div className="mediaeye-layout-container">
                <div className="feature-airdrop-page-headbar">
                  <span>SPOTLIGHT Airdrops </span>
                  <div className="feature-airdrop-page-headbar-inner">
                    <button type="button" onClick={toggleFeatureHistory}>
                      Spotlight History
                    </button>
                    <div className="mediaeye-searchbar">
                      <input placeholder="Search" type="text" />
                    </div>
                  </div>
                </div>
                <div className="mediaeye-layout-container">
                  <FeaturedAirdop />
                </div>
              </div>
            </section>

            <section className="mediaeye-layout-section withspace">
              <div className="mediaeye-layout-container">
                <div className="mediaeye-layout-section-header">
                  <h2 className="mediaeye-layout-section-header-heading">
                    Airdrops
                  </h2>
                </div>
                <div className="mediaeye-layout-container">
                  <AirdropWithBounties />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
