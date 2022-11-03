import React, { useState, useEffect } from 'react';
import './Partners.scss';
import EyeSwapPopup from '../Modals/EyeSwapPopup/EyeSwapPopup';
import PartnerSections from '../../components/Partners/PartnerSections';
const Partners = (props) => {

  const handleLinks = (prop) => {
    if (prop === 'uniswap') {
      window.open(
        'https://app.uniswap.org/#/swap?outputCurrency=0x9a257c90fa239fba07771ef7da2d554d148c2e89&chain=mainnet',
        '_blank'
      );
    } else if (prop === 'pancakeswap') {
      window.open(
        'https://pancakeswap.finance/swap?outputCurrency=0x9A257C90Fa239fBA07771ef7da2d554D148c2E89',
        '_blank'
      );
    } else if (prop === 'bkex') {
      window.open('https://www.bkex.com/trade/eYe_USDT', '_blank');
    } else if (prop === 'lbank') {
      window.open(' https://www.lbank.info/exchange/eye/usdt', '_blank');
    }
  };

  return (
    <section className="mediaeye-layout-section partner_S">
      <div className="mediaeye-layout-container">
        <div className="mediaeye-layout-container-partners">
          <div className="mediaeye-layout-container-partners-wrapper">
            <h2
              className="mediaeye-layout-container-partners-wrapper-title animate__animated animate__fadeIn wow"
              data-wow-duration="1s"
              data-wow-delay="0.5s"
            >
              Partners
            </h2>
            <div
              className="animate__animated animate__fadeInUp wow"
              data-wow-duration="1s"
              data-wow-delay="0.5s"
            >

              <PartnerSections />
            </div>
            <h2
              className="mediaeye-layout-container-partners-wrapper-title animate__animated animate__fadeIn wow"
              data-wow-duration="1s"
              data-wow-delay="0.5s"
            >
              <span className="noneclass">eYe </span>TOKEN <span>MARKETS</span>
            </h2>
            <h4
              className="mediaeye-layout-container-partners-wrapper-title1 animate__animated animate__fadeIn wow"
              data-wow-duration="1s"
              data-wow-delay="0.5s"
            >
              <span className="noneclass">eYe </span>TRACKERS
            </h4>
            <div
              className="mediaeye-layout-container-partners-wrapper-main animate__animated animate__fadeInUp wow"
              data-wow-duration="1s"
              data-wow-delay="0.5s"
            >
              <div className="mediaeye-partners-card">
                <a
                  href="https://www.coingecko.com/en/coins/media-eye"
                  target="_blank"
                  className="mediaeye-partners-card-inner pd25 "
                >
                  <img
                    className="mediaeye-partners-card-inner-img"
                    src="img/partner/17-dark.png"
                    alt="ApeSwap"
                  />
                </a>
              </div>
              <div className="mediaeye-partners-card">
                <a
                  href="https://coinmarketcap.com/currencies/media-eye/"
                  target="_blank"
                  className="mediaeye-partners-card-inner"
                >
                  <img src="img/partner/24.png" alt="coin market cap" />
                </a>
              </div>
              <div className="mediaeye-partners-card">
                <a
                  href="https://crypto.com/price/media-eye"
                  target="_blank"
                  className="mediaeye-partners-card-inner"
                >
                  <img
                    className="mediaeye-partners-card-inner-img"
                    src="img/partner/21.png"
                    alt="crypto"
                  />
                </a>
              </div>
              <div className="mediaeye-partners-card">
                <a
                  href="https://poocoin.app/tokens/0x9a257c90fa239fba07771ef7da2d554d148c2e89"
                  target="_blank"
                  className="mediaeye-partners-card-inner pd25"
                >
                  <img
                    className="mediaeye-partners-card-inner-img"
                    src="img/partner/22.png"
                    alt="poo coin"
                  />
                </a>
              </div>
              <div className="mediaeye-partners-card">
                <a
                  href="https://www.dextools.io/app/ether/pair-explorer/0x63b71c437f2734df5a1f524ba555b5e8dde91419"
                  target="_blank"
                  className="mediaeye-partners-card-inner pd30"
                >
                  <img
                    className="mediaeye-partners-card-inner-img"
                    src="img/partner/23.png"
                    alt="dex tools"
                  />
                </a>
              </div>
            </div>
            <div
              className="mediaeye-layout-container-partners-wrapper-outbox animate__animated animate__fadeInUp wow"
              data-wow-duration="1s"
              data-wow-delay="0.5s"
            >
              <div className="eyeswap-withBox">
                <EyeSwapPopup />
              </div>
              <div className="mediaeye-layout-container-partners-wrapper-outbox-part2">
                <div
                  className="mediaeye-layout-container-partners-wrapper-outbox-part2-innerbox box1 animate__animated animate__fadeInUp wow"
                  data-wow-duration="1s"
                  data-wow-delay="0.5s"
                >
                  <h4
                    className="mediaeye-layout-container-partners-wrapper-title1 nomar animate__animated animate__fadeIn wow"
                    data-wow-duration="1s"
                    data-wow-delay="0.5s"
                  >
                    dex<span className="lowclass">s</span>
                  </h4>
                  <div className="mediaeye-layout-container-partners-wrapper-outbox-part2-innerbox-gridbox">
                    <a
                      className="border_box"
                      onClick={() => handleLinks('uniswap')}
                    >
                      <img src="img/partner/26.png" alt="uniswap" />
                    </a>
                    <a
                      className="border_box"
                      onClick={() => handleLinks('pancakeswap')}
                    >
                      <img src="img/partner/27.png" alt="pancakeswap" />
                    </a>
                  </div>
                </div>
                <div
                  className="mediaeye-layout-container-partners-wrapper-outbox-part2-innerbox animate__animated animate__fadeInUp wow"
                  data-wow-duration="1s"
                  data-wow-delay="0.5s"
                >
                  <h4
                    className="mediaeye-layout-container-partners-wrapper-title1 nomar animate__animated animate__fadeIn wow"
                    data-wow-duration="1s"
                    data-wow-delay="0.5s"
                  >
                    cex<span className="lowclass">s</span>
                  </h4>
                  <div className="mediaeye-layout-container-partners-wrapper-outbox-part2-innerbox-gridbox">
                    <a
                      className="border_box"
                      onClick={() => handleLinks('lbank')}
                    >
                      <img src="img/partner/25.png" alt="lbank" />
                    </a>
                    <a
                      className="border_box"
                      onClick={() => handleLinks('bkex')}
                    >
                      <img src="img/partner/28.png" alt="lbank" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
