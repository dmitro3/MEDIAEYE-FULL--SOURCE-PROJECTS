import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import SelectSearch from 'react-select-search';
import { useLocation } from 'react-router-dom';
import { FilterIcon, MenuIcon } from '../../Icons';


const MarketplaceCampaignsFilters = (props) => {
    const location = useLocation();
    const { setMarketFilters } = props;
    const [filters, setFilters] = useState({
        allItems: '',
        search: '',
        sortBy: ''
    });

    const sortBy = [];
    const updateFilterValue = (name, value, isMulti = false) => {
        let allFilters = { ...filters };
        allFilters = { ...allFilters, [name]: value };
        setFilters(allFilters);
    };
    useEffect(() => {
        setMarketFilters(filters);
    }, [filters]);
    return (

        <div className='marketplace-page-filters'>
            <div className='marketplace-page-filters-col marketplace-page-filters-search' size="3">
                <div className="mediaeye-searchbar">
                    <input placeholder="Search by campaings" type="text" value={filters.search} onChange={(e) => { updateFilterValue('search', e.target.value) }} />
                </div>
            </div>

            <div className='marketplace-page-filters-sort marketplace-page-filters-col'>
                <SelectSearch className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style  mediaeye-selectsearch-medium" options={sortBy} value={filters.sortBy} onChange={(opt) => updateFilterValue('sortBy', opt)} placeholder="Sort by" />
            </div>
            <div className='marketplace-page-filters-col'>
                <div className='marketplace-page-filters-action'><MenuIcon type="small" /></div>
            </div>
            <div className='marketplace-page-filters-col'>
                <div className='marketplace-page-filters-action'><MenuIcon /></div>
            </div>
        </div>
    );
};

export default MarketplaceCampaignsFilters;
