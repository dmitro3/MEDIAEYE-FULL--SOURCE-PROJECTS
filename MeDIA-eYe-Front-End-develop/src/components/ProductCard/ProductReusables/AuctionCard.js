import React from 'react';
import moment from 'moment';
import { TokenName } from '../../../blockchain/functions/Addresses';
import { roundString } from '../../../blockchain/functions/Utils/RoundString';
import { ethers } from 'ethers';
import formatAdddress from '../../../utils/formatAdddress';
import Swal from 'sweetalert2';
import { useMoralis } from 'react-moralis';

export const AuctionCard = (props) => {
  const { nft, bids } = props;
  const { Moralis } = useMoralis();

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Bids</th>
            <th>Date of Bid</th>
            <th colSpan={2}>From</th>
          </tr>
        </thead>
        <tbody>
          {bids.map((item) => {
            return (
              <tr>
                <td className="text-medium">
                  <div className="product-page-inner-tabscard-price">
                    <img
                      src="/img/token/34/ETH.png"
                      className="product-page-inner-content-info-blockchain-icon"
                      alt="eth"
                    />
                    {Moralis?.Units.FromWei(item.get('price'))} &nbsp;
                    {TokenName(item.get('paymentMethod').toLowerCase())}
                  </div>
                </td>
                <td>{item.get('createdAt').toString()}</td>
                <td className="text-link">
                  {formatAdddress(item.get('bidder'))}
                </td>
              </tr>
            );
          })}
          {/* <tr>
                    <td colSpan='4' className='product-page-inner-tabscard-nodata'>No bids</td>

                </tr> */}
        </tbody>
      </table>
    </>
  );
};

export default AuctionCard;
