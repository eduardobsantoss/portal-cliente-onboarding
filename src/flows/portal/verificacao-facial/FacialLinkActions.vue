<script setup lang="ts">
import { Copy, Check, Send } from 'lucide-vue-next';
import TcButton from '@/components/theme/TcButton.vue';

defineProps<{
  copied: boolean;
  smsSent: boolean;
}>();

const emit = defineEmits<{
  copyLink: [];
  sendSms: [];
}>();
</script>

<template>
  <div class="flex flex-wrap gap-[var(--space-3)]">
    <TcButton variant="secondary" size="compact" class="flex-[1_1_auto]" @click="emit('copyLink')">
      <span class="inline-flex items-center gap-[var(--space-2)]">
        <Check v-if="copied" class="size-[var(--space-4)]" aria-hidden="true" />
        <Copy v-else class="size-[var(--space-4)]" aria-hidden="true" />
        <span aria-live="polite">{{ copied ? 'Link copiado!' : 'Copiar link' }}</span>
      </span>
    </TcButton>

    <TcButton variant="secondary" size="compact" class="flex-[1_1_auto]" @click="emit('sendSms')">
      <span class="inline-flex items-center gap-[var(--space-2)]">
        <Check v-if="smsSent" class="size-[var(--space-4)]" aria-hidden="true" />
        <Send v-else class="size-[var(--space-4)]" aria-hidden="true" />
        <span aria-live="polite">{{ smsSent ? 'SMS enviado!' : 'Enviar por SMS' }}</span>
      </span>
    </TcButton>
  </div>
</template>
