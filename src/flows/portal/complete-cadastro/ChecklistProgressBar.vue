<script setup lang="ts">
import { computed } from 'vue';
import { motion } from 'motion-v';

const props = defineProps<{
  completedTopicsCount: number;
  totalTopics: number;
}>();

const widthPercent = computed(() => `${(props.completedTopicsCount / props.totalTopics) * 100}%`);

/** Barra de progresso minimalista: "X de 6 tópicos concluídos". */
</script>

<template>
  <div class="space-y-1.5 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
    <div class="flex items-center justify-between text-xs">
      <span class="font-semibold text-slate-700">Progresso do cadastro</span>
      <span class="font-bold text-gci">{{ completedTopicsCount }} de {{ totalTopics }} tópicos concluídos</span>
    </div>
    <div class="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
      <motion.div
        :initial="{ width: 0 }"
        :animate="{ width: widthPercent }"
        :transition="{ duration: 0.4 }"
        class="h-full bg-gci rounded-full"
      />
    </div>
  </div>
</template>
