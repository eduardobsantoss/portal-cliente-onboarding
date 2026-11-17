<script setup lang="ts">
import { motion } from 'motion-v';
import { Smartphone, ShieldCheck, LogOut } from 'lucide-vue-next';
import OnboardingPageShell from '@/components/layout/OnboardingPageShell.vue';
import { SMS_DEFAULT_MASKED_PHONE } from '@/constants/sms';
import SmsVerification from './SmsVerification.vue';

withDefaults(
  defineProps<{
    maskedPhone?: string;
  }>(),
  {
    maskedPhone: SMS_DEFAULT_MASKED_PHONE,
  },
);

const emit = defineEmits<{
  confirmed: [];
  goToLogin: [];
}>();

const handleVerified = () => {
  setTimeout(() => {
    emit('confirmed');
  }, 800);
};
</script>

<template>
  <OnboardingPageShell
    section-label="Portal do Cliente • Ativação de Acesso"
    main-class-name="max-w-5xl w-full mx-auto my-auto py-8"
  >
    <template #headerAction>
      <button
        type="button"
        @click="emit('goToLogin')"
        class="text-xs font-semibold text-slate-500 hover:text-gci flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
      >
        <LogOut :size="14" />
        Já possuo senha
      </button>
    </template>

    <motion.div
      :initial="{ opacity: 0, y: 15 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.35 }"
      class="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden"
    >
      <!-- Header Banner -->
      <div class="p-6 sm:p-8 bg-gradient-to-r from-[#083C4A] to-[#0a4c5e] text-white">
        <div class="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-agro-orange border border-white/10 mb-3 shadow-inner">
          <Smartphone :size="24" />
        </div>

        <h1 class="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Confirme seu celular
        </h1>
        <p class="text-xs sm:text-sm text-white/80 font-medium mt-2 leading-relaxed">
          Para sua segurança, enviamos um código de confirmação por SMS para o número informado no formulário de cadastro.
        </p>
      </div>

      <div class="p-6 sm:p-8 space-y-6">
        <!-- Reusable SmsVerification Component -->
        <SmsVerification
          :masked-phone="maskedPhone"
          @verified="handleVerified"
        />

        <!-- Security notice -->
        <div class="p-4 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl flex items-start gap-3 text-xs text-emerald-950">
          <ShieldCheck :size="18" class="text-emerald-600 shrink-0 mt-0.5" />
          <div class="space-y-0.5">
            <span class="font-bold">Ambiente Seguro GCI SCD</span>
            <p class="text-emerald-800 text-[11px] leading-relaxed">
              Após a confirmação do celular, você definirá sua senha de acesso exclusiva para formalizar o cadastro e acompanhar suas operações.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  </OnboardingPageShell>
</template>
