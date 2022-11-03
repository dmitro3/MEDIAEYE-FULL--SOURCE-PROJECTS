import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Moralis } from 'moralis';
import { TokenName } from '../../../blockchain/functions/Addresses';
import { Link, useLocation } from 'react-router-dom';
import formatAdddress from '../../../utils/formatAdddress';
import { queryCollection } from '../../../blockchain/functions/Collection';
import { useMoralis } from 'react-moralis';
import { useState } from 'react';

export const BundleItems = (props) => {
  const { collectionAddresses, listingNFTs, activeProduct, setActiveProduct } =
    props;
  const { Moralis, isInitialized } = useMoralis();
  const [newProduct, setNewProduct] = useState(0);
  const [collections, setCollections] = useState([]);
  const getCollections = async () => {
    let collectionList = [];
    for (let i = 0; i < collectionAddresses?.length; i++) {
      const result = await queryCollection(Moralis, collectionAddresses[i]);
      collectionList.push(result);
    }
    setCollections(collectionList);
  };

  useEffect(() => {
    if (isInitialized && collections) {
      getCollections();
    }
  }, [collectionAddresses, isInitialized]);

  return (
    <>
      <table className="withscroll">
        <tbody className="mediaeyefancyScroll-box">
          {listingNFTs.map((listingNFT, i) => {
            return (
              <tr
                key={i}
                onClick={() => {
                  setActiveProduct(i);
                }}
              >
                <td className="product-page-inner-tabscard-itemsimg">
                  <div className="product-page-inner-tabscard-itemsimg-inner">
                    <img
                      src={listingNFT.attributes.nft.attributes.image}
                      alt="topBidsHome"
                    />
                  </div>
                </td>
                <td>
                  <div className="product-page-inner-tabscard-itemscollection">
                    {collections[i]?.attributes.name}
                  </div>
                  <div className="product-page-inner-tabscard-itemstitle">
                    {listingNFT.attributes.nft?.attributes?.name}
                  </div>
                </td>
                <td className="product-page-inner-tabscard-itemsupply">
                  x{listingNFT.attributes.amount}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default BundleItems;
