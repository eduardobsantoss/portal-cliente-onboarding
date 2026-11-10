import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import type { DocumentUploadItem } from '@/types/documentUpload';
import { DocumentNumberField } from './DocumentNumberField';
import { DocumentTitleRow } from './DocumentTitleRow';
import { DocumentUploadActions } from './DocumentUploadActions';

interface DocumentUploadRowProps {
  doc: DocumentUploadItem;
  docNumber: string;
  isUploading: boolean;
  onDocumentNumberChange: (value: string) => void;
  onFileSelect: (file: File) => void;
  onRemove: () => void;
}

export const DocumentUploadRow: React.FC<DocumentUploadRowProps> = ({
  doc,
  docNumber,
  isUploading,
  onDocumentNumberChange,
  onFileSelect,
  onRemove,
}) => {
  return (
    <div
      className={`p-4 rounded-xl border transition-all ${
        doc.isRegularizationNeeded
          ? 'bg-amber-50/40 border-amber-300'
          : doc.uploaded
          ? 'bg-slate-50/50 border-slate-200/90'
          : 'bg-white border-dashed border-slate-300 hover:border-gci/50'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1 flex-1 min-w-0">
          <DocumentTitleRow doc={doc} />

          <p className="text-[11px] text-slate-500 leading-relaxed">
            {doc.description}
          </p>

          {/* Campo para digitar o documento */}
          {doc.isPersonDoc && (
            <DocumentNumberField value={docNumber} onChange={onDocumentNumberChange} />
          )}

          {/* Regularization Note */}
          {doc.isRegularizationNeeded && doc.regularizationReason && (
            <div className="mt-2 p-2.5 bg-amber-100/70 border border-amber-300 rounded-lg text-amber-900 text-xs font-medium">
              <strong>Motivo:</strong> {doc.regularizationReason}
            </div>
          )}

          {/* Uploaded metadata */}
          {doc.uploaded && !doc.isRegularizationNeeded && (
            <div className="flex items-center gap-2 pt-1 text-[11px] font-medium text-emerald-800">
              <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
              <span className="truncate font-semibold">{doc.fileName}</span>
              <span className="text-slate-400">• {doc.fileSize}</span>
            </div>
          )}
        </div>

        {/* Upload Action / State */}
        <DocumentUploadActions
          doc={doc}
          isUploading={isUploading}
          onFileSelect={onFileSelect}
          onRemove={onRemove}
        />
      </div>
    </div>
  );
};
