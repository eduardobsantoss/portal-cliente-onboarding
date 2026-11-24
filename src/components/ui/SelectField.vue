<script setup lang="ts">
import { ChevronDown } from 'lucide-vue-next';
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
 * Dentro do theme-client (`tc:`) o select segue o `TcSelectField`: sem seta nativa e com o ChevronDown à direita.
 */
</script>

<template>
  <FormField :wrapper-class-name="wrapperClassName" :label-class-name="labelClassName">
    <template #label><slot name="label" /></template>
    <div class="relative">
      <select
        :required="required"
        :value="value"
        :class="[inputClassName, 'tc:cursor-pointer tc:appearance-none tc:pr-[var(--space-12)]']"
        @change="emit('change', ($event.target as HTMLSelectElement).value)"
      >
        <option v-for="option in options" :key="option" :value="option" :selected="option === value">
          {{ option }}
        </option>
      </select>
      <ChevronDown
        class="pointer-events-none absolute right-5 top-1/2 hidden size-[18px] -translate-y-1/2 tc:block tc:text-[color:var(--text-strong)]"
        aria-hidden="true"
      />
    </div>
  </FormField>
</template>
