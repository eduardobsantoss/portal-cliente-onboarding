<script setup lang="ts">
import { motion, AnimatePresence } from 'motion-v';
import { ChevronDown } from 'lucide-vue-next';
import type { FaqItem } from '@/types/faq';

defineProps<{
  faq: FaqItem;
  isExpanded: boolean;
}>();

const emit = defineEmits<{ toggle: [] }>();
</script>

<template>
  <div
    :class="`border rounded-xl transition-all ${
      isExpanded ? 'border-gci/30 bg-gci/[0.02]' : 'border-slate-200 bg-white'
    }`"
  >
    <button
      class="w-full p-3.5 text-left flex items-center justify-between gap-3"
      @click="emit('toggle')"
    >
      <div class="flex items-center gap-2">
        <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded">
          {{ faq.category }}
        </span>
        <span class="text-xs font-bold text-slate-800">{{ faq.question }}</span>
      </div>
      <ChevronDown
        :size="15"
        :class="`text-slate-400 shrink-0 transition-transform ${isExpanded ? 'rotate-180 text-gci' : ''}`"
      />
    </button>

    <AnimatePresence>
      <motion.div
        v-if="isExpanded"
        key="answer"
        :initial="{ height: 0, opacity: 0 }"
        :animate="{ height: 'auto', opacity: 1 }"
        :exit="{ height: 0, opacity: 0 }"
        class="overflow-hidden"
      >
        <p class="px-3.5 pb-3.5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-2.5">
          {{ faq.answer }}
        </p>
      </motion.div>
    </AnimatePresence>
  </div>
</template>
