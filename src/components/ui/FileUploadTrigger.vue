<script setup lang="ts">
defineProps<{
  inputId: string;
  className: string;
}>();

/**
 * Label que abre o seletor de arquivos do `FileUpload` com o mesmo `id`.
 * Dentro do theme-client (`tc:`) vira um botão secundário (`TcButton variant="secondary" size="nav"`),
 * qualquer que seja a cor passada por quem usa.
 */
const TC_TRIGGER =
  'tc:inline-flex tc:h-[var(--control-nav)] tc:cursor-pointer tc:items-center tc:justify-center tc:gap-[var(--space-2)] tc:whitespace-nowrap tc:rounded-[var(--radius-full)] tc:border-[1.5px] tc:border-[color:var(--action-secondary-border)] tc:bg-transparent tc:px-[26px] tc:py-0 tc:text-[length:var(--text-sm)] tc:font-[number:var(--weight-semibold)] tc:text-[color:var(--action-secondary-text)] tc:shadow-none tc:hover:bg-[var(--surface-soft)] tc:hover:text-[color:var(--action-secondary-text)] tc:hover:shadow-none tc:focus-within:shadow-[var(--focus-ring)]';
</script>

<template>
  <label :for="inputId" :class="[className, TC_TRIGGER]">
    <slot />
  </label>
</template>
