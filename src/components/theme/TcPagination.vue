<script setup lang="ts">
import { computed } from 'vue';
import { ChevronLeft, ChevronRight } from 'lucide-vue-next';
import TcIconButton from '@/components/theme/TcIconButton.vue';

/** Paginação à direita da tabela (guidelines §7.3). `page` é 1-based. */
const props = defineProps<{
  page: number;
  pageSize: number;
  total: number;
}>();

const emit = defineEmits<{
  'update:page': [page: number];
}>();

const lastPage = computed(() => Math.max(1, Math.ceil(props.total / props.pageSize)));
const rangeLabel = computed(() => {
  if (props.total === 0) return '0 de 0';
  const from = (props.page - 1) * props.pageSize + 1;
  const to = Math.min(props.page * props.pageSize, props.total);
  return `${from}–${to} de ${props.total}`;
});
</script>

<template>
  <nav
    aria-label="Paginação"
    class="flex items-center justify-end gap-[var(--space-3)]"
  >
    <p
      aria-live="polite"
      class="m-0 text-[length:var(--text-xs)] tabular-nums text-[color:var(--text-muted)]"
    >
      {{ rangeLabel }}
    </p>
    <TcIconButton
      variant="outline"
      label="Página anterior"
      :icon="ChevronLeft"
      :disabled="props.page <= 1"
      @click="emit('update:page', props.page - 1)"
    />
    <TcIconButton
      variant="outline"
      label="Próxima página"
      :icon="ChevronRight"
      :disabled="props.page >= lastPage"
      @click="emit('update:page', props.page + 1)"
    />
  </nav>
</template>
