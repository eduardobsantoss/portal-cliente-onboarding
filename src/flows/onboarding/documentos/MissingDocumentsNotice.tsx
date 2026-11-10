import React from 'react';
import { AlertCircle } from 'lucide-react';
import type { DocumentUploadItem } from '@/types/documentUpload';

interface MissingDocumentsNoticeProps {
  missingMandatoryDocs: DocumentUploadItem[];
}

export const MissingDocumentsNotice: React.FC<MissingDocumentsNoticeProps> = ({ missingMandatoryDocs }) => {
  return (
    <div className="p-4 sm:p-5 bg-amber-50 border border-amber-300 rounded-2xl flex items-start gap-3.5 shadow-xs">
      <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
        <AlertCircle size={18} />
      </div>
      <div className="flex-1 min-w-0 space-y-1.5">
        <h4 className="text-xs sm:text-sm font-bold text-amber-950">
          Documentos obrigatórios pendentes de envio ({missingMandatoryDocs.length}):
        </h4>
        <ul className="text-xs text-amber-900 space-y-1 list-disc list-inside">
          {missingMandatoryDocs.map((doc) => (
            <li key={doc.id}>
              <span className="font-semibold">{doc.targetPersonOrEntity}:</span> {doc.title}
            </li>
          ))}
        </ul>
        <p className="text-[11px] text-amber-800 pt-1">
          Anexe os arquivos pendentes acima ou utilize o botão <strong>&quot;Anexar Todos (Demo)&quot;</strong> no topo da página para avançar à Assinatura.
        </p>
      </div>
    </div>
  );
};
