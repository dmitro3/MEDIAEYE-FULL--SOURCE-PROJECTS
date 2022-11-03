import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useMoralis } from 'react-moralis';
import { formatEther } from 'ethers/lib/utils';
import './Collections.scss';
import CollectionsAll from './CollectionsAll';
import FeaturedCarousel from './FeaturedCarousel';
import { roundString } from '../../blockchain/functions/Utils';
import { TokenName, ZERO_ADDRESS } from '../../blockchain/functions/Addresses';
import { ChainHexString } from '../../blockchain/functions/ChangeChain/ChainHexStrings';
import { queryAllTotalVolume } from '../../blockchain/functions/Collection';
import { components } from 'react-select';
import { default as ReactSelect } from 'react-select';

import SelectSearch from 'react-select-search';
const Collections = (props) => {
  const { hash } = useLocation();
  const activeNetwork = useSelector((state) => state.app.activeNetwork);
  const { Moralis, isInitialized } = useMoralis();
  const [collectionOpen, setCollectionOpen] = useState(false);
  const [searchInput, setSearchInput] = useState();
  const [openList, setOpenList] = useState(false);
  const [arrow, setArrow] = useState(false);
  const [getTitle, setGetTitle] = useState();
  const [totalVol, setTotalVol] = useState('0');
  const [sortType, setSortType] = useState('new');
  const [sortToken, setSortToken] = useState('');
  const [sortCollection, setSortCollection] = useState();
  const [chainFilter, setChainFilter] = useState(null);
  const [chainFilter2, setChainFilter2] = useState(null);
  const [daysFilter, setDaysFilter] = useState('24 h');
  useEffect(() => {
    setChainFilter(ChainHexString(activeNetwork));
  }, [activeNetwork]);

  const handleSearch = (prop) => {
    setSearchInput(prop);
  };

  const getTotalVol = async () => {
    const result = await queryAllTotalVolume(Moralis, activeNetwork);
    if (isNaN(result)) setTotalVol('0');
    else setTotalVol(result);
  };

  const allItems = [
    { value: 'popular', label: 'Popular' },
    { value: 'new', label: 'New' },
    { value: 'featured', label: 'Featured' }
  ];

  const updateFilterNetwork = async (selected) => {
    if (chainFilter2 === selected.value) {
      selected.value = 0;
      setChainFilter2(0);
      setChainFilter(null);
    } else {
      setChainFilter2(selected.value);
      setChainFilter(ChainHexString(selected.value));
    }
  };

  const networkList = [
    {
      label: 'ETH',
      value: 'ETH'
    },
    {
      label: 'BSC',
      value: process.env.REACT_APP_BSC_CHAIN_NAME
    },
    {
      label: 'FTM',
      value: 'FTM'
    }
  ];

  const tokenType = [
    {
      value: 'ERC 721',
      label: 'ERC 721'
    },
    {
      value: 'ERC 1155',
      label: 'ERC 1155'
    }
  ];

  const collectionType = [
    {
      value: 'Jumbo Mint',
      label: 'Jumbo Mint'
    },
    {
      value: 'Generative',
      label: 'Generative'
    }
  ];

  const dayOptions = [
    { id: 1, value: '24 h', name: '24 h' },
    { id: 2, value: '7 days', name: '7 days' },
    { id: 3, value: '30 days', name: '30 days' }
  ];

  const reactSelectStylesForSingle = {
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        alignItems: 'center',
        backgroundColor: isFocused ? 'rgba(255, 255, 255, 0.05)' : null,
        color: isSelected ? '#FF1B6D' : null
      };
    }
  };

  const handleChange = async (selected) => {
    if (sortType === selected.value) {
      selected.value = 0;
      setSortType(0);
    } else {
      setSortType(selected.value);
    }
  };

  const handleChangeToken = async (selected) => {
    if (sortToken === selected.value) {
      selected.value = '';
      setSortToken('');
    } else {
      setSortToken(selected.value);
    }
  };

  const handleChangeCollection = async (selected) => {
    if (sortCollection === selected.value) {
      selected.value = '';
      setSortCollection('');
    } else {
      setSortCollection(selected.value);
    }
  };

  const Option2 = (props) => {
    return (
      <div className="holdingDropdown">
        <components.Option {...props}>
          <input
            className="checkboxColor"
            type="checkbox"
            checked={props.isSelected}
            onChange={() => null}
          />{' '}
          <label>{props.label}</label>
        </components.Option>
      </div>
    );
  };

  useEffect(() => {
    if (isInitialized && activeNetwork) {
      getTotalVol();
    }
  }, [isInitialized, activeNetwork]);

  return (
    <>
      <Helmet>
        <meta
          property="og:url"
          content={window.location.origin + '/collections'}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="NFT Collections for Sports, Media, Gaming, Crypto, Entertainment, Charity and Art on BSC ETH FTM Chains| MEDIA EYE"
        />
        <meta
          property="og:description"
          content="MEDIA EYE offers users the widest range of NFT collections segments and verticals, don’t miss this oportunity to joint the new creatoreconomy"
        />
        <meta
          property="og:image"
          content={window.location.origin + '/img/meta_tag/collection.png'}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="mediaeyenft.com/collections" />
        <meta
          property="twitter:url"
          content={window.location.origin + '/collections'}
        />
        <meta
          name="twitter:title"
          content="NFT Collections for Sports, Media, Gaming, Crypto, Entertainment, Charity and Art on BSC ETH FTM Chains| MEDIA EYE"
        />
        <meta
          name="twitter:description"
          content="MEDIA EYE offers users the widest range of NFT collections segments and verticals, don’t miss this oportunity to joint the new creatoreconomy"
        />
        <meta
          name="twitter:image"
          content={window.location.origin + '/img/meta_tag/collection.png'}
        />
        <title>
          NFT Collections for Sports, Media, Gaming, Crypto, Entertainment,
          Charity and Art on BSC ETH FTM Chains| MEDIA EYE
        </title>
        <meta
          name="description"
          content="MEDIA EYE offers users the widest range of NFT collections segments and verticals, don’t miss this oportunity to joint the new creatoreconomy"
        />
      </Helmet>
      <div className="mediaeye-layout-middle ">
        <div className="collections-page-header-poster">
          <div className="collections-page-header-poster-inner">
            <FeaturedCarousel />
          </div>
        </div>
        <div className="mediaeye-layout-container">
          <div className="collections-page-trade-volume">
            <span className="collections-page-trade-volume-value">
              Total Volume Traded:
            </span>
            <span className="collections-page-trade-volume-points">
              {roundString(formatEther(totalVol), 4)}{' '}
              {TokenName(ZERO_ADDRESS, activeNetwork)}
            </span>

            <div className="collections-page-trade-volume-network">
              <label
                htmlFor="daysFilter"
                className="mediaeyeform-group-input-hide"
              >
                daysFilter
              </label>
              <SelectSearch
                className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style"
                options={dayOptions}
                value={daysFilter}
                onChange={(opt) => {
                  setDaysFilter(opt);
                }}
                id="daysFilter"
              />
            </div>
          </div>
          <div className="collections-page-filters">
            <div className="collections-page-filters-box">
              <div className="collections-page-filters-box-options">
                <ReactSelect
                  options={allItems}
                  closeMenuOnSelect={false}
                  hideSelectedOptions={false}
                  components={{
                    Option: Option2
                  }}
                  onChange={(selected) => handleChange(selected)}
                  allowSelectAll={true}
                  placeholder="Sort By"
                  controlShouldRenderValue={false}
                  styles={reactSelectStylesForSingle}
                />

                {/* <ReactSelect
                  options={networkList}
                  components={{
                    Option: Option2
                  }}
                  onChange={(selected) => {
                    updateFilterNetwork(selected);
                  }}
                  allowSelectAll={true}
                  //  value={chainFilterSelected}
                  placeholder="Chains"
                  controlShouldRenderValue={false}
                  styles={reactSelectStylesForSingle}
                /> */}

                <ReactSelect
                  options={tokenType}
                  components={{
                    Option: Option2
                  }}
                  onChange={(selected) => {
                    handleChangeToken(selected);
                  }}
                  allowSelectAll={true}
                  //  value={chainFilterSelected}
                  placeholder="Token Type"
                  controlShouldRenderValue={false}
                  styles={reactSelectStylesForSingle}
                />

                <ReactSelect
                  options={collectionType}
                  components={{
                    Option: Option2
                  }}
                  onChange={(selected) => {
                    handleChangeCollection(selected);
                  }}
                  allowSelectAll={true}
                  //  value={chainFilterSelected}
                  placeholder="Collection Type"
                  controlShouldRenderValue={false}
                  styles={reactSelectStylesForSingle}
                />
              </div>
              <form className="mediaeye-searchbar" id="Search_Collection">
                <input
                  placeholder="Search"
                  // value={searchInput}
                  // onChange={(e) => handleSearch(e.target.value)}
                  type="text"
                  aria-labelledby="Search_Collection"
                />
              </form>
            </div>
            <div className="airdrop_collection collections_page">
              <CollectionsAll sortType={sortType} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Collections;
