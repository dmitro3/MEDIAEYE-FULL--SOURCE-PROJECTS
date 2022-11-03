import React from 'react';
import { useMoralis } from 'react-moralis';
import { useDispatch, useSelector } from 'react-redux';
import { closePurchaseCompletePopup } from '../../../store/app/appSlice';
import { CloseIcon } from '../../Icons';
import './PurchaseComplete.scss';

export default function PurchaseComplete() {
  const dispatch = useDispatch();
  const showPurchaseComplete = useSelector(
    (state) => state.app.showPurchaseComplete
  );
  const { Moralis, isInitialized, user } = useMoralis();
  return (
    <>
      {showPurchaseComplete ? (
        <div
          className={
            showPurchaseComplete
              ? 'mediaeye-popup active mediaeye-popup-sm purchase-popup'
              : 'mediaeye-popup'
          }
        >
          <div
            className="mediaeye-popup-wrapper mediaeye-popup-product-page scrolled"
            onClick={() => dispatch(closePurchaseCompletePopup())}
          >
            <div
              className="mediaeye-popup-content"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mediaeye-popup-content-inner">
                <div
                  className="mediaeye-popup-close"
                  onClick={() => dispatch(closePurchaseCompletePopup())}
                >
                  <CloseIcon />
                </div>
                <div className="purchase-popup-content">
                  <div className="purchase-popup-content-header text-center">
                    <span>Your purchase is complete!</span>
                  </div>
                  <div className="purchase-popup-content-middle">
                    <img src="/img/05.png" alt="purchase img" />
                  </div>
                  <div className="purchase-popup-content-bottom text-center">
                    <span>
                      You are now the proud owner of{' '}
                      <span className="text-gray">crazy frog</span>
                      <br /> from the
                      <span className="text-gray">Hypnotic Toads</span>{' '}
                      collection.
                      <br /> Creator:{' '}
                      <span className="text-gray">YouYouYou</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
