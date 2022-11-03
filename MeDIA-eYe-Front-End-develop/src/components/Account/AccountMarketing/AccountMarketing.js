import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import './AccountMarketing.scss';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { Pagination } from 'swiper';
import {
  CollectionSmallJson,
  EventSmallJson,
  AirdropSmallJson
} from '../../../utils/JsonData';
import { useHistory } from 'react-router-dom';
import { queryCollectionsByChain } from '../../../blockchain/functions/Collection';
import { useMoralis } from 'react-moralis';
import { ChainHexString } from '../../../blockchain/functions/ChangeChain/ChainHexStrings';
import { GetDefaultImages } from '../../../blockchain/functions/Utils';
import EventCardSmall from './EventCardSmall';
import AirdropCardSmall from './AirdropCardSmall';
import CollectionCardSmall from './CollectionCardSmall';
import EventSlider from './EventSlider';
import FeaturedAirdop from '../../Airdrop/FeaturedAirdop/FeaturedAirdop';

const settings = {
  slidesPerView: 3,
  grabCursor: true,
  modules: [Pagination],
  pagination: {
    el: '.account-marketing-pagination',
    enable: true,
    clickable: true
  },
  breakpoints: {
    889: {
      slidesPerView: 1
    },
    1181: {
      slidesPerView: 2
    },
    1280: {
      slidesPerView: 3
    }
  }
};

