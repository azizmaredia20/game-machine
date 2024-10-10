import React, { ChangeEvent, useState } from "react";

const Input: React.FC<InputProps> = ({
  label,
  name,
  onChange,
  isRequired,
  children,
  className,
  value,
  ...rest
}: InputProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    onChange({
      name,
      value: inputValue
    })
  }

  return (
    <div className={className}>
      <label className="text-gray-800 text-sm mb-2 block">{label}</label>
      <div className="relative flex items-center">
        <input
          className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
          value={value}
          name={name}
          required={isRequired}
          onChange={handleChange}
          { ...rest }
        />
        {children && children}
      </div>
    </div>
  );
};

export type inputValType = string | readonly string[] | number | undefined;

interface InputProps {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  isRequired: boolean;
  value?: inputValType;
  autoComplete: string;
  className?: string;
  onChange: (value: { name: string; value: inputValType }) => void;
  children?: React.ReactNode;
}

export default Input;
