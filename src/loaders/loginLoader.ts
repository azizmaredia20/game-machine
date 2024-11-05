import { User } from "@customTypes/index";
import { callApi } from "@utils/index";
import { redirect } from 'react-router-dom';

export const loginLoader = async (): Promise<User | null> => {
  try {
    const user = await callApi('/api/user');
    return user as User;
  } catch(e) {
    console.log(e);
    return null;
  }
}
