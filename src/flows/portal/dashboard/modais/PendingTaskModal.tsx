import { AnimatePresence } from 'motion/react';
import { AlertCircle, X } from 'lucide-react';
import { ModalFrame } from '@/components/ui/ModalFrame';
import type { PendingTask } from '@/types/notification';

interface PendingTaskModalProps {
  task: PendingTask | null;
  onClose: () => void;
}

export const PendingTaskModal = ({ task, onClose }: PendingTaskModalProps) => (
  <AnimatePresence>
    {task && (
      <ModalFrame
        overlayClassName="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-gci/40 backdrop-blur-md"
        panelClassName="bg-white rounded-[40px] shadow-2xl w-full max-w-lg overflow-hidden flex flex-col"
      >
        <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-agro-orange">
              <AlertCircle size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black text-gci tracking-tight">{task.title}</h2>
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Operação #{task.details.opId}</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:text-gci hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-8 space-y-6">
          <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
            <p className="text-sm text-slate-600 leading-relaxed">
              Dos <span className="font-black text-gci">{task.details.total} títulos</span> que você enviou na operação <span className="font-black text-gci">#{task.details.opId}</span>, foram aprovados somente <span className="font-black text-agro-orange">{task.details.approved} títulos</span> e já foram registrados no sistema.
            </p>
          </div>

          <p className="text-xs text-slate-400 font-medium text-center px-4">
            Deseja confirmar o registro desses títulos ou recusar a operação?
          </p>
        </div>

        <div className="p-8 pt-0 flex gap-4">
          <button 
            onClick={onClose} 
            className="flex-1 bg-white border-2 border-slate-100 text-slate-400 py-4 rounded-2xl font-bold text-sm hover:border-red-100 hover:text-red-500 transition-all active:scale-[0.98]"
          >
            Recusar
          </button>
          <button 
            onClick={onClose} 
            className="flex-1 bg-gci hover:bg-gci-hover text-white py-4 rounded-2xl font-bold text-sm transition-all shadow-xl shadow-gci/20 active:scale-[0.98]"
          >
            Confirmar Registro
          </button>
        </div>
      </ModalFrame>
    )}
  </AnimatePresence>
);
