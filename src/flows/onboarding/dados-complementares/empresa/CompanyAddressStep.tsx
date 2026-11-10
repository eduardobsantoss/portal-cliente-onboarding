import React from 'react';
import { AddressFields } from '@/components/forms/AddressFields';
import { CorrespondenceAddressSection } from '@/components/forms/CorrespondenceAddressSection';
import {
  StepBackButton,
  StepNextButton,
} from '@/flows/onboarding/dados-complementares/empresa/StepNavButtons';
import type { PjCompanyFormData } from '@/types/dadosComplementares';
import { pickCorrespondenceAddress, toCorrespondenceKey } from '@/utils/address';

interface CompanyAddressStepProps {
  company: PjCompanyFormData;
  setCompany: React.Dispatch<React.SetStateAction<PjCompanyFormData>>;
  onBack: () => void;
  onNext: () => void;
}

const LOGRADOURO_LABEL = 'Logradouro / Avenida *';
const COMPLEMENTO_PLACEHOLDER = 'Bloco, Sala';

export const CompanyAddressStep: React.FC<CompanyAddressStepProps> = ({
  company,
  setCompany,
  onBack,
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
      <AddressFields
        values={company}
        logradouroLabel={LOGRADOURO_LABEL}
        complementoPlaceholder={COMPLEMENTO_PLACEHOLDER}
        onFieldChange={(field, value) => setCompany({ ...company, [field]: value })}
      />

      {/* Item 5: Endereço de Correspondência PJ */}
      <CorrespondenceAddressSection
        sameAsMain={company.correspondenciaMesmo}
        onSameAsMainChange={(checked) => setCompany({ ...company, correspondenciaMesmo: checked })}
        title="Endereço de Correspondência da Empresa *"
        address={pickCorrespondenceAddress(company)}
        logradouroLabel={LOGRADOURO_LABEL}
        complementoPlaceholder={COMPLEMENTO_PLACEHOLDER}
        onFieldChange={(field, value) =>
          setCompany({ ...company, [toCorrespondenceKey(field)]: value })
        }
      />

      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
        <StepBackButton label="Voltar para Dados" onClick={onBack} />
        <StepNextButton label="Avançar para Quadro Societário" />
      </div>
    </form>
  );
};
