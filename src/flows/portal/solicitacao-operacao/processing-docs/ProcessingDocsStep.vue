<script setup lang="ts">
import { computed } from 'vue';
import { motion } from 'motion-v';
import { FileText } from 'lucide-vue-next';
import { getProcessingOverallProgress, getProcessingStage } from '@/utils/operationProcessing';
import OperationTimeline from '@/flows/portal/solicitacao-operacao/OperationTimeline.vue';

const props = defineProps<{
  processingIndex: number;
}>();

const currentStage = computed(() => getProcessingStage(props.processingIndex));
const overallProgress = computed(() => getProcessingOverallProgress(props.processingIndex));
</script>

<template>
  <OperationTimeline step="PROCESSING_DOCS" />
  <div class="text-center space-y-6 max-w-2xl mx-auto">
    <div class="w-24 h-24 bg-orange-50 text-agro-orange rounded-full flex items-center justify-center mx-auto mb-4 relative overflow-hidden">
      <div class="absolute inset-0 bg-agro-orange/5 animate-pulse" />
      <FileText :size="40" class="relative z-10" />
    </div>
    <div class="space-y-3">
      <h2 class="text-3xl font-black text-gci uppercase tracking-tighter">
        {{ currentStage.label }}
      </h2>
      <p class="text-slate-500 text-base font-medium leading-relaxed">
        {{ currentStage.description }}
      </p>
    </div>

    <div class="space-y-4 pt-10">
      <div class="flex items-center justify-between px-2">
        <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Progresso Total</span>
        <span class="text-[10px] font-black text-agro-orange uppercase tracking-widest">{{ Math.round(overallProgress) }}%</span>
      </div>
      <div class="w-full h-4 bg-slate-100 rounded-full overflow-hidden p-1 border border-slate-100 shadow-inner">
        <motion.div
          :initial="{ width: 0 }"
          :animate="{ width: `${overallProgress}%` }"
          :transition="{ duration: 0.8 }"
          class="h-full bg-agro-orange rounded-full shadow-lg shadow-agro-orange/20"
        />
      </div>
    </div>
  </div>
</template>
