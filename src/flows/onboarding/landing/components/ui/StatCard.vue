<script setup lang="ts">
interface StatCardProps {
  label: string;
  value: string;
}

defineProps<StatCardProps>();
</script>

<template>
  <div class="bg-white/5 backdrop-blur-md border border-white/10 p-8 md:p-12 rounded-[32px] md:rounded-[40px] hover:bg-white/10 transition-colors duration-500">
    <p class="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
      {{ value }}
    </p>
    <p class="text-[10px] md:text-xs font-bold text-white/40 tracking-[0.2em] uppercase">
      {{ label }}
    </p>
  </div>
</template>
