<script setup lang="ts">
import { computed } from 'vue';
import LandingPage from '@/flows/onboarding/landing/LandingPage.vue';
import InitialPhoneVerification from '@/flows/onboarding/sms/InitialPhoneVerification.vue';
// import CreatePasswordScreen from '@/flows/onboarding/senha/CreatePasswordScreen.vue'; // etapa desativada: a senha é criada no cadastro da landing
import Login from '@/flows/onboarding/login/Login.vue';
import TermsAgreement from '@/flows/onboarding/termos/TermsAgreement.vue';
import ComplementaryDataForm from '@/flows/onboarding/dados-complementares/ComplementaryDataForm.vue';
import OnboardingDocumentUpload from '@/flows/onboarding/documentos/OnboardingDocumentUpload.vue';
import AccountOpeningSignature from '@/flows/onboarding/assinatura/AccountOpeningSignature.vue';
import AnalysisPending from '@/flows/onboarding/analise/AnalysisPending.vue';
// import AccountCreated from '@/flows/onboarding/conta-criada/AccountCreated.vue'; // etapa desativada por enquanto
import RejectionNotice from '@/flows/onboarding/analise/RejectionNotice.vue';
import Dashboard from '@/flows/portal/dashboard/Dashboard.vue';
import { SMS_DEFAULT_MASKED_PHONE } from '@/constants/sms';
import { MOCK_COMPANY_CNPJ, MOCK_COMPANY_NAME } from '@/mocks/onboardingCompany';
import { buildSigners } from '@/utils/buildSigners';
import { maskPhoneForDisplay } from '@/utils/registrationMasks';
import type { OnboardingFlow } from '@/hooks/useOnboardingFlow';

const props = defineProps<{
  flow: OnboardingFlow;
}>();

// Telefone informado no formulário da landing (mascarado); usa o padrão se o fluxo não passou por ela.
const registeredMaskedPhone = computed(
  () => maskPhoneForDisplay(props.flow.registrationLead?.phone ?? '') ?? SMS_DEFAULT_MASKED_PHONE,
);

// Reenvio após ajuste volta direto para a análise, sem reassinar.
const handleSubmitDocs = () => {
  props.flow.goTo(
    props.flow.documentsMode === 'adjustment' ? 'analysis_pending' : 'account_opening_signature',
  );
};
</script>

<template>
  <!-- Step 0: Landing page do GCI (CTAs de cadastro abrem o formulário e seguem para o login) -->
  <LandingPage
    v-if="flow.currentView === 'landing'"
    @register="flow.submitRegistration"
    @login="flow.goTo('login')"
  />

  <!-- Step 1: Login (logo após o cadastro na landing, ou para quem já possui acesso) -->
  <Login
    v-else-if="flow.currentView === 'login'"
    :initial-email="flow.registrationLead?.email"
    @login="flow.goTo('phone_verification')"
    @start-activation="flow.goTo('phone_verification')"
  />

  <!-- Step 2: Confirmação do celular por SMS (depois de logar) -->
  <InitialPhoneVerification
    v-else-if="flow.currentView === 'phone_verification'"
    :masked-phone="registeredMaskedPhone"
    @confirmed="flow.goTo('terms')"
    @go-to-login="flow.goTo('login')"
  />

  <!--
    Step 3: Criação de Senha — desativado: a senha agora é criada no formulário "Abra sua conta" da landing.
    Para reativar: descomente este bloco e o import de CreatePasswordScreen, e volte o
    @confirmed da confirmação do celular para flow.goTo('create_password').

  <CreatePasswordScreen
    v-else-if="flow.currentView === 'create_password'"
    @close="flow.goTo('terms')"
  />
  -->

  <!-- Step 4: Terms of Use & Privacy Agreement -->
  <TermsAgreement
    v-else-if="flow.currentView === 'terms'"
    @accept="flow.goTo('complementary_form')"
    @back-to-login="flow.goTo('login')"
  />

  <!-- Step 5: Complementary Data Form (PF or PJ with dynamic steps and partners) -->
  <ComplementaryDataForm
    v-else-if="flow.currentView === 'complementary_form'"
    :initial-cnpj="flow.registrationLead?.document"
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
    @simulate-approve="flow.goTo('dashboard')"
    @simulate-reject="flow.goTo('rejection_notice')"
    @simulate-adjustment="flow.openDocumentAdjustment"
    @back-to-login="flow.goTo('login')"
  />

  <!--
    Step 9: "Sua Conta Digital GCI está aberta" (Agência, número da conta, detalhes GCI).
    Desativado por enquanto: a aprovação segue direto para o Dashboard.
    Para reativar: descomente este bloco e o import de AccountCreated, e volte o
    @simulate-approve da análise para flow.goTo('account_created').

  <AccountCreated
    v-else-if="flow.currentView === 'account_created'"
    @continue-to-complete-registration="flow.goTo('dashboard')"
  />
  -->

  <!-- Rejection Notice Screen -->
  <RejectionNotice
    v-else-if="flow.currentView === 'rejection_notice'"
    @back-to-login="flow.goTo('login')"
    @retry-demo="flow.goTo('terms')"
  />

  <!-- Step 10: Dashboard — Home, com a Análise de Crédito disponível no menu -->
  <Dashboard v-else @logout="flow.goTo('login')" />
</template>
