import React, { useEffect, useState, useRef } from 'react';
import './AccountListings.scss';
import { Helmet } from 'react-helmet';
import ExploreBlock from '../../ContentMarketplace/ExploreBlock/ExploreBlock';
import { queryListings } from '../../../blockchain/functions/Marketplace';
import { useMoralis } from 'react-moralis';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ChainHexString } from '../../../blockchain/functions/ChangeChain/ChainHexStrings';
import { useIsVisible } from 'react-is-visible';
import { formatListingNFT } from '../../../utils/FormatListingNFT';
import { GetDefaultImages } from '../../../blockchain/functions/Utils';
import { components } from 'react-select';
import { default as ReactSelect } from 'react-select';

const productPerPage = 8;

const AccountListings = (props) => {
  const { Moralis, isInitialized } = useMoralis();
  const [listings, setListings] = useState([]);
  const [activeTab, setActiveTab] = useState('active');
  const [activeBtn, setActiveBtn] = useState('active');
  const [search, setSearch] = useState('');
  const [assetData, setAssetData] = useState([]);
  const [listingNFTs, setListingNFTs] = useState([]);
  const [single, setSingle] = useState('All Item');
  const ListDesp = listings.map((listing, index) => listing.title.join(''));
  const activeNetwork = useSelector((state) => state.app.activeNetwork);

  const [productToShow, setproductToShow] = useState([]);
  const [next, setNext] = useState(8);
  const anchorVisible = useRef();
  const isVisible = useIsVisible(anchorVisible);

  const { user, isOwner, isBundles } = props;
  let history = useHistory();

  const queryListingsList = async () => {
    if (user) {
      const result = await queryListings(Moralis, {
        user: user.attributes.ethAddress,
        chainId: ChainHexString(activeNetwork),
        bundle: isBundles,
        status: activeTab === 'active' ? 'available' : 'complete'
      });

      let newProducts = [];
      for (let i = 0; i < result[0].length; i++) {
        newProducts.push(formatListingNFT(result[0][i], result[1][i]));
      }
      // await setListingNFTs();
      setListings(newProducts);
      setAssetData(newProducts);
    }
  };

  const showListings = () => {
    return listings.map((listing, index) => (
      <ExploreBlock
        enableLastOffer={true}
        key={index}
        product={listing}
      ></ExploreBlock>
    ));
  };

  const searchChange = () => {
    const value = search.trim().toLowerCase();
    const currentList = listings.filter((asset) =>
      asset.attributes.nft.attributes.name.toLowerCase().includes(value)
    );

    if (value === '') {
      return setListings(assetData);
    }

    if (currentList.length > 0) {
      return setListings(currentList);
    }
    return setListings([]);
  };

  useEffect(async () => {
    searchChange();
  }, [search]);

  useEffect(() => {
    if (user && activeNetwork) {
      queryListingsList();
    }
  }, [activeNetwork, user, isBundles, activeTab]);

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
  const allItems = [
    { value: 'Single', label: 'Single' },
    { value: 'Bundle', label: 'Bundle' }
  ];
  const Option = (props) => {
    return (
      <div>
        <components.Option {...props}>
          <label>{props.label}</label>
        </components.Option>
      </div>
    );
  };
  const handleChange = (selected) => {
    if (selected.value === 'Single') {
      setSingle('Single');
    } else {
      setSingle('Bundle');
    }
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
            '/listings'
          }
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={user?.attributes?.username + ' Listings | MEDIA EYE'}
        />
        <meta
          property="og:description"
          content={user?.attributes?.username + ' ' + ListDesp.toString()}
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
            '/listings'
          }
        />
        <meta
          property="twitter:url"
          content={
            window.location.origin +
            '/account/' +
            user?.attributes?.ethAddress +
            '/listings'
          }
        />
        <meta
          name="twitter:title"
          content={user?.attributes?.username + ' Listings | MEDIA EYE'}
        />
        <meta
          name="twitter:description"
          content={user?.attributes?.username + ' ' + ListDesp.toString()}
        />
        <meta
          name="twitter:image"
          content={
            user?.attributes?.profileImage
              ? user.attributes.profileImage._url
              : GetDefaultImages('USER')
          }
        />
        <title>{user?.attributes?.username + ' Listings | MEDIA EYE'}</title>
        <meta
          name="description"
          content={user?.attributes?.username + ' ' + ListDesp.toString()}
        />
      </Helmet>
      <div className="account-listings-page">
        {isOwner && listings.length >= 1 ? (
          <div className="account-listings-page-headerbtns">
            <button
              type="button"
              className="btn btn-featured"
              onClick={() => history.push('/feature-listing')}
            >
              Feature NFT
            </button>
          </div>
        ) : null}
        <div className="account-listings-page-filter">
          <div className="account-listings-page-filter-left">
            <ReactSelect
              options={allItems}
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
              components={{
                Option
              }}
              onChange={(selected) => handleChange(selected)}
              allowSelectAll={true}
              placeholder={single}
              controlShouldRenderValue={false}
              styles={reactSelectStyles}
            />
            <div className="filter-action-row">
              <button
                type="button"
                className={
                  activeBtn === 'fixedPrice'
                    ? 'filter-action-row-btn active'
                    : 'filter-action-row-btn'
                }
                id="fixedPrice"
                onClick={() => setActiveBtn('fixedPrice')}
              >
                Fixed Price
              </button>
              <button
                type="button"
                className={
                  activeBtn === 'hasOffers'
                    ? 'filter-action-row-btn active'
                    : 'filter-action-row-btn'
                }
                id="hasOffers"
                onClick={() => setActiveBtn('hasOffers')}
              >
                Has Offers
              </button>
              <button
                type="button"
                className={
                  activeBtn === 'auctions'
                    ? 'filter-action-row-btn active'
                    : 'filter-action-row-btn'
                }
                id="auctions"
                onClick={() => setActiveBtn('auctions')}
              >
                Auctions
              </button>
              <button
                type="button"
                className={
                  activeBtn === 'hasBids'
                    ? 'filter-action-row-btn active'
                    : 'filter-action-row-btn'
                }
                id="hasBids"
                onClick={() => setActiveBtn('hasBids')}
              >
                Has Bids
              </button>
            </div>
          </div>
          <div className="account-listings-page-filter-right">
            <div className="mediaeye-searchbar">
              <input placeholder="Search" type="text" />
            </div>
          </div>
        </div>
        <div className="account-listings-page-cardss mediaeye-nft-row">
          {listings.length === 0 ? (
            <div className="mediaeyeEmpty">
              <div className="mediaeyeEmpty-message">
                {user?.attributes?.username} doesn't have Listings yet
              </div>
            </div>
          ) : (
            showListings()
          )}
        </div>
      </div>
    </>
  );
};

export default AccountListings;
