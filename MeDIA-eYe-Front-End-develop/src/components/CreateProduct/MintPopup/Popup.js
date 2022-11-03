import React, { useState, useEffect } from 'react';
import './Popup.scss';
import CloseIcon from '../../Icons/CloseIcon';
import limitDotsSlider from '../../../utils/limitDotsSlider';
import Slider from 'react-slick';

import {
  GetTokenIcon,
  GetNetworkIcon
} from '../../../blockchain/functions/Utils';
import MarketplaceBlock from '../../ContentMarketplace/MarketplaceBlock/MarketplaceBlock';

const Popup = (props) => {
  const { activeToken, activeBlockchain, contentList, handleMint, isLoading } =
    props;
  const [activeSlide, setActiveSlide] = useState(0);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rows: 1,
    slidesPerRow: 1,
    autoplay: false,
    pauseOnHover: true,
    beforeChange: (current, next) => {
      setActiveSlide(next);
      limitDotsSlider();
    },
    onInit: () => {
      limitDotsSlider();
    },
    onReInit: () => {
      limitDotsSlider();
    },
    responsive: [
      {
        breakpoint: 574,
        settings: {
          dots: true,
          arrows: false,
          slidesToShow: 1
        }
      }
    ]
  };

  const productItem = {
    img: [contentList[activeSlide]?.file?.url],
    title: [contentList[activeSlide]?.name]
  };

  const [paymetToken, setPaymentToken] = useState('ETH');
  const [tokenType, setTokenType] = useState('721');

  const mediaeyenetworks = () => {
    return (
      <>
        {activeBlockchain === process.env.REACT_APP_BSC_CHAIN_NAME ? (
          <div className={`mediaeyetoken-box active`}>
            <div className="mediaeyetoken-box-inner">
              <div className="mediaeyetoken-box-circle"></div>
              <div className="mediaeyetoken-box-icon">
                <img src={GetNetworkIcon('BNB')} alt="BNB" />
              </div>
              <div className="mediaeyetoken-box-content">
                <div className="mediaeyetoken-box-content-name">BSC</div>
              </div>
            </div>
          </div>
        ) : activeBlockchain === 'ETH' ? (
          <div className={`mediaeyetoken-box active`}>
            <div className="mediaeyetoken-box-inner">
              <div className="mediaeyetoken-box-circle"></div>
              <div className="mediaeyetoken-box-icon">
                <img src={GetNetworkIcon('ETH')} alt="ETH" />
              </div>
              <div className="mediaeyetoken-box-content">
                <div className="mediaeyetoken-box-content-name">ETH</div>
              </div>
            </div>
          </div>
        ) : activeBlockchain === 'FTM' ? (
          <div className={`mediaeyetoken-box active`}>
            <div className="mediaeyetoken-box-inner">
              <div className="mediaeyetoken-box-circle"></div>
              <div className="mediaeyetoken-box-icon">
                <img src={GetNetworkIcon('FTM')} alt="FTM" />
              </div>
              <div className="mediaeyetoken-box-content">
                <div className="mediaeyetoken-box-content-name">FTM</div>
              </div>
            </div>
          </div>
        ) : null}
      </>
    );
  };

  const mediaeyetokens = () => {
    return (
      <>
        {activeToken === 'ERC721' ? (
          <div className={`mediaeyetokentype-box  active`}>
            <div className="mediaeyetokentype-box-inner">
              <div className="mediaeyetokentype-box-circle"></div>
              <div className="mediaeyetokentype-box-content">
                <div className="mediaeyetokentype-box-content-name">
                  ERC-721
                </div>
              </div>
            </div>
          </div>
        ) : activeToken === 'ERC1155' ? (
          <div className={`mediaeyetokentype-box  active`}>
            <div className="mediaeyetokentype-box-inner">
              <div className="mediaeyetokentype-box-circle"></div>
              <div className="mediaeyetokentype-box-content">
                <div className="mediaeyetokentype-box-content-name">
                  ERC-1155
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </>
    );
  };

  return (
    <React.Fragment>
      {props.showPopup ? (
        <div
          className={
            props.showPopup ? 'mediaeye-popup active' : 'mediaeye-popup'
          }
        >
          <div
            className="mediaeye-popup-wrapper scrolled"
            onClick={() => props.togglePopup()}
          >
            <div
              className="mediaeye-popup-content mint-main-popup"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mediaeye-popup-content-inner">
                <div
                  className="mediaeye-popup-close"
                  onClick={() => props.togglePopup()}
                >
                  <CloseIcon />
                </div>
                <div className="mediaeye-popup-content-inner-header">
                  <div className="mediaeye-popup-content-inner-header-title text-center">
                    Mint NFT
                  </div>
                </div>

                <div className="mint-main-popup-slider">
                  <div className="claim-bid-card-content">
                    <Slider {...settings} className="mediaeyeSliderStyle">
                      {contentList.map((content, i) => {
                        return (
                          <>
                            <MarketplaceBlock
                              key={i}
                              name={content?.name}
                              url={content?.file?.url}
                              isFile={content?.filesType}
                              myNft={true}
                            />
                          </>
                        );
                      })}
                    </Slider>
                  </div>
                </div>
                {/* { contentList.map((content, i) => ( */}
                <div className="mint-main-popup-inner">
                  <span className="mint-main-popup-inner-title">
                    {contentList[activeSlide]?.name}
                  </span>

                  <div className="mint-main-popup-inner-subtitle">
                    {contentList[activeSlide]?.collection?.attributes?.name ? (
                      <span className="mint-main-popup-inner-subtitle-1">
                        Collection:{' '}
                        {contentList[activeSlide]?.collection?.attributes?.name}
                      </span>
                    ) : null}
                    {activeToken !== 'ERC721' ? (
                      <span className="mint-main-popup-inner-subtitle-1">
                        {' '}
                        Supply:&nbsp; {contentList[activeSlide]?.amount}
                      </span>
                    ) : null}
                  </div>
                  <span className="mint-main-popup-inner-dtitle">
                    Description
                  </span>
                  <div className="mint-main-popup-inner-discription text-gray">
                    {contentList[activeSlide]?.description}
                  </div>
                </div>
                {/* ))} */}
                <div className="mint-main-popup-inner-cards">
                  <div className="mint-main-popup-inner-cards-block">
                    <span>Blockchain</span>
                    <div className="create-mint-page-main-content-blockinfo-box-collection mediaeyetoken">
                      {mediaeyenetworks()}
                    </div>
                  </div>
                  <div className="mint-main-popup-inner-cards-block">
                    <span>Token type</span>

                    <div className="create-mint-page-main-token-box-type mediaeyetokentype">
                      {mediaeyetokens()}
                    </div>
                  </div>
                </div>
                <div className="mint-main-popup-inner-bottom">
                  <button
                    type="button"
                    className="btn btn-info"
                    disabled={isLoading}
                    onClick={handleMint}
                  >
                    Mint
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default Popup;
