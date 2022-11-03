import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import SelectSearch from 'react-select-search';
import { components } from 'react-select';
import { default as ReactSelect } from 'react-select';
import { color, style } from '@mui/system';
import {
  Angle,
  CheckDropdown,
  Circle,
  CircleActive,
  Close,
  Down,
  FilterIcon,
  Transfer
} from '../../Icons';
import FilterDisplay from '../../ContentMarketplace/MenuMarketplace/components/FilterDisplay';
import { TypePredicateKind } from 'typescript';
import FilterProperty from '../../ContentMarketplace/FilterProperty/FilterProperty';
import { tryExecute } from 'rubic-sdk';

const initFilters = {
  allItems: '',

  collections: [],
  properties: [],
  category: [],
  file: [],
  chains: [],
  sortBy: ''
};

const initFilterOptions = {
  collections: [
    {
      custom: true,
      heading: 'Top 20',
      checked: true
    },
    {
      custom: true,
      value: 'CrazyApes..',
      text: 'Crazy Apes So..',
      checked: true
    },
    {
      value: 'Mutant Apes So',
      text: 'Mutant Apes So..',
      custom: true,
      checked: false
    },
    { value: 'okayBears', text: 'Okay Bears', custom: true, checked: false },
    {
      value: 'BEANZOfficial',
      text: 'BEANZ Official',
      custom: true,
      checked: false
    },
    { value: 'Doodles', text: 'Doodles', custom: true, checked: false }
  ],
  properties: [
    {
      title: 'Hair',
      list: [
        { value: 'black' },
        { value: 'Brown' },
        { value: 'Green' },
        { value: 'Red' }
      ]
    },
    {
      title: 'Hamper',
      list: [
        { value: 'black' },
        { value: 'Brown' },
        { value: 'Green' },
        { value: 'Red' }
      ]
    },
    {
      title: 'Haina',
      list: [
        { value: 'black' },
        { value: 'Brown' },
        { value: 'Green' },
        { value: 'Red' }
      ]
    },
    {
      title: 'Category',
      list: [
        { value: 'Chaos' },
        { value: 'Mineral' },
        { value: 'Gold' },
        { value: 'Silver' }
      ]
    },
    {
      title: 'Rarity',
      list: [{ value: 'Rare' }, { value: 'Special' }, { value: 'Super Rare' }]
    }
  ],
  cateogry: [
    { value: 'Art', label: 'Art' },
    { value: 'Crypto', label: 'Crypto' },
    { value: 'Gaming', label: 'Gaming' },
    { value: 'Business', label: 'Business' },
    { value: 'Media', label: 'Media' },
    { value: 'Sports', label: 'Sports' },
    { value: 'Charity', label: 'Charity' }
  ],
  file: [
    { value: 'Image', label: 'Image' },
    { value: 'Audio', label: 'Audio' },
    { value: 'Video', label: 'Video' },
    { value: '3D', label: '3D' }
  ],
  chains: [
    { value: 'ETH', label: 'ETH' },
    { value: process.env.REACT_APP_BSC_CHAIN_NAME, label: 'BSC' },
    { value: 'FTM', label: 'FTM' }
  ]
};

