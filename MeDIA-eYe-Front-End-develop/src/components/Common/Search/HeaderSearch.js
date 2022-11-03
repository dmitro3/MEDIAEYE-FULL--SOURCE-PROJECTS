import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { SearchError, SearchIcon, Men } from '../../../components/Icons/';
import { HeartColor, HeartWhite } from './SearchResultIcon';
import FilterResults from 'react-filter-search';
import { kFormatter } from '../../../utils/functions';
import { useHistory } from 'react-router-dom';

const data = [
  {
    title: 'Collection 1 [Title]',
    type: 'Collection',
    wallet: '0xdabfbc3006fa8d06d8dee5769fa5168758908030',
    img: '../../img/05.png',
    likes: 1200,
    countItems: 1000
  },
  {
    title: 'Collection 2 [Title]',
    type: 'Collection',
    wallet: '0x7cc0a0696f04c0aa9d5b43f03100b69a22f792d6',
    img: '../../img/creator_account.png',
    likes: 1200,
    countItems: 1000
  },
  {
    title: 'Collection 3 [Title]',
    type: 'Collection',
    wallet: '0xdabfbc3006fa8d06d8dee5769fa5168758908030',
    img: '../../img/05.png',
    likes: 1200,
    countItems: 1000
  },
  {
    title: 'Collection 4 [Title]',
    type: 'Collection',
    wallet: '0xdabfbc3006fa8d06d8dee5769fa5168758908030',
    img: '../../img/05china05.png',
    likes: 1200,
    countItems: 1000
  },
  {
    title: 'Title 1',
    type: 'NFT',
    wallet: '0x7cc0a0696f04c0aa9d5b43f03100b69a22f792d6',
    img: '../../img/05.png',
    likes: 1200,
    id: 24432
  },
  {
    title: 'Title 2',
    type: 'NFT',
    wallet: '0xdabfbc3006fa8d06d8dee5769fa5168758908030',
    img: '../../img/05.png',
    likes: 1200,
    id: 53524
  },
  {
    title: 'Title 3',
    type: 'NFT',
    wallet: '0x7cc0a0696f04c0aa9d5b43f03100b69a22f792d6',
    img: '../../img/05.png',
    likes: 1200,
    id: 543
  },
  {
    title: 'Title 4',
    type: 'NFT',
    wallet: '0xdabfbc3006fa8d06d8dee5769fa5168758908030',
    img: '../../img/05china05.png',
    likes: 1200,
    id: 23234
  },
  {
    title: 'Title 1',
    type: 'Bundle',
    wallet: '0x7cc0a0696f04c0aa9d5b43f03100b69a22f792d6',
    img: '../../img/05.png',
    count: 15,
    id: 24432
  },
  {
    title: 'Title 2',
    type: 'Bundle',
    wallet: '0xdabfbc3006fa8d06d8dee5769fa5168758908030',
    img: '../../img/05.png',
    count: 9,
    id: 53524
  },
  {
    title: 'Title 3',
    type: 'Bundle',
    wallet: '0x7cc0a0696f04c0aa9d5b43f03100b69a22f792d6',
    img: '../../img/05.png',
    count: 7,
    id: 543
  },
  {
    title: 'Title 4',
    type: 'Bundle',
    wallet: '0xdabfbc3006fa8d06d8dee5769fa5168758908030',
    img: '../../img/05china05.png',
    count: 5,
    id: 23234
  },
  {
    title: 'Name 1',
    type: 'Creator',
    wallet: '0x7cc0a0696f04c0aa9d5b43f03100b69a22f792d6',
    img: '../../img/05.png',
    likes: 1200,
    subscribers: 555,
    id: 24432
  },
  {
    title: 'Name 2',
    type: 'Creator',
    wallet: '0xdabfbc3006fa8d06d8dee5769fa5168758908030',
    img: '../../img/05.png',
    likes: 1200,
    subscribers: 555,
    id: 53524
  },
  {
    title: 'Name 3',
    type: 'Creator',
    img: '../../img/05.png',
    likes: 1200,
    subscribers: 555,
    id: 543
  },
  {
    title: 'Name 4',
    type: 'Creator',
    img: '../../img/05china05.png',
    likes: 1200,
    subscribers: 555,
    id: 23234
  },
  {
    title: 'NFT Crypto Comicon 1',
    type: 'Event',
    img: '../../img/05.png',
    date: '17.04.2021',
    subscribers: 555,
    id: 24432
  },
  {
    title: 'NFT Crypto Comicon 2',
    type: 'Event',
    img: '../../img/05.png',
    date: '17.04.2021',
    subscribers: 555,
    id: 53524
  },
  {
    title: 'NFT Crypto Comicon 3',
    type: 'Event',
    img: '../../img/05.png',
    date: '17.04.2021',
    subscribers: 555,
    id: 543
  },
  {
    title: 'NFT Crypto Comicon 4',
    type: 'Event',
    img: '../../img/05china05.png',
    date: '17.04.2021',
    subscribers: 555,
    id: 23234
  }
];

