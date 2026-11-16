<script setup lang="ts">
import { motion } from 'motion-v';

defineProps<{
  validationProgress: number;
}>();
</script>

<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between px-1">
      <span class="text-[10px] font-black text-gci uppercase tracking-widest">Validando Processo</span>
      <span class="text-[10px] font-black text-agro-orange tracking-widest">{{ Math.round(validationProgress) }}%</span>
    </div>
    <div class="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
      <motion.div
        class="h-full bg-agro-orange"
        :initial="{ width: 0 }"
        :animate="{ width: `${validationProgress}%` }"
        :transition="{ duration: 0.3 }"
      />
    </div>
  </div>
</template>
