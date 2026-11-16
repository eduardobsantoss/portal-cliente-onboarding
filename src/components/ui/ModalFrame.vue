<script setup lang="ts">
import { motion } from 'motion-v';

defineProps<{
  overlayClassName: string;
  panelClassName: string;
}>();

/**
 * Overlay + painel animado (fade/scale/slide) dos modais centralizados do portal.
 * A montagem condicional e o `AnimatePresence` ficam com quem usa.
 */
</script>

<template>
  <div :class="overlayClassName">
    <motion.div
      :initial="{ opacity: 0, scale: 0.95, y: 20 }"
      :animate="{ opacity: 1, scale: 1, y: 0 }"
      :exit="{ opacity: 0, scale: 0.95, y: 20 }"
      :class="panelClassName"
    >
      <slot />
    </motion.div>
  </div>
</template>
