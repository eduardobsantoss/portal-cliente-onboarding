import { AnimatePresence } from 'motion/react';
import type { DashboardTab, PendingToastSource } from '@/types/dashboard';
import type { PortalOperation } from '@/types/portalOperation';
import { LimitBreakdown } from './LimitBreakdown';
import { LimitHero } from './LimitHero';
import { PendingActionsPopup } from './PendingActionsPopup';
import { RecentOperations } from './RecentOperations';

interface HomeTabProps {
  operations: PortalOperation[];
  hasPendingConfirmations: boolean;
  isWaitingValidation: boolean;
  activePendingToastSource: PendingToastSource | null;
  onNavigate: (tab: DashboardTab) => void;
  onOpenOperation: (op: PortalOperation) => void;
  onAnticipate: (source: PendingToastSource) => void;
  onDismissPendingToast: () => void;
  onGoToCarteira: () => void;
}

export const HomeTab = ({
  operations,
  hasPendingConfirmations,
  isWaitingValidation,
  activePendingToastSource,
  onNavigate,
  onOpenOperation,
  onAnticipate,
  onDismissPendingToast,
  onGoToCarteira,
}: HomeTabProps) => (
  <div className="space-y-8">
    <AnimatePresence>
      {/* Fixed Clean Popup for Pending Actions */}
      {hasPendingConfirmations && !isWaitingValidation && (
        <PendingActionsPopup onResolve={() => onNavigate('carteira')} />
      )}
    </AnimatePresence>

    {/* Aggressive Limit Hero */}
    <LimitHero
      activePendingToastSource={activePendingToastSource}
      onAnticipate={() => onAnticipate('hero')}
      onDismissPendingToast={onDismissPendingToast}
      onGoToCarteira={onGoToCarteira}
    />

    {/* Limit Breakdown */}
    <LimitBreakdown />

    {/* Recent Operations on Home */}
    <RecentOperations
      operations={operations}
      onViewAll={() => onNavigate('operacoes')}
      onOpenOperation={onOpenOperation}
    />
  </div>
);
