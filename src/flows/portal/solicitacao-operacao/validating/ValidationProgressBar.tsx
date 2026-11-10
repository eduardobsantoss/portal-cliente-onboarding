import { motion } from 'motion/react';

interface ValidationProgressBarProps {
  validationProgress: number;
}

export const ValidationProgressBar = ({ validationProgress }: ValidationProgressBarProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <span className="text-[10px] font-black text-gci uppercase tracking-widest">Validando Processo</span>
        <span className="text-[10px] font-black text-agro-orange tracking-widest">{Math.round(validationProgress)}%</span>
      </div>
      <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-agro-orange"
          initial={{ width: 0 }}
          animate={{ width: `${validationProgress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
};
