<script setup lang="ts">
import { motion } from 'motion-v';

defineProps<{
  overlayClassName: string;
  panelClassName: string;
}>();

/**
 * Overlay + painel animado (fade/scale/slide) dos modais centralizados do portal.
 * A montagem condicional e o `AnimatePresence` ficam com quem usa.
 * Dentro do theme-client (`tc:`): véu `--scrim-dialog`, painel branco, raio xl, sem borda, com `--shadow-float`.
 * O painel mantém o padding de cada modal, porque o cabeçalho e o rodapé têm o próprio.
 */
const TC_OVERLAY = 'tc:bg-[var(--scrim-dialog)] tc:backdrop-blur-none';
const TC_PANEL =
  'tc:rounded-[var(--radius-xl)] tc:border-0 tc:bg-[var(--surface-card)] tc:shadow-[var(--shadow-float)]';
</script>

<template>
  <div :class="[overlayClassName, TC_OVERLAY]">
    <motion.div
      :initial="{ opacity: 0, scale: 0.95, y: 20 }"
      :animate="{ opacity: 1, scale: 1, y: 0 }"
      :exit="{ opacity: 0, scale: 0.95, y: 20 }"
      :class="[panelClassName, TC_PANEL]"
    >
      <slot />
    </motion.div>
  </div>
</template>
