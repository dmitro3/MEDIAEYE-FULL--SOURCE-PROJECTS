import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import SelectSearch from 'react-select-search';
import { useLocation } from 'react-router-dom';
import {
    Angle,
    Close,
    Copy,
    FilterIcon,
    MenuIcon,
    Minters,
    Plus,
} from '../../Icons';
import avatar from '../../../assets/img/avatar_collection.png';
import formatAdddress from '../../../utils/formatAdddress';
import { useMoralis } from 'react-moralis';

const minters = [
    {
        id: 1,
        value: '@user111 0x732b2e3caBEd09A39d8964D985bBF253Fe187Ee5F',
        name: '@user111',
        wallet: '0x732b2e3caBEd09A39d8964D985bBF253Fe187Ee5F',
        img: avatar,
        owner: true,
        minter: false
    },
    {
        id: 2,
        value: '@user222 0x732b2e3caBEd09A39d8964D985bBF253Fe187Ee5G',
        name: '@user222',
        wallet: '0x732b2e3caBEd09A39d8964eD985bBF253Fe187E5G',
        img: avatar,
        owner: false,
        minter: true
    },
    {
        id: 3,
        value: '@user333 0x732b2e3caBEd09A39d8964D985bBF253Fe187Ee5H',
        name: '@user333',
        wallet: '0x732b2e3caBEd09A39d8964D985rBF253Fe187E5H',
        img: avatar,
        owner: false,
        minter: true
    },
    {
        id: 4,
        value: '@user444 0x732b2e3caBEd09A39d8964D985bBF253Fe187Ee5I',
        name: '@user444',
        wallet: '0x732b2e3caBEd09A3ed8964D985bBF253Fe187E5I',
        img: avatar,
        owner: false,
        minter: true
    },
    {
        id: 5,
        value: '@user555 0x732b2e3caBEd09A39d8964D985bBF253Fe187Ee5J',
        name: '@user555',
        wallet: '0x732b2e3ceEd09A39d8964D985bBF253Fe187E5J',
        img: avatar,
        owner: false,
        minter: true
    },
    {
        id: 6,
        value: '@user666 0x732b2e3caBEd09A39d8964D985bBF253Fe187Ee5K',
        name: '@user666',
        wallet: '0x732b2e3caBEd09r39d8964D985bBF253Fe187E5K',
        img: avatar,
        owner: false,
        minter: false
    },
    {
        id: 7,
        value: '@user777 0x732b2e3caBEd09A39d8964D985bBF253Fe187Ee5L',
        name: '@user777',
        wallet: '0x732b2e3caBEd09A39d8964Dr85bBF253Fe187E5L',
        img: avatar,
        owner: false,
        minter: false
    },
    {
        id: 8,
        value: '@user888 0x732b2e3caBEd09A39d8964D985bBF253Fe187Ee5M',
        name: '@user888',
        wallet: '0x732b2e3caBEd09A39d8964Dr85bBF253Fe187E5M',
        img: avatar,
        owner: false,
        minter: false
    },
    {
        id: 9,
        value: '@user999 0x732b2e3caBEd09A39d8964D985bBF253Fe187Ee5N',
        name: '@user999',
        wallet: '0x732b2e3caBEd09A39d8964Dr85bBF253Fe187E5N',
        img: avatar,
        owner: false,
        minter: false
    },
    {
        id: 10,
        value: '@user101 0x732b2e3caBEd09A39d8964D985bBF253Fe187Ee5O',
        name: '@user101',
        wallet: '0x732b2e3caBEd09A39d8964Dr85bBF253Fe187E5O',
        img: avatar,
        owner: false,
        minter: false
    }
];

