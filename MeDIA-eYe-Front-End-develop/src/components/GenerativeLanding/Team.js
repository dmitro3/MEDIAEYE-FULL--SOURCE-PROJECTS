import React from 'react'
import { Trash } from '../Icons'
import InputField from './InputField/InputField'
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { Pagination } from 'swiper';
import img1 from '../../assets/img/main_slider/3.jpg'
import img2 from '../../assets/img/main_slider/4.jpg'

export default function Team() {
    const content = [
        {
            name: 'omgkirby',
            des: "hey hey i'm kirby!! i make music to sleep, study and cry to. i produce, record, write and design everything from my room. this all started in may 2020 as a way for me to cope with my anxiety during quarantine.",
            img: img1
        },
        {
            name: 'Channel Tres',
            des: "hannel Tres has long been an experimental and collaborative artist. Throughout his career as a producer and musician he has explored electronic hip hop, partnering with artists such as Disclosure and Tyler the Creator.",
            img: img2
        },
        {
            name: 'Notables',
            des: "Notables is a full-service Web3 studio focused on highly-curated, premium NFT content, communities, and digital experiences.",
            img: img1
        },
    ]
    const settingCollection = {
        slidesPerView: 1,
        slidesPerColumnFill: 2,
        grabCursor: true,
        modules: [Pagination],
        pagination: {
            el: '.mediaeye-team',
            enable: true,
            clickable: true
        },
        allowTouchMove: false,
        breakpoints: {
            889: {
                slidesPerView: 2,

            },
            1181: {
                slidesPerView: 2,

            },
            1280: {
                slidesPerView: 2,
            }
        },
    };
    return (
        <div
            className='generative-landing-inner-team m-t-20'
        >
            <div className='generative-landing-inner-team-title'>Team</div>
            <Swiper
                {...settingCollection}
                mousewheel={{ forceToAxis: true }}
                className="mediaeye-collection-pagination"
            >
                {content.map((item, i) =>
                    <>
                        <SwiperSlide>
                            <div className='generative-landing-inner-team-content'>

                                <div className='generative-landing-inner-team-content-box'>
                                    <div className='generative-landing-inner-team-content-box-delete'>
                                        <Trash />
                                    </div>
                                    <div className='generative-landing-inner-team-content-box-icon'>
                                        <div className='InputField'>
                                            <div className='InputField-image'>
                                                <img className='' src={item.img} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='generative-landing-inner-team-content-box-inputs'>
                                        <div className="mediaeyeform-group-input m-b-30">
                                            <input
                                                className="mediaeyeform-input"
                                                type="text"
                                                placeholder='Name'
                                                value={item.name}
                                            />
                                        </div>
                                        <div className="mediaeyetextarea">
                                            <div className='mediaeyefancyScroll'>
                                                <textarea
                                                    className="mediaeyetextarea-input"
                                                    rows="3"
                                                    placeholder='Description'
                                                    value={item.des}
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    </>
                )}

                <SwiperSlide>
                    <div className='generative-landing-inner-team-content'>
                        <div className='generative-landing-inner-team-content-box'>
                            <div className='generative-landing-inner-team-content-box-delete'>
                                <Trash />
                            </div>
                            <div className='generative-landing-inner-team-content-box-icon'>
                                <InputField size="Size 130x130px" />
                            </div>
                            <div className='generative-landing-inner-team-content-box-inputs'>
                                <div className="mediaeyeform-group-input m-b-30">
                                    <input
                                        className="mediaeyeform-input"
                                        type="text"
                                        placeholder='Name'
                                    />
                                </div>
                                <div className="mediaeyetextarea">
                                    <textarea
                                        className="mediaeyetextarea-input"
                                        rows="3"
                                        placeholder='Description'
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

            </Swiper>
            <div className="m-t-30 mediaeye-swiper-pagination mediaeye-swiper-pagination-center withscroll mediaeye-team"></div>
        </div>
    )
}
