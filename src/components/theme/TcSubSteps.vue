<script setup lang="ts">
import { Check } from 'lucide-vue-next';

/**
 * Indicador secundário das etapas internas de um formulário (ex.: Empresa, Endereço, Sócios).
 * `current` é 1-based. Fica dentro do conteúdo, nunca no stepper principal.
 */
const props = defineProps<{
  steps: string[];
  current: number;
}>();

const stateOf = (position: number) =>
  position < props.current ? 'done' : position === props.current ? 'current' : 'upcoming';
</script>

<template>
  <div class="flex flex-wrap items-center justify-between gap-x-[var(--space-4)] gap-y-[var(--space-3)]">
    <ol
      aria-label="Etapas deste formulário"
      class="m-0 flex list-none flex-wrap items-center gap-[var(--space-2)] p-0"
    >
      <li
        v-for="(step, index) in props.steps"
        :key="step"
        :aria-current="stateOf(index + 1) === 'current' ? 'step' : undefined"
        class="inline-flex h-[var(--space-10)] items-center gap-[var(--space-2)] whitespace-nowrap rounded-[var(--radius-full)] px-[var(--space-4)] text-[length:var(--text-xs)]"
        :class="{
          'bg-[var(--surface-soft)] font-[number:var(--weight-semibold)] text-[color:var(--text-strong)]':
            stateOf(index + 1) === 'done',
          'bg-[var(--surface-brand)] font-[number:var(--weight-bold)] text-[color:var(--text-on-brand)]':
            stateOf(index + 1) === 'current',
          'border-[1.5px] border-dashed border-[color:var(--border-dashed)] font-[number:var(--weight-semibold)] text-[color:var(--text-muted)]':
            stateOf(index + 1) === 'upcoming',
        }"
      >
        <Check
          v-if="stateOf(index + 1) === 'done'"
          class="size-[var(--text-sm)] shrink-0"
          aria-hidden="true"
        />
        {{ step }}
        <span v-if="stateOf(index + 1) === 'done'" class="sr-only">(concluída)</span>
      </li>
    </ol>

    <p class="m-0 text-[length:var(--text-xs)] tabular-nums text-[color:var(--text-muted)]">
      Passo {{ props.current }} de {{ props.steps.length }}
    </p>
  </div>
</template>
