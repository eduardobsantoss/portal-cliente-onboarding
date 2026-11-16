<script setup lang="ts">
defineProps<{
  labels: string[];
  containerClassName: string;
  activeClassName: string;
  inactiveClassName: string;
}>();

/** Abas de filtro por status (visuais; a primeira aparece como ativa, como no original). */
</script>

<template>
  <div :class="containerClassName">
    <button
      v-for="(label, index) in labels"
      :key="label"
      :class="index === 0 ? activeClassName : inactiveClassName"
    >{{ label }}</button>
  </div>
</template>
