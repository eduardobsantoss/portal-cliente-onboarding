import React from 'react';
import { PARTNER_INPUT_CLASS, PARTNER_LABEL_CLASS } from '@/constants/checklistTopics';

interface PartnerFormSelectProps {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
}

/** Select do modal de parte relacionada (opções sem atributo `value`, como no markup original). */
export const PartnerFormSelect: React.FC<PartnerFormSelectProps> = ({ label, value, options, onChange }) => {
  return (
    <div>
      <label className={PARTNER_LABEL_CLASS}>{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={PARTNER_INPUT_CLASS}
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};
