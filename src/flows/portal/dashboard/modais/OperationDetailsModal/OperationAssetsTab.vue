<script setup lang="ts">
import AssetsPagination from './AssetsPagination.vue';
import OperationAssetsTable from './OperationAssetsTable.vue';
import OperationAssetsToolbar from './OperationAssetsToolbar.vue';

const emit = defineEmits<{
  linkAssets: [];
  addXml: [];
}>();
</script>

<template>
  <div class="space-y-8">
    <!-- Header with Total and Actions -->
    <OperationAssetsToolbar @link-assets="emit('linkAssets')" @add-xml="emit('addXml')" />

    <!-- Table from Screenshot -->
    <div class="bg-white rounded-[40px] border border-gray-100 overflow-hidden shadow-xl shadow-gray-200/50">
      <OperationAssetsTable />
      <!-- Pagination Footer for Ativos -->
      <AssetsPagination />
    </div>
  </div>
</template>
