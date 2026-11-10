import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ArrowLeft, FileSignature } from 'lucide-react';
import { OnboardingPageShell } from '@/components/layout/OnboardingPageShell';
import { OnboardingProgressSteps } from '@/components/layout/OnboardingProgressSteps';
import { MOCK_COMPANY_CNPJ, MOCK_COMPANY_NAME } from '@/mocks/onboardingCompany';
import type { SignerRepresentative } from '@/types/signer';
import { useSignatureRepresentatives } from './useSignatureRepresentatives';
import { SignatureCompanyCard } from './SignatureCompanyCard';
import { SignerList } from './SignerList';
import { SignatureSimulationControls } from './SignatureSimulationControls';

interface AccountOpeningSignatureProps {
  representatives: SignerRepresentative[];
  companyName?: string;
  cnpj?: string;
  onAdvanceToAnalysis: () => void;
  onBack: () => void;
}

// PLACEHOLDER: mecanismo de assinatura a definir
export const AccountOpeningSignature: React.FC<AccountOpeningSignatureProps> = ({
  representatives: initialRepresentatives,
  companyName = MOCK_COMPANY_NAME,
  cnpj = MOCK_COMPANY_CNPJ,
  onAdvanceToAnalysis,
  onBack,
}) => {
  const {
    reps,
    totalSigners,
    signedCount,
    allSigned,
    handleToggleSignSingle,
    handleSimulateAllSigned,
  } = useSignatureRepresentatives(initialRepresentatives);

  return (
    <OnboardingPageShell
      sectionLabel="Portal do Cliente • Assinatura da Abertura de Conta"
      mainClassName="max-w-5xl w-full mx-auto my-auto py-6 space-y-4"
      headerAction={
        <button
          type="button"
          onClick={onBack}
          className="text-xs font-semibold text-slate-500 hover:text-gci flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <ArrowLeft size={14} />
          Voltar para Documentos
        </button>
      }
    >
      {/* Stepper Indicator: Documentos -> Assinatura -> Análise */}
      <OnboardingProgressSteps currentStep={3} />

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden"
      >
        {/* Header Banner */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-[#083C4A] to-[#0a4c5e] text-white">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-agro-orange border border-white/10 mb-3 shadow-inner">
            <FileSignature size={26} />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Assinatura da abertura de conta
          </h1>
          <p className="text-xs sm:text-sm text-white/80 font-medium mt-2 leading-relaxed">
            Enviamos o termo de abertura para assinatura dos sócios e representantes. A análise começa quando todos assinarem.
          </p>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <SignatureCompanyCard
            companyName={companyName}
            cnpj={cnpj}
            allSigned={allSigned}
            signedCount={signedCount}
            totalSigners={totalSigners}
          />

          {/* List of Representatives */}
          <SignerList reps={reps} allSigned={allSigned} onToggleSign={handleToggleSignSingle} />

          {/* Simulation controls */}
          <SignatureSimulationControls onSimulateAllSigned={handleSimulateAllSigned} />

          {/* Advance Button */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
            <button
              type="button"
              disabled={!allSigned}
              onClick={onAdvanceToAnalysis}
              className={`w-full sm:w-auto px-8 py-3.5 font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg ${
                allSigned
                  ? 'bg-gci hover:bg-gci-hover text-white shadow-gci/10 cursor-pointer active:scale-95'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
              }`}
            >
              <span>Continuar para análise</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </motion.div>
    </OnboardingPageShell>
  );
};
