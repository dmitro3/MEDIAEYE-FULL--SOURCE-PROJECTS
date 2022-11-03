import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import './AccountCollections.scss';
import { useHistory } from 'react-router-dom';
import { queryCollectionsByChain } from '../../../blockchain/functions/Collection';
import { useMoralis } from 'react-moralis';
import { ChainHexString } from '../../../blockchain/functions/ChangeChain/ChainHexStrings';
import CollectionCard from '../../ContentMarketplace/CollectionCard/CollectionCard';
import { GetDefaultImages } from '../../../blockchain/functions/Utils';
import { extraLength } from '../../../utils/functions';
const AccountCollections = (props) => {
  const theme = useSelector((state) => state.app.darkTheme);
  const [wallet] = useState('9999999999999999999999999999999');
  // const [activeTab, setActiveTab] = useState('owner');
  const dispatch = useDispatch();
  const [grid, setGrid] = useState('1');
  const [search, setSearch] = useState('');
  const [assetData, setAssetData] = useState([]);
  const [copyWallet, setCopyWallet] = useState(false);
  const [assignedMinter, setAssignedMinter] = useState(false);
  const [collections, setCollections] = useState([]);
  const [activeBtn, setActiveBtn] = useState();
  const { Moralis, isInitialized } = useMoralis();
  const { user, isOwner } = props;

  const activeNetwork = useSelector((state) => state.app.activeNetwork);

  useEffect(() => {
    if (user && activeNetwork) {
      queryCollectionList();
    }
  }, [activeNetwork, user]);

  let history = useHistory();
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
            '/collections'
          }
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={user?.attributes?.username + ' Collections | MEDIA EYE'}
        />
        <meta
          property="og:description"
          content={user?.attributes?.username + ' Collections | MEDIA EYE'}
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
            '/collections'
          }
        />
        <meta
          property="twitter:url"
          content={
            window.location.origin +
            '/account/' +
            user?.attributes?.ethAddress +
            '/collections'
          }
        />
        <meta
          name="twitter:title"
          content={user?.attributes?.username + ' Collections | MEDIA EYE'}
        />
        <meta
          name="twitter:description"
          content={user?.attributes?.username + ' Collections | MEDIA EYE'}
        />
        <meta
          name="twitter:image"
          content={
            user?.attributes?.profileImage
              ? user.attributes.profileImage._url
              : GetDefaultImages('USER')
          }
        />
        <title>{user?.attributes?.username + ' Collections | MEDIA EYE'}</title>
        <meta
          name="description"
          content={user?.attributes?.username + ' Collections | MEDIA EYE'}
        />
      </Helmet>
      <div className="account-collection-page">
        {isOwner ? (
          <div className="account-collection-page-headerbtn">
            {user?.attributes?.subscriptionLevel === 0 ? (
              <Link
                to="/create/collection"
                className="btn btn-creative"
                data-html={true}
                data-class="mediaeyetooltip"
                data-tip="<span class='text-info'>Level 1</span>  Subscription or higher </br> required to mint a collection"
              >
                Mint Collection
              </Link>
            ) : (
              <>
                <Link to="/create/collection" className="btn btn-creative">
                  Mint Collection
                </Link>
                <Link
                  to="/create/generative/collection"
                  className="btn btn-generative m-l-15"
                >
                  Create Generative collection
                </Link>
                <Link to="/create/jumbomint" className="btn btn-jumbo m-l-15">
                  Create Jumbo collection
                </Link>
              </>
            )}
            {collections.length > 1 ? (
              <Link
                to="/feature-collection"
                className="btn btn-featured m-l-15"
              >
                Feature Collection
              </Link>
            ) : null}
          </div>
        ) : null}
        <div className="account-collection-page-filters">
          <div className="account-collection-page-filters-left">
            <div className="filter-action-row">
              <button
                className={
                  activeBtn === 'active'
                    ? 'filter-action-row-btn active'
                    : 'filter-action-row-btn'
                }
                id="active"
                onClick={() => setActiveBtn('active')}
              >
                Active
              </button>
              {isOwner ? (
                <button
                  className={
                    activeBtn === 'hidden'
                      ? 'filter-action-row-btn active'
                      : 'filter-action-row-btn'
                  }
                  id="hidden"
                  onClick={() => setActiveBtn('hidden')}
                >
                  Hidden
                </button>
              ) : null}
              <button
                className={
                  activeBtn === 'grouped'
                    ? 'filter-action-row-btn active'
                    : 'filter-action-row-btn'
                }
                id="grouped"
                onClick={() => setActiveBtn('grouped')}
              >
                Grouped
              </button>
            </div>
          </div>
          <div className="account-collection-page-filters-right">
            <div className="mediaeye-searchbar">
              <input placeholder="Search" type="text" />
            </div>
          </div>
        </div>
        <div className="account-collection-page-content">
          {collections.length === 0 ? (
            <div className="mediaeyeEmpty">
              <div className="mediaeyeEmpty-message">
                {user?.attributes?.username} doesn't have collections yet
              </div>
            </div>
          ) : (
            <div className="mediaeye-collection-row" extraLength={extraLength(collections, 3)}>
              {collections.map((collection, index) => (
                <CollectionCard key={index} collection={collection} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AccountCollections;
