<script setup lang="ts">
import { motion } from 'motion-v';
import { AlertTriangle, CheckCircle2 } from 'lucide-vue-next';
import ValidationSpinner from '@/components/ui/ValidationSpinner.vue';

const emit = defineEmits<{
  approve: [];
  adjust: [];
}>();

/** Tela "Validando documentação" com os controles de simulação (aprovar / ajustes necessários). */
</script>

<template>
  <div class="max-w-2xl mx-auto py-6 animate-in fade-in duration-300">
    <motion.div
      :initial="{ opacity: 0, scale: 0.98 }"
      :animate="{ opacity: 1, scale: 1 }"
      class="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-6 sm:p-10 text-center space-y-6"
    >
      <div class="text-center py-6 md:py-10 space-y-8">
        <!-- 1. Anel Giratório com Pulso Central -->
        <ValidationSpinner />

        <div class="space-y-2">
          <h3 class="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Validando documentação
          </h3>
          <p class="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed max-w-md mx-auto">
            Estamos conferindo a nitidez, integridade e conformidade de todos os dados e anexos enviados.
          </p>
        </div>

        <!-- Simulation controls -->
        <div class="pt-4 border-t border-slate-100">
          <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-3">
            Controles de Simulação
          </span>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <button
              type="button"
              class="w-full sm:w-auto flex-1 px-4 py-2.5 bg-gci hover:bg-gci-hover text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-gci/15 flex items-center justify-center gap-1.5 active:scale-95"
              @click="emit('approve')"
            >
              <CheckCircle2 :size="15" />
              Aprovar Validação
            </button>

            <button
              type="button"
              class="w-full sm:w-auto flex-1 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-amber-500/15 flex items-center justify-center gap-1.5 active:scale-95"
              @click="emit('adjust')"
            >
              <AlertTriangle :size="15" />
              Ajustes Necessários
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  </div>
</template>
