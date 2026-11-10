import React from 'react';
import type { DocumentUploadItem } from '@/types/documentUpload';
import { DocumentGroupHeader } from './DocumentGroupHeader';
import { DocumentUploadRow } from './DocumentUploadRow';

interface DocumentGroupCardProps {
  groupTitle: string;
  groupDocs: DocumentUploadItem[];
  cnpj: string;
  docNumbers: Record<string, string>;
  activeUploadingId: string | null;
  onDocumentNumberChange: (docId: string, value: string) => void;
  onFileUpload: (docId: string, file: File) => void;
  onRemoveFile: (docId: string) => void;
}

export const DocumentGroupCard: React.FC<DocumentGroupCardProps> = ({
  groupTitle,
  groupDocs,
  cnpj,
  docNumbers,
  activeUploadingId,
  onDocumentNumberChange,
  onFileUpload,
  onRemoveFile,
}) => {
  return (
    <div className="border border-slate-200 rounded-2xl p-5 bg-white space-y-4 shadow-sm">
      {/* Group Header */}
      <DocumentGroupHeader groupTitle={groupTitle} groupDocs={groupDocs} cnpj={cnpj} />

      {/* Group Items */}
      <div className="space-y-3">
        {groupDocs.map((doc) => (
          <DocumentUploadRow
            key={doc.id}
            doc={doc}
            docNumber={docNumbers[doc.id] ?? doc.documentNumber ?? ''}
            isUploading={activeUploadingId === doc.id}
            onDocumentNumberChange={(value) => onDocumentNumberChange(doc.id, value)}
            onFileSelect={(file) => onFileUpload(doc.id, file)}
            onRemove={() => onRemoveFile(doc.id)}
          />
        ))}
      </div>
    </div>
  );
};
