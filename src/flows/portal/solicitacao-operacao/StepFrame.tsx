import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { OPERATION_STEP_FRAMES } from '@/constants/operationStepFrames';
import type { OperationStep } from '@/types/operationRequest';

interface StepFrameProps {
  step: OperationStep;
  children: ReactNode;
}

export const StepFrame = ({ step, children }: StepFrameProps) => {
  const frame = OPERATION_STEP_FRAMES[step];

  return (
    <motion.div initial={frame.initial} animate={frame.animate} className={frame.className}>
      {children}
    </motion.div>
  );
};
