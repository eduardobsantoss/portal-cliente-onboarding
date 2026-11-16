<script setup lang="ts">
import { computed } from 'vue';
import { FIELD_LABEL_CLASS } from '@/constants/formStyles';

const props = defineProps<{
  wrapperClassName?: string;
  labelClassName?: string;
}>();

/*
 * Slots: label (conteúdo do rótulo) e o slot padrão (controle do campo).
 */

const labelClass = computed(() => props.labelClassName ?? FIELD_LABEL_CLASS);
</script>

<template>
  <div :class="wrapperClassName">
    <label :class="labelClass"><slot name="label" /></label>
    <slot />
  </div>
</template>
