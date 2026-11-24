<script setup lang="ts">
import { ref } from 'vue';
import OnboardingHeroFrame from '@/components/layout/OnboardingHeroFrame.vue';
import TcFloatingCard from '@/components/theme/TcFloatingCard.vue';
import FacialVerification from '@/flows/portal/verificacao-facial/FacialVerification.vue';
import { publicAsset } from '@/utils/publicAsset';

const emit = defineEmits<{
  confirmed: [];
  goToLogin: [];
}>();

const isVerified = ref(false);
const facialRef = ref<InstanceType<typeof FacialVerification> | null>(null);

const photoSrc = publicAsset('assets/refactor/tractor-right-copy.jpg');

/** Mostra o cartão de sucesso por um instante e segue para os dados, como na confirmação do celular. */
const handleVerified = () => {
  isVerified.value = true;
  setTimeout(() => {
    emit('confirmed');
  }, 1200);
};

/** Etapa 2 da jornada: biometria facial logo após o SMS (antes feita no "Compl. Cadastro"). */
</script>

<template>
  <OnboardingHeroFrame
    :step="2"
    :src="photoSrc"
    position="center 45%"
    title-first="Confirme"
    title-second="sua identidade."
    description="Faça o reconhecimento facial com prova de vida pelo seu celular, lendo o QR Code ou abrindo o link enviado."
    aside-basis="520px"
    @go-to-login="emit('goToLogin')"
  >
    <template #aside>
      <TcFloatingCard>
        <FacialVerification
          ref="facialRef"
          layout="stack"
          :is-verified="isVerified"
          @verified="handleVerified"
        />

        <!-- No lugar do antigo aviso "Ambiente Seguro GCI SCD"; o botão de simulação (só demonstração) fica na frente do texto -->
        <p class="m-0 text-[length:var(--text-xs)] leading-[var(--leading-body)] text-[color:var(--text-muted)]">
          Depois da biometria, você segue para os dados e documentos da empresa.
          <button
            v-if="!isVerified"
            type="button"
            :disabled="facialRef?.isSimulating"
            class="cursor-pointer rounded-[var(--radius-sm)] border-0 bg-transparent p-0 text-[length:inherit] font-[number:var(--weight-semibold)] text-[color:var(--text-link)] hover:text-[color:var(--text-link-hover)] hover:underline focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] disabled:cursor-not-allowed disabled:opacity-60"
            @click="facialRef?.simulateScan()"
          >
            ({{ facialRef?.isSimulating ? 'Processando biometria...' : 'Simular Validação Facial' }})
          </button>
        </p>
      </TcFloatingCard>
    </template>
  </OnboardingHeroFrame>
</template>
