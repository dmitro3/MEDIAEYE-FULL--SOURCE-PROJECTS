import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { scroller } from 'react-scroll';
import '../../Account/AccountMenu/AccountMenu.scss';
import AccountOwned from '../../Account/AccountOwned/AccountOwned';
import AccountFavorite from '../../Account/AccountFavorite/AccountFavorite';
import AccountCollections from '../../Account/AccountCollections/AccountCollections';
import AccountListings from '../../Account/AccountListings/AccountListings';
import AccountActivity from '../../Account/AccountActivity/AccountActivity';
import AccountMarketing from '../../Account/AccountMarketing/AccountMarketing';
import AccountCampaign from '../../Account/AccountCampaign/AccountCampaign';
import AccountCharities from '../../Account/AccountCharities/AccountCharities';
import AccountAirdrops from '../../Account/AccountAirdrops/AccountAirdrops';
import Tabs from '../../Common/AnimatedTab/Tabs';
const CreatorMenu = (props) => {
  const { page, userAddress } = useParams();
  const { active, user } = props;
  const history = useHistory();
  const [activeTab, setActiveTab] = useState(0);
  const [activeTabValue, setactiveTabValue] = useState('NFTs');
  const tabs = [
    'NFTs',
    'Campaigns',
    'Listings',
    'Collections',
    'Favorites',
    'Activity',
    'Airdrops',
    'Charity'
  ];
  const openAccountTabs = (tab) => {
    setactiveTabValue(tab);
    if (page) {
      history.replace(`/account/${userAddress}/${tab}`);
    }
  };
  useEffect(() => {
    if (page) {
      setactiveTabValue(page);
      scroller.scrollTo('mediaeye-account-page-menu');
      setActiveTab(tabs.indexOf(page));
    }
  }, [page]);


  const onTabChange = (index) => {
    if (activeTab !== index) {
      setActiveTab(index);
      openAccountTabs(tabs[index]);
    }
  };

  const activeComponent = {
    Listings: <AccountListings id={'creator'} user={user} />,
    NFTs: <AccountOwned id={'creator'} user={user} />,
    Favorites: <AccountFavorite id={'creator'} user={user} />,
    Collections: <AccountCollections id={'creator'} user={user} />,
    Events: <AccountActivity id={'creator'} user={user} />,
    Airdrops: <AccountAirdrops id={'creator'} user={user} />,
    Campaigns: <AccountCampaign id={'creator'} user={user} />,
    Charity: <AccountCharities id={'creator'} user={user} />
  };

  return (
    <div className="mediaeye-layout-container meanu-page">
      <div className="mediaeye-tabss">
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={onTabChange} />
      </div>
      {activeComponent[activeTabValue]}
    </div>
  );
};

export default CreatorMenu;
