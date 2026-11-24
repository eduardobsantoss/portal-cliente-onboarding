<script setup lang="ts">
import { Smartphone } from 'lucide-vue-next';
import TcButton from '@/components/theme/TcButton.vue';
import TcToast from '@/components/theme/TcToast.vue';
import { SMS_TEST_CODE } from '@/constants/sms';

defineProps<{
  show: boolean;
  maskedPhone: string;
}>();

const emit = defineEmits<{
  fillCode: [];
  close: [];
}>();

/** SMS simulado do protótipo, no `TcToast` (guidelines §7.3). Some sozinho (quem usa controla `show`) ou no X. */
</script>

<template>
  <TcToast
    v-if="show"
    tone="info"
    :icon="Smartphone"
    :title="`SMS recebido em ${maskedPhone}:`"
    @close="emit('close')"
  >
    Seu código de confirmação GCI é:
    <strong class="font-[number:var(--weight-bold)] tabular-nums">{{ SMS_TEST_CODE }}</strong>

    <template #actions>
      <TcButton variant="secondary" size="compact" @click="emit('fillCode')">Preencher Código</TcButton>
    </template>
  </TcToast>
</template>
