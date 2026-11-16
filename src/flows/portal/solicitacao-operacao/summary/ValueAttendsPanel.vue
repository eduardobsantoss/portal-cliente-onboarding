<script setup lang="ts">
import type { OperationValueAttends } from '@/types/operationRequest';
import ValueAttendsActions from './ValueAttendsActions.vue';
import ValueAttendsChoice from './ValueAttendsChoice.vue';

defineProps<{
  valueAttends: OperationValueAttends;
}>();

const emit = defineEmits<{
  setValueAttends: [value: OperationValueAttends];
  agree: [];
  recusar: [];
  uploadMore: [];
}>();
</script>

<template>
  <div class="bg-white rounded-[40px] border border-slate-100 p-8 shadow-xl shadow-slate-100/30 text-center space-y-8">
    <div class="space-y-6">
      <h3 class="text-xl font-black text-gci">Este valor estimado te atende?</h3>

      <ValueAttendsChoice
        :value-attends="valueAttends"
        @set-value-attends="emit('setValueAttends', $event)"
      />

      <ValueAttendsActions
        :value-attends="valueAttends"
        @agree="emit('agree')"
        @recusar="emit('recusar')"
        @upload-more="emit('uploadMore')"
      />
    </div>
  </div>
</template>
