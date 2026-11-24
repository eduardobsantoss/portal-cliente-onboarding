<script setup lang="ts">
import { computed, inject } from 'vue';
import type { Component } from 'vue';
import { X } from 'lucide-vue-next';
import TcIconButton from '@/components/theme/TcIconButton.vue';

/**
 * Aviso temporário (guidelines §7.3). Dentro de um `TcToastRegion` os toasts empilham; sozinho, ele mesmo
 * vai para o `<body>` e se fixa no canto superior direito.
 * Quem usa decide quando montar e desmontar (`v-if`) e reage ao `close`.
 */
type Tone = 'info' | 'success' | 'warning' | 'danger';

const props = defineProps<{
  tone: Tone;
  title: string;
  icon: Component;
  role?: 'status' | 'alert';
}>();

const emit = defineEmits<{
  close: [];
}>();

const inRegion = inject<boolean>('tcToastRegion', false);
const resolvedRole = computed(() => props.role ?? (props.tone === 'danger' ? 'alert' : 'status'));

const circleClass: Record<Tone, string> = {
  info: 'bg-[var(--surface-brand)] text-[color:var(--text-on-brand)]',
  success: 'bg-[var(--success-light)] text-[color:var(--success-dark)]',
  warning: 'bg-[var(--warning-light)] text-[color:var(--warning-dark)]',
  danger: 'bg-[var(--danger-light)] text-[color:var(--danger-dark)]',
};
</script>

<template>
  <Teleport to="body" :disabled="inRegion">
    <div
      :class="
        inRegion
          ? ''
          : 'theme-client fixed right-[var(--space-5)] top-[var(--space-5)] z-[var(--z-toast)] lg:top-[120px]'
      "
      :style="inRegion ? undefined : { background: 'transparent' }"
    >
      <div
        :role="resolvedRole"
        class="tc-toast pointer-events-auto flex w-full max-w-[420px] items-start gap-[var(--space-4)] rounded-[var(--radius-lg)] bg-[var(--surface-card)] px-[var(--space-6)] py-[var(--space-5)] text-[color:var(--text-strong)] shadow-[var(--shadow-float)]"
      >
        <span
          class="inline-flex size-[var(--space-12)] shrink-0 items-center justify-center rounded-[var(--radius-full)]"
          :class="circleClass[props.tone]"
          aria-hidden="true"
        >
          <component :is="props.icon" class="size-[var(--space-6)]" aria-hidden="true" />
        </span>

        <div class="flex min-w-0 flex-1 flex-col gap-[var(--space-1)]">
          <p
            class="m-0 text-[length:var(--text-md)] font-[number:var(--weight-bold)] leading-[var(--leading-snug)]"
          >
            {{ props.title }}
          </p>
          <div class="text-[length:var(--text-sm)] leading-[var(--leading-body)]">
            <slot />
          </div>
          <div v-if="$slots.actions" class="mt-[var(--space-2)] flex flex-wrap gap-[var(--space-2)]">
            <slot name="actions" />
          </div>
        </div>

        <TcIconButton
          variant="outline"
          :size="40"
          label="Fechar aviso"
          :icon="X"
          @click="emit('close')"
        />
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
/* Entrada suave; desligada com prefers-reduced-motion */
@media (prefers-reduced-motion: no-preference) {
  .tc-toast {
    animation: tc-toast-in var(--duration-slow) var(--ease-out) both;
  }
}

@keyframes tc-toast-in {
  from {
    opacity: 0;
    transform: translateY(calc(var(--space-2) * -1));
  }
  to {
    opacity: 1;
    transform: none;
  }
}
</style>
