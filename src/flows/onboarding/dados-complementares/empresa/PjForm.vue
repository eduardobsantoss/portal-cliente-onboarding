<script setup lang="ts">
import CompanyAddressStep from '@/flows/onboarding/dados-complementares/empresa/CompanyAddressStep.vue';
import CompanyDataStep from '@/flows/onboarding/dados-complementares/empresa/CompanyDataStep.vue';
import PjStepProgress from '@/flows/onboarding/dados-complementares/empresa/PjStepProgress.vue';
import type { NonPartnerEditor } from '@/flows/onboarding/dados-complementares/representantes/useNonPartnerEditor';
import SociosStep from '@/flows/onboarding/dados-complementares/socios/SociosStep.vue';
import type { SociosEditor } from '@/flows/onboarding/dados-complementares/socios/useSociosEditor';
import type { usePjForm } from '@/flows/onboarding/dados-complementares/usePjForm';

const props = defineProps<{
  pj: ReturnType<typeof usePjForm>;
  hasDataErrors: boolean;
  sociosEditor: SociosEditor;
  nonPartnerEditor: NonPartnerEditor;
  validationErrorNotice: string | null;
}>();

const emit = defineEmits<{ submit: [] }>();

// refs estáveis do composable (o objeto `pj` não é recriado)
const { pjStep, setPjStep, pjCompanyData, setPjCompanyData } = props.pj;
</script>

<template>
  <div class="space-y-6">
    <!-- Progress Bar -->
    <PjStepProgress :step="pjStep" />

    <!-- PASSO 1: DADOS DA EMPRESA -->
    <CompanyDataStep
      v-if="pjStep === 1"
      :company="pjCompanyData"
      :set-company="setPjCompanyData"
      :has-data-errors="hasDataErrors"
      @next="setPjStep(2)"
    />

    <!-- PASSO 2: ENDEREÇO DA EMPRESA -->
    <CompanyAddressStep
      v-if="pjStep === 2"
      :company="pjCompanyData"
      :set-company="setPjCompanyData"
      @back="setPjStep(1)"
      @next="setPjStep(3)"
    />

    <!-- PASSO 3: SÓCIOS -->
    <SociosStep
      v-if="pjStep === 3"
      :socios-editor="sociosEditor"
      :non-partner-editor="nonPartnerEditor"
      :validation-error-notice="validationErrorNotice"
      @back="setPjStep(2)"
      @submit="emit('submit')"
    />
  </div>
</template>
