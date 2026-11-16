import { ref, toValue, watch, type MaybeRefOrGetter } from 'vue';
import { OPERATION_PROCESSING_ITEMS } from '@/constants/operationRequest';
import type { OperationStep } from '@/types/operationRequest';

export function useProcessingProgress(step: MaybeRefOrGetter<OperationStep>, onFinished: () => void) {
  const processingIndex = ref(0);

  watch(
    () => toValue(step),
    (currentStep, _previous, onCleanup) => {
      let interval: ReturnType<typeof setInterval> | undefined;
      let timeout: ReturnType<typeof setTimeout> | undefined;
      if (currentStep === 'PROCESSING_DOCS') {
        interval = setInterval(() => {
          if (processingIndex.value < OPERATION_PROCESSING_ITEMS.length) {
            processingIndex.value += 1;
            return;
          }
          clearInterval(interval);
          timeout = setTimeout(() => onFinished(), 1500);
        }, 4000); // Slower transition (4 seconds per step)
      }
      onCleanup(() => {
        clearInterval(interval);
        clearTimeout(timeout);
      });
    },
    { immediate: true },
  );

  return processingIndex;
}
