import React, { useEffect, useState } from 'react';
import AirdropBlock from './AirdropBlock/AirdropBlock';
import { AirdropJson } from '../../utils/JsonData';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { Pagination } from 'swiper';

export function SpotlightAirdrop(props) {
  const airdrops = AirdropJson();
  const smililarSlidersettings = {
    slidesPerView: 1,
    grabCursor: true,
    modules: [Pagination],
    pagination: {
      el: '.mediaeye-spotlight-airdrop-pagination',
      enable: true,
      clickable: true
    },
    breakpoints: {
      889: {
        slidesPerView: 2
      },
      1280: {
        slidesPerView: 3
      }
    }
  };
  return (
    <>
      {props?.type === 'slider' ? (
        <>
          <Swiper
            {...smililarSlidersettings}
            className="mediaeye-airdrop-slide"
          >
            {airdrops.map((airdrop, index) => (
              <SwiperSlide key={index}>
                <AirdropBlock Spotlight={true} key={index} airdrop={airdrop} />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="m-t-10 mediaeye-swiper-pagination mediaeye-swiper-pagination-center withscroll mediaeye-spotlight-airdrop-pagination text-link"></div>
        </>
      ) : (
        <>
          <div className="mediaeye-airdrop-row">
            {airdrops.map((airdrop, index) => (
              <AirdropBlock Spotlight={true} key={index} airdrop={airdrop} />
            ))}
          </div>
        </>
      )}
    </>
  );
}
export default SpotlightAirdrop;
