<script setup lang="ts">
import { computed } from 'vue';
import { motion } from 'motion-v';
import { OPERATION_STEP_FRAMES } from '@/constants/operationStepFrames';
import type { OperationStep } from '@/types/operationRequest';

const props = defineProps<{
  step: OperationStep;
}>();

const frame = computed(() => OPERATION_STEP_FRAMES[props.step]);
</script>

<template>
  <motion.div :initial="frame.initial" :animate="frame.animate" :class="frame.className">
    <slot />
  </motion.div>
</template>
