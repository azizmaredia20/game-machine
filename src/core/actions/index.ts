import { NavigateFunction, redirect } from "react-router-dom";
import { callApi } from "@utils/index";

export const loginAction = async ({ request }: { request: Request }): Promise<Response> => {
  const loginFormData = await request.formData();

  const loginData = {
    username: loginFormData.get('username'),
    password: loginFormData.get('password')
  };

  const res = await callApi('/api/login', {
    method: 'POST',
    body: JSON.stringify(loginData),
    headers: { 'Content-Type': 'application/json', 'trace-id': Date.now() }
  });

  return redirect('/');
}

export const logOutAction = async (navigate: NavigateFunction) => {
  try {
    const res = await callApi('/api/logout', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'trace-id': Date.now() }
    })
    navigate('/login');
  } catch(e) {
    console.log(e)
  }
}

export * from './gameAction';
export * from './verifyAction';
export * from  './expenseAction';
export * from './createGameRoomAction';
export * from './createUsersAction';
