<script setup lang="ts">
import OnboardingHeroFrame from '@/components/layout/OnboardingHeroFrame.vue';
import TcButton from '@/components/theme/TcButton.vue';
import TcFloatingCard from '@/components/theme/TcFloatingCard.vue';
import { publicAsset } from '@/utils/publicAsset';
// Aceite dos Termos de Uso e da Política de Privacidade desativado no onboarding: o aceite acontece no cadastro da landing.
// import { AnimatePresence } from 'motion-v';
// import { useTermsAgreement } from './useTermsAgreement';
// import TermsConsentCheckbox from './TermsConsentCheckbox.vue';
// import TermsDocumentModal from './TermsDocumentModal.vue';

/**
 * Boas-vindas do onboarding (depois do login e da confirmação do celular).
 * Por enquanto exibe só a mensagem de boas-vindas e segue adiante; o aceite dos termos está comentado.
 */
const emit = defineEmits<{
  accept: [];
  backToLogin: [];
}>();

const photoSrc = publicAsset('assets/refactor/tractor-right-copy.jpg');

/** Próximas etapas da jornada (texto apenas, sem links). */
const NEXT_STEPS = ['Dados', 'Documentos', 'Assinatura'];

// const {
//   accepted,
//   setAccepted,
//   activeDocModal,
//   setActiveDocModal,
//   handleSubmit,
//   handleDownload,
//   handleAgreeAndClose,
// } = useTermsAgreement({ onAccept: () => emit('accept') });
</script>

<template>
  <!--
    Etapas do stepper: nenhuma é a atual (`step` 0) e as duas primeiras (Celular e Biometria) estão concluídas.
    Sem rodapé de página, como nas telas de SMS e biometria.
  -->
  <OnboardingHeroFrame
    :step="0"
    :done-until="2"
    eyebrow="Portal Grupo Ceres"
    :src="photoSrc"
    position="center 45%"
    title-first="Que bom"
    title-second="ter você aqui."
    description="Nos próximos passos vamos conhecer melhor a sua empresa e reunir os documentos necessários para a análise, de forma simples e segura."
    description-measure="44ch"
    @go-to-login="emit('backToLogin')"
  >
    <template #aside>
      <!-- Visualizador dos documentos (termos e privacidade) desativado
      <AnimatePresence>
        <TermsDocumentModal
          v-if="activeDocModal"
          key="terms-document-modal"
          :doc-type="activeDocModal"
          @download="handleDownload(activeDocModal)"
          @close="setActiveDocModal(null)"
          @agree="handleAgreeAndClose"
        />
      </AnimatePresence>
      -->

      <TcFloatingCard as="form" @submit.prevent="emit('accept')">
        <div class="flex flex-col gap-[var(--space-1)]">
          <span class="text-[length:var(--text-xs)] text-[color:var(--text-muted)]">Próxima etapa</span>
          <span
            class="text-[length:var(--text-lg)] font-[number:var(--weight-bold)] leading-[var(--leading-snug)] text-[color:var(--text-strong)]"
          >
            Dados da empresa
          </span>
        </div>

        <ol class="m-0 flex list-none flex-col gap-[var(--space-3)] p-0">
          <li
            v-for="(label, index) in NEXT_STEPS"
            :key="label"
            class="flex items-center gap-[var(--space-3)] text-[length:var(--text-base)] text-[color:var(--text-strong)]"
          >
            <span
              class="inline-flex size-[var(--space-7)] shrink-0 items-center justify-center rounded-[var(--radius-full)] bg-[var(--surface-soft)] text-[length:var(--text-xs)] font-[number:var(--weight-bold)]"
              aria-hidden="true"
            >
              {{ index + 1 }}
            </span>
            <span>{{ label }}</span>
          </li>
        </ol>

        <!-- Aceite dos termos desativado
        <TermsConsentCheckbox
          :accepted="accepted"
          @accepted-change="setAccepted"
          @open-document="setActiveDocModal"
        />
        -->

        <TcButton type="submit" variant="primary" arrow class="w-full">Iniciar minha jornada</TcButton>
      </TcFloatingCard>
    </template>
  </OnboardingHeroFrame>
</template>
