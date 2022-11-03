import React, { useState } from 'react';
import SelectSearch from 'react-select-search';
import TopBuyer from '../../ContentMarketplace/Top/TopPlatformUsers/TopBuyer';
import TopSeller from '../../ContentMarketplace/Top/TopPlatformUsers/TopSeller';
import './PopularTranding.scss';

export default function PopularTranding(props) {
  const [activeDays, setActiveDays] = useState('24 h');
  const [type, setType] = useState('Seller');

  const userType = [
    {
      name: 'Seller',
      value: 'Seller'
    },
    {
      name: 'Buyers',
      value: 'Buyers'
    }
  ];
  const timeDuration = [
    {
      name: '24 h',
      value: '24 h'
    },
    {
      name: '7 d',
      value: '7 d'
    },
    {
      name: '30 d',
      value: '30 d'
    },
    {
      name: 'All',
      value: 'All'
    }
  ];

  return (
    <div className="popular-tranding">
      <div className="popular-tranding-header">
        {props.title ? (
          <span>{props.title}</span>
        ) : (
          <span>POPULAR & TRENDING</span>
        )}
        <div className="popular-tranding-header-right">
          <div className="mediaeye-select-poptrend">
            <SelectSearch
              className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style"
              size="lg"
              options={userType}
              value={type}
              onChange={(opt) => setType(opt)}
            />
          </div>
          <div className="mediaeye-select-poptrend days-filter">
            <SelectSearch
              className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style"
              size="lg"
              options={timeDuration}
              value={activeDays}
              onChange={(opt) => setActiveDays(opt)}
            />
          </div>
        </div>
      </div>
      <div className="mediaeyefancyScroll">
        <div className="popular-tranding-inner">
          <div className="popular-tranding-inner-buyer">
            <div className="popular-tranding-inner-buyer-header">
              <div className="popular-tranding-inner-buyer-header-title no-one">
                User name
              </div>
              <div className="popular-tranding-inner-buyer-header-title">
                Amount
              </div>
              <div className="popular-tranding-inner-buyer-header-title">
                USD
              </div>
              <div className="popular-tranding-inner-buyer-header-title">
                {type === 'Seller' ? 'Sales' : 'Purchases'}
              </div>
            </div>
            {type === 'Seller' ? (
              <TopBuyer days={activeDays} />
            ) : (
              <TopSeller days={activeDays} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
