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


export const registerAction = async ({ request }: { request: Request }): Promise<Response | object> => {
  const registerFormData = await request.formData();
  const validationErrors: { message?: string; } = {};

  const confirmPassword = registerFormData.get('confirmPassword');
  const registerData = {
    username: registerFormData.get('username'),
    password: registerFormData.get('password'),
    role: registerFormData.get('role')
  };

  if (registerData.password === confirmPassword) {
    const res = await callApi('/api/register', {
      method: 'POST',
      body: JSON.stringify(registerData),
      headers: { 'Content-Type': 'application/json', 'trace-id': Date.now() }
    });
  
    return redirect('/login');
  } else {
    validationErrors.message = "Password don't match. Please enter them again.";
    return validationErrors;
  }
};

export * from './gameAction';
export * from './verifyAction';
