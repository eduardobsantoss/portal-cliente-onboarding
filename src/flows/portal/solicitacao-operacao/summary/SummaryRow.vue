<script setup lang="ts">
defineProps<{
  rowClassName: string;
  labelClassName: string;
  valueClassName: string;
  label: string;
  value: string;
}>();
</script>

<template>
  <div :class="rowClassName">
    <span :class="labelClassName">{{ label }}</span>
    <span :class="valueClassName">{{ value }}</span>
  </div>
</template>
