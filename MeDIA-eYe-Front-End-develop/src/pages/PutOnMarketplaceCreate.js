import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PutOnMarketplaceCreateMainSingle from '../components/PutOn/PutOnMarketplaceCreateSingle';
import PutOnMarketplaceCreateMainBunding from '../components/PutOn/PutOnMarketplaceCreateBunding';
import { useMoralis } from 'react-moralis';
import { useHistory } from 'react-router-dom';
import { queryNFT } from '../blockchain/functions/Account';

const PutOnMarketplaceCreate = (props) => {
  const { closeNftCollapse } = props;
  const location = useLocation();
  const history = useHistory();
  const products = location?.state?.activeImages;
  const [nft, setNFT] = useState(null);
  const [bundle, setBundle] = useState(null);
  const { isUnauthenticated, isAuthenticating, isInitialized, Moralis } =
    useMoralis();
  const totalOwnedArr = products?.map((product) => {
    return product.totalOwned;
  });

  useEffect(() => {
    if (isInitialized && products) {
      if (products.length > 1) {
        getBundle();
      } else {
        getNFT(0);
      }
    }
  }, [products, isInitialized]);

  const getNFT = async (i) => {
    const res = await queryNFT(Moralis, {
      colAddress: products[i].token_address,
      tokenId: products[i].token_id
    });
    // if first in list of products set nft to result
    if (i === 0) setNFT(res);
    return res;
  };

  const getBundle = async () => {
    let newBundle = [];
    let promises = [];
    for (let i = 0; i < products.length; i++) {
      promises.push(await getNFT(i));
    }
    newBundle = await Promise.all(promises);
    setBundle(newBundle);
  };

  return (
    <React.Fragment>
      <div
        onClick={closeNftCollapse}
        className="marketplace-create-page mediaeye-layout-content bottomnospace"
      >
        {isUnauthenticated && !isAuthenticating && isInitialized ? (
          history.replace('/connect-wallet')
        ) : products?.metadata != null || !products ? (
          // redirect if no product selected or page was refreshed or product has null metadata
          history.replace('/submit-to-marketplace')
        ) : products?.length === 1 ? (
          nft ? (
            <PutOnMarketplaceCreateMainSingle
              product={nft}
              totalOwned={totalOwnedArr}
            />
          ) : (
            <div />
          )
        ) : bundle ? (
          <PutOnMarketplaceCreateMainBunding
            products={bundle}
            totalOwned={totalOwnedArr}
          />
        ) : (
          <div />
        )}
      </div>
    </React.Fragment>
  );
};

export default PutOnMarketplaceCreate;
