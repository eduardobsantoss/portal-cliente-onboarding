<script setup lang="ts">
import { AnimatePresence } from 'motion-v';
import type { CanhotoUploadState } from '@/flows/portal/dashboard/hooks/useCanhotoUpload';
import type { CarteiraState } from '@/flows/portal/dashboard/hooks/useCarteira';
import type { OverlaysState } from '@/flows/portal/dashboard/hooks/useDashboardOverlays';
import type { GroupSwitchState } from '@/flows/portal/dashboard/hooks/useGroupSwitch';
import type { LinkSelectionState } from '@/flows/portal/dashboard/hooks/useLinkSelection';
import type { OperationsState } from '@/flows/portal/dashboard/hooks/useOperations';
import type { SacadoContactsState } from '@/flows/portal/dashboard/hooks/useSacadoContacts';
import AddXmlModal from '@/flows/portal/dashboard/modais/AddXmlModal.vue';
import CanhotoUploadModal from '@/flows/portal/dashboard/modais/CanhotoUploadModal/CanhotoUploadModal.vue';
import ConfirmacaoModal from '@/flows/portal/dashboard/modais/ConfirmacaoModal.vue';
import DocumentUploadModal from '@/flows/portal/dashboard/modais/DocumentUploadModal.vue';
import CarteiraFilterModal from '@/flows/portal/dashboard/modais/FilterModal/CarteiraFilterModal.vue';
import LinkAssetsModal from '@/flows/portal/dashboard/modais/LinkAssetsModal.vue';
import LinkSelectionModal from '@/flows/portal/dashboard/modais/LinkSelectionModal/LinkSelectionModal.vue';
import OperationDetailsModal from '@/flows/portal/dashboard/modais/OperationDetailsModal/OperationDetailsModal.vue';
import OperationRequestModal from '@/flows/portal/dashboard/modais/OperationRequestModal.vue';
import PendingTaskModal from '@/flows/portal/dashboard/modais/PendingTaskModal.vue';
import GroupSwitchLoadingOverlay from '@/flows/portal/dashboard/toasts/GroupSwitchLoadingOverlay.vue';
import SuccessOperationToast from '@/flows/portal/dashboard/toasts/SuccessOperationToast.vue';
import TitleDetailsModal from '@/flows/portal/dashboard/modais/TitleDetailsModal/TitleDetailsModal.vue';
import { FIRST_PENDING_NOTIFICATION } from '@/mocks/portalNotifications';
import type { PortalOperation } from '@/types/portalOperation';
import type { Titulo, TituloDetails } from '@/types/titulo';

/** Todos os modais do portal; cada um decide sozinho se está aberto a partir das props. */
const props = defineProps<{
  ops: OperationsState;
  group: GroupSwitchState;
  carteira: CarteiraState;
  overlays: OverlaysState;
  sacado: SacadoContactsState;
  canhoto: CanhotoUploadState;
  link: LinkSelectionState;
  resolutionTitulo: Titulo | null;
}>();

const handleOperationTabChange = (tab: string) => {
  props.ops.selectedOpDetails = { ...props.ops.selectedOpDetails, currentTab: tab } as PortalOperation;
};

const handleTituloTabChange = (tab: string) => {
  props.carteira.selectedTituloDetails = { ...props.carteira.selectedTituloDetails, currentTab: tab } as TituloDetails;
};
</script>

<template>
  <!-- Operation Details Modal -->
  <OperationDetailsModal
    :operation="ops.selectedOpDetails"
    @close="ops.selectedOpDetails = null"
    @tab-change="handleOperationTabChange"
    @resolve-pending="overlays.selectedPendingTask = FIRST_PENDING_NOTIFICATION"
    @link-assets="overlays.showLinkAssetsModal = true"
    @add-xml="overlays.showAddXmlFlow = true"
  />

  <!-- Title Details Modal -->
  <TitleDetailsModal
    :titulo="carteira.selectedTituloDetails"
    :contacts="sacado"
    @close="carteira.selectedTituloDetails = null"
    @tab-change="handleTituloTabChange"
  />

  <!-- Pending Task Modal -->
  <PendingTaskModal :task="overlays.selectedPendingTask" @close="overlays.selectedPendingTask = null" />

  <!-- Document Upload Modal -->
  <DocumentUploadModal :is-open="overlays.showDocsModal" @close="overlays.showDocsModal = false" />

  <!-- Operation Request Flow -->
  <OperationRequestModal
    :is-open="ops.showOperationRequest"
    :service-name="ops.selectedService"
    @close="ops.showOperationRequest = false"
    @complete="ops.handleCompleteOperation"
  />

  <!-- Link Assets Modal -->
  <LinkAssetsModal :is-open="overlays.showLinkAssetsModal" @close="overlays.showLinkAssetsModal = false" />

  <!-- Add XML Modal (Simplified) -->
  <AddXmlModal :is-open="overlays.showAddXmlFlow" @close="overlays.showAddXmlFlow = false" />

  <!-- Canhoto Upload Modal -->
  <CanhotoUploadModal
    :is-open="canhoto.showCanhotoModal"
    :titulo="resolutionTitulo"
    :files="canhoto.canhotoFiles"
    :is-uploading="canhoto.isUploadingCanhoto"
    :progress="canhoto.uploadCanhotoProgress"
    @pick-file="canhoto.pickCanhotoFile"
    @remove-file="canhoto.removeCanhotoFile"
    @close="canhoto.closeCanhotoModal"
    @submit="canhoto.handleCanhotoSubmit"
  />

  <!-- Filtros Carteira Modal -->
  <CarteiraFilterModal :is-open="carteira.showFilterModal" @close="carteira.showFilterModal = false" />

  <!-- Success Notification Toast -->
  <AnimatePresence>
    <SuccessOperationToast v-if="ops.showSuccessOperationToast" @close="ops.showSuccessOperationToast = false" />
  </AnimatePresence>

  <!-- Loading Overlay for Group Switch -->
  <AnimatePresence>
    <GroupSwitchLoadingOverlay v-if="group.isLoadingGroup" :selected-group="group.selectedGroup" />
  </AnimatePresence>

  <!-- Confirmation Modal -->
  <ConfirmacaoModal
    :is-open="carteira.showConfirmacaoModal"
    :selected-count="carteira.selectedTitulos.length"
    :data="carteira.confirmacaoData"
    @data-change="carteira.confirmacaoData = $event"
    @close="carteira.showConfirmacaoModal = false"
    @submit="carteira.handleRegisterConfirmacao"
  />

  <LinkSelectionModal
    :is-open="link.showLinkSelectionModal"
    :titulo="resolutionTitulo"
    :contacts="sacado.sacadoContacts"
    :selected-channels="link.selectedChannels"
    :selected-sacados="link.selectedSacados"
    @toggle-channel="link.toggleChannel"
    @toggle-sacado="link.toggleSacado"
    @toggle-all-sacados="link.toggleAllSacados"
    @close="link.closeLinkSelectionModal"
    @submit="link.submitLinkSelection"
  />
</template>
