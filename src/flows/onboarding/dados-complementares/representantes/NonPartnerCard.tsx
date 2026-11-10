import React from 'react';
import { PartnerCard } from '@/components/forms/PartnerCard';
import { StatusChip } from '@/components/ui/StatusChip';
import type { NonPartnerRepresentative } from '@/types/representante';

interface NonPartnerCardProps {
  rep: NonPartnerRepresentative;
  onEdit: (rep: NonPartnerRepresentative) => void;
  onDelete: (id: string) => void;
}

export const NonPartnerCard: React.FC<NonPartnerCardProps> = ({ rep, onEdit, onDelete }) => {
  return (
    <PartnerCard
      avatarClassName="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center font-bold text-xs shrink-0"
      avatar="RL"
      detailsClassName="space-y-0.5"
      details={
        <>
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-xs font-bold text-slate-900">{rep.nome}</h4>
            <StatusChip tone="warning">{rep.vinculo}</StatusChip>
            <StatusChip tone="muted">Cargo: {rep.cargo}</StatusChip>
          </div>
          <p className="text-[11px] text-slate-500">
            CPF: {rep.cpf} • {rep.email} • {rep.telefone}
          </p>
          <p className="text-[10px] text-slate-400">
            Estado civil: {rep.estadoCivil}
            {rep.nomeConjuge && ` • Cônjuge: ${rep.nomeConjuge} (${rep.regimeBens || 'Comunhão parcial'})`}
          </p>
        </>
      }
      actionsClassName="flex items-center gap-2 self-end sm:self-center"
      onEdit={() => onEdit(rep)}
      onDelete={() => onDelete(rep.id)}
      deleteTitle="Remover Representante"
    />
  );
};
