<script setup lang="ts">
import TcGlassCard from '@/components/theme/TcGlassCard.vue';
import TcStatusLabel from '@/components/theme/TcStatusLabel.vue';

interface StatCardProps {
  label: string;
  value: string;
}

defineProps<StatCardProps>();
</script>

<template>
  <TcGlassCard>
    <p
      data-countup
      class="m-0 whitespace-nowrap text-[length:var(--text-3xl-fluid)] font-[number:var(--weight-black)] leading-[var(--leading-display)] tracking-[var(--tracking-display)] tabular-nums text-[color:var(--text-on-brand)]"
    >
      {{ value }}
    </p>
    <TcStatusLabel tone="onDark" class="mt-[var(--space-3)]">
      {{ label }}
    </TcStatusLabel>
  </TcGlassCard>
</template>
