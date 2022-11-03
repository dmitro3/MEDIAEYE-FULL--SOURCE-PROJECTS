import React from 'react';
import rewards_banner from '../../assets/img/Rewards/rewards-banner.png';
import Ilon_Mask from '../../assets/img/Rewards/Ilon_Mask.png';

const RewardsHeader = () => {
  return (
    <div className="rewards-pool-header">
      <img
        className="rewards-pool-header-img"
        src={rewards_banner}
        alt="rewards_banner"
      />
      <div className="rewards-pool-header-inner">
        <div className="rewards-pool-header-inner-data">
          <div className="rewards-pool-header-inner-data-banner">
            <h1 className="rewards-pool-header-inner-data-banner-text">
              REWARDS
            </h1>
            <img
              className="rewards-pool-header-inner-data-banner-image"
              src={Ilon_Mask}
              alt="Ilon_Mask"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardsHeader;
