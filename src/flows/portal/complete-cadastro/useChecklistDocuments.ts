import { computed, ref } from 'vue';
import { OFFICIAL_DOCS } from '@/constants/checklistDocuments';
import type { CompanyTier, DocumentItem } from '@/types/documentChecklist';
import { applyDocUpload } from '@/utils/checklistDocs';
import { filterDocsByCategory, filterDocsByTier } from '@/utils/checklistProgress';

/** Documentos oficiais da empresa (seções 3, 4 e 5) filtrados pelo segmento ativo + upload individual. */
export function useChecklistDocuments() {
  // Segment Tier (Discreet toggle)
  const companyTier = ref<CompanyTier>('middle_corporate');
  const docs = ref<DocumentItem[]>(OFFICIAL_DOCS);

  const setCompanyTier = (tier: CompanyTier) => {
    companyTier.value = tier;
  };

  /** Equivalente ao setState do React: aceita o novo valor ou uma função atualizadora. */
  const setDocs = (next: DocumentItem[] | ((current: DocumentItem[]) => DocumentItem[])) => {
    docs.value = typeof next === 'function' ? next(docs.value) : next;
  };

  // Filter docs for active tier
  const activeDocs = computed(() => filterDocsByTier(docs.value, companyTier.value));
  const pjDocs = computed(() => filterDocsByCategory(activeDocs.value, 'pj'));
  const finDocs = computed(() => filterDocsByCategory(activeDocs.value, 'financeiro'));
  const credDocs = computed(() => filterDocsByCategory(activeDocs.value, 'credito'));

  // Single file upload handler
  const handleFileUpload = (docId: string, file: File) => {
    setDocs((current) => current.map((doc) => (doc.id === docId ? applyDocUpload(doc, file) : doc)));
  };

  return { companyTier, setCompanyTier, docs, setDocs, pjDocs, finDocs, credDocs, handleFileUpload };
}
