import { ref } from 'vue';
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
  const accountType = ref<AccountType>('pj');

  // Validation state
  const hasDataErrors = ref(false);
  const dataErrorMessage = ref('');

  const pf = usePfForm();
  const pj = usePjForm();

  const validationErrorNotice = ref<string | null>(null);
  const clearValidationNotice = () => {
    validationErrorNotice.value = null;
  };

  const sociosEditor = useSociosEditor({
    // getter para manter a reatividade do endereço da sede
    companyAddress: () => pj.pjCompanyData.value,
    clearValidationNotice,
  });
  const nonPartnerEditor = useNonPartnerEditor({ clearValidationNotice });

  const selectAccountType = (type: AccountType) => {
    accountType.value = type;
    hasDataErrors.value = false;
  };

  // Trigger submission to advance directly to Document Upload
  const handleSubmit = (e?: Event) => {
    if (e) e.preventDefault();

    // Validação Item 3: não permitir avançar sem pelo menos um representante legal
    if (accountType.value === 'pj') {
      if (!hasLegalRepresentative(sociosEditor.socios.value, nonPartnerEditor.reps.value)) {
        validationErrorNotice.value = LEGAL_REPRESENTATIVE_REQUIRED_MESSAGE;
        return;
      }
    }

    validationErrorNotice.value = null;

    onSubmit(
      buildSubmitPayload(
        accountType.value,
        sociosEditor.socios.value,
        nonPartnerEditor.reps.value,
        pj.pjCompanyData.value
      )
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
