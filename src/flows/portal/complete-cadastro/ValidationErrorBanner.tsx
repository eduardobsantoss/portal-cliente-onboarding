import React from 'react';
import { motion } from 'motion/react';
import { AlertTriangle } from 'lucide-react';

/** Aviso "Ajustes necessários na documentação" exibido após a simulação de rejeição. */
export const ValidationErrorBanner: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 sm:p-5 bg-rose-50 border border-rose-200 rounded-2xl flex items-start gap-3.5 shadow-sm"
    >
      <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-md">
        <AlertTriangle size={20} />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-bold text-rose-950">
          Ajustes necessários na documentação
        </h4>
        <p className="text-xs text-rose-800 mt-1 leading-relaxed">
          Identificamos arquivos que precisam de correção (por exemplo, imagem sem nitidez ou dados ilegíveis). Verifique os tópicos destacados abaixo e substitua os arquivos indicados para concluir a validação.
        </p>
      </div>
    </motion.div>
  );
};
