import React, { useEffect, useState } from 'react';
import AirdropBlock from '../AirdropBlock/AirdropBlock';
import EventsBlock from '../../Events/EventsBlock/EventsBlock';
import { AirdropJson, EventsJson } from '../../../utils/JsonData';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { Pagination, Grid } from 'swiper';

export default function HomeAirdropEvent(props) {
  const airdropData = AirdropJson();
  const eventsData = EventsJson();
  const settings = {
    slidesPerView: 3,
    grabCursor: true,
    modules: [Pagination, Grid],
    grid: {
      rows: 2
    },
    pagination: {
      el: '.mediaeye-airdrop-feature-home-pagination',
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

  return (
    <>
      <Swiper
        {...settings}
        className="mediaeye-airdrop-slide mediaeye-swipper-multiRowslide"
      >
        {airdropData.map((airdrop, i) => (
          <SwiperSlide key={airdrop.id}>
            <AirdropBlock airdrop={airdrop} isFeatured={true} key={i} />
          </SwiperSlide>
        ))}
        {eventsData.map((event, i) => (
          <SwiperSlide key={event.id}>
            <EventsBlock event={event} isFeatured={true} key={i} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mediaeye-swiper-pagination mediaeye-airdrop-feature-home-pagination"></div>
    </>
  );
}
