import React from 'react';
import { FileCheck, FileText, X } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import type { PreviewDoc } from '@/types/documentChecklist';

interface DocumentPreviewModalProps {
  previewDoc: PreviewDoc | null;
  onClose: () => void;
}

const OVERLAY_CLASS = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm';
const PANEL_CLASS = 'bg-white rounded-2xl shadow-xl w-full max-w-md p-6 border border-slate-200 space-y-4';

/** Modal de pré-visualização (simulada) de um documento já enviado. */
export const DocumentPreviewModal: React.FC<DocumentPreviewModalProps> = ({ previewDoc, onClose }) => {
  return (
    <Modal isOpen={previewDoc !== null} overlayClassName={OVERLAY_CLASS} panelClassName={PANEL_CLASS}>
      {previewDoc && (
        <>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText size={18} className="text-gci" />
              <h4 className="text-sm font-bold text-slate-800">{previewDoc.title}</h4>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
              <X size={18} />
            </button>
          </div>

          <div className="p-8 bg-slate-50 rounded-xl border border-slate-200 text-center space-y-2">
            <FileCheck size={36} className="text-emerald-500 mx-auto" />
            <p className="text-xs font-bold text-slate-800">{previewDoc.fileName}</p>
            <p className="text-[11px] text-slate-400">Arquivo criptografado e validado pela mesa de crédito.</p>
          </div>

          <button
            onClick={onClose}
            className="w-full py-2.5 bg-gci hover:bg-gci-hover text-white text-xs font-bold rounded-xl transition-colors"
          >
            Fechar
          </button>
        </>
      )}
    </Modal>
  );
};
