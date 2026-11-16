<script setup lang="ts">
import { motion } from 'motion-v';
import { PJ_STEP_LABELS, PJ_TOTAL_STEPS } from '@/constants/complementaryForm';
import type { PjStep } from '@/types/dadosComplementares';

defineProps<{
  step: PjStep;
}>();
</script>

<template>
  <div class="space-y-1.5 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
    <div class="flex items-center justify-between text-xs">
      <span class="font-semibold text-slate-700">{{ PJ_STEP_LABELS[step] }}</span>
      <span class="font-bold text-gci"> Passo {{ step }} de {{ PJ_TOTAL_STEPS }} </span>
    </div>
    <div class="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
      <motion.div
        :initial="{ width: 0 }"
        :animate="{ width: `${(step / PJ_TOTAL_STEPS) * 100}%` }"
        :transition="{ duration: 0.4 }"
        class="h-full bg-gci rounded-full"
      />
    </div>
  </div>
</template>
