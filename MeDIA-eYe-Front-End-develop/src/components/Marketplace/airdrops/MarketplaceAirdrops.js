import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import MarketplaceAirdropssFilters from './MarketplaceAirdropssFilters';


const MarketplaceAirdrops = () => {
    const activeNetwork = useSelector((state) => state.app.activeNetwork);
    const [filters, setMarketFilters] = useState([]);


    return (
        <>
            <MarketplaceAirdropssFilters setMarketFilters={setMarketFilters} />

            <div className='marketplace-page-commingsoon'>
                <img src="/img/marketplace/airdrop-comming-soon.png" className='marketplace-page-commingsoon-img' />
            </div>
        </>
    );
};

export default MarketplaceAirdrops;
