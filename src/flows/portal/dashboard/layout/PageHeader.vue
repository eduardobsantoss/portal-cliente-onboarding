<script setup lang="ts">
import { computed } from 'vue';
import { AnimatePresence } from 'motion-v';
import { Zap } from 'lucide-vue-next';
import PendingBlockToast from '@/flows/portal/dashboard/toasts/PendingBlockToast.vue';
import { getDashboardHeading } from '@/utils/dashboardHeading';
import type { DashboardTab, PendingToastSource } from '@/types/dashboard';

const props = defineProps<{
  activeTab: DashboardTab;
  selectedGroup: string;
  activePendingToastSource: PendingToastSource | null;
}>();

const emit = defineEmits<{
  anticipate: [source: PendingToastSource];
  dismissPendingToast: [];
  goToCarteira: [];
}>();

const heading = computed(() => getDashboardHeading(props.activeTab, props.selectedGroup));
</script>

<template>
  <div class="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
    <div>
      <h1 class="text-2xl md:text-3xl font-bold text-gci tracking-tight">
        {{ heading.title }}
      </h1>
      <p class="text-slate-500 text-sm md:text-base font-medium mt-1">
        {{ heading.subtitle }}
      </p>
    </div>
    <div v-if="activeTab === 'operacoes' || activeTab === 'home'" class="flex gap-3">
      <div class="relative group">
        <button
          @click="emit('anticipate', 'header')"
          class="bg-agro-orange text-white px-8 py-3.5 rounded-2xl font-bold text-sm hover:bg-agro-orange/90 transition-all shadow-xl shadow-agro-orange/20 active:scale-[0.98] flex items-center gap-3 uppercase tracking-wider"
        >
          Fazer Antecipação
          <Zap :size="18" fill="currentColor" />
        </button>
        <AnimatePresence>
          <PendingBlockToast
            v-if="activePendingToastSource === 'header'"
            source="header"
            @close="emit('dismissPendingToast')"
            @go-to-carteira="emit('goToCarteira')"
          />
        </AnimatePresence>
      </div>
    </div>
  </div>
</template>
