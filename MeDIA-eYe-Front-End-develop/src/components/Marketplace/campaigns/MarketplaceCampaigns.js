import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import MarketplaceCampaignsFilters from './MarketplaceCampaignsFilters';


const MarketplaceCampaigns = () => {
    const activeNetwork = useSelector((state) => state.app.activeNetwork);
    const [filters, setMarketFilters] = useState([]);


    return (
        <>
            <MarketplaceCampaignsFilters setMarketFilters={setMarketFilters} />

            <div className='marketplace-page-commingsoon'>
                <img src="/img/marketplace/campaign-comming-soon.png" className='marketplace-page-commingsoon-img' />
            </div>
        </>
    );
};

export default MarketplaceCampaigns;
