import React from 'react';
import { Sparkles } from 'lucide-react';

interface AttachAllDemoButtonProps {
  onClick: () => void;
}

export const AttachAllDemoButton: React.FC<AttachAllDemoButtonProps> = ({ onClick }) => {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onClick}
        className="text-[11px] font-bold text-gci bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
        title="Anexar todos os documentos pendentes (Demo)"
      >
        <Sparkles size={13} className="text-emerald-600" />
        <span className="hidden sm:inline">Anexar Todos (Demo)</span>
        <span className="sm:hidden">Demo</span>
      </button>
    </div>
  );
};
