<script setup lang="ts">
import { motion } from 'motion-v';
import { CheckCircle2 } from 'lucide-vue-next';

const emit = defineEmits<{
  continue: [];
}>();
</script>

<template>
  <motion.div
    :initial="{ opacity: 0, y: 10 }"
    :animate="{ opacity: 1, y: 0 }"
    class="bg-green-50 p-6 rounded-3xl border border-green-100 flex flex-col items-center gap-2 mt-4"
  >
    <div class="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg shadow-green-500/20">
      <CheckCircle2 :size="24" />
    </div>
    <p class="text-sm font-black text-green-700 uppercase tracking-widest">Todas as assinaturas coletadas!</p>
    <button
      class="mt-2 bg-gci text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-agro-orange transition-all shadow-xl shadow-gci/20"
      @click="emit('continue')"
    >
      Continuar Operação
    </button>
  </motion.div>
</template>
