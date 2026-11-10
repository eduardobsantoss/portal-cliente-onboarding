import React from 'react';
import { FormField } from '@/components/ui/FormField';

interface TextFieldProps {
  label: React.ReactNode;
  value: string;
  inputClassName: string;
  onChange?: (value: string) => void;
  type?: 'text' | 'date' | 'email';
  required?: boolean;
  readOnly?: boolean;
  placeholder?: string;
  maxLength?: number;
  wrapperClassName?: string;
  labelClassName?: string;
  footer?: React.ReactNode;
}

export const TextField: React.FC<TextFieldProps> = ({
  label,
  value,
  inputClassName,
  onChange,
  type = 'text',
  required,
  readOnly,
  placeholder,
  maxLength,
  wrapperClassName,
  labelClassName,
  footer,
}) => {
  return (
    <FormField label={label} wrapperClassName={wrapperClassName} labelClassName={labelClassName}>
      <input
        type={type}
        maxLength={maxLength}
        required={required}
        readOnly={readOnly}
        placeholder={placeholder}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        className={inputClassName}
      />
      {footer}
    </FormField>
  );
};
