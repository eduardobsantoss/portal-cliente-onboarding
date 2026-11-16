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
</script>

<template>
  <label :class="labelClassName">
    <input
      type="checkbox"
      :checked="checked"
      :class="inputClass"
      @change="emit('change', ($event.target as HTMLInputElement).checked)"
    />
    <span :class="spanClassName"><slot /></span>
  </label>
</template>
