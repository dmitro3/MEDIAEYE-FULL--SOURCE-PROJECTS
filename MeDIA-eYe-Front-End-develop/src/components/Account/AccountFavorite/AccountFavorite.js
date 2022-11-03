import React, { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';
import { useSelector } from 'react-redux';
import { components } from 'react-select';
import { Helmet } from 'react-helmet';
import { default as ReactSelect } from 'react-select';
import './AccountFavorite.scss';
import { useHistory } from 'react-router-dom';
import ExploreBlock from '../../ContentMarketplace/ExploreBlock/ExploreBlock';
import { queryFavourites } from '../../../blockchain/functions/Likes';
import { FavoritesJson } from '../../../utils/JsonData';
import { formatListingNFT } from '../../../utils/FormatListingNFT';
import { GetDefaultImages } from '../../../blockchain/functions/Utils';
import { formatNFTDisplay } from '../../../utils/FormatNFTDisplay';

const AccountFavorite = (props) => {
  const darkTheme = useSelector((state) => state.app.darkTheme);
  const activeNetwork = useSelector((state) => state.app.activeNetwork);
  const { Moralis, isInitialized } = useMoralis();
  const { user, isOwner } = props;
  const [showPopup, setShowPopup] = useState(false);
  let history = useHistory();
  const [showPopupBid, setShowPopupBid] = useState(false);
  const [wallet] = useState('9999999999999999999999999999999');
  const [favorites, setFavorites] = useState([]);
  const [favoritesNfts, setFavoritesNfts] = useState([]);
  const [popupInfo, setPopupInfo] = useState(null);
  const [activeTab, setActiveTab] = useState('single');
  const [activeBtn, setActiveBtn] = useState();
  const [single, setSingle] = useState('All Items');
  const FavoritesJsonData = FavoritesJson();
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const togglePopupBid = () => {
    setShowPopupBid(!showPopupBid);
  };

  const insertPopupInfo = (currListing, paymentRequest, nft) => {
    const key = currListing?.attributes?.listingId ?? '';
    setPopupInfo({
      key,
      currListing,
      paymentRequest,
      nft
    });
  };

  const getFavourites = async () => {
    const type =
      activeBtn === 'auctions'
        ? 'auction'
        : activeBtn === 'fixedPrice'
          ? 'listing'
          : null;
    const status =
      activeBtn === 'active'
        ? 'available'
        : activeBtn === 'expired'
          ? 'cancelled'
          : null;
    const size =
      single === 'Single' ? 'single' : single === 'Bundle' ? 'bundle' : null;
    if (user?.id) {
      // get liked nfts with listings
      const filter = {
        // status,
        // type,
        // size,
        userId: user?.id
      };
      const result = await queryFavourites(Moralis, activeNetwork, filter);

      setFavorites(result);
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
  useEffect(() => {
    if (isInitialized && activeNetwork) getFavourites();
  }, [isInitialized, activeNetwork, activeBtn, single]);

  const focusActiveTab = (e) => {
    setActiveTab(e.currentTarget.id);
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
            '/favorites'
          }
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={user?.attributes?.username + ' Favorites | MEDIA EYE'}
        />
        <meta
          property="og:description"
          content={user?.attributes?.username + ' Favorites'}
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
            '/favorites'
          }
        />
        <meta
          property="twitter:url"
          content={
            window.location.origin +
            '/account/' +
            user?.attributes?.ethAddress +
            '/favorites'
          }
        />
        <meta
          name="twitter:title"
          content={user?.attributes?.username + ' Favorites | MEDIA EYE'}
        />
        <meta
          name="twitter:description"
          content={user?.attributes?.username + ' Favorites'}
        />
        <meta
          name="twitter:image"
          content={
            user?.attributes?.profileImage
              ? user.attributes.profileImage._url
              : GetDefaultImages('USER')
          }
        />
        <title>{user?.attributes?.username + ' Favorites | MEDIA EYE'}</title>
        <meta
          name="description"
          content={user?.attributes?.username + ' Favorites'}
        />
      </Helmet>
      <div className="account-favorite-page">
        <div className="account-favorite-page-filter">
          <div className="account-favorite-page-filter-right">
            <div className="mediaeye-searchbar">
              <input placeholder="Search" type="text" />
            </div>
          </div>
        </div>

        <div className="account-favorite-page-content">
          {favorites.length === 0 ? (
            <div className="mediaeyeEmpty">
              <div className="mediaeyeEmpty-message">
                {user?.attributes?.username} doesn't have Favorites yet
              </div>
            </div>
          ) : (
            <div className="mediaeye-nft-row">
              {favorites.map((fav, index) => (
                <ExploreBlock key={index} product={formatNFTDisplay(fav)} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AccountFavorite;
