import React from 'react';
import { motion } from 'motion/react';
import { OnboardingPageShell } from '@/components/layout/OnboardingPageShell';
import { AccountTypeSwitch } from '@/flows/onboarding/dados-complementares/AccountTypeSwitch';
import { ComplementaryBanner } from '@/flows/onboarding/dados-complementares/ComplementaryBanner';
import { DataErrorBanner } from '@/flows/onboarding/dados-complementares/DataErrorBanner';
import { PjForm } from '@/flows/onboarding/dados-complementares/empresa/PjForm';
import { PfForm } from '@/flows/onboarding/dados-complementares/pessoa-fisica/PfForm';
import { NonPartnerModal } from '@/flows/onboarding/dados-complementares/representantes/NonPartnerModal';
import { SocioModal } from '@/flows/onboarding/dados-complementares/socios/SocioModal';
import { useComplementaryForm } from '@/flows/onboarding/dados-complementares/useComplementaryForm';
import type { ComplementaryFormSubmitPayload } from '@/types/dadosComplementares';

interface ComplementaryDataFormProps {
  onSubmit: (payload?: ComplementaryFormSubmitPayload) => void;
  onBack: () => void;
}

export const ComplementaryDataForm: React.FC<ComplementaryDataFormProps> = ({ onSubmit }) => {
  const form = useComplementaryForm(onSubmit);
  const { accountType, hasDataErrors, pf, pj } = form;

  return (
    <OnboardingPageShell
      sectionLabel="Portal do Cliente • Abertura de Conta"
      mainClassName="max-w-5xl w-full mx-auto my-auto py-8"
      beforeFooter={
        <>
          {/* SÓCIO MODAL */}
          <SocioModal editor={form.sociosEditor} />

          {/* REPRESENTANTE NÃO SÓCIO MODAL (Item 3) */}
          <NonPartnerModal editor={form.nonPartnerEditor} />
        </>
      }
    >
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden"
      >
        {/* Header Banner */}
        <ComplementaryBanner />

        <div className="p-6 sm:p-8 space-y-6">
          <AccountTypeSwitch accountType={accountType} onSelect={form.selectAccountType} />

          {/* Error Banner when simulation flagged data inconsistencies */}
          {hasDataErrors && <DataErrorBanner message={form.dataErrorMessage} />}

          {/* FORM: PESSOA FÍSICA */}
          {accountType === 'pf' && (
            <PfForm
              pfData={pf.pfData}
              setPfData={pf.setPfData}
              showOptionals={pf.showOptionals}
              onToggleOptionals={pf.toggleOptionals}
              hasDataErrors={hasDataErrors}
              onSubmit={form.handleSubmit}
            />
          )}

          {/* FORM: PESSOA JURÍDICA */}
          {accountType === 'pj' && (
            <PjForm
              pj={pj}
              hasDataErrors={hasDataErrors}
              sociosEditor={form.sociosEditor}
              nonPartnerEditor={form.nonPartnerEditor}
              validationErrorNotice={form.validationErrorNotice}
              onSubmit={() => form.handleSubmit()}
            />
          )}
        </div>
      </motion.div>
    </OnboardingPageShell>
  );
};
