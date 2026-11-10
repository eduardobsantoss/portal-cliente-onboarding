import { useEffect, useState } from 'react';
import type { OperationStep } from '@/types/operationRequest';

export function useValidationProgress(step: OperationStep, setStep: (step: OperationStep) => void) {
  const [validationProgress, setValidationProgress] = useState(0);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (step === 'VALIDATING') {
      interval = setInterval(() => {
        setValidationProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setStep('SUMMARY'), 1000);
            return 100;
          }
          return prev + 0.5; // Slower progress
        });
        setTimer(t => t + 1);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [step]);

  return { validationProgress, timer };
}
