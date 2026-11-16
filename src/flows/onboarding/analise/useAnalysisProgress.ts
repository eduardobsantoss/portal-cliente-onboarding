import { onBeforeUnmount, onMounted, ref, toValue, watch, type MaybeRefOrGetter } from 'vue';
import { ANALYSIS_PROGRESS_STAGES } from '@/constants/analysis';

interface UseAnalysisProgressParams {
  onComplete: () => void;
  onFastForwardPending?: () => void;
}

/** `params` deve ser um getter/ref para manter a reatividade dos callbacks recebidos via props. */
export function useAnalysisProgress(params: MaybeRefOrGetter<UseAnalysisProgressParams>) {
  const currentStepIndex = ref(0);
  const progress = ref(5);
  const elapsedSeconds = ref(0);

  // Background timer (sem exibir o timer de 30s no topo conforme solicitado)
  let timer: ReturnType<typeof setInterval> | undefined;
  onMounted(() => {
    timer = setInterval(() => {
      elapsedSeconds.value += 1;
    }, 1000);
  });
  onBeforeUnmount(() => {
    if (timer !== undefined) clearInterval(timer);
  });

  watch(
    elapsedSeconds,
    (seconds) => {
      const stage = ANALYSIS_PROGRESS_STAGES.find((s) => seconds < s.untilSeconds);
      if (stage) {
        currentStepIndex.value = stage.stepIndex;
        progress.value = stage.progress;
      } else {
        progress.value = 100;
        const { onComplete, onFastForwardPending } = toValue(params);
        if (onFastForwardPending) {
          onFastForwardPending();
        } else {
          onComplete();
        }
      }
    },
    { immediate: true }
  );

  return { currentStepIndex, progress };
}
