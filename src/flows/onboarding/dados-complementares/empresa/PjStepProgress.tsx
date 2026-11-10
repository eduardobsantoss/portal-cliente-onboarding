import React from 'react';
import { motion } from 'motion/react';
import { PJ_STEP_LABELS, PJ_TOTAL_STEPS } from '@/constants/complementaryForm';
import type { PjStep } from '@/types/dadosComplementares';

interface PjStepProgressProps {
  step: PjStep;
}

export const PjStepProgress: React.FC<PjStepProgressProps> = ({ step }) => {
  return (
    <div className="space-y-1.5 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold text-slate-700">{PJ_STEP_LABELS[step]}</span>
        <span className="font-bold text-gci">
          Passo {step} de {PJ_TOTAL_STEPS}
        </span>
      </div>
      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(step / PJ_TOTAL_STEPS) * 100}%` }}
          transition={{ duration: 0.4 }}
          className="h-full bg-gci rounded-full"
        />
      </div>
    </div>
  );
};
