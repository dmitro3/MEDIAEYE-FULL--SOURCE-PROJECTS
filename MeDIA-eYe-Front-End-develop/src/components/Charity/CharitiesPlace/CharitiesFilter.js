import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useMoralis } from 'react-moralis';
import InfiniteScroll from 'react-infinite-scroll-component';
import { queryListings } from '../../../blockchain/functions/Marketplace';
import { formatListingNFT } from '../../../utils/FormatListingNFT';
import ExploreBlock from '../../ContentMarketplace/ExploreBlock/ExploreBlock';
import { ChainHexString } from '../../../blockchain/functions/ChangeChain';
import ItemLoader from '../../Common/ItemLoader';
import MarketplaceNftsFilters from '../../Marketplace/nft/MarketplaceNftsFilters';
import { Angle, FilterIcon, MenuIcon, Remove } from '../../Icons';
import MarketplaceNftsFiltersSidebar from '../../Marketplace/nft/MarketplaceNftsFiltersSidebar';
import CharitySection from '../CharitySection/CharitySection';
import SelectSearch from 'react-select-search';

export default function CharitiesFilter(props) {
  const {
    filters,
    setMarketFilters,
    setRemoveItem,
    filtersOpen,
    toggleFilter,
    from,
    handleSearch,
    receiptOptions,
    receiptvalue,
    receiptChange,
    nftoptions,
    nftvalue,
    nftChange
  } = props;
  const activeNetwork = useSelector((state) => state.app.activeNetwork);
  // const [filters, setMarketFilters] = useState({
  //   status: [],
  //   price: { min: '', max: '', network: '' },
  //   quantity: 'All',
  //   collections: [],
  //   chain: [],
  //   category: [],
  //   title: [],
  //   search: '',
  //   sortBy: '',
  //   open: false
  // });
  // const [removeItem, setRemoveItem] = useState(null);
  const [hasMore, sethasMore] = useState(true);
  const actionRef = useRef();
  const { Moralis, isInitialized } = useMoralis();
  const [products, setProducts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [actionWidth, setSidebarWidth] = useState();

  const updateFilterValue = (name, value) => {
    let allFilters = { ...filters };
    allFilters = { ...allFilters, [name]: value };
    setMarketFilters(allFilters);
  };

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
  };

  return (
    <>
      <div
        className={`mediaeye-charity-filters ${
          filtersOpen ? 'withfilter' : ''
        }`}
      >
        {/* {from === 1 ? ( */}
        <div
          className="mediaeye-charity-filters-list mediaeye-charity-filters-col"
          ref={actionRef}
          style={{ maxWidth: actionWidth ? actionWidth + 'px' : '' }}
        >
          <div
            className="mediaeye-charity-filters-action"
            onClick={(e) => {
              toggleFilter(!filtersOpen);
            }}
          >
            <span className="mediaeye-charity-filters-list-icon">
              {' '}
              {filtersOpen ? (
                <Angle side="small_down" />
              ) : (
                <FilterIcon type="list" />
              )}{' '}
            </span>
            Filters
            <span
              className="mediaeye-charity-filters-action-reset"
              onClick={(e) => {
                e.stopPropagation();
                setRemoveItem({ reset: true });
              }}
            >
              Reset
            </span>
          </div>
        </div>
        {/* ) : null} */}

        <div className="mediaeye-charity-filters-col mediaeye-charity-filters-search">
          <div className="mediaeye-searchbar">
            {from === 0 ? (
              <input
                placeholder="Search by Charities"
                type="text"
                value={filters?.search}
                onChange={handleSearch}
              />
            ) : (
              <input placeholder="Search by Charities" type="text" />
            )}
          </div>
        </div>

        <div className="mediaeye-charity-filters-sort mediaeye-charity-filters-col">
          {from === 0 ? (
            <SelectSearch
              className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style  mediaeye-selectsearch-medium"
              placeholder="Sort by"
              options={receiptOptions}
              value={receiptvalue}
              onChange={(opt) => receiptChange(opt)}
            />
          ) : (
            <SelectSearch
              className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style  mediaeye-selectsearch-medium"
              placeholder="Sort by"
              options={nftoptions}
              value={nftvalue}
              onChange={(opt) => nftChange(opt)}
            />
          )}
        </div>
        <div className="mediaeye-charity-filters-col">
          <div className="mediaeye-charity-filters-action">
            <MenuIcon type="small" />
          </div>
        </div>
        <div className="mediaeye-charity-filters-col">
          <div className="mediaeye-charity-filters-action">
            <MenuIcon />
          </div>
        </div>
      </div>
      {/* <div
        className={`marketplace-page-wrapper ${filters?.open ? 'withfilter' : ''
          }`}
      >
        {filters?.open ? (
          <MarketplaceNftsFiltersSidebar
            filters={filters}
            setMarketFilters={setMarketFilters}
            removeItem={removeItem}
            setRemoveItem={setRemoveItem}
          />
        ) : null}
        <div className="marketplace-page-wrapper-content">
          <div className="marketplace-page-filters-tags">
            {filters.status.map((item, i) => (
              <div className="marketplace-page-filters-tags-btn">
                {item}{' '}
                <span
                  className="marketplace-page-filters-tags-btn-remove"
                  onClick={(e) => {
                    removeFilterItem('status', i);
                  }}
                >
                  <Remove />
                </span>
              </div>
            ))}
            {filters.collections.map((item, i) => (
              <div className="marketplace-page-filters-tags-btn">
                {item}{' '}
                <span
                  className="marketplace-page-filters-tags-btn-remove"
                  onClick={(e) => {
                    removeFilterItem('collections', i);
                  }}
                >
                  <Remove />
                </span>
              </div>
            ))}
            {filters.chain.map((item, i) => (
              <div className="marketplace-page-filters-tags-btn">
                {item}{' '}
                <span
                  className="marketplace-page-filters-tags-btn-remove"
                  onClick={(e) => {
                    removeFilterItem('chain', i);
                  }}
                >
                  <Remove />
                </span>
              </div>
            ))}
            {filters.category.map((item, i) => (
              <div className="marketplace-page-filters-tags-btn">
                {item}{' '}
                <span
                  className="marketplace-page-filters-tags-btn-remove"
                  onClick={(e) => {
                    removeFilterItem('category', i);
                  }}
                >
                  <Remove />
                </span>
              </div>
            ))}
            {filters.title.map((item, i) => (
              <div className="marketplace-page-filters-tags-btn">
                {item}{' '}
                <span
                  className="marketplace-page-filters-tags-btn-remove"
                  onClick={(e) => {
                    removeFilterItem('title', i);
                  }}
                >
                  <Remove />
                </span>
              </div>
            ))}
            {filters?.status?.length > 0 ||
              filters?.collections?.length > 0 ||
              filters?.chain?.length > 0 ||
              filters?.category?.length > 0 ||
              filters?.title?.length > 0 ? (
              <div
                className="marketplace-page-filters-tags-clear"
                onClick={(e) => {
                  setRemoveItem({ all: true });
                }}
              >
                Clear all
              </div>
            ) : null}
            <InfiniteScroll
              dataLength={products.length}
              next={getListings}
              hasMore={hasMore}
              loader={<ItemLoader />}
            >
              <div className="mediaeye-nft-row" size={filters?.open ? 4 : 5}>
                <CharitySection
                  type={Charity}
                  taxReceipt={taxReceipt}
                  searchInput={searchInput}
                />
              </div>
            </InfiniteScroll>
          </div>
        </div>
      </div> */}
    </>
  );
}
