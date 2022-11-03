import React, { useEffect, useState } from 'react';
import AirdropBlock from '../AirdropBlock/AirdropBlock';
import { AirdropJson } from '../../../utils/JsonData';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { Pagination } from 'swiper';
const settings = {
  slidesPerView: 3,
  grabCursor: true,
  modules: [Pagination],
  pagination: {
    el: '.mediaeye-airdrop-feature-pagination',
    enable: true,
    clickable: true
  },
  breakpoints: {
    889: {
      slidesPerView: 2
    },
    1181: {
      slidesPerView: 2
    },
    1280: {
      slidesPerView: 3
    }
  }
};

export default function FeaturedAirdop(props) {
  const featured = AirdropJson();
  return (
    <>
      {featured.length === 0 ? (
        <div className="featuredCards-noData-txt">
          <span>You have no featured NFTs yet.</span>
          <span>Select your listings and feature it now!</span>
        </div>
      ) : (
        <>
          <Swiper {...settings} className="mediaeye-airdrop-slide">
            {featured.map((airdrop, i) => (
              <SwiperSlide key={airdrop.id}>
                <AirdropBlock airdrop={airdrop} isFeatured={true} key={i} />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="m-t-10 mediaeye-swiper-pagination mediaeye-swiper-pagination-center withscroll mediaeye-airdrop-feature-pagination"></div>
        </>
      )}
    </>
  );
}
