import { AnimatePresence } from 'motion/react';
import { ArrowRight, Zap } from 'lucide-react';
import { PendingBlockToast } from '@/flows/portal/dashboard/toasts/PendingBlockToast';
import { getDashboardHeading } from '@/utils/dashboardHeading';
import type { DashboardTab, PendingToastSource } from '@/types/dashboard';

interface PageHeaderProps {
  activeTab: DashboardTab;
  selectedGroup: string;
  isLimitReleased: boolean;
  activePendingToastSource: PendingToastSource | null;
  onAnticipate: (source: PendingToastSource) => void;
  onStartCreditAnalysis: () => void;
  onDismissPendingToast: () => void;
  onGoToCarteira: () => void;
}

export const PageHeader = ({
  activeTab,
  selectedGroup,
  isLimitReleased,
  activePendingToastSource,
  onAnticipate,
  onStartCreditAnalysis,
  onDismissPendingToast,
  onGoToCarteira,
}: PageHeaderProps) => {
  const heading = getDashboardHeading(activeTab, selectedGroup, isLimitReleased);

  return (
    <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gci tracking-tight">
          {heading.title}
        </h1>
        <p className="text-slate-500 text-sm md:text-base font-medium mt-1">
          {heading.subtitle}
        </p>
      </div>
      {(activeTab === 'operacoes' || activeTab === 'home') && (
          <div className="flex gap-3">
            <div className="relative group">
              {isLimitReleased ? (
                <button 
                  onClick={() => onAnticipate('header')}
                  className="bg-agro-orange text-white px-8 py-3.5 rounded-2xl font-bold text-sm hover:bg-agro-orange/90 transition-all shadow-xl shadow-agro-orange/20 active:scale-[0.98] flex items-center gap-3 uppercase tracking-wider"
                >
                  Fazer Antecipação
                  <Zap size={18} fill="currentColor" />
                </button>
              ) : (
                <button 
                  onClick={onStartCreditAnalysis}
                  className="bg-agro-orange text-white px-8 py-3.5 rounded-2xl font-bold text-sm hover:bg-agro-orange/90 transition-all shadow-xl shadow-agro-orange/20 active:scale-[0.98] flex items-center gap-3 uppercase tracking-wider"
                >
                  Liberar meu limite
                  <ArrowRight size={18} />
                </button>
              )}
              <AnimatePresence>
                {isLimitReleased && activePendingToastSource === 'header' && (
                  <PendingBlockToast source="header" onClose={onDismissPendingToast} onGoToCarteira={onGoToCarteira} />
                )}
              </AnimatePresence>
            </div>
          </div>
      )}
    </div>
  );
};
