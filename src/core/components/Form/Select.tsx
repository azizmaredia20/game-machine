import React, { useState, ChangeEvent } from "react";

export type selectedValueType = string | number | readonly string[] | undefined;

interface Option {
  value: selectedValueType;
  label: string;
}

interface SelectProps {
  options: Option[];
  defaultValue: selectedValueType;
  className?: string;
  label: string;
  labelClassName?: string;
  name: string;
  onChange: (value: { name?: string; value: selectedValueType }) => void;
}

const Dropdown: React.FC<SelectProps> = ({
  options,
  defaultValue,
  label,
  className,
  labelClassName,
  name,
  onChange,
}) => {
  const [selectedItem, setSelectedItem] = useState<selectedValueType>(defaultValue);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedItem(e.target.value);
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
          value={selectedItem}
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
