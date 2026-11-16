import { computed, toValue, type MaybeRefOrGetter } from 'vue';
import { TOTAL_CHECKLIST_TOPICS } from '@/constants/documentChecklist';
import type { CompanyTier, DocumentItem, PartnerData } from '@/types/documentChecklist';
import { getSectionStats } from '@/utils/checklistProgress';

interface ChecklistProgressInput {
  companyTier: MaybeRefOrGetter<CompanyTier>;
  pjDocs: MaybeRefOrGetter<DocumentItem[]>;
  finDocs: MaybeRefOrGetter<DocumentItem[]>;
  credDocs: MaybeRefOrGetter<DocumentItem[]>;
  partners: MaybeRefOrGetter<PartnerData[]>;
  phoneVerified: MaybeRefOrGetter<boolean>;
  facialVerified: MaybeRefOrGetter<boolean>;
}

/** Contadores por seção e total de tópicos concluídos (barra de progresso). */
export function useChecklistProgress(input: ChecklistProgressInput) {
  const pjStats = computed(() => getSectionStats(toValue(input.pjDocs), toValue(input.companyTier)));
  const finStats = computed(() => getSectionStats(toValue(input.finDocs), toValue(input.companyTier)));
  const credStats = computed(() => getSectionStats(toValue(input.credDocs), toValue(input.companyTier)));
  const partnersValidCount = computed(
    () => toValue(input.partners).filter((p) => p.status === 'validado').length
  );
  const partnersDone = computed(() => {
    const partners = toValue(input.partners);
    return partners.length > 0 && partnersValidCount.value === partners.length;
  });

  // Global completed count (6 topics)
  const completedTopicsCount = computed(
    () =>
      [
        toValue(input.phoneVerified),
        toValue(input.facialVerified),
        pjStats.value.isDone,
        finStats.value.isDone,
        credStats.value.isDone,
        partnersDone.value,
      ].filter(Boolean).length
  );

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
