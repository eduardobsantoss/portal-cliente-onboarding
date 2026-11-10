import { UPLOAD_DATE_NOW_LABEL } from '@/constants/documentUpload';
import {
  MOCK_DEMO_ATTACH_DOCUMENT_NUMBER,
  MOCK_DEMO_ATTACH_FILE_SIZE,
} from '@/mocks/onboardingDocumentFiles';
import type { DocumentUploadItem } from '@/types/documentUpload';
import { formatFileSizeInMb } from '@/utils/fileUpload';

/** Marca o documento como enviado com os metadados do arquivo selecionado. */
export function markDocumentUploaded(
  doc: DocumentUploadItem,
  file: File,
  base64Preview: string
): DocumentUploadItem {
  return {
    ...doc,
    uploaded: true,
    isRegularizationNeeded: false,
    regularizationReason: undefined,
    fileName: file.name,
    fileSize: formatFileSizeInMb(file.size),
    uploadDate: UPLOAD_DATE_NOW_LABEL,
    base64Preview,
  };
}

/** Remove o arquivo anexado do documento. */
export function clearDocumentUpload(doc: DocumentUploadItem): DocumentUploadItem {
  return {
    ...doc,
    uploaded: false,
    isRegularizationNeeded: false,
    regularizationReason: undefined,
    fileName: undefined,
    fileSize: undefined,
    uploadDate: undefined,
    base64Preview: undefined,
  };
}

/** Simula o anexo de um documento (botão "Anexar Todos (Demo)"). */
export function attachDemoFile(doc: DocumentUploadItem): DocumentUploadItem {
  return {
    ...doc,
    uploaded: true,
    isRegularizationNeeded: false,
    regularizationReason: undefined,
    fileName: doc.fileName || `${doc.title.slice(0, 24).replace(/[^a-zA-Z0-9]/g, '_')}_Anexo.pdf`,
    fileSize: doc.fileSize || MOCK_DEMO_ATTACH_FILE_SIZE,
    uploadDate: UPLOAD_DATE_NOW_LABEL,
    documentNumber: doc.documentNumber || (doc.isPersonDoc ? MOCK_DEMO_ATTACH_DOCUMENT_NUMBER : undefined),
  };
}
