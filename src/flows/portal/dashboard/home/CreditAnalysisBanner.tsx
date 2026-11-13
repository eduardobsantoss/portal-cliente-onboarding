import { ArrowRight, ShieldCheck } from 'lucide-react';

/** Chamada na Home para iniciar a análise de crédito enquanto o limite não foi liberado. */
interface CreditAnalysisBannerProps {
  onStart: () => void;
}

export const CreditAnalysisBanner = ({ onStart }: CreditAnalysisBannerProps) => (
  <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6">
    <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-agro-orange shrink-0">
      <ShieldCheck size={24} />
    </div>
    <div className="flex-1">
      <p className="text-sm font-black text-gci">Sua conta já está aberta</p>
      <p className="text-sm text-slate-500 font-medium mt-1 leading-relaxed">
        Conclua a análise de crédito para liberar o limite de antecipação de recebíveis.
      </p>
    </div>
    <button
      type="button"
      onClick={onStart}
      className="bg-gci text-white px-6 py-3.5 rounded-2xl font-bold text-sm hover:bg-gci-hover transition-all shadow-lg shadow-gci/15 active:scale-[0.98] flex items-center justify-center gap-2 shrink-0"
    >
      Iniciar análise de crédito
      <ArrowRight size={16} />
    </button>
  </div>
);
