import React, { createContext, useState, useEffect } from "react";


export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [contextState, setContextState] = useState();


  const updateContextState = (newContext) => {
    setContextState((prevContext) => ({ ...prevContext, ...newContext }));
  };

  return (
    <AppContext.Provider
      value={{
        contextState,
        updateContextState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
