<script setup lang="ts">
/** Cartão translúcido do painel esquerdo dos detalhes (rótulo + valor). */
defineProps<{
  label: string;
}>();
</script>

<template>
  <div class="bg-white/5 rounded-2xl p-6 border border-white/10">
    <p class="text-[10px] uppercase tracking-widest text-white/40 font-black mb-1">{{ label }}</p>
    <slot />
  </div>
</template>
