<script setup lang="ts">
import type { Component } from 'vue';
import IconBadge from './IconBadge.vue';

interface SolutionCardProps {
  category: string;
  description: string;
  icon: Component;
  variant: 'dark' | 'light';
}

defineProps<SolutionCardProps>();
</script>

<template>
  <div
    :class="[
      'p-10 rounded-[40px] transition-all duration-500 group border',
      variant === 'dark'
        ? 'bg-gci text-white border-gci shadow-2xl shadow-gci/20'
        : 'bg-white text-gray-900 border-gray-100 hover:border-gci/20 hover:shadow-xl'
    ]"
  >
    <IconBadge
      :icon="icon"
      :size="32"
      :class="[
        'w-16 h-16 rounded-2xl mb-10 transition-transform duration-500 group-hover:scale-110',
        variant === 'dark' ? 'bg-white/10 text-white' : 'bg-gray-50 text-gci'
      ]"
    />

    <span
      :class="[
        'text-[10px] font-bold tracking-[0.2em] uppercase mb-3 block',
        variant === 'dark' ? 'text-white/60' : 'text-gci'
      ]"
    >
      {{ category }}
    </span>

    <h3 class="text-2xl font-bold mb-5 leading-tight">
      <slot name="title" />
    </h3>

    <p
      :class="[
        'leading-relaxed text-sm',
        variant === 'dark' ? 'text-white/70' : 'text-gray-500'
      ]"
    >
      {{ description }}
    </p>
  </div>
</template>
