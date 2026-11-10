import { AnimatePresence } from 'motion/react';
import { DashboardModals } from './DashboardModals';
import { DashboardNotices } from './DashboardNotices';
import { DashboardTabContent } from './DashboardTabContent';
import { useCanhotoUpload } from './hooks/useCanhotoUpload';
import { useCarteira } from './hooks/useCarteira';
import { useDashboardNavigation } from './hooks/useDashboardNavigation';
import { useDashboardOverlays } from './hooks/useDashboardOverlays';
import { useGroupSwitch } from './hooks/useGroupSwitch';
import { useLinkSelection } from './hooks/useLinkSelection';
import { useOperations } from './hooks/useOperations';
import { useResolveScreen } from './hooks/useResolveScreen';
import { useSacadoContacts } from './hooks/useSacadoContacts';
import { PageHeader } from './layout/PageHeader';
import { Sidebar } from './layout/Sidebar';
import { SidebarOverlay } from './layout/SidebarOverlay';
import { TopHeader } from './layout/TopHeader';
import { GroupSwitchLoadingOverlay } from './toasts/GroupSwitchLoadingOverlay';
import { SuccessOperationToast } from './toasts/SuccessOperationToast';

interface DashboardProps {
  onLogout: () => void;
}

/** Portal do Cliente: orquestra navegação, estado das áreas e a composição de layout, abas e modais. */
export const Dashboard = ({ onLogout }: DashboardProps) => {
  const nav = useDashboardNavigation();
  const group = useGroupSwitch();
  const ops = useOperations({ selectedGroup: group.selectedGroup, setActiveTab: nav.setActiveTab });
  const carteira = useCarteira();
  const overlays = useDashboardOverlays();
  const sacado = useSacadoContacts();
  const resolveScreen = useResolveScreen({
    titulosList: carteira.titulosList,
    setTitulosList: carteira.setTitulosList,
    setHasPendingConfirmations: carteira.setHasPendingConfirmations,
  });
  const resolution = {
    resolutionTitulo: resolveScreen.resolutionTitulo,
    setResolutionTitulo: resolveScreen.setResolutionTitulo,
    titulosList: carteira.titulosList,
    setTitulosList: carteira.setTitulosList,
  };
  const canhoto = useCanhotoUpload(resolution);
  const link = useLinkSelection({
    ...resolution,
    setHasPendingConfirmations: carteira.setHasPendingConfirmations,
    sacadoContacts: sacado.sacadoContacts,
  });

  const goToCarteira = () => {
    nav.setActiveTab('carteira');
    overlays.setActivePendingToastSource(null);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex">
      {/* Sidebar Overlay for Mobile */}
      <SidebarOverlay isOpen={nav.isSidebarOpen} onClose={() => nav.setIsSidebarOpen(false)} />

      {/* Sidebar */}
      <Sidebar
        isOpen={nav.isSidebarOpen}
        isVerified={nav.isVerified}
        activeTab={nav.activeTab}
        onSelectItem={nav.handleSelectNavItem}
        onClose={() => nav.setIsSidebarOpen(false)}
        onLogout={onLogout}
      />

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${nav.isSidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
        {/* Top Header */}
        <TopHeader
          selectedGroup={group.selectedGroup}
          onToggleSidebar={() => nav.setIsSidebarOpen(!nav.isSidebarOpen)}
          onSelectPending={overlays.setSelectedPendingTask}
          onGroupChange={group.handleGroupChange}
          onLogout={onLogout}
        />

        {/* Content */}
        <main className="p-4 md:p-8 max-w-[1400px] mx-auto w-full">
          <DashboardNotices
            nav={nav}
            resolveScreen={resolveScreen}
            canhoto={canhoto}
            link={link}
            titulosList={carteira.titulosList}
          />

          <PageHeader
            activeTab={nav.activeTab}
            selectedGroup={group.selectedGroup}
            activePendingToastSource={overlays.activePendingToastSource}
            onAnticipate={nav.onAnticipateClick}
            onDismissPendingToast={() => overlays.setActivePendingToastSource(null)}
            onGoToCarteira={goToCarteira}
          />

          <DashboardTabContent
            nav={nav}
            ops={ops}
            carteira={carteira}
            overlays={overlays}
            resolveScreen={resolveScreen}
            onGoToCarteira={goToCarteira}
          />
        </main>
      </div>

      <DashboardModals
        ops={ops}
        carteira={carteira}
        overlays={overlays}
        sacado={sacado}
        canhoto={canhoto}
        link={link}
        resolutionTitulo={resolveScreen.resolutionTitulo}
      />

      {/* Success Notification Toast */}
      <AnimatePresence>
        {ops.showSuccessOperationToast && (
          <SuccessOperationToast onClose={() => ops.setShowSuccessOperationToast(false)} />
        )}
      </AnimatePresence>

      {/* Loading Overlay for Group Switch */}
      <AnimatePresence>
        {group.isLoadingGroup && <GroupSwitchLoadingOverlay selectedGroup={group.selectedGroup} />}
      </AnimatePresence>
    </div>
  );
};
