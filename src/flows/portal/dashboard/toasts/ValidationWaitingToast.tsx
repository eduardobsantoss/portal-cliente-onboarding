import { motion } from 'motion/react';
import { Clock } from 'lucide-react';

/** Aviso global "Em Validação" (clicar simula a conclusão da validação). */
interface ValidationWaitingToastProps {
  onConfirm: () => void;
}

export const ValidationWaitingToast = ({ onConfirm }: ValidationWaitingToastProps) => (
  <motion.div 
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 100 }}
    onClick={onConfirm}
    className="fixed bottom-8 right-8 z-[200] max-w-md cursor-pointer group"
  >
    <div className="bg-white border-2 border-blue-100 rounded-[32px] p-8 shadow-[0_20px_50px_rgba(37,99,235,0.15)] flex flex-col gap-6 relative overflow-hidden ring-1 ring-blue-200/20 group-hover:border-blue-300 transition-colors">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full blur-3xl -mr-16 -mt-16" />

      <div className="flex items-start gap-5 relative z-10">
        <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
          <Clock size={28} strokeWidth={2.5} className="animate-spin-slow" />
        </div>
        <div className="space-y-2">
          <h4 className="text-base font-black text-gci uppercase tracking-tight text-blue-900">Em Validação</h4>
          <p className="text-xs text-slate-500 font-medium leading-relaxed italic">
            Seus títulos estão em validação de confirmação. Assim que o processo for concluído avisaremos você.
          </p>
        </div>
      </div>
    </div>
  </motion.div>
);
