import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PutListOnEvent from '../components/PutOn/PutListOnEvent';
import { useMoralis } from 'react-moralis';
import { useHistory } from 'react-router-dom';
import { queryNFT } from '../blockchain/functions/Account';

const ProductListOnEventPage = (props) => {
  const { closeNftCollapse } = props;
  const location = useLocation();
  const history = useHistory();
  const products = location?.state?.activeImages;
  const [nft, setNFT] = useState(null);
  const { isUnauthenticated, isAuthenticating, isInitialized, Moralis } =
    useMoralis();
  const totalOwnedArr = products.map((product) => {
    return product.totalOwned;
  });

  useEffect(() => {
    if (isInitialized && products) {
      getNFT(0);
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

  return (
    <React.Fragment>
      <div
        onClick={closeNftCollapse}
        className="marketplace-create-page mediaeye-layout-content bottomnospace"
      >
        {isUnauthenticated && !isAuthenticating && isInitialized ? (
          history.replace('/connect-wallet')
        ) : products?.metadata != null ? (
          // redirect if no product selected or page was refreshed or product has null metadata
          history.goBack()
        ) : nft ? (
          <PutListOnEvent product={nft} totalOwned={totalOwnedArr} />
        ) : (
          <div />
        )}
      </div>
    </React.Fragment>
  );
};

export default ProductListOnEventPage;
