import {
  MARRIAGE_CERTIFICATE_DOC_DESCRIPTION,
  MARRIAGE_CERTIFICATE_DOC_TYPE,
  MARRIED_STATUSES,
  STABLE_UNION_DOC_DESCRIPTION,
  STABLE_UNION_DOC_TYPE,
  STABLE_UNION_STATUSES,
} from '@/constants/requiredDocuments';
import type { DocumentUploadItem } from '@/types/documentUpload';

interface CivilStatusDocumentContext {
  id: string;
  targetPersonOrEntity: string;
  cargo: string;
  entityType: string;
}

/**
 * Documento condicional de estado civil: Casado -> Certidão de Casamento;
 * União Estável -> Contrato ou Escritura de União Estável; demais -> nenhum.
 */
export function buildCivilStatusDocument(
  estadoCivil: string,
  context: CivilStatusDocumentContext
): DocumentUploadItem | null {
  if (MARRIED_STATUSES.includes(estadoCivil)) {
    return {
      ...context,
      documentType: MARRIAGE_CERTIFICATE_DOC_TYPE,
      title: MARRIAGE_CERTIFICATE_DOC_TYPE,
      description: MARRIAGE_CERTIFICATE_DOC_DESCRIPTION,
      isRequired: true,
      uploaded: false,
      isPersonDoc: false,
    };
  }

  if (STABLE_UNION_STATUSES.includes(estadoCivil)) {
    return {
      ...context,
      documentType: STABLE_UNION_DOC_TYPE,
      title: STABLE_UNION_DOC_TYPE,
      description: STABLE_UNION_DOC_DESCRIPTION,
      isRequired: true,
      uploaded: false,
      isPersonDoc: false,
    };
  }

  return null;
}
