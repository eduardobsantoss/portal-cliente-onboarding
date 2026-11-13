import { AnimatePresence } from 'motion/react';
import type { DashboardNavigation } from '@/flows/portal/dashboard/hooks/useDashboardNavigation';
import type { ResolveScreenState } from '@/flows/portal/dashboard/hooks/useResolveScreen';
import type { CanhotoUploadState } from '@/flows/portal/dashboard/hooks/useCanhotoUpload';
import type { LinkSelectionState } from '@/flows/portal/dashboard/hooks/useLinkSelection';
import { ResolveScreenModal } from '@/flows/portal/dashboard/modais/ResolveScreenModal/ResolveScreenModal';
import { LockedNoticeToast } from '@/flows/portal/dashboard/toasts/LockedNoticeToast';
import { PortalUnlockedToast } from '@/flows/portal/dashboard/toasts/PortalUnlockedToast';
import { SuccessApprovalToast } from '@/flows/portal/dashboard/toasts/SuccessApprovalToast';
import { ValidationWaitingToast } from '@/flows/portal/dashboard/toasts/ValidationWaitingToast';
import type { Titulo } from '@/types/titulo';

interface DashboardNoticesProps {
  nav: DashboardNavigation;
  resolveScreen: ResolveScreenState;
  canhoto: CanhotoUploadState;
  link: LinkSelectionState;
  titulosList: Titulo[];
}

/** Avisos do topo da página, avisos globais de validação e a tela de resolução de pendências. */
export const DashboardNotices = ({ nav, resolveScreen, canhoto, link, titulosList }: DashboardNoticesProps) => (
  <>
    {/* Unlocked Portal Toast */}
    <AnimatePresence>
      {nav.portalUnlockedToast && <PortalUnlockedToast onClose={() => nav.setPortalUnlockedToast(false)} />}
      {nav.lockedNotice && (
        <LockedNoticeToast
          message={nav.lockedNotice.message}
          onClose={nav.dismissLockedNotice}
          actionLabel={nav.lockedNotice.offerCreditAction ? 'Liberar meu limite' : undefined}
          onAction={nav.lockedNotice.offerCreditAction ? nav.startCreditAnalysis : undefined}
        />
      )}
    </AnimatePresence>

    {/* Welcome Section */}
    <AnimatePresence>
      {/* Validation Waiting Toast - Global */}
      {resolveScreen.isWaitingValidation && (
        <ValidationWaitingToast onConfirm={resolveScreen.handleConfirmValidation} />
      )}

      {/* Success Approval Toast - Global */}
      {resolveScreen.showSuccessApprovalToast && (
        <SuccessApprovalToast onClose={() => resolveScreen.setShowSuccessApprovalToast(false)} />
      )}
    </AnimatePresence>

    <ResolveScreenModal
      isOpen={resolveScreen.isShowingResolveScreen}
      hasSeenExplanation={resolveScreen.hasSeenResolveExplanation}
      titulosList={titulosList}
      onClose={() => resolveScreen.setIsShowingResolveScreen(false)}
      onContinue={() => resolveScreen.setHasSeenResolveExplanation(true)}
      onUploadCanhoto={canhoto.openCanhotoModal}
      onSendLink={link.openLinkSelectionModal}
      onFinish={resolveScreen.handleFinishResolution}
    />
  </>
);
