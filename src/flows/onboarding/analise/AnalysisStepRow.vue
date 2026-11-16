<script setup lang="ts">
import { computed } from 'vue';
import { motion } from 'motion-v';
import { CheckCircle2 } from 'lucide-vue-next';
import type { AnalysisStepItem } from '@/types/analysis';

const props = defineProps<{
  step: AnalysisStepItem;
  idx: number;
  currentStepIndex: number;
}>();

const isDone = computed(() => props.idx < props.currentStepIndex);
const isCurrent = computed(() => props.idx === props.currentStepIndex);
</script>

<template>
  <motion.div
    :initial="{ opacity: 0, x: -10 }"
    :animate="{ opacity: 1, x: 0 }"
    :transition="{ delay: idx * 0.08 }"
    :class="[
      'p-3.5 rounded-2xl border transition-all flex items-start gap-3.5',
      isDone
        ? 'bg-emerald-50/60 border-emerald-200 text-slate-800'
        : isCurrent
          ? 'bg-white border-gci/60 shadow-md ring-2 ring-gci/10'
          : 'bg-slate-50/50 border-slate-200/60 text-slate-400 opacity-60',
    ]"
  >
    <div class="mt-0.5 shrink-0">
      <CheckCircle2 v-if="isDone" :size="18" class="text-emerald-600" />
      <div v-else-if="isCurrent" class="w-4 h-4 rounded-full border-2 border-gci border-t-transparent animate-spin mt-0.5" />
      <div v-else class="w-4 h-4 rounded-full border border-slate-300 bg-slate-100" />
    </div>

    <div class="flex-1 min-w-0">
      <div class="flex items-center justify-between gap-2">
        <p :class="['text-xs font-bold', isCurrent ? 'text-gci' : isDone ? 'text-slate-800' : 'text-slate-500']">
          {{ step.label }}
        </p>
        <span
          v-if="isDone"
          class="text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full"
        >
          Concluído
        </span>
        <span
          v-if="isCurrent"
          class="text-[10px] font-bold text-gci bg-sky-50 px-2 py-0.5 rounded-full animate-pulse"
        >
          Processando
        </span>
      </div>
      <p class="text-[11px] text-slate-500 mt-0.5">
        {{ step.detail }}
      </p>
    </div>
  </motion.div>
</template>
