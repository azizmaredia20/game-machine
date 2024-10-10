import { callApi } from "@utils/index";

export interface expenseFormData {
  storeName: string | null;
  shiftNo: number;
  date: string | null;
  employeePay: number | null;
  ownerPay: number | null;
  tickets: number | null;
  match: number | null;
  securityPay: number | null;
  foodExpense: number | null;
  drawingExpense: number | null;
  groceryExpense: number | null;
  otherExpense: number | null;
  otherExpenseComments: string | null;
}

export interface rawExpenseFormData {
  storeName: string | null;
  shiftNo: string;
  date: string | null;
  employeePay: string | null;
  ownerPay: string | null;
  tickets: string | null;
  match: string | null;
  securityPay: string | null;
  foodExpense: string | null;
  drawingExpense: string | null;
  groceryExpense: string | null;
  otherExpense: string | null;
  otherExpenseComments: string | null;
}

export const submitExpenseForm = async (expenseFormData: expenseFormData) => {

  try {
    const params = new URLSearchParams();
    expenseFormData?.storeName && params.append('storeName', expenseFormData?.storeName);
    expenseFormData?.date && params.append('date', expenseFormData?.date);

    const getRes = await callApi(`/api/expenses/${expenseFormData?.shiftNo}?${params.toString()}`, {
      method: "GET",
      headers: { "Content-Type": "application/json", "trace-id": Date.now() },
    });

    if (Array.isArray(getRes) && getRes.length > 0) {
      throw new Error(`Record for shift number ${expenseFormData.shiftNo} was added on date ${expenseFormData.date}.
        Please use update button to modify the record.`)
    }

    const res = await callApi("/api/expenses", {
      method: "POST",
      body: JSON.stringify(expenseFormData),
      headers: { "Content-Type": "application/json", "trace-id": Date.now() },
    });

    return res;
  } catch (e: any) {
    console.log(`Error while calling endpoint api/expenses/${expenseFormData?.shiftNo} - ${e.message}`);
    return e;
  }
};

export const parsedFormData = (formData: rawExpenseFormData): expenseFormData => {
  return {
    storeName: formData?.storeName,
    shiftNo: parseInt(formData?.shiftNo),
    date: formData?.date,
    employeePay: parseFloat((formData?.employeePay || '0')),
    ownerPay: parseFloat((formData?.ownerPay || '0')),
    tickets: parseFloat((formData?.tickets || '0')),
    match: parseFloat((formData?.match || '0')),
    securityPay: parseFloat((formData?.securityPay || '0')),
    foodExpense: parseFloat((formData?.foodExpense || '0')),
    drawingExpense: parseFloat((formData?.drawingExpense || '0')),
    groceryExpense: parseFloat((formData?.groceryExpense || '0')),
    otherExpense: parseFloat((formData?.otherExpense || '0')),
    otherExpenseComments: formData?.otherExpenseComments
  }
}

export const expenseDataValidation = (formData: expenseFormData) => {
  const formError = { isValid: true, message: "" };
  if (!formData?.date) {
    formError.isValid = false;
    formError.message = formError.message.concat("Date is invalid. <br />");
  }

  if (!formData.shiftNo) {
    formError.isValid = false;
    formError.message = formError.message.concat(
      "Shift Number is invalid. <br />"
    );
  }

  if (!formData.employeePay) {
    formError.isValid = false;
    formError.message = formError.message.concat(
      "Employee pay amount is invalid. <br />"
    );
  }

  if (!formData.ownerPay) {
    formError.isValid = false;
    formError.message = formError.message.concat(
      "Owner pay amount is invalid. <br />"
    );
  }

  if (!formData.tickets) {
    formError.isValid = false;
    formError.message = formError.message.concat(
      "Number of tickets is invalid. <br />"
    );
  }

  if (!formData.match) {
    formError.isValid = false;
    formError.message = formError.message.concat(
      "Match number is invalid. <br />"
    );
  }

  if (!formData.securityPay) {
    formError.isValid = false;
    formError.message = formError.message.concat(
      "Security pay amount is invalid. <br />"
    );
  }

  return formError;
};
