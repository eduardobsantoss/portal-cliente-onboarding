<script setup lang="ts">
import { computed, ref } from 'vue';
import { AlertCircle } from 'lucide-vue-next';
import FileUpload from '@/components/ui/FileUpload.vue';
import { CHECKLIST_FILE_ACCEPT } from '@/constants/documentChecklist';
import type { CompanyTier, DocumentItem } from '@/types/documentChecklist';
import DocumentRowActions from './DocumentRowActions.vue';
import DocumentRowStatusChips from './DocumentRowStatusChips.vue';

const props = defineProps<{
  doc: DocumentItem;
  companyTier: CompanyTier;
}>();

const emit = defineEmits<{
  upload: [file: File];
  preview: [];
}>();

const fileUpload = ref<InstanceType<typeof FileUpload> | null>(null);
const isUploaded = computed(() => props.doc.status === 'aprovado' || props.doc.status === 'em_analise');
const isRejected = computed(() => props.doc.status === 'rejeitado');
const isOptional = computed(() => Boolean(props.doc.optionalFor?.includes(props.companyTier)));

/** Linha de um documento oficial da empresa (título, status, motivo de rejeição e ações de anexo). */
</script>

<template>
  <div
    :class="`p-3.5 bg-white rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
      isRejected ? 'border-rose-200 bg-rose-50/20' : 'border-slate-200/80'
    }`"
  >
    <div class="space-y-1 flex-1 min-w-0">
      <div class="flex items-center gap-2 flex-wrap">
        <p :class="`text-xs font-bold truncate ${isRejected ? 'text-rose-950' : 'text-slate-800'}`">{{ doc.title }}</p>

        <DocumentRowStatusChips :status="doc.status" :is-optional="isOptional" />
      </div>
      <p :class="`text-[11px] leading-tight ${isOptional ? 'text-amber-800 font-medium' : 'text-slate-400'}`">
        {{ isOptional && doc.optionalNote ? doc.optionalNote : doc.description }}
      </p>

      <div
        v-if="isRejected && doc.rejectionReason"
        class="mt-1.5 flex items-start gap-1.5 p-2 bg-rose-50/90 border border-rose-200/80 rounded-lg text-rose-800 text-[11px]"
      >
        <AlertCircle :size="13" class="shrink-0 mt-0.5 text-rose-600" />
        <span><strong>Motivo:</strong> {{ doc.rejectionReason }}</span>
      </div>

      <p v-if="doc.fileName && !isRejected" class="text-[10px] text-slate-500 pt-0.5">
        {{ doc.fileName }} • {{ doc.fileSize }}
      </p>
    </div>

    <div class="flex items-center gap-2 shrink-0 self-end sm:self-center">
      <FileUpload ref="fileUpload" :accept="CHECKLIST_FILE_ACCEPT" @file-select="(file) => emit('upload', file)" />

      <DocumentRowActions
        :is-rejected="isRejected"
        :is-uploaded="isUploaded"
        :is-optional="isOptional"
        @pick="fileUpload?.click()"
        @preview="emit('preview')"
      />
    </div>
  </div>
</template>
