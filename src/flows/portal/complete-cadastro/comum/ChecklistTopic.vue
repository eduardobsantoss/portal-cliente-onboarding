<script setup lang="ts">
import { motion, AnimatePresence } from 'motion-v';
import { ChevronDown } from 'lucide-vue-next';

defineProps<{
  isDone: boolean;
  title: string;
  subtitle: string;
  isOpen: boolean;
  contentClassName: string;
}>();

const emit = defineEmits<{ toggle: [] }>();

/**
 * Casca de um tópico do checklist: cabeçalho clicável (ícone, título, selo, chevron) + conteúdo expansível.
 * Slots: `icon` (ícone do tópico), `badge` (selo exibido à direita do cabeçalho) e o conteúdo padrão.
 */
</script>

<template>
  <div class="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm transition-all hover:border-slate-300">
    <button
      class="w-full p-4 text-left flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
      @click="emit('toggle')"
    >
      <div class="flex items-center gap-3">
        <div
          :class="`w-9 h-9 rounded-xl flex items-center justify-center ${
            isDone ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
          }`"
        >
          <slot name="icon" />
        </div>
        <div>
          <h3 class="text-sm font-bold text-slate-800">{{ title }}</h3>
          <p class="text-xs text-slate-400">{{ subtitle }}</p>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <slot name="badge" />
        <ChevronDown
          :size="16"
          :class="`text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-gci' : ''}`"
        />
      </div>
    </button>

    <AnimatePresence>
      <motion.div
        v-if="isOpen"
        key="content"
        :initial="{ height: 0, opacity: 0 }"
        :animate="{ height: 'auto', opacity: 1 }"
        :exit="{ height: 0, opacity: 0 }"
        :class="contentClassName"
      >
        <slot />
      </motion.div>
    </AnimatePresence>
  </div>
</template>
