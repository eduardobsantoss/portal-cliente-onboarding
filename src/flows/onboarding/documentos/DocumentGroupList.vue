<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { DocumentUploadItem } from '@/types/documentUpload';
import DocumentGroupCard from './DocumentGroupCard.vue';

// Um cartão por pessoa/empresa (documentos agrupados por `targetPersonOrEntity`), expansível como os tópicos do "Compl. Cadastro".
const props = defineProps<{
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

const openGroups = ref<string[]>([]);
let initialized = false;

// Grupos com documento recusado (ajuste de documentação) abrem sozinhos, para o usuário ver o que corrigir.
const groupsNeedingFix = computed(() =>
  props.entityGroups.filter((group) =>
    props.documentList.some((d) => d.targetPersonOrEntity === group && d.isRegularizationNeeded),
  ),
);

// Abertura inicial: o primeiro grupo (a empresa) e, se houver, os que precisam de correção.
const openInitialGroups = () => {
  if (initialized || props.entityGroups.length === 0) return;
  initialized = true;
  const first = props.entityGroups[0];
  openGroups.value = [...new Set([first, ...groupsNeedingFix.value])];
};
openInitialGroups();
watch(() => props.entityGroups, openInitialGroups);

watch(groupsNeedingFix, (groups) => {
  const toOpen = groups.filter((g) => !openGroups.value.includes(g));
  if (toOpen.length) openGroups.value = [...openGroups.value, ...toOpen];
});

const toggleGroup = (group: string) => {
  openGroups.value = openGroups.value.includes(group)
    ? openGroups.value.filter((g) => g !== group)
    : [...openGroups.value, group];
};
</script>

<template>
  <div class="space-y-3">
    <DocumentGroupCard
      v-for="groupTitle in entityGroups"
      :key="groupTitle"
      :group-title="groupTitle"
      :group-docs="documentList.filter((d) => d.targetPersonOrEntity === groupTitle)"
      :cnpj="cnpj"
      :doc-numbers="docNumbers"
      :active-uploading-id="activeUploadingId"
      :is-open="openGroups.includes(groupTitle)"
      @toggle="toggleGroup(groupTitle)"
      @document-number-change="(docId: string, value: string) => emit('documentNumberChange', docId, value)"
      @file-upload="(docId: string, file: File) => emit('fileUpload', docId, file)"
      @remove-file="(docId: string) => emit('removeFile', docId)"
    />
  </div>
</template>
