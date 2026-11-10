import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface DemoBackButtonProps {
  visible: boolean;
  onBack: () => void;
}

/** Atalho de apresentação: desfaz a última troca de tela sem recarregar a página. */
export const DemoBackButton: React.FC<DemoBackButtonProps> = ({ visible, onBack }) => {
  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={onBack}
      className="fixed bottom-4 left-4 z-[60] inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/95 px-3 py-2 text-xs font-semibold text-slate-500 shadow-md backdrop-blur-sm hover:border-slate-300 hover:text-gci"
    >
      <ArrowLeft size={14} />
      Voltar (demo)
    </button>
  );
};
