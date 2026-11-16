<script setup lang="ts">
import { motion } from 'motion-v';
import { ArrowLeft, RotateCcw, AlertCircle } from 'lucide-vue-next';
import OnboardingPageShell from '@/components/layout/OnboardingPageShell.vue';

const emit = defineEmits<{
  backToLogin: [];
  retryDemo: [];
}>();
</script>

<template>
  <OnboardingPageShell
    section-label="Portal do Cliente • Status da Solicitação"
    main-class-name="max-w-lg w-full mx-auto my-auto py-8"
  >
    <template #headerAction>
      <button
        class="text-xs font-semibold text-slate-500 hover:text-gci flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
        @click="emit('backToLogin')"
      >
        <ArrowLeft :size="14" />
        Voltar ao Login
      </button>
    </template>

    <motion.div
      :initial="{ opacity: 0, y: 14 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.3 }"
      class="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 space-y-6 text-center"
    >
      <div class="w-14 h-14 rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center mx-auto border border-slate-200">
        <AlertCircle :size="28" />
      </div>

      <div class="space-y-2">
        <h1 class="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
          Solicitação não aprovada
        </h1>
        <p class="text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
          Não foi possível abrir a sua conta neste momento junto ao Grupo Ceres Investimentos.
        </p>
      </div>

      <!-- Action buttons -->
      <div class="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
        <button
          type="button"
          class="w-full py-3 bg-gci hover:bg-gci-hover text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-md shadow-gci/10"
          @click="emit('backToLogin')"
        >
          Voltar ao Início
        </button>

        <button
          type="button"
          class="w-full py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-xl transition-colors flex items-center justify-center gap-1.5"
          @click="emit('retryDemo')"
        >
          <RotateCcw :size="14" />
          Reiniciar Simulação (Demo)
        </button>
      </div>
    </motion.div>
  </OnboardingPageShell>
</template>
