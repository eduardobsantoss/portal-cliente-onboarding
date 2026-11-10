import { motion } from 'motion/react';
import { CheckCircle2, X } from 'lucide-react';

/** Aviso global "Títulos Confirmados". */
interface SuccessApprovalToastProps {
  onClose: () => void;
}

export const SuccessApprovalToast = ({ onClose }: SuccessApprovalToastProps) => (
  <motion.div 
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 100 }}
    className="fixed bottom-8 right-8 z-[201] max-w-md"
  >
    <div className="bg-white border-2 border-green-100 rounded-[32px] p-8 shadow-[0_20px_50px_rgba(22,163,74,0.15)] flex flex-col gap-5 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-green-50/50 rounded-full blur-3xl -mr-16 -mt-16" />

      <div className="flex items-start gap-5 relative z-10">
        <div className="w-14 h-14 rounded-2xl bg-green-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-green-500/20">
          <CheckCircle2 size={28} strokeWidth={2.5} />
        </div>
        <div className="space-y-2">
          <h4 className="text-base font-black text-green-900 uppercase tracking-tight">Títulos Confirmados</h4>
          <p className="text-sm text-slate-500 font-medium leading-relaxed">
            A validação foi concluída com sucesso! Seus títulos estão liberados e você já pode operar novamente.
          </p>
        </div>
      </div>

      <button 
        onClick={onClose}
        className="w-full bg-gci text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-green-700 transition-all active:scale-95 flex items-center justify-center gap-2"
      >
        ENTENDIDO
        <X size={14} />
      </button>
    </div>
  </motion.div>
);
