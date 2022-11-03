import React, { useEffect, useState } from 'react';
// import './AccountMenu.scss';
import { useHistory, useParams } from 'react-router-dom';
import { scroller } from 'react-scroll';
import AccountOwned from '../AccountOwned/AccountOwned';
import AccountFavorite from '../AccountFavorite/AccountFavorite';
import AccountCollections from '../AccountCollections/AccountCollections';
import AccountListings from '../AccountListings/AccountListings';
import AccountEvents from '../AccountEvents/AccountEvents';
import AccountAirdrops from '../AccountAirdrops/AccountAirdrops';
import AccountCharities from '../AccountCharities/AccountCharities';
import AccountActivity from '../AccountActivity/AccountActivity';
import AccountMarketing from '../AccountMarketing/AccountMarketing';
import AccountCampaign from '../AccountCampaign/AccountCampaign';
import Tabs from '../../Common/AnimatedTab/Tabs';

const AccountMenu = (props) => {
  const { active, user, isOwner } = props;
  const { page, userAddress } = useParams();
  const history = useHistory();

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
  const [activeTab, setActiveTab] = useState(0);


  const [activeTabValue, setactiveTabValue] = useState(
    active ? active : 'NFTs'
  );

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

  const activeComponent = {
    NFTs: (
      <AccountOwned
        user={user}
        isOwner={isOwner}
        activeTabValue={activeTabValue}
        isBundles={true}
      />
    ),
    Listings: <AccountListings user={user} isOwner={isOwner} />,
    Collections: <AccountCollections user={user} isOwner={isOwner} />,
    Favorites: <AccountFavorite user={user} isOwner={isOwner} />,
    Activity: <AccountActivity user={user} isOwner={isOwner} />,
    Events: <AccountEvents user={user} isOwner={isOwner} />,
    Airdrops: <AccountAirdrops user={user} isOwner={isOwner} />,
    Charities: <AccountCharities user={user} isOwner={isOwner} />,
    Airdrops: <AccountAirdrops user={user} isOwner={isOwner} />,
    Campaigns: <AccountCampaign user={user} isOwner={isOwner} />,
    Charity: <AccountCharities user={user} isOwner={isOwner} />
  };

  const onTabChange = (index) => {
    if (activeTab !== index) {
      setActiveTab(index);
      openAccountTabs(tabs[index]);
    }
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

export default AccountMenu;
