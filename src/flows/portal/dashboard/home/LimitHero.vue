<script setup lang="ts">
import { motion, AnimatePresence } from 'motion-v';
import { ArrowRight, Shield } from 'lucide-vue-next';
import { LIMIT_AVAILABLE_LABEL } from '@/constants/analysis';
import PendingBlockToast from '@/flows/portal/dashboard/toasts/PendingBlockToast.vue';
import type { PendingToastSource } from '@/types/dashboard';

/** Destaque do limite: chamada para a análise de crédito ou valor já liberado para antecipação. */
defineProps<{
  isLimitReleased: boolean;
  activePendingToastSource: PendingToastSource | null;
}>();

const emit = defineEmits<{
  anticipate: [];
  startCreditAnalysis: [];
  dismissPendingToast: [];
  goToCarteira: [];
}>();
</script>

<template>
  <motion.div
    :initial="{ opacity: 0, y: 20 }"
    :animate="{ opacity: 1, y: 0 }"
    class="relative bg-gci rounded-[40px] p-8 md:p-12 overflow-hidden shadow-2xl shadow-gci/20 text-white"
  >
    <div class="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent skew-x-[-20deg] translate-x-20" />
    <div class="absolute -right-20 -bottom-20 w-96 h-96 bg-agro-orange/10 rounded-full blur-[100px]" />

    <div class="relative z-10 max-w-3xl">
      <div class="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6 border border-white/10">
        <Shield :size="14" class="text-agro-orange" />
        <span class="text-[10px] font-black uppercase tracking-widest">
          {{ isLimitReleased ? 'Crédito Pré-Aprovado' : 'Limite de Crédito' }}
        </span>
      </div>
      <template v-if="isLimitReleased">
        <h2 class="text-3xl md:text-5xl font-black leading-[1.1] mb-6">
          Você tem <span class="text-agro-orange whitespace-nowrap">{{ LIMIT_AVAILABLE_LABEL }}</span> <br class="hidden md:block" /> disponível para antecipação de recebíveis.
        </h2>
        <p class="text-base text-white/70 mb-10 leading-relaxed font-medium">
          Antecipe seus valores a receber. Sem burocracia, 100% digital e com taxas competitivas.
        </p>
      </template>
      <template v-else>
        <h2 class="text-3xl md:text-5xl font-black leading-[1.1] mb-6">
          Libere o seu limite de crédito para antecipar recebíveis.
        </h2>
        <p class="text-base text-white/70 mb-10 leading-relaxed font-medium">
          Conclua a análise de crédito em poucos passos e comece a antecipar com taxas competitivas.
        </p>
      </template>
      <div class="relative inline-block">
        <button
          v-if="isLimitReleased"
          @click="emit('anticipate')"
          class="group bg-white text-gci px-10 py-5 rounded-[24px] font-black text-base transition-all hover:shadow-2xl hover:shadow-white/20 active:scale-95 flex items-center gap-4 uppercase tracking-widest"
        >
          Antecipar Agora
          <ArrowRight :size="20" class="group-hover:translate-x-1 transition-transform" />
        </button>
        <button
          v-else
          @click="emit('startCreditAnalysis')"
          class="group bg-white text-gci px-10 py-5 rounded-[24px] font-black text-base transition-all hover:shadow-2xl hover:shadow-white/20 active:scale-95 flex items-center gap-4 uppercase tracking-widest"
        >
          Liberar meu limite
          <ArrowRight :size="20" class="group-hover:translate-x-1 transition-transform" />
        </button>
        <AnimatePresence>
          <PendingBlockToast
            v-if="isLimitReleased && activePendingToastSource === 'hero'"
            source="hero"
            @close="emit('dismissPendingToast')"
            @go-to-carteira="emit('goToCarteira')"
          />
        </AnimatePresence>
      </div>
    </div>
  </motion.div>
</template>
