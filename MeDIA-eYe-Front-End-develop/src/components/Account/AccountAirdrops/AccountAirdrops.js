import React from 'react';
import './AccountAirdrops.scss';
import { useMoralis } from 'react-moralis';
import { Helmet } from 'react-helmet';
import { GetDefaultImages } from '../../../blockchain/functions/Utils';
import { useHistory } from 'react-router-dom';
import SpotlightAirdrop from '../../Airdrop/SpotlightAirdrop';
const AccountAirdrops = (props) => {
  const { user, isOwner } = props;
  const history = useHistory();

  return (
    <>
      <Helmet>
        <meta
          property="og:url"
          content={
            window.location.origin +
            '/account/' +
            user?.attributes?.ethAddress +
            '/Airdrops'
          }
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={user?.attributes?.username + ' Airdrops | MEDIA EYE'}
        />
        <meta
          property="og:description"
          content={user?.attributes?.username + ' Airdrops | MEDIA EYE'}
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
            '/Airdrops'
          }
        />
        <meta
          property="twitter:url"
          content={
            window.location.origin +
            '/account/' +
            user?.attributes?.ethAddress +
            '/Airdrops'
          }
        />
        <meta
          name="twitter:title"
          content={user?.attributes?.username + ' Airdrops | MEDIA EYE'}
        />
        <meta
          name="twitter:description"
          content={user?.attributes?.username + ' Airdrops | MEDIA EYE'}
        />
        <meta
          name="twitter:image"
          content={
            user?.attributes?.profileImage
              ? user.attributes.profileImage._url
              : GetDefaultImages('USER')
          }
        />
        <title>{user?.attributes?.username + ' Airdrops | MEDIA EYE'}</title>
        <meta
          name="description"
          content={user?.attributes?.username + ' Airdrops | MEDIA EYE'}
        />
      </Helmet>
      <div className="account-airdrops-page">
        <div className="account-airdrops-page-searchBar">
          <div className="account-airdrops-page-searchBar-left">
            {isOwner ? (
              <>
                <button
                  type="button"
                  className="btn btn-featured"
                  onClick={() => history.push('/feature-airdrop')}
                >
                  Feature Airdrop
                </button>
                <button
                  type="button"
                  className="btn btn-campaign"
                  onClick={() => history.push('/airdrop/launch')}
                >
                  Create Airdrop
                </button>
              </>
            ) : null}
          </div>
          <div className="mediaeye-searchbar">
            <input placeholder="Search" type="text" />
          </div>
        </div>
        <div className="account-airdrops-page-inner">
          <SpotlightAirdrop type="slider" />
        </div>
      </div>
    </>
  );
};

export default AccountAirdrops;
