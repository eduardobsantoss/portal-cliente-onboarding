<script setup lang="ts">
import { Search } from 'lucide-vue-next';
import StatusFilterTabs from '@/components/ui/StatusFilterTabs.vue';
import { OPERACOES_STATUS_TABS } from '@/constants/dashboardTabs';

defineProps<{
  searchOperationId: string;
}>();

const emit = defineEmits<{
  searchChange: [value: string];
}>();
</script>

<template>
  <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
    <StatusFilterTabs
      :labels="OPERACOES_STATUS_TABS"
      container-class-name="flex gap-1.5 p-1 bg-white border border-slate-100 rounded-xl w-fit"
      active-class-name="bg-white text-gci px-4 py-2 rounded-lg text-xs font-bold shadow-sm border border-slate-100"
      inactive-class-name="text-slate-500 px-4 py-2 rounded-lg text-xs font-bold hover:bg-slate-50 transition-colors"
    />
    <div class="relative w-full md:w-64">
      <Search class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" :size="16" />
      <input
        type="text"
        placeholder="Buscar por ID..."
        :value="searchOperationId"
        @input="emit('searchChange', ($event.target as HTMLInputElement).value)"
        class="w-full bg-white border border-slate-100 rounded-xl py-2.5 pl-10 pr-4 text-xs font-medium focus:outline-none focus:border-gci transition-all shadow-sm"
      />
    </div>
  </div>
</template>
