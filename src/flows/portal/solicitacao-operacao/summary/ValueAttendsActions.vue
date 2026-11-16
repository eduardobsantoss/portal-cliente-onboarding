<script setup lang="ts">
import { motion, AnimatePresence } from 'motion-v';
import { X, Plus, ArrowRight } from 'lucide-vue-next';
import { cn } from '@/utils/cn';
import type { OperationValueAttends } from '@/types/operationRequest';

defineProps<{
  valueAttends: OperationValueAttends;
}>();

const emit = defineEmits<{
  agree: [];
  recusar: [];
  uploadMore: [];
}>();
</script>

<template>
  <AnimatePresence mode="wait">
    <motion.div
      v-if="valueAttends === 'SIM'"
      key="SIM"
      :initial="{ opacity: 0, y: 10 }"
      :animate="{ opacity: 1, y: 0 }"
      :exit="{ opacity: 0, y: -10 }"
      class="space-y-6 pt-4 border-t border-slate-50"
    >
      <button
        :class="cn(
          'w-full py-5 px-10 rounded-[24px] font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-lg bg-gci text-white shadow-gci/20 hover:scale-[1.02]'
        )"
        @click="emit('agree')"
      >
        Concordar e Gerar Documentos
        <ArrowRight :size="18" />
      </button>
    </motion.div>

    <motion.div
      v-else-if="valueAttends === 'NAO'"
      key="NAO"
      :initial="{ opacity: 0, y: 10 }"
      :animate="{ opacity: 1, y: 0 }"
      :exit="{ opacity: 0, y: -10 }"
      class="space-y-6 pt-4 border-t border-slate-50"
    >
      <div class="grid grid-cols-3 gap-4">
        <button
          class="bg-white text-slate-400 border border-slate-100 py-5 rounded-[24px] font-black text-[10px] uppercase tracking-widest transition-all hover:bg-red-50 hover:text-red-500 hover:border-red-100 flex items-center justify-center gap-2"
          @click="emit('recusar')"
        >
          <X :size="16" />
          Recusar
        </button>
        <button
          class="col-span-2 bg-slate-50 text-gci border border-slate-200 py-5 rounded-[24px] font-black text-xs uppercase tracking-widest transition-all hover:bg-white hover:border-agro-orange hover:text-agro-orange flex items-center justify-center gap-3 shadow-sm hover:shadow-md"
          @click="emit('uploadMore')"
        >
          <Plus :size="18" />
          Subir mais títulos
        </button>
      </div>
    </motion.div>
  </AnimatePresence>
</template>
