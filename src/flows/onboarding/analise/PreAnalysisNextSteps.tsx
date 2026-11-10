import React from 'react';

export const PreAnalysisNextSteps: React.FC = () => {
  return (
    <div className="space-y-3">
      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
        Próximas Etapas da Sua Jornada
      </h4>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-3.5 rounded-2xl border border-emerald-200 bg-emerald-50/50 flex items-start gap-3">
          <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0">
            1
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900">Conta Digital GCI</p>
            <p className="text-[11px] text-slate-600 mt-0.5">Sua conta corrente empresarial já foi gerada e está ativa.</p>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50 flex items-start gap-3">
          <div className="w-7 h-7 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0">
            2
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900">Checklist Cadastral</p>
            <p className="text-[11px] text-slate-600 mt-0.5">Envio de documentos para ativação plena do limite operacional.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
