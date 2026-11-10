import React from 'react';
import { Info, Sparkles } from 'lucide-react';

interface AnalysisDemoControlsProps {
  onSimulateApprove: () => void;
  onSimulateReject: () => void;
  onSimulateAdjustment: () => void;
}

export const AnalysisDemoControls: React.FC<AnalysisDemoControlsProps> = ({
  onSimulateApprove,
  onSimulateReject,
  onSimulateAdjustment,
}) => {
  return (
    <div className="pt-4 border-t border-slate-100 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <Info size={13} />
          Ambiente de Demonstração Interativa
        </span>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onSimulateApprove}
            className="flex-1 px-5 py-3 bg-gci hover:bg-gci-hover text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-gci/10 flex items-center justify-center gap-2 active:scale-95"
          >
            <Sparkles size={16} className="text-agro-orange" />
            Simular Retorno: Aprovado
          </button>

          <button
            onClick={onSimulateReject}
            className="px-4 py-3 bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 text-xs font-bold rounded-xl transition-all border border-slate-200 flex items-center justify-center gap-2 active:scale-95"
          >
            Simular Retorno: Recusado
          </button>
        </div>

        <button
          type="button"
          onClick={onSimulateAdjustment}
          className="w-full px-4 py-3 bg-white hover:bg-amber-50 text-amber-800 text-xs font-bold rounded-xl transition-all border border-amber-200 flex items-center justify-center gap-2 active:scale-95"
        >
          Simular Retorno: Ajuste de Documentação
        </button>
      </div>
    </div>
  );
};
