<script setup lang="ts">
import type { DocumentUploadItem } from '@/types/documentUpload';
import DocumentGroupHeader from './DocumentGroupHeader.vue';
import DocumentUploadRow from './DocumentUploadRow.vue';

defineProps<{
  groupTitle: string;
  groupDocs: DocumentUploadItem[];
  cnpj: string;
  docNumbers: Record<string, string>;
  activeUploadingId: string | null;
}>();

const emit = defineEmits<{
  documentNumberChange: [docId: string, value: string];
  fileUpload: [docId: string, file: File];
  removeFile: [docId: string];
}>();
</script>

<template>
  <div class="border border-slate-200 rounded-2xl p-5 bg-white space-y-4 shadow-sm">
    <!-- Group Header -->
    <DocumentGroupHeader :group-title="groupTitle" :group-docs="groupDocs" :cnpj="cnpj" />

    <!-- Group Items -->
    <div class="space-y-3">
      <DocumentUploadRow
        v-for="doc in groupDocs"
        :key="doc.id"
        :doc="doc"
        :doc-number="docNumbers[doc.id] ?? doc.documentNumber ?? ''"
        :is-uploading="activeUploadingId === doc.id"
        @document-number-change="(value: string) => emit('documentNumberChange', doc.id, value)"
        @file-select="(file: File) => emit('fileUpload', doc.id, file)"
        @remove="emit('removeFile', doc.id)"
      />
    </div>
  </div>
</template>
