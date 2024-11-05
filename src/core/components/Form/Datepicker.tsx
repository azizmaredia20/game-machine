import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { formatDate } from "@utils/index";

function Datepicker({
  label,
  defaultValue,
  className,
  labelClassName,
  minDate,
  name,
  onChange,
}: DatepickerProps) {
  const [date, setDate] = useState<string | Date | null>(defaultValue); 

  const handleDateChange = (date: string | number | Date) => {
    const formattedValue = formatDate(new Date(date));
    setDate(formattedValue);
    onChange({ name, value: formattedValue });
  };

  return (
    <div className={className}>
      <label className={labelClassName}>
        {label}
      </label>
      <div className="relative flex items-center">
        <DatePicker
          className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
          labelClassName="text-gray-800 text-sm mb-2 block"
          showIcon
          name={name}
          selected={date}
          minDate={minDate}
          onChange={handleDateChange}
          dateFormat="MM/dd/yyyy"
        />
      </div>
    </div>
  );
}

export type dateValueType = Date | null;

export interface DatepickerProps {
  label: string;
  name: string;
  defaultValue: dateValueType
  minDate?: Date;
  onChange: (value: { name: string; value: string | undefined; }) => void;
  labelClassName?: string;
  className?: string;
}

export default Datepicker;
