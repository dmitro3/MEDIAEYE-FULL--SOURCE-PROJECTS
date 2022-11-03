import React, { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';
import { useHistory, useParams } from 'react-router-dom';
import MyAccount from '../components/Account/Account/MyAccount';
import CreatorAccountMain from '../components/Creators/CreatorAccount/CreatorAccount';

const AccountPage = (props) => {
  const { closeNftCollapse } = props;
  const { Moralis, isInitialized, user } = useMoralis();
  const { userAddress } = useParams();
  const history = useHistory();
  const [accountUser, setAccountUser] = useState(null);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    if (isInitialized) {
      if (user?.attributes?.ethAddress !== userAddress.toLowerCase()) {
        getUser();
      } else {
        setLoading(false);
      }
    }
  }, [user, isInitialized]);

  const getUser = async () => {
    try {
      const userParams = { address: userAddress.toLowerCase() };
      const user = await Moralis.Cloud.run('queryUser', userParams);
      setLoading(false);
      if (user) {
        setAccountUser(user);
      } else {
        history.replace('/404');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <React.Fragment>
      <div onClick={closeNftCollapse} className="mediaeye-layout-content">
        {isLoading ? null : user?.attributes?.ethAddress ===
          userAddress?.toLowerCase() ? (
          <MyAccount />
        ) : (
          <CreatorAccountMain user={accountUser} />
        )}
      </div>
    </React.Fragment>
  );
};

export default AccountPage;
