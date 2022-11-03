import React, { useRef } from 'react';
import './MarketplaceHeader.scss';
import poster1 from '../../../assets/img/feature-banner2.png';
import poster2 from '../../../assets/img/feature-banner.png';
import spotlight from '../../../assets/img/mediaeyespotlight.png';
import Slider from 'react-slick';
import { Autoplay, Pagination, Scrollbar, EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';

const nftsliders = [
  {
    id: 1,
    img: poster1,
    name: 'Stone Cold Apes'
  },
  {
    id: 2,
    img: poster2,
    name: 'Bearded Punk'
  }
];

const NftMarketplaceHeader = () => {
  const sliderRef = useRef();

  const settings = {
    slidesPerView: 1,
    grabCursor: true,
    modules: [Pagination, Scrollbar, Autoplay, EffectFade],
    pagination: {
      el: '.mediaeye-product-more-pagination',
      enable: true,
      clickable: true
    },
    fadeEffect: { crossFade: true },
    effect: 'fade',
    speed: 2500,
    scrollbar: true,
    autoplay: {
      delay: 5000,
      scroll: true
    }
  };

  return (
    <div className="nftmarketplace-header">
      <div className="nftmarketplace-header-poster">
        <Swiper
          {...settings}
          ref={sliderRef}
          className="nftmarketplace-header-poster-fullscreen"
        >
          {nftsliders.map((image, i) => {
            return (
              <SwiperSlide key={i}>
                <div className="nftmarketplace-header-poster-slide">
                  <img src={image.img} alt={image.name} />
                  <div className="nftmarketplace-header-poster-container">
                    <div
                      className={
                        image.id === 1
                          ? 'nftmarketplace-header-poster-hero'
                          : 'nftmarketplace-header-poster-hero2'
                      }
                    >
                      {image.id === 1 ? null : (
                        <img src={spotlight} alt={image.name} />
                      )}{' '}
                      <span> {image.name}</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <div className="mediaeye-swiper-pagination withscroll mediaeye-product-more-pagination"></div>
    </div>
  );
};

export default NftMarketplaceHeader;
