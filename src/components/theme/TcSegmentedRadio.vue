<script setup lang="ts">
defineProps<{
  name: string;
  modelValue: string;
  options: { value: string; label: string }[];
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();
</script>

<template>
  <!-- Radios nativos: setas do teclado e leitores de tela funcionam sem código extra. -->
  <div
    role="radiogroup"
    class="flex gap-[var(--space-1)] rounded-[var(--radius-full)] bg-[var(--surface-soft)] p-[6px]"
  >
    <label
      v-for="option in options"
      :key="option.value"
      class="relative flex h-[var(--control-nav)] flex-1 cursor-pointer items-center justify-center whitespace-nowrap rounded-[var(--radius-full)] px-[var(--space-4)] text-[length:var(--text-sm)] font-[number:var(--weight-semibold)] text-[color:var(--text-strong)] transition-colors duration-[var(--duration-base)] has-[:checked]:bg-[var(--surface-brand)] has-[:checked]:font-[number:var(--weight-bold)] has-[:checked]:text-[color:var(--text-on-brand)] has-[:focus-visible]:shadow-[var(--focus-ring)] motion-reduce:transition-none"
    >
      <input
        type="radio"
        :name="name"
        :value="option.value"
        :checked="modelValue === option.value"
        class="sr-only"
        @change="emit('update:modelValue', option.value)"
      />
      {{ option.label }}
    </label>
  </div>
</template>
