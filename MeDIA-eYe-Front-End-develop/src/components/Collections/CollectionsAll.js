import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useMoralis } from 'react-moralis';
import CollectionCard from '../ContentMarketplace/CollectionCard/CollectionCard';
import { queryCollectionsByChain } from '../../blockchain/functions/Collection';
import { ChainHexString } from '../../blockchain/functions/ChangeChain/ChainHexStrings';
import { useIsVisible } from 'react-is-visible';
import ItemLoader from '../Common/ItemLoader';
import { extraLength } from '../../utils/functions';
const productPerPage = 8;

const CollectionsAll = (props) => {
  const { sortType } = props;
  const activeNetwork = useSelector((state) => state.app.activeNetwork);
  const { Moralis, isInitialized } = useMoralis();
  const [productToShow, setproductToShow] = useState([]);
  const [next, setNext] = useState(productPerPage);
  const anchorVisible = useRef();
  const isVisible = useIsVisible(anchorVisible);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const queryCollectionNew = async (startIndex) => {
    setLoading(true);
    const params = {
      chain: ChainHexString(activeNetwork),
      notImported: sortType === 'mediaeye' ? true : null,
      skip: startIndex, //next - productPerPage,
      limit: productPerPage,
      hidden: false
    };
    const result = await queryCollectionsByChain(Moralis, params);
    setCollections(result);
    setLoading(false);
  };

  const queryCollectionPopular = async (startIndex) => {
    setLoading(true);
    const params = {
      chainHex: ChainHexString(activeNetwork),
      skip: startIndex, //next - productPerPage,
      limit: productPerPage
    };
    const result = await Moralis.Cloud.run('queryPopularCollections', params);
    setCollections(result);
    setLoading(false);
  };

  // reset/first query
  useEffect(() => {
    setproductToShow([]); // reset array
    setNext(productPerPage); // reset page

    if (isInitialized) {
      if (sortType === 'popular') queryCollectionPopular(0);
      else queryCollectionNew(0);
    }
  }, [activeNetwork, isInitialized, sortType]);

  // query for next page / show more
  useEffect(() => {
    if (isVisible) {
      if (sortType === 'popular') queryCollectionPopular(next);
      else queryCollectionNew(next);
      setNext(next + productPerPage);
    }
  }, [isVisible]);

  // add to product display if collections object has new stuff
  useEffect(() => {
    if (collections && collections.length > 0) {
      // wait for reload if network has changed before products displayed
      // otherwise reload not necessary, just set products
      if (collections[0].attributes.chainId === ChainHexString(activeNetwork)) {
        const newProducts = [...productToShow, ...collections];
        setproductToShow(newProducts);
      }
    }
  }, [collections]);

  return (
    <>
      <div
        className="mediaeye-collection-row"
        extraLength={extraLength(productToShow, 3)}
      >
        {productToShow.map((product, i) => (
          <CollectionCard key={i} collection={product} />
        ))}
      </div>
      {loading ? <ItemLoader /> : null}
      <div ref={anchorVisible}></div>
    </>
  );
};

export default CollectionsAll;
