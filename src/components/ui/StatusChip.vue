<script lang="ts">
export type StatusChipTone = 'neutral' | 'muted' | 'success' | 'warning';
</script>

<script setup lang="ts">
defineProps<{
  tone: StatusChipTone;
}>();

const TONE_CLASS: Record<StatusChipTone, string> = {
  neutral: 'text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full',
  muted: 'text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full',
  success:
    'text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1',
  warning: 'text-[10px] font-bold text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded-full',
};
</script>

<template>
  <span :class="TONE_CLASS[tone]"><slot /></span>
</template>
