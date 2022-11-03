import React, { useContext, useEffect, useState } from 'react';
import { SubscriptionPopupContext } from '../../context/SubscriptionPopupContext';
import { useMoralis } from 'react-moralis';
import metavatar from '../../assets/img/metavatar_cards.png';
import {
  Checkbox,
  EyeSwap,
  Gift,
  Heart,
  Mark,
  Star,
  Unlock,
  Upload
} from '../Icons';

const ProfileSubscription = (props) => {
  const { togglePopup } = props;
  const { setLevel } = useContext(SubscriptionPopupContext);
  const [showLevelError, setLevelError] = useState(false);
  const [activeLevel, setActiveLevel] = useState(0);
  const { refetchUserData, isUserUpdating, userError, user } = useMoralis();

  const toggleLevelError = (showError) => {
    if (showError) {
      setLevelError(showError);
    }
  };

  const subscriptionLevels = [
    {
      name: 'MY EYE',
      level: 0,
      price: '0',
      activeStatus: true,
      limit: 50,
      durataion: {
        limit: '0',
        type: 'Days'
      }
    },
    {
      name: 'BUSINESS EYE',
      level: 1,
      remainingDays: '24',
      price: '25.50',
      activeStatus: true,
      limit: 100,
      durataion: {
        limit: '49.99',
        type: 'Days'
      }
    },
    {
      name: 'BUSINESS EYE',
      level: 2,
      price: '42.50',
      limit: 250,
      remainingDays: '25',
      activeStatus: true,
      durataion: {
        limit: '99.99',
        type: 'Days'
      }
    }
  ];
  const handleDateStr = () => {
    let dateStr = '';
    if (user?.attributes.subscriptionLevel > 0)
      dateStr = new Date(
        user?.attributes.subscriptionEnd * 1000
      ).toLocaleDateString('en-US');

    return dateStr;
  };

  return (
    <div className="profile-page-content-main">
      <div className="profile-page-content-main-inner">
        <div className="profile-page-content-main-header">
          <h2>Available for all subscriptions</h2>
        </div>
        <div className=" profile-page-subscriptions-info">
          <div className="profile-page-subscriptions-info-row">
            <span className="profile-page-content-main-header-network">
              <img
                className="profile-page-content-main-header-network-token"
                src="/img/token/34/ETH2.png"
                alt="ETH Token Logo"
              />
              <img
                className="profile-page-content-main-header-network-token"
                src="/img/token/34/BNB.png"
                alt="BNB Token Logo"
              />
              <img
                className="profile-page-content-main-header-network-token"
                src="/img/token/34/FTM.png"
                alt="FTM Token Logo"
              />
            </span>
            <span className="text-grayShade">Supported Networks</span>
          </div>
          <div className="profile-page-content-main-eyedesign">
            <div className="profile-page-content-main-eyedesign-centertext">
              <div className="profile-page-content-main-eyedesign-centertext-inner">
                <img src="/img/token/EYE.png" alt="token" />
                <span className="offer">15 % OFF</span>
                <span className="text-grayShade">Payment with eYe tokens </span>
              </div>
            </div>
          </div>
          <div className="profile-page-subscriptions-info-row">
            <span className="profile-page-content-main-header-network">
              <img
                className="profile-page-content-main-header-network-metavatar-creator"
                src={metavatar}
                alt="Metavatar Creator"
              />
            </span>
            <span className="text-grayShade">Metavatar Creator</span>
          </div>
        </div>
        <div className="profile-page-content-main-body">
          <div className="profile-page-subscriptions">
            {subscriptionLevels.map((key, index) => (
              <div
                className="profile-page-subscriptions-col"
                key={index}
                level={key.level}
              >
                <div
                  className={
                    user?.attributes?.subscriptionLevel === key.level
                      ? 'profile-page-subscriptions-col-inner active'
                      : 'profile-page-subscriptions-col-inner'
                  }
                >
                  <div className="profile-page-subscriptions-col-inner-header">
                    <div
                      className="profile-page-subscriptions-col-inner-header-label"
                      level={key.level}
                    >
                      {key.level > 0 ? 'LVL ' + key.level : 'Free'}
                    </div>
                    <div className="profile-page-subscriptions-col-inner-header-title">
                      <div className="profile-page-subscriptions-col-inner-header-title-up">
                        {user?.attributes?.subscriptionLevel === key.level ? (
                          <span className="active-text">Active</span>
                        ) : key.level === 0 ? (
                          <span>Free</span>
                        ) : (
                          <div className="profile-page-subscriptions-col-inner-header-title-up-duration">
                            $ <span>{key.durataion.limit} /</span>{' '}
                            <span className="days-text">30 DAYS</span>
                          </div>
                        )}
                      </div>
                      {user?.attributes?.subscriptionLevel === key.level &&
                      key.remainingDays ? (
                        <div
                          className="profile-page-subscriptions-col-inner-header-title-down"
                          data-html={true}
                          data-class="mediaeyetooltip"
                          data-tip="Upload Limit <br/>
                       Per Digital File"
                        >
                          Days remaining<span>{key.remainingDays}</span>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="profile-page-subscriptions-col-inner-show-limit">
                    <Upload /> <span> {key.limit} MB </span>
                  </div>
                  <div className="profile-page-subscriptions-col-inner-body">
                    <ul className="profile-page-subscriptions-col-inner-body-list">
                      <li>Mint ERC721 or ERC1155 NFTs</li>
                      <li>Buy & sell NFTs on NFT Marketplace</li>
                      <li>Auction or fixed price sales </li>
                      <li>
                        Set contribution to favorite charity from proceeds of
                        sale
                      </li>
                      <li>
                        User Rewards distributed every 30 days on each network
                      </li>
                      <li>Artist Royalties</li>
                      <li>Proceed Splits</li>
                      {key.level === 0 ? (
                        <li>Create and Mint 1 Avatar</li>
                      ) : key.level === 1 ? (
                        <>
                          <li>Bundling (max 10 items)</li>
                          <li>Mint Collections (unlimited)</li>
                          <li>
                            Create and Mint Avatar Collections up to 20 avatars
                          </li>
                        </>
                      ) : (
                        <>
                          <li>Bundling (max 10 items)</li>
                          <li>Mint Collections (unlimited)</li>
                          <li>Jumbo Mint</li>
                          <li>
                            Assign multiple minters for group & community
                            collections
                          </li>
                          <li>Create and Mint Avatar Collections Unlimited</li>
                        </>
                      )}
                    </ul>
                  </div>

                  <div className="profile-page-subscriptions-col-inner-footer">
                    {user?.attributes?.subscriptionLevel > 0 ? (
                      <>
                        {user?.attributes?.subscriptionLevel === key.level ? (
                          <button
                            type="button"
                            className="btn btn-sm btn-gaming"
                            onClick={() => {
                              togglePopup();
                              setLevel(key.level);
                            }}
                            disabled={isUserUpdating}
                          >
                            EXTEND
                          </button>
                        ) : null}
                      </>
                    ) : key.level > 0 ? (
                      <button
                        type="button"
                        className="btn btn-sm btn-gaming"
                        onClick={() => {
                          togglePopup();
                          setLevel(key.level);
                        }}
                        disabled={isUserUpdating}
                      >
                        pay
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}

            {/* end free */}
          </div>
        </div>
        {/* end body */}
      </div>
    </div>
  );
};

export default ProfileSubscription;
