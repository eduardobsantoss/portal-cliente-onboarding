<script setup lang="ts">
import { LOGIN_SUPPORT_PHONE } from '@/constants/login';

/**
 * Rodapé das páginas (guidelines §7.1): atendimento à esquerda, direitos à direita.
 * O slot `demo` recebe os botões só de demonstração (simular, preencher exemplo...), como botões de texto.
 */
</script>

<template>
  <footer
    class="flex flex-wrap items-center justify-between gap-x-[var(--space-6)] gap-y-[var(--space-2)] px-[var(--space-9)] pb-[var(--space-4)] text-[length:var(--text-xs)] text-[color:var(--text-muted)] max-sm:px-[var(--space-5)]"
  >
    <p class="m-0">
      Atendimento:
      <strong class="font-[number:var(--weight-bold)] text-[color:var(--text-strong)]">{{
        LOGIN_SUPPORT_PHONE
      }}</strong>
    </p>

    <div
      v-if="$slots.demo"
      class="flex flex-wrap items-center gap-[var(--space-2)] [&_button]:inline-flex [&_button]:min-h-[var(--control-arrow)] [&_button]:cursor-pointer [&_button]:items-center [&_button]:rounded-[var(--radius-md)] [&_button]:border-0 [&_button]:bg-transparent [&_button]:px-[var(--space-3)] [&_button]:text-[length:var(--text-xs)] [&_button]:font-[number:var(--weight-semibold)] [&_button]:text-[color:var(--text-link)] [&_button]:hover:underline [&_button]:focus-visible:shadow-[var(--focus-ring)] [&_button]:focus-visible:outline-none"
    >
      <slot name="demo" />
    </div>

    <p class="m-0">© 2025–2026 Grupo Ceres Investimentos</p>
  </footer>
</template>
