import React, { useState } from 'react';
import { useSelector } from 'react-redux';

// Images & Media
import tokenomicsSlide from '../../assets/img/NewAbout_us/tokenomicsSlide.png';

const Tokenomics = (props) => {
  const darkTheme = useSelector((state) => state.app.darkTheme);
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  return (
    <section className="mediaeye-layout-section tokenomics PurpleGrad">
      <div className="mediaeye-tokenomicsBlock">
        <div className="mediaeye-layout-container">
          <div className="nft_serviceNew head">
            <div className="mediaeye-layout-container-header">
              <div
                class="mediaeye-layout-container-header-heading center animate__fadeIn wow"
                data-wow-duration="1s"
                data-wow-delay="0.5s"
              >
                <h2>TOKENOMICS</h2>
              </div>
            </div>
          </div>
          <img src={tokenomicsSlide} alt="slide" />
          <div className="mediaeye-tokenomicsBlock-content">
            <div className="mediaeye-tokenomicsBlock-content-header">
              <span className="t-billion">1 Billion</span>
              <span className="t-total">Total eYe token supply (FIXED)</span>
            </div>
            <ul className="mediaeye-tokenomicsBlock-content-list">
              <li className="mediaeye-tokenomicsBlock-content-list-item tm">
                <h4>Team</h4>
                <p>230m eYe (vesting 24 to 36 months)</p>
              </li>
              <li className="mediaeye-tokenomicsBlock-content-list-item prsl">
                <h4>Presale Round Public</h4>
                <p>50m eYe tokens ($0.01 per eYe)</p>
              </li>
              <li className="mediaeye-tokenomicsBlock-content-list-item ido">
                <h4>IDO</h4>
                <p>20m eYe ($0.015 per eYe token)</p>
              </li>
              <li className="mediaeye-tokenomicsBlock-content-list-item mrkt">
                <h4>Marketing &amp; Rewards</h4>
                <p>250m eYe</p>
              </li>
              <li className="mediaeye-tokenomicsBlock-content-list-item trsr">
                <h4>QUAI DAO Treasury</h4>
                <p>200m eYe </p>
              </li>
              <li className="mediaeye-tokenomicsBlock-content-list-item dev">
                <h4>Development &amp; Investments</h4>
                <p>250m eYe </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tokenomics;
