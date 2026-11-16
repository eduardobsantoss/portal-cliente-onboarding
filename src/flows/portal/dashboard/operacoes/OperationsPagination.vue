<script setup lang="ts">
import { ChevronLeft, ChevronRight } from 'lucide-vue-next';

/** Rodapé de paginação das operações (somente visual). */
defineProps<{
  count: number;
}>();
</script>

<template>
  <div class="mt-8 flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
    <div class="flex items-center gap-6">
      <p class="text-xs text-slate-400 font-medium">
        Mostrando <span class="font-bold text-gci">1-{{ count }}</span> de <span class="font-bold text-gci">{{ count }}</span> operações
      </p>
      <div class="flex items-center gap-2">
        <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Itens por página:</span>
        <select class="bg-slate-50 border border-slate-100 rounded-lg px-2 py-1 text-[10px] font-bold text-gci focus:outline-none focus:border-gci appearance-none cursor-pointer">
          <option>10</option>
          <option>20</option>
          <option>50</option>
        </select>
      </div>
    </div>
    <div class="flex items-center gap-2">
      <button class="p-2 rounded-lg border border-slate-100 text-slate-400 hover:bg-slate-50 transition-all disabled:opacity-50" disabled>
        <ChevronLeft :size="16" />
      </button>
      <div class="flex items-center gap-1">
        <button class="w-8 h-8 rounded-lg text-xs font-bold bg-gci text-white shadow-lg shadow-gci/10">1</button>
      </div>
      <button class="p-2 rounded-lg border border-slate-100 text-slate-400 hover:bg-slate-50 transition-all disabled:opacity-50" disabled>
        <ChevronRight :size="16" />
      </button>
    </div>
  </div>
</template>
