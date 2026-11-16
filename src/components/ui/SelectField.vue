<script setup lang="ts">
import FormField from '@/components/ui/FormField.vue';

defineProps<{
  value: string;
  options: readonly string[];
  inputClassName: string;
  required?: boolean;
  wrapperClassName?: string;
  labelClassName?: string;
}>();

const emit = defineEmits<{ change: [value: string] }>();

/*
 * Slots: label (rótulo do campo).
 */
</script>

<template>
  <FormField :wrapper-class-name="wrapperClassName" :label-class-name="labelClassName">
    <template #label><slot name="label" /></template>
    <select
      :required="required"
      :value="value"
      :class="inputClassName"
      @change="emit('change', ($event.target as HTMLSelectElement).value)"
    >
      <option v-for="option in options" :key="option" :value="option" :selected="option === value">
        {{ option }}
      </option>
    </select>
  </FormField>
</template>
