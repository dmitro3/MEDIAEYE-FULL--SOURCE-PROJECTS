import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useMoralis } from 'react-moralis';
import CollectionCard from '../ContentMarketplace/CollectionCard/CollectionCard';
import { queryCollectionsByChain } from '../../blockchain/functions/Collection';
import { ChainHexString } from '../../blockchain/functions/ChangeChain/ChainHexStrings';
import { useIsVisible } from 'react-is-visible';

const productPerPage = 8;

const YourCollecitons = (props) => {
  const activeNetwork = useSelector((state) => state.app.activeNetwork);
  const { user, Moralis, isInitialized } = useMoralis();
  const [productToShow, setproductToShow] = useState([]);
  const [next, setNext] = useState(productPerPage);
  const anchorVisible = useRef();
  const isVisible = useIsVisible(anchorVisible);
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const queryCollectionList = async (startIndex) => {
    setIsLoading(true);
    const params = {
      chain: ChainHexString(activeNetwork),
      skip: startIndex, //next - productPerPage,
      limit: productPerPage,
      hidden: false,
      userAddress: user?.attributes?.ethAddress
    };
    const result = await queryCollectionsByChain(Moralis, params);
    setCollections(result);
    setIsLoading(false);
  };

  useEffect(() => {
    setproductToShow([]); // reset array
    setNext(productPerPage); // reset page

    if (isInitialized) {
      queryCollectionList(0);
    }
  }, [activeNetwork, isInitialized]);

  useEffect(() => {
    if (isVisible) {
      queryCollectionList(next);
      setNext(next + productPerPage);
    }
  }, [isVisible]);

  useEffect(() => {
    if (collections && collections.length > 0) {
      const newProducts = [...productToShow, ...collections];
      setproductToShow(newProducts);
    }
  }, [collections]);

  return (
    <>
      {productToShow.length > 0 ? (
        <>
          <div className="mediaeye-collection-row">
            {productToShow.map((collection, i) =>
              props?.selectYourCollectionCard ? (
                <CollectionCard
                  collection={collection}
                  key={i}
                  selectCard={props.selectYourCollectionCard}
                  selectedCard={props?.selectedCard}
                />
              ) : (
                <CollectionCard collection={collection} key={i} />
              )
            )}
          </div>
          <div ref={anchorVisible}></div>
        </>
      ) : !isLoading ? (
        <div className="mediaeyeEmpty">
          <div className="mediaeyeEmpty-message">
            You don't have any collections yet
          </div>
          <div className="mediaeyeEmpty-action">
            <Link to="/create/collection" className="btn btn-creative">
              Create Collection
            </Link>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default YourCollecitons;
