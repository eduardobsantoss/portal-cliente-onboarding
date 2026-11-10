import React, { useState } from 'react';
import { useNonPartnerEditor } from '@/flows/onboarding/dados-complementares/representantes/useNonPartnerEditor';
import { useSociosEditor } from '@/flows/onboarding/dados-complementares/socios/useSociosEditor';
import { usePfForm } from '@/flows/onboarding/dados-complementares/usePfForm';
import { usePjForm } from '@/flows/onboarding/dados-complementares/usePjForm';
import type { AccountType, ComplementaryFormSubmitPayload } from '@/types/dadosComplementares';
import {
  LEGAL_REPRESENTATIVE_REQUIRED_MESSAGE,
  buildSubmitPayload,
  hasLegalRepresentative,
} from '@/utils/complementarySubmit';

export function useComplementaryForm(onSubmit: (payload?: ComplementaryFormSubmitPayload) => void) {
  const [accountType, setAccountType] = useState<AccountType>('pj');

  // Validation state
  const [hasDataErrors, setHasDataErrors] = useState(false);
  const [dataErrorMessage] = useState('');

  const pf = usePfForm();
  const pj = usePjForm();

  const [validationErrorNotice, setValidationErrorNotice] = useState<string | null>(null);
  const clearValidationNotice = () => setValidationErrorNotice(null);

  const sociosEditor = useSociosEditor({
    companyAddress: pj.pjCompanyData,
    clearValidationNotice,
  });
  const nonPartnerEditor = useNonPartnerEditor({ clearValidationNotice });

  const selectAccountType = (type: AccountType) => {
    setAccountType(type);
    setHasDataErrors(false);
  };

  // Trigger submission to advance directly to Document Upload
  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    // Validação Item 3: não permitir avançar sem pelo menos um representante legal
    if (accountType === 'pj') {
      if (!hasLegalRepresentative(sociosEditor.socios, nonPartnerEditor.reps)) {
        setValidationErrorNotice(LEGAL_REPRESENTATIVE_REQUIRED_MESSAGE);
        return;
      }
    }

    setValidationErrorNotice(null);

    onSubmit(
      buildSubmitPayload(accountType, sociosEditor.socios, nonPartnerEditor.reps, pj.pjCompanyData)
    );
  };

  return {
    accountType,
    selectAccountType,
    hasDataErrors,
    dataErrorMessage,
    pf,
    pj,
    validationErrorNotice,
    sociosEditor,
    nonPartnerEditor,
    handleSubmit,
  };
}
