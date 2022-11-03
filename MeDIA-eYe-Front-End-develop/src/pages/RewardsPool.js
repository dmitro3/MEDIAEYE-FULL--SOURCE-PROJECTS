import React from 'react';
import RewardsHeader from '../components/RewardsPool/RewardsHeader';
import RewardsPoolMain from '../components/RewardsPool/RewardsPool';

const RewardsPool = (props) => {
  const { closeNftCollapse } = props;

  return (
    <React.Fragment>
      <div
        className="mediaeye-layout-content bottomnospace rewards-pool"
        onClick={closeNftCollapse}
      >
        <RewardsHeader />
        <div className="mediaeye-layout-middle">
          <RewardsPoolMain />
        </div>
      </div>
    </React.Fragment>
  );
};

export default RewardsPool;
