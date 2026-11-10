import React from 'react';
import { motion } from 'motion/react';
import { Clock, LogOut } from 'lucide-react';
import { OnboardingPageShell } from '@/components/layout/OnboardingPageShell';
import { OnboardingProgressSteps } from '@/components/layout/OnboardingProgressSteps';
import { AnalysisPendingSummary } from './AnalysisPendingSummary';
import { AnalysisDeadlineNotice } from './AnalysisDeadlineNotice';
import { AnalysisSafeExitBanner } from './AnalysisSafeExitBanner';
import { AnalysisDemoControls } from './AnalysisDemoControls';

interface AnalysisPendingProps {
  onSimulateApprove: () => void;
  onSimulateReject: () => void;
  onBackToLogin: () => void;
}

export const AnalysisPending: React.FC<AnalysisPendingProps> = ({
  onSimulateApprove,
  onSimulateReject,
  onBackToLogin,
}) => {
  return (
    <OnboardingPageShell
      sectionLabel="Portal do Cliente • Status da Solicitação"
      mainClassName="max-w-2xl w-full mx-auto my-auto py-8 space-y-4"
      headerAction={
        <button
          onClick={onBackToLogin}
          className="text-xs font-semibold text-slate-500 hover:text-gci flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <LogOut size={14} />
          Sair com Segurança
        </button>
      }
    >
      {/* Stepper Indicator: Dados -> Documentos -> Assinatura -> Análise */}
      <OnboardingProgressSteps currentStep={4} />

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-[#083C4A] to-[#0a4c5e] text-white">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-agro-orange border border-white/10">
            <Clock size={26} />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-4">
            Estamos analisando suas informações
          </h1>
          <p className="text-xs sm:text-sm text-white/80 font-medium mt-2 max-w-xl leading-relaxed">
            Recebemos seus dados com sucesso. Estamos analisando e entraremos em contato.
          </p>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Company identification */}
          <AnalysisPendingSummary />

          {/* Email Notification Highlight Box & Prazo */}
          <AnalysisDeadlineNotice />

          {/* Safe exit banner */}
          <AnalysisSafeExitBanner />

          {/* Simulation / Interactive controls for presentation */}
          <AnalysisDemoControls
            onSimulateApprove={onSimulateApprove}
            onSimulateReject={onSimulateReject}
          />
        </div>
      </motion.div>
    </OnboardingPageShell>
  );
};
