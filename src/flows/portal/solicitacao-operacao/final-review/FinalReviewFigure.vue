<script setup lang="ts">
defineProps<{
  label: string;
  value: string;
  valueClassName: string;
}>();
</script>

<template>
  <div class="space-y-1">
    <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-tight">{{ label }}</p>
    <p :class="valueClassName">{{ value }}</p>
  </div>
</template>
