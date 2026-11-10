import React from 'react';
import { AlertTriangle } from 'lucide-react';
import type { DocumentUploadItem } from '@/types/documentUpload';

interface DocumentTitleRowProps {
  doc: DocumentUploadItem;
}

export const DocumentTitleRow: React.FC<DocumentTitleRowProps> = ({ doc }) => {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <h4 className="text-xs font-bold text-slate-900">
        {doc.title}
      </h4>
      {doc.cargo && (
        <span className="text-[10px] font-bold text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.2 rounded-full">
          {doc.cargo}
        </span>
      )}
      {doc.isRegularizationNeeded ? (
        <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200 flex items-center gap-1">
          <AlertTriangle size={11} /> Regularização Solicitada
        </span>
      ) : doc.isRequired ? (
        <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.2 rounded-full border border-red-100">
          Obrigatório
        </span>
      ) : (
        <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.2 rounded-full">
          Opcional
        </span>
      )}
    </div>
  );
};
