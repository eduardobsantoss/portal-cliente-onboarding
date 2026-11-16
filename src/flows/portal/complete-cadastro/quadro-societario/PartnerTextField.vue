<script setup lang="ts">
import { PARTNER_INPUT_CLASS, PARTNER_LABEL_CLASS } from '@/constants/checklistTopics';

withDefaults(
  defineProps<{
    label: string;
    value: string | number;
    type?: 'text' | 'number';
    required?: boolean;
    placeholder?: string;
  }>(),
  { type: 'text', required: undefined, placeholder: undefined }
);

const emit = defineEmits<{ change: [value: string] }>();

/** Input de texto/número do modal de parte relacionada (mesma ordem de atributos do markup original). */
</script>

<template>
  <div>
    <label :class="PARTNER_LABEL_CLASS">{{ label }}</label>
    <input
      :type="type"
      :required="required"
      :value="value"
      :class="PARTNER_INPUT_CLASS"
      :placeholder="placeholder"
      @input="emit('change', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>
