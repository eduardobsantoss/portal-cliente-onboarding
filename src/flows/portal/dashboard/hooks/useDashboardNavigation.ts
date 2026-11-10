import { useEffect, useState } from 'react';
import {
  ANTICIPATION_LOCKED_NOTICE,
  PORTAL_LOCKED_NOTICE,
  getServiceLockedNotice,
} from '@/constants/dashboardMessages';
import { DESKTOP_BREAKPOINT_PX } from '@/constants/dashboardNav';
import { LOCKED_NOTICE_MS, PORTAL_UNLOCKED_TOAST_MS } from '@/constants/dashboardTimings';
import type { DashboardNavItem, DashboardTab, PendingToastSource } from '@/types/dashboard';
import { isNavItemLocked } from '@/utils/dashboardNav';

/** Aba ativa, sidebar, verificação cadastral e avisos de funcionalidade bloqueada. */
export function useDashboardNavigation() {
  const [isVerified, setIsVerified] = useState(false);
  const [activeTab, setActiveTab] = useState<DashboardTab>('documentos');
  const [lockedTabNotice, setLockedTabNotice] = useState<string | null>(null);
  const [portalUnlockedToast, setPortalUnlockedToast] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Default closed for mobile

  // Auto-open sidebar on desktop
  useEffect(() => {
    if (window.innerWidth >= DESKTOP_BREAKPOINT_PX) {
      setIsSidebarOpen(true);
    }
  }, []);

  const showLockedNotice = (message: string) => {
    setLockedTabNotice(message);
    setTimeout(() => setLockedTabNotice(null), LOCKED_NOTICE_MS);
  };

  const handleSelectNavItem = (item: DashboardNavItem) => {
    if (isNavItemLocked(isVerified, item.id)) {
      showLockedNotice(PORTAL_LOCKED_NOTICE);
      return;
    }
    setActiveTab(item.id);
    if (window.innerWidth < DESKTOP_BREAKPOINT_PX) setIsSidebarOpen(false);
  };

  const handleOpenOperationRequest = (serviceName: string) => {
    showLockedNotice(getServiceLockedNotice(serviceName));
  };

  // O parâmetro `source` não é usado no original (o aviso é o mesmo para ambos os botões).
  const onAnticipateClick = (_source: PendingToastSource) => {
    showLockedNotice(ANTICIPATION_LOCKED_NOTICE);
  };

  const handleCompleteVerification = () => {
    setIsVerified(true);
    setActiveTab('home');
    setPortalUnlockedToast(true);
    setTimeout(() => setPortalUnlockedToast(false), PORTAL_UNLOCKED_TOAST_MS);
  };

  const handleResetVerification = () => {
    setIsVerified(false);
    setActiveTab('documentos');
  };

  return {
    isVerified,
    activeTab,
    setActiveTab,
    lockedTabNotice,
    setLockedTabNotice,
    portalUnlockedToast,
    setPortalUnlockedToast,
    isSidebarOpen,
    setIsSidebarOpen,
    handleSelectNavItem,
    handleOpenOperationRequest,
    onAnticipateClick,
    handleCompleteVerification,
    handleResetVerification,
  };
}

export type DashboardNavigation = ReturnType<typeof useDashboardNavigation>;
