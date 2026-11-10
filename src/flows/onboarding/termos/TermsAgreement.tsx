import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, ChevronRight, ArrowLeft } from 'lucide-react';
import { OnboardingPageShell } from '@/components/layout/OnboardingPageShell';
import { useTermsAgreement } from './useTermsAgreement';
import { TermsConsentCheckbox } from './TermsConsentCheckbox';
import { TermsDocumentModal } from './TermsDocumentModal';

interface TermsAgreementProps {
  onAccept: () => void;
  onBackToLogin: () => void;
}

export const TermsAgreement: React.FC<TermsAgreementProps> = ({
  onAccept,
  onBackToLogin
}) => {
  const {
    accepted,
    setAccepted,
    activeDocModal,
    setActiveDocModal,
    handleSubmit,
    handleDownload,
    handleAgreeAndClose,
  } = useTermsAgreement({ onAccept });

  return (
    <OnboardingPageShell
      sectionLabel="Portal do Cliente • Onboarding"
      mainClassName="max-w-5xl w-full mx-auto my-auto py-8"
      headerAction={
        <button
          onClick={onBackToLogin}
          className="text-xs font-semibold text-slate-500 hover:text-gci flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <ArrowLeft size={14} />
          Voltar ao Login
        </button>
      }
      afterFooter={
        /* Modal Document Viewer (PDF Preview Simulation for 2 Different Docs) */
        <AnimatePresence>
          {activeDocModal && (
            <TermsDocumentModal
              docType={activeDocModal}
              onDownload={() => handleDownload(activeDocModal)}
              onClose={() => setActiveDocModal(null)}
              onAgree={handleAgreeAndClose}
            />
          )}
        </AnimatePresence>
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
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-4 text-agro-orange border border-white/10">
            <ShieldCheck size={26} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Termos de Uso e Privacidade
          </h1>
        </div>

        {/* Form Area */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          {/* Body Welcome Text */}
          <div className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200/80">
            Bem-vindo ao portal do Grupo Ceres Investimentos. Antes de iniciar o envio de documentos para liberação do seu limite operacional, solicitamos a concordância com os termos e condições da plataforma.
          </div>

          {/* Clean Single Checkbox */}
          <TermsConsentCheckbox
            accepted={accepted}
            onAcceptedChange={setAccepted}
            onOpenDocument={setActiveDocModal}
          />

          {/* Actions */}
          <div className="flex items-center justify-end pt-2 border-t border-slate-100">
            <button
              type="submit"
              disabled={!accepted}
              className="w-full sm:w-auto px-8 py-3.5 bg-gci hover:bg-gci-hover disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-gci/10 flex items-center justify-center gap-2 active:scale-95"
            >
              Concordar e Continuar
              <ChevronRight size={18} />
            </button>
          </div>
        </form>
      </motion.div>
    </OnboardingPageShell>
  );
};
