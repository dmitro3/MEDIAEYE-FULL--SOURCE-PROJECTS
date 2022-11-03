import React, { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';
import { CloseIcon, User } from '../../Icons/';
import { Link } from 'react-router-dom';
import './Popup.scss';
import formatAdddress from '../../../utils/formatAdddress';

export const PopupOwners = (props) => {
  const { owners, ownedAmounts, showPopup, togglePopupOwners } = props;

  return (
    <React.Fragment>
      {showPopup ? (
        <div
          className={
            showPopup
              ? 'mediaeye-popup active mediaeye-popup-sm'
              : 'mediaeye-popup'
          }
        >
          <div
            className="mediaeye-popup-wrapper mediaeye-popup-product-page scrolled"
            onClick={togglePopupOwners}
          >
            <div className="mediaeye-popup-content">
              <div
                className="mediaeye-popup-content-inner"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="mediaeye-popup-product-page-row">
                  <div className="mediaeye-popup-product-page-label">
                    <div className="mediaeye-popup-product-page-label-popupowners">
                      <User type="small" />
                      <span>Owned by</span>
                    </div>
                  </div>
                </div>
                <div
                  className="mediaeye-popup-close"
                  onClick={togglePopupOwners}
                >
                  <CloseIcon />
                </div>
                <div className="mediaeyefancyScroll">
                  <div className="mediaeye-popup-product-page owners-list-inner">
                    <table>
                      <tbody>
                        {owners?.map((owner, i) => (
                          <>
                            <tr key={owner.id}>
                              <Link
                                to={`/account/${owner?.attributes?.ethAddress}`}
                              >
                                <td className="owner-name">
                                  <User type="small" />
                                  {owner?.attributes?.defaultUsername ===
                                  false ? (
                                    <>@{owner?.attributes?.username}</>
                                  ) : (
                                    <>
                                      @
                                      {formatAdddress(
                                        owner?.attributes?.ethAddress
                                      )}
                                    </>
                                  )}
                                </td>
                              </Link>

                              <td className="owner-address">
                                {formatAdddress(owner?.attributes?.ethAddress)}
                              </td>
                              <td className="owner-items">
                                {ownedAmounts?.length
                                  ? String(ownedAmounts[i]) + ' items'
                                  : null}
                              </td>
                            </tr>
                          </>
                        ))}
                      </tbody>
                    </table>
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

export default PopupOwners;
