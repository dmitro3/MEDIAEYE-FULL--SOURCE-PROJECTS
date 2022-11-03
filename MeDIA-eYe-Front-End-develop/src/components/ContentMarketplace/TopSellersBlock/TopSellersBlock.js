import React from 'react';
import { formatEther } from 'ethers/lib/utils';
import { roundString } from '../../../blockchain/functions/Utils/RoundString';
import { ChainName } from '../../../blockchain/functions/ChangeChain/ChainNames';
import { Link } from 'react-router-dom';
import './TopSellersBlock.scss';

const TopSellersBlock = (props) => {
  const { seller } = props;
  return (
    <div className="mediaeye-topsellers-card">
      <Link
        title={
          !seller?.attributes?.user?.attributes?.defaultUsername
            ? '@' + seller?.attributes?.user?.attributes?.username
            : 'Unnamed'
        }
        to={`account/${seller?.attributes?.user?.attributes?.ethAddress}`}
        className="mediaeye-topsellers-card-inner"
      >
        <div className="mediaeye-topsellers-card-inner-srno">{seller?.id}</div>
        <div className="mediaeye-topsellers-card-inner-imgbox">
          <img
            src={
              seller?.attributes?.user?.attributes?.profileImage?._url
                ? seller?.attributes?.user?.attributes?.profileImage?._url
                : '/img/user/mediaeye-user-72.png'
            }
            alt={seller?.attributes?.user?.attributes?.username + "Top User"}
          />
        </div>
        <div className="mediaeye-topsellers-card-inner-content">
          <div className="mediaeye-topsellers-card-inner-content-title">
            {!seller?.attributes?.user?.attributes?.defaultUsername
              ? '@' + seller?.attributes?.user?.attributes?.username
              : 'Unnamed'}
          </div>
          <div className="mediaeye-topsellers-card-inner-content-price m-l-10">
            519.91960 ETH
          </div>
          <div className="mediaeye-topsellers-card-inner-content-usd m-l-15">
            $635,599.90
          </div>
          <div className="mediaeye-topsellers-card-inner-content-amount m-l-10">
            813
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TopSellersBlock;
