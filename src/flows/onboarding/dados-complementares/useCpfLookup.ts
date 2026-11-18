import { ref } from 'vue';
import type { usePfForm } from '@/flows/onboarding/dados-complementares/usePfForm';
import { EMPTY_PF_DATA, INITIAL_PF_DATA } from '@/mocks/complementaryPf';
import type { DocumentLookupStatus, PfLockedField } from '@/types/dadosComplementares';
import { isValidCpf } from '@/utils/documentValidation';
import { maskCpf, onlyDigits } from '@/utils/registrationMasks';

/** Duração da consulta simulada, só para o protótipo mostrar o estado de carregamento. */
const SIMULATED_LOOKUP_DELAY_MS = 800;

/** Campos que um provedor de CPF devolveria e que, por isso, ficam travados. */
const PF_LOCKED_FIELDS: PfLockedField[] = ['nome', 'dataNascimento', 'nomeMae'];

const CPF_INVALID_MESSAGE = 'CPF inválido. Confira os números digitados.';

interface UseCpfLookupOptions {
  pf: ReturnType<typeof usePfForm>;
}

/**
 * Consulta de CPF simulada (protótipo): não há provedor real, então devolve os dados de
 * exemplo da PF depois de um pequeno atraso e trava os campos que viriam do provedor.
 */
export function useCpfLookup({ pf }: UseCpfLookupOptions) {
  const status = ref<DocumentLookupStatus>('idle');
  const errorMessage = ref<string | null>(null);
  let requestId = 0;

  const resetResults = (cpf: string) => {
    pf.setPfData({ ...EMPTY_PF_DATA, cpf });
    pf.setPfLockedFields([]);
  };

  /** Chamado a cada alteração do campo CPF: aplica a máscara e consulta quando estiver completo. */
  const handleCpfChange = (value: string) => {
    const masked = maskCpf(value);
    if (masked === pf.pfData.value.cpf) return;

    const currentRequest = ++requestId;
    resetResults(masked);
    errorMessage.value = null;

    const digits = onlyDigits(masked);
    if (digits.length < 11) {
      status.value = 'idle';
      return;
    }
    if (!isValidCpf(digits)) {
      status.value = 'error';
      errorMessage.value = CPF_INVALID_MESSAGE;
      return;
    }

    status.value = 'loading';
    window.setTimeout(() => {
      if (currentRequest !== requestId) return;
      pf.setPfData({ ...INITIAL_PF_DATA, cpf: masked });
      pf.setPfLockedFields(PF_LOCKED_FIELDS);
      status.value = 'success';
    }, SIMULATED_LOOKUP_DELAY_MS);
  };

  /** Preenche com os dados de exemplo (sem travar nenhum campo). */
  const fillWithMock = () => {
    requestId += 1;
    pf.setPfData(INITIAL_PF_DATA);
    pf.setPfLockedFields([]);
    errorMessage.value = null;
    status.value = 'success';
  };

  return { status, errorMessage, handleCpfChange, fillWithMock };
}

export type CpfLookup = ReturnType<typeof useCpfLookup>;
