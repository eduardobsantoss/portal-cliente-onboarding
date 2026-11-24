<script setup lang="ts">
import { computed } from 'vue';
import { CHECKBOX_INPUT_CLASS } from '@/constants/formStyles';

const props = defineProps<{
  checked: boolean;
  labelClassName: string;
  inputClassName?: string;
  spanClassName?: string;
}>();

const emit = defineEmits<{ change: [checked: boolean] }>();

const inputClass = computed(() => props.inputClassName ?? CHECKBOX_INPUT_CLASS);

// Dentro do theme-client (`tc:`): rótulo de 14px em `--text-strong`, no estilo do `TcCheckbox`.
const TC_LABEL = 'tc:items-start tc:gap-[var(--space-3)] tc:text-[length:var(--text-sm)] tc:text-[color:var(--text-strong)]';
const TC_SPAN = 'tc:text-[length:var(--text-sm)] tc:font-[number:var(--weight-regular)] tc:leading-[1.55] tc:text-[color:var(--text-strong)]';
</script>

<template>
  <label :class="[labelClassName, TC_LABEL]">
    <input
      type="checkbox"
      :checked="checked"
      :class="inputClass"
      @change="emit('change', ($event.target as HTMLInputElement).checked)"
    />
    <span :class="[spanClassName, TC_SPAN]"><slot /></span>
  </label>
</template>
