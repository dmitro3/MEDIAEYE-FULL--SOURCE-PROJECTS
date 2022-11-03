import React from 'react';
import MenuMarketplace from '../MenuMarketplace/MenuMarketplace';

const NftMarketplaceMenu = (props) => {
  return (
    <div className="content_marketplace_header">
      <div className="container">
        <div className="content_marketplace_header_main">
          <div className="content_marketplace_header_main_wrapper">
            <MenuMarketplace />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NftMarketplaceMenu;
