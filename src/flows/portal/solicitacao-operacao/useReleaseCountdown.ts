import { ref, toValue, watch, type MaybeRefOrGetter } from 'vue';
import type { OperationStep } from '@/types/operationRequest';

export function useReleaseCountdown(step: MaybeRefOrGetter<OperationStep>, onFinished: () => void) {
  const releaseTimer = ref(10);

  watch(
    () => toValue(step),
    (currentStep, _previous, onCleanup) => {
      let interval: ReturnType<typeof setInterval> | undefined;
      if (currentStep === 'RELEASE') {
        interval = setInterval(() => {
          if (releaseTimer.value <= 1) {
            clearInterval(interval);
            releaseTimer.value = 0;
            onFinished();
            return;
          }
          releaseTimer.value -= 1;
        }, 1000);
      }
      onCleanup(() => clearInterval(interval));
    },
    { immediate: true },
  );

  return releaseTimer;
}
