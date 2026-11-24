<script setup lang="ts">
import { provide } from 'vue';

/**
 * Contêiner dos toasts (guidelines §7.3): vai para o `<body>` com `.theme-client`, fixo no canto superior
 * direito (abaixo do cabeçalho do hero em ≥1024px) e empilha os `TcToast` com 12px de intervalo.
 * Coloque os `TcToast` dentro dele.
 */
provide('tcToastRegion', true);
</script>

<template>
  <Teleport to="body">
    <!-- O fundo vem inline: a regra `.theme-client` não é "layered" e venceria uma classe utilitária -->
    <div
      class="theme-client pointer-events-none fixed right-[var(--space-5)] top-[var(--space-5)] z-[var(--z-toast)] flex flex-col items-end gap-[var(--space-3)] lg:top-[120px]"
      style="background: transparent"
    >
      <slot />
    </div>
  </Teleport>
</template>
