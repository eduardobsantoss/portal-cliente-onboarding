import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { DocumentVerification } from '@/flows/portal/complete-cadastro/DocumentVerification';
import { DEFAULT_CORPORATE_GROUP } from '@/mocks/economicGroups';
import { FIRST_PENDING_NOTIFICATION } from '@/mocks/portalNotifications';
import { INITIAL_OPERATIONS, INITIAL_TITULOS } from '@/mocks/portalCollections';
import type { DashboardTab } from '@/types/dashboard';
import type { PendingTask } from '@/types/notification';
import type { OperationCompletionData } from '@/types/operationRequest';
import type { PortalOperation } from '@/types/portalOperation';
import type { CanhotoFile, ConfirmacaoData, Titulo, TituloDetails } from '@/types/titulo';
import { createPortalOperation } from '@/utils/createPortalOperation';
import { PageHeader } from '@/flows/portal/dashboard/layout/PageHeader';
import { HomeTab } from '@/flows/portal/dashboard/home/HomeTab';
import { GeralTab } from '@/flows/portal/dashboard/minhas-informacoes/GeralTab';
import { CarteiraTab } from '@/flows/portal/dashboard/carteira/CarteiraTab';
import { OperacoesTab } from '@/flows/portal/dashboard/operacoes/OperacoesTab';
import { Sidebar } from '@/flows/portal/dashboard/layout/Sidebar';
import { SidebarOverlay } from '@/flows/portal/dashboard/layout/SidebarOverlay';
import { TopHeader } from '@/flows/portal/dashboard/layout/TopHeader';
import { PortalUnlockedToast } from '@/flows/portal/dashboard/toasts/PortalUnlockedToast';
import { LockedNoticeToast } from '@/flows/portal/dashboard/toasts/LockedNoticeToast';
import { ValidationWaitingToast } from '@/flows/portal/dashboard/toasts/ValidationWaitingToast';
import { SuccessApprovalToast } from '@/flows/portal/dashboard/toasts/SuccessApprovalToast';
import { SuccessOperationToast } from '@/flows/portal/dashboard/toasts/SuccessOperationToast';
import { GroupSwitchLoadingOverlay } from '@/flows/portal/dashboard/toasts/GroupSwitchLoadingOverlay';
import { ResolveScreenModal } from '@/flows/portal/dashboard/modais/ResolveScreenModal/ResolveScreenModal';
import { DESKTOP_BREAKPOINT_PX } from '@/constants/dashboardNav';
import { PORTAL_LOCKED_NOTICE } from '@/constants/dashboardMessages';
import { LOCKED_NOTICE_MS, SUCCESS_APPROVAL_TOAST_MS } from '@/constants/dashboardTimings';
import { isNavItemLocked } from '@/utils/dashboardNav';
import type { DashboardNavItem } from '@/types/dashboard';
import { toggleListItem } from '@/utils/toggleListItem';
import { useSacadoContacts } from '@/flows/portal/dashboard/hooks/useSacadoContacts';
import { AddXmlModal } from '@/flows/portal/dashboard/modais/AddXmlModal';
import { CanhotoUploadModal } from '@/flows/portal/dashboard/modais/CanhotoUploadModal/CanhotoUploadModal';
import { CarteiraFilterModal } from '@/flows/portal/dashboard/modais/FilterModal/CarteiraFilterModal';
import { ConfirmacaoModal } from '@/flows/portal/dashboard/modais/ConfirmacaoModal';
import { DocumentUploadModal } from '@/flows/portal/dashboard/modais/DocumentUploadModal';
import { LinkAssetsModal } from '@/flows/portal/dashboard/modais/LinkAssetsModal';
import { LinkSelectionModal } from '@/flows/portal/dashboard/modais/LinkSelectionModal/LinkSelectionModal';
import { OperationDetailsModal } from '@/flows/portal/dashboard/modais/OperationDetailsModal/OperationDetailsModal';
import { OperationRequestModal } from '@/flows/portal/dashboard/modais/OperationRequestModal';
import { PendingTaskModal } from '@/flows/portal/dashboard/modais/PendingTaskModal';
import { TitleDetailsModal } from '@/flows/portal/dashboard/modais/TitleDetailsModal/TitleDetailsModal';

interface DashboardProps {
  onLogout: () => void;
}


