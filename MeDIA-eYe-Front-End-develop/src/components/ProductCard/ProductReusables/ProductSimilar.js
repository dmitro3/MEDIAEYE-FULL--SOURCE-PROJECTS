import React, { useEffect, useState } from 'react';
import ExploreBlock from '../../ContentMarketplace/ExploreBlock/ExploreBlock';
import { TopLiveBidsJson } from '../../../utils/JsonData';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { Pagination } from 'swiper';
import { useMoralis } from 'react-moralis';
import { querySimilarNfts } from '../../../blockchain/functions/NFT/QuerySimilarNFTs';
import { formatListingNFT } from '../../../utils/FormatListingNFT';

export function ProductSimilar(props) {
  const { nft, categories } = props;
  const { isInitialized, Moralis } = useMoralis();
  const [similarProducts, setSimilarProducts] = useState([]);

  const smililarSlidersettings = {
    slidesPerView: 1,
    grabCursor: true,
    modules: [Pagination],
    pagination: {
      el: '.mediaeye-product-more-pagination',
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

  const getSimilarNfts = async () => {
    const params = {
      nftId: nft.id,
      categories: categories,
      chainHex: nft.chainId,
      limit: 10
    };
    const result = await querySimilarNfts(Moralis, params);

    // format
    const listings = result[0];
    const nfts = result[1];
    let products = [];
    for (let i = 0; i < result[0].length; i++) {
      products.push(formatListingNFT(listings[i], nfts[i]));
    }
    setSimilarProducts(products);
  };

  useEffect(() => {
    if (isInitialized && nft && categories) {
      console.log('finding similar nfts...');
      getSimilarNfts();
    }
  }, [isInitialized]);

  return (
    <>
      <Swiper {...smililarSlidersettings} className="mediaeye-nft-slide">
        {similarProducts.map((product, i) => (
          <SwiperSlide key={i}>
            <ExploreBlock product={product} key={i} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mediaeye-swiper-pagination withscroll mediaeye-product-more-pagination"></div>
    </>
  );
}
export default ProductSimilar;
