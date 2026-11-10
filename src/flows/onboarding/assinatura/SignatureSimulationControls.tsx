import React from 'react';
import { Info, Sparkles } from 'lucide-react';

interface SignatureSimulationControlsProps {
  onSimulateAllSigned: () => void;
}

export const SignatureSimulationControls: React.FC<SignatureSimulationControlsProps> = ({
  onSimulateAllSigned,
}) => {
  return (
    <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2.5">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <Info size={13} />
          Controle de Simulação (Ambiente de Testes)
        </span>
      </div>

      <div className="flex flex-col sm:flex-row gap-2.5">
        <button
          type="button"
          onClick={onSimulateAllSigned}
          className="flex-1 px-4 py-2.5 bg-white hover:bg-slate-100 text-gci border border-slate-200 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 active:scale-95"
        >
          <Sparkles size={15} className="text-agro-orange" />
          Simular assinaturas concluídas
        </button>
      </div>
    </div>
  );
};