export const Dashboard = ({ onLogout }: DashboardProps) => {
  const [showDocsModal, setShowDocsModal] = useState(false);
  const [showOperationRequest, setShowOperationRequest] = useState(false);
  const [selectedService] = useState('');
  const [operations, setOperations] = useState<PortalOperation[]>(INITIAL_OPERATIONS);
  const [isVerified, setIsVerified] = useState(false);
  const [activeTab, setActiveTab] = useState<DashboardTab>('documentos');
  const [lockedTabNotice, setLockedTabNotice] = useState<string | null>(null);
  const [portalUnlockedToast, setPortalUnlockedToast] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Default closed for mobile
  const [selectedOpDetails, setSelectedOpDetails] = useState<PortalOperation | null>(null);
  const [selectedTituloDetails, setSelectedTituloDetails] = useState<TituloDetails | null>(null);
  const [selectedTituloDetailsForResolution, setSelectedTituloDetailsForResolution] = useState<Titulo | null>(null);
  const [showLinkAssetsModal, setShowLinkAssetsModal] = useState(false);
  const [showAddXmlFlow, setShowAddXmlFlow] = useState(false);
  const [searchOperationId, setSearchOperationId] = useState('');

  const [selectedGroup, setSelectedGroup] = useState(DEFAULT_CORPORATE_GROUP);
  const [isLoadingGroup, setIsLoadingGroup] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedPendingTask, setSelectedPendingTask] = useState<PendingTask | null>(null);
  const [showSuccessOperationToast, setShowSuccessOperationToast] = useState(false);
  const [selectedTitulos, setSelectedTitulos] = useState<number[]>([]);
  const [showConfirmacaoModal, setShowConfirmacaoModal] = useState(false);
  const [confirmacaoData, setConfirmacaoData] = useState<ConfirmacaoData>({ date: '', time: '', evidence: null, observacoes: '' });
  const [hasPendingConfirmations, setHasPendingConfirmations] = useState(false);
  const [activePendingToastSource, setActivePendingToastSource] = useState<'header' | 'hero' | null>(null);
  const [isWaitingValidation, setIsWaitingValidation] = useState(false);
  const [showSuccessApprovalToast, setShowSuccessApprovalToast] = useState(false);
  const [showLinkSelectionModal, setShowLinkSelectionModal] = useState(false);
  const [selectedSacados, setSelectedSacados] = useState<string[]>([]);
  const [selectedChannels, setSelectedChannels] = useState<string[]>(['whatsapp']);
  const [isShowingResolveScreen, setIsShowingResolveScreen] = useState(false);
  const [hasSeenResolveExplanation, setHasSeenResolveExplanation] = useState(false);
  const [showCanhotoModal, setShowCanhotoModal] = useState(false);
  const [canhotoFiles, setCanhotoFiles] = useState<CanhotoFile[]>([]);
  const [isUploadingCanhoto, setIsUploadingCanhoto] = useState(false);
  const [uploadCanhotoProgress, setUploadCanhotoProgress] = useState(0);
  const [titulosList, setTitulosList] = useState<Titulo[]>(INITIAL_TITULOS);
  const sacadoContactsState = useSacadoContacts();

  // Auto-open sidebar on desktop
  React.useEffect(() => {
    if (window.innerWidth >= 1024) {
      setIsSidebarOpen(true);
    }
  }, []);

  const handleOpenOperationRequest = (serviceName: string) => {
    setLockedTabNotice(`Solicitação de ${serviceName} estará disponível após aprovação cadastral e liberação do limite.`);
    setTimeout(() => setLockedTabNotice(null), 4000);
  };

  const handleCompleteOperation = (data: OperationCompletionData) => {
    const newOperation = createPortalOperation(data, selectedService, selectedGroup);
    setOperations([newOperation, ...operations]);
    setActiveTab('home');
    setShowOperationRequest(false);
    setShowSuccessOperationToast(true);
    setTimeout(() => setShowSuccessOperationToast(false), 5000);
  };

  const handleGroupChange = (group: string) => {
    setIsLoadingGroup(true);
    // Simulate data fetching for the new group
    setTimeout(() => {
      setSelectedGroup(group);
      setTimeout(() => {
        setIsLoadingGroup(false);
      }, 800);
    }, 1200);
  };

  const handleSelectTitulo = (id: number) => {
    setSelectedTitulos(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSelectAllTitulos = (ids: number[]) => {
    if (selectedTitulos.length === ids.length) {
      setSelectedTitulos([]);
    } else {
      setSelectedTitulos(ids);
    }
  };

  const handleRegisterConfirmacao = () => {
    // Simular registro
    alert('Confirmação registrada com sucesso para ' + selectedTitulos.length + ' títulos.');
    setShowConfirmacaoModal(false);
    setSelectedTitulos([]);
    setConfirmacaoData({ date: '', time: '', evidence: null, observacoes: '' });
  };

  const handleCanhotoSubmit = () => {
    setIsUploadingCanhoto(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        setUploadCanhotoProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          setIsUploadingCanhoto(false);
          setShowCanhotoModal(false);
          setSelectedTituloDetailsForResolution(null);
          
          if (selectedTituloDetailsForResolution) {
            const updatedList = titulosList.map(t => t.id === selectedTituloDetailsForResolution.id ? { 
              ...t, 
              actionStatus: 'Pendente de Análise', 
              status: 'Pendente de Análise',
              canhotoEnviado: true 
            } : t);
            setTitulosList(updatedList);
          }
        }, 1000);
      } else {
        setUploadCanhotoProgress(progress);
      }
    }, 400);
  };

  const onAnticipateClick = (source: 'header' | 'hero') => {
    setLockedTabNotice("Documentação em análise. Novas solicitações de antecipação estarão disponíveis após liberação do limite.");
    setTimeout(() => setLockedTabNotice(null), 4000);
  };

  const handleSelectNavItem = (item: DashboardNavItem) => {
    if (isNavItemLocked(isVerified, item.id)) {
      setLockedTabNotice(PORTAL_LOCKED_NOTICE);
      setTimeout(() => setLockedTabNotice(null), LOCKED_NOTICE_MS);
      return;
    }
    setActiveTab(item.id);
    if (window.innerWidth < DESKTOP_BREAKPOINT_PX) setIsSidebarOpen(false);
  };

  const handleConfirmValidation = () => {
    setIsWaitingValidation(false);
    setTitulosList(prev => prev.map(t => (t.actionStatus === 'Pendente de Análise' || (t.canhotoEnviado || t.linkEnviado)) ? {
      ...t,
      actionStatus: 'Confirmado',
      status: 'Confirmado',
      statusColor: 'text-green-600 bg-green-50 border-green-100'
    } : t));
    setShowSuccessApprovalToast(true);
    setTimeout(() => setShowSuccessApprovalToast(false), SUCCESS_APPROVAL_TOAST_MS);
    setHasPendingConfirmations(titulosList.some(t => t.actionStatus === 'Pendência' && !t.canhotoEnviado && !t.linkEnviado));
  };

  const handleUploadCanhotoForResolution = (titulo: Titulo) => {
    setSelectedTituloDetailsForResolution(titulo);
    setShowCanhotoModal(true);
    setCanhotoFiles([]);
    setIsUploadingCanhoto(false);
    setUploadCanhotoProgress(0);
  };

  const handleSendLinkForResolution = (titulo: Titulo) => {
    setSelectedTituloDetailsForResolution(titulo);
    setShowLinkSelectionModal(true);
  };

  const handleFinishResolution = () => {
    const hasPending = titulosList.some(t => t.actionStatus === 'Pendência');
    if (!hasPending) {
      setIsWaitingValidation(true);
    }
    setIsShowingResolveScreen(false);
  };


  return (
    <div className="min-h-screen bg-[#F8F9FA] flex">
      {/* Sidebar Overlay for Mobile */}
      <SidebarOverlay isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        isVerified={isVerified}
        activeTab={activeTab}
        onSelectItem={handleSelectNavItem}
        onClose={() => setIsSidebarOpen(false)}
        onLogout={onLogout}
      />

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
        {/* Top Header */}
        <TopHeader
          selectedGroup={selectedGroup}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          onSelectPending={setSelectedPendingTask}
          onGroupChange={handleGroupChange}
          onLogout={onLogout}
        />

        {/* Content */}
        <main className="p-4 md:p-8 max-w-[1400px] mx-auto w-full">
          {/* Unlocked Portal Toast */}
          <AnimatePresence>
            {portalUnlockedToast && <PortalUnlockedToast onClose={() => setPortalUnlockedToast(false)} />}
            {lockedTabNotice && <LockedNoticeToast message={lockedTabNotice} onClose={() => setLockedTabNotice(null)} />}
          </AnimatePresence>

          {/* Welcome Section */}
          <AnimatePresence>
            {/* Validation Waiting Toast - Global */}
            {isWaitingValidation && <ValidationWaitingToast onConfirm={handleConfirmValidation} />}

            {/* Success Approval Toast - Global */}
            {showSuccessApprovalToast && <SuccessApprovalToast onClose={() => setShowSuccessApprovalToast(false)} />}
          </AnimatePresence>

          <ResolveScreenModal
            isOpen={isShowingResolveScreen}
            hasSeenExplanation={hasSeenResolveExplanation}
            titulosList={titulosList}
            onClose={() => setIsShowingResolveScreen(false)}
            onContinue={() => setHasSeenResolveExplanation(true)}
            onUploadCanhoto={handleUploadCanhotoForResolution}
            onSendLink={handleSendLinkForResolution}
            onFinish={handleFinishResolution}
          />

          <PageHeader
            activeTab={activeTab}
            selectedGroup={selectedGroup}
            activePendingToastSource={activePendingToastSource}
            onAnticipate={onAnticipateClick}
            onDismissPendingToast={() => setActivePendingToastSource(null)}
            onGoToCarteira={() => {
              setActiveTab('carteira');
              setActivePendingToastSource(null);
            }}
          />

          {activeTab === 'home' ? (
            <HomeTab
              operations={operations}
              hasPendingConfirmations={hasPendingConfirmations}
              isWaitingValidation={isWaitingValidation}
              activePendingToastSource={activePendingToastSource}
              onNavigate={setActiveTab}
              onOpenOperation={(op) => {
                setSelectedOpDetails(op);
                setActiveTab('operacoes');
              }}
              onAnticipate={onAnticipateClick}
              onDismissPendingToast={() => setActivePendingToastSource(null)}
              onGoToCarteira={() => {
                setActiveTab('carteira');
                setActivePendingToastSource(null);
              }}
            />
          ) : activeTab === 'geral' ? (
            <GeralTab onSelectService={handleOpenOperationRequest} />
          ) : activeTab === 'carteira' ? (
            <CarteiraTab
              titulosList={titulosList}
              selectedTitulos={selectedTitulos}
              onSelectTitulo={handleSelectTitulo}
              onSelectAllTitulos={handleSelectAllTitulos}
              onOpenDetails={(row) => setSelectedTituloDetails({ ...row, currentTab: 'DETALHES_TITULO' })}
              onOpenResolve={() => {
                setHasSeenResolveExplanation(false);
                setIsShowingResolveScreen(true);
              }}
              onOpenFilter={() => setShowFilterModal(true)}
              onOpenConfirmacao={() => setShowConfirmacaoModal(true)}
            />
          ) : activeTab === 'operacoes' ? (
            <OperacoesTab
              operations={operations}
              searchOperationId={searchOperationId}
              onSearchChange={setSearchOperationId}
              onOpenDetails={setSelectedOpDetails}
              onViewServices={() => setActiveTab('geral')}
            />
          ) : (
            <DocumentVerification 
              isVerified={isVerified}
              onCompleteVerification={() => {
                setIsVerified(true);
                setActiveTab('home');
                setPortalUnlockedToast(true);
                setTimeout(() => setPortalUnlockedToast(false), 6000);
              }}
              onResetVerification={() => {
                setIsVerified(false);
                setActiveTab('documentos');
              }}
            />
          )}
        </main>
      </div>

      {/* Operation Details Modal */}
      <OperationDetailsModal
        operation={selectedOpDetails}
        onClose={() => setSelectedOpDetails(null)}
        onTabChange={(tab) => setSelectedOpDetails({ ...selectedOpDetails, currentTab: tab })}
        onResolvePending={() => setSelectedPendingTask(FIRST_PENDING_NOTIFICATION)}
        onLinkAssets={() => setShowLinkAssetsModal(true)}
        onAddXml={() => setShowAddXmlFlow(true)}
      />

      {/* Title Details Modal */}
      <TitleDetailsModal
        titulo={selectedTituloDetails}
        contacts={sacadoContactsState}
        onClose={() => setSelectedTituloDetails(null)}
        onTabChange={(tab) => setSelectedTituloDetails({ ...selectedTituloDetails, currentTab: tab })}
      />

      {/* Pending Task Modal */}
      <PendingTaskModal task={selectedPendingTask} onClose={() => setSelectedPendingTask(null)} />

      {/* Document Upload Modal */}
      <DocumentUploadModal isOpen={showDocsModal} onClose={() => setShowDocsModal(false)} />

      {/* Operation Request Flow */}
      <OperationRequestModal
        isOpen={showOperationRequest}
        serviceName={selectedService}
        onClose={() => setShowOperationRequest(false)}
        onComplete={handleCompleteOperation}
      />

      {/* Link Assets Modal */}
      <LinkAssetsModal isOpen={showLinkAssetsModal} onClose={() => setShowLinkAssetsModal(false)} />

      {/* Add XML Modal (Simplified) */}
      <AddXmlModal isOpen={showAddXmlFlow} onClose={() => setShowAddXmlFlow(false)} />

      {/* Canhoto Upload Modal */}
      <CanhotoUploadModal
        isOpen={showCanhotoModal}
        titulo={selectedTituloDetailsForResolution}
        files={canhotoFiles}
        isUploading={isUploadingCanhoto}
        progress={uploadCanhotoProgress}
        onPickFile={() => {
          setCanhotoFiles([{ name: "CANHOTO_NF_" + selectedTituloDetailsForResolution?.numero + ".png", size: "2.4 MB" }]);
        }}
        onRemoveFile={() => setCanhotoFiles([])}
        onClose={() => {
          setShowCanhotoModal(false);
          setSelectedTituloDetailsForResolution(null);
        }}
        onSubmit={handleCanhotoSubmit}
      />

      {/* Filtros Carteira Modal */}
      <CarteiraFilterModal isOpen={showFilterModal} onClose={() => setShowFilterModal(false)} />

      {/* Success Notification Toast */}
      <AnimatePresence>
        {showSuccessOperationToast && <SuccessOperationToast onClose={() => setShowSuccessOperationToast(false)} />}
      </AnimatePresence>

      {/* Loading Overlay for Group Switch */}
      <AnimatePresence>
        {isLoadingGroup && <GroupSwitchLoadingOverlay selectedGroup={selectedGroup} />}
      </AnimatePresence>

      {/* Confirmation Modal */}
      <ConfirmacaoModal
        isOpen={showConfirmacaoModal}
        selectedCount={selectedTitulos.length}
        data={confirmacaoData}
        onDataChange={setConfirmacaoData}
        onClose={() => setShowConfirmacaoModal(false)}
        onSubmit={handleRegisterConfirmacao}
      />

      <LinkSelectionModal
        isOpen={showLinkSelectionModal}
        titulo={selectedTituloDetailsForResolution}
        contacts={sacadoContactsState.sacadoContacts}
        selectedChannels={selectedChannels}
        selectedSacados={selectedSacados}
        onToggleChannel={(channelId) => setSelectedChannels((prev) => toggleListItem(prev, channelId))}
        onToggleSacado={(contactId) => setSelectedSacados((prev) => toggleListItem(prev, contactId))}
        onToggleAllSacados={() => {
          const allIds = sacadoContactsState.sacadoContacts.map(c => c.id);
          if (selectedSacados.length === allIds.length) setSelectedSacados([]);
          else setSelectedSacados(allIds);
        }}
        onClose={() => {
          setShowLinkSelectionModal(false);
          setSelectedTituloDetailsForResolution(null);
        }}
        onSubmit={() => {
          const updatedList = titulosList.map(t => t.id === selectedTituloDetailsForResolution.id ? {
            ...t,
            actionStatus: 'Pendente de Análise',
            status: 'Pendente de Análise',
            linkEnviado: true
          } : t);

          setTitulosList(updatedList);

          const hasPending = updatedList.some(t => t.actionStatus === 'Pendência');
          if (!hasPending) {
            setHasPendingConfirmations(false);
          }

          setShowLinkSelectionModal(false);
          setSelectedTituloDetailsForResolution(null);
        }}
      />
    </div>
  );
};
