<script setup lang="ts">
/**
 * Polymorphic CTA button/link used across the site.
 * Renders an <a> when `href` is provided, otherwise a <button>.
 * `variant` only carries the color scheme; sizing/spacing/borders are
 * passed in by the caller via `class` so every instance keeps its exact
 * original look.
 */
type ButtonVariant = 'solid-light' | 'solid-dark' | 'outline-light' | 'plain';

interface BaseButtonProps {
  href?: string;
  variant?: ButtonVariant;
  external?: boolean;
}

const props = withDefaults(defineProps<BaseButtonProps>(), {
  variant: 'plain',
  external: true,
});

const variantClasses: Record<ButtonVariant, string> = {
  'solid-light': 'bg-white hover:bg-gray-100 text-gci',
  'solid-dark': 'bg-gci hover:bg-gci-hover text-white',
  'outline-light': 'text-white hover:bg-white/10',
  plain: '',
};
</script>

<template>
  <a
    v-if="href"
    :href="href"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    :class="variantClasses[props.variant]"
  >
    <slot />
  </a>
  <button v-else type="button" :class="variantClasses[props.variant]">
    <slot />
  </button>
</template>
