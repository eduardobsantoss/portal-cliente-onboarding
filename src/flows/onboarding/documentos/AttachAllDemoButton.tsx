import React from 'react';

interface AttachAllDemoButtonProps {
  onClick: () => void;
}

export const AttachAllDemoButton: React.FC<AttachAllDemoButtonProps> = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-xs text-slate-400 underline underline-offset-2 hover:text-slate-500"
      title="Anexar todos os documentos pendentes (Demo)"
    >
      Anexar Todos (Demo)
    </button>
  );
};
