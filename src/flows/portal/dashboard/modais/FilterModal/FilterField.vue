<script setup lang="ts">
defineProps<{
  label: string;
}>();
</script>

<template>
  <div class="space-y-2">
    <label class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">{{ label }}</label>
    <slot />
  </div>
</template>
