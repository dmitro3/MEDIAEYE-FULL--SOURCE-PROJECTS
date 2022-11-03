import React, { createContext, useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';
export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userData, setUser] = useState({});
  const { user } = useMoralis();

  /*const onChainChange = Moralis.onChainChanged(chain => {
    // convert hexidecimal result to decimal
    const chainId = parseInt(chain, 16) === 56 ? 'BNB' : 'ETH';
    console.log('USER CONTEXT CHAIN CHANGE: ', chainId);
  });*/

  useEffect(() => {
    setUser(user);
  }, [user]);

  return (
    <UserContext.Provider value={{ userData, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
