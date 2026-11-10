import React from 'react';
import { X } from 'lucide-react';

interface ModalTitleBarProps {
  title: React.ReactNode;
  subtitle: React.ReactNode;
  onClose: () => void;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  closeButtonClassName?: string;
}

const DEFAULT_BAR_CLASS = 'p-8 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10';
const DEFAULT_TITLE_CLASS = 'text-2xl font-black text-gci tracking-tight';
const DEFAULT_SUBTITLE_CLASS = 'text-sm text-slate-500 font-medium mt-1';
const DEFAULT_CLOSE_CLASS =
  'w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:text-gci hover:bg-slate-100 transition-colors';

/** Cabeçalho (título, subtítulo e botão fechar) dos modais centralizados do portal. */
export const ModalTitleBar = ({
  title,
  subtitle,
  onClose,
  className = DEFAULT_BAR_CLASS,
  titleClassName = DEFAULT_TITLE_CLASS,
  subtitleClassName = DEFAULT_SUBTITLE_CLASS,
  closeButtonClassName = DEFAULT_CLOSE_CLASS,
}: ModalTitleBarProps) => (
  <div className={className}>
    <div>
      <h2 className={titleClassName}>{title}</h2>
      <p className={subtitleClassName}>{subtitle}</p>
    </div>
    <button onClick={() => onClose()} className={closeButtonClassName}>
      <X size={24} />
    </button>
  </div>
);
