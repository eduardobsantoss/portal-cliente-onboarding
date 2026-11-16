<script setup lang="ts">
import { motion, AnimatePresence } from 'motion-v';

/** Fundo escurecido que fecha a sidebar no mobile. */
defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  close: [];
}>();
</script>

<template>
  <AnimatePresence>
    <motion.div
      v-if="isOpen"
      :initial="{ opacity: 0 }"
      :animate="{ opacity: 1 }"
      :exit="{ opacity: 0 }"
      @click="emit('close')"
      class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
    />
  </AnimatePresence>
</template>
