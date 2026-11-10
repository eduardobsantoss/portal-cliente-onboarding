import { OPERATION_PROCESSING_ITEMS, OPERATION_PROCESSING_STAGES } from '@/constants/operationRequest';
import type { OperationProcessingStage } from '@/types/operationRequest';

export const getProcessingStage = (processingIndex: number): OperationProcessingStage => {
  const currentStageIdx = processingIndex < 2 ? 0 : processingIndex === 2 ? 1 : 2;
  return OPERATION_PROCESSING_STAGES[currentStageIdx];
};

export const getProcessingOverallProgress = (processingIndex: number): number =>
  (processingIndex / OPERATION_PROCESSING_ITEMS.length) * 100;
