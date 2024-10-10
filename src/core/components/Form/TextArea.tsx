import React, { ChangeEvent, useState } from "react";

const TextArea: React.FC<TextAreaProps> = ({
  label,
  name,
  onChange,
  isRequired,
  children,
  className,
  value,
  ...rest
}: TextAreaProps) => {
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
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
        <textarea
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

export type textAreaValType = string | undefined;

interface TextAreaProps {
  label: string;
  name: string;
  placeholder: string;
  isRequired: boolean;
  value?: textAreaValType;
  autoComplete: string;
  className?: string;
  onChange: (value: { name: string; value: textAreaValType }) => void;
  children?: React.ReactNode;
}

export default TextArea;
