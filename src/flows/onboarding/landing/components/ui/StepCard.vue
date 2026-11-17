<script setup lang="ts">
import type { Component } from 'vue';
import TcSoftCard from '@/components/theme/TcSoftCard.vue';
import TcStatusLabel from '@/components/theme/TcStatusLabel.vue';

interface StepCardProps {
  number: string;
  title: string;
  description: string;
  // Mantido por compatibilidade com quem consome o componente; o card do theme-client não exibe ícone.
  icon: Component;
}

defineProps<StepCardProps>();
</script>

<template>
  <TcSoftCard
    radius="lg"
    class="flex min-h-[240px] flex-col justify-between p-[var(--space-8)]"
  >
    <TcStatusLabel>{{ number }}</TcStatusLabel>
    <div>
      <h3
        class="m-0 text-[length:var(--text-lg)] font-[number:var(--weight-bold)] leading-[var(--leading-heading)] text-[color:var(--text-strong)]"
      >
        {{ title }}
      </h3>
      <p
        class="m-0 mt-[var(--space-3)] text-[length:var(--text-base)] leading-[var(--leading-body)] text-[color:var(--text-muted)]"
      >
        {{ description }}
      </p>
    </div>
  </TcSoftCard>
</template>
