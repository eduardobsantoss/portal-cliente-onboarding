<script setup lang="ts">
import { motion } from 'motion-v';
import { ArrowRight, ArrowLeft, FileSignature } from 'lucide-vue-next';
import OnboardingPageShell from '@/components/layout/OnboardingPageShell.vue';
import OnboardingProgressSteps from '@/components/layout/OnboardingProgressSteps.vue';
import { MOCK_COMPANY_CNPJ, MOCK_COMPANY_NAME } from '@/mocks/onboardingCompany';
import type { SignerRepresentative } from '@/types/signer';
import { useSignatureRepresentatives } from './useSignatureRepresentatives';
import SignatureCompanyCard from './SignatureCompanyCard.vue';
import SignerList from './SignerList.vue';
import SignatureSimulationControls from './SignatureSimulationControls.vue';

// PLACEHOLDER: mecanismo de assinatura a definir
const props = withDefaults(
  defineProps<{
    representatives: SignerRepresentative[];
    companyName?: string;
    cnpj?: string;
  }>(),
  {
    companyName: MOCK_COMPANY_NAME,
    cnpj: MOCK_COMPANY_CNPJ,
  }
);

const emit = defineEmits<{
  advanceToAnalysis: [];
  back: [];
}>();

const {
  reps,
  totalSigners,
  signedCount,
  allSigned,
  handleToggleSignSingle,
  handleSimulateAllSigned,
} = useSignatureRepresentatives(() => props.representatives);
</script>

<template>
  <OnboardingPageShell
    section-label="Portal do Cliente • Assinatura da Abertura de Conta"
    main-class-name="max-w-5xl w-full mx-auto my-auto py-6 space-y-4"
  >
    <template #headerAction>
      <button
        type="button"
        class="text-xs font-semibold text-slate-500 hover:text-gci flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
        @click="emit('back')"
      >
        <ArrowLeft :size="14" />
        Voltar para Documentos
      </button>
    </template>

    <!-- Stepper Indicator: Documentos -> Assinatura -> Análise -->
    <OnboardingProgressSteps :current-step="3" />

    <motion.div
      :initial="{ opacity: 0, y: 14 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.35 }"
      class="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden"
    >
      <!-- Header Banner -->
      <div class="p-6 sm:p-8 bg-gradient-to-r from-[#083C4A] to-[#0a4c5e] text-white">
        <div class="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-agro-orange border border-white/10 mb-3 shadow-inner">
          <FileSignature :size="26" />
        </div>

        <h1 class="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Assinatura da abertura de conta
        </h1>
        <p class="text-xs sm:text-sm text-white/80 font-medium mt-2 leading-relaxed">
          Enviamos o termo de abertura para assinatura dos sócios e representantes. A análise começa quando todos assinarem.
        </p>
      </div>

      <div class="p-6 sm:p-8 space-y-6">
        <SignatureCompanyCard
          :company-name="companyName"
          :cnpj="cnpj"
          :all-signed="allSigned"
          :signed-count="signedCount"
          :total-signers="totalSigners"
        />

        <!-- List of Representatives -->
        <SignerList :reps="reps" :all-signed="allSigned" @toggle-sign="handleToggleSignSingle" />

        <!-- Simulation controls -->
        <SignatureSimulationControls @simulate-all-signed="handleSimulateAllSigned" />

        <!-- Advance Button -->
        <div class="pt-4 border-t border-slate-100 flex items-center justify-end">
          <button
            type="button"
            :disabled="!allSigned"
            :class="[
              'w-full sm:w-auto px-8 py-3.5 font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg',
              allSigned
                ? 'bg-gci hover:bg-gci-hover text-white shadow-gci/10 cursor-pointer active:scale-95'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none',
            ]"
            @click="emit('advanceToAnalysis')"
          >
            <span>Continuar para análise</span>
            <ArrowRight :size="18" />
          </button>
        </div>
      </div>
    </motion.div>
  </OnboardingPageShell>
</template>
