<script setup lang="ts">
import { computed } from 'vue';
import { ArrowUpRight, Loader2 } from 'lucide-vue-next';

type Variant = 'primary' | 'inverse' | 'secondary' | 'glass';

const props = withDefaults(
  defineProps<{
    variant: Variant;
    size?: 'md' | 'hero' | 'nav';
    arrow?: boolean;
    /** Troca a seta do círculo por um spinner (use junto com `arrow`). */
    loading?: boolean;
    as?: 'button' | 'a';
    href?: string;
  }>(),
  { size: 'md', arrow: false, loading: false, as: 'button' },
);

// Classes completas e estáticas para o Tailwind conseguir detectá-las.
const fillClass = computed(
  () =>
    ({
      primary:
        'bg-[var(--action-primary-bg)] text-[color:var(--action-primary-text)] hover:bg-[var(--action-primary-bg-hover)] active:bg-[var(--action-primary-bg-active)]',
      inverse:
        'bg-[var(--action-inverse-bg)] text-[color:var(--action-inverse-text)] hover:bg-[var(--surface-soft)]',
      secondary:
        'border-[1.5px] border-[color:var(--action-secondary-border)] bg-transparent text-[color:var(--action-secondary-text)] hover:bg-[var(--surface-soft)]',
      glass:
        'border border-[color:var(--glass-border)] bg-[var(--glass-bg)] text-[color:var(--text-on-brand)]',
    })[props.variant],
);

// Primário/inverso: 60px, 15px. Secundário/glass: 52px, 14px. Hero: 64px. Nav (cabeçalho): 48px, 14px.
const isPrimaryLike = computed(
  () => props.variant === 'primary' || props.variant === 'inverse',
);

const heightClass = computed(() => {
  if (props.size === 'hero') return 'h-[var(--control-hero)]';
  if (props.size === 'nav') return 'h-[var(--control-nav)]';
  return isPrimaryLike.value
    ? 'h-[var(--control-primary)]'
    : 'h-[var(--control-secondary)]';
});

const textClass = computed(() =>
  isPrimaryLike.value && props.size !== 'nav'
    ? 'text-[length:var(--text-base)]'
    : 'text-[length:var(--text-sm)]',
);

const paddingClass = computed(() =>
  props.arrow ? 'pl-[26px] pr-[8px] justify-between gap-[var(--space-4)]' : 'px-[26px] justify-center',
);

const circleSizeClass = computed(() =>
  props.size === 'hero' ? 'size-[var(--space-12)]' : 'size-[var(--control-arrow)]',
);

// O círculo inverte contra o preenchimento do botão.
const circleColorClass = computed(() =>
  props.variant === 'primary' || props.variant === 'glass'
    ? 'bg-[var(--surface-card)] text-[color:var(--text-strong)]'
    : 'bg-[var(--surface-brand)] text-[color:var(--text-on-brand)]',
);
</script>

<template>
  <component
    :is="as"
    :type="as === 'button' ? 'button' : undefined"
    :href="as === 'a' ? href : undefined"
    class="group inline-flex cursor-pointer items-center whitespace-nowrap rounded-[var(--radius-full)] font-[number:var(--weight-semibold)] no-underline transition-colors duration-[var(--duration-base)] ease-[var(--ease-standard)] focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none"
    :class="[fillClass, heightClass, textClass, paddingClass]"
  >
    <span><slot /></span>
    <span
      v-if="arrow"
      class="inline-flex shrink-0 items-center justify-center rounded-[var(--radius-full)] transition-transform duration-500 ease-[var(--ease-standard)] motion-reduce:transition-none"
      :class="[circleSizeClass, circleColorClass, loading ? '' : 'group-hover:rotate-45']"
      aria-hidden="true"
    >
      <Loader2
        v-if="loading"
        class="size-[var(--space-5)] animate-spin"
        aria-hidden="true"
      />
      <ArrowUpRight v-else class="size-[var(--space-5)]" aria-hidden="true" />
    </span>
  </component>
</template>
