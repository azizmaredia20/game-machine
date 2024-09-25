import { isValid } from "react-datepicker/dist/date_utils"

export const validateGameData = (data: any)  => {
  if (!data) {
    return {
      isValid: true,
      message: 'Request body is missing.'
    }
  } else if (!data.date) {
    return {
      isValid: true,
      message: 'Date is missing.'
    }
  } 

  return { isValid: true }
}