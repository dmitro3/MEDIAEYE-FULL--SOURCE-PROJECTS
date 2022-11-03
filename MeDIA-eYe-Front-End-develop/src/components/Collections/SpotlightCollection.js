import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMoralis } from 'react-moralis';
import CollectionCard from '../ContentMarketplace/CollectionCard/CollectionCard';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { Pagination } from 'swiper';
import { ChainHexString } from '../../blockchain/functions/ChangeChain';
import { queryCollectionsByChain } from '../../blockchain/functions/Collection';
import { queryFeaturedCollections } from '../../blockchain/functions/Feature';
import ItemLoader from '../Common/ItemLoader';
import { extraLength } from '../../utils/functions';
export function SpotlightCollection(props) {
  const activeNetwork = useSelector((state) => state.app.activeNetwork);

  const { Moralis, isInitialized, user } = useMoralis();
  const [collections, setCollections] = useState([]);

  const smililarSlidersettings = {
    slidesPerView: 1,
    grabCursor: true,
    modules: [Pagination],
    pagination: {
      el: '.mediaeye-spotlight-collection-pagination',
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
  const productPerPage = 6;
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getFeaturedCollections = async () => {
      const result = await queryFeaturedCollections(Moralis, activeNetwork);
      setCollections(result);
      if (result) setLoading(false);
    };

    if (isInitialized) {
      getFeaturedCollections();
    }
  }, [isInitialized, activeNetwork]);



  return (
    <>
      {props?.type === 'slider' ? (
        <>
          <Swiper
            {...smililarSlidersettings}
            className="mediaeye-collection-slide"
          >
            {collections.map((collection, index) => (
              <SwiperSlide key={index}>
                <CollectionCard
                  Spotlight={true}
                  key={index}
                  collection={collection}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="m-t-10 mediaeye-swiper-pagination mediaeye-swiper-pagination-center withscroll m-to mediaeye-spotlight-collection-pagination text-link"></div>
        </>
      ) : (
        <>
          <div className="mediaeye-collection-row" extraLength={extraLength(collections, 3)}>

            {collections.map((collection, index) => (
              <CollectionCard
                Spotlight={true}
                key={index}
                collection={collection}
              />
            ))}
          </div>
          {collections?.length > 0 ? (
            <div className="text-center m-t-20">
              <button
                type="button"
                className="btn btn-transperant btn-sm btn-more"
              >
                LOAD MORE
              </button>
            </div>
          ) : null}
        </>
      )}
      {loading ? <ItemLoader /> : null}
    </>
  );
}
export default SpotlightCollection;
