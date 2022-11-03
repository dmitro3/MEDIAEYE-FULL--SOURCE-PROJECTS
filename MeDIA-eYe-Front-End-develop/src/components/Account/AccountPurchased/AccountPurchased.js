import React, { useEffect, useState, useRef } from 'react';
import './AccountPurchased.scss';
import MarketplaceBlock from '../../ContentMarketplace/MarketplaceBlock/MarketplaceBlock';
import { useMoralis } from 'react-moralis';
import { queryPurchased } from '../../../blockchain/functions/Account/QueryPurchased';
import AddEmptyBlocks from '../../../utils/AddEmptyBlocks';
import { useHistory, useLocation } from 'react-router-dom';
import { useIsVisible } from 'react-is-visible';

const productPerPage = 8;
let arrayForHoldingProducts = [];

const AccountPurchased = (props) => {
  const { Moralis } = useMoralis();
  let history = useHistory();
  const [search, setSearch] = useState('');
  const [assetData, setAssetData] = useState([]);
  const [purchased, setPurchased] = useState([]);
  const { user, isOwner } = props;

  const [productToShow, setproductToShow] = useState([]);
  const [next, setNext] = useState(8);
  const anchorVisible = useRef();
  const isVisible = useIsVisible(anchorVisible);

  const queryPurchasedList = async () => {
    if (user) {
      const result = await queryPurchased(
        Moralis,
        user.attributes.ethAddress,
        1
      );
      setPurchased(result);
      setAssetData(result);
    }
  };

  const loopWithSlice = (start, end) => {
    const slicedProducts = purchased.slice(start, end);
    arrayForHoldingProducts = [...arrayForHoldingProducts, ...slicedProducts];
    setproductToShow(arrayForHoldingProducts);
  };

  useEffect(() => {
    if (isVisible) {
      handleShowMoreProducts();
    }
  }, [isVisible]);

  useEffect(() => {
    loopWithSlice(0, productPerPage);
  }, [purchased]);

  const handleShowMoreProducts = () => {
    loopWithSlice(next, next + productPerPage);
    setNext(next + productPerPage);
  };

  const showPurchased = () => {
    return productToShow.map((key, index) => (
      <MarketplaceBlock
        key={index}
        count={key.attributes.amount}
        totalTokens={key?.attributes?.nft?.attributes?.totalTokens}
        owner={
          key.attributes.owner === user.ethAddress
            ? '@me'
            : key.attributes.owner
        }
        name={key?.attributes?.nft?.attributes?.name}
        url={key?.attributes?.nft?.attributes?.image}
        nft={key?.attributes?.nft}
      ></MarketplaceBlock>
    ));
  };

  const searchChange = () => {
    const value = search.trim().toLowerCase();
    const currentList = purchased.filter((asset) =>
      asset.attributes.nft.attributes.name.toLowerCase().includes(value)
    );

    if (value === '') {
      return setPurchased(assetData);
    }

    if (currentList.length > 0) {
      return setPurchased(currentList);
    }
    return setPurchased([]);
  };

  useEffect(async () => {
    searchChange();
  }, [search]);

  useEffect(() => {
    queryPurchasedList();
  }, [user]);

  return (
    <div className="account_collection">
      <div className="creator_account_filter">
        <div className="new-search-filter">
          <button>
            <input className="search-bar-btn" type="text" value="Search" />
          </button>
          <button className="filter-new-btn">
            Filter
          </button>
        </div>
      </div>
      {purchased.length === 0 ? (
        isOwner ? (
          <div className="account_empty_block">
            <button
              type="butotn"
              className="btn btn-info"
              style={{ margin: '20px auto' }}
              onClick={() => history.push('/nft-marketplace')}
            >
              Go to marketplace
            </button>
            <span>
              You still haven't bought your first NFT, Click Here to get your
              first one!
            </span>
          </div>
        ) : (
          <div className="account_empty_block">
            <button
              type="butotn"
              className="btn btn-info"
              style={{ margin: '20px auto' }}
              onClick={() => history.push('/nft-marketplace')}
            >
              Go to marketplace
            </button>
            <span>Username doesn`t have Purchased yet</span>
          </div>
        )
      ) : null}
      <div className="creator_account_main_block">
        {showPurchased()}
        {AddEmptyBlocks(productToShow.length)}
      </div>
      <div ref={anchorVisible}></div>
    </div>
  );
};

export default AccountPurchased;
