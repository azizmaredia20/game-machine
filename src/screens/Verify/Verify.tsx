import React, { useState } from "react";
import { useActionData } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

import Input, { inputValType } from "@core/components/Form/Input";
import Alert from "@core/components/Alert";
import Datepicker from "@core/components/Form/Datepicker";
import useStoreContext from "@hooks/useStoreContext";

type valueType = string | number | readonly string[] | undefined | null;

const Verify: React.FC<VerifyProps> = (_props) => {
  const { store } = useStoreContext();

  const [formData, setFormData] = useState({
    storeName: store?.value,
    date: new Date().toISOString(),
    cashFromMachines: null,
    cashInHand: null,
  });

  const [validationMessage, setValidationMessage] = useState<string | null>(
    null
  );

  const handleChange = ({
    name,
    value,
  }: {
    name: string;
    value: inputValType;
  }) => {
    const data = {
      ...formData,
      [name]: value,
    };

    setFormData(data);
  };

  const handleSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidationMessage('');

    const { isValid, message } = verifyDataValidation(formData);

    if (isValid) {
      const submitRes = await submitGameForm(formData);

      if (submitRes instanceof Error) {
        setValidationMessage(submitRes.message);
      } else {
        const updateSubmitteMachines = [ ...submittedMachines, parseInt(submitRes.machineNo)];
        setSubmittedMachines(updateSubmitteMachines);
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
          label="Select Today's Date"
          name="date"
          minDate={new Date()}
          defaultValue={new Date()}
          onChange={handleChange}
        />

        <Input
          className="py-2"
          label="Total Cash received from all machines"
          name="cashFromMachines"
          type="number"
          placeholder="Total Cash received from all machine"
          isRequired={true}
          autoComplete="amount"
          onChange={handleChange}
        />

        <Input
          className="py-2"
          label="Cash in hand after deduction"
          name="cashInHand"
          type="number"
          placeholder="Cash in hand after deduction"
          isRequired={true}
          autoComplete="amount"
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

interface VerifyProps {
  [key: string]: any;
}

export default Verify;
