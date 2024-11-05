import { NavigateFunction, redirect } from "react-router-dom";
import { callApi } from "@utils/index";
import { AppContextType, GameRoom } from "@core/contexts/AppContext";
import { User } from "@customTypes/index";

export interface LoginFormData {
  username: string;
  password: string;
}

const getUserGameRoomData = (stores: string[], gameRooms: GameRoom[]): GameRoom[] => {
  if (stores[0] === 'ALL') {
    return gameRooms;
  } else {
    return stores.map(store => gameRooms.find(gameRoom => gameRoom?.value === store)) as GameRoom[];
  }
}

export const getAppContextData = async (): Promise<AppContextType | Error> => {
  try {
    const userApiCall = callApi('/api/user', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'trace-id': Date.now() }
    });

    const gameRoomApiCall = callApi('/api/gameroom', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'trace-id': Date.now() }
    });

    const [user, gameRooms] = await Promise.all<[Promise<User>, Promise<GameRoom[]>]>([userApiCall, gameRoomApiCall]);
    const userGameRoomData = getUserGameRoomData(user?.stores, gameRooms);

    return {
      role: user?.role,
      selectedGameRoom: userGameRoomData[0],
      userGameRoom: userGameRoomData,
      gameRooms
    }
  } catch(e) {
    const message = `Failed to retrieve app context data - ${e}`;
    console.log(message);
    return new Error(message);
  }
}

export const loginFormValidateion = (formData: LoginFormData) => {
  const formError = { isValid: true, message: "" };
  if (!formData?.username) {
    formError.isValid = false;
    formError.message = formError.message.concat("Username is invalid. <br />");
  }

  if (!formData?.password) {
    formError.isValid = false;
    formError.message = formError.message.concat("Password is invalid. <br />");
  }

  return formError;
};

export const loginAction = async (
  formData: { username: string; password: string; }, 
   navigate: NavigateFunction
) => {
  try {
    await callApi('/api/login', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json', 'trace-id': Date.now() }
    });


    // const data = await getAppContextData();
    // if (data instanceof Error) {
    //   throw data;
    // } else {
    //   dispatch({ type: 'APPCONTEXT=>role', value: data?.role });
    //   dispatch({ type: 'APPCONTEXT=>gameRooms', value: data?.gameRooms });
    //   dispatch({ type: 'APPCONTEXT=>userGameRoom', value: data?.userGameRoom });
    //   dispatch({ type: 'APPCONTEXT=>selectedGameRoom', value: data?.selectedGameRoom });
    // }

    return navigate('/');
  } catch(e) {
    // dispatch({ type: 'APPCONTEXT=>default' });
    // navigate('/login');
    console.log(e)
  }
}

export const logOutAction = async (navigate: NavigateFunction, dispatch: any) => {
  try {
    const res = await callApi('/api/logout', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'trace-id': Date.now() }
    });
    dispatch({ type: 'APPCONTEXT=>default' });
    navigate('/login');
  } catch(e) {
    console.log(e)
  }
}
