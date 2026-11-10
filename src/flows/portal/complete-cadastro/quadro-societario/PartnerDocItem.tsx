import React from 'react';
import { Check, Eye, Upload } from 'lucide-react';
import { FileUpload } from '@/components/ui/FileUpload';
import { CHECKLIST_FILE_ACCEPT } from '@/constants/documentChecklist';
import type { PartnerDocState } from '@/types/documentChecklist';

interface PartnerDocItemProps {
  label: string;
  docState: PartnerDocState;
  note?: string;
  onUpload: (file: File) => void;
  onPreview?: () => void;
}

/** Linha de documento de uma parte relacionada (identidade, residência, IRPF, contrato social etc.). */
export const PartnerDocItem: React.FC<PartnerDocItemProps> = ({ label, docState, note, onUpload, onPreview }) => {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const isRejected = docState.status === 'rejeitado';

  return (
    <div className={`p-3 bg-white rounded-lg border flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
      isRejected ? 'border-rose-200 bg-rose-50/30' : 'border-slate-200/80'
    }`}>
      <div className="min-w-0 flex-1 space-y-0.5">
        <div className="flex items-center gap-2">
          <p className={`text-[11px] font-bold truncate ${isRejected ? 'text-rose-950' : 'text-slate-700'}`}>{label}</p>
          {isRejected && (
            <span className="text-[9px] font-bold text-rose-700 bg-rose-100 px-1.5 py-0.2 rounded-full shrink-0">
              Ajuste necessário
            </span>
          )}
        </div>
        {note && <p className="text-[10px] text-slate-400">{note}</p>}
        {docState.uploaded && docState.fileName && !isRejected && (
          <button
            type="button"
            onClick={onPreview}
            className="text-[10px] text-emerald-600 hover:text-emerald-700 font-medium truncate flex items-center gap-1 hover:underline text-left"
          >
            <Eye size={10} className="shrink-0" />
            <span className="truncate">{docState.fileName}</span>
          </button>
        )}
        {isRejected && docState.rejectionReason && (
          <p className="text-[10px] text-rose-700 font-medium">{docState.rejectionReason}</p>
        )}
      </div>

      <FileUpload inputRef={fileInputRef} accept={CHECKLIST_FILE_ACCEPT} onFileSelect={onUpload} />

      <button
        onClick={() => fileInputRef.current?.click()}
        className={`px-2.5 py-1 text-[10px] font-bold rounded-md transition-colors shrink-0 flex items-center gap-1 self-end sm:self-center ${
          isRejected
            ? 'bg-rose-600 hover:bg-rose-700 text-white'
            : docState.uploaded
            ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
        }`}
      >
        {isRejected ? (
          <>
            <Upload size={11} /> Substituir
          </>
        ) : docState.uploaded ? (
          <>
            <Check size={11} strokeWidth={3} /> Anexado
          </>
        ) : (
          <>
            <Upload size={11} /> Anexar
          </>
        )}
      </button>
    </div>
  );
};
