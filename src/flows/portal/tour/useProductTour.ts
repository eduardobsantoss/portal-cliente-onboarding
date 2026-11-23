import { computed, ref } from 'vue';
import { TOUR_STEPS } from './tourSteps';

type TourPhase = 'idle' | 'intro' | 'steps';

interface UseProductTourOptions {
  /** Chamado quando o usuário decide (fazer, concluir ou pular): marca o tutorial como visto. */
  onSeen?: () => void;
}

/** Estado do tour guiado: oferta inicial (fazer ou pular) e navegação entre os passos. */
export function useProductTour({ onSeen }: UseProductTourOptions = {}) {
  const phase = ref<TourPhase>('idle');
  const stepIndex = ref(0);

  const currentStep = computed(() => TOUR_STEPS[stepIndex.value]);
  const isFirstStep = computed(() => stepIndex.value === 0);
  const isLastStep = computed(() => stepIndex.value === TOUR_STEPS.length - 1);

  /** Primeiro acesso: pergunta se o usuário quer fazer o tutorial. */
  const offer = () => {
    stepIndex.value = 0;
    phase.value = 'intro';
  };

  /** Inicia (ou reinicia) o passo a passo, direto no primeiro passo. */
  const start = () => {
    stepIndex.value = 0;
    phase.value = 'steps';
    onSeen?.();
  };

  const close = () => {
    phase.value = 'idle';
    onSeen?.();
  };

  const next = () => {
    if (isLastStep.value) {
      close();
      return;
    }
    stepIndex.value += 1;
  };

  const previous = () => {
    if (!isFirstStep.value) stepIndex.value -= 1;
  };

  return {
    phase,
    stepIndex,
    totalSteps: TOUR_STEPS.length,
    currentStep,
    isFirstStep,
    isLastStep,
    offer,
    start,
    close,
    next,
    previous,
  };
}

export type ProductTour = ReturnType<typeof useProductTour>;
