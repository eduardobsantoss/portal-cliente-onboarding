<script setup lang="ts">
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-vue-next';

/** Rodapé de paginação da carteira (somente visual). */
defineProps<{
  total: number;
}>();
</script>

<template>
  <div class="px-6 py-4 border-t border-slate-50 flex items-center justify-between bg-white">
    <div class="flex items-center gap-6">
      <p class="text-xs text-slate-400 font-medium">
        Mostrando <span class="font-bold text-gci">{{ total > 0 ? `1-${total}` : '0-0' }}</span> de <span class="font-bold text-gci">{{ total }}</span> títulos
      </p>
      <div class="flex items-center gap-2">
        <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Itens por página:</span>
        <div class="relative">
          <select class="bg-slate-50 border border-slate-100 rounded-lg pl-3 pr-8 py-1.5 text-[10px] font-bold text-gci focus:outline-none focus:border-gci appearance-none cursor-pointer min-w-[60px]">
            <option>10</option>
            <option>20</option>
            <option>50</option>
          </select>
          <ChevronDown class="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" :size="12" />
        </div>
      </div>
    </div>
    <div class="flex items-center gap-2">
      <button class="p-2 rounded-lg border border-slate-100 text-slate-400 hover:bg-slate-50 transition-all disabled:opacity-50" disabled>
        <ChevronLeft :size="16" />
      </button>
      <div class="flex items-center gap-1">
        <button
          v-for="(page, i) in [1]"
          :key="i"
          :class="`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
            page === 1 ? 'bg-slate-200 text-slate-400' : 'text-slate-400 hover:bg-slate-50'
          }`"
        >
          {{ page }}
        </button>
      </div>
      <button class="p-2 rounded-lg border border-slate-100 text-slate-400 hover:bg-slate-50 transition-all disabled:opacity-50" disabled>
        <ChevronRight :size="16" />
      </button>
    </div>
  </div>
</template>
