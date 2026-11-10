import React from 'react';
import { BadgePercent } from 'lucide-react';
import { PRE_APPROVED_LIMIT_LABEL } from '@/constants/analysis';

export const PreAnalysisCreditOffer: React.FC = () => {
  return (
    <div className="p-5 rounded-2xl bg-gradient-to-br from-orange-50 via-white to-amber-50/50 border border-orange-200 shadow-sm relative overflow-hidden">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-agro-orange">
            Limite Operacional Pré-Aprovado
          </span>
          <div className="text-2xl sm:text-3xl font-black text-gci tracking-tight">
            {PRE_APPROVED_LIMIT_LABEL}
          </div>
          <p className="text-xs text-slate-600 font-medium">
            Disponível para antecipação de recebíveis do agronegócio.
          </p>
        </div>

        <div className="w-12 h-12 rounded-2xl bg-agro-orange/10 flex items-center justify-center text-agro-orange shrink-0">
          <BadgePercent size={24} />
        </div>
      </div>
    </div>
  );
};
