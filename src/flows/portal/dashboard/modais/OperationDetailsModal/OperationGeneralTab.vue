<script setup lang="ts">
import { Info } from 'lucide-vue-next';
import type { PortalOperation } from '@/types/portalOperation';
import { buildOperationInfo, buildOperationKpis } from '@/utils/operationDetails';
import InfoSectionCard from '@/flows/portal/dashboard/modais/comum/InfoSectionCard.vue';

defineProps<{
  operation: PortalOperation;
}>();
</script>

<template>
  <div class="space-y-10">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div v-for="(kpi, i) in buildOperationKpis(operation)" :key="i" class="bg-gray-50/50 border border-gray-100 p-6 rounded-3xl">
        <div class="flex items-center gap-3 mb-3">
          <div :class="`w-8 h-8 rounded-lg bg-white flex items-center justify-center ${kpi.color} shadow-sm`">
            <component :is="kpi.icon" :size="16" />
          </div>
          <p class="text-[10px] uppercase tracking-widest text-gray-400 font-black">{{ kpi.label }}</p>
        </div>
        <p class="text-xl font-black text-gci">{{ kpi.value }}</p>
      </div>
    </div>

    <InfoSectionCard
      :icon="Info"
      title="Informações Detalhadas"
      :items="buildOperationInfo(operation)"
      class-name="bg-white rounded-[32px] border border-gray-100 overflow-hidden"
      header-class-name="p-6 border-b border-gray-100 bg-gray-50/30"
      label-class-name="text-[11px] uppercase tracking-[0.15em] text-gray-400 font-black mb-1.5 group-hover:text-agro-orange transition-colors"
      value-class-name="text-lg font-bold text-gci"
    />
  </div>
</template>
