import { useEffect, useState } from 'react';
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
  const [isVerified, setIsVerified] = useState(false);
  const [activeTab, setActiveTab] = useState<DashboardTab>('home');
  const [lockedNotice, setLockedNotice] = useState<LockedNotice | null>(null);
  const [portalUnlockedToast, setPortalUnlockedToast] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (window.innerWidth >= DESKTOP_BREAKPOINT_PX) {
      setIsSidebarOpen(true);
    }
  }, []);

  const showLockedNotice = (message: string, offerCreditAction = false) => {
    setLockedNotice({ message, offerCreditAction });
    setTimeout(() => setLockedNotice(null), LOCKED_NOTICE_MS);
  };

  const dismissLockedNotice = () => setLockedNotice(null);

  const handleSelectNavItem = (item: DashboardNavItem) => {
    setActiveTab(item.id);
    if (window.innerWidth < DESKTOP_BREAKPOINT_PX) setIsSidebarOpen(false);
  };

  const startCreditAnalysis = () => {
    setLockedNotice(null);
    setActiveTab('documentos');
    if (window.innerWidth < DESKTOP_BREAKPOINT_PX) setIsSidebarOpen(false);
  };

  const handleOpenOperationRequest = (serviceName: string) => {
    if (isVerified) return;
    showLockedNotice(getServiceLockedNotice(serviceName), true);
  };

  const onAnticipateClick = (_source: PendingToastSource) => {
    if (!isVerified) {
      showLockedNotice(ANTICIPATION_LOCKED_NOTICE);
    }
  };

  const handleCompleteVerification = () => {
    setIsVerified(true);
    setActiveTab('home');
    setPortalUnlockedToast(true);
    setTimeout(() => setPortalUnlockedToast(false), PORTAL_UNLOCKED_TOAST_MS);
  };

  const handleResetVerification = () => {
    setIsVerified(false);
    setActiveTab('home');
  };

  return {
    isVerified,
    activeTab,
    setActiveTab,
    lockedNotice,
    dismissLockedNotice,
    portalUnlockedToast,
    setPortalUnlockedToast,
    isSidebarOpen,
    setIsSidebarOpen,
    handleSelectNavItem,
    handleOpenOperationRequest,
    onAnticipateClick,
    startCreditAnalysis,
    handleCompleteVerification,
    handleResetVerification,
  };
}

export type DashboardNavigation = ReturnType<typeof useDashboardNavigation>;
