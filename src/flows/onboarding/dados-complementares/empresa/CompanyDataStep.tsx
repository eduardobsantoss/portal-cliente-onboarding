import React from 'react';
import { SelectField } from '@/components/ui/SelectField';
import { TextField } from '@/components/ui/TextField';
import { EMPRESA_TIPOS } from '@/constants/complementaryForm';
import { FIELD_VARIANT_STYLES } from '@/constants/formStyles';
import { CompanyCnaeField } from '@/flows/onboarding/dados-complementares/empresa/CompanyCnaeField';
import { StepNextButton } from '@/flows/onboarding/dados-complementares/empresa/StepNavButtons';
import type { PjCompanyFormData } from '@/types/dadosComplementares';

interface CompanyDataStepProps {
  company: PjCompanyFormData;
  setCompany: React.Dispatch<React.SetStateAction<PjCompanyFormData>>;
  hasDataErrors: boolean;
  onNext: () => void;
}

const READ_ONLY_INPUT_CLASS =
  'w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-bold';
const READ_ONLY_MONO_INPUT_CLASS =
  'w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-mono font-bold';
const INPUT_CLASS = FIELD_VARIANT_STYLES.page.input;

export const CompanyDataStep: React.FC<CompanyDataStepProps> = ({
  company,
  setCompany,
  hasDataErrors,
  onNext,
}) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onNext();
      }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <TextField
          wrapperClassName="sm:col-span-2"
          label="Razão Social / Nome Empresarial"
          readOnly
          value={company.razaoSocial}
          inputClassName={READ_ONLY_INPUT_CLASS}
        />

        <TextField
          label="CNPJ"
          readOnly
          value={company.cnpj}
          inputClassName={READ_ONLY_MONO_INPUT_CLASS}
        />

        <TextField
          type="date"
          label="Data de Abertura da Empresa *"
          required
          value={company.dataAbertura}
          onChange={(value) => setCompany({ ...company, dataAbertura: value })}
          inputClassName={INPUT_CLASS}
        />

        <TextField
          label="Capital Social (R$) *"
          required
          placeholder="Ex: 500.000,00"
          value={company.capitalSocial}
          onChange={(value) => setCompany({ ...company, capitalSocial: value })}
          inputClassName={INPUT_CLASS}
        />

        <TextField
          label="Faturamento Anual Estimado (R$) *"
          required
          placeholder="Ex: 5.000.000,00"
          value={company.faturamentoAnual}
          onChange={(value) => setCompany({ ...company, faturamentoAnual: value })}
          inputClassName={INPUT_CLASS}
        />

        <SelectField
          wrapperClassName="sm:col-span-2"
          label="Tipo de Empresa (Natureza Jurídica) *"
          required
          value={company.tipoEmpresa}
          options={EMPRESA_TIPOS}
          onChange={(value) => setCompany({ ...company, tipoEmpresa: value })}
          inputClassName={INPUT_CLASS}
        />

        <CompanyCnaeField
          value={company.cnae}
          onChange={(value) => setCompany({ ...company, cnae: value })}
          hasDataErrors={hasDataErrors}
        />
      </div>

      <div className="pt-4 border-t border-slate-100 flex justify-end">
        <StepNextButton label="Avançar para Endereço" />
      </div>
    </form>
  );
};
