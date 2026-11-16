<script setup lang="ts">
import type { Component } from 'vue';
import IconBadge from './IconBadge.vue';

interface StepCardProps {
  number: string;
  title: string;
  description: string;
  icon: Component;
}

defineProps<StepCardProps>();
</script>

<template>
  <div class="relative z-10 text-center">
    <IconBadge
      :icon="icon"
      :size="28"
      icon-class="md:w-8 md:h-8"
      class="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gray-50 text-gci mx-auto mb-8 md:mb-10 relative shadow-sm border border-gray-100 group hover:bg-gci hover:text-white transition-colors duration-500"
    >
      <span class="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-7 h-7 md:w-8 md:h-8 rounded-full bg-gci text-white text-[10px] md:text-xs font-bold flex items-center justify-center border-4 border-white">
        {{ number }}
      </span>
    </IconBadge>
    <h3 class="text-xl md:text-2xl font-bold text-gray-900 mb-4">{{ title }}</h3>
    <p class="text-gray-500 text-sm leading-relaxed max-w-[280px] mx-auto">
      {{ description }}
    </p>
  </div>
</template>
