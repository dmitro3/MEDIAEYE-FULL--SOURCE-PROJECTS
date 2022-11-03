import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import ProfileMain from '../components/Profile/ProfileMain/ProfileMain';
import Sidebar from '../components/Profile/Sidebar';
import { useMoralis } from 'react-moralis';
import { useHistory } from 'react-router-dom';
import { GetDefaultImages } from '../blockchain/functions/Utils';

const Profile = (props) => {
  const history = useHistory();
  const { closeNftCollapse } = props;
  const { user, isInitialized } = useMoralis();
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem('isLogin') ? localStorage.getItem('isLogin') : 'false'
  );

  useEffect(() => {
    if (isInitialized) {
      setIsLogin(localStorage.getItem('isLogin'));
    }
  }, [user, isInitialized]);

  useEffect(() => {
    if (isLogin === 'false' && isInitialized) {
      history.replace('/connect-wallet');
    }
  }, [isLogin, isInitialized]);

  const [username, setUsername] = useState('');
  const [userprofile, setUserProfile] = useState('');

  useEffect(() => {
    if (user) {
      setUsername(
        user?.attributes?.defaultUsername
          ? user?.attributes?.username
          : user?.attributes?.username
      );
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
        <meta property="og:url" content={window.location.origin + '/profile'} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={username + ' Profile | MEDIA EYE'} />
        <meta
          property="og:description"
          content="Offers users ability to interact with the blockchain, Metaverse and Web 3.0 all from a single user dashboard"
        />
        <meta property="og:image" content={userprofile} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="mediaeyenft.com/profile" />
        <meta
          property="twitter:url"
          content={window.location.origin + '/profile'}
        />
        <meta
          name="twitter:title"
          content={username + ' Profile | MEDIA EYE'}
        />
        <meta
          name="twitter:description"
          content="Offers users ability to interact with the blockchain, Metaverse and Web 3.0 all from a single user dashboard"
        />
        <meta name="twitter:image" content={userprofile} />
        <title>{username + ' Profile | MEDIA EYE'}</title>
        <meta
          name="description"
          content="Offers users ability to interact with the blockchain, Metaverse and Web 3.0 all from a single user dashboard"
        />
      </Helmet>
      <div
        onClick={closeNftCollapse}
        className="profile-page profile mediaeye-layout-content"
      >
        <div className="mediaeye-layout-middle">
          <div className="profile-page-content">
            <Sidebar />
            <ProfileMain />
          </div>
          {/* profile-page-section */}
        </div>
        {/* end contaniner */}
      </div>
    </React.Fragment>
  );
};

export default Profile;
