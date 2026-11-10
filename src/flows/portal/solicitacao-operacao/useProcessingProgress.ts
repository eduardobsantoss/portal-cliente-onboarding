import { useEffect, useState } from 'react';
import { OPERATION_PROCESSING_ITEMS } from '@/constants/operationRequest';
import type { OperationStep } from '@/types/operationRequest';

export function useProcessingProgress(step: OperationStep, onFinished: () => void) {
  const [processingIndex, setProcessingIndex] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (step === 'PROCESSING_DOCS') {
      interval = setInterval(() => {
        setProcessingIndex(prev => {
          if (prev < OPERATION_PROCESSING_ITEMS.length) return prev + 1;
          clearInterval(interval);
          setTimeout(() => onFinished(), 1500);
          return prev;
        });
      }, 4000); // Slower transition (4 seconds per step)
    }
    return () => clearInterval(interval);
  }, [step]);

  return processingIndex;
}
