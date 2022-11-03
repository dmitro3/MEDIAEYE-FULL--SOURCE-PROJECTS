import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useMoralis } from 'react-moralis';
import { queryListingBundle } from '../blockchain/functions/Marketplace';
// import ProductBunding from '../components/ProductCard/ProductBunding/ProductBunding';
import ProductBunding from '../components/ProductCard/Product/ProductBunding';

const ProductBundlePage = (props) => {
  const { closeNftCollapse } = props;
  const history = useHistory();
  const { listingId, chain } = useParams();
  const { Moralis, isInitialized } = useMoralis();
  const [listing, setListing] = useState(null);
  // const currentListing = location?.state?.currentListing;

  const renderSwitch = () => {
    return <ProductBunding product={listing} />;
  };

  const loadListingData = async () => {
    const [listing, nfts] = await queryListingBundle(Moralis, listingId, chain);
    // if none found at address/tokenId redirect
    if (!listing) {
      history.replace('/404');
    } else {
      let imgs = [];
      let tokenIds = [];
      let collectionAddresses = [];
      let titles = [];
      let descriptions = [];
      let amounts = [];

      let newBundle = {};
      for (let j = 0; j < nfts.length; j++) {
        imgs.push(nfts[j].attributes.nft.attributes.image);
        tokenIds.push(nfts[j].attributes.nft.attributes.tokenId);
        collectionAddresses.push(
          nfts[j].attributes.nft.attributes.collectionAddress
        );
        titles.push(nfts[j].attributes.nft.attributes.name);
        descriptions.push(nfts[j].attributes.nft.attributes.description);
        amounts.push(nfts[j].attributes.amount);
      }
      newBundle = {
        chainId: nfts[0]?.attributes?.nft?.attributes?.chainId,
        amounts: amounts,
        id: listing.id,
        img: imgs,
        fullImage: imgs,
        isAuction: listing.attributes.type === 'auction' ? true : false,
        isSold: listing.attributes.status === 'sold' ? true : false,
        isBunding: listing.attributes.size === 'bunding' ? true : false,
        title: titles,
        seller: listing.attributes.seller,
        endTime: listing.attributes.endTime ? listing.attributes.endTime : 0,
        collectionAddress: collectionAddresses,
        tokenId: tokenIds,
        description: descriptions,
        listingId: listing.id
      };
      setListing(newBundle);
    }
  };

  useEffect(() => {
    if (isInitialized) {
      loadListingData();
    }
  }, [isInitialized]);

  return (
    <React.Fragment>
      <div
        onClick={closeNftCollapse}
        className="product-page mediaeye-layout-content"
      >
        {renderSwitch()}
      </div>
    </React.Fragment>
  );
};

export default ProductBundlePage;
