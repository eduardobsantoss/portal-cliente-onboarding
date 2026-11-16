<script setup lang="ts">
import { ONBOARDING_PROGRESS_STEPS } from '@/constants/onboardingSteps';

defineProps<{
  currentStep: number;
}>();
</script>

<template>
  <div class="w-full bg-white px-4 py-3 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between text-[11px] font-semibold text-slate-500">
    <template v-for="(step, index) in ONBOARDING_PROGRESS_STEPS" :key="step.number">
      <span v-if="index > 0" class="text-slate-300">→</span>

      <div v-if="step.number < currentStep" class="flex items-center gap-1.5 text-emerald-700">
        <span class="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-[10px] font-bold text-emerald-700">✓</span>
        <span class="hidden sm:inline">{{ step.label }}</span>
      </div>

      <div
        v-else-if="step.number === currentStep"
        class="flex items-center gap-1.5 text-gci font-bold bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200/60"
      >
        <span class="w-5 h-5 rounded-full bg-gci text-white flex items-center justify-center text-[10px] font-bold">{{ step.number }}</span>
        <span>{{ step.label }}</span>
      </div>

      <div v-else class="flex items-center gap-1.5 text-slate-400">
        <span class="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">{{ step.number }}</span>
        <span class="hidden sm:inline">{{ step.label }}</span>
      </div>
    </template>
  </div>
</template>
