import { StoreContext } from "@core/contexts/AppContext";
import { callApi } from "@utils/index";
import { isValid } from "react-datepicker/dist/date_utils";

export interface GameFormData {
  storeName: string | null;
  date: string | null;
  machineNo: number | null;
  currentIn: number | null;
  currentOut: number | null;
}

export interface Result {
  isValid: boolean;
  message?: string;
}

export interface GameResult {
  id: string;
  machineNo: number;
}

export const loadSubmittedData = async (gameFormData: GameFormData) => {
  const storeName = gameFormData?.storeName;
  const date = gameFormData?.date;

  if (!storeName || !date) {
    return null;
  }

  try {
    const params = new URLSearchParams({ storeName, date });
    const res = await callApi(`/api/game?${params.toString()}`, {
      method: "GET",
      headers: { "Content-Type": "application/json", "trace-id": Date.now() },
    });

    return res;
  } catch (e: any) {
    console.log(`Error while calling endpoint ${"/api/game"} - ${e.message}`);
    return null;
  }
}

export const submitGameForm = async (gameFormData: GameFormData) => {
  try {
    const params = new URLSearchParams();
    gameFormData?.storeName && params.append('storeName', gameFormData?.storeName);
    gameFormData?.date && params.append('date', gameFormData?.date);

    const getRes = await callApi(`/api/game/${gameFormData?.machineNo}?${params.toString()}`, {
      method: "GET",
      headers: { "Content-Type": "application/json", "trace-id": Date.now() },
    });

    if (Array.isArray(getRes) && getRes.length > 0) {
      throw new Error(`Record for machine number ${gameFormData.machineNo} on date ${gameFormData.date} 
        is already added. Please use update button to modify the record.`)
    }

    const res = await callApi("/api/game", {
      method: "POST",
      body: JSON.stringify(gameFormData),
      headers: { "Content-Type": "application/json", "trace-id": Date.now() },
    });

    return res;
  } catch (e: any) {
    console.log(`Error while calling endpoint api/game/${gameFormData?.machineNo} - ${e.message}`);
    return e;
  }
};

export const updateGameForm = async (gameFormData: GameFormData) => {
  try {
    return await callApi(`/api/game/${gameFormData?.machineNo}`, {
      method: "PUT",
      body: JSON.stringify(gameFormData),
      headers: { "Content-Type": "application/json", "trace-id": Date.now() },
    });
  } catch (e: any) {
    console.log(`Error while update data for machine number ${gameFormData?.machineNo} - ${e.message}`);
    return e;
  }
}

export const gameDataValidation = (formData: GameFormData): Result => {
  const formError = { isValid: true, message: "" };
  if (!formData?.date) {
    formError.isValid = false;
    formError.message = formError.message.concat("Date is invalid. <br />");
  }

  if (!formData.machineNo) {
    formError.isValid = false;
    formError.message = formError.message.concat(
      "Machine Number is invalid. <br />"
    );
  }

  if (!formData.currentIn) {
    formError.isValid = false;
    formError.message = formError.message.concat(
      "Current In amount is invalid. <br />"
    );
  }

  if (!formData.currentOut) {
    formError.isValid = false;
    formError.message = formError.message.concat(
      "Current Out amount is invalid. <br />"
    );
  }

  return formError;
};
