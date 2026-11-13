import React from 'react';
import { InitialPhoneVerification } from '@/flows/onboarding/sms/InitialPhoneVerification';
import { CreatePasswordScreen } from '@/flows/onboarding/senha/CreatePasswordScreen';
import { Login } from '@/flows/onboarding/login/Login';
import { TermsAgreement } from '@/flows/onboarding/termos/TermsAgreement';
import { ComplementaryDataForm } from '@/flows/onboarding/dados-complementares/ComplementaryDataForm';
import { OnboardingDocumentUpload } from '@/flows/onboarding/documentos/OnboardingDocumentUpload';
import { AccountOpeningSignature } from '@/flows/onboarding/assinatura/AccountOpeningSignature';
import { AnalysisPending } from '@/flows/onboarding/analise/AnalysisPending';
import { AccountCreated } from '@/flows/onboarding/conta-criada/AccountCreated';
import { RejectionNotice } from '@/flows/onboarding/analise/RejectionNotice';
import { Dashboard } from '@/flows/portal/dashboard/Dashboard';
import { SMS_DEFAULT_MASKED_PHONE } from '@/constants/sms';
import { MOCK_COMPANY_CNPJ, MOCK_COMPANY_NAME } from '@/mocks/onboardingCompany';
import { buildSigners } from '@/utils/buildSigners';
import type { OnboardingFlow } from '@/hooks/useOnboardingFlow';

export const OnboardingRouter: React.FC<OnboardingFlow> = ({
  currentView,
  formData,
  documentsSnapshot,
  documentsMode,
  adjustmentRequestId,
  appliedAdjustmentRequestId,
  setDocumentsSnapshot,
  setAppliedAdjustmentRequestId,
  goTo,
  handleComplementarySubmit,
  openDocumentAdjustment,
}) => {
  switch (currentView) {
    // Step 1: Confirmação do celular por SMS
    case 'phone_verification':
      return (
        <InitialPhoneVerification
          maskedPhone={SMS_DEFAULT_MASKED_PHONE}
          onConfirmed={() => goTo('create_password')}
          onGoToLogin={() => goTo('login')}
        />
      );

    // Step 2: Criação de Senha
    case 'create_password':
      return <CreatePasswordScreen onClose={() => goTo('terms')} />;

    // Step 3: Login (Para quem já possui cadastro ou deseja voltar)
    case 'login':
      return (
        <Login
          onLogin={() => goTo('terms')}
          onStartActivation={() => goTo('phone_verification')}
        />
      );

    // Step 4: Terms of Use & Privacy Agreement
    case 'terms':
      return (
        <TermsAgreement
          onAccept={() => goTo('complementary_form')}
          onBackToLogin={() => goTo('login')}
        />
      );

    // Step 5: Complementary Data Form (PF or PJ with dynamic steps and partners)
    case 'complementary_form':
      return (
        <ComplementaryDataForm
          onSubmit={handleComplementarySubmit}
          onBack={() => goTo('terms')}
        />
      );

    // Step 6: Document Upload (One by one, linked to person/entity, constitutive doc by company type)
    case 'document_upload':
      return (
        <OnboardingDocumentUpload
          accountType={formData?.accountType || 'pj'}
          socios={formData?.socios}
          nonPartnerRepresentatives={formData?.nonPartnerRepresentatives}
          hasProcurador={formData?.hasProcurador}
          companyName={formData?.companyName}
          cnpj={formData?.cnpj}
          tipoEmpresa={formData?.tipoEmpresa}
          documentsMode={documentsMode}
          initialDocuments={documentsSnapshot}
          adjustmentRequestId={adjustmentRequestId}
          appliedAdjustmentRequestId={appliedAdjustmentRequestId}
          onDocumentsChange={setDocumentsSnapshot}
          onAdjustmentApplied={setAppliedAdjustmentRequestId}
          onSubmitDocs={() => {
            // Reenvio após ajuste volta direto para a análise, sem reassinar.
            goTo(documentsMode === 'adjustment' ? 'analysis_pending' : 'account_opening_signature');
          }}
          onBack={() => goTo('complementary_form')}
          onCancelRequest={() => goTo('login')}
        />
      );

    // Step 7: Assinatura da abertura de conta
    case 'account_opening_signature':
      return (
        <AccountOpeningSignature
          representatives={buildSigners(formData)}
          companyName={formData?.companyName || MOCK_COMPANY_NAME}
          cnpj={formData?.cnpj || MOCK_COMPANY_CNPJ}
          onAdvanceToAnalysis={() => goTo('analysis_pending')}
          onBack={() => goTo('document_upload')}
        />
      );

    // Step 8: Intermediate Pending Status (Analysis in progress, email alert, safe tab close)
    case 'analysis_pending':
      return (
        <AnalysisPending
          onSimulateApprove={() => goTo('account_created')}
          onSimulateReject={() => goTo('rejection_notice')}
          onSimulateAdjustment={openDocumentAdjustment}
          onBackToLogin={() => goTo('login')}
        />
      );

    // Step 9: Account Created (Agency, Account number, GCI details)
    case 'account_created':
      return (
        <AccountCreated
          onContinueToCompleteRegistration={() => goTo('dashboard')}
        />
      );

    // Rejection Notice Screen
    case 'rejection_notice':
      return (
        <RejectionNotice
          onBackToLogin={() => goTo('login')}
          onRetryDemo={() => goTo('terms')}
        />
      );

    // Step 10: Dashboard — Home, com a Análise de Crédito disponível no menu
    default:
      return <Dashboard onLogout={() => goTo('login')} />;
  }
};
