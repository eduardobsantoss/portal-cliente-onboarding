<script setup lang="ts">
import { motion } from 'motion-v';
import { FileCheck } from 'lucide-vue-next';

defineProps<{
  uploadedMandatory: number;
  totalMandatory: number;
}>();
</script>

<template>
  <div class="space-y-1.5 bg-slate-50/70 p-4 rounded-2xl border border-slate-200/80">
    <div class="flex items-center justify-between text-xs">
      <span class="font-semibold text-slate-700 flex items-center gap-2">
        <FileCheck :size="16" class="text-gci" />
        Documentos Obrigatórios Validados
      </span>
      <span class="font-bold text-gci">
        {{ uploadedMandatory }} de {{ totalMandatory }}
      </span>
    </div>
    <div class="w-full h-2 bg-slate-200/70 rounded-full overflow-hidden">
      <motion.div
        :initial="{ width: 0 }"
        :animate="{ width: `${(uploadedMandatory / totalMandatory) * 100}%` }"
        :transition="{ duration: 0.4 }"
        class="h-full bg-gci rounded-full"
      />
    </div>
  </div>
</template>
