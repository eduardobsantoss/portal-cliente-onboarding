interface ModalActionFooterProps {
  cancelLabel: string;
  onCancel: () => void;
  confirmLabel: string;
  onConfirm: () => void;
  confirmClassName: string;
  confirmDisabled?: boolean;
  className?: string;
}

const DEFAULT_FOOTER_CLASS = 'p-8 border-t border-slate-100 bg-slate-50/50 flex gap-4';
const CANCEL_BUTTON_CLASS =
  'flex-1 bg-white border border-slate-200 text-slate-400 py-4 rounded-2xl font-bold text-sm hover:text-gci transition-all shadow-sm';

/** Rodapé "Cancelar" + ação principal dos modais centralizados do portal. */
export const ModalActionFooter = ({
  cancelLabel,
  onCancel,
  confirmLabel,
  onConfirm,
  confirmClassName,
  confirmDisabled,
  className = DEFAULT_FOOTER_CLASS,
}: ModalActionFooterProps) => (
  <div className={className}>
    <button onClick={() => onCancel()} className={CANCEL_BUTTON_CLASS}>
      {cancelLabel}
    </button>
    <button onClick={() => onConfirm()} disabled={confirmDisabled} className={confirmClassName}>
      {confirmLabel}
    </button>
  </div>
);
