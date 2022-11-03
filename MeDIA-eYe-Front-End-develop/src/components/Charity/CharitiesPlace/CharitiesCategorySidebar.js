import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useMoralis } from 'react-moralis';
import { Checkbox, Radiobox, SelectMark, Angle } from '../../Icons';
import SelectSearch from 'react-select-search';
const CharitiesCategorySidebar = (props) => {
  const { filters, setMarketFilters, removeItem, setRemoveItem } = props;
  const activeNetwork = useSelector((state) => state.app.activeNetwork);
  const [countryToggle, setCountryToggle] = useState(true);
  const [stateToggle, setStateToggle] = useState(true);
  const [cityToggle, setCityToggle] = useState(true);
  const [filterList, setFilterList] = useState({
    country: [
      { name: 'Australia', value: 'Australia' },
      { name: 'Australia', value: 'Australia' },
      { name: 'Australia', value: 'Australia' },
      { name: 'Australia', value: 'Australia' },
      { name: 'Australia', value: 'Australia' },
      { name: 'Australia', value: 'Australia' },
      { name: 'Australia', value: 'Australia' }
    ],
    state: [
      { name: 'Australia', value: 'Australia' },
      { name: 'Australia', value: 'Australia' },
      { name: 'Australia', value: 'Australia' },
      { name: 'Australia', value: 'Australia' },
      { name: 'Australia', value: 'Australia' },
      { name: 'Australia', value: 'Australia' },
      { name: 'Australia', value: 'Australia' },
      { name: 'Australia', value: 'Australia' }
    ],
    city: [
      { name: 'Australia', value: 'Australia' },
      { name: 'Australia', value: 'Australia' },
      { name: 'Australia', value: 'Australia' },
      { name: 'Australia', value: 'Australia' },
      { name: 'Australia', value: 'Australia' },
      { name: 'Australia', value: 'Australia' },
      { name: 'Australia', value: 'Australia' }
    ]
  });

  const sidebarRef = useRef();
  const [sidebarWidth, setSidebarWidth] = useState();
  useEffect(() => {
    setTimeout(function () {
      setSidebarWidth(sidebarRef?.current?.offsetWidth);
    }, 200);
  }, [sidebarRef]);

  useEffect(() => {
    let selectedFilters = { ...filters };
    let allFilters = { ...filterList };
    if (selectedFilters?.country && allFilters?.country) {
      for (let i = 0; i < allFilters?.country?.length; i++) {
        if (
          selectedFilters.country.indexOf(filterList?.country[i].value) !== -1
        ) {
          allFilters.country[i].selected = true;
        }
      }
    }

    if (selectedFilters?.state && allFilters?.state) {
      for (let i = 0; i < allFilters?.state?.length; i++) {
        if (selectedFilters.state === allFilters.state[i].value) {
          allFilters.state[i].selected = true;
        } else {
          allFilters.state[i].selected = false;
        }
      }
    }
    if (selectedFilters?.city && allFilters?.city) {
      for (let i = 0; i < allFilters?.city?.length; i++) {
        if (selectedFilters.city.indexOf(allFilters?.city[i].value) !== -1) {
          allFilters.city[i].selected = true;
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
              countryToggle ? 'active' : ''
            }`}
            onClick={() => setCountryToggle(!countryToggle)}
          >
            Status <Angle side="small_down" />
          </div>
          {countryToggle
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
              stateToggle ? 'active' : ''
            }`}
            onClick={() => setStateToggle(!stateToggle)}
          >
            Status <Angle side="small_down" />
          </div>
          {stateToggle
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

        <div className="mediaeye-charity-sidebar-col">
          <div
            className={`mediaeye-charity-sidebar-col-heading ${
              cityToggle ? 'active' : ''
            }`}
            onClick={() => setCityToggle(!cityToggle)}
          >
            Status <Angle side="small_down" />
          </div>
          {cityToggle
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
      </div>
    </div>
  );
};

export default CharitiesCategorySidebar;
