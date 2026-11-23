<script setup lang="ts">
import { ref } from 'vue';
import { motion } from 'motion-v';
import { ScanFace, ShieldCheck, LogOut } from 'lucide-vue-next';
import OnboardingPageShell from '@/components/layout/OnboardingPageShell.vue';
import FacialVerification from '@/flows/portal/verificacao-facial/FacialVerification.vue';

const emit = defineEmits<{
  confirmed: [];
  goToLogin: [];
}>();

const isVerified = ref(false);

/** Mostra o cartão de sucesso por um instante e segue para os termos, como na confirmação do celular. */
const handleVerified = () => {
  isVerified.value = true;
  setTimeout(() => {
    emit('confirmed');
  }, 1200);
};

/** Etapa 3 da jornada: biometria facial logo após o SMS (antes feita no "Compl. Cadastro"). */
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
        Voltar ao login
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
          <ScanFace :size="24" />
        </div>

        <h1 class="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Confirme sua identidade
        </h1>
        <p class="text-xs sm:text-sm text-white/80 font-medium mt-2 leading-relaxed">
          Faça o reconhecimento facial com prova de vida pelo seu celular, lendo o QR Code ou abrindo o link enviado.
        </p>
      </div>

      <div class="p-6 sm:p-8 space-y-6">
        <FacialVerification :is-verified="isVerified" @verified="handleVerified" />

        <!-- Security notice -->
        <div class="p-4 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl flex items-start gap-3 text-xs text-emerald-950">
          <ShieldCheck :size="18" class="text-emerald-600 shrink-0 mt-0.5" />
          <div class="space-y-0.5">
            <span class="font-bold">Ambiente Seguro GCI SCD</span>
            <p class="text-emerald-800 text-[11px] leading-relaxed">
              Após a biometria, você seguirá para os termos de uso e para o envio dos dados e documentos da sua empresa.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  </OnboardingPageShell>
</template>
