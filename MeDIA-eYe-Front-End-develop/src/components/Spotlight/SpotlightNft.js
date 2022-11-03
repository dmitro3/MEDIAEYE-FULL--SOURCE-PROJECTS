import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ExploreBlock from '../ContentMarketplace/ExploreBlock/ExploreBlock';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { Pagination } from 'swiper';
import { useMoralis } from 'react-moralis';
import { ChainHexString } from '../../blockchain/functions/ChangeChain';
import { formatListingNFT } from '../../utils/FormatListingNFT';
import { queryFeaturedNFTListings } from '../../blockchain/functions/Feature/QueryFeaturedNFTListings';
import ItemLoader from '../Common/ItemLoader';

export function SpotlightNft(props) {
  const activeNetwork = useSelector((state) => state.app.activeNetwork);
  const [products, setProducts] = useState([]);
  const { Moralis, isInitialized, user } = useMoralis();

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!isInitialized) return;
    getListings();
  }, [isInitialized, activeNetwork]);

  const getListings = async () => {
    const result = await queryFeaturedNFTListings(Moralis, activeNetwork);

    const listings = result[0];
    const nfts = result[1];
    let currProducts = [];

    for (let i = 0; i < result[0].length; i++) {
      currProducts.push(formatListingNFT(listings[i], nfts[i]));
    }

    // check if there are no more products to load
    //if (!result[0].length) setAllLoaded(true);
    setProducts(currProducts);
    setLoading(false);
  };
  const smililarSlidersettings = {
    slidesPerView: 1,
    grabCursor: true,
    modules: [Pagination],
    pagination: {
      el: '.mediaeye-spotlight-nft-pagination',
      enable: true,
      clickable: true
    },
    breakpoints: {
      889: {
        slidesPerView: 2
      },
      1181: {
        slidesPerView: 3
      },
      1280: {
        slidesPerView: 4
      }
    }
  };
  return (
    <>
      {props?.type === 'slider' ? (
        <>
          <Swiper {...smililarSlidersettings} className="mediaeye-nft-slide">
            {products.map((product, i) => (
              <SwiperSlide key={i}>
                <ExploreBlock Spotlight={true} product={product} key={i} />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="m-t-10 mediaeye-swiper-pagination mediaeye-swiper-pagination-center withscroll mediaeye-spotlight-nft-pagination"></div>
        </>
      ) : (
        <>
          <div className="mediaeye-nft-row">
            {products.map((product, i) => (
              <ExploreBlock Spotlight={true} product={product} key={i} />
            ))}
          </div>
          {products?.length > 0 ? (
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
export default SpotlightNft;
