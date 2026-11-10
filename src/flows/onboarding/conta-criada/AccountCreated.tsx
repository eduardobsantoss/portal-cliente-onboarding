import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Landmark } from 'lucide-react';
import { OnboardingPageShell } from '@/components/layout/OnboardingPageShell';
import { MOCK_ACCOUNT_INFO } from '@/mocks/accountCreated';
import { AccountPassCard } from './AccountPassCard';
import { AppDownloadCard } from './AppDownloadCard';
import { NextStepNotice } from './NextStepNotice';
import { AppDownloadModal } from './AppDownloadModal';

interface AccountCreatedProps {
  onContinueToCompleteRegistration: () => void;
}

export const AccountCreated: React.FC<AccountCreatedProps> = ({
  onContinueToCompleteRegistration,
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isAppModalOpen, setIsAppModalOpen] = useState(false);
  const [downloadFeedback, setDownloadFeedback] = useState<string | null>(null);

  const accountInfo = MOCK_ACCOUNT_INFO;

  const handleCopy = (field: string, value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleStoreClick = (feedback: string) => {
    setDownloadFeedback(feedback);
    setTimeout(() => setDownloadFeedback(null), 3500);
  };

  return (
    <OnboardingPageShell
      sectionLabel="Portal do Cliente • Conta Ativa"
      mainClassName="max-w-5xl w-full mx-auto my-auto py-8"
      beforeFooter={
        /* Modal Baixar App Ceres Agrofinance */
        isAppModalOpen && (
          <AppDownloadModal
            downloadFeedback={downloadFeedback}
            onClose={() => setIsAppModalOpen(false)}
            onStoreClick={handleStoreClick}
          />
        )
      }
    >
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden"
      >
        {/* Header Banner - Celebratory */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-[#083C4A] to-[#0a4c5e] text-white">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-agro-orange border border-white/10">
            <Landmark size={26} />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-4">
            Sua Conta Digital GCI está aberta!
          </h1>
          <p className="text-xs sm:text-sm text-white/80 font-medium mt-2 leading-relaxed">
            Parabéns! Sua conta corrente empresarial junto ao Grupo Ceres Investimentos foi criada com sucesso e já está pronta para uso.
          </p>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Bank Card / Account Pass */}
          <AccountPassCard accountInfo={accountInfo} copiedField={copiedField} onCopy={handleCopy} />

          {/* Download App Ceres Agrofinance - Muted & Discreet */}
          <AppDownloadCard onOpenModal={() => setIsAppModalOpen(true)} />

          {/* Next step notice box */}
          <NextStepNotice />

          {/* Unique CTA Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={onContinueToCompleteRegistration}
              className="w-full py-4 bg-gci hover:bg-gci-hover text-white font-bold text-sm rounded-xl transition-all shadow-xl shadow-gci/15 flex items-center justify-center gap-2 active:scale-95 group"
            >
              Continuar para completar meu cadastro
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </motion.div>
    </OnboardingPageShell>
  );
};
