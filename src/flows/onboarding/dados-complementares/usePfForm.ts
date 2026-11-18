import { ref } from 'vue';
import { createSetter } from '@/flows/onboarding/dados-complementares/stateSetter';
import { EMPTY_PF_DATA } from '@/mocks/complementaryPf';
import type { PfFormData, PfLockedField } from '@/types/dadosComplementares';

export function usePfForm() {
  const pfData = ref<PfFormData>(EMPTY_PF_DATA);
  const showOptionals = ref(false);
  /** Campos preenchidos pela consulta de CPF (somente leitura). */
  const pfLockedFields = ref<PfLockedField[]>([]);

  return {
    pfData,
    setPfData: createSetter(pfData),
    pfLockedFields,
    setPfLockedFields: createSetter(pfLockedFields),
    showOptionals,
    toggleOptionals: () => {
      showOptionals.value = !showOptionals.value;
    },
  };
}