const AccountMarketing = (props) => {
  const collectionData = CollectionSmallJson();
  const eventData = EventSmallJson();
  const airdropData = AirdropSmallJson();
  const [search, setSearch] = useState('');
  const [assetData, setAssetData] = useState([]);
  const [copyWallet, setCopyWallet] = useState(false);
  const [collections, setCollections] = useState([]);
  const [activeBtn, setActiveBtn] = useState('all');
  const { Moralis, isInitialized } = useMoralis();
  const { user, isOwner } = props;

  const activeNetwork = useSelector((state) => state.app.activeNetwork);

  useEffect(() => {
    if (user && activeNetwork) {
      queryCollectionList();
    }
  }, [activeNetwork, user]);

  const queryCollectionList = async () => {
    if (user) {
      const params = {
        chain: ChainHexString(activeNetwork),
        userAddress: user?.attributes?.ethAddress
      };
      if (!isOwner) {
        params['hidden'] = false;
      }
      const result = await queryCollectionsByChain(Moralis, params);
      setCollections(result);
      setAssetData(result);
      setCollections(result);
    }
  };

  const searchChange = () => {
    const value = search.trim().toLowerCase();
    const currentList = collections.filter((asset) =>
      asset.attributes.name.toLowerCase().includes(value)
    );

    if (value === '') {
      return setCollections(assetData);
    }

    if (currentList.length > 0) {
      return setCollections(currentList);
    }
    return setCollections([]);
  };

  useEffect(async () => {
    searchChange();
  }, [search]);

  useEffect(() => {
    if (copyWallet === true) {
      setTimeout(() => {
        setCopyWallet(false);
      }, 3000);
    }
  }, [user]);

  return (
    <>
      <Helmet>
        <meta
          property="og:url"
          content={
            window.location.origin +
            '/account/' +
            user?.attributes?.ethAddress +
            '/marketing'
          }
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={user?.attributes?.username + ' Marketing | MEDIA EYE'}
        />
        <meta
          property="og:description"
          content={user?.attributes?.username + ' Marketing | MEDIA EYE'}
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
            '/marketing'
          }
        />
        <meta
          property="twitter:url"
          content={
            window.location.origin +
            '/account/' +
            user?.attributes?.ethAddress +
            '/marketing'
          }
        />
        <meta
          name="twitter:title"
          content={user?.attributes?.username + ' Marketing | MEDIA EYE'}
        />
        <meta
          name="twitter:description"
          content={user?.attributes?.username + ' Marketing | MEDIA EYE'}
        />
        <meta
          name="twitter:image"
          content={
            user?.attributes?.profileImage
              ? user.attributes.profileImage._url
              : GetDefaultImages('USER')
          }
        />
        <title>{user?.attributes?.username + ' Marketing | MEDIA EYE'}</title>
        <meta
          name="description"
          content={user?.attributes?.username + ' Marketing | MEDIA EYE'}
        />
      </Helmet>
      <div className="account-marketing-page">
        {isOwner ? (
          <div className="account-marketing-page-headerbtn">
            <Link to="/feature-nft" className="btn btn-featured ">
              Feature my content
            </Link>
            <Link to="/create-campaign" className="btn btn-creative m-l-15">
              Create campaign
            </Link>
          </div>
        ) : null}
        <div className="account-marketing-page-filters">
          <div className="account-marketing-page-filters-left">
            <div className="filter-action-row">
              <button
                className={
                  activeBtn === 'all'
                    ? 'filter-action-row-btn active'
                    : 'filter-action-row-btn'
                }
                id="all"
                onClick={() => setActiveBtn('all')}
              >
                All
              </button>
              {isOwner ? (
                <button
                  className={
                    activeBtn === 'campaigns'
                      ? 'filter-action-row-btn active'
                      : 'filter-action-row-btn'
                  }
                  id="campaigns"
                  onClick={() => setActiveBtn('campaigns')}
                >
                  Campaigns
                </button>
              ) : null}
              <button
                className={
                  activeBtn === 'events'
                    ? 'filter-action-row-btn active'
                    : 'filter-action-row-btn'
                }
                id="events"
                onClick={() => setActiveBtn('events')}
              >
                Events
              </button>
              <button
                className={
                  activeBtn === 'airdrops'
                    ? 'filter-action-row-btn active'
                    : 'filter-action-row-btn'
                }
                id="airdrops"
                onClick={() => setActiveBtn('airdrops')}
              >
                Airdrops
              </button>
            </div>
          </div>
          {/* <div className="account-marketing-page-filters-right">
            <div className="mediaeye-searchbar">
              <input placeholder="Search" type="text" />
            </div>
          </div> */}
        </div>
        <div className="account-marketing-page-content">
          {/* <div className="account-marketing-page-content-empty">
              User doesn't have Campaigns yet
            </div> */}

          {activeBtn == 'campaigns' ? (
            <>
              <div className="account-marketing-page-content-title">
                <h2>Campaigns</h2>
              </div>
              <div className="account-marketing-page-content-box">
                <h3 className="account-marketing-page-content-box-heading">
                  My Campaigns
                </h3>
                <div className="account-marketing-page-content-box-row">
                  <div className="account-marketing-page-content-box-row-block">
                    <h5>Event</h5>
                    {eventData.map((event, i) => (
                      <EventCardSmall event={event} key={i} />
                    ))}
                  </div>
                  <div className="account-marketing-page-content-box-row-block">
                    <h5>Airdrop</h5>
                    {airdropData.map((airdrop, i) => (
                      <AirdropCardSmall airdrop={airdrop} key={i} />
                    ))}
                  </div>
                </div>
                <div className="account-marketing-page-content-box-row nogr">
                  <h5 className="m-l-10">NFT / Collection</h5>
                  <Swiper {...settings}>
                    {collectionData.map((collection, i) => (
                      <SwiperSlide key={collection.id}>
                        <div className="account-marketing-page-content-box-row-block">
                          <CollectionCardSmall
                            collection={collection}
                            key={i}
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                    <div className="mediaeye-swiper-pagination account-marketing-pagination"></div>
                  </Swiper>
                </div>
              </div>
            </>
          ) : activeBtn == 'events' ? (
            <div className="account-marketing-page-content-row">
              <h3 className="account-marketing-page-content-row-heading">
                Events
              </h3>
              <div className="account-marketing-page-content-row-content">
                <EventSlider />
              </div>
            </div>
          ) : activeBtn == 'airdrops' ? (
            <div className="account-marketing-page-content-row">
              <h3 className="account-marketing-page-content-row-heading">
                Airdrops
              </h3>
              <div className="account-marketing-page-content-row-content">
                <FeaturedAirdop />
              </div>
            </div>
          ) : activeBtn == 'all' ? (
            <>
              <div className="account-marketing-page-content-title">
                <h2>Campaigns</h2>
              </div>
              <div className="account-marketing-page-content-box">
                <h3 className="account-marketing-page-content-box-heading">
                  My Campaigns
                </h3>
                <div className="account-marketing-page-content-box-row">
                  <div className="account-marketing-page-content-box-row-block">
                    <h5>Event</h5>
                    {eventData.map((event, i) => (
                      <EventCardSmall event={event} key={i} />
                    ))}
                  </div>
                  <div className="account-marketing-page-content-box-row-block">
                    <h5>Airdrop</h5>
                    {airdropData.map((airdrop, i) => (
                      <AirdropCardSmall airdrop={airdrop} key={i} />
                    ))}
                  </div>
                </div>
                <div className="account-marketing-page-content-box-row nogr">
                  <h5 className="m-l-10">NFT / Collection</h5>
                  <Swiper {...settings}>
                    {collectionData.map((collection, i) => (
                      <SwiperSlide key={collection.id}>
                        <div className="account-marketing-page-content-box-row-block">
                          <CollectionCardSmall
                            collection={collection}
                            key={i}
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                    <div className="mediaeye-swiper-pagination account-marketing-pagination"></div>
                  </Swiper>
                </div>
              </div>
              <div className="account-marketing-page-content-row">
                <h3 className="account-marketing-page-content-row-heading">
                  Events
                </h3>
                <div className="account-marketing-page-content-row-content">
                  <EventSlider />
                </div>
              </div>
              <div className="account-marketing-page-content-row">
                <h3 className="account-marketing-page-content-row-heading">
                  Airdrops
                </h3>
                <div className="account-marketing-page-content-row-content">
                  <FeaturedAirdop />
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default AccountMarketing;
