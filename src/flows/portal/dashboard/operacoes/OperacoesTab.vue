<script setup lang="ts">
import type { PortalOperation } from '@/types/portalOperation';
import OperationCard from './OperationCard.vue';
import OperationsEmptyState from './OperationsEmptyState.vue';
import OperationsPagination from './OperationsPagination.vue';
import OperationsToolbar from './OperationsToolbar.vue';

defineProps<{
  operations: PortalOperation[];
  searchOperationId: string;
}>();

const emit = defineEmits<{
  searchChange: [value: string];
  openDetails: [op: PortalOperation];
  viewServices: [];
}>();
</script>

<template>
  <div class="space-y-8">
    <template v-if="operations.length > 0">
      <OperationsToolbar
        :search-operation-id="searchOperationId"
        @search-change="emit('searchChange', $event)"
      />
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <OperationCard
          v-for="op in operations.filter(op => op.id.toLowerCase().includes(searchOperationId.toLowerCase()))"
          :key="op.id"
          :op="op"
          @open-details="emit('openDetails', $event)"
        />
      </div>

      <!-- Pagination Footer for Operations -->
      <OperationsPagination :count="operations.length" />
    </template>
    <OperationsEmptyState v-else @view-services="emit('viewServices')" />
  </div>
</template>
