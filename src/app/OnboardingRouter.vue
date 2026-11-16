<script setup lang="ts">
import LandingPage from '@/flows/onboarding/landing/LandingPage.vue';
import InitialPhoneVerification from '@/flows/onboarding/sms/InitialPhoneVerification.vue';
import CreatePasswordScreen from '@/flows/onboarding/senha/CreatePasswordScreen.vue';
import Login from '@/flows/onboarding/login/Login.vue';
import TermsAgreement from '@/flows/onboarding/termos/TermsAgreement.vue';
import ComplementaryDataForm from '@/flows/onboarding/dados-complementares/ComplementaryDataForm.vue';
import OnboardingDocumentUpload from '@/flows/onboarding/documentos/OnboardingDocumentUpload.vue';
import AccountOpeningSignature from '@/flows/onboarding/assinatura/AccountOpeningSignature.vue';
import AnalysisPending from '@/flows/onboarding/analise/AnalysisPending.vue';
import AccountCreated from '@/flows/onboarding/conta-criada/AccountCreated.vue';
import RejectionNotice from '@/flows/onboarding/analise/RejectionNotice.vue';
import Dashboard from '@/flows/portal/dashboard/Dashboard.vue';
import { SMS_DEFAULT_MASKED_PHONE } from '@/constants/sms';
import { MOCK_COMPANY_CNPJ, MOCK_COMPANY_NAME } from '@/mocks/onboardingCompany';
import { buildSigners } from '@/utils/buildSigners';
import type { OnboardingFlow } from '@/hooks/useOnboardingFlow';

const props = defineProps<{
  flow: OnboardingFlow;
}>();

// Reenvio após ajuste volta direto para a análise, sem reassinar.
const handleSubmitDocs = () => {
  props.flow.goTo(
    props.flow.documentsMode === 'adjustment' ? 'analysis_pending' : 'account_opening_signature',
  );
};
</script>

<template>
  <!-- Step 0: Landing page do GCI (CTA de cadastro segue para a confirmação do celular) -->
  <LandingPage
    v-if="flow.currentView === 'landing'"
    @register="flow.goTo('phone_verification')"
    @login="flow.goTo('login')"
  />

  <!-- Step 1: Confirmação do celular por SMS -->
  <InitialPhoneVerification
    v-else-if="flow.currentView === 'phone_verification'"
    :masked-phone="SMS_DEFAULT_MASKED_PHONE"
    @confirmed="flow.goTo('create_password')"
    @go-to-login="flow.goTo('login')"
  />

  <!-- Step 2: Criação de Senha -->
  <CreatePasswordScreen
    v-else-if="flow.currentView === 'create_password'"
    @close="flow.goTo('terms')"
  />

  <!-- Step 3: Login (Para quem já possui cadastro ou deseja voltar) -->
  <Login
    v-else-if="flow.currentView === 'login'"
    @login="flow.goTo('terms')"
    @start-activation="flow.goTo('phone_verification')"
  />

  <!-- Step 4: Terms of Use & Privacy Agreement -->
  <TermsAgreement
    v-else-if="flow.currentView === 'terms'"
    @accept="flow.goTo('complementary_form')"
    @back-to-login="flow.goTo('login')"
  />

  <!-- Step 5: Complementary Data Form (PF or PJ with dynamic steps and partners) -->
  <ComplementaryDataForm
    v-else-if="flow.currentView === 'complementary_form'"
    @submit="flow.handleComplementarySubmit"
    @back="flow.goTo('terms')"
  />

  <!-- Step 6: Document Upload (One by one, linked to person/entity, constitutive doc by company type) -->
  <OnboardingDocumentUpload
    v-else-if="flow.currentView === 'document_upload'"
    :account-type="flow.formData?.accountType || 'pj'"
    :socios="flow.formData?.socios"
    :non-partner-representatives="flow.formData?.nonPartnerRepresentatives"
    :has-procurador="flow.formData?.hasProcurador"
    :company-name="flow.formData?.companyName"
    :cnpj="flow.formData?.cnpj"
    :tipo-empresa="flow.formData?.tipoEmpresa"
    :documents-mode="flow.documentsMode"
    :initial-documents="flow.documentsSnapshot"
    :adjustment-request-id="flow.adjustmentRequestId"
    :applied-adjustment-request-id="flow.appliedAdjustmentRequestId"
    @documents-change="flow.setDocumentsSnapshot"
    @adjustment-applied="flow.setAppliedAdjustmentRequestId"
    @submit-docs="handleSubmitDocs"
    @back="flow.goTo('complementary_form')"
    @cancel-request="flow.goTo('login')"
  />

  <!-- Step 7: Assinatura da abertura de conta -->
  <AccountOpeningSignature
    v-else-if="flow.currentView === 'account_opening_signature'"
    :representatives="buildSigners(flow.formData)"
    :company-name="flow.formData?.companyName || MOCK_COMPANY_NAME"
    :cnpj="flow.formData?.cnpj || MOCK_COMPANY_CNPJ"
    @advance-to-analysis="flow.goTo('analysis_pending')"
    @back="flow.goTo('document_upload')"
  />

  <!-- Step 8: Intermediate Pending Status (Analysis in progress, email alert, safe tab close) -->
  <AnalysisPending
    v-else-if="flow.currentView === 'analysis_pending'"
    @simulate-approve="flow.goTo('account_created')"
    @simulate-reject="flow.goTo('rejection_notice')"
    @simulate-adjustment="flow.openDocumentAdjustment"
    @back-to-login="flow.goTo('login')"
  />

  <!-- Step 9: Account Created (Agency, Account number, GCI details) -->
  <AccountCreated
    v-else-if="flow.currentView === 'account_created'"
    @continue-to-complete-registration="flow.goTo('dashboard')"
  />

  <!-- Rejection Notice Screen -->
  <RejectionNotice
    v-else-if="flow.currentView === 'rejection_notice'"
    @back-to-login="flow.goTo('login')"
    @retry-demo="flow.goTo('terms')"
  />

  <!-- Step 10: Dashboard — Home, com a Análise de Crédito disponível no menu -->
  <Dashboard v-else @logout="flow.goTo('login')" />
</template>
