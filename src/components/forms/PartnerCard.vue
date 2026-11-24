<script setup lang="ts">
import { Edit3, Trash2 } from 'lucide-vue-next';

defineProps<{
  avatarClassName: string;
  detailsClassName: string;
  actionsClassName: string;
  /**
   * Quando ausente o botão de remover não é exibido. Mantido como prop de função (e não `emit`)
   * justamente para detectar a ausência; `@delete="..."` continua funcionando (Vue o repassa a esta prop).
   */
  onDelete?: () => void;
  deleteTitle: string;
}>();

const emit = defineEmits<{ edit: [] }>();

/*
 * Slots: avatar, details e actionsPrefix (conteúdo opcional antes dos botões Editar/Remover, ex.: checkbox).
 */
</script>

<template>
  <div class="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-300 transition-colors tc:gap-[var(--space-4)] tc:rounded-[var(--radius-xl)] tc:border-0 tc:bg-[var(--surface-soft)] tc:p-[var(--space-6)] tc:shadow-none tc:hover:border-0">
    <div class="flex items-start gap-3">
      <div :class="avatarClassName"><slot name="avatar" /></div>
      <div :class="detailsClassName"><slot name="details" /></div>
    </div>

    <div :class="actionsClassName">
      <slot name="actionsPrefix" />

      <button
        type="button"
        class="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-gci hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1 tc:min-h-[var(--space-10)] tc:cursor-pointer tc:rounded-[var(--radius-full)] tc:px-[var(--space-4)] tc:text-[length:var(--text-sm)] tc:font-[number:var(--weight-semibold)] tc:text-[color:var(--text-strong)] tc:hover:bg-[var(--surface-card)] tc:hover:text-[color:var(--text-strong)] tc:focus-visible:outline-none tc:focus-visible:shadow-[var(--focus-ring)]"
        @click="emit('edit')"
      >
        <Edit3 :size="13" />
        Editar
      </button>
      <button
        v-if="onDelete"
        type="button"
        class="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors tc:flex tc:size-[var(--space-10)] tc:cursor-pointer tc:items-center tc:justify-center tc:rounded-[var(--radius-full)] tc:text-[color:var(--text-muted)] tc:hover:bg-[var(--danger-light)] tc:hover:text-[color:var(--danger-base)] tc:focus-visible:outline-none tc:focus-visible:shadow-[var(--focus-ring)]"
        :aria-label="deleteTitle"
        :title="deleteTitle"
        @click="onDelete()"
      >
        <Trash2 :size="15" />
      </button>
    </div>
  </div>
</template>
