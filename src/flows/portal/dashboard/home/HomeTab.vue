<script setup lang="ts">
import { AnimatePresence } from 'motion-v';
import type { DashboardTab, PendingToastSource } from '@/types/dashboard';
import type { PortalOperation } from '@/types/portalOperation';
import LimitBreakdown from './LimitBreakdown.vue';
import LimitHero from './LimitHero.vue';
import PendingActionsPopup from './PendingActionsPopup.vue';
import RecentOperations from './RecentOperations.vue';

defineProps<{
  operations: PortalOperation[];
  hasPendingConfirmations: boolean;
  isWaitingValidation: boolean;
  activePendingToastSource: PendingToastSource | null;
}>();

const emit = defineEmits<{
  navigate: [tab: DashboardTab];
  openOperation: [op: PortalOperation];
  anticipate: [source: PendingToastSource];
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
      :active-pending-toast-source="activePendingToastSource"
      @anticipate="emit('anticipate', 'hero')"
      @dismiss-pending-toast="emit('dismissPendingToast')"
      @go-to-carteira="emit('goToCarteira')"
    />

    <LimitBreakdown />

    <RecentOperations
      :operations="operations"
      @view-all="emit('navigate', 'operacoes')"
      @open-operation="emit('openOperation', $event)"
    />
  </div>
</template>
