import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import type { AnalysisStepItem } from '@/types/analysis';

interface AnalysisStepRowProps {
  step: AnalysisStepItem;
  idx: number;
  currentStepIndex: number;
}

export const AnalysisStepRow: React.FC<AnalysisStepRowProps> = ({ step, idx, currentStepIndex }) => {
  const isDone = idx < currentStepIndex;
  const isCurrent = idx === currentStepIndex;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: idx * 0.08 }}
      className={`p-3.5 rounded-2xl border transition-all flex items-start gap-3.5 ${
        isDone
          ? 'bg-emerald-50/60 border-emerald-200 text-slate-800'
          : isCurrent
          ? 'bg-white border-gci/60 shadow-md ring-2 ring-gci/10'
          : 'bg-slate-50/50 border-slate-200/60 text-slate-400 opacity-60'
      }`}
    >
      <div className="mt-0.5 shrink-0">
        {isDone ? (
          <CheckCircle2 size={18} className="text-emerald-600" />
        ) : isCurrent ? (
          <div className="w-4 h-4 rounded-full border-2 border-gci border-t-transparent animate-spin mt-0.5" />
        ) : (
          <div className="w-4 h-4 rounded-full border border-slate-300 bg-slate-100" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p className={`text-xs font-bold ${isCurrent ? 'text-gci' : isDone ? 'text-slate-800' : 'text-slate-500'}`}>
            {step.label}
          </p>
          {isDone && (
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
              Concluído
            </span>
          )}
          {isCurrent && (
            <span className="text-[10px] font-bold text-gci bg-sky-50 px-2 py-0.5 rounded-full animate-pulse">
              Processando
            </span>
          )}
        </div>
        <p className="text-[11px] text-slate-500 mt-0.5">
          {step.detail}
        </p>
      </div>
    </motion.div>
  );
};
