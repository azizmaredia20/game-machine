import React, { useState, ChangeEvent } from "react";
import { Form, useActionData } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Input from "@core/components/Form/Input";
import Alert from "@core/components/Alert";
import { TOTAL_MACHINE } from "@client/config";

const Game: React.FC<GameProps> = (_props) => {
  const formError = useActionData();
  console.log('FormError', formError)
  const [formData, setFormData] = useState({
    date: new Date().toISOString(),
    machineNo: 0,
    currentIn: null,
    currentOut: null,
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const data = {
      ...formData,
      [event.target.name]: event.target.value,
    };

    setFormData(data);
  };

  const handleDateChange = (date: Date | null) => {
    const res = {
      ...formData,
      date: date?.toISOString(),
    };

    console.log("handleDateChange", res);
    // @ts-expect-error:  Type 'null' is not assignable to type 'Date'
    setFormData(res);
  };

  return (
    <>
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
      <Form method="post" action="/?index" className="mt-8 space-y-4" noValidate>
        {!!formError?.message && (
          <Alert type="ERROR" message={formError?.message} />
        )}
        <div>
          <label className="text-gray-800 text-sm mb-2 block">
            Select Today's Date
          </label>
          <div className="relative flex items-center">
            <DatePicker
              className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
              showIcon
              name="date"
              selected={formData.date}
              minDate={new Date()}
              onChange={handleDateChange}
            />
          </div>
        </div>
        <div>
          <label className="text-gray-800 text-sm mb-2 block">
            Select Machine Number
          </label>
          <div className="relative flex items-center">
            <select
              name="machineNo"
              value={formData.machineNo}
              onChange={handleChange}
              className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
            >
              <option value={0}>Select Option</option>
              {Array.from({ length: TOTAL_MACHINE }, (x, i) => i + 1).map(
                (number) => (
                  <option
                    key={`machine-${number}`}
                    value={number}
                  >{`Machine ${number}`}</option>
                )
              )}
            </select>
          </div>
        </div>

        <Input
          label="Current In"
          name="currentIn"
          type="number"
          placeholder="Enter Current In Value"
          isRequired={true}
          autoComplete="amount"
          handleChange={handleChange}
        />

        <Input
          label="Current Out"
          name="currentOut"
          type="number"
          placeholder="Enter Current Out Value"
          isRequired={true}
          autoComplete="amount"
          handleChange={handleChange}
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
    </>
  );
};

interface GameProps {
  [key: string]: any;
}

export default Game;
