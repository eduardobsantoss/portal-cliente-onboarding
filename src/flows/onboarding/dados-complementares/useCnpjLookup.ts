import { ref } from 'vue';
import type { SociosEditor } from '@/flows/onboarding/dados-complementares/socios/useSociosEditor';
import type { usePjForm } from '@/flows/onboarding/dados-complementares/usePjForm';
import { EMPTY_PJ_COMPANY_DATA, INITIAL_PJ_COMPANY_DATA } from '@/mocks/complementaryCompany';
import { CNPJ_LOOKUP_MESSAGES, CnpjLookupError, fetchCnpj } from '@/services/receitaws';
import type { DocumentLookupStatus } from '@/types/dadosComplementares';
import { isValidCnpj } from '@/utils/documentValidation';
import { mapQsaToSocios, mapReceitaToCompany } from '@/utils/receitaMapping';
import { maskCnpj, onlyDigits } from '@/utils/registrationMasks';

interface UseCnpjLookupOptions {
  pj: ReturnType<typeof usePjForm>;
  sociosEditor: SociosEditor;
}

/**
 * Consulta do CNPJ na ReceitaWS: preenche a empresa, trava os campos devolvidos
 * e pré-cria os sócios a partir do QSA. Os demais campos continuam editáveis.
 */
export function useCnpjLookup({ pj, sociosEditor }: UseCnpjLookupOptions) {
  const status = ref<DocumentLookupStatus>('idle');
  const errorMessage = ref<string | null>(null);
  // Descarta respostas atrasadas quando o usuário altera o CNPJ durante a consulta.
  let requestId = 0;

  const resetResults = (cnpj: string) => {
    pj.setPjCompanyData({ ...EMPTY_PJ_COMPANY_DATA, cnpj });
    pj.setPjLockedFields([]);
    sociosEditor.clear();
    pj.setPjStep(1);
  };

  const lookup = async (maskedCnpj: string) => {
    const currentRequest = ++requestId;
    status.value = 'loading';
    errorMessage.value = null;

    try {
      const data = await fetchCnpj(maskedCnpj);
      if (currentRequest !== requestId) return;

      const { company, locked } = mapReceitaToCompany(data, maskedCnpj);
      const nextCompany = { ...EMPTY_PJ_COMPANY_DATA, ...company };
      pj.setPjCompanyData(nextCompany);
      pj.setPjLockedFields(locked);
      sociosEditor.loadFromReceita(mapQsaToSocios(data.qsa, nextCompany));
      status.value = 'success';
    } catch (error) {
      if (currentRequest !== requestId) return;
      resetResults(maskedCnpj);
      status.value = 'error';
      errorMessage.value =
        error instanceof CnpjLookupError ? error.message : CNPJ_LOOKUP_MESSAGES.unavailable;
    }
  };

  /** Chamado a cada alteração do campo CNPJ: aplica a máscara e consulta quando estiver completo. */
  const handleCnpjChange = (value: string) => {
    const masked = maskCnpj(value);
    const digits = onlyDigits(masked);
    if (masked === pj.pjCompanyData.value.cnpj) return;

    requestId += 1; // invalida qualquer consulta em andamento
    resetResults(masked);
    errorMessage.value = null;

    if (digits.length < 14) {
      status.value = 'idle';
      return;
    }
    if (!isValidCnpj(digits)) {
      status.value = 'error';
      errorMessage.value = CNPJ_LOOKUP_MESSAGES.invalid;
      return;
    }
    void lookup(masked);
  };

  /** Preenche empresa e sócios com os dados de exemplo (sem travar nenhum campo). */
  const fillWithMock = () => {
    requestId += 1;
    pj.setPjCompanyData(INITIAL_PJ_COMPANY_DATA);
    pj.setPjLockedFields([]);
    sociosEditor.loadMock();
    errorMessage.value = null;
    status.value = 'success';
  };

  return { status, errorMessage, handleCnpjChange, fillWithMock };
}

export type CnpjLookup = ReturnType<typeof useCnpjLookup>;
