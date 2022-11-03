import React, { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';
import { Link } from 'react-router-dom';
import formatAdddress from '../../../utils/formatAdddress';

export const MinterCard = (props) => {
  const { address } = props;
  const { Moralis, user } = useMoralis();
  const [minter, setMinter] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const getUser = async () => {
    const params = { address: address };
    const minterObject = await Moralis.Cloud.run('queryUser', params);
    if (minterObject) {
      setMinter(minterObject);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (address && !(address === user?.attributes?.ethAddress)) {
      getUser();
    } else if (address === user?.attributes?.ethAddress) {
      setLoading(false);
    }
  }, [address]);

  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <>
          By
          {user?.attributes?.ethAddress === address ? (
            <Link to={`/account/${address}`} className="mediaeyecreatedby-link">
              You
            </Link>
          ) : (
            <Link to={`/account/${address}`}>
              {minter
                ? minter?.attributes?.defaultUsername
                  ? formatAdddress(minter?.attributes?.ethAddress)
                  : minter?.attributes?.username
                : address}
            </Link>
          )}
        </>
      )}
    </>
  );
};

export default MinterCard;
