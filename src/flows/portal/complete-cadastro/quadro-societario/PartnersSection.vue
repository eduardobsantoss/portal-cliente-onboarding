<script setup lang="ts">
import { Plus, Users } from 'lucide-vue-next';
import { PARTNERS_TOPIC_TEXT, TOPIC_CONTENT_PARTNERS_CLASS } from '@/constants/checklistTopics';
import type { PartnerData, PartnerDocKey, PreviewDoc } from '@/types/documentChecklist';
import ChecklistTopic from '@/flows/portal/complete-cadastro/comum/ChecklistTopic.vue';
import TopicCountBadge from '@/flows/portal/complete-cadastro/comum/TopicCountBadge.vue';
import PartnerAccordionItem from './PartnerAccordionItem.vue';

defineProps<{
  partners: PartnerData[];
  partnersValidCount: number;
  partnersDone: boolean;
  expandedPartnerId: string | null;
  isOpen: boolean;
}>();

const emit = defineEmits<{
  expandedPartnerChange: [partnerId: string | null];
  toggle: [];
  uploadDoc: [partnerId: string, docKey: PartnerDocKey, file: File];
  preview: [doc: PreviewDoc];
  addPartner: [];
}>();

/** Seção 6: Quadro Societário (Partes Relacionadas) — sócios PF/PJ, cônjuges e representantes. */
</script>

<template>
  <ChecklistTopic
    :is-done="partnersDone"
    :title="PARTNERS_TOPIC_TEXT.title"
    :subtitle="PARTNERS_TOPIC_TEXT.subtitle"
    :is-open="isOpen"
    :content-class-name="TOPIC_CONTENT_PARTNERS_CLASS"
    @toggle="emit('toggle')"
  >
    <template #icon><Users :size="18" /></template>
    <template #badge>
      <TopicCountBadge :is-done="partnersDone">
        {{ partnersValidCount }} de {{ partners.length }} partes validadas
      </TopicCountBadge>
    </template>

    <!-- Partners List (Discreet Collapsible for each partner) -->
    <div class="space-y-3">
      <PartnerAccordionItem
        v-for="partner in partners"
        :key="partner.id"
        :partner="partner"
        :is-expanded="expandedPartnerId === partner.id"
        @toggle="emit('expandedPartnerChange', expandedPartnerId === partner.id ? null : partner.id)"
        @upload-doc="(partnerId, docKey, file) => emit('uploadDoc', partnerId, docKey, file)"
        @preview="(doc) => emit('preview', doc)"
      />
    </div>

    <!-- Add Partner Action -->
    <div class="flex justify-end pt-1">
      <button
        class="text-xs font-bold text-gci hover:underline flex items-center gap-1"
        @click="emit('addPartner')"
      >
        <Plus :size="14" />
        Adicionar Parte Relacionada
      </button>
    </div>
  </ChecklistTopic>
</template>
