<script setup lang="ts">
import { computed, type Component } from 'vue';
import TcStatusLabel from '@/components/theme/TcStatusLabel.vue';
import IconBadge from './IconBadge.vue';

type Tone = 'brand' | 'light' | 'soft';

interface BenefitCardProps {
  number: string;
  title: string;
  description: string;
  icon: Component;
  /** Cor do card dentro da seção azul: azul elevado, branco ou cinza suave. */
  tone?: Tone;
}

const props = withDefaults(defineProps<BenefitCardProps>(), { tone: 'light' });

// Classes completas e estáticas para o Tailwind conseguir detectá-las.
const cardClass = computed(
  () =>
    ({
      brand:
        'border border-[color:var(--glass-border)] bg-[var(--surface-brand-raised)] text-[color:var(--text-on-brand)]',
      light: 'bg-[var(--surface-card)] text-[color:var(--text-strong)]',
      soft: 'bg-[var(--surface-soft)] text-[color:var(--text-strong)]',
    })[props.tone],
);

const badgeClass = computed(() =>
  props.tone === 'brand'
    ? 'bg-[var(--surface-card)] text-[color:var(--text-strong)]'
    : 'bg-[var(--surface-brand)] text-[color:var(--text-on-brand)]',
);

const descriptionClass = computed(() =>
  props.tone === 'brand'
    ? 'text-[color:var(--text-on-brand-muted)]'
    : 'text-[color:var(--text-muted)]',
);
</script>

<template>
  <article
    class="flex min-h-[200px] flex-col justify-between gap-[var(--space-6)] rounded-[var(--radius-lg)] p-[var(--space-6)] md:min-h-[240px] md:p-[var(--space-8)]"
    :class="cardClass"
  >
    <div class="flex items-center justify-between gap-[var(--space-4)]">
      <IconBadge
        :icon="icon"
        :size="24"
        aria-hidden="true"
        class="size-[var(--control-nav)] shrink-0 rounded-[var(--radius-full)]"
        :class="badgeClass"
      />
      <TcStatusLabel :tone="tone === 'brand' ? 'onDark' : 'default'" aria-hidden="true">
        {{ number }}
      </TcStatusLabel>
    </div>

    <div>
      <h3
        class="m-0 text-[length:var(--text-lg)] font-[number:var(--weight-bold)] leading-[var(--leading-heading)]"
      >
        {{ title }}
      </h3>
      <p
        class="m-0 mt-[var(--space-3)] max-w-[44ch] text-[length:var(--text-base)] leading-[var(--leading-body)]"
        :class="descriptionClass"
      >
        {{ description }}
      </p>
    </div>
  </article>
</template>
