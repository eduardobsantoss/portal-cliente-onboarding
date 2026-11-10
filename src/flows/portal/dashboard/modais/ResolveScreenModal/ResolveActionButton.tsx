import type { LucideIcon } from 'lucide-react';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/utils/cn';

interface ResolveActionButtonProps {
  done?: boolean;
  label: string;
  doneLabel: string;
  icon: LucideIcon;
  todoClassName: string;
  onClick: () => void;
}

/** Botão de ação da tela de resolução (vira "enviado" e fica desabilitado quando concluído). */
export const ResolveActionButton = ({ done, label, doneLabel, icon: Icon, todoClassName, onClick }: ResolveActionButtonProps) => (
  <button
    disabled={done}
    onClick={(e) => {
      e.stopPropagation();
      onClick();
    }}
    className={cn(
      "flex flex-col items-center gap-1 p-3 px-6 rounded-2xl transition-all border shrink-0",
      done
        ? "bg-green-50 border-green-100 text-green-600"
        : todoClassName
    )}
  >
    {done ? <CheckCircle2 size={16} /> : <Icon size={16} />}
    <span className="text-[9px] font-black uppercase tracking-widest">{done ? doneLabel : label}</span>
  </button>
);
