import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import { GetDefaultImages } from '../../../blockchain/functions/Utils';
import CampaignSection from '../../Campaigns/CampaignSection';
import './AccountCampaign.scss';

export default function AccountCampaign(props) {
  const { user, isOwner } = props;
  const history = useHistory();
  const [searchInput, setSearchInput] = useState('');
  const [Charity, setCharity] = useState('All');
  const [taxReceipt, setTaxReceipt] = useState('All');
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
          content={user?.attributes?.username + ' Campaign | MEDIA EYE'}
        />
        <meta
          property="og:description"
          content={user?.attributes?.username + ' Campaign | MEDIA EYE'}
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
          content={user?.attributes?.username + ' Campaign | MEDIA EYE'}
        />
        <meta
          name="twitter:description"
          content={user?.attributes?.username + ' Campaign | MEDIA EYE'}
        />
        <meta
          name="twitter:image"
          content={
            user?.attributes?.profileImage
              ? user.attributes.profileImage._url
              : GetDefaultImages('USER')
          }
        />
        <title>{user?.attributes?.username + ' Campaign | MEDIA EYE'}</title>
        <meta
          name="description"
          content={user?.attributes?.username + ' Campaign | MEDIA EYE'}
        />
      </Helmet>
      <div className="account-campaign-page">
        <div className="account-campaign-page-searchBar">
          <div className="account-campaign-page-searchBar-left">
            {isOwner ? (
              <>
                <button
                  type="button"
                  className="btn btn-featured"
                  onClick={() => history.push('/feature-event')}
                >
                  Feature Campaign
                </button>
                <button
                  type="button"
                  className="btn btn-campaign"
                  onClick={() => history.push('/create-campaign')}
                >
                  Create campaign
                </button>
              </>
            ) : null}
          </div>
          <div className="mediaeye-searchbar">
            <input placeholder="Search" type="text" />
          </div>
        </div>
        <div className="account-campaign-page-inner">
          <CampaignSection />
        </div>
      </div>
    </>
  );
}
