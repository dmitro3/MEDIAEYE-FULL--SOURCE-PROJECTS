import React, { useEffect, useState } from 'react';
import EventsBlock from './EventsBlock/EventsBlock';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { Pagination } from 'swiper';
import { EventsJson } from '../../utils/JsonData';
const settings = {
  slidesPerView: 3,
  grabCursor: true,
  modules: [Pagination],
  pagination: {
    el: '.mediaeye-event-feature-pagination',
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

export default function FeaturedEvent(props) {
  const featured = EventsJson();
  return (
    <>
      <Swiper {...settings} className="mediaeye-event-slide">
        {featured.map((event, i) => (
          <SwiperSlide key={event.id}>
            <EventsBlock event={event} isFeatured={true} key={i} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="m-t-10 mediaeye-swiper-pagination mediaeye-swiper-pagination-center withscroll mediaeye-event-feature-pagination"></div>
      {/* <div className="mediaeye-swiper-pagination mediaeye-event-feature-pagination"></div> */}
    </>
  );
}
