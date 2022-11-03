import React, { useEffect, useState } from 'react';
import ExploreBlock from '../ExploreBlock/ExploreBlock';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { Pagination } from 'swiper';
import { useMoralis } from 'react-moralis';
import { useSelector } from 'react-redux';
import { ChainHexString } from '../../../blockchain/functions/ChangeChain/ChainHexStrings';
import { queryTopAuctions } from '../../../blockchain/functions/Marketplace/QueryTopAuctions';
import { formatListingNFT } from '../../../utils/FormatListingNFT';
const settings = {
  slidesPerView: 1,
  grabCursor: true,
  modules: [Pagination],
  pagination: {
    el: '.mediaeye-top-live-bids-pagination',
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

const TopLiveBids = (props) => {
  const activeNetwork = useSelector((state) => state.app.activeNetwork);
  const { isInitialized, Moralis } = useMoralis();
  const [topBids, setTopBids] = useState([]);

  const getTopBids = async () => {
    const params = {
      limit: 10,
      chainHex: ChainHexString(activeNetwork)
    };
    const result = await queryTopAuctions(Moralis, params);
    const listings = result[0];
    const nfts = result[1];
    let currProducts = [];
    for (let i = 0; i < result[0].length; i++) {
      currProducts.push(formatListingNFT(listings[i], nfts[i]));
    }
    setTopBids(currProducts);
  };

  // get top live bids
  useEffect(() => {
    if (isInitialized && activeNetwork) {
      getTopBids();
    }
  }, [isInitialized, activeNetwork]);

  return (
    <>
      <Swiper {...settings} className="mediaeye-nft-slide">
        {topBids.map((product, i) => (
          <SwiperSlide key={i}>
            {<ExploreBlock product={product} key={i} />}
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="m-t-10 mediaeye-swiper-pagination mediaeye-swiper-pagination-center withscroll mediaeye-top-live-bids-pagination"></div>
      {/* <div className="mediaeye-swiper-pagination mediaeye-top-live-bids-pagination text-link"></div> */}
    </>
  );
};

export default TopLiveBids;
