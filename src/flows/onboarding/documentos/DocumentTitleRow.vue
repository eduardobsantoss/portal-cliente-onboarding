<script setup lang="ts">
import { AlertTriangle } from 'lucide-vue-next';
import type { DocumentUploadItem } from '@/types/documentUpload';

defineProps<{
  doc: DocumentUploadItem;
}>();
</script>

<template>
  <div class="flex items-center gap-2 flex-wrap">
    <h4 class="text-xs font-bold text-slate-900">
      {{ doc.title }}
    </h4>
    <span
      v-if="doc.cargo"
      class="text-[10px] font-bold text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.2 rounded-full"
    >
      {{ doc.cargo }}
    </span>
    <span
      v-if="doc.isRegularizationNeeded"
      class="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200 flex items-center gap-1"
    >
      <AlertTriangle :size="11" /> Regularização Solicitada
    </span>
    <span
      v-else-if="doc.isRequired"
      class="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.2 rounded-full border border-red-100"
    >
      Obrigatório
    </span>
    <span
      v-else
      class="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.2 rounded-full"
    >
      Opcional
    </span>
  </div>
</template>
