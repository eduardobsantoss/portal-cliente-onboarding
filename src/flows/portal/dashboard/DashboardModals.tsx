import type { CanhotoUploadState } from '@/flows/portal/dashboard/hooks/useCanhotoUpload';
import type { CarteiraState } from '@/flows/portal/dashboard/hooks/useCarteira';
import type { OverlaysState } from '@/flows/portal/dashboard/hooks/useDashboardOverlays';
import type { LinkSelectionState } from '@/flows/portal/dashboard/hooks/useLinkSelection';
import type { OperationsState } from '@/flows/portal/dashboard/hooks/useOperations';
import type { SacadoContactsState } from '@/flows/portal/dashboard/hooks/useSacadoContacts';
import { AddXmlModal } from '@/flows/portal/dashboard/modais/AddXmlModal';
import { CanhotoUploadModal } from '@/flows/portal/dashboard/modais/CanhotoUploadModal/CanhotoUploadModal';
import { ConfirmacaoModal } from '@/flows/portal/dashboard/modais/ConfirmacaoModal';
import { DocumentUploadModal } from '@/flows/portal/dashboard/modais/DocumentUploadModal';
import { CarteiraFilterModal } from '@/flows/portal/dashboard/modais/FilterModal/CarteiraFilterModal';
import { LinkAssetsModal } from '@/flows/portal/dashboard/modais/LinkAssetsModal';
import { LinkSelectionModal } from '@/flows/portal/dashboard/modais/LinkSelectionModal/LinkSelectionModal';
import { OperationDetailsModal } from '@/flows/portal/dashboard/modais/OperationDetailsModal/OperationDetailsModal';
import { OperationRequestModal } from '@/flows/portal/dashboard/modais/OperationRequestModal';
import { PendingTaskModal } from '@/flows/portal/dashboard/modais/PendingTaskModal';
import { TitleDetailsModal } from '@/flows/portal/dashboard/modais/TitleDetailsModal/TitleDetailsModal';
import { FIRST_PENDING_NOTIFICATION } from '@/mocks/portalNotifications';
import type { Titulo } from '@/types/titulo';

interface DashboardModalsProps {
  ops: OperationsState;
  carteira: CarteiraState;
  overlays: OverlaysState;
  sacado: SacadoContactsState;
  canhoto: CanhotoUploadState;
  link: LinkSelectionState;
  resolutionTitulo: Titulo | null;
}

/** Todos os modais do portal; cada um decide sozinho se está aberto a partir das props. */
export const DashboardModals = ({ ops, carteira, overlays, sacado, canhoto, link, resolutionTitulo }: DashboardModalsProps) => (
  <>
    {/* Operation Details Modal */}
    <OperationDetailsModal
      operation={ops.selectedOpDetails}
      onClose={() => ops.setSelectedOpDetails(null)}
      onTabChange={(tab) => ops.setSelectedOpDetails({ ...ops.selectedOpDetails, currentTab: tab })}
      onResolvePending={() => overlays.setSelectedPendingTask(FIRST_PENDING_NOTIFICATION)}
      onLinkAssets={() => overlays.setShowLinkAssetsModal(true)}
      onAddXml={() => overlays.setShowAddXmlFlow(true)}
    />

    {/* Title Details Modal */}
    <TitleDetailsModal
      titulo={carteira.selectedTituloDetails}
      contacts={sacado}
      onClose={() => carteira.setSelectedTituloDetails(null)}
      onTabChange={(tab) => carteira.setSelectedTituloDetails({ ...carteira.selectedTituloDetails, currentTab: tab })}
    />

    {/* Pending Task Modal */}
    <PendingTaskModal task={overlays.selectedPendingTask} onClose={() => overlays.setSelectedPendingTask(null)} />

    {/* Document Upload Modal */}
    <DocumentUploadModal isOpen={overlays.showDocsModal} onClose={() => overlays.setShowDocsModal(false)} />

    {/* Operation Request Flow */}
    <OperationRequestModal
      isOpen={ops.showOperationRequest}
      serviceName={ops.selectedService}
      onClose={() => ops.setShowOperationRequest(false)}
      onComplete={ops.handleCompleteOperation}
    />

    {/* Link Assets Modal */}
    <LinkAssetsModal isOpen={overlays.showLinkAssetsModal} onClose={() => overlays.setShowLinkAssetsModal(false)} />

    {/* Add XML Modal (Simplified) */}
    <AddXmlModal isOpen={overlays.showAddXmlFlow} onClose={() => overlays.setShowAddXmlFlow(false)} />

    {/* Canhoto Upload Modal */}
    <CanhotoUploadModal
      isOpen={canhoto.showCanhotoModal}
      titulo={resolutionTitulo}
      files={canhoto.canhotoFiles}
      isUploading={canhoto.isUploadingCanhoto}
      progress={canhoto.uploadCanhotoProgress}
      onPickFile={canhoto.pickCanhotoFile}
      onRemoveFile={canhoto.removeCanhotoFile}
      onClose={canhoto.closeCanhotoModal}
      onSubmit={canhoto.handleCanhotoSubmit}
    />

    {/* Filtros Carteira Modal */}
    <CarteiraFilterModal isOpen={carteira.showFilterModal} onClose={() => carteira.setShowFilterModal(false)} />

    {/* Confirmation Modal */}
    <ConfirmacaoModal
      isOpen={carteira.showConfirmacaoModal}
      selectedCount={carteira.selectedTitulos.length}
      data={carteira.confirmacaoData}
      onDataChange={carteira.setConfirmacaoData}
      onClose={() => carteira.setShowConfirmacaoModal(false)}
      onSubmit={carteira.handleRegisterConfirmacao}
    />

    <LinkSelectionModal
      isOpen={link.showLinkSelectionModal}
      titulo={resolutionTitulo}
      contacts={sacado.sacadoContacts}
      selectedChannels={link.selectedChannels}
      selectedSacados={link.selectedSacados}
      onToggleChannel={link.toggleChannel}
      onToggleSacado={link.toggleSacado}
      onToggleAllSacados={link.toggleAllSacados}
      onClose={link.closeLinkSelectionModal}
      onSubmit={link.submitLinkSelection}
    />
  </>
);
