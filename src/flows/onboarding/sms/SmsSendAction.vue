<script setup lang="ts">
import { CheckCircle2 } from 'lucide-vue-next';
import TcButton from '@/components/theme/TcButton.vue';
import type { SmsStatus } from '@/types/sms';

defineProps<{
  status: SmsStatus;
}>();

const emit = defineEmits<{
  send: [];
}>();
</script>

<template>
  <TcButton
    v-if="status === 'idle'"
    variant="primary"
    arrow
    class="w-full"
    @click="emit('send')"
  >
    Enviar código por SMS
  </TcButton>

  <TcButton
    v-else-if="status === 'sending'"
    variant="primary"
    arrow
    loading
    disabled
    class="w-full"
  >
    Enviando código...
  </TcButton>

  <p
    v-else-if="status === 'sent'"
    role="status"
    class="m-0 inline-flex items-center gap-[var(--space-2)] text-[length:var(--text-xs)] font-[number:var(--weight-semibold)] text-[color:var(--success-dark)]"
  >
    <CheckCircle2 class="size-[var(--space-4)] shrink-0" aria-hidden="true" />
    Código enviado
  </p>
</template>
