import { motion } from 'motion/react';

interface CanhotoUploadProgressProps {
  progress: number;
}

export const CanhotoUploadProgress = ({ progress }: CanhotoUploadProgressProps) => (
  <div className="flex flex-col items-center justify-center py-12 space-y-6">
    <div className="relative w-24 h-24">
      <svg className="w-24 h-24 -rotate-90">
        <circle
          cx="48"
          cy="48"
          r="44"
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          className="text-slate-100"
        />
        <motion.circle
          cx="48"
          cy="48"
          r="44"
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray="276.46"
          initial={{ strokeDashoffset: 276.46 }}
          animate={{ strokeDashoffset: 276.46 - (276.46 * progress) / 100 }}
          className="text-agro-orange"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xl font-black text-gci">{Math.round(progress)}%</span>
      </div>
    </div>
    <div className="text-center">
      <p className="text-lg font-black text-gci uppercase italic">Processando arquivo...</p>
      <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Extraindo metadados e validando assinaturas</p>
    </div>
  </div>
);
