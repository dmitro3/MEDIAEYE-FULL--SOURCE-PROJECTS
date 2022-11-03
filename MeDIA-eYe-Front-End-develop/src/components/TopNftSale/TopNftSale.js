import './TopNftSale.scss';
import { async } from '@firebase/util';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { RightSideArrow } from '../Icons';
import { useDispatch } from 'react-redux';
import SelectSearch from 'react-select-search';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  toggleGeneralPopup,
  closeGeneralPopup
} from '../../store/app/appSlice';
import { getnfts } from '../../blockchain/functions/Hub/hubcollection';
import ItemLoader from '../Common/ItemLoader';

export default function TopNftSale() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [activeDays, setActiveDays] = useState(30);
  const [loaderState, setLoaderState] = useState(0);
  const [topCollections, setTopCollections] = useState([]);
  const [seeAllBtnStatus, setseeAllBtnStatus] = useState(0);
  const [activeCollection, setActiveCollection] = useState('MEDIA EYE');
  const collectionFilter = [
    {
      name: 'MEDIA EYE',
      value: 'MEDIA EYE'
    },
    {
      name: 'WORLD WIDE',
      value: 'WORLD WIDE'
    }
  ];
  const daysFilterOption = [
    {
      name: '24 h',
      value: 1
    },
    {
      name: '7 d',
      value: 7
    },
    {
      name: '30 d',
      value: 30
    },
    {
      name: 'All',
      value: 'all'
    }
  ];

  useEffect(() => {
    setLoaderState(0);
    setseeAllBtnStatus(0);
    if (activeCollection === 'WORLD WIDE') {
      handleTopWordWideCollections();
    }
    if (activeCollection === 'MEDIA EYE') {
      handleTopMediaeyeCollections();
    }
  }, [activeDays, activeCollection]);

  const handleTopWordWideCollections = async () => {
    try {
      const topCollectionsdata = await getnfts(activeDays);
      if (topCollectionsdata.length > 0) {
        if (topCollectionsdata.length > 10) {
          const items = topCollectionsdata.slice(0, 10);
          setTopCollections(items);
          setseeAllBtnStatus(1);
          setLoaderState(1);
        } else {
          setTopCollections(topCollectionsdata);
          setLoaderState(1);
        }
      }
    } catch (e) {
      dispatch(
        toggleGeneralPopup({
          status: 'error',
          message: 'Something Went Wrong !!',
          textButton: 'OK',
          size: 'sm'
        })
      );
    }
  };
  const handleTopMediaeyeCollections = async () => {
    try {
      setseeAllBtnStatus(1);
      setLoaderState(1);
    } catch (e) {
      dispatch(
        toggleGeneralPopup({
          status: 'error',
          message: 'Something Went Wrong !!',
          textButton: 'OK',
          size: 'sm'
        })
      );
    }
  };
  const soldtime = (dateandtime) => {
    if (activeDays == 30 || activeDays == 7) {
      let presntdate = new Date();
      let usedate = new Date(dateandtime);
      const diffTime = Math.abs(presntdate - usedate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return `${diffDays} days ago`;
    }
    if (activeDays == 1) {
      let presntdate = new Date();
      let usedate = new Date(dateandtime);
      const diffTime = Math.abs(presntdate - usedate) / 1000;
      const hours = Math.floor(diffTime / 3600) % 24;
      return `${hours} hours ago`;
    }
  };
  const seeAll = async () => {
    history.push({
      pathname: '/top-nft-sale-all-data',
      state: {
        activeDays: activeDays,
        activeCollection: activeCollection,
        status: 1
      }
    });
  };
  const pricetoken = (collection) => {
    var token = collection?.paymentToken
    var a = collection?.quote;
    return Math.abs(a[`${token}`].price).toFixed(2);
  }

  return (
    <>
      <Helmet>
        <meta
          property="og:url"
          content={window.location.origin + '/top-nft-sale'}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="NFT Web 3.0 Services on BSC ETH FTM chains: Marketplace, Generative Collections for Creators, Artists, Sports, Gaming and Charities | MEDIA EYE"
        />
        <meta
          property="og:description"
          content="Most extesnive range of NFT driven services: campaigns, events, airdrops, avatars, marketplace, integrated socials and digital marketing tools"
        />
        <meta
          property="og:image"
          content={window.location.origin + '/img/meta_tag/TOP_NFT_SALE.png'}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:domain"
          content="mediaeyenft.com/top-nft-sale"
        />
        <meta
          property="twitter:url"
          content={window.location.origin + '/top-nft-sale'}
        />
        <meta
          name="twitter:title"
          content="NFT Web 3.0 Services on BSC ETH FTM chains: Marketplace, Generative Collections for Creators, Artists, Sports, Gaming and Charities | MEDIA EYE"
        />
        <meta
          name="twitter:description"
          content="Most extesnive range of NFT driven services: campaigns, events, airdrops, avatars, marketplace, integrated socials and digital marketing tools"
        />
        <meta
          name="twitter:image"
          content={window.location.origin + '/img/meta_tag/TOP_NFT_SALE.png'}
        />
        <title>
          NFT Web 3.0 Services on BSC ETH FTM chains: Marketplace, Generative
          Collections for Creators, Artists, Sports, Gaming and Charities |
          MEDIA EYE{' '}
        </title>
        <meta
          name="description"
          content="Most extesnive range of NFT driven services: campaigns, events, airdrops, avatars, marketplace, integrated socials and digital marketing tools"
        />
      </Helmet>
      <div className="mediaeye-layout-content top-nft-sale">
        <div className="mediaeye-layout-container">
          <div className="mediaeye-layout-section-header top-nft-sale-header">
            <h2 className="mediaeye-layout-section-header-heading text-center">
              Top NFT Collectible Sale
            </h2>
            <div className="mediaeye-select-poptrend">
              <SelectSearch
                className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style"
                size="lg"
                options={collectionFilter}
                value={activeCollection}
                onChange={(opt) => setActiveCollection(opt)}
              />
            </div>
            <div className="mediaeye-select-poptrend days-filter">
              <SelectSearch
                className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style"
                size="lg"
                options={daysFilterOption}
                value={activeDays}
                onChange={(opt) => setActiveDays(opt)}
              />
            </div>
          </div>
          {loaderState == 1 ? (
            <div className="top-nft-sale-inner">
              <table>
                <thead>
                  <tr>
                    <th className="top-nft-sale-inner-srno"></th>
                    <th>
                      <span>NFT</span>
                    </th>
                    <th>Sold</th>
                    <th>Price</th>
                    <th className="top-nft-sale-inner-buyerseller">
                      Seller <RightSideArrow /> Buyer
                    </th>
                  </tr>
                </thead>
                {activeCollection === 'WORLD WIDE' ? (
                  <tbody>
                    {topCollections.map((collection, i) => (
                      <tr key={i}>
                        <td className="text-gray top-nft-sale-inner-srno">
                          {i + 1}
                        </td>
                        <td>
                          <div className="top-nft-sale-inner-collection">
                            <img src={collection?.collectionImageURL} alt="Collection Icon" />
                            <div className="top-nft-sale-inner-collection-titles">
                              <span className="text-gray top-nft-sale-inner-collection-titles-text">
                                {collection?.collectionName}
                              </span>
                              <span>
                                {collection?.tokens[0]?.attributes?.Name}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="text-gray">
                            {soldtime(collection?.saleAt)}
                          </span>
                        </td>
                        <td>
                          <div>
                            <span className="m-r-20">
                              $ {Math.abs(collection?.quote?.USD?.price).toFixed(2)}
                            </span>
                            <span>
                              {pricetoken(collection)}
                              {/* {Math.abs(collection?.quote?.ETH?.price).toFixed(2)}{' '} */}
                              {collection?.paymentToken}
                            </span>
                          </div>
                        </td>
                        <td>
                          <div className="top-nft-sale-inner-last">
                            <span>
                              {collection?.sellerAddress?.slice(0, 4)}...
                              {collection?.sellerAddress?.slice(-4)}
                            </span>
                            <RightSideArrow />
                            <span>
                              {collection?.buyerAddress?.slice(0, 4)}...
                              {collection?.buyerAddress?.slice(-4)}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  <tbody>
                    <tr>
                      <td className="text-gray top-nft-sale-inner-srno">1</td>
                      <td>
                        <div className="top-nft-sale-inner-collection">
                          <img src="/img/saleIcons/pic1.png" alt="Collection Icon" />
                          <div className="top-nft-sale-inner-collection-titles">
                            <span className="text-gray top-nft-sale-inner-collection-titles-text">
                              Baby Wealthy Club
                            </span>
                            <span>Baby Wealthy Club #7597</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="text-gray">5 hours ago</span>
                      </td>
                      <td>
                        <div>
                          <span className="m-r-20">$ 19,833,650.00</span>
                          <span>1,000.00 BABY</span>
                        </div>
                      </td>
                      <td>
                        <div className="top-nft-sale-inner-last">
                          <span>0xbD...5e35</span>
                          <RightSideArrow />
                          <span> 0x74...a0Ef</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-gray top-nft-sale-inner-srno">2</td>
                      <td>
                        <div className="top-nft-sale-inner-collection">
                          <img src="/img/saleIcons/pic2.png" alt="Collection Icon" />
                          <div className="top-nft-sale-inner-collection-titles">
                            <span className="text-gray top-nft-sale-inner-collection-titles-text">
                              Baby Wealthy Club
                            </span>
                            <span>Baby Wealthy Club #7597</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="text-gray">5 hours ago</span>
                      </td>
                      <td>
                        <div>
                          <span className="m-r-20">$ 19,833,650.00</span>
                          <span>1,000.00 BABY</span>
                        </div>
                      </td>
                      <td>
                        <div className="top-nft-sale-inner-last">
                          <span>0xbD...5e35</span>
                          <RightSideArrow />
                          <span> 0x74...a0Ef</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-gray top-nft-sale-inner-srno">3</td>
                      <td>
                        <div className="top-nft-sale-inner-collection">
                          <img src="/img/saleIcons/pic3.png" alt="Collection Icon" />
                          <div className="top-nft-sale-inner-collection-titles">
                            <span className="text-gray top-nft-sale-inner-collection-titles-text">
                              Baby Wealthy Club
                            </span>
                            <span>Baby Wealthy Club #7597</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="text-gray">5 hours ago</span>
                      </td>
                      <td>
                        <div>
                          <span className="m-r-20">$ 19,833,650.00</span>
                          <span>1,000.00 BABY</span>
                        </div>
                      </td>
                      <td>
                        <div className="top-nft-sale-inner-last">
                          <span>0xbD...5e35</span>
                          <RightSideArrow />
                          <span> 0x74...a0Ef</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-gray top-nft-sale-inner-srno">4</td>
                      <td>
                        <div className="top-nft-sale-inner-collection">
                          <img src="/img/saleIcons/pic4.png" alt="Collection Icon" />
                          <div className="top-nft-sale-inner-collection-titles">
                            <span className="text-gray top-nft-sale-inner-collection-titles-text">
                              Baby Wealthy Club
                            </span>
                            <span>Baby Wealthy Club #7597</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="text-gray">5 hours ago</span>
                      </td>
                      <td>
                        <div>
                          <span className="m-r-20">$ 19,833,650.00</span>
                          <span>1,000.00 BABY</span>
                        </div>
                      </td>
                      <td>
                        <div className="top-nft-sale-inner-last">
                          <span>0xbD...5e35</span>
                          <RightSideArrow />
                          <span> 0x74...a0Ef</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-gray top-nft-sale-inner-srno">5</td>
                      <td>
                        <div className="top-nft-sale-inner-collection">
                          <img src="/img/saleIcons/pic5.png" alt="Collection Icon" />
                          <div className="top-nft-sale-inner-collection-titles">
                            <span className="text-gray top-nft-sale-inner-collection-titles-text">
                              Baby Wealthy Club
                            </span>
                            <span>Baby Wealthy Club #7597</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="text-gray">5 hours ago</span>
                      </td>
                      <td>
                        <div className="top-nft-sale-inner-price">
                          <span className="m-r-20">$ 19,833,650.00</span>
                          <span>1,000.00 BABY</span>
                        </div>
                      </td>
                      <td>
                        <div className="top-nft-sale-inner-last">
                          <span>0xbD...5e35</span>
                          <RightSideArrow />
                          <span> 0x74...a0Ef</span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                )}
              </table>
            </div>
          ) : (
            <>
              <ItemLoader />
            </>
          )}
          {seeAllBtnStatus == 1 ? (
            <div className="m-t-20 text-center">
              <button
                className="btn btn-creative btn-sm btn-more"
                onClick={() => {
                  seeAll();
                }}
              >
                SEE ALL
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
