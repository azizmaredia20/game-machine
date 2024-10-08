import React, { useState, createContext, FC } from "react";
import { STORES } from "@client/config";

interface store {
  label: string;
  value: string;
}

export interface StoreContextType {
  store: store;
  setStore: (store: store) => void;
}

export const StoreContext = createContext<StoreContextType | null>(null);

const StoreContextProvider: FC<{children: React.ReactNode}> = ({ children }) => {
  const [store, setStore ] = useState<store>(STORES[0]);

  return (
    <StoreContext.Provider value={{
      store,
      setStore
    }}>
      { children }
    </StoreContext.Provider>
  )
}

export default StoreContextProvider;