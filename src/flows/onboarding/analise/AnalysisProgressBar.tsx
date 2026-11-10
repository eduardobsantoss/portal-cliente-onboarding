import React from 'react';
import { motion } from 'motion/react';

interface AnalysisProgressBarProps {
  progress: number;
}

export const AnalysisProgressBar: React.FC<AnalysisProgressBarProps> = ({ progress }) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs font-bold text-slate-600">
        <span>Progresso da verificação</span>
        <span className="text-gci">{progress}%</span>
      </div>
      <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
        <motion.div
          className="bg-gradient-to-r from-gci to-agro-orange h-full rounded-full"
          initial={{ width: '5%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};