const SearchResult = () => {
  const [searchValue, setSearchValue] = useState('');
  const theme = useSelector((state) => state.app.darkTheme);
  const [searchError, setSearchError] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);
  const history = useHistory();
  const [showDropdownSearch, setShowDropdownSearch] = useState(false);
  const [isResult, setIsResult] = useState(false);
  const toggleMobileSearch = () => {
    setMobileSearch(!mobileSearch);
  };

  const handleSearchChange = (event) => {
    const { value } = event.target;
    if (value.trim() !== '') {
      setShowDropdownSearch(true);
    } else {
      setShowDropdownSearch(false);
    }
    setSearchValue(value);
  };

  const handleClickAllResults = () => {
    setShowDropdownSearch(false);
    history.push({
      pathname: '/search',
      state: { value: searchValue }
    });
  };
  return (
    <>
      <div className="mediaeye-layout-header-search-box">
        <div className="mediaeye-layout-header-search-box-inner">
          <input
            className={
              searchError
                ? 'searchError mediaeye-layout-header-search-box-input'
                : 'mediaeye-layout-header-search-box-input'
            }
            type="text"
            value={searchValue}
            onChange={(e) => handleSearchChange(e)}
            placeholder="Search"
          />
          <button
            type="button"
            className="mediaeye-layout-header-search-box-btn"
          >
            {searchError ? <SearchError /> : <SearchIcon type="white" />}
          </button>
        </div>
        {showDropdownSearch ? (
          <div className="mediaeye-layout-header-search-box-result">
            <div className="mediaeye-layout-header-search-box-result-box">
              <FilterResults
                value={searchValue}
                data={searchValue !== '' ? data : []}
                pick={['title', 'wallet']}
                renderResults={(results) => (
                  <div className="mediaeye-layout-header-search-box-result-box-item">
                    {results.length > 0
                      ? setIsResult(true)
                      : setIsResult(false)}
                    {results.some((item) => item.type === 'Collection') ? (
                      <h5>Collections</h5>
                    ) : null}
                    {results
                      .filter((result) => result.type === 'Collection')
                      .map((item) => (
                        <div className="mediaeye-layout-header-search-box-result-box-item-list search_result_item_collection">
                          <div className="mediaeye-layout-header-search-box-result-box-item-list-img">
                            <div>
                              <img src={item.img} alt="Item" />
                            </div>
                          </div>
                          <div className="mediaeye-layout-header-search-box-result-box-item-list-info">
                            <h6>{item.title.substring(0, 30)}</h6>
                            <div>
                              <span>
                                <HeartWhite /> {kFormatter(item.likes)}
                              </span>
                              <span>{kFormatter(item.countItems)} Items</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    {results.some((item) => item.type === 'NFT') ? (
                      <h5>NFTs</h5>
                    ) : null}
                    {results
                      .filter((result) => result.type === 'NFT')
                      .map((item) => (
                        <div className="mediaeye-layout-header-search-box-result-box-item-list search_result_item_nft">
                          <div className="mediaeye-layout-header-search-box-result-box-item-list-img">
                            <div>
                              <img src={item.img} alt="Item" />
                            </div>
                          </div>
                          <div className="mediaeye-layout-header-search-box-result-box-item-list-info">
                            <h6>
                              {item.title}
                              <span>NFT ID: {item.id}</span>
                            </h6>
                            <div>
                              <span>
                                <HeartColor /> {kFormatter(item.likes)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    {results.some((item) => item.type === 'Bundle') ? (
                      <h5>Bundles</h5>
                    ) : null}
                    {results
                      .filter((result) => result.type === 'Bundle')
                      .map((item) => (
                        <div className="mediaeye-layout-header-search-box-result-box-item-list search_result_item_bundles">
                          <div className="mediaeye-layout-header-search-box-result-box-item-list-img">
                            <div>
                              <img src={item.img} alt="Item" />
                            </div>
                          </div>
                          <div className="mediaeye-layout-header-search-box-result-box-item-list-info">
                            <h6>
                              {item.title} <span>NFT ID: {item.id}</span>
                            </h6>
                            <div>
                              <span>{kFormatter(item.count)} Items</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    {results.some((item) => item.type === 'Creator') ? (
                      <h5>Creators</h5>
                    ) : null}
                    {results
                      .filter((result) => result.type === 'Creator')
                      .map((item) => (
                        <div className="mediaeye-layout-header-search-box-result-box-item-list">
                          <div className="mediaeye-layout-header-search-box-result-box-item-list-img">
                            <div>
                              <img src={item.img} alt="Item" />
                            </div>
                          </div>
                          <div className="mediaeye-layout-header-search-box-result-box-item-list-info">
                            <h6>{item.title}</h6>
                            <div>
                              <span>
                                <HeartColor /> {kFormatter(item.likes)}
                              </span>
                              <span>
                                <Men /> {kFormatter(item.subscribers)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    {results.some((item) => item.type === 'Event') ? (
                      <h5>Events</h5>
                    ) : null}
                    {results
                      .filter((result) => result.type === 'Event')
                      .map((item) => (
                        <div className="mediaeye-layout-header-search-box-result-box-item-list">
                          <div className="mediaeye-layout-header-search-box-result-box-item-list-img">
                            <div>
                              <img src={item.img} alt="Item" />
                            </div>
                          </div>
                          <div className="mediaeye-layout-header-search-box-result-box-item-list-info">
                            <h6>{item.title}</h6>
                            <div>
                              <span>

                                {item.date}
                              </span>
                              <span>

                                {kFormatter(item.subscribers)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              />
            </div>
            {isResult ? (
              <button
                className="search_result_button"
                onClick={() => handleClickAllResults()}
              >
                <span>All results</span>
              </button>
            ) : (
              <span className="mediaeye-layout-header-search-box-result-no">
                We couldn’t find results for your search
              </span>
            )}
          </div>
        ) : null}
      </div>

    </>
  );
};

export default SearchResult;
