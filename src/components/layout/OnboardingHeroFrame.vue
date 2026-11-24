<script setup lang="ts">
import TcButton from '@/components/theme/TcButton.vue';
import TcDisplayHeading from '@/components/theme/TcDisplayHeading.vue';
import TcEyebrow from '@/components/theme/TcEyebrow.vue';
import TcPageHero from '@/components/theme/TcPageHero.vue';
import TcStepper from '@/components/theme/TcStepper.vue';
import { ONBOARDING_JOURNEY_STEPS } from '@/constants/onboardingSteps';

/**
 * Moldura das etapas de ativação logo após o login (SMS e biometria): hero de página inteira com o texto
 * à esquerda, o cartão flutuante (`aside`) à direita e o `TcStepper` embaixo.
 * O rodapé da página (atendimento e direitos) foi removido a pedido; o `TcPageFooter` continua disponível.
 * Substitui o `OnboardingPageShell` nessas duas telas (o arquivo antigo continua no projeto).
 *
 * Slots: aside (cartão com a parte interativa).
 */
defineProps<{
  /** Etapa atual da jornada no stepper (1 = Celular, 2 = Biometria; 0 = nenhuma, como nas boas-vindas). */
  step: number;
  /** Etapas concluídas no stepper; por padrão, todas as anteriores à atual. */
  doneUntil?: number;
  /** Texto do eyebrow; por padrão "Passo {step} de 6". */
  eyebrow?: string;
  /** Largura máxima do parágrafo (padrão 40ch). */
  descriptionMeasure?: string;
  src: string;
  position: string;
  titleFirst: string;
  titleSecond: string;
  description: string;
  asideBasis?: string;
}>();

const emit = defineEmits<{
  goToLogin: [];
}>();
</script>

<template>
  <div class="theme-client flex min-h-[100dvh] flex-col p-[var(--page-gutter)]">
    <!-- O véu horizontal da seção 7.1 é o próprio padrão do TcPageHero (`--scrim-photo`), por isso não passa `scrim`. -->
    <TcPageHero variant="full" :src="src" :position="position" :aside-basis="asideBasis">
      <template #header-actions>
        <TcButton variant="inverse" size="nav" @click="emit('goToLogin')">Voltar ao login</TcButton>
      </template>

      <TcEyebrow tone="onDark">{{ eyebrow ?? `Passo ${step} de ${ONBOARDING_JOURNEY_STEPS.length}` }}</TcEyebrow>

      <TcDisplayHeading as="h1" size="display" tone="onDark" class="mt-[var(--space-6)]">
        {{ titleFirst }}
        <template #second>{{ titleSecond }}</template>
      </TcDisplayHeading>

      <p
        class="m-0 mt-[var(--space-6)] text-[length:var(--text-md)] leading-[var(--leading-body)] text-[color-mix(in_srgb,var(--white)_92%,transparent)]"
        :style="{ maxWidth: descriptionMeasure ?? '40ch' }"
      >
        {{ description }}
      </p>

      <template #aside>
        <slot name="aside" />
      </template>

      <template #footer>
        <TcStepper :steps="ONBOARDING_JOURNEY_STEPS" :current="step" :done-until="doneUntil" />
      </template>
    </TcPageHero>
  </div>
</template>
