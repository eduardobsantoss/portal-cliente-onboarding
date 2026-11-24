<script setup lang="ts">
import { Plus } from 'lucide-vue-next';

defineProps<{
  title: string;
  description: string;
  actionLabel: string;
}>();

const emit = defineEmits<{ action: [] }>();
</script>

<template>
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/70 tc:gap-[var(--space-4)] tc:rounded-[var(--radius-xl)] tc:border-0 tc:bg-[var(--surface-soft)] tc:p-[var(--space-6)]">
    <div>
      <h3 class="text-xs sm:text-sm font-bold text-slate-900 tc:text-[length:var(--text-md)] tc:font-[number:var(--weight-bold)] tc:text-[color:var(--text-strong)]">{{ title }}</h3>
      <p class="text-[11px] text-slate-500 tc:text-[length:var(--text-sm)] tc:text-[color:var(--text-muted)]">{{ description }}</p>
    </div>

    <button
      type="button"
      class="px-3.5 py-2 bg-white hover:bg-slate-100 text-gci border border-slate-200 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 shadow-sm self-start sm:self-auto tc:h-[var(--control-nav)] tc:cursor-pointer tc:gap-[var(--space-2)] tc:rounded-[var(--radius-full)] tc:border-[1.5px] tc:border-[color:var(--action-secondary-border)] tc:bg-transparent tc:px-[26px] tc:py-0 tc:text-[length:var(--text-sm)] tc:font-[number:var(--weight-semibold)] tc:text-[color:var(--action-secondary-text)] tc:shadow-none tc:hover:bg-[var(--surface-card)] tc:focus-visible:outline-none tc:focus-visible:shadow-[var(--focus-ring)]"
      @click="emit('action')"
    >
      <Plus :size="14" aria-hidden="true" />
      {{ actionLabel }}
    </button>
  </div>
</template>
