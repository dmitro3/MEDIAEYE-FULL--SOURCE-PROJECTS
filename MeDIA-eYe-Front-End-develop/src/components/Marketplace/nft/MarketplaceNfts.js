import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useMoralis } from 'react-moralis';
import InfiniteScroll from 'react-infinite-scroll-component';
import { queryListings } from '../../../blockchain/functions/Marketplace';
import { formatListingNFT } from '../../../utils/FormatListingNFT';
import ExploreBlock from '../../ContentMarketplace/ExploreBlock/ExploreBlock';
import { ChainHexString } from '../../../blockchain/functions/ChangeChain';
import ItemLoader from '../../Common/ItemLoader';
import MarketplaceNftsFilters from './MarketplaceNftsFilters';
import { Remove } from '../../Icons';
import MarketplaceNftsFiltersSidebar from './MarketplaceNftsFiltersSidebar';

const MarketplaceNfts = (props) => {
    const { from, setMoreAvailalbe } = props;
    const activeNetwork = useSelector((state) => state.app.activeNetwork);
    const [filtersOpen, setfiltersOpen] = useState(false);
    const [filters, setMarketFilters] = useState({
        status: [],
        price: { min: '', max: '', network: '' },
        quantity: 'All',
        collections: [],
        chain: [],
        category: [],
        title: [],
        search: '',
        sortBy: ''
    });
    const [appliedFilters, setAppliedFilters] = useState([]);
    const [removeItem, setRemoveItem] = useState(null);
    const [hasMore, sethasMore] = useState(true);
    const { Moralis, isInitialized } = useMoralis();
    const [products, setProducts] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);

    useEffect(() => {
        setMoreAvailalbe(hasMore);
    }, [hasMore]);

    useEffect(() => {
        if (!activeNetwork || !isInitialized) return;
        if (!(JSON.stringify(appliedFilters) === JSON.stringify(filters))) {
            setProducts([]);
            setPageNumber(0);
            getListings();
        }
    }, [filters, activeNetwork, isInitialized]);

    const getListings = async () => {
        if (!ChainHexString(activeNetwork)) return;
        setAppliedFilters(filters);
        const categories =
            filters?.category?.length > 0
                ? filters?.category?.map((category) => {
                    return category.value.toLowerCase();
                })
                : null;
        const result = await queryListings(Moralis, {
            status: 'available',
            page: pageNumber,
            limit: 10,
            chainId: ChainHexString(activeNetwork),
            categories: categories
        });
        const listings = result[0];
        const nfts = result[1];
        let currProducts = [];
        if (pageNumber > 0) {
            currProducts = [...products];
        }
        for (let i = 0; i < listings.length; i++) {
            currProducts.push(formatListingNFT(listings[i], nfts[i]));
        }
        if (listings && listings?.length > 0) {
            setPageNumber(pageNumber + 1);
            sethasMore(true);

        } else {
            sethasMore(false);

        }
        setProducts(currProducts);
    };

    const removeFilterItem = (name, index) => {
        setRemoveItem({ name: name, index: index });
    }

    return (
        <>

            <MarketplaceNftsFilters toggleFilter={setfiltersOpen} filtersOpen={filtersOpen} from={from} setMarketFilters={setMarketFilters} filters={filters} setRemoveItem={setRemoveItem} />
            <div className={`marketplace-page-wrapper ${filtersOpen ? 'withfilter' : ''}`} >
                {filtersOpen ? <MarketplaceNftsFiltersSidebar filters={filters} setMarketFilters={setMarketFilters} removeItem={removeItem} setRemoveItem={setRemoveItem} /> : null}
                <div className="marketplace-page-wrapper-content">
                    <div className='marketplace-page-filters-tags'>
                        {filters.status.map((item, i) => (
                            <div className='marketplace-page-filters-tags-btn'>{item} <span className='marketplace-page-filters-tags-btn-remove' onClick={(e) => { removeFilterItem('status', item) }}><Remove /></span></div>
                        ))}
                        {filters.collections.map((item, i) => (
                            <div className='marketplace-page-filters-tags-btn'>{item}<span className='marketplace-page-filters-tags-btn-remove' onClick={(e) => { removeFilterItem('collections', item) }}><Remove /></span></div>
                        ))}
                        {filters.chain.map((item, i) => (
                            <div className='marketplace-page-filters-tags-btn'>{item} <span className='marketplace-page-filters-tags-btn-remove' onClick={(e) => { removeFilterItem('chain', item) }}><Remove /></span></div>
                        ))}
                        {filters.category.map((item, i) => (
                            <div className='marketplace-page-filters-tags-btn'>{item} <span className='marketplace-page-filters-tags-btn-remove' onClick={(e) => { removeFilterItem('category', item) }}><Remove /></span></div>
                        ))}
                        {filters.title.map((item, i) => (
                            <div className='marketplace-page-filters-tags-btn'>{item} <span className='marketplace-page-filters-tags-btn-remove' onClick={(e) => { removeFilterItem('title', item) }}><Remove /></span></div>
                        ))}
                        {
                            filters?.status?.length > 0 || filters?.collections?.length > 0 || filters?.chain?.length > 0 || filters?.category?.length > 0 || filters?.title?.length > 0 ? <div className='marketplace-page-filters-tags-clear' onClick={(e) => { setRemoveItem({ all: true }) }}>Clear all</div> : null
                        }
                    </div>
                    <InfiniteScroll dataLength={products.length} next={getListings} hasMore={hasMore} loader={<ItemLoader />} className="marketplace-page-wrapper-content-inner">
                        <div className="mediaeye-nft-row" size={filtersOpen ? 4 : 5}>
                            {products.map((product, i) => (
                                <ExploreBlock product={product} key={i} />
                            ))}
                        </div>
                    </InfiniteScroll>
                </div>
            </div>
        </>
    );
};

export default MarketplaceNfts;