<script setup lang="ts">
import type { OperationXmlFile } from '@/types/operationRequest';
import OperationTimeline from '@/flows/portal/solicitacao-operacao/OperationTimeline.vue';
import XmlDropzone from './XmlDropzone.vue';
import XmlFileList from './XmlFileList.vue';
import XmlUploadIntro from './XmlUploadIntro.vue';

defineProps<{
  files: OperationXmlFile[];
}>();

const emit = defineEmits<{
  fileUpload: [];
}>();
</script>

<template>
  <OperationTimeline step="XML_UPLOAD" />
  <XmlUploadIntro />

  <div class="space-y-6 pt-4">
    <XmlDropzone @file-upload="emit('fileUpload')" />

    <XmlFileList v-if="files.length > 0" :files="files" />
  </div>
</template>
