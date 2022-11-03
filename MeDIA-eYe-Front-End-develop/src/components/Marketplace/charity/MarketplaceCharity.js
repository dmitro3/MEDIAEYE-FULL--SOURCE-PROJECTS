import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import MarketplaceCharityFilters from './MarketplaceCharityFilters';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import {
    givingBlockOrganizationlist
} from '../../../blockchain/functions/Charity/charitycollection';
import CharityCard from '../../Charity/CharityCard/CharityCard';
import ItemLoader from '../../Common/ItemLoader';

const MarketplaceCharity = () => {
    const activeNetwork = useSelector((state) => state.app.activeNetwork);
    const [filters, setMarketFilters] = useState([]);
    const [charityData, setcharityData] = useState([]);
    const [hasMore, sethasMore] = useState(true);
    const [pageNumber, setpageNumber] = useState(1);

    const fetchData = async () => {
        const givingBlockOrganizationres = await givingBlockOrganizationlist(pageNumber);
        if (givingBlockOrganizationres && givingBlockOrganizationres.length > 0) {
            const a = [...charityData];
            const addgivingkeyarr = a.concat(givingBlockOrganizationres);
            setpageNumber(pageNumber + 1);
            setcharityData(addgivingkeyarr);
        } else {
            sethasMore(false);
        }
    };
    useEffect(() => {
        setpageNumber(1);
        setcharityData([]);
        fetchData();
    }, [activeNetwork]);

    return (
        <>
            <Link to="/charity/register" className='btn btn-charity marketplace-page-registerbtn btn-square'>Registration</Link>
            <MarketplaceCharityFilters setMarketFilters={setMarketFilters} />
            <InfiniteScroll
                dataLength={charityData.length}
                next={fetchData}
                hasMore={hasMore}
                loader={<ItemLoader />}
                className="marketplace-page-wrapper-content-inner"
            >
                <div className="mediaeye-charity-row" size="4">
                    {charityData.map((charity, i) => (
                        <CharityCard charity={charity} key={i} />
                    ))
                    }
                </div>
            </InfiniteScroll>
        </>
    );
};

export default MarketplaceCharity;
