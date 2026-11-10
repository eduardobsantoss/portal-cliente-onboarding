import React from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, CheckCircle2, ShieldCheck } from 'lucide-react';

interface ValidationLoadingViewProps {
  onApprove: () => void;
  onAdjust: () => void;
}

/** Tela "Validando documentação" com os controles de simulação (aprovar / ajustes necessários). */
export const ValidationLoadingView: React.FC<ValidationLoadingViewProps> = ({ onApprove, onAdjust }) => {
  return (
    <div className="max-w-2xl mx-auto py-6 animate-in fade-in duration-300">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-6 sm:p-10 text-center space-y-6"
      >
        <div className="text-center py-6 md:py-10 space-y-8">
          {/* 1. Anel Giratório com Pulso Central */}
          <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
            {/* Brilho externo pulsante */}
            <div className="absolute inset-0 rounded-full bg-[#004A2F]/10 animate-ping opacity-75" />

            {/* Anel giratório bicolor (Verde GCI e Laranja Agro) */}
            <div className="absolute inset-0 rounded-full border-4 border-gray-100 border-t-[#004A2F] border-r-[#FF7300] animate-spin" />

            {/* Círculo central com escudo pulsante */}
            <div className="w-20 h-20 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-[#004A2F] relative z-10">
              <ShieldCheck size={36} className="text-[#FF7300] animate-pulse" />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Validando documentação
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed max-w-md mx-auto">
              Estamos conferindo a nitidez, integridade e conformidade de todos os dados e anexos enviados.
            </p>
          </div>

          {/* Simulation controls */}
          <div className="pt-4 border-t border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-3">
              Controles de Simulação
            </span>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <button
                type="button"
                onClick={onApprove}
                className="w-full sm:w-auto flex-1 px-4 py-2.5 bg-gci hover:bg-gci-hover text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-gci/15 flex items-center justify-center gap-1.5 active:scale-95"
              >
                <CheckCircle2 size={15} />
                Aprovar Validação
              </button>

              <button
                type="button"
                onClick={onAdjust}
                className="w-full sm:w-auto flex-1 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-amber-500/15 flex items-center justify-center gap-1.5 active:scale-95"
              >
                <AlertTriangle size={15} />
                Ajustes Necessários
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
