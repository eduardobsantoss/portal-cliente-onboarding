<script setup lang="ts">
import { AlertCircle } from 'lucide-vue-next';
import type { OperationRejectedTitle } from '@/types/operationRequest';

defineProps<{
  titles: OperationRejectedTitle[];
}>();
</script>

<template>
  <div class="pt-2">
    <p class="text-[10px] font-black text-red-500 uppercase tracking-widest mb-4 flex items-center gap-2">
      <AlertCircle :size="14" />
      Detalhes dos Títulos Rejeitados (2)
    </p>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div v-for="title in titles" :key="title.invoice" class="p-4 bg-red-50/50 rounded-2xl border border-red-100 flex flex-col gap-1">
        <span class="text-[10px] font-black text-red-700 uppercase tracking-tighter">{{ title.reason }}</span>
        <div class="flex items-center justify-between">
          <span class="text-[11px] font-bold text-red-900/60">{{ title.invoice }}</span>
          <span class="text-[11px] font-black text-red-700">{{ title.value }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
