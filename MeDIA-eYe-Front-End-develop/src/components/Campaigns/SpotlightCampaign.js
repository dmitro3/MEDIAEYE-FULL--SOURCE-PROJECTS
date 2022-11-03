import React, { useEffect, useState } from 'react';
import CampaignBlock from './CampaignBlock/CampaignBlock';
import { CampaignJson } from '../../utils/JsonData';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { Pagination } from 'swiper';

export function SpotlightCampaign(props) {
    const campaigns = CampaignJson();


    const smililarSlidersettings = {
        slidesPerView: 1,
        grabCursor: true,
        modules: [Pagination],
        pagination: {
            el: '.mediaeye-spotlight-campaign-pagination',
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
                    <Swiper {...smililarSlidersettings} className="mediaeye-campaign-slide">
                        {campaigns.map((campaign, index) => (
                            <SwiperSlide key={index}>
                                <CampaignBlock Spotlight={true} key={index} campaign={campaign} />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <div className="m-t-10 mediaeye-swiper-pagination mediaeye-swiper-pagination-center withscroll mediaeye-spotlight-campaign-pagination text-link"></div>
                </>
            ) : (
                <>
                    <div className="mediaeye-campaign-row">
                        {campaigns.map((campaign, index) => (
                            <CampaignBlock Spotlight={true} key={index} campaign={campaign} />
                        ))}
                    </div>
                </>
            )}
        </>
    );
}
export default SpotlightCampaign;
