import React, { createContext, useState } from 'react';

export const MintFromCollectionContext = createContext();

const MintFromCollectionProvider = ({ children }) => {
  const [initialCollection, setInitialCollection] = useState('none');

  return (
    <MintFromCollectionContext.Provider
      value={{ initialCollection, setInitialCollection }}
    >
      {children}
    </MintFromCollectionContext.Provider>
  );
};

export default MintFromCollectionProvider;
