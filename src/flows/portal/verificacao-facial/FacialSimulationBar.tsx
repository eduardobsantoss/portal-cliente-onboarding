import React from 'react';
import { RefreshCw, Sparkles, Info } from 'lucide-react';

interface FacialSimulationBarProps {
  isSimulating: boolean;
  onSimulateScan: () => void;
}

export const FacialSimulationBar: React.FC<FacialSimulationBarProps> = ({
  isSimulating,
  onSimulateScan,
}) => {
  return (
    <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
      <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
        <Info size={13} />
        <span>Conclusão em tempo real após captura</span>
      </div>

      <button
        type="button"
        onClick={onSimulateScan}
        disabled={isSimulating}
        className="px-4 py-2 bg-gci hover:bg-gci-hover text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-2 active:scale-95 disabled:opacity-50"
      >
        {isSimulating ? (
          <>
            <RefreshCw size={13} className="animate-spin" />
            Processando biometria...
          </>
        ) : (
          <>
            <Sparkles size={13} className="text-agro-orange" />
            Simular Validação Facial
          </>
        )}
      </button>
    </div>
  );
};
