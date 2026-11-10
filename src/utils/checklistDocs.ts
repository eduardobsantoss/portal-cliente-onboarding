import { REJECTED_COMPANY_DOC_ID, REJECTED_COMPANY_DOC_REASON } from '@/constants/documentChecklist';
import type { DocumentItem } from '@/types/documentChecklist';

/** Marca o documento como anexado/aprovado a partir de um arquivo enviado. */
export function applyDocUpload(doc: DocumentItem, file: File): DocumentItem {
  return {
    ...doc,
    status: 'aprovado',
    rejectionReason: undefined,
    fileName: file.name,
    fileSize: `${(file.size / (1024 * 1024) || 1.5).toFixed(1)} MB`,
    uploadDate: 'Agora mesmo',
  };
}

/** Preenchimento em lote (simulação): aprova o documento mantendo arquivo existente ou gerando um nome. */
export function fillDocForBulk(doc: DocumentItem): DocumentItem {
  return {
    ...doc,
    status: 'aprovado',
    rejectionReason: undefined,
    fileName: doc.fileName || `${doc.title.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 20)}_Assinado.pdf`,
    fileSize: doc.fileSize || '2.4 MB',
    uploadDate: 'Agora mesmo',
  };
}

/** Simulação de ajustes: rejeita o Contrato Social por falta de nitidez. */
export function rejectCompanyContract(doc: DocumentItem): DocumentItem {
  if (doc.id === REJECTED_COMPANY_DOC_ID) {
    return {
      ...doc,
      status: 'rejeitado',
      rejectionReason: REJECTED_COMPANY_DOC_REASON,
    };
  }
  return doc;
}
