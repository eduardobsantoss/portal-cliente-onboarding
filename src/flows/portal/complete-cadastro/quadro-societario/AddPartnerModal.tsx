import React from 'react';
import { X } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { ADD_PARTNER_PF_DOCS_NOTE, ADD_PARTNER_PJ_DOCS_NOTE } from '@/constants/checklistTopics';
import type { NewPartnerForm } from '@/types/documentChecklist';
import { AddPartnerFields } from './AddPartnerFields';
import { AddPartnerTypeToggle } from './AddPartnerTypeToggle';

interface AddPartnerModalProps {
  isOpen: boolean;
  values: NewPartnerForm;
  onFieldChange: <K extends keyof NewPartnerForm>(field: K, value: NewPartnerForm[K]) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}

const OVERLAY_CLASS = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm';
const PANEL_CLASS = 'bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 border border-slate-200 space-y-4';

/** Modal "Adicionar Parte Relacionada" (PF ou PJ) do quadro societário. */
export const AddPartnerModal: React.FC<AddPartnerModalProps> = ({
  isOpen,
  values,
  onFieldChange,
  onSubmit,
  onClose,
}) => {
  return (
    <Modal isOpen={isOpen} overlayClassName={OVERLAY_CLASS} panelClassName={PANEL_CLASS}>
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-sm font-bold text-slate-800">Adicionar Parte Relacionada</h3>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
          <X size={18} />
        </button>
      </div>

      <form onSubmit={onSubmit} className="space-y-3.5">
        <AddPartnerTypeToggle value={values.type} onChange={(type) => onFieldChange('type', type)} />

        <AddPartnerFields values={values} onFieldChange={onFieldChange} />

        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 text-[11px] text-slate-500">
          {values.type === 'PJ' ? (
            <span><strong>Documentos exigidos pelo checklist:</strong> {ADD_PARTNER_PJ_DOCS_NOTE}</span>
          ) : (
            <span><strong>Documentos exigidos pelo checklist:</strong> {ADD_PARTNER_PF_DOCS_NOTE}</span>
          )}
        </div>

        <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs text-slate-500 hover:text-slate-700 font-bold"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-gci hover:bg-gci-hover text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
          >
            Salvar Parte Relacionada
          </button>
        </div>
      </form>
    </Modal>
  );
};
