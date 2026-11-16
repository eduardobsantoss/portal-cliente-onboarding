<script setup lang="ts">
import { motion } from 'motion-v';
import Logo from '@/components/ui/Logo.vue';

/** Tela de carregamento exibida durante a troca de grupo econômico. */
defineProps<{
  selectedGroup: string;
}>();
</script>

<template>
  <motion.div
    :initial="{ opacity: 0 }"
    :animate="{ opacity: 1 }"
    :exit="{ opacity: 0 }"
    :transition="{ duration: 0.4 }"
    class="fixed inset-0 z-[200] flex items-center justify-center bg-white/20 backdrop-blur-xl"
  >
    <div class="flex flex-col items-center gap-8">
      <div class="relative">
        <motion.div
          class="w-24 h-24 rounded-full border-4 border-gci/10 border-t-gci"
          :animate="{ rotate: 360 }"
          :transition="{ duration: 1.5, repeat: Infinity, ease: 'linear' }"
        />
        <div class="absolute inset-0 flex items-center justify-center">
          <Logo variant="dark" class-name="h-4 opacity-50" />
        </div>
      </div>

      <div class="flex flex-col items-center gap-2 text-center">
        <motion.h4
          :initial="{ y: 10, opacity: 0 }"
          :animate="{ y: 0, opacity: 1 }"
          class="text-xl font-black text-gci tracking-tight"
        >
          Sincronizando Dados
        </motion.h4>
        <motion.p
          :initial="{ y: 10, opacity: 0 }"
          :animate="{ y: 0, opacity: 1 }"
          :transition="{ delay: 0.1 }"
          class="text-sm text-slate-500 font-bold uppercase tracking-widest"
        >
          Alternando para <span class="text-gci">{{ selectedGroup }}</span>
        </motion.p>
      </div>

      <!-- Progress Bar -->
      <div class="w-64 h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          :initial="{ x: '-100%' }"
          :animate="{ x: '0%' }"
          :transition="{ duration: 1.5, ease: 'easeInOut' }"
          class="h-full bg-gci"
        />
      </div>
    </div>
  </motion.div>
</template>
