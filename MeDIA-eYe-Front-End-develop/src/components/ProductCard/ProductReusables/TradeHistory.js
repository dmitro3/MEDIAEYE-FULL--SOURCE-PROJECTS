import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { queryTradeHistory } from '../../../blockchain/functions/Marketplace';
import { useMoralis, useMoralisWeb3Api } from 'react-moralis';
import { Link } from 'react-router-dom';
import { TokenName } from '../../../blockchain/functions/Addresses';
import { roundString } from '../../../blockchain/functions/Utils';
import { Bid, Tag, Minted, Offer, RightSideArrow } from '../../Icons/';
import { ethers } from 'ethers';
import moment from 'moment';
import formatAdddress from '../../../utils/formatAdddress';
import {
  TokenAddressDecimal,
  TokenDecimalFormat
} from '../../../blockchain/functions/Addresses/TokenDecimals';

export const TradeHistory = (props) => {
  const theme = useSelector((state) => state.app.darkTheme);
  const [activeTab, setActiveTab] = useState('offers');
  const { nft } = props;
  const { Moralis, isInitialized, web3 } = useMoralis();
  const [sales, setSales] = useState([]);
  const [itemActivity, setItemActivity] = useState([]);
  const [isRetrieved, setIsRetrieved] = useState(false);
  const Web3Api = useMoralisWeb3Api();

  const getSales = async () => {
    const result = await queryTradeHistory(
      Web3Api,
      Moralis,
      nft.collectionAddress,
      nft.tokenId,
      nft.chainId
    );
    setItemActivity(result);
    setIsRetrieved(true);
  };

  useEffect(() => {
    if (!isRetrieved && Web3Api && nft) {
      getSales();
    }
  }, [Web3Api, web3]);

  const getEventName = (eventType) => {
    switch (eventType) {
      case 'mint':
        return (
          <>
            <Minted /> Minted
          </>
        );
      case 'claim auction':
        return (
          <>
            <Bid /> Auction Claimed
          </>
        );
      case 'claim offer':
        return (
          <>
            <Offer /> Offer Claimed
          </>
        );
      case 'create listing':
        return (
          <>
            <Tag /> Listing Created
          </>
        );
      case 'create auction':
        return (
          <>
            <Bid /> Auction Created
          </>
        );
      case 'sale':
        return (
          <>
            <Tag /> Sale
          </>
        );
      case 'cancel listing':
        return (
          <>
            <Tag /> Listing Cancelled
          </>
        );
      default:
        return (
          <>
            <RightSideArrow /> Transfer
          </>
        );
    }
  };

  const getDateDisplay = (dateToDisplay) => {
    const currentTime = moment(Date.now());
    const activityTime = moment(dateToDisplay);
    const timeDifference = activityTime.diff(currentTime);
    return moment.duration(timeDifference).humanize(true);
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Event</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>From</th>
            <th>To</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {itemActivity.map((activity, i) => {
            return (
              <tr key={i}>
                <td>
                  <div className="product-page-inner-tabscard-namewithicon">
                    {getEventName(activity.event)}
                  </div>
                </td>
                <td>
                  {activity.price?.amount ? (
                    <div className="product-page-inner-tabscard-price">
                      <img
                        src={`/img/token/34/${TokenName(
                          activity.price.type,
                          nft?.chainId
                        )}.png`}
                        alt={TokenName(activity.price.type, nft?.chainId)}
                        className="product-page-inner-content-info-blockchain-icon"
                      />{' '}
                      {roundString(
                        TokenDecimalFormat(
                          activity.price.amount,
                          TokenAddressDecimal(activity.price.type, nft?.chainId)
                        ),
                        5
                      )}
                    </div>
                  ) : null}
                </td>
                <td>1</td>
                <td className="text-link">
                  <Link
                    to={`/account/${activity.from.address}`}
                    className="mediaeyecreatedby-link"
                  >
                    {activity.from.name ??
                      formatAdddress(activity.from.address)}
                  </Link>
                </td>
                <td className="text-link">
                  <Link
                    to={`/account/${activity.to.address}`}
                    className="mediaeyecreatedby-link"
                  >
                    {activity.to.name ?? formatAdddress(activity.to.address)}
                  </Link>
                </td>
                <td> {getDateDisplay(activity.date)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default TradeHistory;
