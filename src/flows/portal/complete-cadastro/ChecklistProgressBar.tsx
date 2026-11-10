import React from 'react';
import { motion } from 'motion/react';

interface ChecklistProgressBarProps {
  completedTopicsCount: number;
  totalTopics: number;
}

/** Barra de progresso minimalista: "X de 6 tópicos concluídos". */
export const ChecklistProgressBar: React.FC<ChecklistProgressBarProps> = ({
  completedTopicsCount,
  totalTopics,
}) => {
  return (
    <div className="space-y-1.5 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold text-slate-700">Progresso do cadastro</span>
        <span className="font-bold text-gci">{completedTopicsCount} de {totalTopics} tópicos concluídos</span>
      </div>
      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(completedTopicsCount / totalTopics) * 100}%` }}
          transition={{ duration: 0.4 }}
          className="h-full bg-gci rounded-full"
        />
      </div>
    </div>
  );
};
