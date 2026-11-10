import {
  OPERATION_PHASE_1,
  OPERATION_PHASE_2,
  OPERATION_PHASE_3,
  OPERATION_STEPS_CONFIG,
} from '@/constants/operationRequest';
import type { OperationStep, OperationStepConfig } from '@/types/operationRequest';

export const getOperationPhaseSteps = (step: OperationStep): OperationStepConfig[] => {
  const currentPhase = OPERATION_PHASE_1.includes(step)
    ? OPERATION_PHASE_1
    : OPERATION_PHASE_2.includes(step)
      ? OPERATION_PHASE_2
      : OPERATION_PHASE_3;
  return OPERATION_STEPS_CONFIG.filter((s) => currentPhase.includes(s.id));
};

export const getOperationStepIndex = (step: OperationStep): number =>
  OPERATION_STEPS_CONFIG.findIndex((s) => s.id === step);

export const getNextOperationStep = (
  step: OperationStep,
  skippingAccountStep: boolean,
): OperationStep | null => {
  const currentIndex = getOperationStepIndex(step);
  if (currentIndex < OPERATION_STEPS_CONFIG.length - 1) {
    const nextTarget = OPERATION_STEPS_CONFIG[currentIndex + 1].id;

    // Skip account selection if re-uploading titles
    if (nextTarget === 'ACCOUNT_SELECTION' && skippingAccountStep) {
      return 'VALIDATING';
    }
    return nextTarget;
  }
  return null;
};

export const getPreviousOperationStep = (step: OperationStep): OperationStep | null => {
  const currentIndex = getOperationStepIndex(step);
  if (currentIndex > 0) {
    return OPERATION_STEPS_CONFIG[currentIndex - 1].id;
  }
  return null;
};

export interface OperationContinueState {
  filesCount: number;
  selectedAccount: string;
  termsAccepted: boolean;
  isSigned: boolean;
}

export const canContinueOperation = (step: OperationStep, state: OperationContinueState): boolean => {
  if (step === 'XML_UPLOAD') return state.filesCount > 0;
  if (step === 'ACCOUNT_SELECTION') return state.selectedAccount !== '';
  if (step === 'VALIDATING') return false; // Handled by auto-timer
  if (step === 'SUMMARY') return true;
  if (step === 'FINAL_REVIEW') return state.termsAccepted;
  if (step === 'SIGNATURE') return state.isSigned;
  if (step === 'RELEASE') return false; // Auto-timer
  return false;
};
