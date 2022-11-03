import React, { useState } from 'react';
import './AccountActivity.scss';
import { Helmet } from 'react-helmet';
import itemImg from '../../../assets/img/avatar.png';
import { Bid, BidIcon, Close, List, Offer, Sale, Transfer } from '../../Icons';
import { components } from 'react-select';
import { default as ReactSelect } from 'react-select';
import { filter } from 'react-filter-search/lib/filter';
import { prop, value } from 'dom7';
import { GetDefaultImages } from '../../../blockchain/functions/Utils';

const activityData = [
  {
    event: 'List',

    name: 'Elon Musk Astronaut #2',
    rate: '0.5',
    quantity: '1',
    from: 'Elon Musk',
    to: '--',
    date: '8 days ago'
  },
  {
    event: 'List',

    name: 'Elon Musk Astronaut #2',

    rate: '0.5',
    quantity: '1',
    from: 'Elon Musk',
    to: '--',
    date: '8 days ago'
  },
  {
    event: 'Offer',

    name: 'Elon Musk Astronaut #2',

    rate: '0.5',
    quantity: '1',
    from: 'Elon Musk',
    to: '--',
    date: '8 days ago'
  },
  {
    event: 'Offer',

    name: 'Elon Musk Astronaut #2',

    rate: '0.5',
    quantity: '1',
    from: 'Elon Musk',
    to: '--',
    date: '8 days ago'
  },
  {
    event: 'Transfer',

    name: 'Elon Musk Astronaut #2',

    rate: '0.5',
    quantity: '1',
    from: 'Elon Musk',
    to: '--',
    date: '8 days ago'
  },
  {
    event: 'Transfer',

    name: 'Elon Musk Astronaut #2',

    rate: '0.5',
    quantity: '1',
    from: 'Elon Musk',
    to: '--',
    date: '8 days ago'
  },
  {
    event: 'Bid',

    name: 'Elon Musk Astronaut #2',

    rate: '0.5',
    quantity: '1',
    from: 'Elon Musk',
    to: '--',
    date: '8 days ago'
  },
  {
    event: 'Bid',

    name: 'Elon Musk Astronaut #2',

    rate: '0.5',
    quantity: '1',
    from: 'Elon Musk',
    to: '--',
    date: '8 days ago'
  },
  {
    event: 'Sale',

    name: 'Elon Musk Astronaut #2',

    rate: '0.5',
    quantity: '1',
    from: 'Elon Musk',
    to: '--',
    date: '8 days ago'
  },
  {
    event: 'Sale',

    name: 'Elon Musk Astronaut #2',

    rate: '0.5',
    quantity: '1',
    from: 'Elon Musk',
    to: '--',
    date: '8 days ago'
  }
];

const filterOptions = [
  { value: 'List', label: 'Listings', id: '0' },
  { value: 'Bid', label: 'Bids', id: '1' },
  { value: 'Transfer', label: 'Transfers', id: '2' },
  { value: 'Sale', label: 'Sales', id: '3' },
  { value: 'Offer', label: 'Offeres', id: '4' }
];

