import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const NextStepNotice: React.FC = () => {
  return (
    <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3.5">
      <ShieldCheck size={20} className="text-amber-600 shrink-0 mt-0.5" />
      <div className="text-xs text-amber-950 space-y-1 leading-relaxed">
        <p className="font-bold text-slate-900">
          Próximo passo: libere o seu limite de crédito
        </p>
        <p className="text-slate-600">
          Sua conta já está aberta e pronta para uso. Para liberar o limite de antecipação, conclua a análise de crédito no portal.
        </p>
      </div>
    </div>
  );
};
