<script setup lang="ts">
import { motion } from 'motion-v';
import { AlertCircle } from 'lucide-vue-next';
import SmsOtpInputs from './SmsOtpInputs.vue';

defineProps<{
  maskedPhone: string;
  digits: string[];
  errorMsg: string | null;
  cooldown: number;
  inputRefs: (HTMLInputElement | null)[];
}>();

const emit = defineEmits<{
  digitChange: [index: number, value: string];
  keyDown: [index: number, e: KeyboardEvent];
  paste: [e: ClipboardEvent];
  resend: [];
  validate: [code: string];
}>();
</script>

<template>
  <motion.div
    :initial="{ opacity: 0, y: 8 }"
    :animate="{ opacity: 1, y: 0 }"
    class="p-6 sm:p-8 bg-white border border-slate-200 rounded-2xl space-y-5 shadow-sm text-center"
  >
    <div class="space-y-1.5">
      <h4 class="text-sm sm:text-base font-bold text-slate-900">
        Digite o código de 6 dígitos enviado por SMS
      </h4>
      <p class="text-xs text-slate-500">
        Enviamos o código para <span class="font-bold text-slate-700 font-mono">{{ maskedPhone }}</span>
      </p>
    </div>

    <!-- 6 Inputs -->
    <SmsOtpInputs
      :digits="digits"
      :input-refs="inputRefs"
      @digit-change="(index, value) => emit('digitChange', index, value)"
      @key-down="(index, e) => emit('keyDown', index, e)"
      @paste="(e) => emit('paste', e)"
    />

    <!-- Error Message -->
    <motion.div
      v-if="errorMsg"
      :initial="{ opacity: 0, y: -4 }"
      :animate="{ opacity: 1, y: 0 }"
      class="flex items-center justify-center gap-1.5 text-xs text-rose-600 font-bold"
    >
      <AlertCircle :size="14" />
      <span>{{ errorMsg }}</span>
    </motion.div>

    <!-- Cooldown & Resend Action -->
    <div class="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
      <button
        type="button"
        :disabled="cooldown > 0"
        @click="emit('resend')"
        :class="`font-semibold transition-colors ${
          cooldown > 0
            ? 'text-slate-400 cursor-not-allowed'
            : 'text-gci hover:underline'
        }`"
      >
        {{ cooldown > 0 ? `Reenviar código em ${cooldown}s` : 'Reenviar código' }}
      </button>

      <button
        type="button"
        @click="emit('validate', digits.join(''))"
        :disabled="digits.join('').length < 6"
        class="w-full sm:w-auto px-7 py-3 bg-gci hover:bg-gci-hover disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all shadow-sm active:scale-95 whitespace-nowrap cursor-pointer"
      >
        Confirmar Código
      </button>
    </div>
  </motion.div>
</template>
