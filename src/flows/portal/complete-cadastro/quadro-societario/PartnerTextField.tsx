import React from 'react';
import { PARTNER_INPUT_CLASS, PARTNER_LABEL_CLASS } from '@/constants/checklistTopics';

interface PartnerTextFieldProps {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: 'text' | 'number';
  required?: boolean;
  placeholder?: string;
}

/** Input de texto/número do modal de parte relacionada (mesma ordem de atributos do markup original). */
export const PartnerTextField: React.FC<PartnerTextFieldProps> = ({
  label,
  value,
  onChange,
  type = 'text',
  required,
  placeholder,
}) => {
  return (
    <div>
      <label className={PARTNER_LABEL_CLASS}>{label}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={PARTNER_INPUT_CLASS}
        placeholder={placeholder}
      />
    </div>
  );
};
