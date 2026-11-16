import { ref, toValue, watch, type MaybeRefOrGetter } from 'vue';
import type { OperationStep } from '@/types/operationRequest';

export function useValidationProgress(step: MaybeRefOrGetter<OperationStep>, setStep: (step: OperationStep) => void) {
  const validationProgress = ref(0);
  const timer = ref(0);

  watch(
    () => toValue(step),
    (currentStep, _previous, onCleanup) => {
      let interval: ReturnType<typeof setInterval> | undefined;
      let timeout: ReturnType<typeof setTimeout> | undefined;
      if (currentStep === 'VALIDATING') {
        interval = setInterval(() => {
          if (validationProgress.value >= 100) {
            clearInterval(interval);
            timeout = setTimeout(() => setStep('SUMMARY'), 1000);
            validationProgress.value = 100;
          } else {
            validationProgress.value += 0.5; // Slower progress
          }
          timer.value += 1;
        }, 100);
      }
      onCleanup(() => {
        clearInterval(interval);
        clearTimeout(timeout);
      });
    },
    { immediate: true },
  );

  return { validationProgress, timer };
}
