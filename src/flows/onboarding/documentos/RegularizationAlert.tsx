import React from 'react';
import { motion } from 'motion/react';
import { AlertTriangle } from 'lucide-react';

export const RegularizationAlert: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 sm:p-5 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3.5 shadow-sm"
    >
      <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md">
        <AlertTriangle size={20} />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-bold text-amber-950">
          Regularização necessária na documentação
        </h4>
        <p className="text-xs text-amber-800 mt-1 leading-relaxed">
          Identificamos que alguns arquivos anexados necessitam de substituição para validação cadastral. Por favor, anexe novas versões nítidas e reenvie para aprovação.
        </p>
      </div>
    </motion.div>
  );
};
