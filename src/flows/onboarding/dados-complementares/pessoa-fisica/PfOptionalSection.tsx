import React from 'react';
import { PepField } from '@/components/forms/PepField';
import { CollapsibleSection } from '@/components/ui/CollapsibleSection';
import { TextField } from '@/components/ui/TextField';
import type { PfFormData } from '@/types/dadosComplementares';
import { PfAlternativeDocument } from './PfAlternativeDocument';

interface PfOptionalSectionProps {
  pfData: PfFormData;
  setPfData: React.Dispatch<React.SetStateAction<PfFormData>>;
  isOpen: boolean;
  onToggle: () => void;
}

export const PfOptionalSection: React.FC<PfOptionalSectionProps> = ({
  pfData,
  setPfData,
  isOpen,
  onToggle,
}) => {
  return (
    <CollapsibleSection
      isOpen={isOpen}
      onToggle={onToggle}
      buttonClassName="w-full p-4 flex items-center justify-between text-left hover:bg-slate-100/60 transition-colors"
      header={
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700">
            Informações adicionais e complementares
          </span>
          <span className="text-[10px] font-bold text-slate-400 bg-slate-200/80 px-2 py-0.5 rounded-full uppercase">
            Opcional
          </span>
        </div>
      }
    >
      <div className="p-4 pt-2 border-t border-slate-200/60 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <TextField
          label="Nome do Pai"
          labelClassName="block text-[11px] font-medium text-slate-600 mb-1"
          inputClassName="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-gci/20 focus:border-gci"
          value={pfData.nomePai}
          onChange={(value) => setPfData({ ...pfData, nomePai: value })}
        />

        <PepField
          checked={pfData.pep}
          onChange={(checked) => setPfData({ ...pfData, pep: checked })}
          label="Sou ou possuo relação com Pessoa Politicamente Exposta (PEP)"
        />

        <PfAlternativeDocument pfData={pfData} setPfData={setPfData} />
      </div>
    </CollapsibleSection>
  );
};
