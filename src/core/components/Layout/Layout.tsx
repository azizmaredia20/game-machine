import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import useAppContext from "@hooks/useAppContext";
import { getAppContextData } from "@core/actions";
import { Header } from "./Header";
import SelectStore from "./SelectStore";
import Spinner from "../Spinner";
import { AppContextType } from "@core/contexts/AppContext";

const Layout: React.FC<LayoutProps> = (
  { showSelectStore, validateAdminRoutes } = { showSelectStore: true }
) => {
  const { appState, dispatch } = useAppContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!appState?.role) {
      setIsLoading(true);
      getAppContextData()
      .then((data: AppContextType | Error) => {
        if (data instanceof Error) {
          throw data;
        }
        dispatch({ type: 'APPCONTEXT=>role', value: data?.role });
        dispatch({ type: 'APPCONTEXT=>gameRooms', value: data?.gameRooms });
        dispatch({ type: 'APPCONTEXT=>userGameRoom', value: data?.userGameRoom });
        dispatch({ type: 'APPCONTEXT=>selectedGameRoom', value: data?.selectedGameRoom });
      })
      .catch(e => {
        dispatch({ type: 'APPCONTEXT=>default' });
        navigate('/login');
      })
      .finally(() => {
        setIsLoading(false);
      });
    }
  }, [appState?.role]);

  if (isLoading) {
    return <Spinner />
  }

  if (appState.role === 'USER' && validateAdminRoutes) {
    const from = location.state?.from?.pathname || '/';
    return <Navigate to={from} replace />;
  }

  return (
    <>
      <Header />
      {showSelectStore && <SelectStore />}
      <Outlet />
    </>
  );
};

interface LayoutProps {
  showSelectStore?: boolean;
  validateAdminRoutes?: boolean;
}

export default Layout;
