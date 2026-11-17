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
  <div
    class="group border-t border-[color:var(--border-subtle)] py-[var(--space-7)] transition-colors duration-[var(--duration-slow)] hover:border-[color:var(--border-strong)] motion-reduce:transition-none"
  >
    <div
      class="transition-[translate] duration-[var(--duration-slow)] ease-[var(--ease-standard)] group-hover:translate-x-1.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
    >
      <IconBadge
        :icon="icon"
        :size="24"
        aria-hidden="true"
        class="size-[var(--space-6)] justify-start text-[color:var(--text-strong)]"
      />
      <h3
        class="m-0 mt-[var(--space-4)] text-[length:var(--text-lg)] font-[number:var(--weight-bold)] leading-[var(--leading-heading)] text-[color:var(--text-strong)]"
      >
        {{ title }}
      </h3>
      <p
        class="m-0 mt-[var(--space-3)] text-[length:var(--text-base)] leading-[var(--leading-body)] text-[color:var(--text-muted)]"
      >
        {{ description }}
      </p>
    </div>
  </div>
</template>
