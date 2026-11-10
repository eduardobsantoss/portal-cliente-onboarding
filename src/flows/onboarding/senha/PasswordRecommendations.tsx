import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { PASSWORD_RECOMMENDATIONS } from '@/constants/password';

export const PasswordRecommendations: React.FC = () => {
  return (
    <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1.5 text-[11px] text-slate-600">
      <div className="font-semibold text-slate-700 flex items-center gap-1.5 mb-1">
        <ShieldCheck size={14} className="text-gci" />
        Recomendações de Segurança
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] text-slate-500">
        {PASSWORD_RECOMMENDATIONS.map((recommendation) => (
          <span key={recommendation} className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-gci/60" />
            {recommendation}
          </span>
        ))}
      </div>
    </div>
  );
};
