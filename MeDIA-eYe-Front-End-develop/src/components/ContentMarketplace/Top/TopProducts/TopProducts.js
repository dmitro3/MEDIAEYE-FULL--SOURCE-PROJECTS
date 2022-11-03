import React, { useEffect, useState } from 'react';
import ProductItemBlock from '../..//ProductItemBlock/ProductItemBlock';
import { TopProductsJSON } from '../../../../utils/JsonData';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { Pagination } from 'swiper';
import { groupOfArray } from '../../../../utils/groupOfArray';
const settings = {
  slidesPerView: 1,
  grabCursor: true,
  loop: true,
  modules: [Pagination],
  pagination: {
    el: '.mediaeye-top-products-pagination',
    enable: true,
    clickable: true
  },
  breakpoints: {
    768: {
      slidesPerView: 1
    },
    889: {
      slidesPerView: 1
    },
    1181: {
      slidesPerView: 1
    },
    1280: {
      slidesPerView: 1
    }
  }
};

export default function TopProducts(props) {
  const Top_products = TopProductsJSON();

  return (
    <>
      <Swiper {...settings} className="mediaeye-products-slide">
        {groupOfArray(Top_products, 5).map((product, i) => (
          <SwiperSlide key={i}>
            <ProductItemBlock key={'banner' + i} product={product} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mediaeye-swiper-pagination mediaeye-top-products-pagination m-t-30 text-link"></div>
    </>
  );
}
