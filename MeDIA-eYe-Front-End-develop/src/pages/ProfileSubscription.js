import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import ProfileSubscriptionMain from '../components/Profile/ProfileSubscription';
import Sidebar from '../components/Profile/Sidebar';
import SubscriptionPopup from '../components/Profile/FeaturePopup/SubscriptionPopup';
import SubscriptionPopupProvider from '../context/SubscriptionPopupContext';
import { GetDefaultImages } from '../blockchain/functions/Utils';
import { useMoralis } from 'react-moralis';

const ProfileSubscription = (props) => {
  const { closeNftCollapse } = props;
  const { user } = useMoralis();
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const [userprofile, setUserProfile] = useState('');
  useEffect(() => {
    if (user) {
      setUserProfile(
        user?.attributes?.profileImage
          ? user.attributes.profileImage._url
          : GetDefaultImages('USER')
      );
    }
  }, [user]);

  return (
    <SubscriptionPopupProvider>
      <React.Fragment>
        <Helmet>
          <meta
            property="og:url"
            content={window.location.origin + '/profile/subscription'}
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:title"
            content="First Cross Chain Subscription Service | MEDIA EYE "
          />
          <meta
            property="og:description"
            content="with MEDIA EYE Subscription services, users are offered a cost effective way to gain access to a range of services across all blockchains where MEDIA EYE operates, one payment unlocks services across all related blockchain networks."
          />
          <meta property="og:image" content={userprofile} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            property="twitter:domain"
            content="mediaeyenft.com/profile/subscription"
          />
          <meta
            property="twitter:url"
            content={window.location.origin + '/profile/subscription'}
          />
          <meta
            name="twitter:title"
            content="First Cross Chain Subscription Service | MEDIA EYE "
          />
          <meta
            name="twitter:description"
            content="with MEDIA EYE Subscription services, users are offered a cost effective way to gain access to a range of services across all blockchains where MEDIA EYE operates, one payment unlocks services across all related blockchain networks."
          />
          <meta name="twitter:image" content={userprofile} />
          <title>First Cross Chain Subscription Service | MEDIA EYE </title>
          <meta
            name="description"
            content="with MEDIA EYE Subscription services, users are offered a cost effective way to gain access to a range of services across all blockchains where MEDIA EYE operates, one payment unlocks services across all related blockchain networks."
          />
        </Helmet>
        <div
          onClick={closeNftCollapse}
          className="profile-page mediaeye-layout-content"
        >
          <SubscriptionPopup showPopup={showPopup} togglePopup={togglePopup} />
          <div className="mediaeye-layout-middle">
            <div className="profile-page-content">
              <Sidebar />
              <ProfileSubscriptionMain togglePopup={togglePopup} />
            </div>
            {/* profile-page-section */}
          </div>
          {/* end contaniner */}
        </div>
      </React.Fragment>
    </SubscriptionPopupProvider>
  );
};

export default ProfileSubscription;
