import React, { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';
import { Link } from 'react-router-dom';
import formatAdddress from '../../../utils/formatAdddress';

export const OwnersCard = (props) => {
  const { owners } = props;
  const { Moralis, user } = useMoralis();

  const handleOwnerCases = () => {
    // if there is 1 owner and it is the user
    if (
      owners?.length === 1 &&
      owners[0]?.attributes?.ethAddres === user?.attributes?.ethAddress
    ) {
      return (
        <>
          Owner
          <Link
            to={`/account/${owners[0]?.attributes?.ethAddres}`}
            className="mediaeye-link"
          >
            You
          </Link>
        </>
      );
    }
    // 1 owner and it is not user
    else {
      return (
        <>
          <div className="product-page-inner-content-info-items-col-label">
            {owners?.length > 1 ? 'Owners' : 'Owner:'}
          </div>
          {owners.map((owner) => {
            return (
              <>
                {owner?.attributes?.defaultUsername ? (
                  <Link to={`/account/${owner?.attributes?.ethAddress}`} className="product-page-inner-content-info-items-col-value mediaeye-link">{formatAdddress(owner?.attributes?.ethAddress)}</Link>
                ) : (
                  <Link to={`/account/${owner?.attributes?.ethAddress}`} className="product-page-inner-content-info-items-col-value mediaeye-link">{owner?.attributes?.username}</Link>
                )}
              </>
            );
          })}
        </>
      );
    }
  };

  return <>{handleOwnerCases()}</>;
};

export default OwnersCard;
