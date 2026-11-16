<script setup lang="ts">
import { motion } from 'motion-v';
import { LogOut } from 'lucide-vue-next';
import OnboardingPageShell from '@/components/layout/OnboardingPageShell.vue';
import ValidationSpinner from '@/components/ui/ValidationSpinner.vue';
import AnalysisDeadlineNotice from './AnalysisDeadlineNotice.vue';
import AnalysisSafeExitBanner from './AnalysisSafeExitBanner.vue';
import AnalysisDemoControls from './AnalysisDemoControls.vue';

const emit = defineEmits<{
  simulateApprove: [];
  simulateReject: [];
  simulateAdjustment: [];
  backToLogin: [];
}>();
</script>

<template>
  <OnboardingPageShell
    section-label="Portal do Cliente • Status da Solicitação"
    main-class-name="max-w-5xl w-full mx-auto my-auto py-8 space-y-4"
  >
    <template #headerAction>
      <button
        class="text-xs font-semibold text-slate-500 hover:text-gci flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
        @click="emit('backToLogin')"
      >
        <LogOut :size="14" />
        Sair com Segurança
      </button>
    </template>

    <motion.div
      :initial="{ opacity: 0, y: 14 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.4 }"
      class="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden"
    >
      <!-- Header -->
      <div class="p-6 sm:p-8 bg-gradient-to-r from-[#083C4A] to-[#0a4c5e] text-white">
        <h1 class="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Estamos analisando suas informações
        </h1>
        <p class="text-xs sm:text-sm text-white/80 font-medium mt-2 max-w-xl leading-relaxed">
          Recebemos seus dados com sucesso. Estamos analisando e entraremos em contato.
        </p>
      </div>

      <div class="p-6 sm:p-8 space-y-6">
        <!-- Retorno visual de que a análise está em andamento (mesmo loading da validação de documentos) -->
        <div class="py-4 space-y-8">
          <ValidationSpinner />

          <!-- Prazo e aviso por e-mail -->
          <AnalysisDeadlineNotice />
        </div>

        <!-- Safe exit banner -->
        <AnalysisSafeExitBanner />

        <!-- Simulation / Interactive controls for presentation -->
        <AnalysisDemoControls
          @simulate-approve="emit('simulateApprove')"
          @simulate-reject="emit('simulateReject')"
          @simulate-adjustment="emit('simulateAdjustment')"
        />
      </div>
    </motion.div>
  </OnboardingPageShell>
</template>
