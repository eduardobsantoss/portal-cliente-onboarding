<script setup lang="ts">
import { motion } from 'motion-v';
import { FileText, Trash2 } from 'lucide-vue-next';
import type { OperationXmlFile } from '@/types/operationRequest';

defineProps<{
  files: OperationXmlFile[];
}>();
</script>

<template>
  <motion.div :initial="{ opacity: 0, scale: 0.95 }" :animate="{ opacity: 1, scale: 1 }" class="space-y-3">
    <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{{ files.length }} Arquivos Selecionados</p>
    <div
      v-for="(file, i) in files"
      :key="i"
      class="bg-white rounded-2xl border border-slate-100 p-5 flex items-center justify-between shadow-sm group hover:border-gci/20 transition-all"
    >
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 rounded-xl bg-gci/5 flex items-center justify-center text-gci group-hover:bg-gci group-hover:text-white transition-all">
          <FileText :size="20" />
        </div>
        <div>
          <p class="font-bold text-sm text-gci">{{ file.name }}</p>
          <p class="text-[10px] text-slate-400 font-black uppercase tracking-wider">{{ file.size }}</p>
        </div>
      </div>
      <button class="text-slate-300 hover:text-red-500 transition-colors p-2">
        <Trash2 :size="20" />
      </button>
    </div>
  </motion.div>
</template>
