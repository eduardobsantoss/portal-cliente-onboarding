<script setup lang="ts">
import { CheckCircle2 } from 'lucide-vue-next';
import type { DocumentUploadItem } from '@/types/documentUpload';
import DocumentNumberField from './DocumentNumberField.vue';
import DocumentTitleRow from './DocumentTitleRow.vue';
import DocumentUploadActions from './DocumentUploadActions.vue';

defineProps<{
  doc: DocumentUploadItem;
  docNumber: string;
  isUploading: boolean;
}>();

const emit = defineEmits<{
  documentNumberChange: [value: string];
  fileSelect: [file: File];
  remove: [];
}>();
</script>

<template>
  <div
    :class="[
      'p-4 rounded-xl border transition-all',
      doc.isRegularizationNeeded
        ? 'bg-amber-50/40 border-amber-300'
        : doc.uploaded
          ? 'bg-slate-50/50 border-slate-200/90'
          : 'bg-white border-dashed border-slate-300 hover:border-gci/50',
    ]"
  >
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div class="space-y-1 flex-1 min-w-0">
        <DocumentTitleRow :doc="doc" />

        <p class="text-[11px] text-slate-500 leading-relaxed">
          {{ doc.description }}
        </p>

        <!-- Campo para digitar o documento -->
        <DocumentNumberField
          v-if="doc.isPersonDoc"
          :value="docNumber"
          @change="emit('documentNumberChange', $event)"
        />

        <!-- Regularization Note -->
        <div
          v-if="doc.isRegularizationNeeded && doc.regularizationReason"
          class="mt-2 p-2.5 bg-amber-100/70 border border-amber-300 rounded-lg text-amber-900 text-xs font-medium"
        >
          <strong>Motivo:</strong> {{ doc.regularizationReason }}
        </div>

        <!-- Uploaded metadata -->
        <div
          v-if="doc.uploaded && !doc.isRegularizationNeeded"
          class="flex items-center gap-2 pt-1 text-[11px] font-medium text-emerald-800"
        >
          <CheckCircle2 :size="14" class="text-emerald-600 shrink-0" />
          <span class="truncate font-semibold">{{ doc.fileName }}</span>
          <span class="text-slate-400">• {{ doc.fileSize }}</span>
        </div>
      </div>

      <!-- Upload Action / State -->
      <DocumentUploadActions
        :doc="doc"
        :is-uploading="isUploading"
        @file-select="emit('fileSelect', $event)"
        @remove="emit('remove')"
      />
    </div>
  </div>
</template>
