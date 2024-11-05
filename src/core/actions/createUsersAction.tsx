import { StoreContext } from "@core/contexts/AppContext";
import { Store } from "@customTypes/index";
import { callApi } from "@utils/index";

export interface CreateUserFormData {
  role: string | null;
  username: string | null;
  password: string | null;
  confirmPassword: string | null;
  stores: Store[];
}

export const submitCreateUserForm = async (formData: CreateUserFormData) => {
  try {
    const res = await callApi('/api/register', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json', 'trace-id': Date.now() }
    });
  } catch (e: any) {
    console.log(`Error while calling endpoint api/register - ${e.message}`);
    return e;
  }
};

export const createUserValidation = (formData: CreateUserFormData) => {
  const formError = { isValid: true, message: "" };
  if (!formData?.role) {
    formError.isValid = false;
    formError.message = formError.message.concat("Role is invalid. <br />");
  }

  if (!formData?.stores || formData?.stores.length === 0) {
    formError.isValid = false;
    formError.message = formError.message.concat("User is not assigned any stores. <br />");
  }

  if (!formData.username) {
    formError.isValid = false;
    formError.message = formError.message.concat(
      "User name is invalid. <br />"
    );
  }

  if (!formData.password) {
    formError.isValid = false;
    formError.message = formError.message.concat(
      "Password is invalid. <br />"
    );
  }

  if (!formData.confirmPassword || formData?.confirmPassword !== formData?.password) {
    formError.isValid = false;
    formError.message = formError.message.concat(
      "Confirm Password does not match with Password. <br />"
    );
  }

  return formError;
};
