<script setup lang="ts">
import { motion } from 'motion-v';

defineProps<{
  label: string;
  value: string;
  valueClassName: string;
  /** Atraso (s) da animação de entrada; sem valor = sem `transition` (como o primeiro cartão original). */
  delay?: number;
}>();
</script>

<!-- Cartão de indicador da carteira (rótulo, valor e rodapé opcional via slot `footer`). -->
<template>
  <motion.div
    :initial="{ opacity: 0, y: 10 }"
    :animate="{ opacity: 1, y: 0 }"
    :transition="delay !== undefined ? { delay } : undefined"
    class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm"
  >
    <p class="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">{{ label }}</p>
    <h3 :class="valueClassName">{{ value }}</h3>
    <div v-if="$slots.footer" class="mt-4 flex items-center gap-2 text-[10px] font-bold text-slate-400 bg-slate-50 w-fit px-2 py-1 rounded-lg">
      <slot name="footer" />
    </div>
  </motion.div>
</template>
