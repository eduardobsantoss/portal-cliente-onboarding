<script setup lang="ts">
import { motion } from 'motion-v';
import { AlertTriangle } from 'lucide-vue-next';

/** Aviso "Ajustes necessários na documentação" exibido após a simulação de rejeição. */
</script>

<template>
  <motion.div
    :initial="{ opacity: 0, y: -10 }"
    :animate="{ opacity: 1, y: 0 }"
    class="p-4 sm:p-5 bg-rose-50 border border-rose-200 rounded-2xl flex items-start gap-3.5 shadow-sm"
  >
    <div class="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-md">
      <AlertTriangle :size="20" />
    </div>
    <div class="flex-1 min-w-0">
      <h4 class="text-sm font-bold text-rose-950">
        Ajustes necessários na documentação
      </h4>
      <p class="text-xs text-rose-800 mt-1 leading-relaxed">
        Identificamos arquivos que precisam de correção (por exemplo, imagem sem nitidez ou dados ilegíveis). Verifique os tópicos destacados abaixo e substitua os arquivos indicados para concluir a validação.
      </p>
    </div>
  </motion.div>
</template>