const CampaignGalleryMenu = (props) => {
  const [showMobileCategories, setShowMobileCategories] = useState(false);
  const [filters, setFilters] = useState(initFilters);
  const [filterOptions, setFilterOptions] = useState(initFilterOptions);
  const { setMarketFilters } = props;
  const [startingValue, setStartingValue] = useState();
  const [saleType, setSaleType] = useState([
    { value: 'Fixed Price', label: 'Fixed Price' }
  ]);
  var gettingTitle = '';
  const [collections, setCollections] = useState([]);
  const [category, setCategory] = useState([]);
  const [fileType, setFileType] = useState([]);
  const [chains, setChains] = useState([]);
  const [sortByValue, setSortByValue] = useState('Sort By');
  const [apply, setApply] = useState(false);
  const [openList, setOpenList] = useState(false);
  const [propertyDropdown, setPropertyDropdown] = useState(false);
  const [propertyFilters, setPropertyFilters] = useState([]);
  const [searchInput, setSearchInput] = useState();
  const [arrow, setArrow] = useState(false);
  const [getTitle, setGetTitle] = useState();
  const [filterType, setFilterType] = useState();
  const [selectedValue, setSelectedValue] = useState('All Items');

  const updateFilterValue = (name, value, isMulti = false) => {
    setPropertyDropdown(false);
    let allFilters = { ...filters };
    if (!isMulti) {
      allFilters = { ...allFilters, [name]: value?.value };
    } else {
      let filter = allFilters[name];
      filter = value.flatMap((i) => [{ ...i, isSelected: true }]);
      allFilters[name] = filter;
    }
    setFilters(allFilters);
    setMarketFilters(allFilters);
  };
  const reactSelectStyles = {
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        alignItems: 'center',
        backgroundColor: isFocused ? 'rgba(255, 255, 255, 0.05)' : null,
        checkbox: isSelected ? 'green' : null
      };
    }
  };
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

  const propertiesValues = [
    {
      title: 'Hair',
      list: [
        { value: 'black' },
        { value: 'Brown' },
        { value: 'Green' },
        { value: 'Red' }
      ]
    },
    {
      title: 'Hamper',
      list: [{ value: 'black' }, { value: 'Brown' }]
    },
    {
      title: 'Haina',
      list: [{ value: 'Green' }, { value: 'Red' }]
    },
    {
      title: 'Category',
      list: [
        { value: 'Chaos' },
        { value: 'Mineral' },
        { value: 'Gold' },
        { value: 'Silver' }
      ]
    },
    {
      title: 'Rarity',
      list: [{ value: 'Rare' }, { value: 'Special' }, { value: 'Super Rare' }]
    }
  ];

  const removeSaleType = (index) => {
    setPropertyDropdown(false);
    let array = saleType;
    if (index > -1) {
      array.splice(index, 1);
    }
    setSaleType(array);
    selectedFilterItems();
  };
  const allItems = [
    { name: 'Collection', value: 'Collection' },
    { name: 'Single', value: 'Single' },
    { name: 'Bundle', value: 'Bundle' }
  ];

  const sortBy = [
    { name: 'Price High to Low', value: 'Price High to Low' },
    { name: 'Price Low to High', value: 'Price Low to High' },
    { name: 'New', value: 'New' },
    { name: 'Popular', value: 'Popular' },
    { name: 'Sold', value: 'Sold' },
    { name: 'Featured', value: 'Featured' }
  ];

  const selectedFilterItems = () => {
    return saleType.map((item, index) => (
      <div className="menu-campaignGallery-cards-inner" key={index}>
        <span>
          Sale type: <b>{item.value}</b>
          <span onClick={() => removeSaleType(index)}>
            <Close />
          </span>
        </span>
      </div>
    ));
  };

  const CollectionOption = (props) => {
    const { data, innerRef, innerProps } = props;
    const checked = filters.collections.find((x) => x.value === data.value)
      ? true
      : false;
    return (
      <>
        {data.heading ? (
          <>
            <div
              style={{ marginLeft: 8, marginRight: 8 }}
              className="mediaeye-searchbar"
            >
              <input placeholder="Filter" type="text" />
            </div>
            <span
              style={{
                marginLeft: 8
              }}
            >
              {data.heading}
            </span>
          </>
        ) : (
          <div
            className="holdingDropdown mediaeyefancyScroll"
            ref={innerRef}
            {...innerProps}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginTop: '10px'
              }}
            >
              <img
                src={
                  checked
                    ? '/img/user/collectionCheck.png'
                    : '/img/user/mediaeye-user-72.png'
                }
                alt="collection-user-ic"
                style={{ marginLeft: 8, marginRight: 8, width: '24px' }}
              />
              <span
                style={{
                  marginLeft: 8,
                  marginRight: 8,
                  color: '#ffffff',
                  whiteSpace: 'nowrap'
                }}
              >
                {data.text}
              </span>
            </div>
          </div>
        )}
      </>
    );
  };

  const Option = (props) => {
    const { data, filterName } = props;
    const isSelected = filters[filterName].find((f) => data.value === f.value)
      ? true
      : false;
    return (
      <div className="holdingDropdown">
        <components.Option {...props}>
          <input
            className="checkboxColor"
            type="checkbox"
            checked={isSelected}
            onChange={() => null}
          />{' '}
          <label>{props.label}</label>
        </components.Option>
      </div>
    );
  };

  const Option2 = (props) => {
    return (
      <div>
        <components.Option {...props}>
          <input className="normalDropdown" type="text" onChange={() => null} />{' '}
          <label>{props.label}</label>
        </components.Option>
      </div>
    );
  };

  const handleDropdownFilters = (props) => {
    let index = propertyFilters.indexOf(props);
    if (index > -1) {
      propertyFilters.splice(index, 1);
    } else {
      propertyFilters.push(props);
    }
  };

  const handlePropertyFilter = () => {
    setSearchInput('');
    setPropertyFilters([]);
  };

  const handleProperties = (event) => {
    setPropertyDropdown(!propertyDropdown);
  };
  const handleSearch = (prop) => {
    setSearchInput(prop);
    let yourdata = propertiesValues.filter(
      (item) => item.title === searchInput
    );
  };
  const handleApply = () => {
    setApply(!apply);
    handleProperties();
    setSearchInput('');
  };
  const handleOpenListDropdown = (index) => {
    //    gettingTitle = props;
    setOpenList(index === openList ? '' : index);
    setArrow(!arrow);
  };

  const history = useHistory();
  const removeFilter = (filterName, item, isMulti) => {
    setPropertyDropdown(false);
    let allFilters = { ...filters };
    let filter = allFilters[filterName];
    if (isMulti) {
      filter.splice(
        filter.findIndex((x) => x.value === item.value),
        1
      );
    } else {
      filter = '';
      allFilters[filterName] = filter;
    }
    setFilters(allFilters);
    setMarketFilters(allFilters);
  };
  return (
    <div
      className="mediaeye-layout-container menu"
      onClick={() => setPropertyDropdown(false)}
    >
      <div className="menu-campaignGallery">
        <div className="menu-campaignGallery-filters">
          <div className="menu-campaignGallery-filters-single">
            <SelectSearch
              className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style"
              size="lg"
              options={allItems}
              value={selectedValue}
              placeholder="All Items"
              onChange={(opt) => setSelectedValue(opt)}
            />
          </div>
          <ReactSelect
            className="collections_dropdown colletion-big menu-campaignGallery-filters-single"
            options={filterOptions.collections}
            isMulti
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            components={{
              Option: CollectionOption
            }}
            onChange={(selected) =>
              updateFilterValue('collections', selected, true)
            }
            allowSelectAll={true}
            value={filters.collections}
            placeholder="Collections"
            controlShouldRenderValue={false}
            styles={reactSelectStyles}
          />
          <ReactSelect
            filterType="category"
            className="category_dropdown menu-campaignGallery-filters-single"
            options={filterOptions.cateogry}
            isMulti
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            components={{
              Option: (props) => <Option {...props} filterName={'category'} />
            }}
            onChange={(selected) =>
              updateFilterValue('category', selected, true)
            }
            allowSelectAll={true}
            value={filters.cateogry}
            placeholder="Category"
            controlShouldRenderValue={false}
            styles={reactSelectStyles}
          />
          <ReactSelect
            filterType="fileType"
            className="menu-campaignGallery-filters-single"
            options={filterOptions.file}
            isMulti
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            components={{
              Option: (props) => <Option {...props} filterName={'file'} />
            }}
            onChange={(selected) => updateFilterValue('file', selected, true)}
            allowSelectAll={true}
            value={filters.file}
            placeholder="File type"
            controlShouldRenderValue={false}
            styles={reactSelectStyles}
          />
          <ReactSelect
            filterType="chains"
            className="menu-campaignGallery-filters-single"
            options={filterOptions.chains}
            isMulti
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            components={{
              Option: (props) => <Option {...props} filterName={'chains'} />
            }}
            onChange={(selected) => updateFilterValue('chains', selected, true)}
            allowSelectAll={true}
            value={filters.chains}
            placeholder="Chains"
            controlShouldRenderValue={false}
            styles={reactSelectStyles}
          />
        </div>
        <div className="menu-campaignGallery-filters">
          <div className="menu-campaignGallery-filters-single">
            <SelectSearch
              className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style"
              size="lg"
              options={sortBy}
              value={sortByValue}
              onChange={(opt) => setSortByValue(opt)}
              placeholder="Sort by"
            />
          </div>
        </div>
      </div>
      <div className="menu-campaignGallery-filtersDisplay">
        {Object.keys(filters).map((filter) => (
          <FilterDisplay
            removeFilter={removeFilter}
            filter={filters[filter]}
            label={filter}
          />
        ))}
      </div>
      {filters?.collections[0] ? (
        <div className="menu-campaignGallery-filtersection">
          <FilterProperty collection={filters.collections} />
        </div>
      ) : null}
    </div>
  );
};

export default CampaignGalleryMenu;
