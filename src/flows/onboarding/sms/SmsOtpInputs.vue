<script setup lang="ts">
import { SMS_DIGIT_INDEXES } from '@/constants/sms';

defineProps<{
  digits: string[];
  inputRefs: (HTMLInputElement | null)[];
}>();

const emit = defineEmits<{
  digitChange: [index: number, value: string];
  keyDown: [index: number, e: KeyboardEvent];
  paste: [e: ClipboardEvent];
}>();
</script>

<template>
  <div class="flex items-center justify-center gap-2 sm:gap-3.5 py-2">
    <input
      v-for="idx in SMS_DIGIT_INDEXES"
      :key="idx"
      :ref="(el) => { inputRefs[idx] = el as HTMLInputElement | null; }"
      type="text"
      inputmode="numeric"
      pattern="[0-9]*"
      :maxlength="1"
      :value="digits[idx]"
      @input="emit('digitChange', idx, ($event.target as HTMLInputElement).value)"
      @keydown="emit('keyDown', idx, $event)"
      @paste="emit('paste', $event)"
      :class="`w-12 sm:w-14 h-14 sm:h-16 text-center text-xl sm:text-2xl font-mono font-bold rounded-xl border-2 transition-all focus:outline-none ${
        digits[idx]
          ? 'border-gci bg-emerald-50/30 text-gci'
          : 'border-slate-200 bg-white text-slate-800 focus:border-gci focus:ring-4 focus:ring-gci/10'
      }`"
    />
  </div>
</template>
