import { AnimatePresence } from 'motion/react';
import {
  DEFAULT_OPERATION_DETAILS_TAB,
  OPERATION_DETAILS_TABS,
} from '@/constants/operationDetails';
import type { OperationDetailsTab, PortalOperation } from '@/types/portalOperation';
import { DetailsTabBar } from '@/flows/portal/dashboard/modais/comum/DetailsTabBar';
import { FullscreenDetailsModal } from '@/flows/portal/dashboard/modais/comum/FullscreenDetailsModal';
import { OperationAssetsTab } from './OperationAssetsTab';
import { OperationAttachmentsTab } from './OperationAttachmentsTab';
import { OperationDetailsSidebar } from './OperationDetailsSidebar';
import { OperationGeneralTab } from './OperationGeneralTab';
import { OperationPendingBanner } from './OperationPendingBanner';
import { OperationRejectionBanner } from './OperationRejectionBanner';

interface OperationDetailsModalProps {
  operation: PortalOperation | null;
  onClose: () => void;
  onTabChange: (tab: OperationDetailsTab) => void;
  onResolvePending: () => void;
  onLinkAssets: () => void;
  onAddXml: () => void;
}

export const OperationDetailsModal = ({
  operation,
  onClose,
  onTabChange,
  onResolvePending,
  onLinkAssets,
  onAddXml,
}: OperationDetailsModalProps) => (
  <AnimatePresence>
    {operation && (
      <FullscreenDetailsModal
        title={<>Detalhes da <span className="text-agro-orange">Operação</span>.</>}
        description="Visualize todas as informações, ativos e anexos desta operação."
        sidebar={<OperationDetailsSidebar status={operation.status} />}
        onClose={onClose}
      >
        {/* Rejection Banner */}
        {operation.status === 'Rejeitado' && <OperationRejectionBanner operation={operation} />}

        {/* Pending Action Section */}
        {operation.status !== 'Rejeitado' && <OperationPendingBanner onResolve={onResolvePending} />}

        {/* Tabs for Details */}
        <DetailsTabBar
          tabs={OPERATION_DETAILS_TABS}
          activeTab={operation.currentTab || DEFAULT_OPERATION_DETAILS_TAB}
          onChange={onTabChange}
          indicatorLayoutId="activeTabDetails"
          containerClassName="flex gap-8 border-b border-gray-100 mb-10"
          buttonClassName="pb-4 text-xs font-black uppercase tracking-widest transition-all relative"
        />

        {/* Tab Content */}
        <div className="min-h-[400px]">
          {(operation.currentTab || DEFAULT_OPERATION_DETAILS_TAB) === 'DADOS_GERAIS' && (
            <OperationGeneralTab operation={operation} />
          )}

          {operation.currentTab === 'ATIVOS' && (
            <OperationAssetsTab onLinkAssets={onLinkAssets} onAddXml={onAddXml} />
          )}

          {operation.currentTab === 'ANEXOS' && <OperationAttachmentsTab />}
        </div>
      </FullscreenDetailsModal>
    )}
  </AnimatePresence>
);
