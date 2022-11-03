import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import ProfileSupportMain from '../components/Profile/ProfileSupport/ProfileSupport';
import Sidebar from '../components/Profile/Sidebar';
import { useMoralis } from 'react-moralis';
import { useHistory } from 'react-router-dom';
import { GetDefaultImages } from '../blockchain/functions/Utils';

const ProfileSupport = (props) => {
  const { closeNftCollapse } = props;
  const { user } = useMoralis();
  const history = useHistory();
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem('isLogin') ? localStorage.getItem('isLogin') : 'false'
  );

  useEffect(() => {
    setIsLogin(localStorage.getItem('isLogin'));
  }, [user]);

  useEffect(() => {
    if (isLogin === 'false') {
      history.replace('/connect-wallet');
    }
  });

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
    <React.Fragment>
      <Helmet>
        <meta
          property="og:url"
          content={window.location.origin + '/profile/support'}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Support is Here to Help | MEDIA EYE"
        />
        <meta
          property="og:description"
          content="MEDIA EYE Support services are open 24/7, we want to ensure that our users know we are always here for them!"
        />
        <meta property="og:image" content={userprofile} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:domain"
          content="mediaeyenft.com/profile/support"
        />
        <meta
          property="twitter:url"
          content={window.location.origin + '/profile/support'}
        />
        <meta
          name="twitter:title"
          content="Support is Here to Help | MEDIA EYE"
        />
        <meta
          name="twitter:description"
          content="MEDIA EYE Support services are open 24/7, we want to ensure that our users know we are always here for them!"
        />
        <meta name="twitter:image" content={userprofile} />
        <title>Support is Here to Help | MEDIA EYE</title>
        <meta
          name="description"
          content="MEDIA EYE Support services are open 24/7, we want to ensure that our users know we are always here for them!"
        />
      </Helmet>
      <div
        onClick={closeNftCollapse}
        className="profile-page profile mediaeye-layout-content"
      >
        <div className="mediaeye-layout-middle">
          <div className="profile-page-content">
            <Sidebar />
            <ProfileSupportMain />
          </div>
          {/* profile-page-section */}
        </div>
        {/* end contaniner */}
      </div>
    </React.Fragment>
  );
};

export default ProfileSupport;
