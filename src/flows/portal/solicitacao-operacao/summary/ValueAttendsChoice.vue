<script setup lang="ts">
import { cn } from '@/utils/cn';
import type { OperationValueAttends } from '@/types/operationRequest';

defineProps<{
  valueAttends: OperationValueAttends;
}>();

const emit = defineEmits<{
  setValueAttends: [value: OperationValueAttends];
}>();
</script>

<template>
  <div class="flex items-center justify-center gap-4">
    <button
      :class="cn(
        'px-12 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all',
        valueAttends === 'NAO'
          ? 'bg-agro-orange text-white shadow-lg'
          : 'bg-slate-50 text-slate-400 border border-slate-200 hover:bg-slate-100'
      )"
      @click="emit('setValueAttends', 'NAO')"
    >
      Não
    </button>
    <button
      :class="cn(
        'px-12 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all',
        valueAttends === 'SIM'
          ? 'bg-gci text-white shadow-lg'
          : 'bg-slate-50 text-slate-400 border border-slate-200 hover:bg-slate-100'
      )"
      @click="emit('setValueAttends', 'SIM')"
    >
      Sim
    </button>
  </div>
</template>
