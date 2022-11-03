import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import MarketplaceSpotlightFilters from './MarketplaceSpotlightFilters';
import MarketplaceSpotlightNFT from './MarketplaceSpotlightNFT';
import MarketplaceSpotlightCollection from './MarketplaceSpotlightCollection';

const MarketplaceSpotlight = () => {
    const activeNetwork = useSelector((state) => state.app.activeNetwork);
    const [filters, setMarketFilters] = useState([]);

    return (
        <>
            <MarketplaceSpotlightFilters setMarketFilters={setMarketFilters} />
            <section className='mediaeye-layout-section'>
                <div className='mediaeye-layout-section-header'><h2 class="mediaeye-layout-section-header-heading">NFTs</h2></div>
                <MarketplaceSpotlightNFT />
            </section>
            <section className='mediaeye-layout-section withspace'>
                <div className='mediaeye-layout-section-header'><h2 class="mediaeye-layout-section-header-heading">Collections</h2></div>
                <MarketplaceSpotlightCollection />
            </section>
        </>
    );
};

export default MarketplaceSpotlight;
