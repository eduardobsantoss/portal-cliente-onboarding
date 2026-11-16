<script setup lang="ts">
import type { Component } from 'vue';

/**
 * Icon container used inside cards/steps. Sizing, color, radius and hover
 * states are passed in via `class` on the component tag (merged automatically
 * with the base flex classes below).
 */
interface IconBadgeProps {
  icon: Component;
  size?: number;
  iconClass?: string;
}

withDefaults(defineProps<IconBadgeProps>(), {
  size: 24,
  iconClass: '',
});
</script>

<template>
  <div class="flex items-center justify-center">
    <component :is="icon" :size="size" :class="iconClass" />
    <slot />
  </div>
</template>
