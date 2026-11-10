import { useState } from 'react';
import { INITIAL_PF_DATA } from '@/mocks/complementaryPf';
import type { PfFormData } from '@/types/dadosComplementares';

export function usePfForm() {
  const [pfData, setPfData] = useState<PfFormData>(INITIAL_PF_DATA);
  const [showOptionals, setShowOptionals] = useState(false);

  return {
    pfData,
    setPfData,
    showOptionals,
    toggleOptionals: () => setShowOptionals(!showOptionals),
  };
}
