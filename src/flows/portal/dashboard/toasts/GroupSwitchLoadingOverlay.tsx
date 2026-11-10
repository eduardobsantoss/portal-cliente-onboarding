import { motion } from 'motion/react';
import { Logo } from '@/components/ui/Logo';

/** Tela de carregamento exibida durante a troca de grupo econômico. */
interface GroupSwitchLoadingOverlayProps {
  selectedGroup: string;
}

export const GroupSwitchLoadingOverlay = ({ selectedGroup }: GroupSwitchLoadingOverlayProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.4 }}
    className="fixed inset-0 z-[200] flex items-center justify-center bg-white/20 backdrop-blur-xl"
  >
    <div className="flex flex-col items-center gap-8">
      <div className="relative">
        <motion.div 
          className="w-24 h-24 rounded-full border-4 border-gci/10 border-t-gci"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Logo variant="dark" className="h-4 opacity-50" />
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 text-center">
        <motion.h4 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-xl font-black text-gci tracking-tight"
        >
          Sincronizando Dados
        </motion.h4>
        <motion.p 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-sm text-slate-500 font-bold uppercase tracking-widest"
        >
          Alternando para <span className="text-gci">{selectedGroup}</span>
        </motion.p>
      </div>

      {/* Progress Bar */}
      <div className="w-64 h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <motion.div 
          initial={{ x: "-100%" }}
          animate={{ x: "0%" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="h-full bg-gci"
        />
      </div>
    </div>
  </motion.div>
);
