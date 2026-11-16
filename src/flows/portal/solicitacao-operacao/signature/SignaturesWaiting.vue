<script setup lang="ts">
import { motion } from 'motion-v';
</script>

<template>
  <div class="bg-slate-50 p-6 rounded-3xl border border-slate-100 mt-4 text-center">
    <p class="text-xs text-slate-400 font-medium">Aguardando as assinaturas dos representantes legais para prosseguir.</p>
    <div class="flex items-center justify-center gap-1.5 mt-3">
      <motion.div
        v-for="i in [0, 1, 2]"
        :key="i"
        :animate="{ opacity: [0.3, 1, 0.3] }"
        :transition="{ repeat: Infinity, duration: 1, delay: i * 0.2 }"
        class="w-1.5 h-1.5 rounded-full bg-slate-300"
      />
    </div>
  </div>
</template>
