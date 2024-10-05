import { callApi } from "@utils/index";

export interface Result {
  message?: string;
}

export const verifyAction = async ({ request }: { request: Request }): Promise<Result> => {
  const registerFormData = await request.formData();
  const formError = { message: '' };

  const verifyData = {
    storeName: registerFormData.get('storeName'),
    date: registerFormData.get('date'),
    machineNo: Number(registerFormData.get('machineNo')) || null,
    currentIn: Number(registerFormData.get('currentIn') || null),
    currentOut: Number(registerFormData.get('currentOut')) || null
  };

  if (!verifyData?.date) {
    formError.message = formError.message.concat('Date is invalid. <br />');
  }

  if (!verifyData.machineNo) {
    formError.message = formError.message.concat('Machine Number is invalid. <br />');
  }

  if (!verifyData.currentIn) {
    formError.message = formError.message.concat('Current In amount is invalid. <br />');
  }

  if (!verifyData.currentOut) {
    formError.message = formError.message.concat('Current Out amount is invalid. <br />');
  }
 
  if (!formError?.message) {
    formError.message = '';
    const res = await callApi('/api/verify', {
      method: 'POST',
      body: JSON.stringify(verifyData),
      headers: { 'Content-Type': 'application/json', 'trace-id': Date.now() }
    });

    if (res instanceof Error) {
      console.log(`Error while calling endpoint ${'/api/verify'} - ${res.message}`);
      formError.message = res.message;
    }
  }

  return formError;
}
