<script setup lang="ts">
import { Hourglass } from 'lucide-vue-next';
import DetailsSidebarCard from '@/flows/portal/dashboard/modais/comum/DetailsSidebarCard.vue';
import OperationJourney from './OperationJourney.vue';

defineProps<{
  status: string;
}>();
</script>

<template>
  <DetailsSidebarCard label="Status Atual">
    <div class="flex items-center gap-2 text-agro-orange font-black text-xl uppercase tracking-tight">
      <Hourglass :size="20" />
      {{ status }}
    </div>
  </DetailsSidebarCard>

  <OperationJourney />
</template>
