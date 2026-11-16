<script setup lang="ts">
import { Smartphone } from 'lucide-vue-next';
import type { SmsStatus } from '@/types/sms';
import { SMS_TEST_CODE } from '@/constants/sms';
import SmsSendAction from './SmsSendAction.vue';

defineProps<{
  maskedPhone: string;
  status: SmsStatus;
}>();

const emit = defineEmits<{
  send: [];
  openSupport: [];
}>();
</script>

<template>
  <div class="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-3.5">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="flex items-center gap-3.5 min-w-0">
        <div class="w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-gci shrink-0 shadow-sm">
          <Smartphone :size="20" />
        </div>
        <div class="min-w-0">
          <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Celular Cadastrado
          </span>
          <span class="text-base sm:text-lg font-bold text-slate-900 font-mono tracking-wider">
            {{ maskedPhone }}
          </span>
        </div>
      </div>

      <SmsSendAction :status="status" @send="emit('send')" />
    </div>

    <!-- Separator with Support link and Test helper -->
    <div class="pt-2.5 border-t border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
      <button
        type="button"
        @click="emit('openSupport')"
        class="text-[11px] font-medium text-slate-500 hover:text-gci underline transition-colors self-start sm:self-auto"
      >
        Não é o seu número? Fale com o suporte
      </button>

      <span class="text-[11px] text-slate-400 self-start sm:self-auto">
        Código para teste: <strong class="font-mono text-slate-600 font-bold">{{ SMS_TEST_CODE }}</strong>
      </span>
    </div>
  </div>
</template>
