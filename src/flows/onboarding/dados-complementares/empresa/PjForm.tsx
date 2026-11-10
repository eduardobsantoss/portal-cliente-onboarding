import React from 'react';
import { CompanyAddressStep } from '@/flows/onboarding/dados-complementares/empresa/CompanyAddressStep';
import { CompanyDataStep } from '@/flows/onboarding/dados-complementares/empresa/CompanyDataStep';
import { PjStepProgress } from '@/flows/onboarding/dados-complementares/empresa/PjStepProgress';
import type { NonPartnerEditor } from '@/flows/onboarding/dados-complementares/representantes/useNonPartnerEditor';
import { SociosStep } from '@/flows/onboarding/dados-complementares/socios/SociosStep';
import type { SociosEditor } from '@/flows/onboarding/dados-complementares/socios/useSociosEditor';
import type { usePjForm } from '@/flows/onboarding/dados-complementares/usePjForm';

interface PjFormProps {
  pj: ReturnType<typeof usePjForm>;
  hasDataErrors: boolean;
  sociosEditor: SociosEditor;
  nonPartnerEditor: NonPartnerEditor;
  validationErrorNotice: string | null;
  onSubmit: () => void;
}

export const PjForm: React.FC<PjFormProps> = ({
  pj,
  hasDataErrors,
  sociosEditor,
  nonPartnerEditor,
  validationErrorNotice,
  onSubmit,
}) => {
  const { pjStep, setPjStep, pjCompanyData, setPjCompanyData } = pj;

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <PjStepProgress step={pjStep} />

      {/* PASSO 1: DADOS DA EMPRESA */}
      {pjStep === 1 && (
        <CompanyDataStep
          company={pjCompanyData}
          setCompany={setPjCompanyData}
          hasDataErrors={hasDataErrors}
          onNext={() => setPjStep(2)}
        />
      )}

      {/* PASSO 2: ENDEREÇO DA EMPRESA */}
      {pjStep === 2 && (
        <CompanyAddressStep
          company={pjCompanyData}
          setCompany={setPjCompanyData}
          onBack={() => setPjStep(1)}
          onNext={() => setPjStep(3)}
        />
      )}

      {/* PASSO 3: SÓCIOS */}
      {pjStep === 3 && (
        <SociosStep
          sociosEditor={sociosEditor}
          nonPartnerEditor={nonPartnerEditor}
          validationErrorNotice={validationErrorNotice}
          onBack={() => setPjStep(2)}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
};
