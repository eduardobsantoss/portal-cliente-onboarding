<script setup lang="ts">
import { TIER_OPTIONS } from '@/constants/checklistTopics';
import type { CompanyTier } from '@/types/documentChecklist';

defineProps<{
  value: CompanyTier;
}>();

const emit = defineEmits<{ change: [tier: CompanyTier] }>();

/** Alternador discreto de segmento (Middle Corporate / Simples-PME) para apresentação interna. */
</script>

<template>
  <div
    class="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/80 text-[11px] font-bold"
    title="Alternar visão para apresentação interna"
  >
    <button
      v-for="{ tier, label } in TIER_OPTIONS"
      :key="tier"
      :class="`px-3 py-1 rounded-lg transition-all ${
        value === tier
          ? 'bg-white text-gci shadow-sm'
          : 'text-slate-500 hover:text-slate-800'
      }`"
      @click="emit('change', tier)"
    >
      {{ label }}
    </button>
  </div>
</template>