export default function AccountActivity(props) {
  const [allFilters, setAllFilters] = useState([]);
  const { user, isOwner } = props;

  const updateFilterValue = (value) => {
    setAllFilters(value);

    let demo = activityData.find((x) => x.event);
  };
  const removeFilter = () => {
    setAllFilters([]);
  };
  const removeFilters = (props) => {
    if (props === 'clear') {
      setAllFilters([]);
    } else {
      let data = [...allFilters];
      let index = data.findIndex((i) => i.value === props.value);
      data.splice(index, 1);
      setAllFilters(data);
    }
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

  const Activity = (props) => {
    const { data, filterName } = props;
    const isSelected = allFilters.find((f) => data.value === f.value)
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

  return (
    <>
      <Helmet>
        <meta
          property="og:url"
          content={
            window.location.origin +
            '/account/' +
            user?.attributes?.ethAddress +
            '/activity'
          }
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={user?.attributes?.username + ' Activities | MEDIA EYE'}
        />
        <meta
          property="og:description"
          content={user?.attributes?.username + ' Activities'}
        />
        <meta
          property="og:image"
          content={
            user?.attributes?.profileImage
              ? user.attributes.profileImage._url
              : GetDefaultImages('USER')
          }
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:domain"
          content={
            'mediaeyenft.com/account/' +
            user?.attributes?.ethAddress +
            '/activity'
          }
        />
        <meta
          property="twitter:url"
          content={
            window.location.origin +
            '/account/' +
            user?.attributes?.ethAddress +
            '/activity'
          }
        />
        <meta
          name="twitter:title"
          content={user?.attributes?.username + ' Activities | MEDIA EYE'}
        />
        <meta
          name="twitter:description"
          content={user?.attributes?.username + ' Activities'}
        />
        <meta
          name="twitter:image"
          content={
            user?.attributes?.profileImage
              ? user.attributes.profileImage._url
              : GetDefaultImages('USER')
          }
        />
        <title>{user?.attributes?.username + ' Activities | MEDIA EYE'}</title>
        <meta
          name="description"
          content={user?.attributes?.username + ' Activities'}
        />
      </Helmet>
      <div className="account-activity-page">
        <div className="account-activity-page-searchBar">
          <div className="mediaeye-searchbar">
            <input placeholder="Search" type="text" />
          </div>
        </div>
        <div className="account-activity-page-activity">
          <div className="account-activity-page-activity-title">
            <span>Activity</span>
          </div>
          <div className="account-activity-page-activity-block">
            <div className="account-activity-page-activity-block-header">
              <ReactSelect
                options={filterOptions}
                isMulti
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                components={{
                  Option: Activity
                }}
                onChange={(selected) => {
                  updateFilterValue(selected);
                }}
                name="filters"
                allowSelectAll={true}
                // menuIsOpen={true}
                value={allFilters}
                placeholder="Filter"
                controlShouldRenderValue={false}
                styles={reactSelectStyles}
              />

              {allFilters
                ? allFilters.map((item) => (
                    <div className="account-activity-page-activity-block-header-filterss">
                      <span>{item.value}</span>
                      <div onClick={() => removeFilters(item)}>
                        <Close />
                      </div>
                    </div>
                  ))
                : null}

              <div
                className="account-activity-page-activity-block-header-clearAll"
                onClick={() => removeFilters('clear')}
              >
                Clear All
              </div>
            </div>
            <div className="account-activity-page-activity-block-title">
              <div>
                <span>Event</span>
              </div>
              <div className="section-item">
                <span>Item</span>
              </div>
              <div>
                <span>Price</span>
              </div>
              <div>
                <span>Quantity</span>
              </div>
              <div>
                <span>From</span>
              </div>
              <div>
                <span>To</span>
              </div>
              <div>
                <span>Date</span>
              </div>
            </div>
            <div className="account-activity-page-activity-block-content">
              {activityData.map((item) => (
                <div className="account-activity-page-activity-block-content-row">
                  <div className="multiple-item">
                    {item.event === 'Offer' ? (
                      <Offer />
                    ) : item.event === 'Bid' ? (
                      <Bid />
                    ) : item.event === 'Transfer' ? (
                      <Transfer />
                    ) : item.event === 'List' ? (
                      <List />
                    ) : (
                      <Sale />
                    )}
                    <span>{item.event}</span>
                  </div>
                  <div className="multiple-item section-Item">
                    <img src={itemImg} alt={item.name} />
                    <span>{item.name}</span>
                  </div>
                  <div className="multiple-item">
                    <img src="/img/token/34/BNB.png" alt="Price_Type" />
                    <span>{item.rate}</span>
                  </div>
                  <div>{item.quantity}</div>
                  <div className="text-different">
                    <span>{item.from}</span>
                  </div>
                  <div className="text-different">
                    <span>{item.to}</span>
                  </div>
                  <div className="text-different">{item.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
