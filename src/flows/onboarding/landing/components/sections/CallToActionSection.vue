<script setup lang="ts">
import TcPhotoSection from '@/components/theme/TcPhotoSection.vue';
import TcDisplayHeading from '@/components/theme/TcDisplayHeading.vue';
import TcButton from '@/components/theme/TcButton.vue';
import { publicAsset } from '@/utils/publicAsset';

const ctaPhoto = publicAsset('assets/refactor/soybeans-harvesting.jpg');

interface CallToActionSectionProps {
  onOpenRegistration: () => void;
  onOpenLogin: () => void;
}

const props = defineProps<CallToActionSectionProps>();
</script>

<template>
  <TcPhotoSection
    :src="ctaPhoto"
    position="center 82%"
    data-clip-reveal
    class="px-[var(--space-12)] py-[calc(var(--space-12)*2)] max-md:px-[var(--space-6)]"
  >
    <div class="max-w-[760px]">
      <TcDisplayHeading size="4xl" tone="onDark" data-split-reveal>
        Pronto para antecipar
        <template #second>seus recebíveis?</template>
      </TcDisplayHeading>
      <p
        data-reveal
        class="mt-[var(--space-6)] max-w-[52ch] text-[length:var(--text-md)] leading-[var(--leading-body)] text-[color:var(--text-on-brand-muted)]"
      >
        Junte-se a centenas de empresas e produtores que já antecipam seus recebíveis com o Grupo Ceres.
      </p>
      <div
        data-reveal
        class="mt-[var(--space-10)] flex flex-wrap items-center gap-[var(--space-4)]"
      >
        <TcButton variant="inverse" arrow @click="props.onOpenRegistration">
          Abra sua conta
        </TcButton>
        <TcButton variant="glass" @click="props.onOpenLogin">
          Acesse sua conta
        </TcButton>
      </div>
    </div>
  </TcPhotoSection>
</template>
