import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Building2, FileSearch, Sparkles, ArrowRight } from 'lucide-react';
import { OnboardingPageShell } from '@/components/layout/OnboardingPageShell';
import { ANALYSIS_STEPS } from '@/constants/analysis';
import { MOCK_COMPANY_CNPJ, MOCK_COMPANY_NAME } from '@/mocks/onboardingCompany';
import { MOCK_USER_NAME } from '@/mocks/onboardingUser';
import { useAnalysisProgress } from './useAnalysisProgress';
import { AnalysisProgressBar } from './AnalysisProgressBar';
import { AnalysisStepRow } from './AnalysisStepRow';

interface AnalysisLoadingProps {
  onComplete: () => void;
  onFastForwardPending?: () => void;
  onReject?: () => void;
}

export const AnalysisLoading: React.FC<AnalysisLoadingProps> = ({
  onComplete,
  onFastForwardPending,
  onReject,
}) => {
  const { currentStepIndex, progress } = useAnalysisProgress({ onComplete, onFastForwardPending });

  return (
    <OnboardingPageShell
      sectionLabel="Portal do Cliente • Abertura de Conta"
      mainClassName="max-w-2xl w-full mx-auto my-auto py-8"
      headerAction={
        <div className="flex items-center gap-2">
          <button
            onClick={onComplete}
            className="text-[11px] font-bold text-gci bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
            title="Acelerar para aprovação imediata (Demo)"
          >
            <Sparkles size={14} className="text-emerald-600" />
            <span>Aprovar</span>
          </button>

          {onReject && (
            <button
              onClick={onReject}
              className="text-[11px] font-bold text-slate-500 hover:text-red-600 bg-slate-100 hover:bg-red-50 border border-slate-200 px-3 py-1.5 rounded-xl transition-all"
              title="Simular fluxo de recusa"
            >
              Recusa
            </button>
          )}
        </div>
      }
    >
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden"
      >
        {/* Header Banner */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-[#083C4A] to-[#0a4c5e] text-white">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-agro-orange border border-white/10 mb-2">
            <FileSearch size={26} />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-3">
            Analisando suas informações
          </h1>
          <p className="text-xs sm:text-sm text-white/80 font-medium mt-2 max-w-xl leading-relaxed">
            Cruzamos os dados do seu documento com birôs de crédito e bases regulatórias para viabilizar sua conta com total segurança.
          </p>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Target Company summary card */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-gci shadow-sm">
                <Building2 size={20} />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                  {MOCK_COMPANY_NAME}
                </h4>
                <p className="text-[11px] font-semibold text-slate-500">
                  CNPJ: {MOCK_COMPANY_CNPJ} • {MOCK_USER_NAME}
                </p>
              </div>
            </div>

            <span className="hidden sm:inline-flex text-[11px] font-bold text-gci bg-sky-50 px-2.5 py-1 rounded-full border border-sky-100">
              Em Análise
            </span>
          </div>

          {/* Progress Bar */}
          <AnalysisProgressBar progress={progress} />

          {/* Dynamic Step Checklist */}
          <div className="space-y-3 pt-2">
            {ANALYSIS_STEPS.map((step, idx) => (
              <AnalysisStepRow
                key={step.id}
                step={step}
                idx={idx}
                currentStepIndex={currentStepIndex}
              />
            ))}
          </div>

          {/* Subtle disclaimer */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={15} className="text-gci" />
              Segurança bancária com criptografia de ponta a ponta
            </span>

            {onFastForwardPending && (
              <button
                type="button"
                onClick={onFastForwardPending}
                className="text-xs font-bold text-slate-600 hover:text-gci flex items-center gap-1 hover:underline"
              >
                Ver status da análise
                <ArrowRight size={14} />
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </OnboardingPageShell>
  );
};
