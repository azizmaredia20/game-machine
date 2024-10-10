import { callApi } from "@utils/index";

export interface VerifyFormData {
  storeName: string | null;
  date: string | null;
  cashFromMachines: number | null;
  cashInHand: number | null;
}

export const submitVerifyForm =  async (verifyFormData: VerifyFormData) => {
  try {
    const res = await callApi("/api/verify", {
      method: "POST",
      body: JSON.stringify(verifyFormData),
      headers: { "Content-Type": "application/json", "trace-id": Date.now() },
    });

    return res;
  } catch (e: any) {
    console.log(`Error while calling endpoint api/verify - ${e.message}`);
    return e;
  }
}



export const verifyDataValidation = (formData: VerifyFormData) => {
  const formError = { isValid: true, message: "" };
  if (!formData?.date) {
    formError.isValid = false;
    formError.message = formError.message.concat("Date is invalid. <br />");
  }

  if (!formData.cashFromMachines) {
    formError.isValid = false;
    formError.message = formError.message.concat(
      "Total Cash recieved from all machines is invalid. <br />"
    );
  }

  if (!formData.cashInHand) {
    formError.isValid = false;
    formError.message = formError.message.concat(
      "Cash in hand after deduction is invalid. <br />"
    );
  }

  return formError;
};