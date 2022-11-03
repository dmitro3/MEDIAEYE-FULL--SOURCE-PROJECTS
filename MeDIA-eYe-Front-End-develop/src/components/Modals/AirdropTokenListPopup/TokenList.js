import React, { useEffect, useState } from 'react';
import formatAdddress from '../../../utils/formatAdddress';
import { roundString } from '../../../blockchain/functions/Utils';
import { ethers } from 'ethers';
import './TokenList.scss';

export const TokenList = (props) => {
  const { showPopup, togglePopupTokenList, ownedTokens } = props;

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
            className="mediaeye-popup-wrapper mediaeye-popup-airdrop-token-page scrolled"
            onClick={togglePopupTokenList}
          >
            <div className="mediaeye-popup-content">
              <div
                className="mediaeye-popup-content-inner"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="mediaeye-popup-content-inner-header">
                  <div className="mediaeye-popup-content-inner-header-title mediaeye-popup-airdrop-token-page-header text-center">
                    Selecting Tokens
                  </div>
                </div>
                <div class="mediaeye-searchbar">
                  <input
                    className=""
                    placeholder="Search by name or address"
                    type="text"
                  />
                </div>
                <div className="mediaeyefancyScroll">
                  <div className="mediaeye-popup-product-page mediaeye-popup-airdrop-token-page-inner">
                    <div className="mediaeye-popup-airdrop-token-page-inner-header">
                      <div className="mediaeye-popup-airdrop-token-page-inner-header-title token-name">
                        Token
                      </div>
                      <div className="mediaeye-popup-airdrop-token-page-inner-header-title token-address">
                        Address
                      </div>
                      <div className="mediaeye-popup-airdrop-token-page-inner-header-title token-value">
                        Total Amount
                      </div>
                    </div>
                    <div className="mediaeye-popup-airdrop-token-page-inner-body">
                      {ownedTokens.map((token, index) => (
                        <div className="mediaeye-popup-airdrop-token-page-inner-body-wrap">
                          <div className="mediaeye-popup-airdrop-token-page-inner-body-wrap-content token-name">
                            {token.symbol}
                          </div>
                          <div className="mediaeye-popup-airdrop-token-page-inner-body-wrap-content token-address">
                            {formatAdddress(token.token_address)}
                          </div>
                          <div className="mediaeye-popup-airdrop-token-page-inner-body-wrap-content token-value">
                            <div className="token-value-num">
                              {
                                +roundString(
                                  ethers.utils.formatEther(
                                    token.balance,
                                    token.decimals
                                  ),
                                  4
                                )
                              }
                            </div>
                            <button className="btn-square btn-gaming select-btn">
                              Select
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
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

export default TokenList;
