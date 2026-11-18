import { ref } from 'vue';
import { createSetter } from '@/flows/onboarding/dados-complementares/stateSetter';
import { EMPTY_PJ_COMPANY_DATA } from '@/mocks/complementaryCompany';
import type { PjCompanyFormData, PjLockedField, PjStep } from '@/types/dadosComplementares';

export function usePjForm() {
  const pjStep = ref<PjStep>(1);
  const pjCompanyData = ref<PjCompanyFormData>(EMPTY_PJ_COMPANY_DATA);
  /** Campos preenchidos pela consulta de CNPJ (somente leitura). */
  const pjLockedFields = ref<PjLockedField[]>([]);

  return {
    pjStep,
    setPjStep: createSetter(pjStep),
    pjCompanyData,
    setPjCompanyData: createSetter(pjCompanyData),
    pjLockedFields,
    setPjLockedFields: createSetter(pjLockedFields),
  };
}
