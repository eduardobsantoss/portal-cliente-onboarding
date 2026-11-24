<script setup lang="ts">
import { computed } from 'vue';
import { motion, AnimatePresence } from 'motion-v';

const props = defineProps<{
  isOpen: boolean;
  overlayClassName?: string;
  panelClassName?: string;
}>();

const DEFAULT_OVERLAY_CLASS =
  'fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto';
const DEFAULT_PANEL_CLASS =
  'bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 my-8 max-h-[90vh] overflow-y-auto border border-slate-200';

// Dentro do theme-client (`tc:`): véu `--scrim-dialog` sem desfoque; painel branco, raio xl, 36px de padding,
// `--shadow-float` e sem borda. O overlay não é teleportado, então já nasce dentro da tela tematizada.
const TC_OVERLAY = 'tc:bg-[var(--scrim-dialog)] tc:backdrop-blur-none';
const TC_PANEL =
  'tc:rounded-[var(--radius-xl)] tc:border-0 tc:bg-[var(--surface-card)] tc:p-[var(--space-9)] tc:shadow-[var(--shadow-float)] max-sm:tc:p-[var(--space-6)]';

const overlayClass = computed(() => [props.overlayClassName ?? DEFAULT_OVERLAY_CLASS, TC_OVERLAY]);
const panelClass = computed(() => [props.panelClassName ?? DEFAULT_PANEL_CLASS, TC_PANEL]);
</script>

<template>
  <AnimatePresence>
    <div v-if="isOpen" key="modal" :class="overlayClass">
      <motion.div
        :initial="{ opacity: 0, scale: 0.95 }"
        :animate="{ opacity: 1, scale: 1 }"
        :exit="{ opacity: 0, scale: 0.95 }"
        :class="panelClass"
      >
        <slot />
      </motion.div>
    </div>
  </AnimatePresence>
</template>
