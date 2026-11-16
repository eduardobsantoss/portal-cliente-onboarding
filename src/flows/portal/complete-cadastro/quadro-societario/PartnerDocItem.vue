<script setup lang="ts">
import { computed, ref } from 'vue';
import { Check, Eye, Upload } from 'lucide-vue-next';
import FileUpload from '@/components/ui/FileUpload.vue';
import { CHECKLIST_FILE_ACCEPT } from '@/constants/documentChecklist';
import type { PartnerDocState } from '@/types/documentChecklist';

const props = defineProps<{
  label: string;
  docState: PartnerDocState;
  note?: string;
}>();

const emit = defineEmits<{
  upload: [file: File];
  preview: [];
}>();

const fileUpload = ref<InstanceType<typeof FileUpload> | null>(null);
const isRejected = computed(() => props.docState.status === 'rejeitado');

/** Linha de documento de uma parte relacionada (identidade, residência, IRPF, contrato social etc.). */
</script>

<template>
  <div
    :class="`p-3 bg-white rounded-lg border flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
      isRejected ? 'border-rose-200 bg-rose-50/30' : 'border-slate-200/80'
    }`"
  >
    <div class="min-w-0 flex-1 space-y-0.5">
      <div class="flex items-center gap-2">
        <p :class="`text-[11px] font-bold truncate ${isRejected ? 'text-rose-950' : 'text-slate-700'}`">{{ label }}</p>
        <span
          v-if="isRejected"
          class="text-[9px] font-bold text-rose-700 bg-rose-100 px-1.5 py-0.2 rounded-full shrink-0"
        >
          Ajuste necessário
        </span>
      </div>
      <p v-if="note" class="text-[10px] text-slate-400">{{ note }}</p>
      <button
        v-if="docState.uploaded && docState.fileName && !isRejected"
        type="button"
        class="text-[10px] text-emerald-600 hover:text-emerald-700 font-medium truncate flex items-center gap-1 hover:underline text-left"
        @click="emit('preview')"
      >
        <Eye :size="10" class="shrink-0" />
        <span class="truncate">{{ docState.fileName }}</span>
      </button>
      <p v-if="isRejected && docState.rejectionReason" class="text-[10px] text-rose-700 font-medium">
        {{ docState.rejectionReason }}
      </p>
    </div>

    <FileUpload ref="fileUpload" :accept="CHECKLIST_FILE_ACCEPT" @file-select="(file) => emit('upload', file)" />

    <button
      :class="`px-2.5 py-1 text-[10px] font-bold rounded-md transition-colors shrink-0 flex items-center gap-1 self-end sm:self-center ${
        isRejected
          ? 'bg-rose-600 hover:bg-rose-700 text-white'
          : docState.uploaded
          ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
      }`"
      @click="fileUpload?.click()"
    >
      <template v-if="isRejected">
        <Upload :size="11" /> Substituir
      </template>
      <template v-else-if="docState.uploaded">
        <Check :size="11" :stroke-width="3" /> Anexado
      </template>
      <template v-else>
        <Upload :size="11" /> Anexar
      </template>
    </button>
  </div>
</template>
