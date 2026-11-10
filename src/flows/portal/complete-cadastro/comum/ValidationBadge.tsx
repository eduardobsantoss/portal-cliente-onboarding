import React from 'react';
import { Check } from 'lucide-react';

type ValidationBadgeVariant = 'topic' | 'partner';

interface ValidationBadgeProps {
  isDone: boolean;
  /** Texto do estado concluído ("Concluído", "Validada", "Validado"). */
  doneLabel: string;
  variant: ValidationBadgeVariant;
}

const DONE_CLASS: Record<ValidationBadgeVariant, string> = {
  topic: 'text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1',
  partner: 'text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1',
};

const PENDING_CLASS: Record<ValidationBadgeVariant, string> = {
  topic: 'text-[11px] font-bold text-agro-orange bg-orange-50 px-2.5 py-1 rounded-full',
  partner: 'text-[10px] font-bold text-agro-orange bg-orange-50 px-2 py-0.5 rounded-full',
};

const CHECK_SIZE: Record<ValidationBadgeVariant, number> = { topic: 12, partner: 11 };

/** Selo "concluído / Pendente" (SMS, biometria e cabeçalho de cada parte do quadro societário). */
export const ValidationBadge: React.FC<ValidationBadgeProps> = ({ isDone, doneLabel, variant }) => {
  if (isDone) {
    return (
      <span className={DONE_CLASS[variant]}>
        <Check size={CHECK_SIZE[variant]} strokeWidth={3} /> {doneLabel}
      </span>
    );
  }

  return <span className={PENDING_CLASS[variant]}>Pendente</span>;
};
