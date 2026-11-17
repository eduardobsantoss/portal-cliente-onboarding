<script setup lang="ts">
defineProps<{
  id: string;
  modelValue: boolean;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();
</script>

<template>
  <div class="flex items-start gap-[var(--space-3)]">
    <input
      :id="id"
      type="checkbox"
      :checked="modelValue"
      class="size-[var(--space-5)] shrink-0 cursor-pointer accent-[var(--gci-base)] focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
      @change="emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
    />
    <label
      :for="id"
      class="cursor-pointer text-[length:var(--text-xs)] leading-[1.55] text-[color:var(--text-muted)]"
    >
      <slot />
    </label>
  </div>
</template>
