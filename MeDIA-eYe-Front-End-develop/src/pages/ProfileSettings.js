import React, { useState, useEffect } from 'react';
import ProfileSettingsMain from '../components/Profile/ProfileSettings/ProfileSettings';
import Sidebar from '../components/Profile/Sidebar';
import { useMoralis } from 'react-moralis';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { GetDefaultImages } from '../blockchain/functions/Utils';

const ProfileSettings = (props) => {
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
          content={window.location.origin + '/profile/payment/methods'}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Diverse range of payment methods for Fiat to Crypto and Crypto to Fiat | MEDIA EYE"
        />
        <meta
          property="og:description"
          content="Payment Services Providers; On-Ramper, BitPay, Ramp and PayPal. EYE Swap Multi-Chain token swap allowing to swap assets from 15 blockchains with over 1500+ crypto assets."
        />
        <meta property="og:image" content={userprofile} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:domain"
          content="mediaeyenft.com/profile/payment/methods"
        />
        <meta
          property="twitter:url"
          content={window.location.origin + '/profile/payment/methods'}
        />
        <meta
          name="twitter:title"
          content="Diverse range of payment methods for Fiat to Crypto and Crypto to Fiat | MEDIA EYE"
        />
        <meta
          name="twitter:description"
          content="Payment Services Providers; On-Ramper, BitPay, Ramp and PayPal. EYE Swap Multi-Chain token swap allowing to swap assets from 15 blockchains with over 1500+ crypto assets."
        />
        <meta name="twitter:image" content={userprofile} />
        <title>
          Diverse range of payment methods for Fiat to Crypto and Crypto to Fiat
          | MEDIA EYE
        </title>
        <meta
          name="description"
          content="Payment Services Providers; On-Ramper, BitPay, Ramp and PayPal. EYE Swap Multi-Chain token swap allowing to swap assets from 15 blockchains with over 1500+ crypto assets."
        />
      </Helmet>
      <div
        onClick={closeNftCollapse}
        className="profile-page profile mediaeye-layout-content"
      >
        <div className="mediaeye-layout-middle">
          <div className="profile-page-content">
            <Sidebar />
            <ProfileSettingsMain />
          </div>
          {/* profile-page-section */}
        </div>
        {/* end contaniner */}
      </div>
    </React.Fragment>
  );
};

export default ProfileSettings;
