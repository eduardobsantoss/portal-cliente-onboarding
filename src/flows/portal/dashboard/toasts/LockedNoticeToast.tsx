import { motion } from 'motion/react';
import { Lock, X } from 'lucide-react';

/** Aviso de funcionalidade bloqueada. */
interface LockedNoticeToastProps {
  message: string;
  onClose: () => void;
}

export const LockedNoticeToast = ({ message, onClose }: LockedNoticeToastProps) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="mb-6 bg-slate-800 text-white p-4 rounded-2xl shadow-lg flex items-center justify-between gap-4 border border-slate-700"
  >
    <div className="flex items-center gap-3">
      <Lock size={18} className="text-agro-orange shrink-0" />
      <span className="text-xs md:text-sm font-medium">
        {message}
      </span>
    </div>
    <button
      onClick={onClose}
      className="p-1 hover:bg-white/20 rounded-lg text-white/60 hover:text-white"
    >
      <X size={16} />
    </button>
  </motion.div>
);
