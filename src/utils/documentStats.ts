import type { DocumentUploadItem } from '@/types/documentUpload';

export interface DocumentStats {
  totalMandatory: number;
  uploadedMandatory: number;
  isAllMandatoryUploaded: boolean;
  hasPendingRegularization: boolean;
  missingMandatoryDocs: DocumentUploadItem[];
  entityGroups: string[];
}

/** Totais de documentos obrigatórios, pendências e grupos (pessoa/empresa) para renderização. */
export function getDocumentStats(documentList: DocumentUploadItem[]): DocumentStats {
  const totalMandatory = documentList.filter((d) => d.isRequired).length;
  const uploadedMandatory = documentList.filter(
    (d) => d.isRequired && d.uploaded && !d.isRegularizationNeeded
  ).length;

  return {
    totalMandatory,
    uploadedMandatory,
    isAllMandatoryUploaded: uploadedMandatory === totalMandatory,
    hasPendingRegularization: documentList.some((d) => d.isRegularizationNeeded),
    missingMandatoryDocs: documentList.filter(
      (d) => d.isRequired && (!d.uploaded || d.isRegularizationNeeded)
    ),
    entityGroups: Array.from(new Set(documentList.map((d) => d.targetPersonOrEntity))),
  };
}
