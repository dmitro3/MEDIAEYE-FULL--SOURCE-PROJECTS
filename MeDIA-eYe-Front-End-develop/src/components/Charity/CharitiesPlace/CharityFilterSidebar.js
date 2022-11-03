import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useMoralis } from 'react-moralis';
import { Checkbox, Radiobox, SelectMark, Angle } from '../../Icons';
import SelectSearch from 'react-select-search';
const CharityFilterSidebar = (props) => {
  const { filters, setMarketFilters, removeItem, setRemoveItem } = props;
  const activeNetwork = useSelector((state) => state.app.activeNetwork);
  const [statusToggle, setStatusToggle] = useState(true);
  const [priceToggle, setPriceToggle] = useState(true);
  const [quantityToggle, setQuantityToggle] = useState(true);
  const [chainToggle, setChainToggle] = useState(true);
  const [categoryToggle, setCategoryToggle] = useState(true);
  const [titleToggle, setTitleToggle] = useState(true);
  const [collectionsToggle, setCollectionsToggle] = useState(true);
  const [filterList, setFilterList] = useState({
    status: [
      { name: 'Buy Now', value: 'Buy Now' },
      { name: 'On Auction', value: 'On Auction' },
      { name: 'New', value: 'New' },
      { name: 'Has Offers', value: 'Has Offers' }
    ],
    quantity: [
      { name: 'All items', value: 'All', selected: true },
      { name: 'Single items', value: 'Single' },
      { name: 'Bundles', value: 'Bundles' }
    ],
    chain: [
      { name: 'ETH', value: 'ETH' },
      { name: 'BSC', value: 'BSC' },
      { name: 'FTM', value: 'FTM' }
    ],

    category: [
      { name: 'Art', value: 'Art' },
      { name: 'Crypto', value: 'Crypto' },
      { name: 'Gaming', value: 'Gaming' },
      { name: 'Media', value: 'Media' },
      { name: 'Business', value: 'Business' },
      { name: 'Sports', value: 'Sports' }
    ],

    collections: [
      { name: 'Crazy Apes Soc', value: 'Crazy Apes Soc' },
      { name: 'Mutant Apes So', value: 'Mutant Apes So' },
      { name: 'Okay Bears', value: 'Okay Bears' },
      { name: 'BEANZ Official', value: 'BEANZ Official' },
      { name: 'Doodles', value: 'Doodles' },
      { name: 'Meebits', value: 'Meebits' }
    ]
  });
  const [priceTokenList, setPriceTokenList] = useState([]);

  const sidebarRef = useRef();
  const [sidebarWidth, setSidebarWidth] = useState();
  useEffect(() => {
    setTimeout(function () {
      setSidebarWidth(sidebarRef?.current?.offsetWidth);
    }, 200);
  }, [sidebarRef]);

  useEffect(() => {
    let list = [];
    if (activeNetwork === 'BSC') {
      list = [
        { name: 'WBNB', value: 'WBNB' },
        { name: 'BUSD', value: 'BUSD' }
      ];
    } else if (activeNetwork === 'ETH') {
      list = [
        { name: 'WETH', value: 'WETH' },
        { name: 'USDT', value: 'USDT' }
      ];
    } else if (activeNetwork === 'FTM') {
      list = [
        { name: 'WFTM', value: 'WFTM' },
        { name: 'USDC', value: 'USDC' }
      ];
    }
    applyPrice('network', list && list.length > 0 ? list[0] : '');
    setPriceTokenList(list);
  }, [activeNetwork]);
  useEffect(() => {
    let selectedFilters = { ...filters };
    let allFilters = { ...filterList };
    if (selectedFilters?.status && allFilters?.status) {
      for (let i = 0; i < allFilters?.status?.length; i++) {
        if (
          selectedFilters.status.indexOf(filterList?.status[i].value) !== -1
        ) {
          allFilters.status[i].selected = true;
        }
      }
    }

    if (selectedFilters?.quantity && allFilters?.quantity) {
      for (let i = 0; i < allFilters?.quantity?.length; i++) {
        if (selectedFilters.quantity === allFilters.quantity[i].value) {
          allFilters.quantity[i].selected = true;
        } else {
          allFilters.quantity[i].selected = false;
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
    if (selectedFilters?.category && allFilters?.category) {
      for (let i = 0; i < allFilters?.category?.length; i++) {
        if (
          selectedFilters.category.indexOf(allFilters?.category[i].value) !== -1
        ) {
          allFilters.category[i].selected = true;
        }
      }
    }
    if (selectedFilters?.title && allFilters?.title) {
      for (let i = 0; i < allFilters?.title?.length; i++) {
        if (selectedFilters.title.indexOf(allFilters?.title[i].value) !== -1) {
          allFilters.title[i].selected = true;
        }
      }
    }

    if (selectedFilters?.collections && allFilters?.collections) {
      for (let i = 0; i < allFilters?.collections?.length; i++) {
        if (
          selectedFilters.collections.indexOf(
            allFilters?.collections[i].value
          ) !== -1
        ) {
          allFilters.collections[i].selected = true;
        }
      }
    }

    setFilterList(allFilters);
  }, []);

  useEffect(() => {
    let selectedFilters = { ...filters };
    let status = [];
    if (filterList?.status) {
      for (let i = 0; i < filterList?.status?.length; i++) {
        if (filterList?.status[i].selected) {
          status.push(filterList?.status[i].value);
        }
      }
    }
    selectedFilters['status'] = status;
    let collections = [];
    if (filterList?.collections) {
      for (let i = 0; i < filterList?.collections?.length; i++) {
        if (filterList?.collections[i].selected) {
          collections.push(filterList?.collections[i].value);
        }
      }
    }
    selectedFilters['collections'] = collections;
    let chain = [];
    if (filterList?.chain) {
      for (let i = 0; i < filterList?.chain?.length; i++) {
        if (filterList?.chain[i].selected) {
          chain.push(filterList?.chain[i].value);
        }
      }
    }
    selectedFilters['chain'] = chain;
    let category = [];
    if (filterList?.category) {
      for (let i = 0; i < filterList?.category?.length; i++) {
        if (filterList?.category[i].selected) {
          category.push(filterList?.category[i].value);
        }
      }
    }
    selectedFilters['category'] = category;
    let title = [];
    if (filterList?.title) {
      for (let i = 0; i < filterList?.title?.length; i++) {
        if (filterList?.title[i].selected) {
          title.push(filterList?.title[i].value);
        }
      }
    }
    selectedFilters['title'] = title;
    let quantity = '';
    if (filterList?.quantity) {
      for (let i = 0; i < filterList?.quantity?.length; i++) {
        if (filterList?.quantity[i].selected) {
          quantity = filterList?.quantity[i].value;
        }
      }
    }
    selectedFilters['quantity'] = quantity;
    setMarketFilters(selectedFilters);
  }, [filterList]);

  const applyPrice = (name, value) => {
    let selectedFilters = { ...filters };
    selectedFilters['price'][name] = value;
    setMarketFilters(selectedFilters);
  };

  const updateFilterValue = (name, value, isMulti = false) => {
    let allFilters = { ...filterList };
    if (isMulti) {
      for (let i = 0; i < allFilters[name].length; i++) {
        if (allFilters[name][i].value === value) {
          allFilters[name][i].selected = allFilters[name][i].selected
            ? false
            : true;
        }
      }
    } else {
      for (let i = 0; i < allFilters[name].length; i++) {
        if (allFilters[name][i].value === value) {
          allFilters[name][i].selected = true;
        } else {
          allFilters[name][i].selected = false;
        }
      }
    }
    setFilterList(allFilters);
  };

  useEffect(() => {
    if (removeItem) {
      let allFilters = { ...filterList };
      if (removeItem?.reset) {
        for (let property in allFilters) {
          for (let i = 0; i < allFilters[property].length; i++) {
            if (
              property === 'quantity' &&
              allFilters[property][i].value === 'All'
            ) {
              allFilters[property][i].selected = true;
            } else {
              allFilters[property][i].selected = false;
            }
          }
        }
      } else {
        allFilters[removeItem?.name][removeItem?.index].selected = false;
      }
      setFilterList(allFilters);
      setRemoveItem(null);
    }
  }, [removeItem]);

  return (
    <div
      className="mediaeye-charity-sidebar mediaeyefancyScroll"
      ref={sidebarRef}
      style={{ maxWidth: sidebarWidth ? sidebarWidth + 'px' : '' }}
    >
      <div className="mediaeye-charity-sidebar-inner">
        <div className="mediaeye-charity-sidebar-col">
          <div
            className={`mediaeye-charity-sidebar-col-heading ${
              statusToggle ? 'active' : ''
            }`}
            onClick={() => setStatusToggle(!statusToggle)}
          >
            Status <Angle side="small_down" />
          </div>
          {statusToggle
            ? filterList?.status.map((list, i) => (
                <div
                  key={i}
                  className={`mediaeye-charity-sidebar-col-row ${
                    list?.selected ? 'active' : ''
                  }`}
                  onClick={(e) => {
                    updateFilterValue('status', list.value, true);
                  }}
                >
                  <div className="mediaeye-charity-sidebar-col-row-icon">
                    <Checkbox type={list?.selected} />
                  </div>
                  <div className="mediaeye-charity-sidebar-col-row-name">
                    {list.name}
                  </div>
                </div>
              ))
            : null}
        </div>
        {/* end status col */}

        <div className="mediaeye-charity-sidebar-col">
          <div
            className={`mediaeye-charity-sidebar-col-heading ${
              priceToggle ? 'active' : ''
            }`}
            onClick={() => setPriceToggle(!priceToggle)}
          >
            Price <Angle side="small_down" />
          </div>
          {priceToggle ? (
            <>
              <div className="mediaeye-charity-sidebar-col-price">
                <div className="mediaeye-charity-sidebar-col-price-col">
                  <input
                    className="mediaeyeform-input mediaeye-charity-sidebar-col-price-input"
                    value={filters?.price.min}
                    placeholder="Min"
                    onChange={(e) => {
                      applyPrice('min', e.target.value);
                    }}
                  />
                </div>
                <div className="mediaeye-charity-sidebar-col-price-col">to</div>
                <div className="mediaeye-charity-sidebar-col-price-col">
                  <input
                    className="mediaeyeform-input  mediaeye-charity-sidebar-col-price-input"
                    value={filters?.price.max}
                    placeholder="Max"
                    onChange={(e) => {
                      applyPrice('max', e.target.value);
                    }}
                  />
                </div>
                <div className="mediaeye-charity-sidebar-col-price-col">
                  <SelectSearch
                    className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style"
                    value={filters?.price.network}
                    options={priceTokenList}
                    onChange={(opt) => {
                      applyPrice('network', opt);
                    }}
                  />
                </div>
              </div>
              <div className="mediaeye-charity-sidebar-col-row">
                <button
                  type="button"
                  className="btn btn-info btn-square btn-block m-t-5"
                >
                  Apply
                </button>
              </div>
            </>
          ) : null}
        </div>
        {/* end price col */}

        <div className="mediaeye-charity-sidebar-col">
          <div
            className={`mediaeye-charity-sidebar-col-heading ${
              quantityToggle ? 'active' : ''
            }`}
            onClick={() => setQuantityToggle(!quantityToggle)}
          >
            Quantity <Angle side="small_down" />
          </div>
          {quantityToggle
            ? filterList?.quantity.map((list, i) => (
                <div
                  key={i}
                  className={`mediaeye-charity-sidebar-col-row ${
                    list?.selected ? 'active' : ''
                  }`}
                  onClick={(e) => {
                    updateFilterValue('quantity', list.value);
                  }}
                >
                  <div className="mediaeye-charity-sidebar-col-row-icon">
                    <Radiobox type={list?.selected} />
                  </div>
                  <div className="mediaeye-charity-sidebar-col-row-name">
                    {list.name}
                  </div>
                </div>
              ))
            : null}
        </div>
        {/* end Quantity col */}

        <div className="mediaeye-charity-sidebar-col">
          <div
            className={`mediaeye-charity-sidebar-col-heading ${
              collectionsToggle ? 'active' : ''
            }`}
            onClick={() => setCollectionsToggle(!collectionsToggle)}
          >
            Collections <Angle side="small_down" />
          </div>
          {collectionsToggle ? (
            <>
              <div className="mediaeye-searchbar mediaeye-searchbar-left mediaeye-searchbar-sm m-b-20">
                <input placeholder="Filter" type="text" />
              </div>

              <div className="mediaeye-charity-sidebar-col-headingsub">
                Top 100
              </div>
              {filterList?.collections.map((list, i) => (
                <div
                  key={i}
                  className={`mediaeye-charity-sidebar-col-row ${
                    list?.selected ? 'active' : ''
                  }`}
                  onClick={(e) => {
                    updateFilterValue('collections', list.value, true);
                  }}
                >
                  <div className="mediaeye-charity-sidebar-col-row-icon">
                    <SelectMark type={list?.selected} />
                  </div>
                  <div className="mediaeye-charity-sidebar-col-row-name">
                    {list.name}
                  </div>
                </div>
              ))}
            </>
          ) : null}
        </div>
        {/* end Quantity col */}

        <div className="mediaeye-charity-sidebar-col">
          <div
            className={`mediaeye-charity-sidebar-col-heading ${
              chainToggle ? 'active' : ''
            }`}
            onClick={() => setChainToggle(!chainToggle)}
          >
            Chains <Angle side="small_down" />
          </div>
          {chainToggle
            ? filterList?.chain.map((list, i) => (
                <div
                  key={i}
                  className={`mediaeye-charity-sidebar-col-row ${
                    list?.selected ? 'active' : ''
                  }`}
                  onClick={(e) => {
                    updateFilterValue('chain', list.value, true);
                  }}
                >
                  <div className="mediaeye-charity-sidebar-col-row-icon">
                    <Checkbox type={list?.selected} />
                  </div>
                  <div className="mediaeye-charity-sidebar-col-row-name">
                    {list.name}
                  </div>
                </div>
              ))
            : null}
        </div>
        {/* end Chains col */}

        <div className="mediaeye-charity-sidebar-col">
          <div
            className={`mediaeye-charity-sidebar-col-heading ${
              categoryToggle ? 'active' : ''
            }`}
            onClick={() => setCategoryToggle(!categoryToggle)}
          >
            Category <Angle side="small_down" />
          </div>
          {categoryToggle
            ? filterList?.category.map((list, i) => (
                <div
                  key={i}
                  className={`mediaeye-charity-sidebar-col-row ${
                    list?.selected ? 'active' : ''
                  }`}
                  onClick={(e) => {
                    updateFilterValue('category', list.value, true);
                  }}
                >
                  <div className="mediaeye-charity-sidebar-col-row-icon">
                    <Checkbox type={list?.selected} />
                  </div>
                  <div className="mediaeye-charity-sidebar-col-row-name">
                    {list.name}
                  </div>
                </div>
              ))
            : null}
        </div>
        {/* end Category col */}
      </div>
    </div>
  );
};

export default CharityFilterSidebar;
