<script setup lang="ts">
import { Search } from 'lucide-vue-next';
import type { FaqItem } from '@/types/faq';
import FaqAccordionItem from './FaqAccordionItem.vue';

defineProps<{
  search: string;
  faqs: FaqItem[];
  expandedId: string | null;
}>();

const emit = defineEmits<{
  searchChange: [value: string];
  toggle: [id: string];
}>();
</script>

<template>
  <div class="space-y-4">
    <!-- Search -->
    <div class="relative">
      <Search :size="15" class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
      <input
        type="text"
        :value="search"
        placeholder="Pesquisar dúvida (ex: Balanço, IRPF, Recibo, Junta)..."
        class="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-gci transition-all"
        @input="emit('searchChange', ($event.target as HTMLInputElement).value)"
      />
    </div>

    <!-- FAQ Accordion List -->
    <div class="space-y-2.5 pt-1">
      <FaqAccordionItem
        v-for="faq in faqs"
        :key="faq.id"
        :faq="faq"
        :is-expanded="expandedId === faq.id"
        @toggle="emit('toggle', faq.id)"
      />
    </div>
  </div>
</template>
