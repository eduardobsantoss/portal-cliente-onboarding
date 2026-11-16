<script setup lang="ts">
import { Download, FileText, Search } from 'lucide-vue-next';
import type { DocumentFile } from '@/types/dashboard';

/** Cartão de documento anexado (visualizar/baixar) das abas "Anexos". */
defineProps<{
  file: DocumentFile;
  className: string;
  iconBoxClassName: string;
}>();
</script>

<template>
  <div :class="className">
    <div class="absolute top-0 right-0 w-24 h-24 bg-gray-50 rounded-bl-full -mr-12 -mt-12 group-hover:bg-agro-orange/5 transition-colors" />

    <div class="flex items-center justify-between relative z-10">
      <div :class="iconBoxClassName">
        <FileText :size="32" />
      </div>
      <div class="flex items-center gap-1">
        <button class="p-2.5 hover:bg-gray-100 rounded-xl text-gray-400 hover:text-gci transition-all" title="Visualizar">
          <Search :size="20" />
        </button>
        <button class="p-2.5 hover:bg-gray-100 rounded-xl text-gray-400 hover:text-gci transition-all" title="Download">
          <Download :size="20" />
        </button>
      </div>
    </div>

    <div class="relative z-10">
      <div v-if="file.category" class="mb-1">
        <span class="text-[8px] font-black bg-gci/5 text-gci px-2 py-0.5 rounded-full uppercase tracking-widest">
          {{ file.category }}
        </span>
      </div>
      <p class="font-black text-base text-gci group-hover:text-agro-orange transition-colors truncate">{{ file.name }}</p>
      <div class="flex items-center gap-3 mt-2">
        <span class="text-[11px] text-gray-400 font-bold uppercase tracking-widest">{{ file.size }}</span>
        <span class="w-1.5 h-1.5 rounded-full bg-gray-200"></span>
        <span class="text-[11px] text-gray-400 font-bold uppercase tracking-widest">{{ file.date }}</span>
      </div>
    </div>
  </div>
</template>
