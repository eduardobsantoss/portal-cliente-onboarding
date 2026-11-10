import React from 'react';
import { PepField } from '@/components/forms/PepField';
import { CollapsibleSection } from '@/components/ui/CollapsibleSection';
import { TextField } from '@/components/ui/TextField';
import type { Socio } from '@/types/socio';

interface SocioOptionalSectionProps {
  form: Partial<Socio>;
  setForm: React.Dispatch<React.SetStateAction<Partial<Socio>>>;
  isOpen: boolean;
  onToggle: () => void;
}

export const SocioOptionalSection: React.FC<SocioOptionalSectionProps> = ({
  form,
  setForm,
  isOpen,
  onToggle,
}) => {
  return (
    <CollapsibleSection
      isOpen={isOpen}
      onToggle={onToggle}
      buttonClassName="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-100/60 transition-colors"
      header={
        <span className="text-xs font-bold text-slate-700">
          Informações adicionais do sócio (Opcional)
        </span>
      }
    >
      <div className="p-4 pt-2 border-t border-slate-200/60 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <TextField
          label="Nome do Pai"
          labelClassName="block text-[11px] font-medium text-slate-600 mb-1"
          inputClassName="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
          value={form.nomePai || ''}
          onChange={(value) => setForm({ ...form, nomePai: value })}
        />

        <PepField
          checked={form.pep || false}
          onChange={(checked) => setForm({ ...form, pep: checked })}
          label="Pessoa Politicamente Exposta (PEP)"
        />
      </div>
    </CollapsibleSection>
  );
};
