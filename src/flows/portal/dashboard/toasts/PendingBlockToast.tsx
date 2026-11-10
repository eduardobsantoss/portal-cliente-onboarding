import { motion } from 'motion/react';
import { AlertCircle, X } from 'lucide-react';
import { cn } from '@/utils/cn';
import type { PendingToastSource } from '@/types/dashboard';

/** Aviso flutuante "Operação Indisponível" exibido junto aos botões de antecipação. */
interface PendingBlockToastProps {
  source: PendingToastSource;
  onClose: () => void;
  onGoToCarteira: () => void;
}

export const PendingBlockToast = ({ source, onClose, onGoToCarteira }: PendingBlockToastProps) => (
  <motion.div
    initial={{ opacity: 0, y: 10, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 10, scale: 0.95 }}
    className={cn(
      "absolute z-[200] w-80 md:w-96 shadow-2xl",
      source === 'header' ? "top-full right-0 mt-4" : "bottom-full left-1/2 -translate-x-1/2 mb-6"
    )}
  >
    <div className="bg-white border-l-4 border-l-agro-orange rounded-2xl p-6 shadow-2xl flex gap-4 items-start ring-1 ring-black/5 text-left">
      <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-agro-orange shrink-0">
        <AlertCircle size={24} />
      </div>
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-black text-gci uppercase tracking-tight">Operação Indisponível</h4>
          <button onClick={onClose} className="text-slate-300 hover:text-slate-500">
            <X size={14} />
          </button>
        </div>
        <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
          Para continuar operando, você precisa regularizar as <span className="font-bold text-agro-orange">Cessões de Títulos pendentes</span> na sua Carteira.
        </p>
        <button 
          onClick={onGoToCarteira}
          className="text-[10px] font-black text-agro-orange uppercase tracking-widest hover:underline pt-2 inline-block"
        >
          Ir para Carteira agora →
        </button>
      </div>
    </div>
    {source === 'hero' && (
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-r border-b border-black/5 rotate-45" />
    )}
  </motion.div>
);
