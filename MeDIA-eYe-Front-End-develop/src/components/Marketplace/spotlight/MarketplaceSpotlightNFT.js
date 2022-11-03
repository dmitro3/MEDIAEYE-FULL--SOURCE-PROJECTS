import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ExploreBlock from '../../ContentMarketplace/ExploreBlock/ExploreBlock';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { Pagination } from 'swiper';
import { useMoralis } from 'react-moralis';
import { formatListingNFT } from '../../../utils/FormatListingNFT';
import { queryFeaturedNFTListings } from '../../../blockchain/functions/Feature/QueryFeaturedNFTListings';
import ItemLoader from '../../Common/ItemLoader';

export function MarketplaceSpotlightNFT(props) {
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
                slidesPerView: 5
            }
        }
    };
    return (
        <>
            <Swiper {...smililarSlidersettings} className="mediaeye-nft-slide">
                {products.map((product, i) => (
                    <SwiperSlide key={i}>
                        <ExploreBlock Spotlight={true} product={product} key={i} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className='mediaeye-layout-container'> <div className="m-t-30 mediaeye-swiper-pagination mediaeye-swiper-pagination-center withscroll mediaeye-spotlight-nft-pagination"></div></div>
            {loading ? <ItemLoader /> : null}
        </>
    );
}
export default MarketplaceSpotlightNFT;
