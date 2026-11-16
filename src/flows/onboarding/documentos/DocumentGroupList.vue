<script setup lang="ts">
import type { DocumentUploadItem } from '@/types/documentUpload';
import DocumentGroupCard from './DocumentGroupCard.vue';

// Um cartão por pessoa/empresa (documentos agrupados por `targetPersonOrEntity`).
defineProps<{
  entityGroups: string[];
  documentList: DocumentUploadItem[];
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
  <div class="space-y-6">
    <DocumentGroupCard
      v-for="groupTitle in entityGroups"
      :key="groupTitle"
      :group-title="groupTitle"
      :group-docs="documentList.filter((d) => d.targetPersonOrEntity === groupTitle)"
      :cnpj="cnpj"
      :doc-numbers="docNumbers"
      :active-uploading-id="activeUploadingId"
      @document-number-change="(docId: string, value: string) => emit('documentNumberChange', docId, value)"
      @file-upload="(docId: string, file: File) => emit('fileUpload', docId, file)"
      @remove-file="(docId: string) => emit('removeFile', docId)"
    />
  </div>
</template>
