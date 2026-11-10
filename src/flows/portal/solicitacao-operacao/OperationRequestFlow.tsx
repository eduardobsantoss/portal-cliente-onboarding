import { AnimatePresence } from 'motion/react';
import type { OperationCompletionData } from '@/types/operationRequest';
import { OperationContextPanel } from './OperationContextPanel';
import { OperationFlowHeader } from './OperationFlowHeader';
import { OperationFooterNav } from './OperationFooterNav';
import { OperationStepContent } from './OperationStepContent';
import { StepFrame } from './StepFrame';
import { useOperationRequestFlow } from './useOperationRequestFlow';

interface OperationRequestFlowProps {
  serviceName: string;
  onClose: () => void;
  onComplete: (operationData: OperationCompletionData) => void;
}

export const OperationRequestFlow = ({ serviceName, onClose, onComplete }: OperationRequestFlowProps) => {
  const flow = useOperationRequestFlow({ onClose });
  const { step } = flow;
  const isLastStep = step === 'COMPLETED';

  return (
    <div className="fixed inset-0 z-[100] bg-white overflow-hidden flex flex-col lg:flex-row h-[100dvh]">
      {/* Left Context Side */}
      <OperationContextPanel step={step} />

      {/* Right Interaction Side */}
      <div className="flex-1 flex flex-col bg-white relative h-full overflow-hidden">
        <OperationFlowHeader onClose={onClose} />

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="max-w-2xl mx-auto px-6 py-12 md:py-20 lg:py-24">
            <AnimatePresence mode="wait">
              <StepFrame step={step}>
                <OperationStepContent flow={flow} onComplete={onComplete} />
              </StepFrame>
            </AnimatePresence>
          </div>
        </div>

        {/* Footer Navigation */}
        {!isLastStep && step !== 'SUMMARY' && step !== 'FINAL_REVIEW' && (
          <OperationFooterNav
            step={step}
            canContinue={flow.canContinue()}
            onPrev={flow.prevStep}
            onNext={flow.nextStep}
            onRecusar={flow.handleRecusar}
          />
        )}
      </div>
    </div>
  );
};
