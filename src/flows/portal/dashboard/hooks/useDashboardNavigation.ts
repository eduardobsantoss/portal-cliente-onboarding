import { onMounted, ref, type UnwrapNestedRefs } from 'vue';
import { DESKTOP_BREAKPOINT_PX } from '@/constants/dashboardNav';
import { PORTAL_UNLOCKED_TOAST_MS } from '@/constants/dashboardTimings';
import type { DashboardNavItem, DashboardTab } from '@/types/dashboard';

interface UseDashboardNavigationParams {
  /** Abre a solicitação de operação (opcionalmente já com o serviço escolhido). */
  openOperationRequest: (serviceName?: string) => void;
}

/**
 * Aba ativa, sidebar e conclusão do "Compl. Cadastro".
 * O portal já nasce liberado para operar: nenhuma aba é bloqueada e `isVerified` apenas indica
 * que o checklist de "Compl. Cadastro" foi concluído.
 */
export function useDashboardNavigation({ openOperationRequest }: UseDashboardNavigationParams) {
  const isVerified = ref(false);
  const activeTab = ref<DashboardTab>('home');
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

  const handleSelectNavItem = (item: DashboardNavItem) => {
    activeTab.value = item.id;
    if (window.innerWidth < DESKTOP_BREAKPOINT_PX) isSidebarOpen.value = false;
  };

  const handleOpenOperationRequest = (serviceName: string) => {
    openOperationRequest(serviceName);
  };

  const onAnticipateClick = () => {
    openOperationRequest();
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
    portalUnlockedToast,
    isSidebarOpen,
    handleSelectNavItem,
    handleOpenOperationRequest,
    onAnticipateClick,
    handleCompleteVerification,
    handleResetVerification,
  };
}

/** Estado desembrulhado (use `reactive(useDashboardNavigation(...))` para repassar aos componentes filhos). */
export type DashboardNavigation = UnwrapNestedRefs<ReturnType<typeof useDashboardNavigation>>;
