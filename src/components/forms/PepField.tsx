import React from 'react';
import { CheckboxField } from '@/components/ui/CheckboxField';

interface PepFieldProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

/** Checkbox de Pessoa Politicamente Exposta; ocupa a linha inteira do grid do pai. */
export const PepField: React.FC<PepFieldProps> = ({ checked, onChange, label }) => {
  return (
    <div className="sm:col-span-2 pt-2 border-t border-slate-200/50">
      <CheckboxField
        checked={checked}
        onChange={onChange}
        labelClassName="flex items-center gap-2 cursor-pointer"
        spanClassName="text-xs font-medium text-slate-700"
      >
        {label}
      </CheckboxField>
    </div>
  );
};
