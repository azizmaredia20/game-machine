import { callApi } from "@utils/index";

interface Result {
  message?: string;
}

export const gameAction = async ({ request }: { request: Request }): Promise<Result> => {
  const registerFormData = await request.formData();
  const formError = { message: '' };

  const gameData = {
    date: registerFormData.get('date'),
    machineNo: Number(registerFormData.get('machineNo')) || null,
    currentIn: Number(registerFormData.get('currentIn') || null),
    currentOut: Number(registerFormData.get('currentOut')) || null
  };

  console.log('gameData', gameData);

  if (!gameData?.date) {
    formError.message = formError.message.concat('Date is invalid. <br />');
  }

  if (!gameData.machineNo) {
    formError.message = formError.message.concat('Machine Number is invalid. <br />');
  }

  if (!gameData.currentIn) {
    formError.message = formError.message.concat('Current In amount is invalid. <br />');
  }

  if (!gameData.currentOut) {
    formError.message = formError.message.concat('Current Out amount is invalid. <br />');
  }
 
  if (!formError?.message) {
    formError.message = '';
    const res = await callApi('/api/game', {
      method: 'POST',
      body: JSON.stringify(gameData),
      headers: { 'Content-Type': 'application/json', 'trace-id': Date.now() }
    });

    if (res instanceof Error) {
      console.log(`Error while calling endpoint ${'/api/game'} - ${res.message}`);
      formError.message = res.message;
    }
  }

  return formError;
}