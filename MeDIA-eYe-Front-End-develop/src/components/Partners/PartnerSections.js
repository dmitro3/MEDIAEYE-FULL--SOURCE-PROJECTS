import React from 'react';
import PartnersBlock from './PartnersBlock';
import { PartnersJSON } from '../../utils/JsonData';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { Pagination } from 'swiper';
import { groupOfArray } from '../../utils/groupOfArray';

const settings = {
  slidesPerView: 1,
  grabCursor: true,
  modules: [Pagination],
  pagination: {
    el: '.mediaeye-partners-pagination',
    enable: true,
    clickable: true
  },
  breakpoints: {
    768: {
      slidesPerView: 2
    },
    889: {
      slidesPerView: 3
    },
    1181: {
      slidesPerView: 3
    },
    1280: {
      slidesPerView: 4
    }
  }
};

export default function PartnersSections() {
  const partners = PartnersJSON();

  return (
    <>
      <Swiper {...settings} className="mediaeye-partners-slide">
        {groupOfArray(partners, 2).map((partner, i) => (
          <SwiperSlide key={i}>
            <PartnersBlock key={'partners' + i} partner={partner} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mediaeye-swiper-pagination mediaeye-swiper-pagination-center withscroll mediaeye-partners-pagination text-link m-t-30"></div>
    </>
  );
}
