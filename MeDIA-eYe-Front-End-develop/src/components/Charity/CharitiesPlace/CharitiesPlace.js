import React, { useState, useEffect, useRef } from 'react';
import './CharitiesPlace.scss';
import { Helmet } from 'react-helmet';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SelectSearch from 'react-select-search';
import ExploreBlock from '../../ContentMarketplace/ExploreBlock/ExploreBlock';
import CharitySection from '../CharitySection/CharitySection';
import { useMoralis } from 'react-moralis';
import { queryListings } from '../../../blockchain/functions/Marketplace/QueryListings';
import { formatListingNFT } from '../../../utils/FormatListingNFT';
import { ChainHexString } from '../../../blockchain/functions/ChangeChain/ChainHexStrings';
import Tabs from '../../Common/AnimatedTab/Tabs';
import CharitiesFilter from './CharitiesFilter';
import CharityFilterSidebar from './CharityFilterSidebar';
import { Remove } from '../../Icons';
import InfiniteScroll from 'react-infinite-scroller';
import ItemLoader from '../../Common/ItemLoader';

const CharitiesPlace = (props) => {
  const dispatch = useDispatch();
  const activeNetwork = useSelector((state) => state.app.activeNetwork);
  const [activeTab, setActiveTab] = useState(0);
  let history = useHistory();
  const [products, setProducts] = useState([]);
  const focusActiveTab = (e) => {
    setActiveTab(e.currentTarget.id);
  };
  const [allLoaded, setAllLoaded] = useState(false);
  const [filters, setMarketFilters] = useState({
    status: [],
    price: { min: '', max: '', network: '' },
    quantity: 'All',
    collections: [],
    chain: [],
    category: [],
    search: '',
    sortBy: ''
  });
  const [loading, setLoading] = useState(true);
  const { Moralis, isInitialized } = useMoralis();
  const [page, setPage] = useState(0);
  const productsRef = useRef(products);
  const pageRef = useRef(page);
  const [searchInput, setSearchInput] = useState('');
  const [Charity, setCharity] = useState('All');
  const [taxReceipt, setTaxReceipt] = useState('All');
  const [NFT, setNFT] = useState('All Participating');
  const [showCardAction, setShowCardAction] = useState(false);
  const [showCardActionmenu, setShowCardActionmenu] = useState(false);
  const tabs = ['Charities', 'Participating Creators'];
  const [filtersOpen, setfiltersOpen] = useState(false);
  const [removeItem, setRemoveItem] = useState(null);
  const [hasMore, sethasMore] = useState(true);

  const moralisListing = products?.currentListing;
  let currentListing = moralisListing ? moralisListing : {};
  if (moralisListing?.id) {
    currentListing = {
      id: moralisListing.id,
      type: moralisListing?.attributes?.type,
      status: moralisListing?.attributes?.status,
      size: moralisListing?.attributes?.size
    };
  }

  // query once when initialized
  useEffect(() => {
    // run after active network is initialized
    if (!activeNetwork || !isInitialized) return;
    // if products was already empty
    if (!products.length || page === 0) {
      getListings();
    } else {
      // reset products
      setProducts([]);
      setPage(0);
    }
    // setAllLoaded(false);
  }, [filters, activeNetwork, isInitialized]);

  useEffect(() => {
    setPage(0);
  }, [filters]);
  // when page changes
  useEffect(() => {
    getListings(page);
  }, [page]);

  useEffect(() => {
    const onScroll = (e) => {
      if (productsRef.current.length > 0) {
        const bottom =
          document.documentElement.scrollTop ===
          document.documentElement.scrollHeight -
            document.documentElement.clientHeight;
        if (bottom) {
          setPage(page + 1);
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
      page: page,
      limit: 8,
      chainId: ChainHexString(activeNetwork),
      categories: categories
    });

    const listings = result[0];
    const nfts = result[1];
    let currProducts = [];
    // add to current product
    if (page > 0) {
      currProducts = [...products];
    }
    for (let i = 0; i < result[0].length; i++) {
      currProducts.push(formatListingNFT(listings[i], nfts[i]));
    }

    // check if there are no more products to load
    if (!result[0].length) setAllLoaded(true);
    setProducts(currProducts);
    setLoading(false);
  };

  useEffect(() => {
    // update reference to be used to get products in a hook/listener
    productsRef.current = products;
  }, [products]);

  useEffect(() => {
    // update reference to be used to get activeNetwork in a hook/listener
    pageRef.current = page;
  }, [page]);

  const allItems = [
    { name: 'All Charities', value: 'All' },
    { name: 'Giving Block Charities', value: 'Giving Block' }
  ];
  const allItemsSec = [
    { name: 'All', value: 'All' },
    { name: 'Tax Receipt Included', value: 'yes' },
    { name: 'No Tax Receipt Included', value: 'no' }
  ];
  const NFTOpp = [
    { name: 'All Participating', value: 'All Participating' },
    { name: 'Giving Block Participating', value: 'Giving Block Participating' }
  ];

  const onTabChange = (index) => {
    if (activeTab !== index) {
      setActiveTab(index);
    }
  };

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const removeFilterItem = (name, index) => {
    setRemoveItem({ name: name, index: index });
  };

  return (
    <>
      <Helmet>
        <meta
          property="og:url"
          content={window.location.origin + '/charity-place'}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Charity Place provides programmatic donation services to approved Charities | MEDIA EYE"
        />
        <meta
          property="og:description"
          content="Charitable contributions made easy and tansparent, thanks to blockchain technology each transaction can be fully tracked and audited."
        />
        <meta
          property="og:image"
          content={window.location.origin + '/img/meta_tag/charityplace.png'}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:domain"
          content="mediaeyenft.com/charity-place"
        />
        <meta
          property="twitter:url"
          content={window.location.origin + '/charity-place'}
        />
        <meta
          name="twitter:title"
          content="Charity Place provides programmatic donation services to approved Charities | MEDIA EYE"
        />
        <meta
          name="twitter:description"
          content="Charitable contributions made easy and tansparent, thanks to blockchain technology each transaction can be fully tracked and audited."
        />
        <meta
          name="twitter:image"
          content={window.location.origin + '/img/meta_tag/charityplace.png'}
        />
        <title>
          Charity Place provides programmatic donation services to approved
          Charities | MEDIA EYE{' '}
        </title>
        <meta
          name="description"
          content="Charitable contributions made easy and tansparent, thanks to blockchain technology each transaction can be fully tracked and audited."
        />
      </Helmet>
      <section className="mediaeye-charity-inner">
        <div className="mediaeye-charity-banner">
          <img
            className="mediaeye-charity-banner-img"
            src="/img/charity/charity_banner.png"
            alt="charity banner"
          />
        </div>
        <div className="mediaeye-layout-middle">
          <div className="mediaeye-tabss mediaeye-charity-tabpart">
            <Tabs tabs={tabs} activeTab={activeTab} onTabChange={onTabChange} />
            <div className="mediaeye-charity-button">
              <Link to="/charity/register" className="btn btn-square">
                Registration
              </Link>
            </div>
          </div>

          {activeTab === 0 ? (
            <div>
              <div className="mediaeye-charity-filter">
                <div className="mediaeye-charity-filter-box">
                  <CharitiesFilter
                    from={activeTab}
                    handleSearch={handleSearch}
                    receiptOptions={allItemsSec}
                    receiptvalue={taxReceipt}
                    receiptChange={setTaxReceipt}
                  />
                  {/* <div className="top-collection-page-header">
                    <div className="mediaeye-charity-filter-box-options">
                      <SelectSearch
                        className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style"
                        size="lg"
                        options={allItems}
                        value={Charity}
                        onChange={(opt) => setCharity(opt)}
                      />
                    </div>
                    <div className="mediaeye-charity-filter-box-options">
                      <SelectSearch
                        className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style"
                        size="lg"
                        options={allItemsSec}
                        value={taxReceipt}
                        onChange={(opt) => setTaxReceipt(opt)}
                      />
                    </div>
                  </div>
                  <div className="mediaeye-searchbar">
                    <input
                      placeholder="Search"
                      type="text"
                      onChange={handleSearch}
                    />
                  </div> */}
                </div>
              </div>
              <CharitySection
                type={Charity}
                taxReceipt={taxReceipt}
                searchInput={searchInput}
              />
            </div>
          ) : activeTab === 1 ? (
            <div>
              <div className="mediaeye-charity-filter">
                <div className="mediaeye-charity-filter-box">
                  <CharitiesFilter
                    from={activeTab}
                    nftoptions={NFTOpp}
                    nftvalue={NFT}
                    nftChange={setNFT}
                    toggleFilter={setfiltersOpen}
                    filtersOpen={filtersOpen}
                    setMarketFilters={setMarketFilters}
                    filters={filters}
                    setRemoveItem={setRemoveItem}
                  />
                  {/* <div className="mediaeye-charity-filter-box-options">
                    <SelectSearch
                      className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style"
                      size="lg"
                      options={NFTOpp}
                      value={NFT}
                      onChange={(opt) => setNFT(opt)}
                    />
                  </div>

                  <div className="mediaeye-searchbar">
                    <input placeholder="Search" type="text" />
                  </div> */}
                </div>
              </div>
              <div className="mediaeye-charity-Participating Creators">
                <div
                  className={`mediaeye-charity-wrapper ${
                    filtersOpen ? 'withfilter' : ''
                  }`}
                >
                  {filtersOpen ? (
                    <CharityFilterSidebar
                      filters={filters}
                      setMarketFilters={setMarketFilters}
                      removeItem={removeItem}
                      setRemoveItem={setRemoveItem}
                    />
                  ) : null}
                  <div className="mediaeye-charity-wrapper-content">
                    <div className="mediaeye-charity-filters-tags">
                      {filters.status.map((item, i) => (
                        <div className="mediaeye-charity-filters-tags-btn">
                          {item}{' '}
                          <span
                            className="mediaeye-charity-filters-tags-btn-remove"
                            onClick={(e) => {
                              removeFilterItem('status', i);
                            }}
                          >
                            <Remove />
                          </span>
                        </div>
                      ))}
                      {filters.collections.map((item, i) => (
                        <div className="mediaeye-charity-filters-tags-btn">
                          {item}{' '}
                          <span
                            className="mediaeye-charity-filters-tags-btn-remove"
                            onClick={(e) => {
                              removeFilterItem('collections', i);
                            }}
                          >
                            <Remove />
                          </span>
                        </div>
                      ))}
                      {filters.chain.map((item, i) => (
                        <div className="mediaeye-charity-filters-tags-btn">
                          {item}{' '}
                          <span
                            className="mediaeye-charity-filters-tags-btn-remove"
                            onClick={(e) => {
                              removeFilterItem('chain', i);
                            }}
                          >
                            <Remove />
                          </span>
                        </div>
                      ))}
                      {filters.category.map((item, i) => (
                        <div className="mediaeye-charity-filters-tags-btn">
                          {item}{' '}
                          <span
                            className="mediaeye-charity-filters-tags-btn-remove"
                            onClick={(e) => {
                              removeFilterItem('category', i);
                            }}
                          >
                            <Remove />
                          </span>
                        </div>
                      ))}
                      {filters?.status?.length > 0 ||
                      filters?.collections?.length > 0 ||
                      filters?.chain?.length > 0 ||
                      filters?.category?.length > 0 ? (
                        <div
                          className="mediaeye-charity-filters-tags-clear"
                          onClick={(e) => {
                            setRemoveItem({ all: true });
                          }}
                        >
                          Clear all
                        </div>
                      ) : null}
                    </div>
                    <InfiniteScroll
                      dataLength={products.length}
                      next={getListings}
                      hasMore={hasMore}
                      // loader={<ItemLoader />}
                      className="mediaeye-charity-wrapper-content-inner"
                    >
                      <div
                        className="mediaeye-nft-row"
                        size={filtersOpen ? 4 : 5}
                      >
                        {products.map((product, i) => (
                          <ExploreBlock product={product} key={i} />
                        ))}
                      </div>
                    </InfiniteScroll>
                  </div>
                </div>
                {/* <div className="mediaeye-nft-row">
                  {products.map((product, i) => (
                    <ExploreBlock product={product} key={i} />
                  ))}
                </div> */}
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
};

export default CharitiesPlace;
