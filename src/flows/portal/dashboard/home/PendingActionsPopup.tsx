import { motion } from 'motion/react';
import { AlertCircle, ExternalLink } from 'lucide-react';

/** Popup fixo "Ações pendentes na Carteira". */
interface PendingActionsPopupProps {
  onResolve: () => void;
}

export const PendingActionsPopup = ({ onResolve }: PendingActionsPopupProps) => (
  <motion.div 
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    className="fixed bottom-8 right-8 z-[150] max-w-md"
  >
    <div className="bg-white border-2 border-orange-100 rounded-[32px] p-8 shadow-[0_20px_50px_rgba(255,165,0,0.15)] flex flex-col gap-6 relative overflow-hidden group ring-1 ring-orange-200/20">
      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50/50 rounded-full blur-3xl -mr-16 -mt-16" />

      <div className="flex items-start gap-5 relative z-10">
        <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center text-agro-orange shrink-0 animate-pulse">
          <AlertCircle size={28} strokeWidth={2.5} />
        </div>
        <div className="space-y-2">
          <h4 className="text-base font-black text-gci uppercase tracking-tight">Ações pendentes na Carteira</h4>
          <p className="text-xs text-slate-500 font-medium leading-relaxed">
            Você tem pendência de títulos na sua carteira.
          </p>
        </div>
      </div>

      <button 
        onClick={onResolve}
        className="w-full bg-agro-orange text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-agro-orange/20 hover:bg-gci transition-all active:scale-95 flex items-center justify-center gap-2"
      >
        CLIQUE AQUI PARA RESOLVER
        <ExternalLink size={14} />
      </button>
    </div>
  </motion.div>
);
