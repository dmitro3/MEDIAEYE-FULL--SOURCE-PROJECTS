import './TopCollection.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { useMoralis } from 'react-moralis';
import { useHistory } from 'react-router-dom';
import { Check, Plus, Sticker } from '../Icons';
import { useLocation } from 'react-router-dom';
import SelectSearch from 'react-select-search';
import React, { useEffect, useState } from 'react';
import { GetNetworkIcon } from '../../blockchain/functions/Utils';
import { queryTopCollections } from '../../blockchain/functions/Sales';
import { getcollection } from '../../blockchain/functions/Hub/hubcollection';
import {
  toggleGeneralPopup,
  closeGeneralPopup
} from '../../store/app/appSlice';
import ItemLoader from '../Common/ItemLoader';
import {
  CheckUrlExist,
  GetDefaultImages
} from '../../blockchain/functions/Utils';
import { LazyLoadImage } from 'react-lazy-load-image-component';


const TopCollectionAllData = (props) => {
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

  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const activeNetwork = useSelector((state) => state.app.activeNetwork);
  const [dataload, setdataload] = useState(0);
  const [flagload, setflagload] = useState(0);
  const [activeDays, setActiveDays] = useState();
  const { Moralis, isInitialized } = useMoralis();
  const [loaderState, setLoaderState] = useState(0);
  const [topCollections, setTopCollections] = useState([]);
  const [activeCollection, setActiveCollection] = useState();
  const [watchlistStatus, setWatchlistStatus] = useState(false);

  const setactiveCollection = (opt) => {
    if (activeCollection != opt) {
      setActiveCollection(opt);
      setflagload(1);
    }
  };
  const setactiveDays = (opt) => {
    if (activeDays != opt) {
      setActiveDays(opt);
      setflagload(1);
    }
  };
  const handleTopMediaeyeCollections = async (days) => {
    try {
      let daysvalue;
      if (days) {
        daysvalue = days;
      } else {
        daysvalue = activeDays;
      }
      const topCollections = await queryTopCollections(
        Moralis,
        activeNetwork,
        daysvalue
      );
      if (topCollections?.length > 0) {
        setTopCollections(topCollections);
        setdataload(1);
        setLoaderState(1);
      }
    } catch (e) {
      dispatch(
        toggleGeneralPopup({
          status: 'error',
          message: 'Something Went Wrong !!!',
          textButton: 'OK',
          size: 'sm'
        })
      );
    }
  };
  const handleTopWordWideCollections = async (days) => {
    try {
      let daysvalue;
      if (days) {
        daysvalue = days;
      } else {
        daysvalue = activeDays;
      }
      const topCollections = await getcollection(daysvalue);
      if (topCollections?.length > 0) {
        setTopCollections(topCollections);
        setdataload(1);
        setLoaderState(1);
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

  useEffect(() => {
    if (flagload == 1) {
      setLoaderState(0);
      if (isInitialized && activeCollection === 'MEDIA EYE') {
        handleTopMediaeyeCollections();
      }
      if (activeCollection === 'WORLD WIDE') {
        handleTopWordWideCollections();
      }
    }
  }, [isInitialized, activeDays, activeCollection, activeNetwork]);

  useEffect(() => {
    if (location.state.status == 1 && dataload == 0) {
      setActiveCollection(location.state.activeCollection);
      setActiveDays(location.state.activeDays);
      const days = location.state.activeDays;
      if (isInitialized && location.state.activeCollection === 'MEDIA EYE') {
        handleTopMediaeyeCollections(days);
      }
      if (location.state.activeCollection === 'WORLD WIDE') {
        handleTopWordWideCollections(days);
      }
    }
  }, [location]);

  const [cardLogo, setCardLogo] = useState([]);

  useEffect(async () => {
    let logoFile = [];
    for (let i = 0; i < topCollections?.length; i++) {
      if (activeCollection == 'MEDIA EYE') {
        if (
          topCollections[i]?.attributes?.logo &&
          (await CheckUrlExist(topCollections[i]?.attributes?.logo))
        ) {
          logoFile.push(topCollections[i]?.attributes?.logo);
        } else {
          logoFile.push(null);
        }
      }
    }
    setCardLogo(logoFile);
  }, [topCollections]);

  const pricetoken = (collection, i) => {
    var token = collection?.paymentToken
    var a = collection?.quote;
    if (a) {
      return Math.abs(a[`${token}`]?.salesVolume).toFixed(2);
    } else {

      return ''
    }

  }

  return (
    <>
      <Helmet>
        <meta
          property="og:url"
          content={window.location.origin + '/top-collection'}
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
          content={window.location.origin + '/img/meta_tag/TOP_COLLECTION.png'}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:domain"
          content="mediaeyenft.com/top-collection"
        />
        <meta
          property="twitter:url"
          content={window.location.origin + '/top-collection'}
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
          content={window.location.origin + '/img/meta_tag/TOP_COLLECTION.png'}
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
      <div className="mediaeye-layout-content m-t-30">
        <div className="mediaeye-layout-section-header top-collection-page-header">
          <h2 className="mediaeye-layout-section-header-heading">
            Top Collections
          </h2>
          <div className="mediaeye-select-poptrend">
            <SelectSearch
              className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style"
              size="lg"
              options={collectionFilter}
              value={activeCollection}
              onChange={(opt) => setactiveCollection(opt)}
            />
          </div>
          <div className="mediaeye-select-poptrend days-filter days-filter">
            <SelectSearch
              className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style"
              size="lg"
              options={daysFilterOption}
              value={activeDays}
              onChange={(opt) => setactiveDays(opt)}
            />
          </div>
        </div>

        <div className="top-collection-page-subheading">
          {activeCollection == 'MEDIA EYE' ? (
            <>
              <span className="text-link">Total Volume Traded:</span>13239.52
              ETH
            </>
          ) : null}
        </div>
        {loaderState == 1 ? (
          <div className="mediaeye-layout-container top-collection-page-table">
            <table>
              <thead>
                <tr>
                  <th className="top-collection-page-table-srno">S.no</th>
                  <th>Collection</th>
                  <th>Total Volume</th>
                  <th>{activeDays} d %</th>
                  {activeCollection == 'MEDIA EYE' ? (
                    <th>Floor Price</th>
                  ) : null}
                  <th>Buyers</th>
                  {activeCollection == 'MEDIA EYE' ? <th>Items</th> : null}
                  {activeCollection == 'MEDIA EYE' ? <th></th> : null}
                </tr>
              </thead>
              <tbody>
                {topCollections.map((collection, i) => (
                  <tr key={i}>
                    <td className="text-gray top-collection-page-table-srno">
                      {i + 1}
                    </td>
                    <td>
                      <div className="top-collection-page-table-collection">
                        <div className="top-collection-page-table-collection-img">
                          <span className="top-collection-page-table-collection-img-sticker">
                            <Sticker />{' '}
                          </span>
                          <div className="top-collection-page-table-collection-img-inner">
                            <LazyLoadImage
                              src={collection?.collectionImageURL}
                              effect="opacity"
                              onError={(event) => {
                                event.target.src =
                                  '/img/token/lazyload.png';
                                event.onerror = null;
                              }}
                            />
                          </div>
                        </div>
                        {activeCollection == 'WORLD WIDE' ? (
                          <>{collection?.collectionName}</>
                        ) : (
                          <> {collection?.attributes?.name} </>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="top-collection-page-table-price">
                        {activeCollection == 'WORLD WIDE' ? (
                          <>
                            <img
                              src={GetNetworkIcon(collection?.paymentToken)}
                              alt={collection?.paymentToken}
                            />
                            {pricetoken(collection, i)}
                          </>
                        ) : (
                          <>
                            <img src={GetNetworkIcon('ETH')} alt="ETH" />
                            19,012.7
                          </>
                        )}
                      </div>
                    </td>
                    {activeCollection == 'WORLD WIDE' ? (
                      <>
                        {collection?.salesVolumeChangePercentage > 0 ? (
                          <td className="text-action">
                            +{Math.abs(collection?.salesVolumeChangePercentage).toFixed(3)}
                            %
                          </td>
                        ) : (
                          <td className="text-action" style={{ color: 'red' }}>
                            -{Math.abs(collection?.salesVolumeChangePercentage).toFixed(3)}
                            %
                          </td>
                        )}
                      </>
                    ) : (
                      <>
                        <td className="text-action">+56,055%</td>
                      </>
                    )}
                    {activeCollection == 'MEDIA EYE' ? (
                      <td>
                        <div className="top-collection-page-table-price">
                          <img src={GetNetworkIcon('ETH')} alt="ETH" />
                          14.5 K
                        </div>
                      </td>
                    ) : null}
                    {activeCollection == 'WORLD WIDE' ? (
                      <td>{collection?.buyerCount}</td>
                    ) : (
                      <td>4.5 K</td>
                    )}
                    {activeCollection == 'MEDIA EYE' ? <td>10 K</td> : null}
                    {activeCollection == 'MEDIA EYE' ? (
                      <td>
                        <div
                          className="top-collection-page-table-watchlist"
                          onClick={
                            watchlistStatus
                              ? () => history.push('/crypto-punks')
                              : null
                          }
                        >
                          <Plus />
                          <span>Watchlist</span>
                        </div>
                      </td>
                    ) : null}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <ItemLoader />
        )}
      </div>
    </>
  );
};
export default TopCollectionAllData;
