import React, { useEffect, useState } from 'react';
import EventsBlock from '../../Events/EventsBlock/EventsBlock';
import { EventsJson } from '../../../utils/JsonData';
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

export default function EventSlider(props) {
  const eventData = EventsJson();
  return (
    <>
      {eventData.length === 0 ? (
        <div className="featuredCards-noData-txt">
          <span>You have no Events yet.</span>
          <span>Create Your Events now!</span>
        </div>
      ) : (
        <>
          <Swiper {...settings} className="mediaeye-airdrop-slide">
            {eventData.map((event, i) => (
              <SwiperSlide key={event.id}>
                <EventsBlock event={event} key={i} />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="mediaeye-swiper-pagination mediaeye-airdrop-feature-pagination"></div>
        </>
      )}
    </>
  );
}
