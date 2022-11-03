import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useMoralis } from 'react-moralis';
import CollectionCard from '../../ContentMarketplace/CollectionCard/CollectionCard';
import { ChainHexString } from '../../../blockchain/functions/ChangeChain';
import ItemLoader from '../../Common/ItemLoader';
import MarketplaceCollectionFilters from './MarketplaceCollectionFilters';
import { queryCollectionsByChain } from '../../../blockchain/functions/Collection';
import InfiniteScroll from 'react-infinite-scroll-component';
import MarketplaceCollectionFiltersSidebar from './MarketplaceCollectionFiltersSidebar';
import { Remove } from '../../Icons';

const MarketplaceCollection = (props) => {
  const { setMoreAvailalbe } = props;
  const activeNetwork = useSelector((state) => state.app.activeNetwork);
  const [filtersOpen, setfiltersOpen] = useState(false);
  const [filters, setMarketFilters] = useState({
    tokenType: [],
    collectionType: [],
    chain: [],
    search: '',
    sortBy: ''
  });
  const [removeItem, setRemoveItem] = useState(null);
  const { Moralis, isInitialized } = useMoralis();
  const productPerPage = 8;
  const [pageNumber, setPageNumber] = useState(0);
  const [collections, setCollections] = useState([]);
  const [productToShow, setproductToShow] = useState([]);
  const [hasMore, sethasMore] = useState(true);
  const queryCollectionNew = async () => {
    const params = {
      chain: ChainHexString(activeNetwork),
      //notImported: sortType === 'mediaeye' ? true : null,
      skip: pageNumber * productPerPage,
      limit: productPerPage,
      hidden: false
    };
    const result = await queryCollectionsByChain(Moralis, params);
    if (result && result.length > 0) {
      setCollections(result);
      setPageNumber(pageNumber + 1);
    } else {
      sethasMore(false);
    }
  };

  useEffect(() => {
    setPageNumber(0);
    setproductToShow([]);
    queryCollectionNew();
  }, [activeNetwork]);
  useEffect(() => {
    if (collections && collections.length > 0) {
      if (collections[0].attributes.chainId === ChainHexString(activeNetwork)) {
        const newProducts = [...productToShow, ...collections];
        setproductToShow(newProducts);
      }
    }
  }, [collections]);
  // useEffect(() => {
  //     setMoreAvailalbe(hasMore);
  // }, [hasMore]);

  const removeFilterItem = (name, index) => {
    setRemoveItem({ name: name, index: index });
  };
  useEffect(() => {
    setMoreAvailalbe(hasMore);
  }, [hasMore]);

  return (
    <>
      <MarketplaceCollectionFilters
        toggleFilter={setfiltersOpen}
        filtersOpen={filtersOpen}
        setMarketFilters={setMarketFilters}
        filters={filters}
        setRemoveItem={setRemoveItem}
      />
      <div
        className={`marketplace-page-wrapper ${filtersOpen ? 'withfilter' : ''
          }`}
      >
        {filtersOpen ? (
          <MarketplaceCollectionFiltersSidebar
            filters={filters}
            setMarketFilters={setMarketFilters}
            removeItem={removeItem}
            setRemoveItem={setRemoveItem}
          />
        ) : null}
        <div className="marketplace-page-wrapper-content marketplace-page-wrapper-content-collection">
          <div className="marketplace-page-filters-tags">
            {filters.tokenType.map((item, i) => (
              <div className="marketplace-page-filters-tags-btn">
                {item}{' '}
                <span
                  className="marketplace-page-filters-tags-btn-remove"
                  onClick={(e) => {
                    removeFilterItem('tokenType', item);
                  }}
                >
                  <Remove />
                </span>
              </div>
            ))}
            {filters.collectionType.map((item, i) => (
              <div className="marketplace-page-filters-tags-btn">
                {item}{' '}
                <span
                  className="marketplace-page-filters-tags-btn-remove"
                  onClick={(e) => {
                    removeFilterItem('collectionType', item);
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
                    removeFilterItem('chain', item);
                  }}
                >
                  <Remove />
                </span>
              </div>
            ))}

            {filters?.tokenType?.length > 0 ||
              filters?.collectionType?.length > 0 ? (
              <div
                className="marketplace-page-filters-tags-clear"
                onClick={(e) => {
                  setRemoveItem({ all: true });
                }}
              >
                Clear all
              </div>
            ) : null}
          </div>
          <InfiniteScroll
            dataLength={productToShow.length}
            next={queryCollectionNew}
            hasMore={hasMore}
            loader={<ItemLoader />}
            className="marketplace-page-wrapper-content-inner"
          >
            <div className="mediaeye-collection-row" size={filtersOpen ? 3 : 4}>
              {productToShow.map((product, i) => (
                <CollectionCard key={i} collection={product} />
              ))}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </>
  );
};

export default MarketplaceCollection;
