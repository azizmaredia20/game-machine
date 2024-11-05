import React, { useState } from 'react';

interface RadioProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  checked?: boolean;
}

const Radio: React.FC<RadioProps> = ({ label, value, onChange, checked }) => {
  return (
    <div className="flex items-center">
      <input
        type="radio"
        className="w-5 h-5"
        value={value} 
        checked={checked} 
        onChange={(e) => onChange(e.target.value)}
      />
      <label className="text-sm text-gray-800 ml-2">{label}</label>
    </div>
  );
};

const RadioGroup: React.FC<{
  name: string; 
  options: { label: string; value: string }[]; 
  defaultValue?: string;
  onChange: (value: { name: string; value: string; }) => void;
}> 
  = ({ name, options, defaultValue, onChange }) => {
  const [selectedValue, setSelectedValue] = useState<string>(defaultValue || '');

  const handleChange = (value: string) => {
    setSelectedValue(value);
    onChange({ name, value });
  };

  return (
    <div className="space-x-6 flex py-2">
      {options.map((option) => (
        <Radio
          key={option.value}
          label={option.label}
          value={option.value}
          onChange={handleChange}
          checked={selectedValue === option.value}
        />
      ))}
    </div>
  );
};

export default RadioGroup;