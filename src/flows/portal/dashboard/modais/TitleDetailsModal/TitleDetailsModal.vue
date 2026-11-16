<script setup lang="ts">
import { AnimatePresence } from 'motion-v';
import { DEFAULT_TITLE_DETAILS_TAB, TITLE_DETAILS_TABS } from '@/constants/titleDetails';
import type { SacadoContactsState } from '@/flows/portal/dashboard/hooks/useSacadoContacts';
import type { TituloDetails, TituloDetailsTab } from '@/types/titulo';
import DetailsTabBar from '@/flows/portal/dashboard/modais/comum/DetailsTabBar.vue';
import FullscreenDetailsModal from '@/flows/portal/dashboard/modais/comum/FullscreenDetailsModal.vue';
import TitleAttachmentsTab from './TitleAttachmentsTab.vue';
import TitleDetailsSidebar from './TitleDetailsSidebar.vue';
import TitleInfoTab from './TitleInfoTab.vue';
import TitleMovementsTab from './TitleMovementsTab.vue';
import TitleSacadoTab from './TitleSacadoTab.vue';
import TitleValidationsTab from './TitleValidationsTab.vue';

defineProps<{
  titulo: TituloDetails | null;
  contacts: SacadoContactsState;
}>();

const emit = defineEmits<{
  close: [];
  tabChange: [tab: TituloDetailsTab];
}>();
</script>

<template>
  <AnimatePresence>
    <FullscreenDetailsModal
      v-if="titulo"
      description="Visualize todas as informações, anexos e movimentações deste título específico."
      @close="emit('close')"
    >
      <template #title>Detalhes do <span class="text-agro-orange">Título</span>.</template>
      <template #sidebar>
        <TitleDetailsSidebar :status="titulo.status" :valor-nominal="titulo.valorNominal" />
      </template>

      <!-- Tabs for Details -->
      <DetailsTabBar
        :tabs="TITLE_DETAILS_TABS"
        :active-tab="titulo.currentTab || DEFAULT_TITLE_DETAILS_TAB"
        @change="emit('tabChange', $event)"
        indicator-layout-id="tabUnderlineTitulo"
        container-class-name="flex gap-8 border-b border-gray-100 mb-10 overflow-x-auto no-scrollbar"
        button-class-name="pb-4 text-xs font-black uppercase tracking-widest transition-all relative shrink-0"
      />

      <!-- Tab Content -->
      <div class="min-h-[400px]">
        <TitleInfoTab v-if="(titulo.currentTab || DEFAULT_TITLE_DETAILS_TAB) === 'DETALHES_TITULO'" :titulo="titulo" />
        <TitleAttachmentsTab v-if="titulo.currentTab === 'ANEXOS'" />
        <TitleValidationsTab v-if="titulo.currentTab === 'VALIDACOES'" :titulo="titulo" />
        <TitleMovementsTab v-if="titulo.currentTab === 'MOVIMENTACOES'" />
        <TitleSacadoTab v-if="titulo.currentTab === 'SACADO'" :titulo="titulo" :contacts="contacts" />
      </div>
    </FullscreenDetailsModal>
  </AnimatePresence>
</template>
