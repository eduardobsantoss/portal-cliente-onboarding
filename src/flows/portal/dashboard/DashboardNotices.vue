<script setup lang="ts">
import { AnimatePresence } from 'motion-v';
import type { DashboardNavigation } from '@/flows/portal/dashboard/hooks/useDashboardNavigation';
import type { ResolveScreenState } from '@/flows/portal/dashboard/hooks/useResolveScreen';
import type { CanhotoUploadState } from '@/flows/portal/dashboard/hooks/useCanhotoUpload';
import type { LinkSelectionState } from '@/flows/portal/dashboard/hooks/useLinkSelection';
import ResolveScreenModal from '@/flows/portal/dashboard/modais/ResolveScreenModal/ResolveScreenModal.vue';
import PortalUnlockedToast from '@/flows/portal/dashboard/toasts/PortalUnlockedToast.vue';
import SuccessApprovalToast from '@/flows/portal/dashboard/toasts/SuccessApprovalToast.vue';
import ValidationWaitingToast from '@/flows/portal/dashboard/toasts/ValidationWaitingToast.vue';
import type { Titulo } from '@/types/titulo';

/** Avisos do topo da página, avisos globais de validação e a tela de resolução de pendências. */
defineProps<{
  nav: DashboardNavigation;
  resolveScreen: ResolveScreenState;
  canhoto: CanhotoUploadState;
  link: LinkSelectionState;
  titulosList: Titulo[];
}>();
</script>

<template>
  <!-- Unlocked Portal Toast -->
  <AnimatePresence>
    <PortalUnlockedToast v-if="nav.portalUnlockedToast" key="portal-unlocked" @close="nav.portalUnlockedToast = false" />
  </AnimatePresence>

  <!-- Welcome Section -->
  <AnimatePresence>
    <!-- Validation Waiting Toast - Global -->
    <ValidationWaitingToast
      v-if="resolveScreen.isWaitingValidation"
      key="validation-waiting"
      @confirm="resolveScreen.handleConfirmValidation"
    />

    <!-- Success Approval Toast - Global -->
    <SuccessApprovalToast
      v-if="resolveScreen.showSuccessApprovalToast"
      key="success-approval"
      @close="resolveScreen.showSuccessApprovalToast = false"
    />
  </AnimatePresence>

  <ResolveScreenModal
    :is-open="resolveScreen.isShowingResolveScreen"
    :has-seen-explanation="resolveScreen.hasSeenResolveExplanation"
    :titulos-list="titulosList"
    @close="resolveScreen.isShowingResolveScreen = false"
    @continue="resolveScreen.hasSeenResolveExplanation = true"
    @upload-canhoto="canhoto.openCanhotoModal"
    @send-link="link.openLinkSelectionModal"
    @finish="resolveScreen.handleFinishResolution"
  />
</template>
