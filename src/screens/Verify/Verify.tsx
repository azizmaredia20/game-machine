import React, { useState } from "react";
import { Form, useActionData } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

import Input, { inputValType } from "@core/components/Form/Input";
import Select, { selectedValueType } from "@core/components/Form/Select";
import Alert from "@core/components/Alert";
import { TOTAL_MACHINE } from "@client/config";
import Datepicker from "@core/components/Form/Datepicker";
import useStoreContext from "@hooks/useStoreContext";

interface ActionData {
  message: string;
}

const Verify: React.FC<VerifyProps> = (_props) => {
  const formError = useActionData();
  const { store } = useStoreContext();

  const [formData, setFormData] = useState({
    date: new Date().toISOString(),
    machineNo: 0,
    currentIn: null,
    currentOut: null,
  });

  const [ validationMessage, setValidationMessage ] = useState<string | null>(null);

  type valueType = string | number | readonly string[] | undefined | null;

  const handleChange = ({
    name,
    value,
  }: {
    name: string;
    value: inputValType | selectedValueType;
  }) => {
    const data = {
      ...formData,
      [name]: value,
    };

    setFormData(data);
  };


  return (
    <div className="container mx-auto p-8 text-center">
      <div className="inline-block">
        {Array.from({ length: TOTAL_MACHINE }, (_, i) => i + 1).map(
          (number) => (
            <div
              key={`machine-${number}`}
              className="bg-blue-600 px-2 py-1 text-xs text-white rounded ml-2 float-left w-7 m-2 text-center"
            >
              {number}
            </div>
          )
        )}
      </div>
      <Form method="post" action="/?index" className="mt-8 blok text-left max-w-lg mx-auto" noValidate>
        {!!formError?.message && (
          <Alert type="ERROR" message={formError?.message} />
        )}

        <input type="hidden" id="storeName" name="storeName" value={store?.value} />

        <Datepicker
          label="Select Today's Date"
          name="date"
          minDate={new Date}
          defaultValue={new Date} 
          onChange={handleChange}
        />

        <Select
          label="Select Machine Number"
          name="machineNo"
          className="py-2"
          defaultValue={formData?.machineNo}
          labelClassName="text-gray-800 text-sm mb-2 block"
          onChange={handleChange}
          options={Array.from({ length: TOTAL_MACHINE }, (_, i) => i + 1).map(
            (no) => ({ label: `Machine ${no}`, value: no })
          )}
        />

        <Input
          className="py-2"
          label="Current In"
          name="currentIn"
          type="number"
          placeholder="Enter Current In Value"
          isRequired={true}
          autoComplete="amount"
          onChange={handleChange}
        />

        <Input
          className="py-2"
          label="Current Out"
          name="currentOut"
          type="number"
          placeholder="Enter Current Out Value"
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
      </Form>
    </div>
  );
};

interface VerifyProps {
  [key: string]: any;
}

export default Verify;
