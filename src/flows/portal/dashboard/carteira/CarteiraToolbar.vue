<script setup lang="ts">
import { motion } from 'motion-v';
import { Download, Filter, Zap } from 'lucide-vue-next';
import StatusFilterTabs from '@/components/ui/StatusFilterTabs.vue';
import { CARTEIRA_STATUS_TABS } from '@/constants/dashboardTabs';

defineProps<{
  selectedCount: number;
}>();

const emit = defineEmits<{
  openConfirmacao: [];
  openFilter: [];
}>();
</script>

<template>
  <div class="p-4 md:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <StatusFilterTabs
      :labels="CARTEIRA_STATUS_TABS"
      container-class-name="flex gap-1.5 p-1 bg-slate-50 rounded-xl w-fit"
      active-class-name="bg-white text-gci px-4 py-2 rounded-lg text-xs font-bold shadow-sm"
      inactive-class-name="text-slate-500 px-4 py-2 rounded-lg text-xs font-bold hover:bg-slate-100 transition-colors"
    />
    <div class="flex gap-2">
      <motion.button
        v-if="selectedCount > 0"
        :initial="{ opacity: 0, x: 10 }"
        :animate="{ opacity: 1, x: 0 }"
        class="flex items-center justify-center gap-2 bg-agro-orange text-white px-6 py-2 rounded-xl text-xs font-bold hover:bg-agro-orange/90 transition-all shadow-lg shadow-agro-orange/20"
        @click="emit('openConfirmacao')"
      >
        <Zap :size="14" fill="currentColor" />
        Atualizar Confirmação ({{ selectedCount }})
      </motion.button>
      <button
        class="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-slate-50 text-gci px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-100 transition-all border border-slate-100"
        @click="emit('openFilter')"
      >
        <Filter :size="14" />
        Filtros
      </button>
      <button class="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gci text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-gci-hover transition-all">
        <Download :size="14" />
        Exportar
      </button>
    </div>
  </div>
</template>
