import React from 'react';
import { ArrowRight } from 'lucide-react';

interface SubmitDocumentsButtonProps {
  type: 'submit' | 'button';
  onClick?: () => void;
}

export const SubmitDocumentsButton: React.FC<SubmitDocumentsButtonProps> = ({ type, onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full sm:w-auto px-6 sm:px-8 py-3.5 bg-gci hover:bg-gci-hover text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-gci/10 flex items-center justify-center gap-2 active:scale-95 whitespace-nowrap"
    >
      <span>Avançar pro Envio de Documentos</span>
      <ArrowRight size={17} />
    </button>
  );
};
