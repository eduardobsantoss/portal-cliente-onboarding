import React from 'react';
import { Check } from 'lucide-react';
import { PartnerCard } from '@/components/forms/PartnerCard';
import { CheckboxField } from '@/components/ui/CheckboxField';
import { StatusChip } from '@/components/ui/StatusChip';
import type { Socio } from '@/types/socio';

interface SocioCardProps {
  socio: Socio;
  index: number;
  onToggleRepresentante: (socioId: string) => void;
  onEdit: (socio: Socio) => void;
  /** ausente quando é o único sócio (não pode ser removido) */
  onDelete?: (socioId: string) => void;
}

export const SocioCard: React.FC<SocioCardProps> = ({
  socio,
  index,
  onToggleRepresentante,
  onEdit,
  onDelete,
}) => {
  return (
    <PartnerCard
      avatarClassName="w-9 h-9 rounded-xl bg-slate-100 text-gci flex items-center justify-center font-bold text-xs shrink-0"
      avatar={index + 1}
      detailsClassName="space-y-1"
      details={
        <>
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-xs font-bold text-slate-900">{socio.nome}</h4>
            <StatusChip tone="neutral">{socio.responsabilidade}</StatusChip>
            {socio.isRepresentanteLegal && (
              <StatusChip tone="success">
                <Check size={11} strokeWidth={3} /> Representante Legal
              </StatusChip>
            )}
          </div>
          <p className="text-[11px] text-slate-500">
            CPF/CNPJ: {socio.cpfCnpj} • {socio.email} • {socio.telefone}
          </p>
          <p className="text-[10px] text-slate-400">
            {socio.cidade}/{socio.uf} • {socio.profissao} • {socio.estadoCivil}
            {socio.regimeBens && ` (${socio.regimeBens})`}
          </p>
        </>
      }
      actionsClassName="flex items-center gap-3 self-end sm:self-center shrink-0"
      actionsPrefix={
        /* Checkbox Representante Legal no card do sócio */
        <CheckboxField
          checked={Boolean(socio.isRepresentanteLegal)}
          onChange={() => onToggleRepresentante(socio.id)}
          labelClassName="flex items-center gap-1.5 cursor-pointer px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-[11px] font-semibold text-slate-700 transition-colors whitespace-nowrap shrink-0"
        >
          Representante legal
        </CheckboxField>
      }
      onEdit={() => onEdit(socio)}
      onDelete={onDelete ? () => onDelete(socio.id) : undefined}
      deleteTitle="Remover Sócio"
    />
  );
};
