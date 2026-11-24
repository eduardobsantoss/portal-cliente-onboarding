<script setup lang="ts">
defineProps<{
  labels: string[];
  containerClassName: string;
  activeClassName: string;
  inactiveClassName: string;
}>();

/**
 * Abas de filtro por status (visuais; a primeira aparece como ativa, como no original).
 * Dentro do theme-client (`tc:`) seguem o `TcPillTabs`: trilho suave em pílula e aba ativa em azul.
 */
const TC_CONTAINER =
  'tc:inline-flex tc:w-fit tc:gap-[var(--space-1)] tc:rounded-[var(--radius-full)] tc:border-0 tc:bg-[var(--surface-soft)] tc:p-[calc(var(--space-1)+var(--space-1)/2)] tc:shadow-none';
const TC_TAB =
  'tc:inline-flex tc:h-[var(--control-arrow)] tc:cursor-pointer tc:items-center tc:whitespace-nowrap tc:rounded-[var(--radius-full)] tc:border-0 tc:px-[var(--space-5)] tc:py-0 tc:text-[length:var(--text-xs)] tc:font-[number:var(--weight-semibold)] tc:shadow-none tc:focus-visible:outline-none tc:focus-visible:shadow-[var(--focus-ring)]';
const TC_ACTIVE = `${TC_TAB} tc:bg-[var(--surface-brand)] tc:text-[color:var(--text-on-brand)]`;
const TC_INACTIVE = `${TC_TAB} tc:bg-transparent tc:text-[color:var(--text-strong)] tc:hover:bg-[var(--surface-card)]`;
</script>

<template>
  <div role="tablist" aria-label="Filtrar por status" :class="[containerClassName, TC_CONTAINER]">
    <button
      v-for="(label, index) in labels"
      :key="label"
      role="tab"
      :aria-selected="index === 0"
      :class="index === 0 ? [activeClassName, TC_ACTIVE] : [inactiveClassName, TC_INACTIVE]"
    >{{ label }}</button>
  </div>
</template>
