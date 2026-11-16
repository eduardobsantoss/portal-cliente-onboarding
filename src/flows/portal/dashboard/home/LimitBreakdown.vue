<script setup lang="ts">
import { Clock, TrendingUp, Wallet } from 'lucide-vue-next';
import { LIMIT_AVAILABLE_LABEL, LIMIT_EMPTY_LABEL } from '@/constants/analysis';

/** Cartões de limite para desconto e disponível para antecipação. */
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div class="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex flex-col justify-between group hover:shadow-md transition-all">
      <div>
        <div class="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 mb-6 group-hover:bg-gci group-hover:text-white transition-all">
          <Wallet :size="24" />
        </div>
        <p class="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Limite para Desconto de Duplicata</p>
        <h3 class="text-3xl font-black text-gci tracking-tight">{{ LIMIT_AVAILABLE_LABEL }}</h3>
      </div>
      <div class="mt-8 pt-8 border-t border-slate-50 flex items-center justify-between">
        <span class="text-xs font-bold text-slate-500">Utilizado: {{ LIMIT_EMPTY_LABEL }}</span>
        <div class="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
          <div class="w-[0%] h-full bg-gci rounded-full" />
        </div>
      </div>
    </div>

    <div class="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm group hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        <div class="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-agro-orange mb-6 group-hover:bg-agro-orange group-hover:text-white transition-all">
          <TrendingUp :size="24" />
        </div>
        <p class="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Disponível para Antecipação de Duplicata</p>
        <h3 class="text-4xl font-black text-gci tracking-tight">{{ LIMIT_AVAILABLE_LABEL }}</h3>
      </div>
      <div class="mt-8 pt-8 border-t border-slate-50">
        <div class="flex items-center gap-2 text-gci font-bold text-xs uppercase tracking-wider">
          <Clock :size="16" />
          Limite liberado para antecipação
        </div>
      </div>
    </div>
  </div>
</template>
