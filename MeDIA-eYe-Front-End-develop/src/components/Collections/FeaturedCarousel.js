import React, { useState, useEffect, useRef } from 'react';
import { useMoralis } from 'react-moralis';
import { Angle } from '../Icons';
import Slider from 'react-slick';
import { queryFeaturedCollections } from '../../blockchain/functions/Feature';
import { Link } from 'react-router-dom';
import './FeaturedCarousel.scss';
import { useSelector } from 'react-redux';
import GetImage from '../../assets/img/mediaeyespotlight.png';
import { Autoplay, Pagination, Scrollbar, EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';

const defaultBanner = [
  {
    attributes: {
      banner: '/img/banners/collection_banner1.png',
      name: 'featured collection'
    }
  },
  {
    attributes: {
      banner: '/img/banners/collection_banner2.png',
      name: 'generative collection'
    }
  }
];

const FeaturedCarousel = (props) => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const sliderRef = useRef();
  const activeNetwork = useSelector((state) => state.app.activeNetwork);
  const [featuredCollections, setFeaturedCollections] = useState([]);
  const { Moralis, isInitialized } = useMoralis();
  const { spotlight } = props;

  useEffect(() => {
    async function getFeaturedCollections() {
      return await queryFeaturedCollections(Moralis, activeNetwork);
    }
    if (isInitialized) {
      getFeaturedCollections().then((collections) => {
        setFeaturedCollections(collections);
      });
    }
  }, [isInitialized, activeNetwork]);

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
    speed: 2500,
    //scrollbar: true,
    autoplay: {
      delay: 5000,
      scroll: true
    }
  };

  const featuredBannerImage = (collection) => {
    return (
      <Link
        className="collections-page-header-poster-inner-slide"
        to={
          collection?.attributes?.collectionAddress
            ? '/collections/bsc/' + collection?.attributes?.collectionAddress
            : null
        }
      >
        <img
          src={collection?.attributes?.banner}
          alt={collection?.attributes?.name}
          className="collections-page-header-poster-inner-slide-banners"
        />
        <div className="collections-page-header-poster-inner-slide-banners-container">
          <div
            className={
              spotlight
                ? 'feature-carousel-spotlight-title'
                : 'feature-carousel-imgtitle'
            }
          >
            {spotlight ? <img src={GetImage} alt="spotlight-image" /> : null}{' '}
            <span>
              {collection?.attributes?.name === 'featured collection'
                ? 'SPOTLIGHT Collection'
                : `SPOTLIGHT ${collection?.attributes?.name}`}
            </span>
          </div>
        </div>
      </Link>
    );
  };
  return (
    <div className="feature-carousel">
      <Swiper
        {...settings}
        ref={sliderRef}
        className="mediaeyeSliderStyle feature-carousel-slider"
      >
        {featuredCollections && featuredCollections.length > 0
          ? featuredCollections.map((collection, i) => {
            return (
              <SwiperSlide key={i}>
                {featuredBannerImage(collection)}
              </SwiperSlide>
            );
          })
          : defaultBanner.map((collection, i) => {
            return (
              <SwiperSlide key={i}>
                {featuredBannerImage(collection)}
              </SwiperSlide>
            );
          })}
      </Swiper>
      <div className="mediaeye-swiper-pagination withscroll mediaeye-product-more-pagination"></div>
    </div>
  );
};

export default FeaturedCarousel;
