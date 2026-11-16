<script setup lang="ts">
import { motion } from 'motion-v';
import { CheckCircle2, X } from 'lucide-vue-next';

/** Aviso "Operação Criada com Sucesso". */
const emit = defineEmits<{
  close: [];
}>();
</script>

<template>
  <motion.div
    :initial="{ opacity: 0, y: 100, x: '-50%' }"
    :animate="{ opacity: 1, y: -40, x: '-50%' }"
    :exit="{ opacity: 0, y: 100, x: '-50%' }"
    class="fixed bottom-0 left-1/2 z-[200] bg-gci text-white px-8 py-5 rounded-[24px] shadow-2xl flex items-center gap-5 border border-white/10 min-w-[320px] md:min-w-[450px]"
  >
    <div class="w-12 h-12 rounded-2xl bg-agro-orange flex items-center justify-center shrink-0 shadow-lg shadow-agro-orange/20">
      <CheckCircle2 :size="24" />
    </div>
    <div>
      <p class="font-black text-sm uppercase tracking-widest">Operação Criada com Sucesso</p>
      <p class="text-xs text-white/60 font-medium">Os e-mails de confirmação e o comprovante foram enviados para seu e-mail cadastrado.</p>
    </div>
    <button @click="emit('close')" class="ml-4 p-2 text-white/30 hover:text-white">
      <X :size="18" />
    </button>
  </motion.div>
</template>
