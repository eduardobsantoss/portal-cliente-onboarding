import { ref } from 'vue';
import { useNonPartnerEditor } from '@/flows/onboarding/dados-complementares/representantes/useNonPartnerEditor';
import { useSociosEditor } from '@/flows/onboarding/dados-complementares/socios/useSociosEditor';
import { useCnpjLookup } from '@/flows/onboarding/dados-complementares/useCnpjLookup';
import { useCpfLookup } from '@/flows/onboarding/dados-complementares/useCpfLookup';
import { usePfForm } from '@/flows/onboarding/dados-complementares/usePfForm';
import { usePjForm } from '@/flows/onboarding/dados-complementares/usePjForm';
import type { AccountType, ComplementaryFormSubmitPayload } from '@/types/dadosComplementares';
import {
  LEGAL_REPRESENTATIVE_REQUIRED_MESSAGE,
  SOCIOS_PENDING_MESSAGE,
  SOCIOS_REQUIRED_MESSAGE,
  buildSubmitPayload,
  hasLegalRepresentative,
} from '@/utils/complementarySubmit';
import { isSocioComplete } from '@/utils/socio';

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

  // Consultas de documento: o CNPJ/CPF vem primeiro e preenche o restante do formulário.
  const cnpjLookup = useCnpjLookup({ pj, sociosEditor });
  const cpfLookup = useCpfLookup({ pf });

  const selectAccountType = (type: AccountType) => {
    accountType.value = type;
    hasDataErrors.value = false;
  };

  /** Botão discreto de demonstração: preenche o formulário atual com os dados de exemplo. */
  const fillWithMock = () => {
    if (accountType.value === 'pj') {
      cnpjLookup.fillWithMock();
    } else {
      cpfLookup.fillWithMock();
    }
  };

  // Trigger submission to advance directly to Document Upload
  const handleSubmit = (e?: Event) => {
    if (e) e.preventDefault();

    if (accountType.value === 'pf' && cpfLookup.status.value !== 'success') return;

    if (accountType.value === 'pj') {
      if (sociosEditor.socios.value.length === 0) {
        validationErrorNotice.value = SOCIOS_REQUIRED_MESSAGE;
        return;
      }
      if (!sociosEditor.socios.value.every(isSocioComplete)) {
        validationErrorNotice.value = SOCIOS_PENDING_MESSAGE;
        return;
      }
      // Validação Item 3: não permitir avançar sem pelo menos um representante legal
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
        pj.pjCompanyData.value,
        pf.pfData.value
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
    cnpjLookup,
    cpfLookup,
    fillWithMock,
    validationErrorNotice,
    sociosEditor,
    nonPartnerEditor,
    handleSubmit,
  };
}
