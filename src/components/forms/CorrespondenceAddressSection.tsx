import React from 'react';
import { motion } from 'motion/react';
import { AddressFields } from '@/components/forms/AddressFields';
import { CheckboxField } from '@/components/ui/CheckboxField';
import type { AddressField, AddressValues } from '@/types/forms';

interface CorrespondenceAddressSectionProps {
  sameAsMain: boolean;
  onSameAsMainChange: (checked: boolean) => void;
  title: string;
  address: AddressValues;
  onFieldChange: (field: AddressField, value: string) => void;
  logradouroLabel: string;
  complementoPlaceholder: string;
}

export const CorrespondenceAddressSection: React.FC<CorrespondenceAddressSectionProps> = ({
  sameAsMain,
  onSameAsMainChange,
  title,
  address,
  onFieldChange,
  logradouroLabel,
  complementoPlaceholder,
}) => {
  return (
    <div className="pt-2">
      <CheckboxField
        checked={sameAsMain}
        onChange={onSameAsMainChange}
        labelClassName="flex items-center gap-2.5 cursor-pointer p-3 bg-slate-50 border border-slate-200/80 rounded-xl"
        spanClassName="text-xs font-semibold text-slate-800"
      >
        O endereço de correspondência é o mesmo
      </CheckboxField>

      {!sameAsMain && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-4 p-4 border border-slate-200 rounded-2xl bg-slate-50/50 space-y-4"
        >
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">{title}</h4>
          <AddressFields
            values={address}
            onFieldChange={onFieldChange}
            required={!sameAsMain}
            cepPlaceholder="00000-000"
            logradouroLabel={logradouroLabel}
            complementoPlaceholder={complementoPlaceholder}
          />
        </motion.div>
      )}
    </div>
  );
};
