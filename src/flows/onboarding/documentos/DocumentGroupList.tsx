import React from 'react';
import type { DocumentUploadItem } from '@/types/documentUpload';
import { DocumentGroupCard } from './DocumentGroupCard';

interface DocumentGroupListProps {
  entityGroups: string[];
  documentList: DocumentUploadItem[];
  cnpj: string;
  docNumbers: Record<string, string>;
  activeUploadingId: string | null;
  onDocumentNumberChange: (docId: string, value: string) => void;
  onFileUpload: (docId: string, file: File) => void;
  onRemoveFile: (docId: string) => void;
}

/** Um cartão por pessoa/empresa (documentos agrupados por `targetPersonOrEntity`). */
export const DocumentGroupList: React.FC<DocumentGroupListProps> = ({
  entityGroups,
  documentList,
  cnpj,
  docNumbers,
  activeUploadingId,
  onDocumentNumberChange,
  onFileUpload,
  onRemoveFile,
}) => {
  return (
    <div className="space-y-6">
      {entityGroups.map((groupTitle) => (
        <DocumentGroupCard
          key={groupTitle}
          groupTitle={groupTitle}
          groupDocs={documentList.filter((d) => d.targetPersonOrEntity === groupTitle)}
          cnpj={cnpj}
          docNumbers={docNumbers}
          activeUploadingId={activeUploadingId}
          onDocumentNumberChange={onDocumentNumberChange}
          onFileUpload={onFileUpload}
          onRemoveFile={onRemoveFile}
        />
      ))}
    </div>
  );
};
