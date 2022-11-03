import React, { useRef } from 'react';
import Slider from 'react-slick';
import { Autoplay, Pagination, Scrollbar, EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';

const sliderData = [
    {
        id: 1,
        img: '/img/marketplace/banner-1.png',
        name: "Marketplace Poster 1"
    },
    {
        id: 2,
        img: '/img/marketplace/banner-2.png',
        name: "Marketplace Poster 2"
    },
    {
        id: 3,
        img: '/img/marketplace/banner-3.png',
        name: "Marketplace Poster 3"
    },
    {
        id: 4,
        img: '/img/marketplace/banner-4.png',
        name: "Marketplace Poster 4"
    }
];

const MarketplaceHeader = () => {
    const sliderRef = useRef();

    const settings = {
        slidesPerView: 1,
        grabCursor: true,
        modules: [Pagination, Scrollbar, Autoplay, EffectFade],
        pagination: {
            el: '.mediaeye-product-more-pagination',
            enable: true,
            clickable: true
        },
        fadeEffect: { crossFade: true },
        effect: 'fade',
        speed: 3500,
        scrollbar: false,
        // autoplay: {
        //     delay: 5000,
        //     scroll: false
        // }
    };

    return (
        <div className="marketplace-page-header">
            <Swiper {...settings} ref={sliderRef} className="marketplace-page-header-poster">
                {sliderData.map((image, i) => {
                    return (
                        <SwiperSlide key={i} className="marketplace-page-header-poster-slide">
                            <img src={image.img} alt={image.name} />
                        </SwiperSlide>
                    );
                })}
            </Swiper>
            <div className="mediaeye-layout-container">
                <div className="mediaeye-swiper-pagination mediaeye-swiper-pagination-center withscroll m-t-30 mediaeye-product-more-pagination"></div>
            </div>
        </div>
    );
};
export default MarketplaceHeader;
