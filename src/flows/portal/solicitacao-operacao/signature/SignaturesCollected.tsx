import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

interface SignaturesCollectedProps {
  onContinue: () => void;
}

export const SignaturesCollected = ({ onContinue }: SignaturesCollectedProps) => {
  return (
    <motion.div 
     initial={{ opacity: 0, y: 10 }} 
     animate={{ opacity: 1, y: 0 }}
     className="bg-green-50 p-6 rounded-3xl border border-green-100 flex flex-col items-center gap-2 mt-4"
    >
       <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg shadow-green-500/20">
         <CheckCircle2 size={24} />
       </div>
       <p className="text-sm font-black text-green-700 uppercase tracking-widest">Todas as assinaturas coletadas!</p>
       <button 
         onClick={onContinue}
         className="mt-2 bg-gci text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-agro-orange transition-all shadow-xl shadow-gci/20"
       >
         Continuar Operação
       </button>
    </motion.div>
  );
};
