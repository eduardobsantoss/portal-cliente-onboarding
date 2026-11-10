import React from 'react';
import { Clock } from 'lucide-react';
import { MOCK_USER_EMAIL } from '@/mocks/onboardingUser';

export const AnalysisDeadlineNotice: React.FC = () => {
  return (
    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
      <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
        <Clock size={16} className="text-agro-orange" />
        <span>Prazo de Análise Cadastral: <strong>até 5 dias úteis</strong></span>
      </div>
      <p className="text-xs text-slate-600 leading-relaxed">
        Nossa equipe de compliance e crédito está validando as informações fornecidas. Avisaremos você no e-mail <strong className="text-slate-900 font-bold">{MOCK_USER_EMAIL}</strong> assim que a análise for concluída.
      </p>
    </div>
  );
};
