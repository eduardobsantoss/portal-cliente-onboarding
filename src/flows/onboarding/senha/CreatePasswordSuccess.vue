<script setup lang="ts">
import { motion } from 'motion-v';
import { CheckCircle2 } from 'lucide-vue-next';
</script>

<template>
  <motion.div
    :initial="{ opacity: 0, scale: 0.9 }"
    :animate="{ opacity: 1, scale: 1 }"
    class="py-8 text-center space-y-3"
  >
    <div class="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
      <CheckCircle2 :size="32" />
    </div>
    <h3 class="text-base font-bold text-slate-900">Senha criada com sucesso!</h3>
    <p class="text-xs text-slate-500">
      Redirecionando para o acesso ao portal...
    </p>
  </motion.div>
</template>
