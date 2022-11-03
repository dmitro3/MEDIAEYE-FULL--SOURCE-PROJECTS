import React from 'react';
import Timer from 'react-compound-timer';
import { Clock } from '../../Icons/';
export const AuctionTimer = (props) => {
  const { secondsLeft } = props;

  return (
    <>
      <div className="product-page-inner-content-auctiontimer">
        <div className="product-page-inner-content-auctiontimer-heading">
          <Clock /> Auction ends in
        </div>
        <div className="product-page-inner-content-auctiontimer-time">
          <Timer
            initialTime={secondsLeft > 0 ? secondsLeft : 0}
            direction="backward"
          >
            {() => (
              <React.Fragment>
                <div>
                  <Timer.Days />
                  <span>Days</span>
                </div>
                <div>
                  <Timer.Hours />
                  <span> Hours</span>
                </div>
                <div>
                  <Timer.Minutes />
                  <span> Min</span>
                </div>
                <div>
                  <Timer.Seconds />
                  <span> Sec</span>
                </div>
              </React.Fragment>
            )}
          </Timer>
        </div>
      </div>
    </>
  );
};

export default AuctionTimer;
