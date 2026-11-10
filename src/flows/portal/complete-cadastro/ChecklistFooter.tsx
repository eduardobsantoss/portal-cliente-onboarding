import React from 'react';

interface ChecklistFooterProps {
  isBulkUploading: boolean;
  onFillAll: () => void;
  onReset: () => void;
}

/** Rodapé discreto com os controles de simulação (preencher todos / restaurar estado inicial). */
export const ChecklistFooter: React.FC<ChecklistFooterProps> = ({ isBulkUploading, onFillAll, onReset }) => {
  return (
    <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
      <span className="text-[11px]">Ambiente seguro e criptografado GCI</span>
      <div className="flex items-center gap-3">
        <button
          onClick={onFillAll}
          disabled={isBulkUploading}
          className="text-slate-500 hover:text-gci font-semibold underline text-xs transition-colors disabled:opacity-50"
        >
          {isBulkUploading ? 'Preenchendo...' : 'Preencher todos os documentos (Simulação)'}
        </button>
        <span>•</span>
        <button
          onClick={onReset}
          className="text-slate-400 hover:text-red-500 transition-colors"
        >
          Restaurar estado inicial
        </button>
      </div>
    </div>
  );
};
