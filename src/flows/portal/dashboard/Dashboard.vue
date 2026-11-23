<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import DashboardModals from './DashboardModals.vue';
import DashboardNotices from './DashboardNotices.vue';
import DashboardTabContent from './DashboardTabContent.vue';
import { useCanhotoUpload } from './hooks/useCanhotoUpload';
import { useCarteira } from './hooks/useCarteira';
import { useDashboardNavigation } from './hooks/useDashboardNavigation';
import { useDashboardOverlays } from './hooks/useDashboardOverlays';
import { useGroupSwitch } from './hooks/useGroupSwitch';
import { useLinkSelection } from './hooks/useLinkSelection';
import { useOperations } from './hooks/useOperations';
import { useResolveScreen } from './hooks/useResolveScreen';
import { useSacadoContacts } from './hooks/useSacadoContacts';
import ProductTour from '../tour/ProductTour.vue';
import { useProductTour } from '../tour/useProductTour';
import PageHeader from './layout/PageHeader.vue';
import Sidebar from './layout/Sidebar.vue';
import SidebarOverlay from './layout/SidebarOverlay.vue';
import TopHeader from './layout/TopHeader.vue';

/** Portal do Cliente: orquestra navegação, estado das áreas e a composição de layout, abas e modais. */
const props = defineProps<{
  /** Primeiro acesso: oferece o tour guiado ao abrir o portal. */
  offerTour?: boolean;
}>();

const emit = defineEmits<{
  logout: [];
  tourSeen: [];
}>();

// Cada composable devolve refs; `reactive(...)` as desembrulha para repassar o estado aos filhos
// (mesmo formato de objetos de estado do original em React).
// A navegação precisa abrir a solicitação de operação, que por sua vez depende de `nav.setActiveTab`;
// por isso o callback só acessa `ops` quando é chamado (depois da inicialização).
const nav = reactive(
  useDashboardNavigation({
    openOperationRequest: (serviceName = '') => {
      ops.selectedService = serviceName;
      ops.showOperationRequest = true;
    },
  }),
);
const group = reactive(useGroupSwitch());
const ops = reactive(useOperations({ selectedGroup: () => group.selectedGroup, setActiveTab: nav.setActiveTab }));
const carteiraRefs = useCarteira();
const carteira = reactive(carteiraRefs);
const overlays = reactive(useDashboardOverlays());
const sacadoRefs = useSacadoContacts();
const sacado = reactive(sacadoRefs);
const resolveScreenRefs = useResolveScreen({
  titulosList: carteiraRefs.titulosList,
  hasPendingConfirmations: carteiraRefs.hasPendingConfirmations,
});
const resolveScreen = reactive(resolveScreenRefs);
const resolution = {
  resolutionTitulo: resolveScreenRefs.resolutionTitulo,
  titulosList: carteiraRefs.titulosList,
};
const canhoto = reactive(useCanhotoUpload(resolution));
const link = reactive(
  useLinkSelection({
    ...resolution,
    hasPendingConfirmations: carteiraRefs.hasPendingConfirmations,
    sacadoContacts: sacadoRefs.sacadoContacts,
  }),
);

// Tour do primeiro acesso: o convite aparece uma vez; "Refazer tutorial" (menu do perfil) o reinicia.
const tour = reactive(useProductTour({ onSeen: () => emit('tourSeen') }));
onMounted(() => {
  if (props.offerTour) tour.offer();
});

const goToCarteira = () => {
  nav.setActiveTab('carteira');
  overlays.activePendingToastSource = null;
};
</script>

<template>
  <div class="min-h-screen bg-[#F8F9FA] flex">
    <!-- Sidebar Overlay for Mobile -->
    <SidebarOverlay :is-open="nav.isSidebarOpen" @close="nav.isSidebarOpen = false" />

    <!-- Sidebar -->
    <Sidebar
      :is-open="nav.isSidebarOpen"
      :active-tab="nav.activeTab"
      @select-item="nav.handleSelectNavItem"
      @close="nav.isSidebarOpen = false"
      @logout="emit('logout')"
    />

    <!-- Main Content Area -->
    <div :class="`flex-1 flex flex-col transition-all duration-300 ${nav.isSidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`">
      <!-- Top Header -->
      <TopHeader
        :selected-group="group.selectedGroup"
        @toggle-sidebar="nav.isSidebarOpen = !nav.isSidebarOpen"
        @select-pending="overlays.selectedPendingTask = $event"
        @group-change="group.handleGroupChange"
        @start-tour="tour.start()"
        @logout="emit('logout')"
      />

      <!-- Content -->
      <main class="p-4 md:p-8 max-w-[1400px] mx-auto w-full">
        <DashboardNotices
          :nav="nav"
          :resolve-screen="resolveScreen"
          :canhoto="canhoto"
          :link="link"
          :titulos-list="carteira.titulosList"
        />

        <PageHeader
          :active-tab="nav.activeTab"
          :selected-group="group.selectedGroup"
          :active-pending-toast-source="overlays.activePendingToastSource"
          @anticipate="nav.onAnticipateClick"
          @dismiss-pending-toast="overlays.activePendingToastSource = null"
          @go-to-carteira="goToCarteira"
        />

        <DashboardTabContent
          :nav="nav"
          :ops="ops"
          :carteira="carteira"
          :overlays="overlays"
          :resolve-screen="resolveScreen"
          @go-to-carteira="goToCarteira"
        />
      </main>
    </div>

    <ProductTour
      :phase="tour.phase"
      :step="tour.currentStep"
      :step-index="tour.stepIndex"
      :total-steps="tour.totalSteps"
      :is-first-step="tour.isFirstStep"
      :is-last-step="tour.isLastStep"
      @start="tour.start()"
      @skip="tour.close()"
      @next="tour.next()"
      @previous="tour.previous()"
      @sidebar="nav.isSidebarOpen = $event"
    />

    <DashboardModals
      :ops="ops"
      :group="group"
      :carteira="carteira"
      :overlays="overlays"
      :sacado="sacado"
      :canhoto="canhoto"
      :link="link"
      :resolution-titulo="resolveScreen.resolutionTitulo"
    />
  </div>
</template>
