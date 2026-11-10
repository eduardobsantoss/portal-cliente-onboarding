import React from 'react';
import { Eye, Upload } from 'lucide-react';

interface DocumentRowActionsProps {
  isRejected: boolean;
  isUploaded: boolean;
  isOptional: boolean;
  /** Abre o seletor de arquivos (input oculto da linha). */
  onPick: () => void;
  onPreview: () => void;
}

const SECONDARY_BUTTON_CLASS =
  'px-2.5 py-1.5 text-slate-500 hover:text-gci text-[11px] font-semibold bg-slate-100 hover:bg-slate-200/70 rounded-lg transition-colors flex items-center gap-1';

/** Botões da linha: "Substituir Arquivo" (rejeitado), "Ver" + "Substituir" (enviado) ou "Anexar". */
export const DocumentRowActions: React.FC<DocumentRowActionsProps> = ({
  isRejected,
  isUploaded,
  isOptional,
  onPick,
  onPreview,
}) => {
  if (isRejected) {
    return (
      <button
        onClick={onPick}
        className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-sm active:scale-95"
      >
        <Upload size={12} />
        Substituir Arquivo
      </button>
    );
  }

  if (isUploaded) {
    return (
      <div className="flex items-center gap-1.5">
        <button onClick={onPreview} className={SECONDARY_BUTTON_CLASS}>
          <Eye size={12} /> Ver
        </button>
        <button onClick={onPick} className={SECONDARY_BUTTON_CLASS}>
          <Upload size={12} /> Substituir
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={onPick}
      className="px-3 py-1.5 bg-gci hover:bg-gci-hover text-white text-[11px] font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-sm active:scale-95"
    >
      <Upload size={12} />
      {isOptional ? 'Anexar (Opcional)' : 'Anexar Arquivo'}
    </button>
  );
};
