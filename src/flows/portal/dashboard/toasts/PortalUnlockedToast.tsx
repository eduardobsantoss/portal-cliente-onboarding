import { motion } from 'motion/react';
import { CheckCircle2, X } from 'lucide-react';
import { LIMIT_AVAILABLE_LABEL } from '@/constants/analysis';

/** Aviso de cadastro concluído / acesso ao portal liberado. */
interface PortalUnlockedToastProps {
  onClose: () => void;
}

export const PortalUnlockedToast = ({ onClose }: PortalUnlockedToastProps) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="mb-6 bg-emerald-500 text-white p-4 rounded-2xl shadow-lg flex items-center justify-between gap-4"
  >
    <div className="flex items-center gap-3">
      <CheckCircle2 size={20} className="shrink-0" />
      <span className="text-sm font-bold">
        Análise de crédito concluída! Seu limite de {LIMIT_AVAILABLE_LABEL} já está disponível para antecipação.
      </span>
    </div>
    <button
      onClick={onClose}
      className="p-1 hover:bg-white/20 rounded-lg text-white/80 hover:text-white"
    >
      <X size={16} />
    </button>
  </motion.div>
);
