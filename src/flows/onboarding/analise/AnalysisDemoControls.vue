<script setup lang="ts">
import { Info, Sparkles } from 'lucide-vue-next';

const emit = defineEmits<{
  simulateApprove: [];
  simulateReject: [];
  simulateAdjustment: [];
}>();
</script>

<template>
  <div class="pt-4 border-t border-slate-100 space-y-3">
    <div class="flex items-center justify-between">
      <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
        <Info :size="13" />
        Ambiente de Demonstração Interativa
      </span>
    </div>

    <div class="flex flex-col gap-3">
      <div class="flex flex-col sm:flex-row gap-3">
        <button
          class="flex-1 px-5 py-3 bg-gci hover:bg-gci-hover text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-gci/10 flex items-center justify-center gap-2 active:scale-95"
          @click="emit('simulateApprove')"
        >
          <Sparkles :size="16" class="text-agro-orange" />
          Simular Retorno: Aprovado
        </button>

        <button
          class="px-4 py-3 bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 text-xs font-bold rounded-xl transition-all border border-slate-200 flex items-center justify-center gap-2 active:scale-95"
          @click="emit('simulateReject')"
        >
          Simular Retorno: Recusado
        </button>
      </div>

      <button
        type="button"
        class="w-full px-4 py-3 bg-white hover:bg-amber-50 text-amber-800 text-xs font-bold rounded-xl transition-all border border-amber-200 flex items-center justify-center gap-2 active:scale-95"
        @click="emit('simulateAdjustment')"
      >
        Simular Retorno: Ajuste de Documentação
      </button>
    </div>
  </div>
</template>
