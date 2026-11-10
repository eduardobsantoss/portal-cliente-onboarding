import React from 'react';
import { Building2, User } from 'lucide-react';
import type { PartnerPersonType } from '@/types/documentChecklist';

interface AddPartnerTypeToggleProps {
  value: PartnerPersonType;
  onChange: (type: PartnerPersonType) => void;
}

/** Escolha do tipo de parte relacionada: Pessoa Física (PF) ou Pessoa Jurídica (PJ). */
export const AddPartnerTypeToggle: React.FC<AddPartnerTypeToggleProps> = ({ value, onChange }) => {
  return (
    <div>
      <label className="text-[11px] font-bold text-slate-600 block mb-1.5">Tipo de Parte Relacionada</label>
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => onChange('PF')}
          className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            value === 'PF'
              ? 'border-gci bg-emerald-50 text-gci ring-1 ring-gci/30'
              : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
          }`}
        >
          <User size={14} /> Pessoa Física (PF)
        </button>
        <button
          type="button"
          onClick={() => onChange('PJ')}
          className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            value === 'PJ'
              ? 'border-indigo-500 bg-indigo-50 text-indigo-700 ring-1 ring-indigo-400/30'
              : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Building2 size={14} /> Pessoa Jurídica (PJ)
        </button>
      </div>
    </div>
  );
};
