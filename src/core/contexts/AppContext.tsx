import React, { useReducer, createContext, FC, useEffect } from "react";

export interface GameRoom {
  label: string;
  value: string;
  totalMachines: number;
  shifts: number;
}

export interface AppContextType {
  role: 'USER' | 'ADMIN' | null;
  userGameRoom: GameRoom[] | null;
  selectedGameRoom: GameRoom | null;
  gameRooms: GameRoom[] | null;
}

export const defaultAppContext: AppContextType = {
  role: null,
  userGameRoom: [],
  selectedGameRoom: null,
  gameRooms: [],
}

const appReducer = (state: AppContextType, action: { type: string; value: any }) => {
  const keyToUpdate = action?.type?.split("=>")[1];

  if (keyToUpdate === "default") {
    return defaultAppContext;
  }

  if (!keyToUpdate || !state?.hasOwnProperty(keyToUpdate)) {
    throw new Error('Invalid key to update the App Context');
  }
 
  return {
    ...state,
    [keyToUpdate]: action?.value
  };
}

export const AppContext = createContext<AppContextType | null>(null);

const AppContextProvider: FC<{children: React.ReactNode}> = ({ children }) => {
  const [appState, dispatch] = useReducer<any, any>(appReducer, defaultAppContext);

  return (
    <AppContext.Provider value={{ appState, dispatch }}>
      { children }
    </AppContext.Provider>
  )
}

export default AppContextProvider;
