<script setup lang="ts">
defineProps<{
  title: string;
}>();

const emit = defineEmits<{ close: [] }>();

/*
 * Slots: icon (ícone ao lado do título).
 */
</script>

<template>
  <div class="flex items-center justify-between border-b border-slate-100 pb-4">
    <div class="flex items-center gap-2.5">
      <slot name="icon" />
      <h3 class="text-base font-bold text-slate-900">{{ title }}</h3>
    </div>
    <button
      type="button"
      class="text-slate-400 hover:text-slate-600 font-bold text-sm"
      @click="emit('close')"
    >
      ✕
    </button>
  </div>
</template>
