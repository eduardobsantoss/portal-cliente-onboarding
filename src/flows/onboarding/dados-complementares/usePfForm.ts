import { ref } from 'vue';
import { createSetter } from '@/flows/onboarding/dados-complementares/stateSetter';
import { INITIAL_PF_DATA } from '@/mocks/complementaryPf';
import type { PfFormData } from '@/types/dadosComplementares';

export function usePfForm() {
  const pfData = ref<PfFormData>(INITIAL_PF_DATA);
  const showOptionals = ref(false);

  return {
    pfData,
    setPfData: createSetter(pfData),
    showOptionals,
    toggleOptionals: () => {
      showOptionals.value = !showOptionals.value;
    },
  };
}
