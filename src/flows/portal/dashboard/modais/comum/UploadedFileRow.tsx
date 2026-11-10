import React from 'react';
import { Trash2 } from 'lucide-react';

interface UploadedFileRowProps {
  icon: React.ReactNode;
  name: string;
  details: React.ReactNode;
  className: string;
  iconBoxClassName: string;
  onRemove?: () => void;
}

/** Linha de arquivo selecionado (ícone, nome, detalhes e lixeira) dos modais de envio. */
export const UploadedFileRow = ({ icon, name, details, className, iconBoxClassName, onRemove }: UploadedFileRowProps) => (
  <div className={className}>
    <div className="flex items-center gap-4">
      <div className={iconBoxClassName}>{icon}</div>
      <div>
        <p className="font-bold text-sm text-gci">{name}</p>
        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{details}</p>
      </div>
    </div>
    <button
      onClick={onRemove}
      className="w-10 h-10 rounded-full flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all"
    >
      <Trash2 size={20} />
    </button>
  </div>
);
