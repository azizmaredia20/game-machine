import React, { ChangeEvent } from "react";

export type selectedValueType = string | number | readonly string[] | undefined;

export interface Option {
  value: selectedValueType;
  label: string;
}

interface SelectProps {
  options: Option[];
  value: selectedValueType;
  className?: string;
  label: string;
  labelClassName?: string;
  name: string;
  onChange: (value: { name?: string; value: selectedValueType }) => void;
}

const Dropdown: React.FC<SelectProps> = ({
  options,
  value,
  label,
  className,
  labelClassName,
  name,
  onChange,
}) => {
  

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange({
      name,
      value: e.target.value,
    });
  };

  return (
    <div className={className}>
      <label className={labelClassName}>{label}</label>
      <div className="relative flex items-center">
        <select
          name={name}
          value={value}
          onChange={handleChange}
          className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
        >
          {options.map(
            ({ label, value}) => (
              <option
                key={label}
                value={value}
              >{label}</option>
            )
          )}
        </select>
      </div>
    </div>
  );
};

export default Dropdown;
