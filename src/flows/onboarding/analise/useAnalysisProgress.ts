import { useEffect, useState } from 'react';
import { ANALYSIS_PROGRESS_STAGES } from '@/constants/analysis';

interface UseAnalysisProgressParams {
  onComplete: () => void;
  onFastForwardPending?: () => void;
}

export function useAnalysisProgress({ onComplete, onFastForwardPending }: UseAnalysisProgressParams) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progress, setProgress] = useState(5);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Background timer (sem exibir o timer de 30s no topo conforme solicitado)
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const stage = ANALYSIS_PROGRESS_STAGES.find((s) => elapsedSeconds < s.untilSeconds);
    if (stage) {
      setCurrentStepIndex(stage.stepIndex);
      setProgress(stage.progress);
    } else {
      setProgress(100);
      if (onFastForwardPending) {
        onFastForwardPending();
      } else {
        onComplete();
      }
    }
  }, [elapsedSeconds, onFastForwardPending, onComplete]);

  return { currentStepIndex, progress };
}
