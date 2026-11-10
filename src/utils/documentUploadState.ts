import { UPLOAD_DATE_NOW_LABEL } from '@/constants/documentUpload';
import { CONTRACT_DOC_ID } from '@/constants/requiredDocuments';
import {
  MOCK_DEMO_ATTACH_DOCUMENT_NUMBER,
  MOCK_DEMO_ATTACH_FILE_SIZE,
} from '@/mocks/onboardingDocumentFiles';
import type { DocumentUploadItem } from '@/types/documentUpload';
import { formatFileSizeInMb } from '@/utils/fileUpload';

const CONTRACT_ILLEGIBLE_REASON =
  'Imagem ilegível. Envie uma versão nítida do contrato social.';
const IDENTITY_EXPIRED_REASON =
  'Documento vencido. Envie uma identificação dentro da validade.';
const MARRIAGE_INCOMPLETE_REASON =
  'Arquivo incompleto. A certidão de casamento precisa ser reenviada.';

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

/**
 * Simula o retorno da análise: anexa tudo e pede ajuste do contrato social
 * e de documentos de um sócio (identidade e certidão, quando existirem).
 */
export function applyDocumentAdjustment(docs: DocumentUploadItem[]): DocumentUploadItem[] {
  const attached = docs.map(attachDemoFile);
  const reasons = new Map<string, string>();

  const contract = attached.find((doc) => doc.id === CONTRACT_DOC_ID);
  if (contract) reasons.set(contract.id, CONTRACT_ILLEGIBLE_REASON);

  const partnerIdentity = attached.find(
    (doc) =>
      doc.id === 'socio-id-2' || (doc.isPersonDoc && doc.targetPersonOrEntity === 'Marcos Damasceno')
  );
  if (partnerIdentity) reasons.set(partnerIdentity.id, IDENTITY_EXPIRED_REASON);

  const marriageCertificate = attached.find((doc) => doc.id === 'socio-civil-2');
  if (marriageCertificate) reasons.set(marriageCertificate.id, MARRIAGE_INCOMPLETE_REASON);

  if (reasons.size < 2) {
    for (const doc of attached) {
      if (reasons.size >= 3) break;
      if (!reasons.has(doc.id) && doc.isRequired) {
        reasons.set(doc.id, IDENTITY_EXPIRED_REASON);
      }
    }
  }

  return attached.map((doc) =>
    reasons.has(doc.id)
      ? {
          ...doc,
          isRegularizationNeeded: true,
          regularizationReason: reasons.get(doc.id),
        }
      : doc
  );
}
