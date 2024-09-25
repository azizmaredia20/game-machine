import React, { ChangeEvent } from "react";

const Input: React.FC<InputProps> = ({
  label,
  handleChange,
  isRequired,
  children,
  ...rest
}: InputProps) => {
  return (
    <div>
      <label className="text-gray-800 text-sm mb-2 block">{label}</label>
      <div className="relative flex items-center">
        <input
          className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
          required={isRequired}
          onChange={handleChange}
          { ...rest }
        />
        {children && children}
      </div>
    </div>
  );
};

interface InputProps {
  label: string;
  type: string;
  name: string;
  value?: string | number;
  placeholder: string;
  isRequired: boolean;
  autoComplete: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
}

export default Input;
