import React from 'react';
import LaunchAirdrop from '../components/Airdrop/Launch/LaunchAirdrop';

const LaunchPage = (props) => {
  const { closeNftCollapse } = props;

  return (
    <React.Fragment>
      <div
        onClick={closeNftCollapse}
        className="mediaeye-layout-content launch-airdrop-page"
      >
        <LaunchAirdrop />
      </div>
    </React.Fragment>
  );
};

export default LaunchPage;
