import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Sidebar from '../components/Profile/Sidebar';
import { useMoralis } from 'react-moralis';
import { useHistory } from 'react-router-dom';
import EyeSwapPopup from '../components/Modals/EyeSwapPopup/EyeSwapPopup';
import EyeSwapPro from '../components/Modals/EyeSwap-Open/EyeSwapPro';
import { GetDefaultImages } from '../blockchain/functions/Utils';
import NFTDomains from '../components/NFTDomains/NFTDomains';

const ProfileNFTDomains = (props) => {
  const { closeNftCollapse } = props;
  const { user } = useMoralis();
  const history = useHistory();
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem('isLogin') ? localStorage.getItem('isLogin') : 'false'
  );

  // useEffect(() => {
  //   setIsLogin(localStorage.getItem('isLogin'));
  // }, [user]);

  // useEffect(() => {
  //   if (isLogin === 'false') {
  //     history.replace('/connect-wallet');
  //   }
  // });

  const [userprofile, setUserProfile] = useState('');
  // useEffect(() => {
  //   if (user) {
  //     setUserProfile(
  //       user?.attributes?.profileImage
  //         ? user.attributes.profileImage._url
  //         : GetDefaultImages('USER')
  //     );
  //   }
  // }, [user]);

  return (
    <React.Fragment>
      <Helmet>
        <meta
          property="og:url"
          content={window.location.origin + '/profile/nftdomains'}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="EYE Swap is Multi-Chain Token Swap | MEDIA EYE"
        />
        <meta
          property="og:description"
          content="EYE Swap allows MEDIA EYE users to swap over 15000 + different crypto assets, making it easy and simple for users to swap their digital assets in minutes across 15 blockchains."
        />
        <meta property="og:image" content={userprofile} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:domain"
          content="mediaeyenft.com/profile/nftdomains"
        />
        <meta
          property="twitter:url"
          content={window.location.origin + '/profile/nftdomains'}
        />
        <meta
          name="twitter:title"
          content="EYE Swap is Multi-Chain Token Swap | MEDIA EYE"
        />
        <meta
          name="twitter:description"
          content="EYE Swap allows MEDIA EYE users to swap over 15000 + different crypto assets, making it easy and simple for users to swap their digital assets in minutes across 15 blockchains."
        />
        <meta name="twitter:image" content={userprofile} />
        <title>EYE Swap is Multi-Chain Token Swap | MEDIA EYE</title>
        <meta
          name="description"
          content="EYE Swap allows MEDIA EYE users to swap over 15000 + different crypto assets, making it easy and simple for users to swap their digital assets in minutes across 15 blockchains."
        />
      </Helmet>
      <div
        onClick={closeNftCollapse}
        className="profile-page profile mediaeye-layout-content"
      >
        <div className="mediaeye-layout-middle">
          <div className="profile-page-content">
            <Sidebar />
            <div className="profile-page-content-main">
              <div className="profile-page-content-main-inner">
                <NFTDomains />
              </div>
            </div>
          </div>
          {/* profile-page-section */}
        </div>
        {/* end contaniner */}
      </div>
    </React.Fragment>
  );
};

export default ProfileNFTDomains;
