import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

export const CreatePasswordSuccess: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="py-8 text-center space-y-3"
    >
      <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
        <CheckCircle2 size={32} />
      </div>
      <h3 className="text-base font-bold text-slate-900">Senha criada com sucesso!</h3>
      <p className="text-xs text-slate-500">
        Redirecionando para o acesso ao portal...
      </p>
    </motion.div>
  );
};
