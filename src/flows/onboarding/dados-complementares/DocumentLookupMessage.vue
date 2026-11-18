<script setup lang="ts">
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-vue-next';
import type { DocumentLookupStatus } from '@/types/dadosComplementares';

defineProps<{
  status: DocumentLookupStatus;
  errorMessage: string | null;
  loadingMessage: string;
  successMessage: string;
}>();
</script>

<template>
  <p
    v-if="status === 'loading'"
    class="mt-1.5 flex items-center gap-1.5 text-[11px] font-semibold text-slate-500"
  >
    <Loader2 :size="13" class="animate-spin" /> {{ loadingMessage }}
  </p>
  <p
    v-else-if="status === 'error' && errorMessage"
    role="alert"
    class="mt-1.5 flex items-start gap-1.5 text-[11px] font-semibold text-rose-700"
  >
    <AlertCircle :size="13" class="shrink-0 mt-px" /> {{ errorMessage }}
  </p>
  <p
    v-else-if="status === 'success'"
    class="mt-1.5 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700"
  >
    <CheckCircle2 :size="13" /> {{ successMessage }}
  </p>
</template>
