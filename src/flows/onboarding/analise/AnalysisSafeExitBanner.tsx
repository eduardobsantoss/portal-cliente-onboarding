import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const AnalysisSafeExitBanner: React.FC = () => {
  return (
    <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-start gap-3.5">
      <ShieldCheck size={20} className="text-emerald-600 shrink-0 mt-0.5" />
      <div className="text-xs text-emerald-950 space-y-1">
        <p className="font-bold">Você pode fechar esta aba com total tranquilidade</p>
        <p className="text-emerald-800 leading-relaxed">
          Seu progresso está salvo. Quando a análise for concluída, você poderá retornar ao portal com suas credenciais.
        </p>
      </div>
    </div>
  );
};
