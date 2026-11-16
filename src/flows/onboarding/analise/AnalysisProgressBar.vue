<script setup lang="ts">
import { motion } from 'motion-v';

defineProps<{
  progress: number;
}>();
</script>

<template>
  <div class="space-y-2">
    <div class="flex justify-between text-xs font-bold text-slate-600">
      <span>Progresso da verificação</span>
      <span class="text-gci">{{ progress }}%</span>
    </div>
    <div class="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
      <motion.div
        class="bg-gradient-to-r from-gci to-agro-orange h-full rounded-full"
        :initial="{ width: '5%' }"
        :animate="{ width: `${progress}%` }"
        :transition="{ duration: 0.5, ease: 'easeOut' }"
      />
    </div>
  </div>
</template>
