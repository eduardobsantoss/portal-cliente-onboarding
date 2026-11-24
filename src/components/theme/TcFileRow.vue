<script setup lang="ts">
import { computed } from 'vue';
import { Loader2 } from 'lucide-vue-next';

/**
 * Linha de envio de documento dentro de um acordeão (guidelines §7.3).
 * Slots: `meta` (chip de status), `field` (campo extra, ex.: data de validade), `actions` (enviar/excluir)
 * e `notice` (aviso em largura total, ex.: motivo do ajuste).
 */
type Status = 'empty' | 'uploading' | 'uploaded' | 'attention';

const props = withDefaults(
  defineProps<{
    title: string;
    description?: string;
    status?: Status;
  }>(),
  { status: 'empty' },
);

const borderClass = computed(
  () =>
    ({
      empty: 'border-[1.5px] border-dashed border-[color:var(--border-dashed)]',
      uploading: 'border border-[color:var(--border-subtle)]',
      uploaded: 'border border-[color:var(--border-subtle)]',
      attention: 'border-[1.5px] border-[color:var(--warning-base)]',
    })[props.status],
);
</script>

<template>
  <div
    class="flex min-h-[calc(var(--space-16)+var(--space-2))] flex-col gap-[var(--space-3)] rounded-[var(--radius-lg)] bg-[var(--surface-card)] px-[var(--space-5)] py-[var(--space-4)]"
    :class="borderClass"
  >
    <div class="flex flex-wrap items-center gap-x-[var(--space-4)] gap-y-[var(--space-3)]">
      <div class="flex min-w-0 flex-[1_1_220px] flex-col gap-[var(--space-1)]">
        <p
          class="m-0 text-[length:var(--text-base)] font-[number:var(--weight-semibold)] leading-[var(--leading-snug)] text-[color:var(--text-strong)]"
        >
          {{ props.title }}
        </p>
        <p
          v-if="props.description"
          class="m-0 text-[length:var(--text-xs)] leading-[var(--leading-snug)] text-[color:var(--text-muted)]"
        >
          {{ props.description }}
        </p>
        <!-- Região sempre presente, para o leitor de tela anunciar quando o envio começa -->
        <p
          aria-live="polite"
          class="m-0 inline-flex items-center gap-[var(--space-2)] text-[length:var(--text-xs)] text-[color:var(--text-muted)]"
        >
          <template v-if="props.status === 'uploading'">
            <Loader2 class="size-[var(--text-sm)] animate-spin motion-reduce:animate-none" aria-hidden="true" />
            Enviando…
          </template>
        </p>
      </div>

      <div v-if="$slots.meta" class="shrink-0">
        <slot name="meta" />
      </div>

      <div v-if="$slots.field" class="min-w-0 flex-[0_1_220px]">
        <slot name="field" />
      </div>

      <div v-if="$slots.actions" class="flex shrink-0 flex-wrap items-center gap-[var(--space-2)]">
        <slot name="actions" />
      </div>
    </div>

    <div v-if="$slots.notice">
      <slot name="notice" />
    </div>
  </div>
</template>
