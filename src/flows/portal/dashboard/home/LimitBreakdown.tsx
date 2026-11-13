import { Clock, TrendingUp, Wallet } from 'lucide-react';
import { LIMIT_EMPTY_LABEL } from '@/constants/analysis';

/** Cartões de limite para desconto e disponível para antecipação. */
interface LimitBreakdownProps {
  limitLabel: string;
  isLimitReleased: boolean;
}

export const LimitBreakdown = ({ limitLabel, isLimitReleased }: LimitBreakdownProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex flex-col justify-between group hover:shadow-md transition-all">
      <div>
        <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 mb-6 group-hover:bg-gci group-hover:text-white transition-all">
          <Wallet size={24} />
        </div>
        <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Limite para Desconto de Duplicata</p>
        <h3 className="text-3xl font-black text-gci tracking-tight">{limitLabel}</h3>
      </div>
      <div className="mt-8 pt-8 border-t border-slate-50 flex items-center justify-between">
        <span className="text-xs font-bold text-slate-500">Utilizado: {LIMIT_EMPTY_LABEL}</span>
        <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
          <div className="w-[0%] h-full bg-gci rounded-full" />
        </div>
      </div>
    </div>

    <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm group hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-agro-orange mb-6 group-hover:bg-agro-orange group-hover:text-white transition-all">
          <TrendingUp size={24} />
        </div>
        <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Disponível para Antecipação de Duplicata</p>
        <h3 className="text-4xl font-black text-gci tracking-tight">{limitLabel}</h3>
      </div>
      <div className="mt-8 pt-8 border-t border-slate-50">
        <div className={`flex items-center gap-2 font-bold text-xs uppercase tracking-wider ${isLimitReleased ? 'text-gci' : 'text-slate-400'}`}>
          <Clock size={16} />
          {isLimitReleased ? 'Limite liberado para antecipação' : 'Disponível após a análise de crédito'}
        </div>
      </div>
    </div>
  </div>
);
