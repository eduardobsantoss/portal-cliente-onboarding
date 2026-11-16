<script setup lang="ts">
import FormField from '@/components/ui/FormField.vue';

withDefaults(
  defineProps<{
    value: string;
    inputClassName: string;
    type?: 'text' | 'date' | 'email';
    required?: boolean;
    readOnly?: boolean;
    placeholder?: string;
    maxLength?: number;
    wrapperClassName?: string;
    labelClassName?: string;
  }>(),
  { type: 'text' },
);

const emit = defineEmits<{ change: [value: string] }>();

/*
 * Slots: label (rótulo) e footer (conteúdo extra abaixo do input).
 */
</script>

<template>
  <FormField :wrapper-class-name="wrapperClassName" :label-class-name="labelClassName">
    <template #label><slot name="label" /></template>
    <input
      :type="type"
      :maxlength="maxLength"
      :required="required"
      :readonly="readOnly"
      :placeholder="placeholder"
      :value="value"
      :class="inputClassName"
      @input="emit('change', ($event.target as HTMLInputElement).value)"
    />
    <slot name="footer" />
  </FormField>
</template>
