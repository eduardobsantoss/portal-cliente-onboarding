import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Shield } from 'lucide-react';
import { PendingBlockToast } from '@/flows/portal/dashboard/toasts/PendingBlockToast';
import type { PendingToastSource } from '@/types/dashboard';

/** Destaque "Crédito Pré-Aprovado" com o botão de antecipação. */
interface LimitHeroProps {
  activePendingToastSource: PendingToastSource | null;
  onAnticipate: () => void;
  onDismissPendingToast: () => void;
  onGoToCarteira: () => void;
}

export const LimitHero = ({ activePendingToastSource, onAnticipate, onDismissPendingToast, onGoToCarteira }: LimitHeroProps) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="relative bg-gci rounded-[40px] p-8 md:p-12 overflow-hidden shadow-2xl shadow-gci/20 text-white"
  >
    <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent skew-x-[-20deg] translate-x-20" />
    <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-agro-orange/10 rounded-full blur-[100px]" />

    <div className="relative z-10 max-w-3xl">
      <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6 border border-white/10">
        <Shield size={14} className="text-agro-orange" />
        <span className="text-[10px] font-black uppercase tracking-widest">Crédito Pré-Aprovado</span>
      </div>
      <h2 className="text-3xl md:text-5xl font-black leading-[1.1] mb-6">
        Você tem <span className="text-agro-orange whitespace-nowrap">R$ 0,00</span> <br className="hidden md:block" /> disponível para antecipação de recebíveis.
      </h2>
      <p className="text-base text-white/70 mb-10 leading-relaxed font-medium">
        Antecipe seus valores a receber. Sem burocracia, 100% digital e com taxas competitivas.
      </p>
      <div className="relative inline-block">
        <button 
          onClick={onAnticipate}
          className="group bg-white text-gci px-10 py-5 rounded-[24px] font-black text-base transition-all hover:shadow-2xl hover:shadow-white/20 active:scale-95 flex items-center gap-4 uppercase tracking-widest"
        >
          Antecipar Agora
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </button>
        <AnimatePresence>
          {activePendingToastSource === 'hero' && <PendingBlockToast source="hero" onClose={onDismissPendingToast} onGoToCarteira={onGoToCarteira} />}
        </AnimatePresence>
      </div>
    </div>
  </motion.div>
);
