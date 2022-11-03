import React, { useState, useEffect } from 'react';
import './PopupClaim.scss';
import CloseIcon from '../../../Icons/CloseIcon';
import { useMoralis } from 'react-moralis';
import { ClaimBidsCard } from '../../ProductReusables';
import AgreeBlock from '../../../Common/AgreeBlock';
import { claimAuction } from '../../../../blockchain/functions/Marketplace/ClaimAuction';
import { toggleGeneralPopup } from '../../../../store/app/appSlice';
import { useDispatch } from 'react-redux';

const PopupClaim = (props) => {
  const { bids, nft, bidIndex } = props;
  const { Moralis, isInitialized } = useMoralis();
  const dispatch = useDispatch();
  const [termsAgree, setTermsAgree] = useState(false);

  const toggleTermsAgree = () => {
    setTermsAgree(!termsAgree);
  };

  const handleClaim = async () => {
    if (!bids && bidIndex !== null) {
      return;
    }
    const bidData = bids[bidIndex].attributes;
    let claimRequest = [
      bidData.listingId,
      bidData.price,
      bidData.bidder,
      bidData.paymentMethod,
      bidData.v,
      Buffer.from(bidData.r, 'hex'),
      Buffer.from(bidData.s, 'hex')
    ];
    try {
      const result = await claimAuction(Moralis, claimRequest);
      if (result) {
        dispatch(
          toggleGeneralPopup({
            status: 'success',
            title: 'Transaction Successful',
            size: 'sm',
            textButton: 'OK'
          })
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <React.Fragment>
      {props.showPopup ? (
        <div
          className={
            props.showPopup
              ? 'mediaeye-popup active mediaeye-popup-sm'
              : 'mediaeye-popup'
          }
        >
          <div
            className="mediaeye-popup-wrapper scrolled"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mediaeye-popup-content">
              <div
                className="mediaeye-popup-content-inner"
                onClick={(event) => event.stopPropagation()}
              >
                <div
                  className="mediaeye-popup-close"
                  onClick={props.togglePopup}
                >
                  <CloseIcon />
                </div>
                <div className="claim-bid-card">
                  <ClaimBidsCard nft={nft} bid={bids[bidIndex]} />
                  <div>
                    <AgreeBlock
                      agree={termsAgree}
                      toggleAgree={toggleTermsAgree}
                    />
                  </div>
                  <div className="claim-bid-card-bottom">
                    {termsAgree ? (
                      <button
                        type="button"
                        className="btn btn-info"
                        onClick={handleClaim}
                      >
                        Claim
                      </button>
                    ) : (
                      <button type="button" className="btn btn-disable">
                        Claim
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default PopupClaim;
