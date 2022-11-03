import React, { useState, useEffect, useRef } from 'react';
import ExploreBlock from '../ExploreBlock/ExploreBlock';
import { useMoralis } from 'react-moralis';
import { queryListings } from '../../../blockchain/functions/Marketplace';
import { ExploreBlockPlug } from '../../Icons/Plugs';
import AddEmptyBlocks from '../../../utils/AddEmptyBlocks';
import { formatListingNFT } from '../../../utils/FormatListingNFT';
import MenuMarketplace from '../MenuMarketplace/MenuMarketplace';
import { ChainHexString } from '../../../blockchain/functions/ChangeChain/ChainHexStrings';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './MarketplaceMain.scss';

const ContentMarketplaceMain = (props) => {
  const { Moralis, isInitialized } = useMoralis();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [activeCategory, setActiveCategory] = useState('all');
  const [allLoaded, setAllLoaded] = useState(false);
  const activeNetwork = useSelector((state) => state.app.activeNetwork);
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeSelection, setActiveSelection] = useState('Fixed Price');
  let history = useHistory();
  // query once when initialized
  useEffect(() => {
    // run after active network is initialized
    if (!activeNetwork || !isInitialized) return;
    // if products was already empty
    if (!products.length || page === 0) {
      getListings(page);
    } else {
      // reset products
      setProducts([]);
      setPage(0);
    }
    // setAllLoaded(false);
  }, [activeCategory, activeNetwork, isInitialized]);

  // when page changes
  useEffect(() => {
    getListings();
  }, [page]);

  const getListings = async (pagination) => {
    //if (activeCategory === 'all') {
    if (!ChainHexString(activeNetwork)) return;
    const result = await queryListings(Moralis, {
      status: 'available',
      page: page,
      limit: 8,
      chainId: ChainHexString(activeNetwork),
      category: activeCategory === 'all' ? null : activeCategory
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

  const handlePagination = async () => {
    // increment page
    setPage(page + 1);
  };

  return (
    <>
      <MenuMarketplace setActiveCategory={setActiveCategory} />
      <div className="mediaeye-nft-row">
        {loading ? (
          <>
            <ExploreBlockPlug />
            <ExploreBlockPlug />
            <ExploreBlockPlug />
            <ExploreBlockPlug />
            <ExploreBlockPlug />
            <ExploreBlockPlug />
            <ExploreBlockPlug />
            <ExploreBlockPlug />
          </>
        ) : (
          products.map((product, i) => (
            <ExploreBlock key={i} product={product} />
          ))
        )}
      </div>
      {products.length <= 0 && !loading && allLoaded ? (
        <div className="nft-marketplace-bottom">
          <button
            type="button"
            className="btn btn-info btn-sm btn-more"
            onClick={() => history.push('/create')}
          >
            Create NFT
          </button>
        </div>
      ) : null}

      {!allLoaded ? (
        <div className="nft-marketplace-bottom">
          <button
            type="button"
            className="btn btn-info btn-sm btn-more"
            onClick={handlePagination}
          >
            LOAD MORE
          </button>
        </div>
      ) : null}
    </>
  );
};

export default ContentMarketplaceMain;
