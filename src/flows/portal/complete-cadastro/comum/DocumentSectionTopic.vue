<script setup lang="ts">
import { TOPIC_CONTENT_DOCS_CLASS } from '@/constants/checklistTopics';
import type { PreviewDoc } from '@/types/documentChecklist';
import ChecklistTopic from './ChecklistTopic.vue';
import DocumentRow from './DocumentRow.vue';
import TopicCountBadge from './TopicCountBadge.vue';
import type { DocumentSectionProps } from './documentSection';

defineProps<
  DocumentSectionProps & {
    title: string;
    subtitle: string;
  }
>();

const emit = defineEmits<{
  toggle: [];
  upload: [docId: string, file: File];
  preview: [doc: PreviewDoc];
}>();

/**
 * Tópico do checklist com a lista de documentos de uma categoria e o contador "X de Y enviados".
 * Slot `icon`: ícone do tópico.
 */
</script>

<template>
  <ChecklistTopic
    :is-done="stats.isDone"
    :title="title"
    :subtitle="subtitle"
    :is-open="isOpen"
    :content-class-name="TOPIC_CONTENT_DOCS_CLASS"
    @toggle="emit('toggle')"
  >
    <template #icon><slot name="icon" /></template>
    <template #badge>
      <TopicCountBadge :is-done="stats.isDone">
        {{ stats.approved + stats.inAnalysis }} de {{ stats.total }} enviados
      </TopicCountBadge>
    </template>

    <DocumentRow
      v-for="item in docs"
      :key="item.id"
      :doc="item"
      :company-tier="companyTier"
      @upload="(file) => emit('upload', item.id, file)"
      @preview="item.fileName && emit('preview', { title: item.title, fileName: item.fileName })"
    />
  </ChecklistTopic>
</template>
