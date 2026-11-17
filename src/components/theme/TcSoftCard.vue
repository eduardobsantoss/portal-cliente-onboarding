<script setup lang="ts">
withDefaults(
  defineProps<{
    radius?: 'lg' | 'xl';
  }>(),
  { radius: 'xl' },
);
</script>

<template>
  <div
    class="bg-[var(--surface-soft)]"
    :class="
      radius === 'lg'
        ? 'rounded-[var(--radius-lg)]'
        : 'rounded-[var(--radius-xl)]'
    "
  >
    <slot />
  </div>
</template>
