import { LIMIT_AVAILABLE_LABEL, LIMIT_EMPTY_LABEL } from '@/constants/analysis';
import { DocumentVerification } from '@/flows/portal/complete-cadastro/DocumentVerification';
import { CarteiraTab } from '@/flows/portal/dashboard/carteira/CarteiraTab';
import { HomeTab } from '@/flows/portal/dashboard/home/HomeTab';
import type { CarteiraState } from '@/flows/portal/dashboard/hooks/useCarteira';
import type { DashboardNavigation } from '@/flows/portal/dashboard/hooks/useDashboardNavigation';
import type { OperationsState } from '@/flows/portal/dashboard/hooks/useOperations';
import type { OverlaysState } from '@/flows/portal/dashboard/hooks/useDashboardOverlays';
import type { ResolveScreenState } from '@/flows/portal/dashboard/hooks/useResolveScreen';
import { GeralTab } from '@/flows/portal/dashboard/minhas-informacoes/GeralTab';
import { OperacoesTab } from '@/flows/portal/dashboard/operacoes/OperacoesTab';

interface DashboardTabContentProps {
  nav: DashboardNavigation;
  ops: OperationsState;
  carteira: CarteiraState;
  overlays: OverlaysState;
  resolveScreen: ResolveScreenState;
  onGoToCarteira: () => void;
}

/** Conteúdo da aba ativa; qualquer aba desconhecida cai na Análise de Crédito. */
export const DashboardTabContent = ({
  nav,
  ops,
  carteira,
  overlays,
  resolveScreen,
  onGoToCarteira,
}: DashboardTabContentProps) => {
  switch (nav.activeTab) {
    case 'home':
      return (
        <HomeTab
          operations={ops.operations}
          hasPendingConfirmations={carteira.hasPendingConfirmations}
          isWaitingValidation={resolveScreen.isWaitingValidation}
          isLimitReleased={nav.isVerified}
          activePendingToastSource={overlays.activePendingToastSource}
          onNavigate={nav.setActiveTab}
          onOpenOperation={(op) => {
            ops.setSelectedOpDetails(op);
            nav.setActiveTab('operacoes');
          }}
          onAnticipate={nav.onAnticipateClick}
          onStartCreditAnalysis={nav.startCreditAnalysis}
          onDismissPendingToast={() => overlays.setActivePendingToastSource(null)}
          onGoToCarteira={onGoToCarteira}
        />
      );
    case 'geral':
      return (
        <GeralTab
          limitLabel={nav.isVerified ? LIMIT_AVAILABLE_LABEL : LIMIT_EMPTY_LABEL}
          onSelectService={nav.handleOpenOperationRequest}
        />
      );
    case 'carteira':
      return (
        <CarteiraTab
          titulosList={carteira.titulosList}
          selectedTitulos={carteira.selectedTitulos}
          onSelectTitulo={carteira.handleSelectTitulo}
          onSelectAllTitulos={carteira.handleSelectAllTitulos}
          onOpenDetails={carteira.handleOpenTituloDetails}
          onOpenResolve={resolveScreen.openResolveScreen}
          onOpenFilter={() => carteira.setShowFilterModal(true)}
          onOpenConfirmacao={() => carteira.setShowConfirmacaoModal(true)}
        />
      );
    case 'operacoes':
      return (
        <OperacoesTab
          operations={ops.operations}
          searchOperationId={ops.searchOperationId}
          onSearchChange={ops.setSearchOperationId}
          onOpenDetails={ops.setSelectedOpDetails}
          onViewServices={() => nav.setActiveTab('geral')}
        />
      );
    default:
      return (
        <DocumentVerification
          isVerified={nav.isVerified}
          onCompleteVerification={nav.handleCompleteVerification}
          onResetVerification={nav.handleResetVerification}
        />
      );
  }
};
