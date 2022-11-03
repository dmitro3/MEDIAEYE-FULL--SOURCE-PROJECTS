import { element } from 'prop-types';
import React, { useState } from 'react';
import { Info } from '../Icons';

const ConfirmRemove = (props) => {
  const { openConfirm, toggleConfirmPopup, index, WatchlistData } = props;
  const [removeConfirm, setConfirm] = useState('confirmed');

  const ConfirmRemove = () => {
    WatchlistData.splice(index, 1);
    toggleConfirmPopup(WatchlistData);
  };

  return (
    <React.Fragment>
      {openConfirm ? (
        <div
          className={
            openConfirm
              ? 'mediaeye-popup active mediaeye-popup-sm'
              : 'mediaeye-popup'
          }
        >
          <div
            className="mediaeye-popup-wrapper mediaeye-popup-mintnft scrolled"
            onClick={toggleConfirmPopup}
          >
            <div
              className="mediaeye-popup-content"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mediaeye-popup-content-inner">
                <div className="mediaeye-popup-content-inner-header text-center">
                  <div className="mediaeye-popup-content-inner-header-title">
                    <Info />
                  </div>
                </div>
                <div className="mediaeye-popup-general-message">
                  Do you really want to remove this item?
                </div>
                <div className="mediaeye-popup-general-bottom">
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={() => ConfirmRemove()}
                  >
                    yes
                  </button>
                  <button
                    type="button"
                    className="btn btn-featured m-l-10"
                    onClick={() => toggleConfirmPopup()}
                  >
                    no
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default ConfirmRemove;
