<script setup lang="ts">
import type { TermsDocument } from '@/types/terms';

defineProps<{
  document: TermsDocument;
}>();
</script>

<template>
  <div class="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 space-y-4 font-sans">
    <div class="border-b border-slate-100 pb-4 text-center">
      <h2 class="text-base font-bold text-slate-900 uppercase tracking-wide">
        {{ document.heading }}
      </h2>
      <p class="text-[11px] text-slate-400 mt-1">
        {{ document.subtitle }}
      </p>
    </div>

    <div class="space-y-3 text-xs text-slate-700">
      <template v-for="(block, index) in document.blocks" :key="index">
        <h4 v-if="block.kind === 'heading'" class="font-bold text-slate-900">{{ block.text }}</h4>
        <p v-else-if="block.kind === 'paragraph'">{{ block.text }}</p>
        <ul v-else class="list-disc pl-5 space-y-1 my-1">
          <li v-for="item in block.items" :key="item">{{ item }}</li>
        </ul>
      </template>
    </div>
  </div>
</template>
