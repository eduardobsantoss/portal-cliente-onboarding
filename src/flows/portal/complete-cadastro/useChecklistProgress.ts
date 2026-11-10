import { TOTAL_CHECKLIST_TOPICS } from '@/constants/documentChecklist';
import type { CompanyTier, DocumentItem, PartnerData } from '@/types/documentChecklist';
import { getSectionStats } from '@/utils/checklistProgress';

interface ChecklistProgressInput {
  companyTier: CompanyTier;
  pjDocs: DocumentItem[];
  finDocs: DocumentItem[];
  credDocs: DocumentItem[];
  partners: PartnerData[];
  phoneVerified: boolean;
  facialVerified: boolean;
}

/** Contadores por seção e total de tópicos concluídos (barra de progresso). */
export function useChecklistProgress({
  companyTier,
  pjDocs,
  finDocs,
  credDocs,
  partners,
  phoneVerified,
  facialVerified,
}: ChecklistProgressInput) {
  const pjStats = getSectionStats(pjDocs, companyTier);
  const finStats = getSectionStats(finDocs, companyTier);
  const credStats = getSectionStats(credDocs, companyTier);
  const partnersValidCount = partners.filter((p) => p.status === 'validado').length;
  const partnersDone = partners.length > 0 && partnersValidCount === partners.length;

  // Global completed count (6 topics)
  const completedTopicsCount = [
    phoneVerified,
    facialVerified,
    pjStats.isDone,
    finStats.isDone,
    credStats.isDone,
    partnersDone,
  ].filter(Boolean).length;

  return {
    pjStats,
    finStats,
    credStats,
    partnersValidCount,
    partnersDone,
    completedTopicsCount,
    totalTopics: TOTAL_CHECKLIST_TOPICS,
  };
}
