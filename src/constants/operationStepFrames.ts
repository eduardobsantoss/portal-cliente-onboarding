import type { OperationStep } from '@/types/operationRequest';

export interface OperationStepFrame {
  initial: { opacity: number; y?: number; scale?: number };
  animate: { opacity: number; y?: number; scale?: number };
  className: string;
}

const SLIDE_IN = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
};

export const OPERATION_STEP_FRAMES: Record<OperationStep, OperationStepFrame> = {
  XML_UPLOAD: { ...SLIDE_IN, className: 'space-y-8' },
  ACCOUNT_SELECTION: { ...SLIDE_IN, className: 'space-y-8' },
  VALIDATING: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    className: 'text-center py-12 space-y-10',
  },
  SUMMARY: { ...SLIDE_IN, className: 'space-y-8' },
  PROCESSING_DOCS: { ...SLIDE_IN, className: 'space-y-12 py-12' },
  FINAL_REVIEW: { ...SLIDE_IN, className: 'space-y-12' },
  SIGNATURE: { ...SLIDE_IN, className: 'space-y-10' },
  RELEASE: { ...SLIDE_IN, className: 'space-y-10' },
  COMPLETED: {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    className: 'text-center space-y-10 py-12',
  },
};
