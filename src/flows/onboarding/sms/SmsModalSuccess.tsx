import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

export const SmsModalSuccess: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2"
    >
      <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
        <CheckCircle2 size={24} />
      </div>
      <h4 className="text-sm font-bold text-emerald-950">Celular confirmado com sucesso!</h4>
      <p className="text-xs text-emerald-800">
        A validação foi atualizada no seu checklist cadastral.
      </p>
    </motion.div>
  );
};
