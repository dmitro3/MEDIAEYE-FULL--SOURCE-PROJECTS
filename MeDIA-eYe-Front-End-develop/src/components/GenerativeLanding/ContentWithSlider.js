import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { Pagination } from 'swiper';
import InputField from './InputField/InputField';
import img1 from '../../assets/img/main_slider/3.jpg'
import img2 from '../../assets/img/main_slider/4.jpg'

export default function ContentWithSlider() {
    const content = [
        {
            title: "Meet Azuki",
            des: "Azuki starts with a collection of 10,000 avatars that give you membership access to The Garden: a corner of the internet where artists, builders, and web3 enthusiasts meet to create a decentralized future. Azuki holders receive access to exclusive drops, experiences, and more. Visit azuki.com for more details.We rise together. We build together. We grow together. Azuki starts with a collection of 10,000 avatars that give you membership access to The Garden: a corner of the internet where artists, builders, and web3 enthusiasts meet to create a decentralized future. Azuki holders receive access to exclusive drops, experiences, and more. Visit azuki.com for more details.We rise together. We build together. We grow together.",
            image: img1
        },
        {
            title: "Card Play",
            des: "Azuki starts with a collection of 10,000 avatars that give you membership access to The Garden: a corner of the internet where artists, builders, and web3 enthusiasts meet to create a decentralized future. Azuki holders receive access to exclusive drops, experiences, and more. Visit azuki.com for more details.We rise together. We build together. We grow together.",
            image: img2
        }
    ]
    const settingCollection = {
        slidesPerView: 1,
        grabCursor: true,
        modules: [Pagination],
        pagination: {
            el: '.mediaeye-CreateCampaign-collection-pagination',
            enable: true,
            clickable: true
        },
        allowTouchMove: false,
        breakpoints: {
            889: {
                slidesPerView: 1
            },
            1181: {
                slidesPerView: 1
            },
            1280: {
                slidesPerView: 1
            }
        },
    };
    return (
        <div className='generative-landing-inner-contentwithslider'>
            <Swiper
                {...settingCollection}
                mousewheel={{ forceToAxis: true }}
                className="mediaeye-collection-pagination m-t-30"
            >

                <SwiperSlide>
                    <div className='generative-landing-inner-contentwithslider-inner'>
                        <div className='generative-landing-inner-contentwithslider-inner-left'>
                            <div className="mediaeyeform-group-input m-b-30">
                                <input
                                    className="mediaeyeform-input"
                                    type="text"
                                    placeholder='Title'
                                />
                            </div>
                            <div className="mediaeyetextarea">
                                <textarea
                                    className="mediaeyetextarea-input"
                                    rows="15"
                                    placeholder='Description'
                                ></textarea>
                            </div>
                        </div>
                        <div className='generative-landing-inner-contentwithslider-inner-right'>
                            <InputField size={'980x500'} />
                        </div>
                    </div>
                </SwiperSlide>
                {content.map((item, i) =>
                    <>
                        <SwiperSlide key={i}>
                            <div className='generative-landing-inner-contentwithslider-inner'>
                                <div className='generative-landing-inner-contentwithslider-inner-left'>
                                    <div className="mediaeyeform-group-input m-b-30">
                                        <input
                                            className="mediaeyeform-input"
                                            type="text"
                                            placeholder='Check if you are Whitelisted'
                                            value={item.title}
                                        />
                                    </div>
                                    <div className="mediaeyetextarea">
                                        <textarea
                                            className="mediaeyetextarea-input"
                                            rows="15"
                                            placeholder='Description'
                                            value={item.des}
                                        ></textarea>
                                    </div>
                                </div>
                                <div className='generative-landing-inner-contentwithslider-inner-right'>
                                    <div className='InputField'>
                                        <div className='InputField-image'>
                                            <img className='' src={item.image} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    </>
                )}

            </Swiper>
            <div className="m-t-30 mediaeye-swiper-pagination mediaeye-swiper-pagination-center withscroll mediaeye-CreateCampaign-collection-pagination"></div>
        </div>
    )
}
