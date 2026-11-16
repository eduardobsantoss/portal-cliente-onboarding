<script setup lang="ts">
import { computed } from 'vue';
import type { OperationStep } from '@/types/operationRequest';
import { OPERATION_STEPS_CONFIG } from '@/constants/operationRequest';
import { cn } from '@/utils/cn';

const props = defineProps<{
  step: OperationStep;
}>();

const activeSteps = computed(() => OPERATION_STEPS_CONFIG.filter((s) => s.id === props.step));
</script>

<template>
  <div class="space-y-10">
    <div
      v-for="s in activeSteps"
      :key="s.id"
      :class="cn('flex items-center gap-6 transition-all duration-500', 'translate-x-4')"
    >
      <div
        :class="cn(
          'w-12 h-12 rounded-[20px] flex items-center justify-center transition-all duration-500 border-2',
          'bg-agro-orange border-agro-orange text-white scale-110 shadow-2xl shadow-agro-orange/30'
        )"
      >
        <component :is="s.icon" :size="20" />
      </div>
      <div>
        <p :class="cn('text-[10px] font-black uppercase tracking-[0.2em] mb-0.5', 'text-agro-orange')">Status da Operação</p>
        <p :class="cn('text-base font-black uppercase tracking-tight', 'text-white')">{{ 'Em ' + s.label }}</p>
      </div>
    </div>
  </div>
</template>
