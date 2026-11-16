<script setup lang="ts">
import { Trash2, Upload } from 'lucide-vue-next';
import FileUpload from '@/components/ui/FileUpload.vue';
import FileUploadTrigger from '@/components/ui/FileUploadTrigger.vue';
import { UPLOAD_ACCEPT_ATTRIBUTE } from '@/constants/documentUpload';
import type { DocumentUploadItem } from '@/types/documentUpload';

defineProps<{
  doc: DocumentUploadItem;
  isUploading: boolean;
}>();

const emit = defineEmits<{
  fileSelect: [file: File];
  remove: [];
}>();
</script>

<template>
  <div class="flex items-center gap-2 shrink-0 self-end sm:self-center">
    <div
      v-if="isUploading"
      class="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-lg text-xs text-gci font-semibold"
    >
      <div class="w-3.5 h-3.5 border-2 border-gci border-t-transparent rounded-full animate-spin" />
      <span>Enviando...</span>
    </div>
    <FileUploadTrigger
      v-else-if="doc.isRegularizationNeeded"
      :input-id="`file-input-${doc.id}`"
      class-name="cursor-pointer flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm"
    >
      <Upload :size="14" />
      <span>Substituir Arquivo</span>
    </FileUploadTrigger>
    <div v-else-if="doc.uploaded" class="flex items-center gap-2">
      <FileUploadTrigger
        :input-id="`file-input-${doc.id}`"
        class-name="cursor-pointer text-xs font-semibold text-slate-600 hover:text-gci px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors"
      >
        Substituir
      </FileUploadTrigger>
      <button
        type="button"
        class="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        title="Remover anexo"
        @click="emit('remove')"
      >
        <Trash2 :size="15" />
      </button>
    </div>
    <FileUploadTrigger
      v-else
      :input-id="`file-input-${doc.id}`"
      class-name="cursor-pointer flex items-center gap-1.5 px-4 py-2 bg-gci hover:bg-gci-hover text-white text-xs font-bold rounded-xl transition-all shadow-sm hover:shadow"
    >
      <Upload :size="14" />
      <span>Anexar Arquivo</span>
    </FileUploadTrigger>

    <FileUpload
      :id="`file-input-${doc.id}`"
      :accept="UPLOAD_ACCEPT_ATTRIBUTE"
      @file-select="emit('fileSelect', $event)"
    />
  </div>
</template>
