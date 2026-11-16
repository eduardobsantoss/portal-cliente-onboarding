<script setup lang="ts">
import { motion, AnimatePresence } from 'motion-v';
import { Smartphone } from 'lucide-vue-next';
import { SMS_TEST_CODE } from '@/constants/sms';

defineProps<{
  show: boolean;
  maskedPhone: string;
}>();

const emit = defineEmits<{
  fillCode: [];
}>();
</script>

<template>
  <AnimatePresence>
    <motion.div
      v-if="show"
      key="sms-simulated-toast"
      :initial="{ opacity: 0, y: -10, scale: 0.96 }"
      :animate="{ opacity: 1, y: 0, scale: 1 }"
      :exit="{ opacity: 0, y: -10, scale: 0.96 }"
      class="mb-4 p-3.5 bg-slate-900 text-white rounded-2xl border border-slate-700 shadow-xl flex items-center justify-between text-xs"
    >
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-agro-orange shrink-0">
          <Smartphone :size="16" />
        </div>
        <div>
          <p class="font-bold text-slate-200">SMS recebido em {{ maskedPhone }}:</p>
          <p class="text-slate-400 text-[11px]">
            Seu código de confirmação GCI é: <strong class="font-mono text-agro-orange text-xs tracking-widest">{{ SMS_TEST_CODE }}</strong>
          </p>
        </div>
      </div>
      <button
        type="button"
        @click="emit('fillCode')"
        class="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-[11px] font-bold rounded-xl text-white transition-colors shrink-0"
      >
        Preencher Código
      </button>
    </motion.div>
  </AnimatePresence>
</template>
