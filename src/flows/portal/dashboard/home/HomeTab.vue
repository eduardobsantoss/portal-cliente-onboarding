<script setup lang="ts">
import { AnimatePresence } from 'motion-v';
import { LIMIT_AVAILABLE_LABEL, LIMIT_EMPTY_LABEL } from '@/constants/analysis';
import type { DashboardTab, PendingToastSource } from '@/types/dashboard';
import type { PortalOperation } from '@/types/portalOperation';
import CreditAnalysisBanner from './CreditAnalysisBanner.vue';
import LimitBreakdown from './LimitBreakdown.vue';
import LimitHero from './LimitHero.vue';
import PendingActionsPopup from './PendingActionsPopup.vue';
import RecentOperations from './RecentOperations.vue';

defineProps<{
  operations: PortalOperation[];
  hasPendingConfirmations: boolean;
  isWaitingValidation: boolean;
  isLimitReleased: boolean;
  activePendingToastSource: PendingToastSource | null;
}>();

const emit = defineEmits<{
  navigate: [tab: DashboardTab];
  openOperation: [op: PortalOperation];
  anticipate: [source: PendingToastSource];
  startCreditAnalysis: [];
  dismissPendingToast: [];
  goToCarteira: [];
}>();
</script>

<template>
  <div class="space-y-8">
    <AnimatePresence>
      <PendingActionsPopup
        v-if="hasPendingConfirmations && !isWaitingValidation"
        @resolve="emit('navigate', 'carteira')"
      />
    </AnimatePresence>

    <LimitHero
      :is-limit-released="isLimitReleased"
      :active-pending-toast-source="activePendingToastSource"
      @anticipate="emit('anticipate', 'hero')"
      @start-credit-analysis="emit('startCreditAnalysis')"
      @dismiss-pending-toast="emit('dismissPendingToast')"
      @go-to-carteira="emit('goToCarteira')"
    />

    <CreditAnalysisBanner v-if="!isLimitReleased" @start="emit('startCreditAnalysis')" />

    <LimitBreakdown
      :limit-label="isLimitReleased ? LIMIT_AVAILABLE_LABEL : LIMIT_EMPTY_LABEL"
      :is-limit-released="isLimitReleased"
    />

    <RecentOperations
      :operations="operations"
      @view-all="emit('navigate', 'operacoes')"
      @open-operation="emit('openOperation', $event)"
    />
  </div>
</template>
