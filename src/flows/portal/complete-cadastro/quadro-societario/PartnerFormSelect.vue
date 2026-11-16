<script setup lang="ts">
import { PARTNER_INPUT_CLASS, PARTNER_LABEL_CLASS } from '@/constants/checklistTopics';

defineProps<{
  label: string;
  value: string;
  options: readonly string[];
}>();

const emit = defineEmits<{ change: [value: string] }>();

/** Select do modal de parte relacionada (opções sem atributo `value`, como no markup original). */
</script>

<template>
  <div>
    <label :class="PARTNER_LABEL_CLASS">{{ label }}</label>
    <select
      :value="value"
      :class="PARTNER_INPUT_CLASS"
      @change="emit('change', ($event.target as HTMLSelectElement).value)"
    >
      <option v-for="option in options" :key="option">{{ option }}</option>
    </select>
  </div>
</template>
