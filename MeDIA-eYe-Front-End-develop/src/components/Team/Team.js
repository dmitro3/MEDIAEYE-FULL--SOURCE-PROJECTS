import React from 'react';
import { TeamDataJSON } from '../../utils/JsonData';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { Pagination } from 'swiper';
import './Team.scss';
const TeamSlidersettings = {
  slidesPerView: 1,
  grabCursor: true,
  modules: [Pagination],
  pagination: {
    el: '.mediaeye-Team-pagination',
    enable: true,
    clickable: true
  },
  breakpoints: {
    889: {
      slidesPerView: 4
    },
    1181: {
      slidesPerView: 5
    },
    1280: {
      slidesPerView: 6
    }
  }
};

const Team = (props) => {
  const team = TeamDataJSON();
  return (
    <>
      <Swiper {...TeamSlidersettings} className="mediaeye-nft-slide">
        {team.map((team, i) => (
          <SwiperSlide key={i}>
            <div className="mediaeye-layout-container-teambox-wrapper-inner">
              <img src={team.img} className="team_member" alt={team.name} />
              <div className="mediaeye-layout-container-teambox-wrapper-inner-bottom">
                <p className="p-b-5">{team.desgn}</p>
                <h6>{team.name}</h6>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="mediaeye-swiper-pagination mediaeye-swiper-pagination-center withscroll mediaeye-Team-pagination text-link m-t-30"></div>
    </>
  );
};

export default Team;
