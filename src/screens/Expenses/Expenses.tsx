import React, { FormEvent, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

import Input, { inputValType } from "@core/components/Form/Input";
import Select, { selectedValueType } from "@core/components/Form/Select";
import TextArea, { textAreaValType } from "@core/components/Form/TextArea";
import Alert from "@core/components/Alert";
import Datepicker from "@core/components/Form/Datepicker";
import { formatDate } from "@utils/index";
import { expenseDataValidation, submitExpenseForm, parsedFormData } from "@core/actions/expenseAction";
import useAppContext from "@hooks/useAppContext";

type valueType = string | number | readonly string[] | undefined | null;

const Expenses: React.FC<ExpensesProps> = (_props) => {
  const { appState } = useAppContext();
  const [ validationMessage, setValidationMessage ] = useState<string | undefined>();

  const [formData, setFormData] = useState({
    storeName: appState?.selectedGameRoom?.value,
    shiftNo: 1,
    date: formatDate(new Date()),
    employeePay: null,
    ownerPay: null,
    tickets: null,
    match: null,
    securityPay: null,
    foodExpense: null,
    drawingExpense: null,
    groceryExpense: null,
    otherExpense: null,
    otherExpenseComments: null
  });

  const handleChange = ({
    name,
    value,
  }: {
    name: string;
    value: inputValType | selectedValueType | textAreaValType;
  }) => {
    const data = {
      ...formData,
      [name]: value,
    };

    if (name === 'shiftNo' && formData.shiftNo !== value) {
      data.employeePay = null;
      data.ownerPay = null;
      data.tickets = null;
      data.match = null;
      data.securityPay = null;
      data.foodExpense = null;
      data.drawingExpense = null;
      data.groceryExpense = null;
      data.otherExpense = null;
      data.otherExpenseComments = null;
    }

    setFormData(data);
  };

  const handleSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidationMessage('');

    const { isValid, message } = expenseDataValidation(formData);
    const parsedData = parsedFormData(formData);

    if (isValid) {
      const submitRes = await submitExpenseForm(parsedData);

      if (submitRes instanceof Error) {
        setValidationMessage(submitRes.message);
      }
    } else {
      setValidationMessage(message);
    }
  }


  return (
    <div className="container mx-auto p-8 text-center">
      <form className="mt-8 blok text-left max-w-lg mx-auto" noValidate onSubmit={handleSubmitForm}>
        {!!validationMessage && (
          <Alert type="ERROR" message={validationMessage} />
        )}

        <Datepicker
          className="py-2"
          label="Select Today's Date"
          labelClassName="text-gray-800 text-sm mb-2 block"
          name="date"
          minDate={new Date}
          defaultValue={new Date} 
          onChange={handleChange}
        />
        
        <Select
          label="Select Shift"
          name="shiftNo"
          className="py-2"
          value={formData?.shiftNo}
          labelClassName="text-gray-800 text-sm mb-2 block"
          onChange={handleChange}
          options={Array.from({ length: appState?.selectedGameRoom?.shifts as number }, (_, i) => i + 1).map(
            (no) => ({ label: `Shift ${no}`, value: no })
          )}
        />

        <Input
          className="py-2"
          label="Employee Pay"
          name="employeePay"
          type="number"
          placeholder="Enter Employee Pay"
          isRequired={true}
          autoComplete="amount"
          value={formData?.employeePay ?? ''}
          onChange={handleChange}
        />

        <Input
          className="py-2"
          label="My Pay"
          name="ownerPay"
          type="number"
          placeholder="Enter My Pay"
          isRequired={true}
          autoComplete="amount"
          value={formData?.ownerPay ?? ''}
          onChange={handleChange}
        />


        <Input
          className="py-2"
          label="Tickets"
          name="tickets"
          type="number"
          placeholder="Enter Ticket amount"
          isRequired={true}
          autoComplete="amount"
          value={formData?.tickets ?? ''}
          onChange={handleChange}
        />


        <Input
          className="py-2"
          label="Match"
          name="match"
          type="number"
          placeholder="Enter Match amount"
          isRequired={true}
          autoComplete="amount"
          value={formData?.match ?? ''}
          onChange={handleChange}
        />

        <Input
          className="py-2"
          label="Security Pay"
          name="securityPay"
          type="number"
          placeholder="Enter Security Pay"
          isRequired={true}
          autoComplete="amount"
          value={formData?.securityPay ?? ''}
          onChange={handleChange}
        />

        <Input
          className="py-2"
          label="Food Expense"
          name="foodExpense"
          type="number"
          placeholder="Enter Food Expense"
          isRequired={true}
          autoComplete="amount"
          value={formData?.foodExpense ?? ''}
          onChange={handleChange}
        />

        <Input
          className="py-2"
          label="Drawing Expense"
          name="drawingExpense"
          type="number"
          placeholder="Enter Drawing Expense"
          isRequired={true}
          autoComplete="amount"
          value={formData?.drawingExpense ?? ''}
          onChange={handleChange}
        />

        <Input
          className="py-2"
          label="Grocery Expense"
          name="groceryExpense"
          type="number"
          placeholder="Enter Grocery Expense"
          isRequired={true}
          autoComplete="amount"
          value={formData?.groceryExpense ?? ''}
          onChange={handleChange}
        />

        <Input
          className="py-2"
          label="Other Expenses"
          name="otherExpense"
          type="number"
          placeholder="Enter total of Other Expenses"
          isRequired={true}
          autoComplete="amount"
          value={formData?.otherExpense ?? ''}
          onChange={handleChange}
        />

        <TextArea
          className="py-2"
          label="Other Expenses"
          name="otherExpenseComments"
          placeholder="Add your comments here"
          isRequired={true}
          autoComplete="amount"
          value={formData?.otherExpenseComments ?? ''}
          onChange={handleChange}
        />

        <div className="!mt-8">
          <button
            type="submit"
            className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

interface ExpensesProps {
  [key: string]: any;
}

export default Expenses;
