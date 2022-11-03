import React from 'react';
import WatchlistMain from '../components/Watchlist/WatchlistMain';

const Watchlist = (props) => {
  const { closeNftCollapse } = props;

  return (
    <React.Fragment>
      <div
        onClick={closeNftCollapse}
        className="mediaeye-layout-content watchlist-page"
      >
        <WatchlistMain />
      </div>
    </React.Fragment>
  );
};

export default Watchlist;
