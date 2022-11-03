import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import ContentMarketplaceHeader from '../components/ContentMarketplace/MarketplaceHeader/NftMarketplaceHeader';
import { useMoralis } from 'react-moralis';
import { queryListings } from '../blockchain/functions/Marketplace/QueryListings';
import { formatListingNFT } from '../utils/FormatListingNFT';
import MenuMarketplace from '../components/ContentMarketplace/MenuMarketplace/MenuMarketplace';
import ExploreBlock from '../components/ContentMarketplace/ExploreBlock/ExploreBlock';
import { ChainHexString } from '../blockchain/functions/ChangeChain/ChainHexStrings';
import ItemLoader from '../components/Common/ItemLoader';
const NftMarketplace = (props) => {
  const { closeNftCollapse } = props;
  //const [allLoaded, setAllLoaded] = useState(false);
  const activeNetwork = useSelector((state) => state.app.activeNetwork);
  const [filters, setMarketFilters] = useState([]);
  const { Moralis, isInitialized } = useMoralis();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  // reference to state that can be used in listeners (specifically onScroll)
  const productsRef = useRef(products);
  const pageRef = useRef(page);
  const [loading, setLoading] = useState(true);

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
  }, [filters, activeNetwork, isInitialized]);

  useEffect(() => {
    setPage(0);
  }, [filters]);
  // when page changes
  useEffect(() => {
    if (!isInitialized) return;
    getListings(page);
  }, [page, isInitialized]);

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
    setLoading(true);
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
    //if (!result[0].length) setAllLoaded(true);
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

  return (
    <>
      <Helmet>
        <meta
          property="og:url"
          content={window.location.origin + '/nft-marketplace'}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Trade NFTs on Auctions or Fix Price Sales. Private Marketplaces with Airdrops and Bounties | MEDIA EYE"
        />
        <meta
          property="og:description"
          content="MEDIA EYE NFT Marketplace offers a wide range of services for buyers and sellers of NFTs, frictionless easy to use platform allowing to harness the value of NFTs."
        />
        <meta
          property="og:image"
          content={window.location.origin + '/img/meta_tag/markeplace.png'}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:domain"
          content="mediaeyenft.com/nft-marketplace"
        />
        <meta
          property="twitter:url"
          content={window.location.origin + '/nft-marketplace'}
        />
        <meta
          name="twitter:title"
          content="Trade NFTs on Auctions or Fix Price Sales. Private Marketplaces with Airdrops and Bounties | MEDIA EYE"
        />
        <meta
          name="twitter:description"
          content="MEDIA EYE NFT Marketplace offers a wide range of services for buyers and sellers of NFTs, frictionless easy to use platform allowing to harness the value of NFTs."
        />
        <meta
          name="twitter:image"
          content={window.location.origin + '/img/meta_tag/markeplace.png'}
        />
        <title>
          Trade NFTs on Auctions or Fix Price Sales. Private Marketplaces with
          Airdrops and Bounties | MEDIA EYE
        </title>
        <meta
          name="description"
          content="MEDIA EYE NFT Marketplace offers a wide range of services for buyers and sellers of NFTs, frictionless easy to use platform allowing to harness the value of NFTs."
        />
      </Helmet>
      <div
        className="withfulllayout nft-marketplace-page"
        onClick={closeNftCollapse}
      >
        <div className="mediaeye-layout-content">
          <div className="mediaeye-layout-middle nft-marketplace-page-inner">

            <ContentMarketplaceHeader />

          </div>
          <div className="mediaeye-layout-middle">
            <MenuMarketplace setMarketFilters={setMarketFilters} />
            <div className="mediaeye-layout-container">
              <div className="mediaeye-nft-row">
                {products.map((product, i) => (
                  <ExploreBlock product={product} key={i} />
                ))}
              </div>

              {loading ? <ItemLoader /> : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NftMarketplace;
