import { useContext } from "react";
import { StoreContext, StoreContextType } from "@core/contexts/StoreContext";

const useStoreContext = (): StoreContextType => {
  const storeContext = useContext(StoreContext);

  if (!storeContext) {
    throw new Error('useStoreContext hook should be used by children wrapped inside StoreContextProvider.')
  }

  return storeContext;
}

export default useStoreContext