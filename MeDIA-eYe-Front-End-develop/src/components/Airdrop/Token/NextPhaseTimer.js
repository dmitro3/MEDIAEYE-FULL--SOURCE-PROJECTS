import React from 'react';
import Timer from 'react-compound-timer';
import { Clock } from '../../Icons/';
export const NextPhaseTimer = (props) => {
  const { millisLeft } = props;

  return (
    <>
      <div>
        <div style={{ display: 'flex' }}>
          <Timer
            initialTime={millisLeft > 0 ? millisLeft : 0}
            direction="backward"
          >
            {() => (
              <React.Fragment>
                {millisLeft > 86400000 ? (
                  <>
                    <Timer.Days />
                    <span>Days</span>
                  </>
                ) : (
                  <div />
                )}
                {millisLeft > 3600000 ? (
                  <>
                    <Timer.Hours />
                    <span>Hours</span>
                  </>
                ) : (
                  <div />
                )}

                <Timer.Minutes />
                <span> Min</span>

                <Timer.Seconds />
                <span> Sec</span>
              </React.Fragment>
            )}
          </Timer>
        </div>
      </div>
    </>
  );
};

export default NextPhaseTimer;
