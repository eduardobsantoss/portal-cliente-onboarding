<script setup lang="ts">
import { CheckCircle2, RotateCcw } from 'lucide-vue-next';
import TcButton from '@/components/theme/TcButton.vue';
import TcNotice from '@/components/theme/TcNotice.vue';

defineProps<{
  maskedPhone: string;
  verifiedAt: string;
}>();

const emit = defineEmits<{
  redo: [];
}>();
</script>

<template>
  <TcNotice tone="success" :icon="CheckCircle2" title="Telefone validado com sucesso">
    <p class="m-0">
      Número: <strong class="font-[number:var(--weight-bold)] tabular-nums">{{ maskedPhone }}</strong>
      <span aria-hidden="true"> • </span>
      Confirmado em: <strong class="font-[number:var(--weight-bold)]">{{ verifiedAt }}</strong>
    </p>

    <template #action>
      <TcButton variant="secondary" size="compact" @click="emit('redo')">
        <span class="inline-flex items-center gap-[var(--space-2)]">
          <RotateCcw class="size-[var(--space-4)]" aria-hidden="true" />
          Refazer validação
        </span>
      </TcButton>
    </template>
  </TcNotice>
</template>
