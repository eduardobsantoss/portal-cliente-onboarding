import { computed, toValue, type MaybeRefOrGetter } from 'vue';
import { TOTAL_CHECKLIST_TOPICS } from '@/constants/documentChecklist';
import type { PartnerData } from '@/types/documentChecklist';

interface ChecklistProgressInput {
  partners: MaybeRefOrGetter<PartnerData[]>;
  phoneVerified: MaybeRefOrGetter<boolean>;
  facialVerified: MaybeRefOrGetter<boolean>;
}

/** Contadores do quadro societário e total de tópicos concluídos (barra de progresso). */
export function useChecklistProgress(input: ChecklistProgressInput) {
  const partnersValidCount = computed(
    () => toValue(input.partners).filter((p) => p.status === 'validado').length
  );
  const partnersDone = computed(() => {
    const partners = toValue(input.partners);
    return partners.length > 0 && partnersValidCount.value === partners.length;
  });

  // Total de tópicos concluídos (SMS, biometria e quadro societário)
  const completedTopicsCount = computed(
    () => [toValue(input.phoneVerified), toValue(input.facialVerified), partnersDone.value].filter(Boolean).length
  );

  return {
    partnersValidCount,
    partnersDone,
    completedTopicsCount,
    totalTopics: TOTAL_CHECKLIST_TOPICS,
  };
}
