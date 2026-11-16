<script setup lang="ts">
import { ChevronRight, FileText } from 'lucide-vue-next';
import type { PortalOperation } from '@/types/portalOperation';
import RecentOperationCard from './RecentOperationCard.vue';

defineProps<{
  operations: PortalOperation[];
}>();

const emit = defineEmits<{
  viewAll: [];
  openOperation: [op: PortalOperation];
}>();
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6 ml-1">
      <h4 class="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Operações Recentes</h4>
      <button
        @click="emit('viewAll')"
        class="text-[10px] font-black text-gci hover:text-agro-orange uppercase tracking-widest transition-colors flex items-center gap-1"
      >
        Ver Tudo
        <ChevronRight :size="14" />
      </button>
    </div>
    <div v-if="operations.length > 0" class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <RecentOperationCard
        v-for="op in operations.slice(0, 3)"
        :key="op.id"
        :op="op"
        @open="emit('openOperation', $event)"
      />
    </div>
    <div v-else class="bg-white rounded-[24px] border border-slate-100 p-8 text-center text-slate-400 shadow-sm">
      <div class="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 mx-auto mb-3">
        <FileText :size="24" />
      </div>
      <p class="text-sm font-bold text-slate-700">Nenhuma operação realizada</p>
      <p class="text-xs text-slate-400 mt-1 max-w-sm mx-auto">Suas solicitações de antecipação e desconto de duplicata aparecerão aqui.</p>
    </div>
  </div>
</template>
