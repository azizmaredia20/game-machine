import { callApi } from "@utils/index";

export interface createGameRoomFormData {
  label: string;
  value: string;
  totalMachines: number;
  shifts: number;
}

export interface rawGameRoomFormData {
  name: string | null;
  totalMachines: number | null;
  shifts: number | null;
}

export const submitCreateGameRoomForm = async (formData: createGameRoomFormData) => {
  try {
    const res = await callApi("/api/gameroom", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json", "trace-id": Date.now() },
    });

    return res;
  } catch (e: any) {
    console.log(`Error while calling endpoint api/gameroom- ${e.message}`);
    return e;
  }
}

export const parseGameRoomFormData = (formData: { name: string; totalMachines: number, shifts: number; }) => {
  const label = formData?.name;
  const value = label?.replace(/\s+/g, '').toUpperCase();
  return {
    label,
    value,
    totalMachines: formData?.totalMachines,
    shifts: formData?.shifts,
  }
}

export const gameRoomDataValidation = (formData: rawGameRoomFormData) => {
  const formError = { isValid: true, message: "" };

  if (!formData.name) {
    formError.isValid = false;
    formError.message = formError.message.concat(
      "Game Room Name is invalid. <br />"
    );
  }


  if (!formData.totalMachines) {
    formError.isValid = false;
    formError.message = formError.message.concat(
      "Total number of machines is invalid. <br />"
    );
  }

  if (!formData.shifts) {
    formError.isValid = false;
    formError.message = formError.message.concat(
      "Number of Shifts is invalid. <br />"
    );
  }

  return formError;
};
