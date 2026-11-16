<script setup lang="ts">
import AccountStatement from './AccountStatement.vue';
import DelinquencyChart from './DelinquencyChart.vue';
import GeralKpiGrid from './GeralKpiGrid.vue';
import ServiceQuickActions from './ServiceQuickActions.vue';

defineProps<{
  limitLabel: string;
}>();

const emit = defineEmits<{
  selectService: [serviceLabel: string];
}>();
</script>

<template>
  <div class="space-y-8">
    <!-- KPI Grid -->
    <GeralKpiGrid :limit-label="limitLabel" />

    <!-- Quick Actions -->
    <ServiceQuickActions @select-service="(serviceLabel: string) => emit('selectService', serviceLabel)" />

    <!-- Chart Section -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Left: Chart -->
      <div class="lg:col-span-2 space-y-8">
        <DelinquencyChart />
      </div>

      <!-- Right: Transactions -->
      <AccountStatement />
    </div>
  </div>
</template>
