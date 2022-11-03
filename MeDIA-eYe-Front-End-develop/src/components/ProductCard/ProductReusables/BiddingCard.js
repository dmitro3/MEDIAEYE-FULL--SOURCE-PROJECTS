import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { TokenName } from '../../../blockchain/functions/Addresses';
import { roundString } from '../../../blockchain/functions/Utils/RoundString';
import { ethers } from 'ethers';
import formatAdddress from '../../../utils/formatAdddress';
import Swal from 'sweetalert2';
import { useMoralis } from 'react-moralis';
import SelectSearch from 'react-select-search';
export const BiddingCard = (props) => {
  const {
    nft,
    currentListing,
    bids,
    selfOwner,
    togglePopupClaim,
    setPopupClaimIndex
  } = props;
  const startTime = new Date(currentListing?.attributes.startTime * 1000);
  const startTimeStr = moment(startTime).format('MMMM DD, YYYY h:mmA');
  const endTime = new Date(currentListing?.attributes?.endTime * 1000);
  const endTimeStr = moment(endTime).format('MMMM DD, YYYY h:mmA');
  const { Moralis } = useMoralis();
  const [sortBy, setSortBy] = useState(null);
  const handleClaim = (i) => {
    togglePopupClaim();
    setPopupClaimIndex(i);
  };
  const sortList = [
    { value: '1', name: 'Endings low' },
    { value: '2', name: 'Top Bids low' },
    { value: '3', name: 'Endings high' },
    { value: '4', name: 'Top Bids high' },
  ];
  const showBids = () => {
    return bids?.map((item, i) => {
      return (
        <tr>
          <td className="text-medium">
            <div className="product-page-inner-tabscard-price">
              <img
                src={`/img/token/34/${TokenName(
                  item.get('paymentMethod').toLowerCase(),
                  nft?.chainId
                )}.png`}
                alt="token"
                className="product-page-inner-content-info-blockchain-icon"
              />
              {Moralis?.Units.FromWei(item.get('price'))}&nbsp;
              {TokenName(item.get('paymentMethod').toLowerCase(), nft?.chainId)}
            </div>
          </td>
          <td>-</td>
          <td>{item.get('createdAt').toString()}</td>
          <td className="text-link" colSpan={!selfOwner ? 2 : 0}>{formatAdddress(item.get('bidder'))}</td>
          {selfOwner ? (
            <td className="text-action">
              <button
                type="button"
                className="btn btn-sm btn-info"
                value={i}
                onClick={(e) => handleClaim(e.target.value)}
              >
                Claim
              </button>
            </td>
          ) : null}
        </tr>
      );
    });
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Bids</th>
            <th>USD</th>
            <th>Ends In</th>
            <th>From</th>
            <th>
              <SelectSearch
                className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style text-nowrap"
                options={sortList}
                placeholder={'Sort by'}
                value={sortBy}
                onChange={(opt) => {
                  setSortBy(opt)
                }}
              />
            </th>
          </tr>
        </thead>
        <tbody>{showBids()}</tbody>
      </table>
    </>
  );
};

export default BiddingCard;
