import React, { useEffect } from 'react';
import LaunchAirdropNew1 from '../components/Airdrop/Launch/LaunchAirdropNew';
import ReactTooltip from 'react-tooltip';

const LaunchAirdropNew = (props) => {
  const { closeNftCollapse } = props;

  useEffect(() => {
    ReactTooltip.hide();
  }, []);

  return (
    <React.Fragment>
      <div
        onClick={closeNftCollapse}
        className="mediaeye-layout-content new-launch-airdrop-page"
      >
        <LaunchAirdropNew1 />
      </div>
    </React.Fragment>
  );
};

export default LaunchAirdropNew;
