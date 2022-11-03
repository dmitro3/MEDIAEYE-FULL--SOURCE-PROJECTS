import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import SelectSearch from 'react-select-search';
import { useLocation } from 'react-router-dom';
import { FilterIcon, MenuIcon, Angle } from '../../Icons';


const MarketplaceCollectionFilters = (props) => {
    const location = useLocation();
    const { filters, setMarketFilters, setRemoveItem, filtersOpen, toggleFilter } = props;
    const sortBy = [
        { name: 'Total Volume', value: 'Total Volume' },
        { name: '7 day Volume', value: '7 day Volume' },
        { name: '24 hours Volume', value: '24 hours Volume' },
        { name: 'Newest', value: 'Newest' },
        { name: 'Oldest', value: 'Oldest' },
        { name: 'Unique Owners', value: 'Unique Owners' },
        { name: 'Highest Sale', value: 'Highest Sale' },
        { name: 'Floor', value: 'Floor' },
        { name: 'Total NFTs', value: 'Total NFTs' },
        { name: 'Total Trades', value: 'Total Trades' }
    ];
    const updateFilterValue = (name, value, isMulti = false) => {
        let allFilters = { ...filters };
        allFilters = { ...allFilters, [name]: value };
        setMarketFilters(allFilters);
    };

    const actionRef = useRef();
    const [actionWidth, setSidebarWidth] = useState();
    useEffect(() => {
        setTimeout(function () {
            setSidebarWidth(actionRef?.current?.offsetWidth);
        }, 200);
    }, [actionRef]);
    return (
        <div className={`marketplace-page-filters ${filtersOpen ? 'withfilter' : ''}`}>

            <div className='marketplace-page-filters-list marketplace-page-filters-list-collection marketplace-page-filters-col' size="4" ref={actionRef} style={{ maxWidth: actionWidth ? actionWidth + 'px' : '' }}>
                <div className='marketplace-page-filters-action' onClick={(e) => { toggleFilter(!filtersOpen); }}>
                    <span className='marketplace-page-filters-list-icon'> {filtersOpen ? <Angle side="small_down" /> : <FilterIcon type="list" />} </span>Filters
                    <span className='marketplace-page-filters-action-reset' onClick={(e) => { e.stopPropagation(); setRemoveItem({ reset: true }) }}>Reset</span>
                </div>
            </div>

            <div className='marketplace-page-filters-col marketplace-page-filters-search' size="4">
                <div className="mediaeye-searchbar">
                    <input placeholder="Search by collections" type="text" value={filters.search} onChange={(e) => { updateFilterValue('search', e.target.value) }} />
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

export default MarketplaceCollectionFilters;
