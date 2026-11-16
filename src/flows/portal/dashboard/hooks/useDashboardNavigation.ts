import { onMounted, ref, type UnwrapNestedRefs } from 'vue';
import { ANTICIPATION_LOCKED_NOTICE, getServiceLockedNotice } from '@/constants/dashboardMessages';
import { DESKTOP_BREAKPOINT_PX } from '@/constants/dashboardNav';
import { LOCKED_NOTICE_MS, PORTAL_UNLOCKED_TOAST_MS } from '@/constants/dashboardTimings';
import type { DashboardNavItem, DashboardTab, PendingToastSource } from '@/types/dashboard';

export interface LockedNotice {
  message: string;
  offerCreditAction: boolean;
}

/** Aba ativa, sidebar e avisos. `isVerified` indica que o limite de crédito já foi liberado. */
export function useDashboardNavigation() {
  const isVerified = ref(false);
  const activeTab = ref<DashboardTab>('home');
  const lockedNotice = ref<LockedNotice | null>(null);
  const portalUnlockedToast = ref(false);
  const isSidebarOpen = ref(false);

  onMounted(() => {
    if (window.innerWidth >= DESKTOP_BREAKPOINT_PX) {
      isSidebarOpen.value = true;
    }
  });

  const setActiveTab = (tab: DashboardTab) => {
    activeTab.value = tab;
  };

  const showLockedNotice = (message: string, offerCreditAction = false) => {
    lockedNotice.value = { message, offerCreditAction };
    setTimeout(() => (lockedNotice.value = null), LOCKED_NOTICE_MS);
  };

  const dismissLockedNotice = () => {
    lockedNotice.value = null;
  };

  const handleSelectNavItem = (item: DashboardNavItem) => {
    activeTab.value = item.id;
    if (window.innerWidth < DESKTOP_BREAKPOINT_PX) isSidebarOpen.value = false;
  };

  const startCreditAnalysis = () => {
    lockedNotice.value = null;
    activeTab.value = 'documentos';
    if (window.innerWidth < DESKTOP_BREAKPOINT_PX) isSidebarOpen.value = false;
  };

  const handleOpenOperationRequest = (serviceName: string) => {
    if (isVerified.value) return;
    showLockedNotice(getServiceLockedNotice(serviceName), true);
  };

  const onAnticipateClick = (_source: PendingToastSource) => {
    if (!isVerified.value) {
      showLockedNotice(ANTICIPATION_LOCKED_NOTICE);
    }
  };

  const handleCompleteVerification = () => {
    isVerified.value = true;
    activeTab.value = 'home';
    portalUnlockedToast.value = true;
    setTimeout(() => (portalUnlockedToast.value = false), PORTAL_UNLOCKED_TOAST_MS);
  };

  const handleResetVerification = () => {
    isVerified.value = false;
    activeTab.value = 'home';
  };

  return {
    isVerified,
    activeTab,
    setActiveTab,
    lockedNotice,
    dismissLockedNotice,
    portalUnlockedToast,
    isSidebarOpen,
    handleSelectNavItem,
    handleOpenOperationRequest,
    onAnticipateClick,
    startCreditAnalysis,
    handleCompleteVerification,
    handleResetVerification,
  };
}

/** Estado desembrulhado (use `reactive(useDashboardNavigation())` para repassar aos componentes filhos). */
export type DashboardNavigation = UnwrapNestedRefs<ReturnType<typeof useDashboardNavigation>>;
