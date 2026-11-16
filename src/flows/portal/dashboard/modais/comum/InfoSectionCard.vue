<script setup lang="ts">
import type { Component } from 'vue';
import type { InfoItem } from '@/types/dashboard';

/** Bloco "título + grade de rótulo/valor" das abas de detalhes. */
defineProps<{
  icon: Component;
  title: string;
  items: InfoItem[];
  className: string;
  headerClassName: string;
  labelClassName: string;
  valueClassName: string;
}>();
</script>

<template>
  <div :class="className">
    <div :class="headerClassName">
      <h4 class="text-xs font-black text-gci uppercase tracking-widest flex items-center gap-2">
        <component :is="icon" :size="14" class="text-agro-orange" />
        {{ title }}
      </h4>
    </div>
    <div class="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-10">
      <div v-for="(info, i) in items" :key="i" class="group">
        <p :class="labelClassName">{{ info.label }}</p>
        <p :class="valueClassName">{{ info.value }}</p>
      </div>
    </div>
  </div>
</template>
