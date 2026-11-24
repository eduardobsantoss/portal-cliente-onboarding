<script setup lang="ts">
import { useId } from 'vue';
import { motion } from 'motion-v';
import { AlertCircle } from 'lucide-vue-next';
import TcButton from '@/components/theme/TcButton.vue';
import { SMS_CODE_LENGTH } from '@/constants/sms';
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
  openSupport: [];
}>();

const firstCellId = useId();
const errorId = useId();

/** Segundos restantes no formato m:ss (ex.: 42 → "0:42"). */
const formatCooldown = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;

const linkButtonClass =
  'cursor-pointer rounded-[var(--radius-sm)] border-0 bg-transparent p-0 text-[length:var(--text-xs)] font-[number:var(--weight-semibold)] text-[color:var(--text-link)] hover:text-[color:var(--text-link-hover)] hover:underline focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]';

const isIncomplete = (digits: string[]) => digits.join('').length < SMS_CODE_LENGTH;
</script>

<template>
  <motion.div
    :initial="{ opacity: 0, y: 8 }"
    :animate="{ opacity: 1, y: 0 }"
    class="flex flex-col gap-[var(--space-5)]"
  >
    <div class="flex flex-col gap-[var(--space-2)]">
      <label
        :for="firstCellId"
        class="text-[length:var(--text-sm)] font-[number:var(--weight-semibold)] text-[color:var(--text-strong)]"
      >
        Código de 6 dígitos
      </label>

      <SmsOtpInputs
        :digits="digits"
        :input-refs="inputRefs"
        :first-id="firstCellId"
        :invalid="!!errorMsg"
        @digit-change="(index, value) => emit('digitChange', index, value)"
        @key-down="(index, e) => emit('keyDown', index, e)"
        @paste="(e) => emit('paste', e)"
      />

      <p
        v-if="errorMsg"
        :id="errorId"
        role="alert"
        class="m-0 flex items-center gap-[var(--space-1)] text-[length:var(--text-xs)] text-[color:var(--danger-dark)]"
      >
        <AlertCircle class="size-[14px] shrink-0" aria-hidden="true" />
        {{ errorMsg }}
      </p>
    </div>

    <TcButton
      variant="primary"
      arrow
      class="w-full"
      :disabled="isIncomplete(digits)"
      @click="emit('validate', digits.join(''))"
    >
      Confirmar código
    </TcButton>

    <div
      class="flex flex-wrap items-center justify-between gap-x-[var(--space-4)] gap-y-[var(--space-2)] text-[length:var(--text-xs)] text-[color:var(--text-muted)]"
    >
      <span v-if="cooldown > 0">
        Reenviar em
        <strong class="font-[number:var(--weight-bold)] tabular-nums text-[color:var(--text-strong)]">{{ formatCooldown(cooldown) }}</strong>
      </span>
      <button v-else type="button" :class="linkButtonClass" @click="emit('resend')">
        Reenviar código
      </button>

      <button type="button" :class="linkButtonClass" @click="emit('openSupport')">
        Não é o seu número?
      </button>
    </div>
  </motion.div>
</template>
