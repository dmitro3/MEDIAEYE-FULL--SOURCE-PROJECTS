import React from 'react';
import PutOnMarketplaceMain from '../components/PutOn/PutOnMarketplace';
import { useMoralis } from 'react-moralis';
import { useHistory } from 'react-router-dom';

const PutOnMarketplace = (props) => {
  const { closeNftCollapse } = props;
  const history = useHistory();
  const { isUnauthenticated, isAuthenticating, isInitialized } = useMoralis();

  return (
    <React.Fragment>
      <div
        onClick={closeNftCollapse}
        className="marketplace-page mediaeye-layout-content bottomnospace"
      >
        {isUnauthenticated && !isAuthenticating && isInitialized ? (
          history.replace('/connect-wallet')
        ) : (
          <PutOnMarketplaceMain />
        )}
      </div>
    </React.Fragment>
  );
};

export default PutOnMarketplace;
