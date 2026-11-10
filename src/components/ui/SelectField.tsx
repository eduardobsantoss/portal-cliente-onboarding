import React from 'react';
import { FormField } from '@/components/ui/FormField';

interface SelectFieldProps {
  label: React.ReactNode;
  value: string;
  options: readonly string[];
  inputClassName: string;
  onChange: (value: string) => void;
  required?: boolean;
  wrapperClassName?: string;
  labelClassName?: string;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  value,
  options,
  inputClassName,
  onChange,
  required,
  wrapperClassName,
  labelClassName,
}) => {
  return (
    <FormField label={label} wrapperClassName={wrapperClassName} labelClassName={labelClassName}>
      <select
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputClassName}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </FormField>
  );
};
