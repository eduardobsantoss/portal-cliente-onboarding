<script setup lang="ts">
import { LIMIT_AVAILABLE_LABEL, LIMIT_EMPTY_LABEL } from '@/constants/analysis';
import DocumentVerification from '@/flows/portal/complete-cadastro/DocumentVerification.vue';
import CarteiraTab from '@/flows/portal/dashboard/carteira/CarteiraTab.vue';
import HomeTab from '@/flows/portal/dashboard/home/HomeTab.vue';
import type { CarteiraState } from '@/flows/portal/dashboard/hooks/useCarteira';
import type { DashboardNavigation } from '@/flows/portal/dashboard/hooks/useDashboardNavigation';
import type { OperationsState } from '@/flows/portal/dashboard/hooks/useOperations';
import type { OverlaysState } from '@/flows/portal/dashboard/hooks/useDashboardOverlays';
import type { ResolveScreenState } from '@/flows/portal/dashboard/hooks/useResolveScreen';
import GeralTab from '@/flows/portal/dashboard/minhas-informacoes/GeralTab.vue';
import OperacoesTab from '@/flows/portal/dashboard/operacoes/OperacoesTab.vue';
import type { PortalOperation } from '@/types/portalOperation';

/** Conteúdo da aba ativa; qualquer aba desconhecida cai na Análise de Crédito. */
const props = defineProps<{
  nav: DashboardNavigation;
  ops: OperationsState;
  carteira: CarteiraState;
  overlays: OverlaysState;
  resolveScreen: ResolveScreenState;
}>();

const emit = defineEmits<{
  goToCarteira: [];
}>();

const handleOpenOperation = (op: PortalOperation) => {
  props.ops.selectedOpDetails = op;
  props.nav.setActiveTab('operacoes');
};
</script>

<template>
  <HomeTab
    v-if="nav.activeTab === 'home'"
    :operations="ops.operations"
    :has-pending-confirmations="carteira.hasPendingConfirmations"
    :is-waiting-validation="resolveScreen.isWaitingValidation"
    :is-limit-released="nav.isVerified"
    :active-pending-toast-source="overlays.activePendingToastSource"
    @navigate="nav.setActiveTab"
    @open-operation="handleOpenOperation"
    @anticipate="nav.onAnticipateClick"
    @start-credit-analysis="nav.startCreditAnalysis"
    @dismiss-pending-toast="overlays.activePendingToastSource = null"
    @go-to-carteira="emit('goToCarteira')"
  />
  <GeralTab
    v-else-if="nav.activeTab === 'geral'"
    :limit-label="nav.isVerified ? LIMIT_AVAILABLE_LABEL : LIMIT_EMPTY_LABEL"
    @select-service="nav.handleOpenOperationRequest"
  />
  <CarteiraTab
    v-else-if="nav.activeTab === 'carteira'"
    :titulos-list="carteira.titulosList"
    :selected-titulos="carteira.selectedTitulos"
    @select-titulo="carteira.handleSelectTitulo"
    @select-all-titulos="carteira.handleSelectAllTitulos"
    @open-details="carteira.handleOpenTituloDetails"
    @open-resolve="resolveScreen.openResolveScreen"
    @open-filter="carteira.showFilterModal = true"
    @open-confirmacao="carteira.showConfirmacaoModal = true"
  />
  <OperacoesTab
    v-else-if="nav.activeTab === 'operacoes'"
    :operations="ops.operations"
    :search-operation-id="ops.searchOperationId"
    @search-change="ops.searchOperationId = $event"
    @open-details="ops.selectedOpDetails = $event"
    @view-services="nav.setActiveTab('geral')"
  />
  <DocumentVerification
    v-else
    :is-verified="nav.isVerified"
    @complete-verification="nav.handleCompleteVerification"
    @reset-verification="nav.handleResetVerification"
  />
</template>
