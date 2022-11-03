import React, { useEffect, useState } from 'react';
import CollectionCard from '../ContentMarketplace/CollectionCard/CollectionCard';
import EventsBlock from './EventsBlock/EventsBlock';
import { EventsJson } from '../../utils/JsonData';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { Pagination } from 'swiper';

export function SpotlightEvent(props) {
  const events = EventsJson();
  const [spotlight, setSpotlight] = useState(false);

  const smililarSlidersettings = {
    slidesPerView: 1,
    grabCursor: true,
    modules: [Pagination],
    pagination: {
      el: '.mediaeye-spotlight-event-pagination',
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
          <Swiper {...smililarSlidersettings} className="mediaeye-event-slide">
            {events.map((event, index) => (
              <SwiperSlide key={index}>
                <EventsBlock Spotlight={true} key={index} event={event} />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="m-t-10 mediaeye-swiper-pagination mediaeye-swiper-pagination-center withscroll mediaeye-spotlight-event-pagination text-link"></div>
        </>
      ) : (
        <>
          <div className="mediaeye-event-row">
            {events.map((event, index) => (
              <EventsBlock Spotlight={true} key={index} event={event} />
            ))}
          </div>
        </>
      )}
    </>
  );
}
export default SpotlightEvent;
