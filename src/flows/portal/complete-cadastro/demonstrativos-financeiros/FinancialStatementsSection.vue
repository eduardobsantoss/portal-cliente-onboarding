<script setup lang="ts">
import { FileText } from 'lucide-vue-next';
import { FINANCIAL_TOPIC_TITLE, getFinancialTopicSubtitle } from '@/constants/checklistTopics';
import type { PreviewDoc } from '@/types/documentChecklist';
import DocumentSectionTopic from '../comum/DocumentSectionTopic.vue';
import type { DocumentSectionProps } from '../comum/documentSection';

const props = defineProps<DocumentSectionProps>();

const emit = defineEmits<{
  toggle: [];
  upload: [docId: string, file: File];
  preview: [doc: PreviewDoc];
}>();

/** Seção 4: Demonstrativos Financeiros & Contábeis (balanço não obrigatório para Simples Nacional). */
</script>

<template>
  <DocumentSectionTopic
    v-bind="props"
    :title="FINANCIAL_TOPIC_TITLE"
    :subtitle="getFinancialTopicSubtitle(props.companyTier)"
    @toggle="emit('toggle')"
    @upload="(docId, file) => emit('upload', docId, file)"
    @preview="(doc) => emit('preview', doc)"
  >
    <template #icon><FileText :size="18" /></template>
  </DocumentSectionTopic>
</template>
