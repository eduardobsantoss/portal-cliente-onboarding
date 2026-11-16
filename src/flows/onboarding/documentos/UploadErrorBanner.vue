<script setup lang="ts">
import { motion } from 'motion-v';
import { AlertCircle, X } from 'lucide-vue-next';

defineProps<{
  message: string;
}>();

const emit = defineEmits<{ dismiss: [] }>();
</script>

<template>
  <motion.div
    :initial="{ opacity: 0, y: -10 }"
    :animate="{ opacity: 1, y: 0 }"
    class="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-xs text-red-800 font-medium shadow-sm"
  >
    <div class="w-8 h-8 rounded-xl bg-red-500 text-white flex items-center justify-center shrink-0">
      <AlertCircle :size="18" />
    </div>
    <div class="flex-1">{{ message }}</div>
    <button
      type="button"
      class="p-1 text-red-500 hover:text-red-800 rounded-lg"
      @click="emit('dismiss')"
    >
      <X :size="16" />
    </button>
  </motion.div>
</template>
