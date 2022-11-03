import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { useMoralis } from 'react-moralis';
import { User, Payment, Support, Subscription, EyeSwap, Chain } from '../Icons';
import { GetDefaultImages } from '../../blockchain/functions/Utils';
import './Profile.scss';

const Sidebar = (props) => {
  const location = useLocation();
  const [fixSidebar, setFixSidebar] = useState(true);
  const { Moralis, user, setUserData, userError, isUserUpdating } =
    useMoralis();
  const [useraddresseth, setuseraddresseth] = useState();

  const handleScrollMen = (e) => {
    if (
      window.innerHeight + window.scrollY >
      document.body.clientHeight - 150
    ) {
      setFixSidebar(false);
    } else {
      setFixSidebar(true);
    }
  };
  const formatAdddress = (address) => {
    return (
      address.substring(0, 5) + '...' + address.substring(address.length - 4)
    );
  };

  const handleProfileImage = (file) => {
    if (
      !(
        file?.type === 'image/png' ||
        file?.type === 'image/jpeg' ||
        file?.type === 'image/jpg'
      )
    ) {
      alert('Must be image of type .png, .jpg, .jpeg');
      return;
    }
    // only take files smaller than 2.5mb for profile image
    if (file.size > 2500000) {
      alert('File must be smaller than 2.5mb');
      return;
    }
    const moralisFile = new Moralis.File(file.name, file);

    setUserData({ profileImage: moralisFile });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScrollMen);
  });

  return (
    <div className="profile-page-content-sidebar">
      <div
        className={
          fixSidebar
            ? 'profile-page-content-sidebar-inner'
            : 'profile-page-content-sidebar-inner fix'
        }
      >
        <div className="profile-page-content-sidebar-user">
          <div className="userIds">
            <div className="profile-page-content-sidebar-user-img">
              <img
                src={
                  user?.attributes?.profileImage
                    ? user.attributes.profileImage._url
                    : GetDefaultImages('USER')
                }
                alt="Profile"
              />
              {/* <label className="profile-page-content-sidebar-user-img-upload">
                <input
                  type="file"
                  onChange={(e) => handleProfileImage(e.target.files[0])}
                  disabled={isUserUpdating}
                />
                +
              </label> */}
            </div>
            <div className="profile-page-content-sidebar-user-info">
              {user?.attributes?.defaultUsername
                ? formatAdddress(user.attributes.ethAddress)
                : user?.attributes?.username}
            </div>
            <div
              className="subscription-level"
              level={user?.attributes?.subscriptionLevel}
            >
              {user?.attributes?.subscriptionLevel > 0
                ? 'LVL ' + user?.attributes?.subscriptionLevel
                : 'Free'}
            </div>
          </div>
        </div>
        <div className="profile-page-content-sidebar-links">
          <NavLink
            to="/profile"
            exact
            className={
              location.pathname === '/profile'
                ? 'profile-page-content-sidebar-links-btn active'
                : 'profile-page-content-sidebar-links-btn'
            }
          >
            <span className="profile-page-content-sidebar-links-btn-icon">
              <User />
            </span>{' '}
            Profile
          </NavLink>

          <NavLink
            to="/profile/payment/methods"
            exact
            className={
              location.pathname === '/profile/payment/methods'
                ? 'profile-page-content-sidebar-links-btn active'
                : 'profile-page-content-sidebar-links-btn'
            }
          >
            <span className="profile-page-content-sidebar-links-btn-icon">
              <Payment />
            </span>{' '}
            Payment Methods
          </NavLink>

          <NavLink
            // to="/profile/eyeswap"
            exact
            className={
              location.pathname === '/profile/eyeswap'
                ? 'profile-page-content-sidebar-links-btn active'
                : 'profile-page-content-sidebar-links-btn'
            }
            to={{
              pathname: '/profile/eyeswap',
              // pathname: '/eyeswap-home',
              aboutProps: {
                ethuseradd: { useraddresseth }
              }
            }}
          >
            <span className="profile-page-content-sidebar-links-btn-icon">
              <EyeSwap />
            </span>{' '}
            eYeSwap
          </NavLink>

          <NavLink
            to="/profile/subscription"
            exact
            className={
              location.pathname === '/profile/subscription'
                ? 'profile-page-content-sidebar-links-btn active'
                : 'profile-page-content-sidebar-links-btn'
            }
          >
            <span className="profile-page-content-sidebar-links-btn-icon">
              <Subscription />
            </span>{' '}
            Subscription
          </NavLink>
          <NavLink
            to="/profile/nftdomains"
            exact
            className={
              location.pathname === '/profile/nftdomains'
                ? 'profile-page-content-sidebar-links-btn active'
                : 'profile-page-content-sidebar-links-btn'
            }
          >
            <span className="profile-page-content-sidebar-links-btn-icon rotate">
              <Chain />
            </span>{' '}
            NFT Domains
          </NavLink>
          <NavLink
            to="/profile/support"
            exact
            className={
              location.pathname === '/profile/support'
                ? 'profile-page-content-sidebar-links-btn active'
                : 'profile-page-content-sidebar-links-btn'
            }
          >
            <span className="profile-page-content-sidebar-links-btn-icon">
              <Support />
            </span>{' '}
            Support
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
