import { useEffect, useState } from 'react';
import type { OperationStep } from '@/types/operationRequest';

export function useReleaseCountdown(step: OperationStep, onFinished: () => void) {
  const [releaseTimer, setReleaseTimer] = useState(10);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (step === 'RELEASE') {
      interval = setInterval(() => {
        setReleaseTimer(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            onFinished();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step]);

  return releaseTimer;
}
