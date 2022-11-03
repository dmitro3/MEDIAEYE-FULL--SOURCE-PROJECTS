import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { Injected, WalletConnect } from '../../utils/wallet.utils';


const WalletModal = ({ open, onClose }) => {
  const { activate,} = useWeb3React();

  const handleWalletConnect = async () => {
    await activate(WalletConnect);
    onClose();
  }

  const handleMetamask = async () => {
    await activate(Injected);
    onClose();
  }
  return open && (
    <div
      style={{
        position: 'absolute',
        width: '400px',
        background: 'white',
        borderRadius: '20px',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '1000',
        padding: '20px',
        paddingRight: '25px'
      }}
    >
      <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
        <li style={{ margin: '10px' }}>
          <button
            style={{
              width: '100%',
              height: '40px',
              cursor: 'pointer'
            }}
            onClick={handleWalletConnect}
          >
            Wallet Connect
          </button>
        </li>
        <li style={{ margin: '10px' }}>
          <button
            style={{
              width: '100%',
              height: '40px',
              cursor: 'pointer'
            }}
            onClick={handleMetamask}
          >
            Metamask
          </button>
        </li>
      </ul>
    </div>
  );
};

export default WalletModal;