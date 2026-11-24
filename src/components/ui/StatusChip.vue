<script lang="ts">
export type StatusChipTone = 'neutral' | 'muted' | 'success' | 'warning';
</script>

<script setup lang="ts">
defineProps<{
  tone: StatusChipTone;
}>();

// Dentro do theme-client (`tc:`) o chip segue o `TcStatusChip`: 28px, 12px/600, sem borda; cores por tom.
const TC_BASE =
  'tc:inline-flex tc:h-[var(--space-7)] tc:items-center tc:gap-[var(--space-1)] tc:whitespace-nowrap tc:rounded-[var(--radius-full)] tc:border-0 tc:px-[var(--space-3)] tc:py-0 tc:text-[length:var(--text-eyebrow)] tc:font-[number:var(--weight-semibold)]';
const TC_NEUTRAL = `${TC_BASE} tc:bg-[var(--surface-soft)] tc:text-[color:var(--text-strong)]`;

const TONE_CLASS: Record<StatusChipTone, string> = {
  neutral: `text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full ${TC_NEUTRAL}`,
  muted: `text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full ${TC_NEUTRAL}`,
  success: `text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1 ${TC_BASE} tc:bg-[var(--success-light)] tc:text-[color:var(--success-dark)]`,
  warning: `text-[10px] font-bold text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded-full ${TC_BASE} tc:bg-[var(--warning-light)] tc:text-[color:var(--warning-dark)]`,
};
</script>

<template>
  <span :class="TONE_CLASS[tone]"><slot /></span>
</template>
