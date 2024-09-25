import React, { useState, ChangeEvent } from 'react';
import { Form, useActionData, useSearchParams } from 'react-router-dom';

import Input from '@core/components/Form/Input';
import PasswordInput from '@core/components/Form/PasswordInput';
import Alert from '@core/components/Alert';
import { ADMIN_KEY } from '@client/config';

const Register: React.FC<RegisterProps> = (props) => {
  const validationErrors = useActionData();
  const [ params, _ ] = useSearchParams();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    role: params.get('adminKey') === ADMIN_KEY ? 'ADMIN' : 'USER'
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const data = {
      ...formData,
      [event.target.name]: event.target.value,
    };

    setFormData(data);
  };

  return (
    <>
      <div className="bg-gray-50 font-[sans-serif]">
        <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
          <div className="max-w-md w-full">
            <div className="p-8 rounded-2xl bg-white shadow">
              <h2 className="text-gray-800 text-center text-2xl font-bold">
                Register
              </h2>
              <Form method="post" action="/register" className="mt-8 space-y-4" noValidate>
                {!!validationErrors && (
                  <Alert type="ERROR" message={validationErrors?.message} />
                )}
                <input type="hidden" id="role" name="role" value={formData.role} />
                <Input
                  label="User Name"
                  name="username"
                  type="text"
                  placeholder="Enter user name"
                  isRequired={true}
                  autoComplete="username"
                  handleChange={handleChange}
                />

                <PasswordInput
                  label="Password"
                  name="password"
                  placeholder="Enter password"
                  isRequired={true}
                  autoComplete="current-password"
                  handleChange={handleChange}
                />

                <PasswordInput
                  label="Confirm Password"
                  name="confirmPassword"
                  placeholder="Re-enter password"
                  isRequired={true}
                  autoComplete="new-password"
                  handleChange={handleChange}
                />

                <div className="!mt-8">
                  <button
                    type="submit"
                    className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                  >
                    Sign in
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

interface RegisterProps {
  [key: string]: any;
}

export default Register;
