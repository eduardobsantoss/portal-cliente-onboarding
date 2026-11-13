import { AnimatePresence } from 'motion/react';
import { LIMIT_AVAILABLE_LABEL, LIMIT_EMPTY_LABEL } from '@/constants/analysis';
import type { DashboardTab, PendingToastSource } from '@/types/dashboard';
import type { PortalOperation } from '@/types/portalOperation';
import { CreditAnalysisBanner } from './CreditAnalysisBanner';
import { LimitBreakdown } from './LimitBreakdown';
import { LimitHero } from './LimitHero';
import { PendingActionsPopup } from './PendingActionsPopup';
import { RecentOperations } from './RecentOperations';

interface HomeTabProps {
  operations: PortalOperation[];
  hasPendingConfirmations: boolean;
  isWaitingValidation: boolean;
  isLimitReleased: boolean;
  activePendingToastSource: PendingToastSource | null;
  onNavigate: (tab: DashboardTab) => void;
  onOpenOperation: (op: PortalOperation) => void;
  onAnticipate: (source: PendingToastSource) => void;
  onStartCreditAnalysis: () => void;
  onDismissPendingToast: () => void;
  onGoToCarteira: () => void;
}

export const HomeTab = ({
  operations,
  hasPendingConfirmations,
  isWaitingValidation,
  isLimitReleased,
  activePendingToastSource,
  onNavigate,
  onOpenOperation,
  onAnticipate,
  onStartCreditAnalysis,
  onDismissPendingToast,
  onGoToCarteira,
}: HomeTabProps) => (
  <div className="space-y-8">
    <AnimatePresence>
      {hasPendingConfirmations && !isWaitingValidation && (
        <PendingActionsPopup onResolve={() => onNavigate('carteira')} />
      )}
    </AnimatePresence>

    <LimitHero
      isLimitReleased={isLimitReleased}
      activePendingToastSource={activePendingToastSource}
      onAnticipate={() => onAnticipate('hero')}
      onStartCreditAnalysis={onStartCreditAnalysis}
      onDismissPendingToast={onDismissPendingToast}
      onGoToCarteira={onGoToCarteira}
    />

    {!isLimitReleased && <CreditAnalysisBanner onStart={onStartCreditAnalysis} />}

    <LimitBreakdown
      limitLabel={isLimitReleased ? LIMIT_AVAILABLE_LABEL : LIMIT_EMPTY_LABEL}
      isLimitReleased={isLimitReleased}
    />

    <RecentOperations
      operations={operations}
      onViewAll={() => onNavigate('operacoes')}
      onOpenOperation={onOpenOperation}
    />
  </div>
);
