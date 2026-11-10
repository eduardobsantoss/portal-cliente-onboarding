import React, { useState } from 'react';
import { InitialPhoneVerification } from '@/flows/onboarding/sms/InitialPhoneVerification';
import { CreatePasswordModal } from '@/components/CreatePasswordModal';
import { Login } from '@/components/Login';
import { TermsAgreement } from '@/components/TermsAgreement';
import { ComplementaryDataForm, ComplementaryFormSubmitPayload } from '@/components/ComplementaryDataForm';
import { OnboardingDocumentUpload } from '@/components/OnboardingDocumentUpload';
import { AccountOpeningSignature, SignerRepresentative } from '@/components/AccountOpeningSignature';
import { AnalysisPending } from '@/components/AnalysisPending';
import { AccountCreated } from '@/components/AccountCreated';
import { RejectionNotice } from '@/components/RejectionNotice';
import { Dashboard } from '@/components/Dashboard';

export type OnboardingViewState = 
  | 'phone_verification'
  | 'create_password'
  | 'login' 
  | 'terms' 
  | 'complementary_form'
  | 'document_upload'
  | 'account_opening_signature'
  | 'analysis_pending' 
  | 'account_created' 
  | 'rejection_notice' 
  | 'dashboard';

export default function App() {
  // Requirement 1: Ao recarregar a página ou reiniciar o fluxo, a ordem passa a ser:
  // Confirmação do celular por SMS → Criação de senha → Termos → Dados complementares...
  const [currentView, setCurrentView] = useState<OnboardingViewState>('phone_verification');
  const [formData, setFormData] = useState<ComplementaryFormSubmitPayload | null>(null);

  // Step 1: Confirmação do celular por SMS
  if (currentView === 'phone_verification') {
    return (
      <InitialPhoneVerification
        maskedPhone="(34) 9 ••••-1234"
        onConfirmed={() => setCurrentView('create_password')}
        onGoToLogin={() => setCurrentView('login')}
      />
    );
  }

  // Step 2: Criação de Senha
  if (currentView === 'create_password') {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#083C4A_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
        <CreatePasswordModal
          isOpen={true}
          onClose={() => setCurrentView('terms')}
        />
      </div>
    );
  }

  // Step 3: Login (Para quem já possui cadastro ou deseja voltar)
  if (currentView === 'login') {
    return (
      <Login 
        onLogin={() => setCurrentView('terms')}
        onStartActivation={() => setCurrentView('phone_verification')}
      />
    );
  }

  // Step 4: Terms of Use & Privacy Agreement
  if (currentView === 'terms') {
    return (
      <TermsAgreement
        onAccept={() => setCurrentView('complementary_form')}
        onBackToLogin={() => setCurrentView('login')}
      />
    );
  }

  // Step 5: Complementary Data Form (PF or PJ with dynamic steps and partners)
  if (currentView === 'complementary_form') {
    return (
      <ComplementaryDataForm
        onSubmit={(payload) => {
          if (payload) {
            setFormData(payload);
          }
          setCurrentView('document_upload');
        }}
        onBack={() => setCurrentView('terms')}
      />
    );
  }

  // Step 6: Document Upload (One by one, linked to person/entity, constitutive doc by company type)
  if (currentView === 'document_upload') {
    return (
      <OnboardingDocumentUpload
        accountType={formData?.accountType || 'pj'}
        socios={formData?.socios}
        nonPartnerRepresentatives={formData?.nonPartnerRepresentatives}
        hasProcurador={formData?.hasProcurador}
        companyName={formData?.companyName}
        cnpj={formData?.cnpj}
        tipoEmpresa={formData?.tipoEmpresa}
        onSubmitDocs={() => {
          // O avanço do envio de documentos leva SEMPRE para a Assinatura da Abertura
          setCurrentView('account_opening_signature');
        }}
        onBack={() => setCurrentView('complementary_form')}
        onCancelRequest={() => setCurrentView('login')}
      />
    );
  }

  // Step 7: Assinatura da abertura de conta
  if (currentView === 'account_opening_signature') {
    const isPf = formData?.accountType === 'pf';

    const pfSigner: SignerRepresentative[] = [
      {
        id: 'pf-titular-eduardo',
        name: 'Eduardo Santos',
        role: 'Titular / Correntista',
        email: 'eduardo.santos@ceresinvestimentos.com',
        cpf: '123.456.789-00',
        type: 'socio' as const,
        status: 'Pendente' as const,
      },
    ];

    const legalPartnerSigners: SignerRepresentative[] = (formData?.socios || [])
      .filter((s) => s.isRepresentanteLegal)
      .map((s) => ({
        id: s.id,
        name: s.nome,
        role: s.cargo || 'Sócio Administrador',
        email: s.email || `${s.nome.toLowerCase().replace(/\s+/g, '.')}@ceresinvestimentos.com`,
        cpf: s.cpfCnpj || '218.490.128-44',
        type: 'socio' as const,
        status: 'Pendente' as const,
      }));

    const nonPartnerSigners: SignerRepresentative[] = (formData?.nonPartnerRepresentatives || []).map((r) => ({
      id: r.id,
      name: r.nome,
      role: r.cargo || r.vinculo,
      email: r.email,
      cpf: r.cpf,
      type: 'nao_socio' as const,
      vinculo: r.vinculo,
      status: 'Pendente' as const,
    }));

    const allPjSigners = [...legalPartnerSigners, ...nonPartnerSigners];
    const finalRepresentatives: SignerRepresentative[] = isPf
      ? pfSigner
      : allPjSigners.length > 0
      ? allPjSigners
      : [
          {
            id: 'rep-default-1',
            name: 'Eduardo Santos',
            role: 'Sócio Administrador',
            email: 'eduardo.santos@ceresinvestimentos.com',
            cpf: '218.490.128-44',
            type: 'socio' as const,
            status: 'Pendente' as const,
          },
        ];

    return (
      <AccountOpeningSignature
        representatives={finalRepresentatives}
        companyName={formData?.companyName || 'AGRO INDUSTRIAL SOJA & MILHO LTDA'}
        cnpj={formData?.cnpj || '12.345.678/0001-90'}
        onAdvanceToAnalysis={() => setCurrentView('analysis_pending')}
        onBack={() => setCurrentView('document_upload')}
      />
    );
  }

  // Step 8: Intermediate Pending Status (Analysis in progress, email alert, safe tab close)
  if (currentView === 'analysis_pending') {
    return (
      <AnalysisPending
        onSimulateApprove={() => setCurrentView('account_created')}
        onSimulateReject={() => setCurrentView('rejection_notice')}
        onBackToLogin={() => setCurrentView('login')}
      />
    );
  }

  // Step 9: Account Created (Agency, Account number, GCI details)
  if (currentView === 'account_created') {
    return (
      <AccountCreated
        onContinueToCompleteRegistration={() => setCurrentView('dashboard')}
      />
    );
  }

  // Rejection Notice Screen
  if (currentView === 'rejection_notice') {
    return (
      <RejectionNotice
        onBackToLogin={() => setCurrentView('login')}
        onRetryDemo={() => setCurrentView('terms')}
      />
    );
  }

  // Step 10: Dashboard - "Complete o seu Cadastro"
  return <Dashboard onLogout={() => setCurrentView('login')} />;
}
