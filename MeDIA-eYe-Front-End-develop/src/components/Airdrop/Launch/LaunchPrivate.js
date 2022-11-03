import React, { useState, useEffect } from 'react';
import { useMoralis, useMoralisWeb3Api } from 'react-moralis';
import './Launch.scss';

const LaunchPrivate = (props) => {
  const {
    activeNetwork,
    Switch,
    setHidePromoCodes,
    hidePromoCodes,
    setHideUploadparticipants,
    hideUploadparticipants
  } = props;

  const MoralisWeb3Api = useMoralisWeb3Api();
  const { Moralis, user } = useMoralis();

  return (
    <div className="m-t-30">
      <div className="mediaeyeform-group">
        <label className="mediaeyeform-label">
          {' '}
          Choose whitelisting option
        </label>
      </div>
      <div className="mediaeyeform-group">
        <label className="mediaeyeform-label mediaeyeswitch">
          <Switch
            className="mediaeyeswitch-btn mediaeyeswitch-left mediaeyeswitch-right"
            checkedIcon={false}
            uncheckedIcon={false}
            onChange={() => {
              setHidePromoCodes(!hidePromoCodes);
            }}
            checked={hidePromoCodes}
            height={21}
            width={50}
          />
          Promo Codes
        </label>
      </div>

      {hidePromoCodes ? (
        <div className="mediaeyeform-group">
          <label className="mediaeyeform-label mediaeyeinfo">
            {' '}
            Number of codes
          </label>
          <div className="mediaeyeform-group-input mediaeyeform-group-input-auto">
            <input
              className="mediaeyeform-input"
              type="number"
              placeholder="100"
              min="0"
            />
            <div className="mediaeyeform-group-input-addon">
              <button type="button" className="btn btn-info">
                Generate
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <div className="mediaeyeform-group">
        <label className="mediaeyeform-label mediaeyeswitch">
          <Switch
            className="mediaeyeswitch-btn mediaeyeswitch-left"
            checkedIcon={false}
            uncheckedIcon={false}
            onChange={() => {
              setHideUploadparticipants(!hideUploadparticipants);
            }}
            checked={hideUploadparticipants}
            height={21}
            width={50}
          />
          Upload participants{' '}
          {activeNetwork === 'BSC' ? (
            <>BEP</>
          ) : activeNetwork === 'ETH' ? (
            <>ERC</>
          ) : activeNetwork === 'FTM' ? (
            <>FTM</>
          ) : null}
          -20 compatible wallets
        </label>
      </div>

      {hideUploadparticipants ? (
        <>
          <div class="mediaeyeform-group">
            <label class="mediaeyeform-group-input">
              <div class="mediaeyeform-input">No Chosen File...</div>
              <input
                type="file"
                class="mediaeyeform-group-input-hide"
                id="upload-private-file"
              />
              <button
                type="button"
                class="btn btn-info mediaeyeform-group-input-btn"
              >
                Upload CSV File
              </button>
            </label>
          </div>

          <div className="launch-airdrop-page-inner-content-row-download">
            Download Sample CSV File
          </div>
        </>
      ) : null}
    </div>
  );
};

export default LaunchPrivate;
