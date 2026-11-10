import React from 'react';
import { AlertCircle } from 'lucide-react';
import { FileUpload } from '@/components/ui/FileUpload';
import { CHECKLIST_FILE_ACCEPT } from '@/constants/documentChecklist';
import type { CompanyTier, DocumentItem } from '@/types/documentChecklist';
import { DocumentRowActions } from './DocumentRowActions';
import { DocumentRowStatusChips } from './DocumentRowStatusChips';

interface DocumentRowProps {
  doc: DocumentItem;
  companyTier: CompanyTier;
  onUpload: (file: File) => void;
  onPreview: () => void;
}

/** Linha de um documento oficial da empresa (título, status, motivo de rejeição e ações de anexo). */
export const DocumentRow: React.FC<DocumentRowProps> = ({ doc, companyTier, onUpload, onPreview }) => {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const isUploaded = doc.status === 'aprovado' || doc.status === 'em_analise';
  const isRejected = doc.status === 'rejeitado';
  const isOptional = doc.optionalFor?.includes(companyTier);

  return (
    <div className={`p-3.5 bg-white rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
      isRejected ? 'border-rose-200 bg-rose-50/20' : 'border-slate-200/80'
    }`}>
      <div className="space-y-1 flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className={`text-xs font-bold truncate ${isRejected ? 'text-rose-950' : 'text-slate-800'}`}>{doc.title}</p>

          <DocumentRowStatusChips status={doc.status} isOptional={Boolean(isOptional)} />
        </div>
        <p className={`text-[11px] leading-tight ${isOptional ? 'text-amber-800 font-medium' : 'text-slate-400'}`}>
          {isOptional && doc.optionalNote ? doc.optionalNote : doc.description}
        </p>

        {isRejected && doc.rejectionReason && (
          <div className="mt-1.5 flex items-start gap-1.5 p-2 bg-rose-50/90 border border-rose-200/80 rounded-lg text-rose-800 text-[11px]">
            <AlertCircle size={13} className="shrink-0 mt-0.5 text-rose-600" />
            <span><strong>Motivo:</strong> {doc.rejectionReason}</span>
          </div>
        )}

        {doc.fileName && !isRejected && (
          <p className="text-[10px] text-slate-500 pt-0.5">{doc.fileName} • {doc.fileSize}</p>
        )}
      </div>

      <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
        <FileUpload inputRef={fileInputRef} accept={CHECKLIST_FILE_ACCEPT} onFileSelect={onUpload} />

        <DocumentRowActions
          isRejected={isRejected}
          isUploaded={isUploaded}
          isOptional={Boolean(isOptional)}
          onPick={() => fileInputRef.current?.click()}
          onPreview={onPreview}
        />
      </div>
    </div>
  );
};
