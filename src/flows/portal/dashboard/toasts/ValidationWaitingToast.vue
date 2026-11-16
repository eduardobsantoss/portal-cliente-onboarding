<script setup lang="ts">
import { motion } from 'motion-v';
import { Clock } from 'lucide-vue-next';

/** Aviso global "Em Validação" (clicar simula a conclusão da validação). */
const emit = defineEmits<{
  confirm: [];
}>();
</script>

<template>
  <motion.div
    :initial="{ opacity: 0, x: 100 }"
    :animate="{ opacity: 1, x: 0 }"
    :exit="{ opacity: 0, x: 100 }"
    @click="emit('confirm')"
    class="fixed bottom-8 right-8 z-[200] max-w-md cursor-pointer group"
  >
    <div class="bg-white border-2 border-blue-100 rounded-[32px] p-8 shadow-[0_20px_50px_rgba(37,99,235,0.15)] flex flex-col gap-6 relative overflow-hidden ring-1 ring-blue-200/20 group-hover:border-blue-300 transition-colors">
      <div class="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full blur-3xl -mr-16 -mt-16" />

      <div class="flex items-start gap-5 relative z-10">
        <div class="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
          <Clock :size="28" :stroke-width="2.5" class="animate-spin-slow" />
        </div>
        <div class="space-y-2">
          <h4 class="text-base font-black text-gci uppercase tracking-tight text-blue-900">Em Validação</h4>
          <p class="text-xs text-slate-500 font-medium leading-relaxed italic">
            Seus títulos estão em validação de confirmação. Assim que o processo for concluído avisaremos você.
          </p>
        </div>
      </div>
    </div>
  </motion.div>
</template>
