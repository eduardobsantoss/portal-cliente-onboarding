<script setup lang="ts">
import { Info } from 'lucide-vue-next';
import type { AccountType } from '@/types/dadosComplementares';

defineProps<{
  accountType: AccountType;
}>();

const emit = defineEmits<{ select: [type: AccountType] }>();

const OPTIONS: { type: AccountType; label: string }[] = [
  { type: 'pf', label: 'Pessoa Física' },
  { type: 'pj', label: 'Pessoa Jurídica' },
];

/** Seletor discreto de simulação de tipo de conta (PF / PJ) */
</script>

<template>
  <div
    class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-slate-50/80 rounded-xl border border-slate-200/70 text-xs"
  >
    <span class="text-[11px] font-medium text-slate-500 flex items-center gap-1.5">
      <Info :size="14" class="text-slate-400" />
      Simular preenchimento como:
    </span>
    <div class="inline-flex p-1 bg-slate-200/60 rounded-lg self-start sm:self-auto">
      <button
        v-for="{ type, label } in OPTIONS"
        :key="type"
        type="button"
        :class="`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
          accountType === type
            ? 'bg-white text-gci shadow-sm'
            : 'text-slate-500 hover:text-slate-800'
        }`"
        @click="emit('select', type)"
      >
        {{ label }}
      </button>
    </div>
  </div>
</template>
