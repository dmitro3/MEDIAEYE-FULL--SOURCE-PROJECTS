import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Checkbox, Radiobox, SelectMark, Angle } from '../../Icons';

const MarketplaceCollectionFiltersSidebar = (props) => {
    const { filters, setMarketFilters, removeItem, setRemoveItem } = props;
    const activeNetwork = useSelector((state) => state.app.activeNetwork);
    const [tokenTypeToggle, setTokenTypeToggle] = useState(true);
    const [collectionTypeToggle, setCollectionTypeToggle] = useState(true);
    const [chainToggle, setChainToggle] = useState(true);

    const [filterList, setFilterList] = useState(
        {
            'tokenType': [
                { name: 'Single', value: "Single" },
                { name: 'Bundle', value: "Bundle" }
            ],
            'collectionType': [
                { name: 'Jumbo Mint', value: "Jumbo Mint" },
                { name: 'Generative', value: "Generative" }
            ],
            'chain': [
                { name: 'ETH', value: "ETH" },
                { name: 'BSC', value: "BSC" },
                { name: 'FTM', value: "FTM" }
            ]
        }
    );

    useEffect(() => {
        let selectedFilters = { ...filters };
        let allFilters = { ...filterList };
        if (selectedFilters?.tokenType && allFilters?.tokenType) {
            for (let i = 0; i < allFilters?.tokenType?.length; i++) {
                if (selectedFilters.tokenType.indexOf(filterList?.tokenType[i].value) !== -1) {
                    allFilters.tokenType[i].selected = true;
                }
            }
        }


        if (selectedFilters?.chain && allFilters?.chain) {
            for (let i = 0; i < allFilters?.chain?.length; i++) {
                if (selectedFilters.chain.indexOf(allFilters?.chain[i].value) !== -1) {
                    allFilters.chain[i].selected = true;
                }
            }
        }
        if (selectedFilters?.collectionType && allFilters?.collectionType) {
            for (let i = 0; i < allFilters?.collectionType?.length; i++) {
                if (selectedFilters.collectionType.indexOf(allFilters?.collectionType[i].value) !== -1) {
                    allFilters.collectionType[i].selected = true;
                }
            }
        }

        setFilterList(allFilters);
    }, []);

    useEffect(() => {
        let selectedFilters = { ...filters };
        let tokenType = [];
        if (filterList?.tokenType) {
            for (let i = 0; i < filterList?.tokenType?.length; i++) {
                if (filterList?.tokenType[i].selected) {
                    tokenType.push(filterList?.tokenType[i].value);
                }
            }
        }
        selectedFilters['tokenType'] = tokenType;
        let collectionType = [];
        if (filterList?.collectionType) {
            for (let i = 0; i < filterList?.collectionType?.length; i++) {
                if (filterList?.collectionType[i].selected) {
                    collectionType.push(filterList?.collectionType[i].value);
                }
            }
        }
        selectedFilters['collectionType'] = collectionType;
        let chain = [];
        if (filterList?.chain) {
            for (let i = 0; i < filterList?.chain?.length; i++) {
                if (filterList?.chain[i].selected) {
                    chain.push(filterList?.chain[i].value);
                }
            }
        }
        selectedFilters['chain'] = chain;
        setMarketFilters(selectedFilters);

    }, [filterList]);

    const updateFilterValue = (name, value, isMulti = false) => {
        let allFilters = { ...filterList };
        if (isMulti) {
            for (let i = 0; i < allFilters[name].length; i++) {
                if (allFilters[name][i].value === value) {
                    allFilters[name][i].selected = allFilters[name][i].selected ? false : true
                }
            }
        } else {
            for (let i = 0; i < allFilters[name].length; i++) {
                if (allFilters[name][i].value === value) {
                    allFilters[name][i].selected = true
                } else {
                    allFilters[name][i].selected = false
                }
            }
        }
        setFilterList(allFilters);
    };


    useEffect(() => {
        if (removeItem) {
            let allFilters = { ...filterList };
            if (removeItem?.all || removeItem?.reset) {
                for (let property in allFilters) {
                    for (let i = 0; i < allFilters[property].length; i++) {
                        allFilters[property][i].selected = false
                    }
                }
            } else {
                let index = allFilters[removeItem?.name].findIndex(x => x.value === removeItem?.index);
                allFilters[removeItem?.name][index].selected = false;
            }
            setFilterList(allFilters);
            setRemoveItem(null);
        }
    }, [removeItem])

    const sidebarRef = useRef();
    const [sidebarWidth, setSidebarWidth] = useState();
    useEffect(() => {
        setTimeout(function () {
            setSidebarWidth(sidebarRef?.current?.offsetWidth);
        }, 200);
    }, [sidebarRef]);

    return (
        <div className="marketplace-page-sidebar mediaeyefancyScroll marketplace-page-sidebar-collection" ref={sidebarRef} style={{ maxWidth: sidebarWidth ? sidebarWidth + 'px' : '' }}>
            <div className="marketplace-page-sidebar-inner">
                <div className="marketplace-page-sidebar-col">
                    <div className={`marketplace-page-sidebar-col-heading ${tokenTypeToggle ? 'active' : ''}`} onClick={() => setTokenTypeToggle(!tokenTypeToggle)}> Token Type <Angle side="small_down" /></div>
                    {
                        tokenTypeToggle ? (
                            filterList?.tokenType.map((list, i) => (
                                <div key={i} className={`marketplace-page-sidebar-col-row ${list?.selected ? 'active' : ''}`} onClick={(e) => { updateFilterValue('tokenType', list.value, true) }}>
                                    <div className='marketplace-page-sidebar-col-row-icon'><Checkbox type={list?.selected} /></div>
                                    <div className='marketplace-page-sidebar-col-row-name'>{list.name}</div>
                                </div>
                            ))
                        ) : null
                    }
                </div>
                {/* end tokenType col */}


                <div className="marketplace-page-sidebar-col">
                    <div className={`marketplace-page-sidebar-col-heading ${collectionTypeToggle ? 'active' : ''}`} onClick={() => setCollectionTypeToggle(!collectionTypeToggle)}>Collection Type <Angle side="small_down" /></div>
                    {
                        collectionTypeToggle ? (

                            filterList?.collectionType.map((list, i) => (
                                <div key={i} className={`marketplace-page-sidebar-col-row ${list?.selected ? 'active' : ''}`} onClick={(e) => { updateFilterValue('collectionType', list.value, true) }}>
                                    <div className='marketplace-page-sidebar-col-row-icon'><Checkbox type={list?.selected} /></div>
                                    <div className='marketplace-page-sidebar-col-row-name'>{list.name}</div>
                                </div>
                            ))
                        ) : null
                    }
                </div>
                {/* end Collection Type col */}

                <div className="marketplace-page-sidebar-col">
                    <div className={`marketplace-page-sidebar-col-heading ${chainToggle ? 'active' : ''}`} onClick={() => setChainToggle(!chainToggle)}>Chains <Angle side="small_down" /></div>
                    {
                        chainToggle ? (
                            filterList?.chain.map((list, i) => (
                                <div key={i} className={`marketplace-page-sidebar-col-row ${list?.selected ? 'active' : ''}`} onClick={(e) => { updateFilterValue('chain', list.value, true) }}>
                                    <div className='marketplace-page-sidebar-col-row-icon'><Checkbox type={list?.selected} /></div>
                                    <div className='marketplace-page-sidebar-col-row-name'>{list.name}</div>
                                </div>
                            ))) : null
                    }
                </div>
                {/* end Chains col */}
            </div>
        </div>
    );
};

export default MarketplaceCollectionFiltersSidebar;
