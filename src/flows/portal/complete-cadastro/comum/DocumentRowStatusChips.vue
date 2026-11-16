<script setup lang="ts">
import { AlertCircle, Check, Clock } from 'lucide-vue-next';
import type { DocumentStatus } from '@/types/documentChecklist';

defineProps<{
  status: DocumentStatus;
  isOptional: boolean;
}>();

/** Selos ao lado do título do documento: "Não obrigatório" e o status (Anexado / Em análise / Ajuste necessário). */
</script>

<template>
  <span
    v-if="isOptional"
    class="text-[10px] font-semibold text-amber-800 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-full shrink-0"
  >
    Não obrigatório
  </span>

  <span
    v-if="status === 'aprovado'"
    class="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.2 rounded-full shrink-0 flex items-center gap-0.5"
  >
    <Check :size="10" :stroke-width="3" /> Anexado
  </span>
  <span
    v-if="status === 'em_analise'"
    class="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.2 rounded-full shrink-0 flex items-center gap-0.5"
  >
    <Clock :size="10" /> Em análise
  </span>
  <span
    v-if="status === 'rejeitado'"
    class="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full shrink-0 flex items-center gap-0.5"
  >
    <AlertCircle :size="10" /> Ajuste necessário
  </span>
</template>
