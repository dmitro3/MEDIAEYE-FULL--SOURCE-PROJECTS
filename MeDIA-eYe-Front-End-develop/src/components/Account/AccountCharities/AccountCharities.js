import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { GetDefaultImages } from '../../../blockchain/functions/Utils';
import CharitySection from '../../Charity/CharitySection/CharitySection';
import './AccountCharities.scss';
import { useSelector } from 'react-redux';
import { useMoralis } from 'react-moralis';
import { useHistory, useLocation } from 'react-router-dom';

const charities = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

const AccountCharities = () => {
  const { user, Moralis } = useMoralis();

  const [searchInput, setSearchInput] = useState('');
  const [Charity, setCharity] = useState('All');
  const [taxReceipt, setTaxReceipt] = useState('All');
  const activeNetwork = useSelector((state) => state.app.activeNetwork);
  const [activeTab, setActiveTab] = useState('pc');
  let history = useHistory();

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
          content={user?.attributes?.username + ' Charity | MEDIA EYE'}
        />
        <meta
          property="og:description"
          content={user?.attributes?.username + ' Charity | MEDIA EYE'}
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
          content={user?.attributes?.username + ' Charity | MEDIA EYE'}
        />
        <meta
          name="twitter:description"
          content={user?.attributes?.username + ' Charity | MEDIA EYE'}
        />
        <meta
          name="twitter:image"
          content={
            user?.attributes?.profileImage
              ? user.attributes.profileImage._url
              : GetDefaultImages('USER')
          }
        />
        <title>{user?.attributes?.username + ' Charity | MEDIA EYE'}</title>
        <meta
          name="description"
          content={user?.attributes?.username + ' Charity | MEDIA EYE'}
        />
      </Helmet>
      <div className="account-charity-page">
        <div className="account-charity-page-searchBar">
          <div className="mediaeye-searchbar">
            <input placeholder="Search" type="text" />
          </div>
        </div>
        <div className="account-charity-page-inner">
          <CharitySection
            type={Charity}
            taxReceipt={taxReceipt}
            searchInput={searchInput}
          />
        </div>
      </div>
    </>
  );
};

export default AccountCharities;
