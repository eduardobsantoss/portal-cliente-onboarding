<script setup lang="ts">
import { Smartphone, Download } from 'lucide-vue-next';

const emit = defineEmits<{
  openModal: [];
}>();
</script>

<template>
  <div class="bg-slate-50 border border-slate-200/90 rounded-2xl p-4">
    <div class="flex flex-col sm:flex-row items-center justify-between gap-3.5">
      <div class="flex items-center gap-3 text-center sm:text-left">
        <div class="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 shrink-0 shadow-sm">
          <Smartphone :size="20" class="text-slate-600" />
        </div>
        <div>
          <h3 class="text-xs font-bold text-slate-800">
            App Ceres Agrofinance
          </h3>
          <p class="text-[11px] text-slate-500 mt-0.5 leading-normal">
            Acompanhe saldos, aprove transações e antecipe duplicatas pelo smartphone.
          </p>
        </div>
      </div>

      <button
        type="button"
        @click="emit('openModal')"
        class="w-full sm:w-auto px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs rounded-xl border border-slate-200 transition-all shadow-sm flex items-center justify-center gap-1.5 shrink-0 active:scale-95"
      >
        <Download :size="14" class="text-slate-500" />
        <span>Baixar app Ceres Agrofinance</span>
      </button>
    </div>
  </div>
</template>
