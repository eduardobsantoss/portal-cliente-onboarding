<script setup lang="ts">
import { computed } from 'vue';
import { motion, AnimatePresence } from 'motion-v';
import type { DocumentUploadItem } from '@/types/documentUpload';
import DocumentGroupHeader from './DocumentGroupHeader.vue';
import DocumentUploadRow from './DocumentUploadRow.vue';

const props = defineProps<{
  groupTitle: string;
  groupDocs: DocumentUploadItem[];
  cnpj: string;
  docNumbers: Record<string, string>;
  activeUploadingId: string | null;
  isOpen: boolean;
}>();

const emit = defineEmits<{
  toggle: [];
  documentNumberChange: [docId: string, value: string];
  fileUpload: [docId: string, file: File];
  removeFile: [docId: string];
}>();

interface DocumentSection {
  title: string | null;
  docs: DocumentUploadItem[];
}

// Itens consecutivos com o mesmo `section` (ex.: um upload por exercício) ficam sob um título comum.
const sections = computed<DocumentSection[]>(() => {
  const result: DocumentSection[] = [];
  for (const doc of props.groupDocs) {
    const title = doc.section ?? null;
    const last = result[result.length - 1];
    if (last && title !== null && last.title === title) {
      last.docs.push(doc);
    } else {
      result.push({ title, docs: [doc] });
    }
  }
  return result;
});
</script>

<template>
  <div class="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm transition-all hover:border-slate-300">
    <!-- Group Header (clicável: expande/recolhe os uploads do grupo) -->
    <DocumentGroupHeader
      :group-title="groupTitle"
      :group-docs="groupDocs"
      :cnpj="cnpj"
      :is-open="isOpen"
      @toggle="emit('toggle')"
    />

    <!-- Group Items -->
    <AnimatePresence>
      <motion.div
        v-if="isOpen"
        key="content"
        :initial="{ height: 0, opacity: 0 }"
        :animate="{ height: 'auto', opacity: 1 }"
        :exit="{ height: 0, opacity: 0 }"
        class="border-t border-slate-100 p-4 sm:p-5 bg-slate-50/40 space-y-3"
      >
        <div
          v-for="(section, sectionIndex) in sections"
          :key="section.title ?? `plain-${sectionIndex}`"
          :class="
            section.title
              ? 'rounded-xl border border-slate-200 bg-white p-3 sm:p-4 space-y-3'
              : 'space-y-3'
          "
        >
          <div v-if="section.title" class="flex items-center justify-between gap-2">
            <h4 class="text-xs font-bold text-slate-800">{{ section.title }}</h4>
            <span class="text-[11px] font-semibold text-slate-500">
              {{ section.docs.filter((d) => d.uploaded && !d.isRegularizationNeeded).length }} de
              {{ section.docs.length }} enviados
            </span>
          </div>
          <DocumentUploadRow
            v-for="doc in section.docs"
            :key="doc.id"
            :doc="doc"
            :doc-number="docNumbers[doc.id] ?? doc.documentNumber ?? ''"
            :is-uploading="activeUploadingId === doc.id"
            @document-number-change="(value: string) => emit('documentNumberChange', doc.id, value)"
            @file-select="(file: File) => emit('fileUpload', doc.id, file)"
            @remove="emit('removeFile', doc.id)"
          />
        </div>
      </motion.div>
    </AnimatePresence>
  </div>
</template>
