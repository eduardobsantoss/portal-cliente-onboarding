import React from 'react';
import { Info } from 'lucide-react';
import type { AccountType } from '@/types/dadosComplementares';

interface AccountTypeSwitchProps {
  accountType: AccountType;
  onSelect: (type: AccountType) => void;
}

const OPTIONS: { type: AccountType; label: string }[] = [
  { type: 'pf', label: 'Pessoa Física' },
  { type: 'pj', label: 'Pessoa Jurídica' },
];

/** Seletor discreto de simulação de tipo de conta (PF / PJ) */
export const AccountTypeSwitch: React.FC<AccountTypeSwitchProps> = ({ accountType, onSelect }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-slate-50/80 rounded-xl border border-slate-200/70 text-xs">
      <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1.5">
        <Info size={14} className="text-slate-400" />
        Simular preenchimento como:
      </span>
      <div className="inline-flex p-1 bg-slate-200/60 rounded-lg self-start sm:self-auto">
        {OPTIONS.map(({ type, label }) => (
          <button
            key={type}
            type="button"
            onClick={() => onSelect(type)}
            className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
              accountType === type
                ? 'bg-white text-gci shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};
