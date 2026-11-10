import React from 'react';
import { CHECKBOX_INPUT_CLASS } from '@/constants/formStyles';

interface CheckboxFieldProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  labelClassName: string;
  inputClassName?: string;
  spanClassName?: string;
  children: React.ReactNode;
}

export const CheckboxField: React.FC<CheckboxFieldProps> = ({
  checked,
  onChange,
  labelClassName,
  inputClassName = CHECKBOX_INPUT_CLASS,
  spanClassName,
  children,
}) => {
  return (
    <label className={labelClassName}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className={inputClassName}
      />
      <span className={spanClassName}>{children}</span>
    </label>
  );
};
