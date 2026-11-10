import React from 'react';
import { Building2, ChevronDown } from 'lucide-react';
import type { PartnerData } from '@/types/documentChecklist';
import { ValidationBadge } from '../comum/ValidationBadge';

interface PartnerHeaderProps {
  partner: PartnerData;
  isExpanded: boolean;
  onToggle: () => void;
}

/** Cabeçalho clicável de uma parte relacionada (avatar, nome/CPF-CNPJ, vínculo, status e chevron). */
export const PartnerHeader: React.FC<PartnerHeaderProps> = ({ partner, isExpanded, onToggle }) => {
  const isPartnerValid = partner.status === 'validado';
  const isPJ = partner.type === 'PJ';

  return (
    <button
      onClick={onToggle}
      className="w-full p-3.5 text-left flex items-center justify-between gap-3 hover:bg-slate-50/50 transition-colors"
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className={`w-8 h-8 rounded-xl font-bold text-xs flex items-center justify-center shrink-0 ${
          isPJ ? 'bg-indigo-50 text-indigo-700 border border-indigo-200/60' : 'bg-slate-100 text-slate-600'
        }`}>
          {isPJ ? <Building2 size={16} /> : partner.name.charAt(0)}
        </div>
        <div className="truncate">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-slate-800 truncate">{partner.name}</span>
            <span className="text-[10px] text-slate-400">({partner.cpf})</span>
            {partner.isNonPartner ? (
              <span className="text-[9px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-1.5 py-0.5 rounded">
                {partner.vinculo || 'Representante Não Sócio'}
              </span>
            ) : isPJ ? (
              <span className="text-[9px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200/70 px-1.5 py-0.5 rounded">
                Pessoa Jurídica
              </span>
            ) : null}
          </div>
          <p className="text-[11px] text-slate-400">
            {partner.role}
            {!partner.isNonPartner && ` • ${partner.quotaPercentage}% de participação`}
            {!isPJ && partner.maritalStatus && ` • ${partner.maritalStatus}`}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2.5 shrink-0">
        <ValidationBadge isDone={isPartnerValid} doneLabel="Validado" variant="partner" />
        <ChevronDown
          size={14}
          className={`text-slate-400 transition-transform ${isExpanded ? 'rotate-180 text-gci' : ''}`}
        />
      </div>
    </button>
  );
};
