<script setup lang="ts">
import type { Component } from 'vue';
import IconBadge from './IconBadge.vue';

interface BenefitCardProps {
  title: string;
  description: string;
  icon: Component;
}

defineProps<BenefitCardProps>();
</script>

<template>
  <div class="bg-white p-10 rounded-[32px] border border-gray-100 hover:shadow-xl transition-all duration-300 group">
    <IconBadge
      :icon="icon"
      :size="24"
      class="w-12 h-12 rounded-xl bg-gray-50 text-gci mb-8 group-hover:bg-gci group-hover:text-white transition-colors duration-300"
    />
    <h3 class="text-xl font-bold text-gray-900 mb-4">{{ title }}</h3>
    <p class="text-gray-500 text-sm leading-relaxed">
      {{ description }}
    </p>
  </div>
</template>
