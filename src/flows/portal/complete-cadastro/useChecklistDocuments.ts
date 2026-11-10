import { useState } from 'react';
import { OFFICIAL_DOCS } from '@/constants/checklistDocuments';
import type { CompanyTier, DocumentItem } from '@/types/documentChecklist';
import { applyDocUpload } from '@/utils/checklistDocs';
import { filterDocsByCategory, filterDocsByTier } from '@/utils/checklistProgress';

/** Documentos oficiais da empresa (seções 3, 4 e 5) filtrados pelo segmento ativo + upload individual. */
export function useChecklistDocuments() {
  // Segment Tier (Discreet toggle)
  const [companyTier, setCompanyTier] = useState<CompanyTier>('middle_corporate');
  const [docs, setDocs] = useState<DocumentItem[]>(OFFICIAL_DOCS);

  // Filter docs for active tier
  const activeDocs = filterDocsByTier(docs, companyTier);
  const pjDocs = filterDocsByCategory(activeDocs, 'pj');
  const finDocs = filterDocsByCategory(activeDocs, 'financeiro');
  const credDocs = filterDocsByCategory(activeDocs, 'credito');

  // Single file upload handler
  const handleFileUpload = (docId: string, file: File) => {
    setDocs((current) => current.map((doc) => (doc.id === docId ? applyDocUpload(doc, file) : doc)));
  };

  return { companyTier, setCompanyTier, docs, setDocs, pjDocs, finDocs, credDocs, handleFileUpload };
}
