import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { Pagination } from 'swiper';
import { CampaignJson } from '../../utils/JsonData';
import CampaignBlock from './CampaignBlock/CampaignBlock';

export function FeaturedCampaignSection() {
    const activeNetwork = useSelector((state) => state.app.activeNetwork);
    const campaigns = CampaignJson();

    const smililarSlidersettings = {
        slidesPerView: 1,
        grabCursor: true,
        modules: [Pagination],
        pagination: {
            el: '.mediaeye-campaign-pagination-featured',
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
            <Swiper {...smililarSlidersettings} className="mediaeye-campaign-slide">
                {campaigns.map((campaign, i) => (
                    <SwiperSlide key={i}>
                        <CampaignBlock isFeatured={true} campaign={campaign} key={i} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="m-t-30 mediaeye-swiper-pagination mediaeye-swiper-pagination-center withscroll mediaeye-campaign-pagination-featured"></div>
        </>
    );
}
export default FeaturedCampaignSection;
