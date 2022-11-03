import React, { createContext, useState } from 'react';
import { useMoralis } from 'react-moralis';
export const SubscriptionPopupContext = createContext();

const SubscriptionPopupProvider = ({ children }) => {
  const { user, refetchUserData } = useMoralis();
  const [level, setLevel] = useState(0);

  const startRefreshingUser = async (subEnd) => {
    // stops once subscription end reads differently
    while (subEnd === user.attributes.subscriptionEnd) {
      await refetchUserData();
      // refresh every 15 seconds
      await new Promise((resolve) => setTimeout(resolve, 15000));
    }
  };

  return (
    <SubscriptionPopupContext.Provider
      value={{ level, setLevel, startRefreshingUser }}
    >
      {children}
    </SubscriptionPopupContext.Provider>
  );
};

export default SubscriptionPopupProvider;
