import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { groupOfArray } from '../../utils/groupOfArray';
import { Pagination } from 'swiper';
import { NavLink, useHistory } from 'react-router-dom';
import './FeaturedEvents.scss';
import EventsBlock from '../Events/EventsBlock/EventsBlock';

const FeaturedEvenets = ({ list }) => {
  const [wwidth, setWwidth] = useState(window.innerWidth);

  const resizeHandler = () => {
    if (wwidth !== window.innerWidth) {
      setWwidth(window.innerWidth);
    }
  };

  const settings = {
    slidesPerView: 1,
    grabCursor: true,
    modules: [Pagination],
    pagination: {
      el: '.feev-pagination',
      enable: true,
      clickable: true
    },
    breakpoints: {
      889: {
        slidesPerView: 2
      },
      1181: {
        slidesPerView: 3
      }
    }
  };

  useEffect(() => {
    window.addEventListener('resize', resizeHandler);

    return () => window.removeEventListener('resize', resizeHandler);
  }, [wwidth]);

  return (
    <div className="feev">
      {wwidth > 888 ? (
        <Swiper {...settings} className="feev-slider">
          {groupOfArray(list, 2).map(([item1, item2], id) => (
            <SwiperSlide key={id} className="feev-slider-item">
              <EventsBlock {...item1} />
              {item2 && <EventsBlock {...item2} />}
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Swiper {...settings} className="feev-slider">
          {list.map((item) => (
            <SwiperSlide key={item.id} className="feev-slider-item">
              <EventsBlock {...item} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      <div className="awb-pagination feev-pagination"></div>
    </div>
  );
};

export default FeaturedEvenets;
