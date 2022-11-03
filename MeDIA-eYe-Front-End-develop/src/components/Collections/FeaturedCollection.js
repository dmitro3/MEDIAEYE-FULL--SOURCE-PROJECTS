import React, { useEffect, useState } from 'react';
import CollectionCard from '../ContentMarketplace/CollectionCard/CollectionCard';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { Pagination } from 'swiper';
import { useMoralis } from 'react-moralis';
import { queryFeaturedCollections } from '../../blockchain/functions/Feature';
import ItemLoader from '../Common/ItemLoader';
import { useSelector } from 'react-redux';
const settings = {
  slidesPerView: 1,
  grabCursor: true,
  modules: [Pagination],
  pagination: {
    el: '.mediaeye-featured-collection-pagination',
    enable: true,
    clickable: true
  },
  breakpoints: {
    889: {
      slidesPerView: 1
    },
    1181: {
      slidesPerView: 2
    },
    1280: {
      slidesPerView: 3
    }
  }
};

export default function FeaturedCollection(props) {
  const { owner } = props;
  const activeNetwork = useSelector((state) => state.app.activeNetwork);
  const [featuredCollection, setFeaturedCollection] = useState([]);
  const { Moralis, isInitialized } = useMoralis();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getFeaturedCollections() {
      return await queryFeaturedCollections(Moralis, activeNetwork, owner);
    }

    if (isInitialized) {
      setLoading(true);
      getFeaturedCollections().then((featured) => {
        setFeaturedCollection(featured);
        setLoading(false);
      });
    }
  }, [Moralis, isInitialized, activeNetwork]);

  return (
    <>
      {featuredCollection.length > 0 ? (
        <>
          <Swiper {...settings} className="mediaeye-collection-slide">
            {featuredCollection.map((collection, i) => (
              <SwiperSlide key={i}>
                {props?.selectFeaturedCollectionCard ? (
                  <CollectionCard
                    collection={collection}
                    isFeatured={true}
                    key={i}
                    selectCard={props.selectFeaturedCollectionCard}
                    selectedCard={props?.selectedCard}
                  />
                ) : (
                  <CollectionCard
                    collection={collection}
                    isFeatured={true}
                    key={i}
                  />
                )}
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="mediaeye-swiper-pagination mediaeye-featured-collection-pagination"></div>
        </>
      ) : !loading ? (
        <div className="mediaeyeEmpty">
          <div className="mediaeyeEmpty-message">
            You don't have any SPOTLIGHT Collections yet.
            <br />
            <div className="m-t-10">
              {' '}
              Select your Collection and feature it now!
            </div>
          </div>
        </div>
      ) : null}

      {loading ? <ItemLoader /> : null}
    </>
  );
}
