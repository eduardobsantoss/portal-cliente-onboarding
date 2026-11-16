<script setup lang="ts">
import { motion } from 'motion-v';

defineProps<{
  progress: number;
}>();
</script>

<template>
  <div class="flex flex-col items-center justify-center py-12 space-y-6">
    <div class="relative w-24 h-24">
      <svg class="w-24 h-24 -rotate-90">
        <circle
          cx="48"
          cy="48"
          r="44"
          stroke="currentColor"
          stroke-width="8"
          fill="transparent"
          class="text-slate-100"
        />
        <motion.circle
          cx="48"
          cy="48"
          r="44"
          stroke="currentColor"
          stroke-width="8"
          fill="transparent"
          stroke-dasharray="276.46"
          :initial="{ strokeDashoffset: 276.46 }"
          :animate="{ strokeDashoffset: 276.46 - (276.46 * progress) / 100 }"
          class="text-agro-orange"
        />
      </svg>
      <div class="absolute inset-0 flex items-center justify-center">
        <span class="text-xl font-black text-gci">{{ Math.round(progress) }}%</span>
      </div>
    </div>
    <div class="text-center">
      <p class="text-lg font-black text-gci uppercase italic">Processando arquivo...</p>
      <p class="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Extraindo metadados e validando assinaturas</p>
    </div>
  </div>
</template>
