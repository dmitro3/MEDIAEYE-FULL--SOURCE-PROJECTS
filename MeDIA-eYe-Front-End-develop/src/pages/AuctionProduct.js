import React from 'react';
import ProductMain from '../components/ProductCard/Product/Product';

const AuctionProduct = (props) => {
  const { closeNftCollapse } = props;

  return (
    <React.Fragment>
      <div onClick={closeNftCollapse}>
        <ProductMain />
      </div>
    </React.Fragment>
  );
};

export default AuctionProduct;
