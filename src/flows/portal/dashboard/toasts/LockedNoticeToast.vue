<script setup lang="ts">
import { motion } from 'motion-v';
import { Lock, X } from 'lucide-vue-next';

/** Aviso de funcionalidade ainda indisponível, com atalho opcional para a análise de crédito. */
defineProps<{
  message: string;
  actionLabel?: string;
}>();

const emit = defineEmits<{
  close: [];
  action: [];
}>();
</script>

<template>
  <motion.div
    :initial="{ opacity: 0, y: -20 }"
    :animate="{ opacity: 1, y: 0 }"
    :exit="{ opacity: 0, y: -20 }"
    class="mb-6 bg-slate-800 text-white p-4 rounded-2xl shadow-lg flex items-center justify-between gap-4 border border-slate-700"
  >
    <div class="flex items-center gap-3">
      <Lock :size="18" class="text-agro-orange shrink-0" />
      <span class="text-xs md:text-sm font-medium">
        {{ message }}
      </span>
    </div>
    <div class="flex items-center gap-2 shrink-0">
      <button
        v-if="actionLabel"
        type="button"
        @click="emit('action')"
        class="text-[11px] font-bold uppercase tracking-wider bg-agro-orange text-white px-3 py-2 rounded-xl hover:bg-agro-orange/90"
      >
        {{ actionLabel }}
      </button>
      <button
        @click="emit('close')"
        class="p-1 hover:bg-white/20 rounded-lg text-white/60 hover:text-white"
      >
        <X :size="16" />
      </button>
    </div>
  </motion.div>
</template>
