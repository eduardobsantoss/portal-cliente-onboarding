<script setup lang="ts">
import { SMS_DIGIT_INDEXES } from '@/constants/sms';

defineProps<{
  digits: string[];
  inputRefs: (HTMLInputElement | null)[];
  /** `id` da primeira célula, para o `for` do rótulo "Código de 6 dígitos". */
  firstId?: string;
  invalid?: boolean;
}>();

const emit = defineEmits<{
  digitChange: [index: number, value: string];
  keyDown: [index: number, e: KeyboardEvent];
  paste: [e: ClipboardEvent];
}>();

/*
 * Seis células (guidelines §3 `OtpInput`): vazia `--border-default`, preenchida `--border-strong`,
 * em foco `--accent` (uso decorativo permitido). O foco também ganha o anel padrão do tema.
 */
</script>

<template>
  <div class="grid grid-cols-6 gap-[var(--space-2)]" role="group" aria-label="Código de 6 dígitos">
    <input
      v-for="idx in SMS_DIGIT_INDEXES"
      :id="idx === 0 ? firstId : undefined"
      :key="idx"
      :ref="(el) => { inputRefs[idx] = el as HTMLInputElement | null; }"
      type="text"
      inputmode="numeric"
      pattern="[0-9]*"
      :autocomplete="idx === 0 ? 'one-time-code' : 'off'"
      :aria-label="`Dígito ${idx + 1}`"
      :aria-invalid="invalid ? 'true' : undefined"
      :maxlength="1"
      :value="digits[idx]"
      class="h-[var(--control-otp)] w-full min-w-0 rounded-[var(--radius-md)] border-2 bg-[var(--surface-card)] text-center text-[length:var(--space-7)] font-[number:var(--weight-bold)] tabular-nums text-[color:var(--text-strong)] transition-colors duration-[var(--duration-base)] focus:border-[color:var(--accent)] focus:shadow-[var(--focus-ring)] focus:outline-none motion-reduce:transition-none"
      :class="
        invalid
          ? 'border-[color:var(--danger-base)]'
          : digits[idx]
            ? 'border-[color:var(--border-strong)]'
            : 'border-[color:var(--border-default)]'
      "
      @input="emit('digitChange', idx, ($event.target as HTMLInputElement).value)"
      @keydown="emit('keyDown', idx, $event)"
      @paste="emit('paste', $event)"
    />
  </div>
</template>
