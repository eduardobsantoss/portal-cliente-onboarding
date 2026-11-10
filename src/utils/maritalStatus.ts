import { ESTADOS_CIVIS_COM_CONJUGE, REGIMES_DE_BENS } from '@/constants/complementaryForm';

interface MaritalStatusState {
  estadoCivil?: string;
  nomeConjuge?: string;
  cpfConjuge?: string;
  regimeBens?: string;
}

export function hasSpouse(estadoCivil: string | undefined): boolean {
  return estadoCivil !== undefined && ESTADOS_CIVIS_COM_CONJUGE.includes(estadoCivil);
}

/** Aplica a troca de estado civil limpando/preenchendo cônjuge e regime de bens. */
export function applyMaritalStatusChange<T extends MaritalStatusState>(prev: T, estadoCivil: string): T {
  const keepSpouse = hasSpouse(estadoCivil);
  return {
    ...prev,
    estadoCivil,
    nomeConjuge: keepSpouse ? prev.nomeConjuge : '',
    cpfConjuge: keepSpouse ? prev.cpfConjuge : '',
    regimeBens: keepSpouse ? prev.regimeBens || REGIMES_DE_BENS[0] : '',
  };
}