const MarketplaceNftsFilters = (props) => {
    const location = useLocation();
    const { filters, setMarketFilters, setRemoveItem, from, filtersOpen, toggleFilter } = props;
    const [collectionType, setCollectionType] = useState(from);
    const [openMinters, setOpenMinters] = useState(false);
    const [valueSelect, setValueSelect] = useState(false);
    const [showCopyIconOwner, setShowCopyIconOwner] = useState('');
    const [showCopyText, setShowCopyText] = useState('');
    const [minterSearchValue, setMinterSearchValue] = useState();
    const [addMinterOnClick, setAddMinterOnClick] = useState(true);
    const [addingMinters, setAddingMinters] = useState([]);
    const [showMediaeyeActionsSocial, setShowMediaeyeActionsSocial] =
        useState('');
    const { isInitialized, user, Moralis, web3, isWeb3Enabled } = useMoralis();
    const [collection, setCollection] = useState({});

    const sortBy = [
        { name: 'Recently listed', value: 'Recently listed' },
        { name: 'Recently created', value: 'Recently created' },
        { name: 'Recently sold', value: 'Recently sold' },
        { name: 'Sort received', value: 'Sort received' },
        { name: 'Ending soon', value: 'Ending soon' },
        { name: 'Price low to high', value: 'Price low to high' },
        { name: 'Price high to low', value: 'Price high to low' },
        { name: 'Highest last sale', value: 'Highest last sale' },
        { name: 'Oldest', value: 'Oldest' }
    ];
    const trendings = [
        { name: 'Recently listed', value: 'Recently listed' },
        { name: 'Recently created', value: 'Recently created' },
        { name: 'Most rare', value: 'Most rare' },
        { name: 'Recently sold', value: 'Recently sold' },
        { name: 'Sort received', value: 'Sort received' },
        { name: 'Ending soon', value: 'Ending soon' },
        { name: 'Price low to high', value: 'Price low to high' },
        { name: 'Price high to low', value: 'Price high to low' },
        { name: 'Highest last sale', value: 'Highest last sale' },
        { name: 'Most viewed', value: 'Most viewed' },
        { name: 'Most favorites', value: 'Most favorites' },
        { name: 'Oldest', value: 'Oldest' }
    ];

    const actionRef = useRef();
    const [actionWidth, setSidebarWidth] = useState();
    useEffect(() => {
        setTimeout(function () {
            setSidebarWidth(actionRef?.current?.offsetWidth);
        }, 200);
    }, [actionRef]);

    const updateFilterValue = (name, value) => {
        let allFilters = { ...filters };
        allFilters = { ...allFilters, [name]: value };
        setMarketFilters(allFilters);
    };

    const handleDropdown = () => {
        setValueSelect(true);
    };
    const handleSearchInput = (e) => {
        setAddMinterOnClick(true);
        if (e.target.value.length > 6) {
            setMinterSearchValue(formatAdddress(e.target.value));
        } else {
            setMinterSearchValue(e.target.value);
        }
    };
    const removeMinters = (index) => {
        minters.splice(index, 1);
    };
    const handleAddMinters = (wallet) => {
        setAddMinterOnClick(false);
        setMinterSearchValue('');
        let demo;
        minters.map((result) => {
            if (result.wallet === wallet) {
                demo = [...addingMinters, { value: result.wallet }];
                setAddingMinters(demo);
            }
        });
    };
    const CollectionUserLevelFeatures = () => {
        return (
            <div className="minters-dropdown-inner">
                <div className="minters-dropdown-inner-searchbar">
                    <input
                        placeholder="@user_name or wallet address"
                        type="text"
                        onFocus={handleDropdown}
                        onChange={handleSearchInput}
                        value={minterSearchValue}
                    />
                </div>
                {valueSelect ? (
                    <div className="mediaeyefancyScroll">
                        <div className="minters-dropdown-inner-dropdown">
                            {user?.attributes?.ethAddress ===
                                collection?.attributes?.owner ? (
                                <div className="minters-dropdown-inner-dropdown-section">
                                    <div className="minters-dropdown-inner-dropdown-section-title">
                                        Add Minter
                                    </div>
                                    {minters
                                        .filter(
                                            (x) =>
                                                x.minter === false &&
                                                x.owner === false &&
                                                formatAdddress(x.wallet) === minterSearchValue
                                        )
                                        .map((item, i) => {
                                            return (
                                                <>
                                                    {addMinterOnClick ? (
                                                        <div
                                                            className="minters-dropdown-inner-dropdown-section-item"
                                                            onMouseOver={() =>
                                                                setShowCopyIconOwner(item.name)
                                                            }
                                                            key={i}
                                                        >
                                                            <div className="minters-dropdown-inner-dropdown-section-item-left">
                                                                <img
                                                                    src="/img/user/mediaeye-user-144.png"
                                                                    alt="mediaeye-user"
                                                                />
                                                                <span className="text-grayShade">
                                                                    {item.name}
                                                                </span>
                                                            </div>
                                                            <div className="minters-dropdown-inner-dropdown-section-item-right">
                                                                <span>{formatAdddress(item.wallet)}</span>
                                                                {showCopyIconOwner === item.name ? (
                                                                    <div
                                                                        onClick={() => {
                                                                            navigator.clipboard.writeText(
                                                                                item.wallet
                                                                            );
                                                                            setShowCopyText(true);
                                                                        }}
                                                                    >
                                                                        <Copy />{' '}
                                                                    </div>
                                                                ) : null}
                                                                {showCopyText && showCopyIconOwner === item.name
                                                                    ? 'copied'
                                                                    : null}
                                                                {showCopyIconOwner === item.name ? (
                                                                    <div
                                                                        onClick={() =>
                                                                            handleAddMinters(item.wallet)
                                                                        }
                                                                    >
                                                                        <Plus />
                                                                    </div>
                                                                ) : null}
                                                            </div>
                                                        </div>
                                                    ) : null}
                                                </>
                                            );
                                        })}
                                    {minters.filter(
                                        (x) =>
                                            x.minter === false &&
                                            x.owner === false &&
                                            formatAdddress(x.wallet) === minterSearchValue
                                    ).length < 1 || !addMinterOnClick ? (
                                        <div className="text-grayShade text-center minters-dropdown-inner-dropdown-section-title">
                                            No Resutls
                                        </div>
                                    ) : null}
                                </div>
                            ) : null}
                            <div className="minters-dropdown-inner-dropdown-section">
                                <div className="minters-dropdown-inner-dropdown-section-title">
                                    Owner
                                </div>
                                {minters
                                    .filter((x) => x.owner == true)
                                    .map((item, i) => {
                                        return (
                                            <div
                                                className="minters-dropdown-inner-dropdown-section-item"
                                                onMouseOver={() => setShowCopyIconOwner(item.name)}
                                                key={i}
                                            >
                                                <div className="minters-dropdown-inner-dropdown-section-item-left">
                                                    <img
                                                        src="/img/user/mediaeye-user-144.png"
                                                        alt="mediaeye-user"
                                                    />
                                                    <span className="text-grayShade">{item.name}</span>
                                                </div>
                                                <div className="minters-dropdown-inner-dropdown-section-item-right">
                                                    <span>{formatAdddress(item.wallet)}</span>
                                                    {showCopyIconOwner === item.name ? (
                                                        <div
                                                            onClick={() => {
                                                                navigator.clipboard.writeText(item.wallet);
                                                                setShowCopyText(true);
                                                            }}
                                                        >
                                                            <Copy />
                                                        </div>
                                                    ) : null}
                                                    {showCopyText && showCopyIconOwner === item.name
                                                        ? 'copied'
                                                        : null}
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                            <div className="minters-dropdown-inner-dropdown-section">
                                <div className="minters-dropdown-inner-dropdown-section-title">
                                    Minter
                                </div>
                                {minters
                                    .filter((x) => x.minter == true)
                                    .map((item, i) => {
                                        return (
                                            <div
                                                className="minters-dropdown-inner-dropdown-section-item"
                                                onMouseOver={() => setShowCopyIconOwner(item.name)}
                                                key={i}
                                            >
                                                <div className="minters-dropdown-inner-dropdown-section-item-left">
                                                    <img
                                                        src="/img/user/mediaeye-user-144.png"
                                                        alt="mediaeye-user"
                                                    />
                                                    <span className="text-grayShade">{item.name}</span>
                                                </div>
                                                <div className="minters-dropdown-inner-dropdown-section-item-right">
                                                    <span>{formatAdddress(item.wallet)}</span>
                                                    {showCopyIconOwner === item.name ? (
                                                        <div
                                                            onClick={() => {
                                                                navigator.clipboard.writeText(item.wallet);
                                                                setShowCopyText(true);
                                                            }}
                                                        >
                                                            <Copy />
                                                        </div>
                                                    ) : null}
                                                    {showCopyText && showCopyIconOwner === item.name
                                                        ? 'copied'
                                                        : null}
                                                    {showCopyIconOwner === item.name &&
                                                        user?.attributes?.ethAddress ===
                                                        collection?.attributes?.owner ? (
                                                        <div onClick={() => removeMinters(i)}>
                                                            {' '}
                                                            <Close />
                                                        </div>
                                                    ) : null}
                                                </div>
                                            </div>
                                        );
                                    })}
                                <div></div>
                            </div>
                            <div className="minters-dropdown-inner-dropdown-section">
                                {minters.map((result, i) => {
                                    return addingMinters.map((e) => {
                                        if (result.wallet === e.value) {
                                            return (
                                                <div
                                                    className="minters-dropdown-inner-dropdown-section-item"
                                                    onMouseOver={() => setShowCopyIconOwner(result.name)}
                                                    key={i}
                                                >
                                                    <div className="minters-dropdown-inner-dropdown-section-item-left">
                                                        <img
                                                            src="/img/user/mediaeye-user-144.png"
                                                            alt="mediaeye-user"
                                                        />
                                                        <span className="text-grayShade">
                                                            {result.name}
                                                        </span>
                                                    </div>
                                                    <div className="minters-dropdown-inner-dropdown-section-item-right">
                                                        <span>{formatAdddress(result.wallet)}</span>
                                                        {showCopyIconOwner === result.name ? (
                                                            <div
                                                                onClick={() => {
                                                                    navigator.clipboard.writeText(result.wallet);
                                                                    setShowCopyText(true);
                                                                }}
                                                            >
                                                                <Copy />
                                                            </div>
                                                        ) : null}
                                                        {showCopyText && showCopyIconOwner === result.name
                                                            ? 'copied'
                                                            : null}
                                                        {showCopyIconOwner === result.name &&
                                                            user?.attributes?.ethAddress ===
                                                            collection?.attributes?.owner ? (
                                                            <div onClick={() => removeMinters(i)}>
                                                                {' '}
                                                                <Close />
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </div>
                                            );
                                        }
                                    });
                                })}
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        );
    };

    return (
        <div
            className={`marketplace-page-filters ${filtersOpen ? 'withfilter' : ''
                }`}
        >
            <div className="marketplace-page-filters-list marketplace-page-filters-col" ref={actionRef} style={{ maxWidth: actionWidth ? actionWidth + 'px' : '' }}>
                <div
                    className="marketplace-page-filters-action"
                    onClick={(e) => {
                        toggleFilter(!filtersOpen);
                    }}
                >
                    <span className='marketplace-page-filters-list-icon'> {filtersOpen ? <Angle side="small_down" /> : <FilterIcon type="list" />} </span>Filters
                    <span
                        className="marketplace-page-filters-action-reset"
                        onClick={(e) => {
                            e.stopPropagation();
                            setRemoveItem({ reset: true });
                        }}
                    >
                        Reset
                    </span>
                </div>
            </div>
            {from === 'collectionItem' && collectionType !== 'jumbo' ? (
                <div className="marketplace-page-filters-minters">
                    <div
                        className="marketplace-page-filters-minters-section"
                        onClick={() => setOpenMinters(!openMinters)}
                    >
                        <div className="marketplace-page-filters-minters-section-block">
                            <Minters />
                            <span>Minters</span>
                        </div>
                        <div>
                            <Angle side={'down'} />
                        </div>
                    </div>
                    {openMinters ? (
                        <div className="minters-dropdown">
                            {CollectionUserLevelFeatures()}
                        </div>
                    ) : null}
                </div>
            ) : null}
            <div className="marketplace-page-filters-col marketplace-page-filters-search">
                <div className="mediaeye-searchbar">
                    <input
                        placeholder="Search by NFTs"
                        type="text"
                        value={filters?.search}
                        onChange={(e) => {
                            updateFilterValue('search', e.target.value);
                        }}
                    />
                </div>
            </div>

            <div className="marketplace-page-filters-sort marketplace-page-filters-col">
                {from === 'collectionItem' ? (
                    <SelectSearch
                        className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style  mediaeye-selectsearch-medium"
                        options={trendings}
                        value={filters?.trendings}
                        onChange={(opt) => updateFilterValue('trendings', opt)}
                        placeholder="Trendings"
                    />
                ) : (
                    <SelectSearch
                        className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style  mediaeye-selectsearch-medium"
                        options={sortBy}
                        value={filters?.sortBy}
                        onChange={(opt) => updateFilterValue('sortBy', opt)}
                        placeholder="Sort by"
                    />
                )}
            </div>
            <div className="marketplace-page-filters-col">
                <div className="marketplace-page-filters-action">
                    <MenuIcon type="small" />
                </div>
            </div>
            <div className="marketplace-page-filters-col">
                <div className="marketplace-page-filters-action">
                    <MenuIcon />
                </div>
            </div>
        </div>
    );
};

export default MarketplaceNftsFilters;
