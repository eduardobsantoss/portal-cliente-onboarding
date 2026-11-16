import { ref, type Ref, type UnwrapNestedRefs } from 'vue';
import { SUCCESS_APPROVAL_TOAST_MS } from '@/constants/dashboardTimings';
import type { Titulo } from '@/types/titulo';

interface UseResolveScreenParams {
  titulosList: Ref<Titulo[]>;
  hasPendingConfirmations: Ref<boolean>;
}

/** Tela "Resolução de Pendências" e os avisos globais de validação dos títulos. */
export function useResolveScreen({ titulosList, hasPendingConfirmations }: UseResolveScreenParams) {
  const isShowingResolveScreen = ref(false);
  const hasSeenResolveExplanation = ref(false);
  const isWaitingValidation = ref(false);
  const showSuccessApprovalToast = ref(false);
  // Título em resolução (compartilhado com os modais de canhoto e de link de confirmação).
  const resolutionTitulo = ref<Titulo | null>(null);

  const openResolveScreen = () => {
    hasSeenResolveExplanation.value = false;
    isShowingResolveScreen.value = true;
  };

  const handleFinishResolution = () => {
    const hasPending = titulosList.value.some(t => t.actionStatus === 'Pendência');
    if (!hasPending) {
      isWaitingValidation.value = true;
    }
    isShowingResolveScreen.value = false;
  };

  const handleConfirmValidation = () => {
    // Lista anterior à atualização (o original usa o valor capturado na renderização).
    const previousList = titulosList.value;
    isWaitingValidation.value = false;
    titulosList.value = previousList.map(t => (t.actionStatus === 'Pendente de Análise' || (t.canhotoEnviado || t.linkEnviado)) ? {
      ...t,
      actionStatus: 'Confirmado',
      status: 'Confirmado',
      statusColor: 'text-green-600 bg-green-50 border-green-100'
    } : t);
    showSuccessApprovalToast.value = true;
    setTimeout(() => (showSuccessApprovalToast.value = false), SUCCESS_APPROVAL_TOAST_MS);
    hasPendingConfirmations.value = previousList.some(t => t.actionStatus === 'Pendência' && !t.canhotoEnviado && !t.linkEnviado);
  };

  return {
    isShowingResolveScreen,
    hasSeenResolveExplanation,
    isWaitingValidation,
    showSuccessApprovalToast,
    resolutionTitulo,
    openResolveScreen,
    handleFinishResolution,
    handleConfirmValidation,
  };
}

/** Estado desembrulhado (use `reactive(useResolveScreen(...))` para repassar aos componentes filhos). */
export type ResolveScreenState = UnwrapNestedRefs<ReturnType<typeof useResolveScreen>>;
