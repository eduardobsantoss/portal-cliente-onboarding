<script setup lang="ts">
import OnboardingHeroFrame from '@/components/layout/OnboardingHeroFrame.vue';
import TcFloatingCard from '@/components/theme/TcFloatingCard.vue';
import { SMS_DEFAULT_MASKED_PHONE } from '@/constants/sms';
import { publicAsset } from '@/utils/publicAsset';
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

const photoSrc = publicAsset('assets/refactor/soybeans-harvesting.jpg');

const handleVerified = () => {
  setTimeout(() => {
    emit('confirmed');
  }, 800);
};
</script>

<template>
  <OnboardingHeroFrame
    :step="1"
    :src="photoSrc"
    position="center 30%"
    title-first="Confirme"
    title-second="seu celular."
    description="Enviamos um código por SMS para o número do seu cadastro."
    @go-to-login="emit('goToLogin')"
  >
    <template #aside>
      <TcFloatingCard>
        <!-- Reusable SmsVerification Component -->
        <SmsVerification
          :masked-phone="maskedPhone"
          @verified="handleVerified"
        />

        <!-- No lugar do antigo aviso "Ambiente Seguro GCI SCD" -->
        <p class="m-0 text-[length:var(--text-xs)] leading-[var(--leading-body)] text-[color:var(--text-muted)]">
          Depois do celular, você confirma sua identidade e segue para os dados e documentos da empresa.
        </p>
      </TcFloatingCard>
    </template>
  </OnboardingHeroFrame>
</template>
