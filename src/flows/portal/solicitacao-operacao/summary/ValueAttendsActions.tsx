import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, ArrowRight } from 'lucide-react';
import { cn } from '@/utils/cn';
import type { OperationValueAttends } from '@/types/operationRequest';

interface ValueAttendsActionsProps {
  valueAttends: OperationValueAttends;
  onAgree: () => void;
  onRecusar: () => void;
  onUploadMore: () => void;
}

export const ValueAttendsActions = ({ valueAttends, onAgree, onRecusar, onUploadMore }: ValueAttendsActionsProps) => {
  return (
    <AnimatePresence mode="wait">
      {valueAttends === 'SIM' && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="space-y-6 pt-4 border-t border-slate-50"
        >
          <button 
            onClick={onAgree}
            className={cn(
              "w-full py-5 px-10 rounded-[24px] font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-lg bg-gci text-white shadow-gci/20 hover:scale-[1.02]"
            )}
          >
            Concordar e Gerar Documentos
            <ArrowRight size={18} />
          </button>
        </motion.div>
      )}

      {valueAttends === 'NAO' && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="space-y-6 pt-4 border-t border-slate-50"
        >
          <div className="grid grid-cols-3 gap-4">
            <button 
              onClick={onRecusar}
              className="bg-white text-slate-400 border border-slate-100 py-5 rounded-[24px] font-black text-[10px] uppercase tracking-widest transition-all hover:bg-red-50 hover:text-red-500 hover:border-red-100 flex items-center justify-center gap-2"
            >
              <X size={16} />
              Recusar
            </button>
            <button 
              onClick={onUploadMore}
              className="col-span-2 bg-slate-50 text-gci border border-slate-200 py-5 rounded-[24px] font-black text-xs uppercase tracking-widest transition-all hover:bg-white hover:border-agro-orange hover:text-agro-orange flex items-center justify-center gap-3 shadow-sm hover:shadow-md"
            >
              <Plus size={18} />
              Subir mais títulos
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
