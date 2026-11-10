import React from 'react';
import { TIER_OPTIONS } from '@/constants/checklistTopics';
import type { CompanyTier } from '@/types/documentChecklist';

interface TierToggleProps {
  value: CompanyTier;
  onChange: (tier: CompanyTier) => void;
}

/** Alternador discreto de segmento (Middle Corporate / Simples-PME) para apresentação interna. */
export const TierToggle: React.FC<TierToggleProps> = ({ value, onChange }) => {
  return (
    <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/80 text-[11px] font-bold" title="Alternar visão para apresentação interna">
      {TIER_OPTIONS.map(({ tier, label }) => (
        <button
          key={tier}
          onClick={() => onChange(tier)}
          className={`px-3 py-1 rounded-lg transition-all ${
            value === tier
              ? 'bg-white text-gci shadow-sm'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};
