import React from 'react';
import type { PfFormData } from '@/types/dadosComplementares';
import { SubmitDocumentsButton } from '@/flows/onboarding/dados-complementares/SubmitDocumentsButton';
import { PfAddressSection } from './PfAddressSection';
import { PfOptionalSection } from './PfOptionalSection';
import { PfPersonalSection } from './PfPersonalSection';

interface PfFormProps {
  pfData: PfFormData;
  setPfData: React.Dispatch<React.SetStateAction<PfFormData>>;
  showOptionals: boolean;
  onToggleOptionals: () => void;
  hasDataErrors: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export const PfForm: React.FC<PfFormProps> = ({
  pfData,
  setPfData,
  showOptionals,
  onToggleOptionals,
  hasDataErrors,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {/* Bloco 1: Dados Pessoais */}
      <PfPersonalSection pfData={pfData} setPfData={setPfData} hasDataErrors={hasDataErrors} />

      {/* Bloco 2: Endereço Residencial */}
      <PfAddressSection pfData={pfData} setPfData={setPfData} />

      {/* Seção Opcional Colapsável */}
      <PfOptionalSection
        pfData={pfData}
        setPfData={setPfData}
        isOpen={showOptionals}
        onToggle={onToggleOptionals}
      />

      {/* Submit Action */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
        <SubmitDocumentsButton type="submit" />
      </div>
    </form>
  );
};
