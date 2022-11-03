import React from 'react';
import ConnectWalletMetamaskOnboardMain from '../components/ConnectWalletMetamaskOnboard/ConnectWalletMetamaskOnboard.js';

const ConnectWalletMetamaskOnboard = (props) => {
  const { closeNftCollapse } = props;
  return (
    <React.Fragment>
      <div onClick={closeNftCollapse} className="marketplace">
        <ConnectWalletMetamaskOnboardMain />
      </div>
    </React.Fragment>
  );
};

export default ConnectWalletMetamaskOnboard;
