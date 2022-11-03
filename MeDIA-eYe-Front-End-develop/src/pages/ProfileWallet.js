import React, { useState, useEffect } from 'react';
import ProfileWalletMain from '../components/Profile/ProfileWallet/ProfileWallet';
import Sidebar from '../components/Profile/Sidebar';
import { useMoralis } from 'react-moralis';
import { useHistory } from 'react-router-dom';

const ProfileWallet = (props) => {
  const { closeNftCollapse } = props;
  const { user } = useMoralis();
  const history = useHistory();
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem('isLogin') ? localStorage.getItem('isLogin') : 'false'
  );

  // useEffect(() => {
  //   setIsLogin(localStorage.getItem('isLogin'));
  // }, [user]);

  // useEffect(() => {
  //   if (isLogin === 'false') {
  //     history.replace('/connect-wallet');
  //   }
  // }, []);

  return (
    <React.Fragment>
      <div onClick={closeNftCollapse} className="profile">
        <div className="container">
          <div className="main_profile">
            <Sidebar />
            <ProfileWalletMain />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProfileWallet;
