<script setup lang="ts">
/*
 * Slots: icon (ícone antes do título) e o slot padrão (texto do título).
 * Dentro do theme-client (`tc:`): título de 20px/700, sem caixa alta nem espaçamento entre letras (`TcFormSection`).
 */
</script>

<template>
  <div class="flex items-center gap-2 border-b border-slate-100 pb-2 tc:gap-[var(--space-3)] tc:border-[color:var(--border-subtle)] tc:pb-[var(--space-3)]">
    <slot name="icon" />
    <h3 class="text-sm font-bold text-slate-900 uppercase tracking-wider tc:text-[length:var(--space-5)] tc:font-[number:var(--weight-bold)] tc:normal-case tc:tracking-normal tc:leading-[var(--leading-heading)] tc:text-[color:var(--text-strong)]"><slot /></h3>
  </div>
</template>
