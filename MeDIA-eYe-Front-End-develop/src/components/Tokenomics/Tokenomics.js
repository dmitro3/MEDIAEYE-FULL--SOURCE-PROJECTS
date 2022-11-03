import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './tokenomics.scss';
import Popup from 'reactjs-popup';

// Images & Media
import diagramm from '../../assets/img/tokenomics_dg.png';
import diagrammWhite from '../../assets/img/tokenomics_dg_white.png';
import diagrammMobile from '../../assets/img/tokenomics_dg@mobile.png';
import TokenomicsTop from '../../assets/img/about_us/tokenomics_top.png';

const Tokenomics = (props) => {
  const darkTheme = useSelector((state) => state.app.darkTheme);
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  return (
    <section className="mediaeye-layout-section tokenomics">
      <img
        src={TokenomicsTop}
        alt="tokenomics-Top_img"
        className="tokenomics-Top_img"
      />
      <div className="mediaeye-layout-container fullwidth">
        <h2
          className="mediaeye-layout-container-title animate__animated animate__fadeIn wow"
          data-wow-duration="1s"
          data-wow-delay="0.5s"
        >
          Tokenomics
        </h2>
        <div className="mediaeye-layout-container-content">
          <div className="mediaeye-layout-container-content-header">
            <span className="t-billion">1 Billion</span>
            <span className="t-total">Total eYe token supply</span>
            <span className="t-fixed">(FIXED)</span>
          </div>
          <picture>
            <source
              srcSet={diagrammMobile}
              media="(max-width: 768px)"
              type="image/png"
            />
            <img
              className="mediaeye-layout-container-content-diagramm"
              src={darkTheme ? diagramm : diagrammWhite}
              alt="diagramm"
            />
          </picture>
          <ul className="mediaeye-layout-container-content-list">
            <li className="mediaeye-layout-container-content-list-item tm">
              <h4>Team</h4>
              <p>230m eYe (vesting 24 to 36 months)</p>
            </li>
            <li className="mediaeye-layout-container-content-list-item prsl">
              <h4>Presale Round Public</h4>
              <p>50m eYe tokens ($0.01 per eYe)</p>
            </li>
            <li className="mediaeye-layout-container-content-list-item ido">
              <h4>IDO</h4>
              <p>20m eYe ($0.015 per eYe token)</p>
            </li>
            <li className="mediaeye-layout-container-content-list-item mrkt">
              <h4>Marketing &amp; Rewards</h4>
              <p>250m eYe</p>
            </li>
            <li className="mediaeye-layout-container-content-list-item trsr">
              <h4>QUAI DAO Treasury</h4>
              <p>200m eYe </p>
            </li>
            <li className="mediaeye-layout-container-content-list-item dev">
              <h4>Development &amp; Investments</h4>
              <p>250m eYe </p>
            </li>
          </ul>
          <button type="button" className="btn btn-main">
            <span>Buy eYe</span>
            <Popup open={open} closeOnDocumentClick onClose={closeModal}>
              <div className="modal" style={{ flexWrap: 'wrap' }}>
                <a
                  onClick={closeModal}
                  style={{
                    fontSize: '30px',
                    position: 'absolute',
                    top: '0',
                    right: '20px',
                    color: '#fff',
                    cursor: ' pointer'
                  }}
                >
                  &times;
                </a>
                <div className="trade">
                  <div className="trade-buttons trade-left">
                    <a
                      href="https://app.uniswap.org/#/swap?outputCurrency=0x9a257c90fa239fba07771ef7da2d554d148c2e89"
                      target="_blank"
                      style={{ outline: 'none' }}
                    >
                      <h3>ERC20</h3>
                      <button
                        type="button"
                        className="btn centerbtn"
                        style={{ justifyContent: 'center' }}
                      >
                        <img src="img/UniSwap.png" alt="uniswap" />
                        UniSwap
                      </button>
                    </a>
                  </div>
                  <div className="trade-buttons trade-right">
                    <a
                      href="https://pancakeswap.finance/swap?outputCurrency=0x9A257C90Fa239fBA07771ef7da2d554D148c2E89"
                      target="_blank"
                      style={{ outline: 'none' }}
                    >
                      <h3>BEP20</h3>
                      <button type="button" className="btn">
                        <img src="img/PancakeSwap.png" alt="pancake" />
                        PancakeSwap
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </Popup>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Tokenomics;