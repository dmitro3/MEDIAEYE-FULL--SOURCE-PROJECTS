import React, { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';
import CollectionCard2 from '../ContentMarketplace/CollectionCard/CollectionCard2';
import TopCollectionAllData from './TopCollectionAllData';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { Pagination } from 'swiper';
import { useDispatch, useSelector } from 'react-redux';
import {
  toggleGeneralPopup,
  closeGeneralPopup
} from '../../store/app/appSlice';
import { queryTopCollections } from '../../blockchain/functions/Sales';
import { getcollection } from '../../blockchain/functions/Hub/hubcollection';
import { GetNetworkIcon } from '../../blockchain/functions/Utils';
import { Link, useHistory, useLocation } from 'react-router-dom';
import './TopCollection.scss';
import SelectSearch from 'react-select-search';
import { Check, CloseIcon, Plus, RightArrow, Sticker } from '../Icons';
import { async } from '@firebase/util';
import axios from 'axios';
import ItemLoader from '../Common/ItemLoader';
const settings = {
  slidesPerView: 1,
  grabCursor: true,
  modules: [Pagination],
  pagination: {
    el: '.mediaeye-top-collection-pagination',
    enable: true,
    clickable: true
  },
  breakpoints: {
    889: {
      slidesPerView: 2
    },
    1181: {
      slidesPerView: 3
    },
    1280: {
      slidesPerView: 4
    }
  }
};

const homeCollection = [
  {
    name: 'MEDIA EYE',
    value: 'MEDIA EYE'
  }
];

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
    value: 0
  }
];

export default function TopCollection(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const activeNetwork = useSelector((state) => state.app.activeNetwork);
  const { Moralis, isInitialized } = useMoralis();
  const [activeDays, setActiveDays] = useState(30);
  const [loaderState, setLoaderState] = useState(0);
  const [seeAllBtnState, setSeeAllBtnState] = useState(0);
  const [topCollections, setTopCollections] = useState([]);
  const [seeAllBtnStatus, setSeeAllBtnStatus] = useState(0);
  const [seeAllPageState, setSeeAllPageState] = useState(0);
  const [alltopCollections, setallTopCollections] = useState([]);
  const [seeAllBtnDesignState, setSeeAllBtnDesignState] = useState(0);
  const [activeCollection, setActiveCollection] = useState('MEDIA EYE');
  const [isLoadingTopCollections, setLoadingTopCollections] = useState(false);

  const handleTopMediaeyeCollections = async () => {
    try {
      const topCollections = await queryTopCollections(
        Moralis,
        activeNetwork,
        activeDays
      );
      if (topCollections?.length > 0) {
        setTopCollections(topCollections);
        setSeeAllBtnStatus(1);
        setLoaderState(1);
      } else {
        setLoaderState(1);
      }
    } catch (e) {
      setLoaderState(1);
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
  const handleTopWordWideCollections = async () => {
    try {
      const topCollections = await getcollection(activeDays);
      if (topCollections?.length > 0) {
        if (topCollections.length > 9) {
          const items = topCollections.slice(0, 9);
          setTopCollections(items);
          setSeeAllBtnStatus(1);
          setLoaderState(1);
        }
      } else {
        setLoaderState(1);
      }
    } catch (e) {
      setLoaderState(1);
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
    setLoaderState(0);
    setSeeAllBtnStatus(0);
    if (isInitialized && activeCollection === 'MEDIA EYE') {
      handleTopMediaeyeCollections();
    }
    if (activeCollection === 'WORLD WIDE') {
      handleTopWordWideCollections();
    }
  }, [isInitialized, activeDays, activeCollection, activeNetwork]);

  useEffect(() => {
    if (location.pathname === '/') {
      setSeeAllBtnDesignState(0);
    }
  }, [location]);

  const handleSetActiveCollection = (opt) => {
    if (activeCollection !== opt) {
      setActiveCollection(opt);
      setTopCollections([]);
    }
  };
  const handleSetActiveDays = (opt) => {
    if (activeDays !== opt) {
      setActiveDays(opt);
      setTopCollections([]);
    }
  };
  const seeAll = async () => {
    history.push({
      pathname: '/top-collection',
      state: {
        activeDays: activeDays,
        activeCollection: activeCollection,
        status: 1
      }
    });
  };

  return (
    <div
      className={
        seeAllPageState === 1
          ? 'mediaeye-layout-content top-collection-page'
          : 'top-collection-page'
      }
    >
      <div className="mediaeye-layout-section-header top-collection-page-header">
        <h2 className="mediaeye-layout-section-header-heading">
          Top Collections
        </h2>
        <div className="mediaeye-select-poptrend">
          {props.value === 'home' ? null : (
            <SelectSearch
              className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style"
              size="lg"
              options={collectionFilter}
              value={activeCollection}
              onChange={(opt) => handleSetActiveCollection(opt)}
            />
          )}
        </div>
        <div className="mediaeye-select-poptrend days-filter days-filter">
          <SelectSearch
            className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style"
            size="lg"
            options={daysFilterOption}
            value={activeDays}
            onChange={(opt) => handleSetActiveDays(opt)}
          />
        </div>
      </div>

      {loaderState === 1 ? (
        <>
          {topCollections?.length > 0 ? (
            <div className="mediaeye-collection2-row">
              {topCollections.map((collection, i) => (
                <CollectionCard2
                  collection={collection}
                  Activecollection={activeCollection}
                  key={i}
                  position={i + 1}
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray">No Data Available</div>
          )}
        </>
      ) : (
        <ItemLoader />
      )}

      <div className="m-t-20 text-center">
        {seeAllBtnStatus === 1 ? (
          <button
            className={
              seeAllBtnDesignState === 1
                ? 'btn btn-info btn-sm btn-more'
                : 'btn btn-transperant btn-sm btn-more'
            }
            onClick={() => {
              seeAll();
            }}
          >
            SEE ALL
          </button>
        ) : null}
      </div>
    </div>
  );
}
