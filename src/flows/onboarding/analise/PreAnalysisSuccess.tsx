import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Sparkles, Building2, ArrowRight } from 'lucide-react';
import { OnboardingPageShell } from '@/components/layout/OnboardingPageShell';
import { MOCK_COMPANY_CNPJ, MOCK_COMPANY_NAME } from '@/mocks/onboardingCompany';
import { MOCK_USER_NAME } from '@/mocks/onboardingUser';
import { PreAnalysisCreditOffer } from './PreAnalysisCreditOffer';
import { PreAnalysisNextSteps } from './PreAnalysisNextSteps';

interface PreAnalysisSuccessProps {
  onContinueToAccount: () => void;
  onDirectToDocuments?: () => void;
}

export const PreAnalysisSuccess: React.FC<PreAnalysisSuccessProps> = ({
  onContinueToAccount,
}) => {
  return (
    <OnboardingPageShell
      sectionLabel="Portal do Cliente • Pré-Análise"
      mainClassName="max-w-5xl w-full mx-auto my-auto py-8"
      headerAction={
        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 flex items-center gap-1.5">
          <CheckCircle2 size={14} className="text-emerald-600" />
          Elegibilidade Aprovada
        </span>
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
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-300 border border-emerald-400/30 mb-4">
            <Sparkles size={26} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Pré-análise concluída com sucesso!
          </h1>
          <p className="text-xs sm:text-sm text-white/80 font-medium mt-2 leading-relaxed">
            Identificamos elegibilidade inicial para abertura da sua conta empresarial e liberação de limites operacionais junto ao Grupo Ceres Investimentos.
          </p>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Approved Company Card */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
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

            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
              Aprovado
            </span>
          </div>

          <PreAnalysisCreditOffer />

          {/* Next Steps Structure */}
          <PreAnalysisNextSteps />

          {/* Action CTA */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
            <button
              type="button"
              onClick={onContinueToAccount}
              className="w-full sm:w-auto px-8 py-3.5 bg-gci hover:bg-gci-hover text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-gci/10 flex items-center justify-center gap-2 active:scale-95"
            >
              Acessar Dados da Minha Conta
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </motion.div>
    </OnboardingPageShell>
  );
};
