<script setup lang="ts">
import { HelpCircle } from 'lucide-vue-next';
import type { CompanyTier } from '@/types/documentChecklist';
import TierToggle from './TierToggle.vue';

defineProps<{
  companyTier: CompanyTier;
}>();

const emit = defineEmits<{
  tierChange: [tier: CompanyTier];
  help: [];
}>();

/** Barra superior do checklist: alternador de segmento + botão "Ajuda". */
</script>

<template>
  <div class="flex items-center justify-end gap-3 pb-1">
    <!-- Discreet segment toggle for internal presentation -->
    <TierToggle :value="companyTier" @change="(tier) => emit('tierChange', tier)" />

    <!-- Help / FAQ -->
    <button
      class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-gci hover:bg-slate-100 transition-colors border border-slate-200 bg-white"
      title="Dúvidas e Suporte"
      @click="emit('help')"
    >
      <HelpCircle :size="16" />
      <span>Ajuda</span>
    </button>
  </div>
</template>
