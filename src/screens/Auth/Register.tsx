import React, { useState, FormEvent } from "react";
import { useSearchParams } from "react-router-dom";

import Input, { inputValType } from "@core/components/Form/Input";
import PasswordInput from "@core/components/Form/PasswordInput";
import RadioGroup from "@core/components/Form/Radio";
import Alert from "@core/components/Alert";
import { createUserValidation, submitCreateUserForm } from "@core/actions";
import CheckBoxGroup from "@core/components/Form/Checkbox";
import { STORES } from "@client/config";

const Register: React.FC<RegisterProps> = ({ stores }) => {
  const [validationMessage, setValidationMessage] = useState<
    string | undefined
  >();
  const [params, _] = useSearchParams();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    role: "USER",
    stores: []
  });

  const handleChange = ({
    name,
    value
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

  const handleRegisterForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidationMessage("");

    const { isValid, message } = createUserValidation(formData);

    if (isValid) {
      const res = await submitCreateUserForm(formData);

      if (res instanceof Error) {
        setValidationMessage(res.message);
      }
    } else {
      setValidationMessage(message);
    }
  };

  return (
    <>
      <div className="bg-gray-50 font-[sans-serif]">
        <div className="p-8 bg-white">
          <h2 className="text-gray-800 text-center text-2xl font-bold">
            Create User
          </h2>
          <form
            className="mt-8 blok text-left max-w-lg mx-auto"
            noValidate
            onSubmit={handleRegisterForm}
          >
            {!!validationMessage && (
              <Alert type="ERROR" message={validationMessage} />
            )}

            <RadioGroup
              name="role"
              options={[
                { label: 'User', value: 'USER' },
                { label: 'Admin', value: 'ADMIN' },
              ]}
              onChange={handleChange}
              defaultValue={formData?.role}
            />

            <CheckBoxGroup
              name="stores" 
              label="Assign Stores to User" 
              options={STORES} 
              onChange={handleChange}
            />

            <Input
              label="User Name"
              name="username"
              type="text"
              placeholder="Enter user name"
              isRequired={true}
              autoComplete="username"
              onChange={handleChange}
              className="py-2"
            />
            
            <PasswordInput
              label="Password"
              name="password"
              placeholder="Enter password"
              isRequired={true}
              autoComplete="current-password"
              onChange={handleChange}
              className="py-2"
            />

            <PasswordInput
              label="Confirm Password"
              name="confirmPassword"
              placeholder="Re-enter password"
              isRequired={true}
              autoComplete="new-password"
              onChange={handleChange}
              className="py-2"
            />

            <div className="!mt-8">
              <button
                type="submit"
                className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export type Store = {
  label: string;
  value: string;
}

interface RegisterProps {
  stores: Store[]
}

export default Register;
