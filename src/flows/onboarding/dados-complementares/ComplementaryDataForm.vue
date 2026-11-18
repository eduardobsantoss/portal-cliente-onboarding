<script setup lang="ts">
import { motion } from 'motion-v';
import OnboardingPageShell from '@/components/layout/OnboardingPageShell.vue';
import AccountTypeSwitch from '@/flows/onboarding/dados-complementares/AccountTypeSwitch.vue';
import ComplementaryBanner from '@/flows/onboarding/dados-complementares/ComplementaryBanner.vue';
import DataErrorBanner from '@/flows/onboarding/dados-complementares/DataErrorBanner.vue';
import MockFillButton from '@/flows/onboarding/dados-complementares/MockFillButton.vue';
import PjForm from '@/flows/onboarding/dados-complementares/empresa/PjForm.vue';
import PfForm from '@/flows/onboarding/dados-complementares/pessoa-fisica/PfForm.vue';
import NonPartnerModal from '@/flows/onboarding/dados-complementares/representantes/NonPartnerModal.vue';
import SocioModal from '@/flows/onboarding/dados-complementares/socios/SocioModal.vue';
import { useComplementaryForm } from '@/flows/onboarding/dados-complementares/useComplementaryForm';
import type { ComplementaryFormSubmitPayload } from '@/types/dadosComplementares';

const emit = defineEmits<{
  submit: [payload?: ComplementaryFormSubmitPayload];
  /** declarado por compatibilidade com o roteador; o formulário não dispara 'back' */
  back: [];
}>();

const form = useComplementaryForm((payload) => emit('submit', payload));
const {
  accountType,
  hasDataErrors,
  dataErrorMessage,
  validationErrorNotice,
  pf,
  pj,
  cnpjLookup,
  cpfLookup,
  sociosEditor,
  nonPartnerEditor,
  selectAccountType,
  fillWithMock,
  handleSubmit,
} = form;
// refs estáveis do composable (desestruturadas para serem desembrulhadas no template)
const { pfData, setPfData, pfLockedFields, showOptionals, toggleOptionals } = pf;
const { status: cpfStatus, errorMessage: cpfError, handleCpfChange } = cpfLookup;
</script>

<template>
  <OnboardingPageShell
    section-label="Portal do Cliente • Abertura de Conta"
    main-class-name="max-w-5xl w-full mx-auto my-auto py-8"
  >
    <motion.div
      :initial="{ opacity: 0, y: 14 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.3 }"
      class="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden"
    >
      <!-- Header Banner -->
      <ComplementaryBanner />

      <div class="p-6 sm:p-8 space-y-6">
        <AccountTypeSwitch :account-type="accountType" @select="selectAccountType" />

        <!-- Error Banner when simulation flagged data inconsistencies -->
        <DataErrorBanner v-if="hasDataErrors" :message="dataErrorMessage" />

        <!-- FORM: PESSOA FÍSICA -->
        <PfForm
          v-if="accountType === 'pf'"
          :pf-data="pfData"
          :set-pf-data="setPfData"
          :show-optionals="showOptionals"
          :has-data-errors="hasDataErrors"
          :locked-fields="pfLockedFields"
          :lookup-status="cpfStatus"
          :lookup-error="cpfError"
          @cpf-change="handleCpfChange"
          @toggle-optionals="toggleOptionals"
          @submit="handleSubmit"
        />

        <!-- FORM: PESSOA JURÍDICA -->
        <PjForm
          v-if="accountType === 'pj'"
          :pj="pj"
          :cnpj-lookup="cnpjLookup"
          :has-data-errors="hasDataErrors"
          :socios-editor="sociosEditor"
          :non-partner-editor="nonPartnerEditor"
          :validation-error-notice="validationErrorNotice"
          @submit="handleSubmit()"
        />

        <!-- Atalho discreto para preencher tudo com dados de exemplo -->
        <MockFillButton @click="fillWithMock" />
      </div>
    </motion.div>

    <template #beforeFooter>
      <!-- SÓCIO MODAL -->
      <SocioModal :editor="sociosEditor" />

      <!-- REPRESENTANTE NÃO SÓCIO MODAL (Item 3) -->
      <NonPartnerModal :editor="nonPartnerEditor" />
    </template>
  </OnboardingPageShell>
</template>
