import React from 'react';
import AirdropsMain from '../components/Airdrop/Airdrops/AirdropsMain';

const Airdrops = (props) => {
  const { closeNftCollapse } = props;

  return (
    <React.Fragment>
      <div
        onClick={closeNftCollapse}
        className="mediaeye-layout-content feature_airdrop"
      >
        <AirdropsMain />
      </div>
    </React.Fragment>
  );
};

export default Airdrops;
