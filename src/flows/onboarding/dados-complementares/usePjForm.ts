import { ref } from 'vue';
import { createSetter } from '@/flows/onboarding/dados-complementares/stateSetter';
import { INITIAL_PJ_COMPANY_DATA } from '@/mocks/complementaryCompany';
import type { PjCompanyFormData, PjStep } from '@/types/dadosComplementares';

export function usePjForm() {
  const pjStep = ref<PjStep>(1);
  const pjCompanyData = ref<PjCompanyFormData>(INITIAL_PJ_COMPANY_DATA);

  return {
    pjStep,
    setPjStep: createSetter(pjStep),
    pjCompanyData,
    setPjCompanyData: createSetter(pjCompanyData),
  };
}
