<script setup lang="ts">
import { Building2 } from 'lucide-vue-next';
import { COMPANY_DOCS_TOPIC_TEXT } from '@/constants/checklistTopics';
import type { PreviewDoc } from '@/types/documentChecklist';
import DocumentSectionTopic from '../comum/DocumentSectionTopic.vue';
import type { DocumentSectionProps } from '../comum/documentSection';

const props = defineProps<DocumentSectionProps>();

const emit = defineEmits<{
  toggle: [];
  upload: [docId: string, file: File];
  preview: [doc: PreviewDoc];
}>();

/** Seção 3: Documentos Cadastrais da Empresa. */
</script>

<template>
  <DocumentSectionTopic
    v-bind="props"
    :title="COMPANY_DOCS_TOPIC_TEXT.title"
    :subtitle="COMPANY_DOCS_TOPIC_TEXT.subtitle"
    @toggle="emit('toggle')"
    @upload="(docId, file) => emit('upload', docId, file)"
    @preview="(doc) => emit('preview', doc)"
  >
    <template #icon><Building2 :size="18" /></template>
  </DocumentSectionTopic>
</template>
