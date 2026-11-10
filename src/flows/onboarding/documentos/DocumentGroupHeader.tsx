import React from 'react';
import { Building2, User } from 'lucide-react';
import { DOCUMENT_ENTITY_COMPANY } from '@/constants/requiredDocuments';
import type { DocumentUploadItem } from '@/types/documentUpload';

interface DocumentGroupHeaderProps {
  groupTitle: string;
  groupDocs: DocumentUploadItem[];
  cnpj: string;
}

export const DocumentGroupHeader: React.FC<DocumentGroupHeaderProps> = ({ groupTitle, groupDocs, cnpj }) => {
  const groupUploaded = groupDocs.filter((d) => d.uploaded && !d.isRegularizationNeeded).length;
  const isGroupCompany = groupDocs.some((d) => d.entityType === DOCUMENT_ENTITY_COMPANY);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-gci">
          {isGroupCompany ? <Building2 size={18} /> : <User size={18} />}
        </div>
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900">
              {groupTitle}
            </h3>
            {!isGroupCompany && groupDocs[0]?.cargo && (
              <span className="text-[10px] font-bold text-gci bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full">
                {groupDocs[0].cargo}
              </span>
            )}
          </div>
          <p className="text-[11px] text-slate-500">
            {isGroupCompany
              ? `CNPJ: ${cnpj}`
              : `Cargo: ${groupDocs[0]?.cargo || 'Sócio'} • Documentação de Identificação`}
          </p>
        </div>
      </div>

      <span
        className={`self-start sm:self-auto text-[11px] font-bold px-3 py-1 rounded-full border ${
          groupUploaded === groupDocs.length
            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
            : 'bg-amber-50 text-amber-800 border-amber-200'
        }`}
      >
        {groupUploaded} de {groupDocs.length} enviados
      </span>
    </div>
  );
};
