import { useContext } from "react";
import { AppContext, AppContextType } from "@core/contexts/AppContext";

const useAppContext = (): { appState: AppContextType; dispatch: any } => {
  const appContext = useContext(AppContext);

  if (!appContext) {
    throw new Error('useAppContext hook should be used by children wrapped inside AppContextProvider.')
  }

  return appContext;
}

export default useAppContext;