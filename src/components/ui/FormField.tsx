import React from 'react';
import { FIELD_LABEL_CLASS } from '@/constants/formStyles';

interface FormFieldProps {
  label: React.ReactNode;
  wrapperClassName?: string;
  labelClassName?: string;
  children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  wrapperClassName,
  labelClassName = FIELD_LABEL_CLASS,
  children,
}) => {
  return (
    <div className={wrapperClassName}>
      <label className={labelClassName}>{label}</label>
      {children}
    </div>
  );
};
