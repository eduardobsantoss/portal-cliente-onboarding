<script setup lang="ts">
import { Banknote } from 'lucide-vue-next';

defineProps<{
  netValue: string;
}>();
</script>

<template>
  <div class="flex items-center justify-between py-8 mt-4 bg-agro-orange/5 rounded-[32px] px-8 border border-agro-orange/10">
    <div>
      <p class="text-[10px] font-black text-agro-orange uppercase tracking-[0.2em] mb-1">Total Líquido a Desembolsar</p>
      <p class="text-4xl font-black text-gci tracking-tighter">{{ netValue }}</p>
    </div>
    <div class="w-14 h-14 bg-agro-orange text-white rounded-2xl flex items-center justify-center shadow-lg shadow-agro-orange/20">
      <Banknote :size="28" />
    </div>
  </div>
</template>
