import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useMoralis } from 'react-moralis';
import { useSelector } from 'react-redux';
import ItemLoader from '../../Common/ItemLoader';
import ExploreBlock from '../../ContentMarketplace/ExploreBlock/ExploreBlock';
import { Remove } from '../../Icons';
import MarketplaceNftsFilters from '../../Marketplace/nft/MarketplaceNftsFilters';
import MarketplaceNftsFiltersSidebar from '../../Marketplace/nft/MarketplaceNftsFiltersSidebar';
import { ChainHexString } from '../../../blockchain/functions/ChangeChain';
import { queryListings } from '../../../blockchain/functions/Marketplace';
import { formatListingNFT } from '../../../utils/FormatListingNFT';
import './CollectionItemsTab.scss'
import { formatNFTDisplay } from '../../../utils/FormatNFTDisplay';

export default function CollectionItemsTab(props) {
    const { nfts, collectionType } = props;
    const activeNetwork = useSelector((state) => state.app.activeNetwork);
    const [removeItem, setRemoveItem] = useState(null);
    const [hasMore, sethasMore] = useState(true);
    const { Moralis, isInitialized } = useMoralis();
    const [products, setProducts] = useState([]);
    const [filtersOpen, setfiltersOpen] = useState(false);
    const [pageNumber, setPageNumber] = useState(0);
    const [filters, setMarketFilters] = useState({
        status: [],
        price: { min: '', max: '', network: '' },
        quantity: 'All',
        collections: [],
        chain: [],
        category: [],
        title: [],
        search: '',
        sortBy: '',
        open: false,
    });
    useEffect(() => {
        if (!activeNetwork || !isInitialized) return;
        setProducts([]);
        setPageNumber(0);
        getListings();
    }, [filters, activeNetwork, isInitialized]);

    const getListings = async () => {
        if (!ChainHexString(activeNetwork)) return;
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
        <div className='collection-items-tab'>
            <MarketplaceNftsFilters toggleFilter={setfiltersOpen} filtersOpen={filtersOpen} from={'collectionItem'} setMarketFilters={setMarketFilters} filters={filters} setRemoveItem={setRemoveItem} />
            <div className={`marketplace-page-wrapper ${filtersOpen ? 'withfilter' : ''}`} >
                {filtersOpen ?
                    <MarketplaceNftsFiltersSidebar filters={filters} setMarketFilters={setMarketFilters} removeItem={removeItem} setRemoveItem={setRemoveItem} />
                    : null}
                <div className='collection-items-tab-wrapper'>
                    <div className="marketplace-page-wrapper-content">
                        <div className='marketplace-page-filters-tags'>
                            {filters.status.map((item, i) => (
                                <div className='marketplace-page-filters-tags-btn'>{item} <span className='marketplace-page-filters-tags-btn-remove' onClick={(e) => { removeFilterItem('status', i) }}><Remove /></span></div>
                            ))}
                            {filters.collections.map((item, i) => (
                                <div className='marketplace-page-filters-tags-btn'>{item} <span className='marketplace-page-filters-tags-btn-remove' onClick={(e) => { removeFilterItem('collections', i) }}><Remove /></span></div>
                            ))}
                            {filters.chain.map((item, i) => (
                                <div className='marketplace-page-filters-tags-btn'>{item} <span className='marketplace-page-filters-tags-btn-remove' onClick={(e) => { removeFilterItem('chain', i) }}><Remove /></span></div>
                            ))}
                            {filters.category.map((item, i) => (
                                <div className='marketplace-page-filters-tags-btn'>{item} <span className='marketplace-page-filters-tags-btn-remove' onClick={(e) => { removeFilterItem('category', i) }}><Remove /></span></div>
                            ))}
                            {filters.title.map((item, i) => (
                                <div className='marketplace-page-filters-tags-btn'>{item} <span className='marketplace-page-filters-tags-btn-remove' onClick={(e) => { removeFilterItem('title', i) }}><Remove /></span></div>
                            ))}
                            {
                                filters?.status?.length > 0 || filters?.collections?.length > 0 || filters?.chain?.length > 0 || filters?.category?.length > 0 || filters?.title?.length > 0 ? <div className='marketplace-page-filters-tags-clear' onClick={(e) => { setRemoveItem({ all: true }) }}>Clear all</div> : null
                            }
                        </div>
                        <InfiniteScroll dataLength={nfts.length} next={getListings} hasMore={hasMore} loader={nfts.length > 0 ? null : <ItemLoader />}>
                            <div className={`mediaeye-nft-row ${filters?.open ? 'filtersActive' : ''}`}>
                                {nfts.map((key, i) => (
                                    <ExploreBlock
                                        product={formatNFTDisplay(key)}
                                        key={i}
                                    />
                                ))}
                            </div>
                        </InfiniteScroll>
                    </div>

                </div>
            </div>
        </div>
    )
}