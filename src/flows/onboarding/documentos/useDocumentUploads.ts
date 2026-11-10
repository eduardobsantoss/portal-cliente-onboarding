import { useEffect, useState } from 'react';
import { UPLOAD_ERROR_DISMISS_MS, UPLOAD_SIMULATED_DELAY_MS } from '@/constants/documentUpload';
import type { DocumentUploadItem } from '@/types/documentUpload';
import {
  attachDemoFile,
  clearDocumentUpload,
  markDocumentUploaded,
} from '@/utils/documentUploadState';
import { readFileAsDataUrl, validateUploadFile } from '@/utils/fileUpload';
import type { RequiredDocumentsInput } from '@/utils/requiredDocuments';

/** Estado da lista de documentos, números digitados, upload em andamento e erro de validação. */
export function useDocumentUploads(
  buildDocuments: () => DocumentUploadItem[],
  input: RequiredDocumentsInput
) {
  const [documentList, setDocumentList] = useState<DocumentUploadItem[]>(buildDocuments);
  const [docNumbers, setDocNumbers] = useState<Record<string, string>>(() => {
    const map: Record<string, string> = {};
    buildDocuments().forEach((d) => {
      if (d.documentNumber) {
        map[d.id] = d.documentNumber;
      }
    });
    return map;
  });
  const [activeUploadingId, setActiveUploadingId] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Synchronize documentList if dependencies update
  useEffect(() => {
    setDocumentList(buildDocuments());
  }, [
    input.accountType,
    input.socios,
    input.nonPartnerRepresentatives,
    input.companyName,
    input.tipoEmpresa,
    input.hasProcurador,
  ]);

  const [hasRegularization, setHasRegularization] = useState(false);

  // File upload handler with 12MB and JPG/JPEG/PNG/PDF base64 validation
  const handleFileUpload = (docId: string, file: File) => {
    const validationError = validateUploadFile(file);
    if (validationError) {
      setUploadError(validationError);
      setTimeout(() => setUploadError(null), UPLOAD_ERROR_DISMISS_MS);
      return;
    }

    setActiveUploadingId(docId);
    setUploadError(null);

    readFileAsDataUrl(file, (base64Data) => {
      setTimeout(() => {
        setDocumentList((prev) =>
          prev.map((doc) => (doc.id === docId ? markDocumentUploaded(doc, file, base64Data) : doc))
        );
        setActiveUploadingId(null);
      }, UPLOAD_SIMULATED_DELAY_MS);
    });
  };

  // Remove uploaded file
  const handleRemoveFile = (docId: string) => {
    setDocumentList((prev) => prev.map((doc) => (doc.id === docId ? clearDocumentUpload(doc) : doc)));
  };

  // Fast-forward demo helper
  const handleAttachAllDemo = () => {
    setDocumentList((prev) => prev.map(attachDemoFile));
    setHasRegularization(false);
  };

  const handleDocumentNumberChange = (docId: string, value: string) => {
    setDocNumbers((prev) => ({ ...prev, [docId]: value }));
    setDocumentList((prev) =>
      prev.map((d) => (d.id === docId ? { ...d, documentNumber: value } : d))
    );
  };

  const dismissUploadError = () => setUploadError(null);

  return {
    documentList,
    docNumbers,
    activeUploadingId,
    uploadError,
    hasRegularization,
    handleFileUpload,
    handleRemoveFile,
    handleAttachAllDemo,
    handleDocumentNumberChange,
    dismissUploadError,
  };
}
