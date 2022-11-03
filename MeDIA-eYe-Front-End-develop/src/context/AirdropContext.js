import React, { createContext, useState } from 'react';

export const AirdropContext = createContext();

const AirdropProvider = ({ children }) => {
  const [completedTasks, setCompletedTasks] = useState(null);

  return (
    <AirdropContext.Provider value={{ completedTasks, setCompletedTasks }}>
      {children}
    </AirdropContext.Provider>
  );
};

export default AirdropProvider;
