import React, { FormEvent, useState } from 'react';
import Input, { inputValType } from "@core/components/Form/Input";
import { gameRoomDataValidation, parseGameRoomFormData, submitCreateGameRoomForm } from '@core/actions/createGameRoomAction';
import Alert from '@core/components/Alert';

function CreateGameRoom (props: CreateGameRoomProps) {
  const [ validationMessage, setValidationMessage ] = useState<string | undefined>();

  const [formData, setFormData] = useState({
    name: null,
    totalMachines: null,
    shifts: null
  });

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

    const { isValid, message } = gameRoomDataValidation(formData);
    const parsedData = parseGameRoomFormData(formData);

    if (isValid) {
      const submitRes = await submitCreateGameRoomForm(parsedData);

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

        <Input
          className="py-2"
          label="Game Room Name"
          name="name"
          type="string"
          placeholder="Enter Game Room Name"
          isRequired={true}
          autoComplete="name"
          value={formData?.name ?? ''}
          onChange={handleChange}
        />

        <Input
          className="py-2"
          label="Total Number of Machines"
          name="totalMachines"
          type="number"
          placeholder="Enter total number of machines"
          isRequired={true}
          autoComplete="amount"
          value={formData?.totalMachines ?? ''}
          onChange={handleChange}
        />

        <Input
          className="py-2"
          label="Number of Shifts"
          name="shifts"
          type="number"
          placeholder="Enter total number of Shifts"
          isRequired={true}
          autoComplete="amount"
          value={formData?.shifts ?? ''}
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
}

export interface CreateGameRoomProps {
}

export default CreateGameRoom;