import React from 'react';
import './UnlockablePopup.scss';
import CloseIcon from '../../Icons/CloseIcon';

const UnlockablePopup = (props) => {
  const { showPopup, togglePopup, selfOwner } = props;

  return (
    <React.Fragment>
      {showPopup ? (
        <div
          className={
            showPopup
              ? 'mediaeye-popup active mediaeye-popup-xs'
              : 'mediaeye-popup'
          }
        >
          <div className="mediaeye-popup-wrapper unlockable-popup scrolled">
            <div className="mediaeye-popup-content unlockable-popup-content">
              <div className="mediaeye-popup-content-inner unlockable-popup-content-inner">
                <div className="mediaeye-popup-close" onClick={togglePopup}>
                  <CloseIcon />
                </div>
                <div className="mediaeye-popup-content-inner-header unlockable-popup-content-inner-header text-center">
                  <div className="mediaeye-popup-content-inner-header-title">
                    Unlockable Content
                  </div>
                </div>
                {selfOwner ? (
                  <div className="mediaeyefancyScroll">
                    <div className="unlockable-popup-scroll">
                      <div className="unlockable-popup-content-inner-middle">
                        <span className="unlockable-popup-content-inner-middle-text">
                          "MeDIA eYe NFT Portal is a “Baas” -
                          Blockchain-as-a-Service platform built to enhance and
                          simplify the process involved in buying, selling,
                          minting, collecting, promoting and creating value with
                          NFTs. The MeDIA eYe platform is designed to be user
                          friendly, offering a “frictionless” experience for its
                          users. MeDIA eYe is a multi-chain platform that offers
                          a broad array of functionality designed to support a
                          wide range of use cases for NFTs. MeDIA eYe is
                          designed to be fully ...
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="unlockable-popup-content-inner-transform">
                    <span className="unlockable-popup-content-inner-transform-text"></span>
                    <span className="unlockable-popup-content-inner-transform-text"></span>
                    <span className="unlockable-popup-content-inner-transform-text"></span>
                    <span className="unlockable-popup-content-inner-transform-text last"></span>
                    <div className="unlockable-popup-content-inner-transform-content">
                      This content can only be unlocked and revealed by the
                      owner of this item.
                    </div>
                  </div>
                )}
                <div className="text-center">
                  <button
                    type="button"
                    className="btn btn-sm btn-gaming btn-square"
                    onClick={togglePopup}
                  >
                    Close
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

export default UnlockablePopup;
