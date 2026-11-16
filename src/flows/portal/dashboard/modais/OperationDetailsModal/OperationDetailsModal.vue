<script setup lang="ts">
import { AnimatePresence } from 'motion-v';
import {
  DEFAULT_OPERATION_DETAILS_TAB,
  OPERATION_DETAILS_TABS,
} from '@/constants/operationDetails';
import type { OperationDetailsTab, PortalOperation } from '@/types/portalOperation';
import DetailsTabBar from '@/flows/portal/dashboard/modais/comum/DetailsTabBar.vue';
import FullscreenDetailsModal from '@/flows/portal/dashboard/modais/comum/FullscreenDetailsModal.vue';
import OperationAssetsTab from './OperationAssetsTab.vue';
import OperationAttachmentsTab from './OperationAttachmentsTab.vue';
import OperationDetailsSidebar from './OperationDetailsSidebar.vue';
import OperationGeneralTab from './OperationGeneralTab.vue';
import OperationPendingBanner from './OperationPendingBanner.vue';
import OperationRejectionBanner from './OperationRejectionBanner.vue';

defineProps<{
  operation: PortalOperation | null;
}>();

const emit = defineEmits<{
  close: [];
  tabChange: [tab: OperationDetailsTab];
  resolvePending: [];
  linkAssets: [];
  addXml: [];
}>();
</script>

<template>
  <AnimatePresence>
    <FullscreenDetailsModal
      v-if="operation"
      description="Visualize todas as informações, ativos e anexos desta operação."
      @close="emit('close')"
    >
      <template #title>Detalhes da <span class="text-agro-orange">Operação</span>.</template>
      <template #sidebar>
        <OperationDetailsSidebar :status="operation.status" />
      </template>

      <!-- Rejection Banner -->
      <OperationRejectionBanner v-if="operation.status === 'Rejeitado'" :operation="operation" />

      <!-- Pending Action Section -->
      <OperationPendingBanner v-if="operation.status !== 'Rejeitado'" @resolve="emit('resolvePending')" />

      <!-- Tabs for Details -->
      <DetailsTabBar
        :tabs="OPERATION_DETAILS_TABS"
        :active-tab="operation.currentTab || DEFAULT_OPERATION_DETAILS_TAB"
        @change="emit('tabChange', $event)"
        indicator-layout-id="activeTabDetails"
        container-class-name="flex gap-8 border-b border-gray-100 mb-10"
        button-class-name="pb-4 text-xs font-black uppercase tracking-widest transition-all relative"
      />

      <!-- Tab Content -->
      <div class="min-h-[400px]">
        <OperationGeneralTab
          v-if="(operation.currentTab || DEFAULT_OPERATION_DETAILS_TAB) === 'DADOS_GERAIS'"
          :operation="operation"
        />

        <OperationAssetsTab
          v-if="operation.currentTab === 'ATIVOS'"
          @link-assets="emit('linkAssets')"
          @add-xml="emit('addXml')"
        />

        <OperationAttachmentsTab v-if="operation.currentTab === 'ANEXOS'" />
      </div>
    </FullscreenDetailsModal>
  </AnimatePresence>
</template>
