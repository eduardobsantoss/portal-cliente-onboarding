<script setup lang="ts">
import { motion } from 'motion-v';
import { AlertCircle } from 'lucide-vue-next';
</script>

<template>
  <motion.div
    :initial="{ opacity: 0, y: 10 }"
    :animate="{ opacity: 1, y: 0 }"
    class="bg-orange-50 border border-orange-200 p-4 rounded-2xl flex items-center gap-4 text-left max-w-md mx-auto"
  >
    <AlertCircle class="text-agro-orange shrink-0" :size="24" />
    <p class="text-xs text-orange-900 font-bold leading-relaxed">
      A operação está demorando mais que o esperado devido ao alto volume de processamento. Estamos atuando no problema.
    </p>
  </motion.div>
</template>
