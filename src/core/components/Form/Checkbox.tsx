import React, { useState } from "react";

interface Option {
  isChecked?: boolean;
  label: string;
  value: any;
}

interface CheckboxProps {
  id?: number;
  label: string;
  onChange: (value: string) => void;
  isChecked?: boolean;
  value?: string;
}

export const Checkbox = ({
  label,
  isChecked,
  value,
  onChange,
  ...rest
}: CheckboxProps) => {
  return (
    <div className="flex items-center mr-3 my-1">
      <input
        onChange={(e) => {
          onChange(e.target.value);
        }}
        type="checkbox"
        checked={isChecked}
        value={value}
        className="w-4 h-4 mr-3 focus:ring-1 focus:ring-offset-gray-200 focus:ring-offset-4 focus:ring-[#007bff]"
      />
      <label htmlFor="checkbox2" className="text-black text-sm">
        {label}
      </label>
    </div>
  );
};

const CheckBoxGroup: React.FC<{
  name: string;
  label: string;
  options: Option[];
  onChange: (value: { name: string; value: any }) => void;
}> = ({ name, label, options, onChange }) => {
  const [selectedValue, setSelectedValue] = useState<Option[]>(
    options?.map((option) => ({ ...option, isChecked: false })) || []
  );

  const handleChange = (value: string) => {
    const updateOptions = selectedValue?.map((option: Option) => {
      if (option.value === value) {
        option.isChecked = !option.isChecked;
      }
      return option;
    });

    setSelectedValue(updateOptions);

    const finalValue = updateOptions.reduce((acc: string[], val: Option) => {
      if (val.isChecked) {
        acc.push(val.value);
      }
      return acc;
    }, []);

    onChange({ name, value: finalValue });
  };

  return (
    <div className="py-2">
      {label && (
        <label className="text-gray-800 text-sm mb-2 block" htmlFor={label}>
          {label}
        </label>
      )}
      <div className="flex flex-wrap">
        {options?.map((option) => (
          <Checkbox
            key={option.label}
            label={option.label}
            value={option.value}
            onChange={handleChange}
            isChecked={option.isChecked}
          />
        ))}
      </div>
    </div>
  );
};

export default CheckBoxGroup;
