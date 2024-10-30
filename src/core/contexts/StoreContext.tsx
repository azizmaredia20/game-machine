import React, { useState, createContext, FC } from "react";
import { STORES } from "@client/config";

interface Store {
  label: string;
  value: string;
}

export interface StoreContextType {
  store: Store;
  setStore: (store: Store) => void;
}

export const StoreContext = createContext<StoreContextType | null>(null);

const StoreContextProvider: FC<{children: React.ReactNode}> = ({ children }) => {
  const [store, setStore ] = useState<Store>(STORES[0]);

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