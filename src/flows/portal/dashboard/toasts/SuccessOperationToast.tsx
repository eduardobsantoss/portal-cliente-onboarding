import { motion } from 'motion/react';
import { CheckCircle2, X } from 'lucide-react';

/** Aviso "Operação Criada com Sucesso". */
interface SuccessOperationToastProps {
  onClose: () => void;
}

export const SuccessOperationToast = ({ onClose }: SuccessOperationToastProps) => (
  <motion.div 
    initial={{ opacity: 0, y: 100, x: '-50%' }}
    animate={{ opacity: 1, y: -40, x: '-50%' }}
    exit={{ opacity: 0, y: 100, x: '-50%' }}
    className="fixed bottom-0 left-1/2 z-[200] bg-gci text-white px-8 py-5 rounded-[24px] shadow-2xl flex items-center gap-5 border border-white/10 min-w-[320px] md:min-w-[450px]"
  >
    <div className="w-12 h-12 rounded-2xl bg-agro-orange flex items-center justify-center shrink-0 shadow-lg shadow-agro-orange/20">
      <CheckCircle2 size={24} />
    </div>
    <div>
      <p className="font-black text-sm uppercase tracking-widest">Operação Criada com Sucesso</p>
      <p className="text-xs text-white/60 font-medium">Os e-mails de confirmação e o comprovante foram enviados para seu e-mail cadastrado.</p>
    </div>
    <button onClick={onClose} className="ml-4 p-2 text-white/30 hover:text-white">
      <X size={18} />
    </button>
  </motion.div>
);
