<script setup lang="ts">
import { Check } from 'lucide-vue-next';

type ValidationBadgeVariant = 'topic' | 'partner';

defineProps<{
  isDone: boolean;
  /** Texto do estado concluído ("Concluído", "Validada", "Validado"). */
  doneLabel: string;
  variant: ValidationBadgeVariant;
}>();

const DONE_CLASS: Record<ValidationBadgeVariant, string> = {
  topic: 'text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1',
  partner: 'text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1',
};

const PENDING_CLASS: Record<ValidationBadgeVariant, string> = {
  topic: 'text-[11px] font-bold text-agro-orange bg-orange-50 px-2.5 py-1 rounded-full',
  partner: 'text-[10px] font-bold text-agro-orange bg-orange-50 px-2 py-0.5 rounded-full',
};

const CHECK_SIZE: Record<ValidationBadgeVariant, number> = { topic: 12, partner: 11 };

/** Selo "concluído / Pendente" (SMS, biometria e cabeçalho de cada parte do quadro societário). */
</script>

<template>
  <span v-if="isDone" :class="DONE_CLASS[variant]">
    <Check :size="CHECK_SIZE[variant]" :stroke-width="3" /> {{ doneLabel }}
  </span>
  <span v-else :class="PENDING_CLASS[variant]">Pendente</span>
</template>
