<script setup lang="ts">
import { motion } from 'motion-v';
import { CheckCircle2, X } from 'lucide-vue-next';

/** Aviso de cadastro concluído. */
const emit = defineEmits<{
  close: [];
}>();
</script>

<template>
  <motion.div
    :initial="{ opacity: 0, y: -20 }"
    :animate="{ opacity: 1, y: 0 }"
    :exit="{ opacity: 0, y: -20 }"
    class="mb-6 bg-emerald-500 text-white p-4 rounded-2xl shadow-lg flex items-center justify-between gap-4"
  >
    <div class="flex items-center gap-3">
      <CheckCircle2 :size="20" class="shrink-0" />
      <span class="text-sm font-bold">
        Cadastro concluído com sucesso! Documentos enviados para análise da mesa de crédito.
      </span>
    </div>
    <button
      @click="emit('close')"
      class="p-1 hover:bg-white/20 rounded-lg text-white/80 hover:text-white"
    >
      <X :size="16" />
    </button>
  </motion.div>
</template>
