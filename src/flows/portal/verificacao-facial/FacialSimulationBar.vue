<script setup lang="ts">
import { Info } from 'lucide-vue-next';

defineProps<{
  isSimulating: boolean;
}>();

const emit = defineEmits<{ simulateScan: [] }>();

/** Barra de demonstração usada no layout em linha (portal). No onboarding o botão fica no rodapé da página. */
</script>

<template>
  <div
    class="flex flex-wrap items-center justify-between gap-[var(--space-3)] border-t border-[color:var(--border-subtle)] pt-[var(--space-3)]"
  >
    <div class="flex items-center gap-[var(--space-2)] text-[length:var(--text-xs)] text-[color:var(--text-muted)]">
      <Info class="size-[var(--space-4)] shrink-0" aria-hidden="true" />
      <span>Conclusão em tempo real após captura</span>
    </div>

    <button
      type="button"
      :disabled="isSimulating"
      class="inline-flex min-h-[var(--control-arrow)] cursor-pointer items-center rounded-[var(--radius-md)] border-0 bg-transparent px-[var(--space-3)] text-[length:var(--text-xs)] font-[number:var(--weight-semibold)] text-[color:var(--text-link)] hover:underline focus-visible:shadow-[var(--focus-ring)] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60"
      @click="emit('simulateScan')"
    >
      {{ isSimulating ? 'Processando biometria...' : 'Simular Validação Facial' }}
    </button>
  </div>
</template>
