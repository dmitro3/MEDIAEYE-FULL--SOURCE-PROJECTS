import React from 'react';
import { Helmet } from 'react-helmet';
import NewConnectWalletMain from '../components/NewConnectWallet/NewConnectWallet.js';

const NewConnectWallet = (props) => {
  const { closeNftCollapse } = props;
  return (
    <React.Fragment>
      <Helmet>
        <meta
          property="og:url"
          content={window.location.origin + '/connect-wallet'}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Connect your Web 3.0 wallet to start your NFT Journey | MEDIA EYE"
        />
        <meta
          property="og:description"
          content="By connecting your wallet you gain access to the MEDIA EYE NFT platform, where you can start to create value with NFTs"
        />
        <meta
          property="og:image"
          content={
            window.location.origin + '/img/meta_tag/CONNECT_YOUR_WALLET.png'
          }
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:domain"
          content="mediaeyenft.com/connect-wallet"
        />
        <meta
          property="twitter:url"
          content={window.location.origin + '/connect-wallet'}
        />
        <meta
          name="twitter:title"
          content="Connect your Web 3.0 wallet to start your NFT Journey | MEDIA EYE"
        />
        <meta
          name="twitter:description"
          content="By connecting your wallet you gain access to the MEDIA EYE NFT platform, where you can start to create value with NFTs"
        />
        <meta
          name="twitter:image"
          content={
            window.location.origin + '/img/meta_tag/CONNECT_YOUR_WALLET.png'
          }
        />
        <title>
          Connect your Web 3.0 wallet to start your NFT Journey | MEDIA EYE
        </title>
        <meta
          name="description"
          content="By connecting your wallet you gain access to the MEDIA EYE NFT platform, where you can start to create value with NFTs"
        />
      </Helmet>
      <div
        onClick={closeNftCollapse}
        className="connect-wallet mediaeye-layout-content"
      >
        <NewConnectWalletMain />
      </div>
    </React.Fragment>
  );
};

export default NewConnectWallet;
