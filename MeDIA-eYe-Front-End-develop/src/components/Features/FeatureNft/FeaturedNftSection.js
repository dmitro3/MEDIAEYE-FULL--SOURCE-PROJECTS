import React, { useEffect, useState } from 'react';
import ExploreBlock from '../../ContentMarketplace/ExploreBlock/ExploreBlock';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { Pagination } from 'swiper';
import { useMoralis } from 'react-moralis';
import { queryFeaturedNFTListings } from '../../../blockchain/functions/Feature/QueryFeaturedNFTListings';
import { formatListingNFT } from '../../../utils/FormatListingNFT';
import ItemLoader from '../../Common/ItemLoader';
import { useSelector } from 'react-redux';
const settings = {
  slidesPerView: 1,
  grabCursor: true,
  modules: [Pagination],
  pagination: {
    el: '.mediaeye-nft-feature-pagination',
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

export default function FeaturedNftSection(props) {
  const { checkOwner } = props;
  const activeNetwork = useSelector((state) => state.app.activeNetwork);
  const [featuredNFTs, setFeaturedNFTs] = useState([]);
  const { Moralis, isInitialized } = useMoralis();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getFeaturedNFTs() {
      const [listings, nfts] = await queryFeaturedNFTListings(
        Moralis,
        activeNetwork,
        checkOwner
      );
      let currProducts = [];
      for (let i = 0; i < listings?.length; i++) {
        currProducts.push(formatListingNFT(listings[i], nfts[i]));
      }
      return currProducts;
    }

    if (isInitialized) {
      setLoading(true);
      getFeaturedNFTs().then((nfts) => {
        setFeaturedNFTs(nfts);

        setLoading(false);
      });
    }
  }, [isInitialized, activeNetwork]);

  return (
    <>
      {featuredNFTs?.length === 0 && !loading ? (
        <div className="mediaeyeEmpty">
          <div className="mediaeyeEmpty-message">
            You don't have any SPOTLIGHT NFTs yet.
            <br />
            <div className="m-t-10">
              {' '}
              Select your listings and feature it now!
            </div>
          </div>
        </div>
      ) : featuredNFTs?.length > 0 ? (
        <>
          <Swiper {...settings} className="mediaeye-nft-slide">
            {featuredNFTs.map((product, i) => (
              <SwiperSlide key={i}>
                {props?.selectFeaturedNftCard ? (
                  <ExploreBlock
                    product={product}
                    isFeatured={true}
                    key={i}
                    selectCard={props.selectFeaturedNftCard}
                    selectedCard={props?.selectedCard}
                    Spotlight={true}
                  />
                ) : (
                  <ExploreBlock
                    product={product}
                    isFeatured={true}
                    key={i}
                    Spotlight={true}
                  />
                )}
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="mediaeye-swiper-pagination mediaeye-nft-feature-pagination"></div>
        </>
      ) : null}
      {loading ? <ItemLoader /> : null}
    </>
  );
}
