<script setup lang="ts">
import type { SmsStatus } from '@/types/sms';
import SmsSendAction from './SmsSendAction.vue';

defineProps<{
  maskedPhone: string;
  status: SmsStatus;
}>();

const emit = defineEmits<{
  send: [];
}>();

/*
 * Bloco do topo do cartão: "Celular cadastrado", o número mascarado e a ação de envio do código.
 * O link de suporte e o código de teste ficam em `SmsVerification` (aparecem em qualquer estado).
 */
</script>

<template>
  <div class="flex flex-col gap-[var(--space-5)]">
    <div class="flex flex-col gap-[var(--space-1)]">
      <span class="text-[length:var(--text-xs)] text-[color:var(--text-muted)]">Celular cadastrado</span>
      <span
        class="text-[length:var(--text-lg)] font-[number:var(--weight-bold)] leading-[var(--leading-snug)] tabular-nums text-[color:var(--text-strong)]"
      >
        {{ maskedPhone }}
      </span>
    </div>

    <SmsSendAction :status="status" @send="emit('send')" />
  </div>
</template>
