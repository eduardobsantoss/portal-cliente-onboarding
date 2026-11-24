<script setup lang="ts">
/**
 * Barra de ações do fim de cada etapa de formulário (guidelines §7.1):
 * secundário (Voltar…) à esquerda, a única ação primária à direita.
 * Abaixo de 640px empilha, com a ação primária em cima e em largura total.
 */
</script>

<template>
  <div
    class="flex flex-col items-stretch gap-[var(--space-4)] border-t border-[color:var(--border-subtle)] pt-[var(--space-8)] sm:flex-row sm:items-center sm:justify-between"
  >
    <div v-if="$slots.secondary" class="max-sm:order-2 max-sm:*:w-full">
      <slot name="secondary" />
    </div>
    <div v-if="$slots.primary" class="max-sm:order-1 max-sm:*:w-full sm:ml-auto">
      <slot name="primary" />
    </div>
  </div>
</template>
