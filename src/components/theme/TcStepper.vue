<script setup lang="ts">
/**
 * Etapas da abertura de conta (guidelines §3 `Stepper` e §7.2). Só é usado sobre foto (texto branco).
 * `current` é 1-based (0 = nenhuma etapa atual). `doneUntil` marca as etapas concluídas; por padrão,
 * todas as anteriores à atual.
 */
const props = defineProps<{
  steps: readonly { readonly label: string }[];
  current: number;
  doneUntil?: number;
}>();

type StepState = 'done' | 'current' | 'upcoming';

const stateOf = (position: number): StepState => {
  if (position === props.current) return 'current';
  const done = props.doneUntil ?? Math.max(props.current - 1, 0);
  return position <= done ? 'done' : 'upcoming';
};
</script>

<template>
  <ol
    aria-label="Etapas da abertura de conta"
    class="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(110px,100%),1fr))] gap-[var(--space-3)] p-0"
  >
    <li
      v-for="(step, index) in steps"
      :key="step.label"
      :aria-current="stateOf(index + 1) === 'current' ? 'step' : undefined"
      class="flex flex-col gap-[var(--space-2)]"
    >
      <span
        class="block h-[var(--space-1)] rounded-[var(--radius-full)]"
        :class="
          stateOf(index + 1) === 'upcoming'
            ? 'bg-[color-mix(in_srgb,var(--white)_35%,transparent)]'
            : 'bg-[var(--white)]'
        "
        aria-hidden="true"
      />
      <span
        class="inline-flex items-center gap-[var(--space-2)] text-[length:var(--text-xs)]"
        :class="
          stateOf(index + 1) === 'current'
            ? 'font-[number:var(--weight-bold)] text-[color:var(--text-on-brand)]'
            : stateOf(index + 1) === 'done'
              ? 'font-[number:var(--weight-medium)] text-[color:var(--text-on-brand)]'
              : 'font-[number:var(--weight-medium)] text-[color-mix(in_srgb,var(--white)_86%,transparent)]'
        "
      >
        <span
          v-if="stateOf(index + 1) === 'current'"
          class="size-[var(--space-2)] shrink-0 rounded-[var(--radius-full)] bg-[var(--accent)]"
          aria-hidden="true"
        />
        {{ index + 1 }}. {{ step.label }}
        <span v-if="stateOf(index + 1) === 'done'" class="sr-only">(concluída)</span>
      </span>
    </li>
  </ol>
</template>
