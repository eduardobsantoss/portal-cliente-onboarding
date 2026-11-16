<script setup lang="ts">
import { motion } from 'motion-v';
import OnboardingPageShell from '@/components/layout/OnboardingPageShell.vue';
import AccountTypeSwitch from '@/flows/onboarding/dados-complementares/AccountTypeSwitch.vue';
import ComplementaryBanner from '@/flows/onboarding/dados-complementares/ComplementaryBanner.vue';
import DataErrorBanner from '@/flows/onboarding/dados-complementares/DataErrorBanner.vue';
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
  sociosEditor,
  nonPartnerEditor,
  selectAccountType,
  handleSubmit,
} = form;
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
          :pf-data="pf.pfData.value"
          :set-pf-data="pf.setPfData"
          :show-optionals="pf.showOptionals.value"
          :has-data-errors="hasDataErrors"
          @toggle-optionals="pf.toggleOptionals"
          @submit="handleSubmit"
        />

        <!-- FORM: PESSOA JURÍDICA -->
        <PjForm
          v-if="accountType === 'pj'"
          :pj="pj"
          :has-data-errors="hasDataErrors"
          :socios-editor="sociosEditor"
          :non-partner-editor="nonPartnerEditor"
          :validation-error-notice="validationErrorNotice"
          @submit="handleSubmit()"
        />
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
