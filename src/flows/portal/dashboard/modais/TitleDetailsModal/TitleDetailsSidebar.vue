<script setup lang="ts">
import { Clock } from 'lucide-vue-next';
import DetailsSidebarCard from '@/flows/portal/dashboard/modais/comum/DetailsSidebarCard.vue';

defineProps<{
  status: string;
  valorNominal: string;
}>();
</script>

<template>
  <DetailsSidebarCard label="Status do Título">
    <div class="flex items-center gap-2 text-agro-orange font-black">
      <Clock :size="16" />
      {{ status }}
    </div>
  </DetailsSidebarCard>
  <DetailsSidebarCard label="Valor Nominal">
    <div class="text-2xl font-black text-white">
      {{ valorNominal }}
    </div>
  </DetailsSidebarCard>
</template>
