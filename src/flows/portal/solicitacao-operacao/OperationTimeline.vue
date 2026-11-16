<script setup lang="ts">
import { computed } from 'vue';
import { Check } from 'lucide-vue-next';
import type { OperationStep } from '@/types/operationRequest';
import { cn } from '@/utils/cn';
import { getOperationPhaseSteps } from '@/utils/operationFlow';

const props = defineProps<{
  step: OperationStep;
}>();

const phaseSteps = computed(() => getOperationPhaseSteps(props.step));
const currentIndexInPhase = computed(() => phaseSteps.value.findIndex((stepConfig) => stepConfig.id === props.step));
</script>

<template>
  <div class="mb-12">
    <div class="flex items-center justify-between relative px-4">
      <div class="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-0.5 bg-slate-100 z-0" />
      <div v-for="(s, idx) in phaseSteps" :key="s.id" class="relative z-10 flex flex-col items-center">
        <div
          :class="cn(
            'w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border-2',
            s.id === step ? 'bg-agro-orange border-agro-orange text-white scale-110 shadow-lg shadow-agro-orange/20' :
            currentIndexInPhase > idx ? 'bg-gci border-gci text-white' : 'bg-white border-slate-100 text-slate-300'
          )"
        >
          <Check v-if="currentIndexInPhase > idx" :size="18" :stroke-width="4" />
          <component :is="s.icon" v-else :size="18" />
        </div>
        <span
          :class="cn(
            'absolute top-full mt-3 text-[10px] font-black uppercase tracking-widest whitespace-nowrap',
            s.id === step ? 'text-agro-orange' : currentIndexInPhase > idx ? 'text-gci' : 'text-slate-300'
          )"
        >
          {{ s.label }}
        </span>
      </div>
    </div>
  </div>
</template>
