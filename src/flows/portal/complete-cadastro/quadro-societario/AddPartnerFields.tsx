import React from 'react';
import {
  PARTNER_MARITAL_STATUS_OPTIONS,
  PF_PARTNER_ROLE_OPTIONS,
  PJ_PARTNER_ROLE_OPTIONS,
} from '@/constants/documentChecklist';
import type { NewPartnerForm } from '@/types/documentChecklist';
import { PartnerFormSelect } from './PartnerFormSelect';
import { PartnerTextField } from './PartnerTextField';

interface AddPartnerFieldsProps {
  values: NewPartnerForm;
  onFieldChange: <K extends keyof NewPartnerForm>(field: K, value: NewPartnerForm[K]) => void;
}

/** Campos do formulário "Adicionar Parte Relacionada" (rótulos e opções mudam conforme PF/PJ). */
export const AddPartnerFields: React.FC<AddPartnerFieldsProps> = ({ values, onFieldChange }) => {
  const isPJ = values.type === 'PJ';

  return (
    <>
      <PartnerTextField
        label={isPJ ? 'Razão Social / Nome da Empresa' : 'Nome Completo'}
        required
        value={values.name}
        onChange={(value) => onFieldChange('name', value)}
        placeholder={isPJ ? 'Ex: Agro Holding Participações S/A' : 'Nome completo da parte'}
      />

      <div className="grid grid-cols-2 gap-3">
        <PartnerTextField
          label={isPJ ? 'CNPJ' : 'CPF'}
          required
          value={values.cpf}
          onChange={(value) => onFieldChange('cpf', value)}
          placeholder={isPJ ? '00.000.000/0001-00' : '000.000.000-00'}
        />

        <PartnerTextField
          label="Participação (%)"
          type="number"
          value={values.quotaPercentage}
          onChange={(value) => onFieldChange('quotaPercentage', Number(value))}
        />
      </div>

      <div className={`grid ${isPJ ? 'grid-cols-1' : 'grid-cols-2'} gap-3`}>
        <PartnerFormSelect
          label="Cargo / Função"
          value={values.role}
          options={isPJ ? PJ_PARTNER_ROLE_OPTIONS : PF_PARTNER_ROLE_OPTIONS}
          onChange={(value) => onFieldChange('role', value)}
        />

        {values.type === 'PF' && (
          <PartnerFormSelect
            label="Estado Civil"
            value={values.maritalStatus}
            options={PARTNER_MARITAL_STATUS_OPTIONS}
            onChange={(value) => onFieldChange('maritalStatus', value)}
          />
        )}
      </div>
    </>
  );
};
