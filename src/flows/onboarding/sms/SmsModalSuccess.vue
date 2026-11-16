<script setup lang="ts">
import { motion } from 'motion-v';
import { CheckCircle2 } from 'lucide-vue-next';
</script>

<template>
  <motion.div
    :initial="{ opacity: 0, scale: 0.95 }"
    :animate="{ opacity: 1, scale: 1 }"
    class="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2"
  >
    <div class="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
      <CheckCircle2 :size="24" />
    </div>
    <h4 class="text-sm font-bold text-emerald-950">Celular confirmado com sucesso!</h4>
    <p class="text-xs text-emerald-800">
      A validação foi atualizada no seu checklist cadastral.
    </p>
  </motion.div>
</template>
