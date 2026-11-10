import React from 'react';
import { HelpCircle } from 'lucide-react';
import type { CompanyTier } from '@/types/documentChecklist';
import { TierToggle } from './TierToggle';

interface ChecklistToolbarProps {
  companyTier: CompanyTier;
  onTierChange: (tier: CompanyTier) => void;
  onHelp: () => void;
}

/** Barra superior do checklist: alternador de segmento + botão "Ajuda". */
export const ChecklistToolbar: React.FC<ChecklistToolbarProps> = ({ companyTier, onTierChange, onHelp }) => {
  return (
    <div className="flex items-center justify-end gap-3 pb-1">
      {/* Discreet segment toggle for internal presentation */}
      <TierToggle value={companyTier} onChange={onTierChange} />

      {/* Help / FAQ */}
      <button
        onClick={onHelp}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-gci hover:bg-slate-100 transition-colors border border-slate-200 bg-white"
        title="Dúvidas e Suporte"
      >
        <HelpCircle size={16} />
        <span>Ajuda</span>
      </button>
    </div>
  );
};
