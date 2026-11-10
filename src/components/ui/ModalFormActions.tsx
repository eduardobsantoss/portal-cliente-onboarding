import React from 'react';

interface ModalFormActionsProps {
  submitLabel: string;
  onCancel: () => void;
}

export const ModalFormActions: React.FC<ModalFormActionsProps> = ({ submitLabel, onCancel }) => {
  return (
    <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
      <button
        type="button"
        onClick={onCancel}
        className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition-colors"
      >
        Cancelar
      </button>
      <button
        type="submit"
        className="px-6 py-2.5 rounded-xl bg-gci hover:bg-gci-hover text-white font-bold text-xs transition-colors shadow-sm"
      >
        {submitLabel}
      </button>
    </div>
  );
};
