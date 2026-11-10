import React from 'react';
import { Trash2, Upload } from 'lucide-react';
import { FileUpload } from '@/components/ui/FileUpload';
import { FileUploadTrigger } from '@/components/ui/FileUploadTrigger';
import { UPLOAD_ACCEPT_ATTRIBUTE } from '@/constants/documentUpload';
import type { DocumentUploadItem } from '@/types/documentUpload';

interface DocumentUploadActionsProps {
  doc: DocumentUploadItem;
  isUploading: boolean;
  onFileSelect: (file: File) => void;
  onRemove: () => void;
}

export const DocumentUploadActions: React.FC<DocumentUploadActionsProps> = ({
  doc,
  isUploading,
  onFileSelect,
  onRemove,
}) => {
  return (
    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
      {isUploading ? (
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-lg text-xs text-gci font-semibold">
          <div className="w-3.5 h-3.5 border-2 border-gci border-t-transparent rounded-full animate-spin" />
          <span>Enviando...</span>
        </div>
      ) : doc.isRegularizationNeeded ? (
        <FileUploadTrigger
          inputId={`file-input-${doc.id}`}
          className="cursor-pointer flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm"
        >
          <Upload size={14} />
          <span>Substituir Arquivo</span>
        </FileUploadTrigger>
      ) : doc.uploaded ? (
        <div className="flex items-center gap-2">
          <FileUploadTrigger
            inputId={`file-input-${doc.id}`}
            className="cursor-pointer text-xs font-semibold text-slate-600 hover:text-gci px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors"
          >
            Substituir
          </FileUploadTrigger>
          <button
            type="button"
            onClick={onRemove}
            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Remover anexo"
          >
            <Trash2 size={15} />
          </button>
        </div>
      ) : (
        <FileUploadTrigger
          inputId={`file-input-${doc.id}`}
          className="cursor-pointer flex items-center gap-1.5 px-4 py-2 bg-gci hover:bg-gci-hover text-white text-xs font-bold rounded-xl transition-all shadow-sm hover:shadow"
        >
          <Upload size={14} />
          <span>Anexar Arquivo</span>
        </FileUploadTrigger>
      )}

      <FileUpload
        id={`file-input-${doc.id}`}
        accept={UPLOAD_ACCEPT_ATTRIBUTE}
        onFileSelect={onFileSelect}
      />
    </div>
  );
};
