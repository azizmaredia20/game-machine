import React, { useState, FormEvent, useEffect, MouseEventHandler } from "react";
import "react-datepicker/dist/react-datepicker.css";

import Input, { inputValType } from "@core/components/Form/Input";
import Select, { selectedValueType } from "@core/components/Form/Select";
import Alert from "@core/components/Alert";
import { TOTAL_MACHINE } from "@client/config";
import Datepicker from "@core/components/Form/Datepicker";
import useStoreContext from "@hooks/useStoreContext";
import { gameDataValidation, submitGameForm, updateGameForm, loadSubmittedData, GameResult } from "@core/actions/gameAction";
import { formatDate, getPastDate } from '@utils/index';

type valueType = string | number | readonly string[] | undefined | null;

const Game: React.FC<GameProps> = (_props) => {
  const [ validationMessage, setValidationMessage ] = useState<string | undefined>();
  const [submittedMachines, setSubmittedMachines] = useState<number[] | null>(null);
  const { store } = useStoreContext();

  const defaultFormData = {
    storeName: store.value,
    date: formatDate(new Date()),
    machineNo: 1,
    currentIn: null,
    currentOut: null,
  };
  const [formData, setFormData] = useState(defaultFormData);

  useEffect(() => {
    (async () => {
      const submittedMachines = await loadSubmittedData(formData)
      if (Array.isArray(submittedMachines)) {
        const machines = submittedMachines.map(({ machineNo }: GameResult) => machineNo )
        setSubmittedMachines(machines);
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.date, formData.storeName]);

  const handleChange = async ({
    name,
    value,
  }: {
    name: string;
    value: inputValType | selectedValueType;
  }) => {
    const data = { ...{
      ...formData,
      [name]: value,
    } };

    if (name === 'machineNo' && formData.machineNo !== value) {
      data.currentIn = null;
      data.currentOut = null;
    }

    setFormData(data);
  };

  console.log('checking', getPastDate(undefined, 2));

  const handleSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
    const formType = event?.nativeEvent?.submitter?.innerHTML;
    event.preventDefault();
    setValidationMessage('');

    const { isValid, message } = gameDataValidation(formData);

    if (isValid) {
      let res = null;
      if (formType === 'Submit') {
        res = await submitGameForm(formData);
      } else {
        res = await updateGameForm(formData);
      }

      if (res instanceof Error) {
        setValidationMessage(res.message);
      } else if (formType === 'Submit') {
        const updateSubmitteMachines = [...(submittedMachines as number[]), parseInt(res.machineNo)];
        setSubmittedMachines(updateSubmitteMachines);
      }
    } else {
      setValidationMessage(message);
    }
  }

  return (
    <div className="container mx-auto p-8 text-center">
      <div className="inline-block">
        {Array.from({ length: TOTAL_MACHINE }, (_, i) => i + 1).map(
          (number) => (
            <div
              key={`machine-${number}`}
              className={`${submittedMachines && submittedMachines.includes(number) ? 'bg-red-600': 'bg-blue-600' } 
                px-2 py-1 text-xs text-white rounded ml-2 float-left w-7 m-2 text-center`}
            >
              {number}
            </div>
          )
        )}
      </div>
      <form className="mt-8 blok text-left max-w-lg mx-auto" noValidate onSubmit={handleSubmitForm}>
        {!!validationMessage && (
          <Alert type="ERROR" message={validationMessage} />
        )}

        {/* <input type="hidden" id="storeName" name="storeName" value={store?.value} /> */}

        <Datepicker
          label="Select Today's Date"
          name="date"
          minDate={getPastDate(undefined, 2)}
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
          value={formData?.currentIn ?? ''}
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
          value={formData?.currentOut ?? ''}
          autoComplete="amount"
          onChange={handleChange}
        />

        <div className="!mt-8">
          <button
            type="submit"
            className="w-full py-3 px-4 my-2 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
          >
            Submit
          </button>

          <button
            type="submit"
            className="w-full py-3 px-4 my-2 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

interface GameProps {
  [key: string]: any;
}

export default Game;
